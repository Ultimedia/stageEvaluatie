InternshipCollection = Backbone.Collection.extend({
	url:  appData.settings.apiPath + "/internships",
	model: Internship,
	initialize: function (models,options) { 

	}
});