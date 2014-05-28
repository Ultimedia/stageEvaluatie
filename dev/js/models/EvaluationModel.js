Evaluation = Backbone.Model.extend({
	url: appData.settings.apiPath + "/evaluation",
	defaults:{
		company_id: '',
		internship_id: '',
		evaluate_term: '',
		final_score: '',
		update_score: false,
		pdf: '',
		score_id: '',
		score_index: ''
	},
	initialize: function(){

	}
});