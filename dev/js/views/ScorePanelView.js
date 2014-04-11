appData.views.ScorePanelView = Backbone.View.extend({
    initialize: function () {
      _.bindAll(this);  

		appData.collections.questions = new QuestionsCollection();
		appData.collections.questions.on("sync reset",this.render);
		appData.collections.questions.fetch();
    },

    events:{
      "change #totalScoreOptions": "totalScoreChangeHandler",
    },

    totalScoreChangeHandler: function(evt){
      var selectedScoreModel = appData.collections.scores.models[evt.currentTarget.selectedIndex];
      $('.score-description', this.$el).text(selectedScoreModel.get('question_ratings_context_nl'));
    },

    renderQuestionViews: function(internship){
		    var questionTableView = new appData.views.QuestionListView({model:internship});
        $('#evaluateTable tbody').append(questionTableView.render().$el);
     },

    render: function() {
		  this.$el.html(this.template({scoreOptions: appData.collections.scores.toJSON(), internship: this.model.toJSON() }));

      $('#evaluateTable tbody').empty();
      appData.collections.questions.each(function(question){
        this.renderQuestionViews(question);  
      },this);

     	return this;
    }
});
