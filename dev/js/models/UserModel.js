User = Backbone.Model.extend({
	defaults:{
		email: "",
		password: ""
	},
	url: appData.services.loginService,
	initialize: function(){

	}
});

