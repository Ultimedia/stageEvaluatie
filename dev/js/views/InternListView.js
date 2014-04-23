appData.views.InternListView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {
     	_.bindAll(this);    
    },

    events: {
    	"click .evaluateList":"evaluateListHandler"
    },

    evaluateListHandler: function(evt){
    	var internshipId = $(evt.target).attr('data-id');
    	var evaluationTerm = $(evt.target).attr('data-target');

        window.location.hash = "#rate/" + evaluationTerm + "/" + internshipId;
    },

    render: function() {
    	this.$el.html(this.template({internship: this.model.toJSON()}));
        var myTemplate = this.$el;

        // add the evalution score
        var evaluations = this.model.get('evaluations');
        if(evaluations.length > 0){
            $(evaluations).each(function(index, evaluation){
                if(evaluation.final_score !== ""){
                    switch(evaluation.evaluate_term){
                        case "interim":
                            $('.interim-score ', myTemplate).empty().text(evaluation.final_score);
                        break;

                        case "final":
                            $('.final-score', myTemplate).empty().text(evaluation.final_score);
                        break;
                    }
                }
            });
        }
    	return this;
    }
   
});
