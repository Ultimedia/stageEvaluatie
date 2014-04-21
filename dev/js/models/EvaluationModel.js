Evaluation = Backbone.Model.extend({
	url: appData.settings.apiPath + "/evaluation",
	defaults:{
		company_id: '',
		internship_id: '',
		evaluate_term: '',
		final_score: ''
	},
	initialize: function(){

	}
});