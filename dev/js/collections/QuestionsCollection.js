QuestionsCollection = Backbone.Collection.extend({
	url:  appData.settings.apiPath + "/questions",
	model: Score,
	initialize: function (models,options) { 

	}
});