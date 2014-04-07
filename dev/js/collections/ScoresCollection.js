ScoresCollection = Backbone.Collection.extend({
	url:  appData.settings.apiPath + "/scores",
	model: Question,
	initialize: function (models,options) { 

	}
});