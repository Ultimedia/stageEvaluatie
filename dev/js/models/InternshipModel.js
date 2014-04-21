Internship = Backbone.Model.extend({
	defaults:{
		internship_id: undefined,
		international: undefined,
		student: undefined,
		email: undefined,
		organisation: undefined,
		mentor: undefined,
		location: undefined,
		discipline: undefined,
		coach: undefined,
		final_score: null,
		interim_score: null
	},
	initialize: function (models,options) { 
		this.id = options.id;
	},

	url: function() {
    	return appData.settings.apiPath + "/internshipd/" + this.attributes.internship_id;
  	}
});

