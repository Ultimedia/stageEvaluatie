QuestionsCollection = Backbone.Collection.extend({
	url:  appData.settings.apiPath + "/questions",
	model: Question,
	initialize: function (models,options) { 

	}
});


