/posawesome/posawesome/__init__.py



# -*- coding: utf-8 -*-
from __future__ import unicode_literals

__version__ = "15.2.2"

def console(*data):
    try:
        import frappe
        frappe.publish_realtime("toconsole", data, user=frappe.session.user)
    except ImportError:
        # frappe not available during setup
        pass
