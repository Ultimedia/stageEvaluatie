appData.views.QuestionListView = Backbone.View.extend({
    tagName: 'tr',
    className: 'score',

    initialize: function () {
     	_.bindAll(this);      
    },

    events: {
        "change .score-option": "scoreOptionChangeHandler"
    },

    scoreOptionChangeHandler: function(evt){
        var selectedScoreModel = appData.collections.scores.models[parseInt(evt.currentTarget.selectedIndex)-1];
        $('.score-points', this.$el).text(selectedScoreModel.get('question_rating_points'));
    },

    render: function() {

    	this.$el.html(this.template({question: this.model.toJSON(), scoreOptions: appData.collections.scores.toJSON()}));

    	return this;
    }
   
});
