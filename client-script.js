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
frappe.ui.form.on('Sales Invoice', {
	refresh: function(frm) {
		frm.toggle_display("loyalty_points_redemption", false);
		frm.toggle_display("total_qty", false);
	    frm.toggle_display("tax_category", false);
	    frm.toggle_display("tax_category", false);
	    frm.toggle_display("shipping_rule", false);
	    frm.toggle_display("incoterm", false);
	    frm.toggle_display("named_place", false);
	    frm.toggle_display("scan_barcode", false);
	    frm.toggle_display("time_sheet_list", false);
	    frm.toggle_display("subscription_section", false);
	}
});
frappe.ui.form.on('Asset', {
	refresh: function(frm) {
		frm.toggle_display("naming_series", false);
		frm.toggle_display("accounting_dimensions_section", false);
		frm.toggle_display("section_break_31", false);

		
	}
});
frappe.ui.form.on('Customer', {
	refresh: function(frm) {
		frm.toggle_display("more_info", false);
		cur_frm.set_df_property('disabled', 'read_only', 1);
	}
});

frappe.ui.form.on('Customer', {
	refresh: function(frm) {
		cur_frm.set_df_property('disabled', 'read_only', 1);
	}
});
frappe.ui.form.on('Project', {
	refresh: function(frm) {
		frm.toggle_display("project_template", false);
		frm.toggle_display("insurance_details", false);
		frm.toggle_display("users_section", false);
		frm.toggle_display("project_details", false);
		frm.toggle_display("margin", false);
		frm.toggle_display("monitor_progress", false);
		frm.set_df_property('expected_start_date', 'reqd', 1);
		frm.set_df_property('expected_end_date', 'reqd', 1);
		frm.set_df_property('project_type', 'reqd', 1);
		

		
	}
});
frappe.ui.form.on('Staffing Plan', {
	refresh(frm) {
		frm.toggle_display("name", false);
	}
});
frappe.ui.form.on('Supplier Quotation', {
	refresh: function(frm) {
        frm.toggle_display("tax_category", false);
	    frm.toggle_display("shipping_rule", false);
	    frm.toggle_display("incoterm", false);
	    frm.toggle_display("named_place", false);
	}
});
frappe.ui.form.on('Employee Attendance Tool', {
	refresh(frm) {
		frm.set_df_property('shift', 'reqd', 1);
		frm.set_df_property('company', 'reqd', 1);
	}
})
frappe.ui.form.on('Sales Order', {
    refresh(frm) {
    setTimeout(() => {
        frm.remove_custom_button('Work Order', 'Create');
        frm.remove_custom_button('Request for Raw Materials', 'Create');
        }, 10);
    }
});
//Hide Feilds From SO
frappe.ui.form.on('Sales Order', {
	refresh: function(frm) {
		frm.toggle_display("sales_team_section_break", false);
		frm.toggle_display("more_info", false);
		frm.toggle_display("loyalty_points_redemption", false);
		frm.toggle_display("taxes_section", false);
		frm.toggle_display("scan_barcode", false);
		frm.toggle_display("total_qty", false);
	}
});
frappe.ui.form.on('Sales Order', {
	refresh: function(frm) {
		cur_frm.set_df_property("service_duration","read_only", cur_frm.doc.docstatus)
	}
});
frappe.ui.form.on('Sales Order', {
    refresh(frm) {
    setTimeout(() => {
        frm.remove_custom_button('Work Order', 'Create');
        frm.remove_custom_button('Request for Raw Materials', 'Create');
        frm.remove_custom_button('Subscription', 'Create');
        frm.remove_custom_button('Maintenance Visit', 'Create');
        frm.remove_custom_button('Maintenance Schedule', 'Create');
        frm.remove_custom_button('Pick List', 'Create');
        frm.remove_custom_button('Purchase Order', 'Create');
        frm.remove_custom_button('Material Request', 'Create');
        frm.remove_custom_button('Payment Request', 'Create');
        
        }, 10);
    }
});
frappe.ui.form.on('Purchase Order', {
	refresh: function(frm) {
	    frm.toggle_display("loyalty_points_redemption", false);
        frm.toggle_display("scan_barcode", false);
        frm.toggle_display("is_subcontracted", false);
        frm.toggle_display("scan_barcode", false);
        frm.toggle_display("tax_category", false);
	    frm.toggle_display("shipping_rule", false);
	    frm.toggle_display("incoterm", false);
	    frm.toggle_display("named_place", false);
	    frm.toggle_display("scan_barcode", false);

	}
});
frappe.ui.form.on('Purchase Order', {
    refresh(frm) {
    setTimeout(() => {
        frm.remove_custom_button('Payment', 'Create');
        }, 10);
    }
});
frappe.ui.form.on('Leave Application', {
	onload(frm) {
		if(frappe.user.has_role("Hide")){
		    frm.set_df_property("company", "hidden", true);
		    frm.set_df_property("department", "hidden", true);
		}
	}
});
frappe.ui.form.on('Cost Center', {
	onload(frm) {
		if(frappe.user.has_role("Hide")){
		    frm.set_df_property("sb0", "hidden", true);
		    frm.set_df_property("company", "hidden", true);
		    frm.set_df_property("cost_center_name", "hidden", true);
		    frm.set_df_property("sb0", "hidden", true);
		    frm.set_df_property("sb0", "hidden", true);
		    frm.set_df_property("sb0", "hidden", true);
		    frm.fields_dict['Convert to Non-Group'].wrapper.hide();
		}
	}
});
frappe.ui.form.on('Employee', {
	refresh: function(frm) {
		frm.set_df_property('custom_location', 'reqd', 1);
		frm.toggle_display("branch", false);
		cur_frm.page.wrapper.find(".new-timeline").css({'display':'none'});
	}
});
frappe.ui.form.on('Employee', {
	onload(frm) {
		if(frappe.user.has_role("Hide")){
		    frm.set_df_property("company", "hidden", true);
		    frm.set_df_property("department", "hidden", true);
		    frm.set_df_property("user_id", "hidden", true);
		}
	}
});

frappe.ui.form.on('Company', {
	onload(frm) {
		if(frappe.user.has_role("Hide")){
		    frm.set_df_property("accounts_tab", "hidden", true);
		    frm.set_df_property("buying_and_selling_tab", "hidden", true);
		    frm.set_df_property("hr_and_payroll_tab", "hidden", true);
		    frm.set_df_property("stock_tab", "hidden", true);
		    frm.set_df_property("dashboard_tab", "hidden", true);
		    frm.set_df_property("details", "hidden", true);
		    frm.set_df_property("section_break_28", "hidden", true);
		    frm.set_df_property("default_settings", "hidden", true);
		    frm.set_df_property("advance_payments_section", "hidden", true);
		    frm.set_df_property("exchange_rate_revaluation_settings_section", "hidden", true);
		    frm.set_df_property("budget_detail", "hidden", true);
		    frm.set_df_property("tax_details_section", "hidden", true);
		    frm.set_df_property("fixed_asset_defaults", "hidden", true);
		    frm.set_df_property("hr_settings_section", "hidden", true);
		    frm.set_df_property("auto_accounting_for_stock_settings", "hidden", true);
		    frm.set_df_property("budget_detail", "hidden", true);
		    frm.set_df_property("sales_settings", "hidden", true);
		    frm.set_df_property("company_info", "hidden", true);
		}
	}
});
frappe.ui.form.on('Company', {
	refresh: function(frm) {
		cur_frm.page.wrapper.find(".new-timeline").css({'display':'none'});
	}
});

frappe.ui.form.on('User', {
	refresh(frm) {
		cur_frm.page.wrapper.find(".new-timeline").css({'display':'none'});
	}
});

frappe.ui.form.on('Expense Claim', {
	onload(frm) {
		if(frappe.user.has_role("Hide")){
		    frm.set_df_property("company", "hidden", true);
		    frm.set_df_property("department", "hidden", true);
		    frm.set_df_property("advance_payments_sb", "hidden", true);
		    frm.set_df_property("is_paid", "hidden", true);
		    frm.set_df_property("cost_center", "hidden", true);
		    frm.set_df_property("mode_of_payment", "hidden", true);
		    frm.set_df_property("payable_account", "hidden", true);
		    frm.set_df_property("more_details", "hidden", true);
		    frm.set_df_property("clearance_date", "hidden", true);
		    frm.get_field('expense_claim_detail').grid.cannot_add_rows = true;
		    frm.refresh_filed("expense_claim_detail")
		}
	}
});
frappe.ui.form.on('Expense Claim', {
	refresh: function(frm) {
		frm.toggle_display("company_gstin", false);
		frm.toggle_display("insurance_details", false);
		frm.toggle_display("insurance_details", false);
		frm.toggle_display("taxes_and_charges_sb", false);
		frm.get_field('expense_claim_detail').grid.cannot_add_rows = true;
	}
});
frappe.ui.form.on('Expense Claim', {
	onload(frm) {
		frm.get_field('expenses').grid.cannot_add_rows = true;
		frm.refresh_filed("expenses");
	}
});
frappe.ui.form.on('Expense Claim', {
	refresh: function(frm) {
		frm.get_field('expenses').grid.cannot_add_rows = true;
		frm.refresh_filed("expenses");
	}
});


