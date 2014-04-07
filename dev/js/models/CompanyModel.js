Company = Backbone.Model.extend({
	url: appData.settings.apiPath + "/companies",
	defaults:{
		company_email: undefined,
		company_contact: undefined,
		company_name: undefined
	},
	initialize: function(){

	}
});