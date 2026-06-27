#!/usr/bin/env bash
#
# setup-frappe-m5.sh
# Automated dual-version Frappe/ERPNext dev setup for Apple Silicon (M1–M5).
# Builds two isolated benches: frappe-bench-15 (Py3.11/Node20) and
# frappe-bench-16 (Py3.14/Node24), sharing one MariaDB + Redis.
#
# Usage:
#   chmod +x setup-frappe-m5.sh
#   ./setup-frappe-m5.sh                # both versions
#   ./setup-frappe-m5.sh --v15-only
#   ./setup-frappe-m5.sh --v16-only
#   ./setup-frappe-m5.sh --no-hrms      # skip hrms app
#   ./setup-frappe-m5.sh --wkhtmltopdf  # also attempt patched-qt install
#
# Re-running is safe: existing benches/sites are detected and skipped.

set -eo pipefail
# NOTE: intentionally NOT using `set -u` (nounset) — nvm is not nounset-safe and
# will abort with bogus "unbound variable" errors. All vars below have defaults.

# ----------------------------------------------------------------------------
# Config (override via env vars before running)
# ----------------------------------------------------------------------------
BASE_DIR="${BASE_DIR:-$HOME}"
BENCH15_DIR="${BENCH15_DIR:-frappe-bench-15}"
BENCH16_DIR="${BENCH16_DIR:-frappe-bench-16}"
SITE15="${SITE15:-dev15.localhost}"
SITE16="${SITE16:-dev16.localhost}"
PY15="${PY15:-3.11}"
PY16="${PY16:-3.14}"
NODE15="${NODE15:-20}"
NODE16="${NODE16:-24}"

DO_V15=1; DO_V16=1; DO_HRMS=1; DO_WKHTML=0

for arg in "$@"; do
  case "$arg" in
    --v15-only)     DO_V16=0 ;;
    --v16-only)     DO_V15=0 ;;
    --no-hrms)      DO_HRMS=0 ;;
    --wkhtmltopdf)  DO_WKHTML=1 ;;
    -h|--help)      grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $arg"; exit 1 ;;
  esac
done

LOG="$BASE_DIR/frappe-setup-$(date +%Y%m%d-%H%M%S).log"
exec > >(tee -a "$LOG") 2>&1

c_grn=$'\033[0;32m'; c_yel=$'\033[0;33m'; c_red=$'\033[0;31m'; c_off=$'\033[0m'
say()  { echo "${c_grn}==>${c_off} $*"; }
warn() { echo "${c_yel}!!! ${c_off}$*"; }
die()  { echo "${c_red}ERROR:${c_off} $*"; exit 1; }

# ----------------------------------------------------------------------------
# Pre-flight
# ----------------------------------------------------------------------------
[[ "$(uname -s)" == "Darwin" ]] || die "macOS only."
[[ "$(uname -m)" == "arm64"  ]] || warn "Not arm64 — script assumes Apple Silicon."

say "Logging to $LOG"
say "Plan: v15=$DO_V15  v16=$DO_V16  hrms=$DO_HRMS  wkhtmltopdf=$DO_WKHTML"

# Collect credentials up front so the rest runs unattended
read -r -s -p "MariaDB root password (blank if fresh brew install): " MARIADB_ROOT_PW; echo
read -r -s -p "ERPNext Administrator password to set: " ADMIN_PW; echo
[[ -n "$ADMIN_PW" ]] || die "Administrator password cannot be empty."

# ----------------------------------------------------------------------------
# 1. Homebrew
# ----------------------------------------------------------------------------
if ! command -v brew >/dev/null 2>&1; then
  say "Installing Homebrew (will prompt for your macOS password)…"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/opt/homebrew/bin/brew shellenv)"
else
  say "Homebrew present."
fi
BREW_PREFIX="$(brew --prefix)"

# ----------------------------------------------------------------------------
# 2. Xcode CLT
# ----------------------------------------------------------------------------
if ! xcode-select -p >/dev/null 2>&1; then
  say "Installing Xcode Command Line Tools…"
  xcode-select --install || true
  warn "If a GUI dialog appeared, finish it, then re-run this script."
fi

# ----------------------------------------------------------------------------
# 3. System packages
# ----------------------------------------------------------------------------
say "Installing system packages…"
brew install git redis mariadb pkg-config mariadb-connector-c openssl@3 \
  libffi cups freetype uv nvm 2>/dev/null || brew upgrade git redis mariadb \
  pkg-config mariadb-connector-c openssl@3 libffi cups freetype uv nvm || true

# ----------------------------------------------------------------------------
# 4. Build flags (persist to ~/.zshrc, and export for this run)
# ----------------------------------------------------------------------------
ZRC="$HOME/.zshrc"
add_line() { grep -qsF "$1" "$ZRC" 2>/dev/null || echo "$1" >> "$ZRC"; }

export LDFLAGS="-L$(brew --prefix openssl@3)/lib -L$(brew --prefix mariadb-connector-c)/lib"
export CPPFLAGS="-I$(brew --prefix openssl@3)/include -I$(brew --prefix mariadb-connector-c)/include"
export PKG_CONFIG_PATH="$(brew --prefix mariadb-connector-c)/lib/pkgconfig:$(brew --prefix openssl@3)/lib/pkgconfig"
export PATH="$HOME/.local/bin:$PATH"

say "Persisting build flags to $ZRC"
add_line 'export PATH="$HOME/.local/bin:$PATH"'
add_line "export LDFLAGS=\"-L\$(brew --prefix openssl@3)/lib -L\$(brew --prefix mariadb-connector-c)/lib\""
add_line "export CPPFLAGS=\"-I\$(brew --prefix openssl@3)/include -I\$(brew --prefix mariadb-connector-c)/include\""
add_line "export PKG_CONFIG_PATH=\"\$(brew --prefix mariadb-connector-c)/lib/pkgconfig:\$(brew --prefix openssl@3)/lib/pkgconfig\""

# ----------------------------------------------------------------------------
# 5. MariaDB utf8mb4 config + start
# ----------------------------------------------------------------------------
MYCNF="$BREW_PREFIX/etc/my.cnf"
if ! grep -qs "character-set-server = utf8mb4" "$MYCNF" 2>/dev/null; then
  say "Writing utf8mb4 config to $MYCNF"
  cat >> "$MYCNF" <<'EOF'

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysql]
default-character-set = utf8mb4
EOF
else
  say "MariaDB utf8mb4 config already present."
fi

say "Starting MariaDB + Redis…"
brew services start mariadb >/dev/null
brew services start redis  >/dev/null
sleep 4

# ----------------------------------------------------------------------------
# 6. nvm + Node versions
# ----------------------------------------------------------------------------
export NVM_DIR="$HOME/.nvm"; mkdir -p "$NVM_DIR"
add_line 'export NVM_DIR="$HOME/.nvm"'
add_line '[ -s "$(brew --prefix nvm)/nvm.sh" ] && \. "$(brew --prefix nvm)/nvm.sh"'
# shellcheck disable=SC1090
. "$(brew --prefix nvm)/nvm.sh"

[[ $DO_V15 -eq 1 ]] && { say "Installing Node $NODE15…"; nvm install "$NODE15"; }
[[ $DO_V16 -eq 1 ]] && { say "Installing Node $NODE16…"; nvm install "$NODE16"; }

# ----------------------------------------------------------------------------
# 7. bench CLI
# ----------------------------------------------------------------------------
if ! command -v bench >/dev/null 2>&1; then
  say "Installing frappe-bench via uv…"
  uv tool install frappe-bench
  export PATH="$HOME/.local/bin:$PATH"
fi
bench --version || die "bench install failed."

# ----------------------------------------------------------------------------
# Helper: build one bench
# ----------------------------------------------------------------------------
build_bench() {
  local dir="$1" branch="$2" site="$3" py="$4" node="$5" webport="$6" sioport="$7"
  cd "$BASE_DIR"

  nvm use "$node"

  if [[ ! -d "$dir" ]]; then
    say "[$branch] bench init → $dir (Python $py, Node $node)…"
    UV_PYTHON="$py" bench init --frappe-branch "$branch" "$dir"
  else
    say "[$branch] $dir exists — skipping init."
  fi

  cd "$dir"
  echo "$node" > .nvmrc

  if [[ ! -d "apps/erpnext" ]]; then
    say "[$branch] getting erpnext…"
    bench get-app --branch "$branch" erpnext
  fi
  if [[ $DO_HRMS -eq 1 && ! -d "apps/hrms" ]]; then
    say "[$branch] getting hrms…"
    bench get-app --branch "$branch" hrms
  fi

  if ! bench --site "$site" version >/dev/null 2>&1; then
    say "[$branch] creating site $site…"
    bench new-site "$site" \
      --mariadb-root-password "$MARIADB_ROOT_PW" \
      --admin-password "$ADMIN_PW" \
      --no-mariadb-socket
    bench --site "$site" install-app erpnext
    [[ $DO_HRMS -eq 1 ]] && bench --site "$site" install-app hrms
  else
    say "[$branch] site $site exists — skipping."
  fi

  bench use "$site"

  # Give v16 its own ports so both benches can run together
  if [[ "$webport" != "8000" ]]; then
    bench set-config -g webserver_port "$webport"  >/dev/null 2>&1 || true
    bench set-config -g socketio_port  "$sioport"  >/dev/null 2>&1 || true
  fi

  say "[$branch] done. Start with: cd $dir && bench start${webport:+ --port $webport}"
}

# ----------------------------------------------------------------------------
# 8. Build the benches
# ----------------------------------------------------------------------------
[[ $DO_V15 -eq 1 ]] && build_bench "$BENCH15_DIR" version-15 "$SITE15" "$PY15" "$NODE15" 8000 9000
[[ $DO_V16 -eq 1 ]] && build_bench "$BENCH16_DIR" version-16 "$SITE16" "$PY16" "$NODE16" 8001 9001

# ----------------------------------------------------------------------------
# 9. Auto Node-switch on cd (append once)
# ----------------------------------------------------------------------------
if ! grep -qs "load-nvmrc()" "$ZRC" 2>/dev/null; then
  cat >> "$ZRC" <<'EOF'

# Auto-switch Node version per bench (.nvmrc)
autoload -U add-zsh-hook
load-nvmrc() { [[ -f .nvmrc ]] && nvm use >/dev/null; }
add-zsh-hook chpwd load-nvmrc
EOF
fi

# ----------------------------------------------------------------------------
# 10. Optional: wkhtmltopdf patched-qt note
# ----------------------------------------------------------------------------
if [[ $DO_WKHTML -eq 1 ]]; then
  warn "wkhtmltopdf patched-qt has no brew-core arm64 build."
  warn "Download the arm64 .pkg from the wkhtmltopdf GitHub releases page and"
  warn "install it manually, then verify: wkhtmltopdf --version  (should say 'with patched qt')."
fi

# ----------------------------------------------------------------------------
# Summary
# ----------------------------------------------------------------------------
echo
say "${c_grn}Setup complete.${c_off}"
echo "  Open a NEW terminal (to load shell changes), then:"
[[ $DO_V15 -eq 1 ]] && echo "    cd $BASE_DIR/$BENCH15_DIR && bench start            → http://$SITE15:8000"
[[ $DO_V16 -eq 1 ]] && echo "    cd $BASE_DIR/$BENCH16_DIR && bench start --port 8001 → http://$SITE16:8001"
echo "  Login: Administrator / (the admin password you entered)"
echo "  Full log: $LOG"
