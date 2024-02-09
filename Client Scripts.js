For Hide Activites 

frappe.ui.form.on('Employee', {
	refresh: function(frm) {
		cur_frm.page.wrapper.find(".new-timeline").css({'display':'none'});		
	}
});

For hide other field 

frappe.ui.form.on('Employee', {
	refresh: function(frm) {
		frm.set_df_property('custom_location', 'reqd', 1);
		frm.toggle_display("branch", false);	
	}
});

For Hide Role based 

frappe.ui.form.on('Company', {
	onload(frm) {
		if(frappe.user.has_role("Role_name")){
		    frm.set_df_property("accounts_tab", "hidden", true);
		    frm.set_df_property("buying_and_selling_tab", "hidden", true);
		}
	}
});

For Read only 

frappe.ui.form.on('Sales Order', {
	refresh: function(frm) {
		cur_frm.set_df_property("service_duration","read_only", cur_frm.doc.docstatus)
	}
});

For hide Buttons

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