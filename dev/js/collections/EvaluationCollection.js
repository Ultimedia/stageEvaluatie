EvaluationCollection = Backbone.Collection.extend({
	model: Answer,
	initialize: function (models,options) { 
		this.id = options.id;
		this.term = options.term;
	},

	url: function() {
    	return appData.settings.apiPath + "/answers/" + this.id;
  	}
});