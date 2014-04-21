Answer = Backbone.Model.extend({
	defaults:{
		evaluation_id: '',
		question_id: '',
		question_rating_id: '',
		remarks: ''
	},
	url: appData.settings.apiPath + "/answer",
	initialize: function(){

	}
});