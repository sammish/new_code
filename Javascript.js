"is_group" filter
===========================
frappe.ui.form.on('Site Entry', {
    refresh: function(frm) {
        // Disable is_group filter for your_fieldname
        frm.fields_dict['cost_center'].get_query = function(doc, cdt, cdn) {
            return {
                filters: [
                    ['is_group', '=', 0]  // Disable is_group filter
                ]
            };
        };
    }
});