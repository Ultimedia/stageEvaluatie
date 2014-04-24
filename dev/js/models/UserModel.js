User = Backbone.Model.extend({
	defaults:{
		email: "",
		password: ""
	},
	url: appData.settings.apiPath + "/login",
	initialize: function(){

	}
});