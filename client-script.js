frappe.ui.form.on('Quotation', {
	refresh: function(frm) {
		frm.toggle_display("scan_barcode", false);
		frm.toggle_display("tax_category", false);
		frm.toggle_display("shipping_rule", false);
		frm.toggle_display("incoterm", false);
		
	}
});

frappe.ui.form.on('Payroll Entry', {
	refresh: function(frm) {
		frm.toggle_display("salary_slip_based_on_timesheet", false);
		frm.toggle_display("validate_attendance", false);
		frm.toggle_display("project", false);
		
	}
});

frappe.ui.form.on('Salary Slip', {
	refresh: function(frm) {
		frm.toggle_display("salary_slip_based_on_timesheet", false);
	
	}
});

frappe.ui.form.on('Job Offer', {
	refresh: function(frm) {
		frm.toggle_display("select_terms", false);
		frm.toggle_display("terms", false);
		
	}
});

frappe.ui.form.on('Item', {
	refresh: function(frm) {
		frm.toggle_display("allow_alternative_item", false);
		frm.toggle_display("has_variants", false);
		frm.toggle_display("opening_stock", false);
		frm.toggle_display("tax_code", false);
		frm.toggle_display("inventory_settings_section", false);
		frm.toggle_display("sb_barcodes", false);
		frm.toggle_display("reorder_section", false);
		frm.toggle_display("serial_nos_and_batches", false);
		frm.toggle_display("supplier_details", false);
		frm.toggle_display("customer_details", false);
		frm.toggle_display("inspection_required_before_purchase", false);
		frm.toggle_display("quality_inspection_templates", false);
		frm.toggle_display("inspection_required_before_delivery", false);
		frm.toggle_display("quality_inspection_template", false);
		frm.toggle_display("lead_time_days", false);
		frm.toggle_display("is_customer_provided_item", false);
		frm.toggle_display("safety_stock", false);
		frm.toggle_display("foreign_trade_details", false);
		frm.toggle_display("inventory_section", false);
		frm.toggle_display("max_discount", false);
	}
});

frappe.ui.form.on('Purchase Invoice', {
	refresh: function(frm) {
	    frm.toggle_display("is_subcontracted", false);
        frm.toggle_display("scan_barcode", false);
        frm.toggle_display("rejected_warehouse", false);
        frm.toggle_display("tax_category", false);
	    frm.toggle_display("tax_category", false);
	    frm.toggle_display("shipping_rule", false);
	    frm.toggle_display("incoterm", false);
	    frm.toggle_display("named_place", false);
	    frm.toggle_display("scan_barcode", false);
	    frm.toggle_display("scan_barcode", false);
	    frm.toggle_display("raw_materials_supplied", false);

	}
});
