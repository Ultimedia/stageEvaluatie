EvaluationCollection = Backbone.Collection.extend({
	model: Answer,
	initialize: function (models,options) { 
		this.id = options.id;
		this.term = options.term;
	},

	url: function() {
    	return "/app/webroot/stageapp/eni/alp/syn/answers/" + this.id;
  	}
});

