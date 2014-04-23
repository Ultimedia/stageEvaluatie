appData.views.ScorePanelView = Backbone.View.extend({
    initialize: function () {
      _.bindAll(this);  

      // get the questions
  		appData.collections.questions = new QuestionsCollection();
      appData.collections.questions.on("sync reset",this.render);
  		appData.collections.questions.fetch();
    },

    pdfDownloadHandler: function(){
      
    },

    saveHandler: function(){
      $('#evaluateForm').submit();
    },

    events:{
      "change #totalScoreOptions": "totalScoreChangeHandler",
      "click #pdfDownload": "pdfDownloadHandler",
      "click #save": "saveHandler"
    },

    totalScoreChangeHandler: function(evt){
      var selectedScoreModel = appData.collections.scores.models[parseInt(evt.currentTarget.selectedIndex) -1];
      $('.score-description', this.$el).text(selectedScoreModel.get('question_ratings_context_nl'));
    },

    renderQuestionViews: function(questionModel){
		    var questionTableView = new appData.views.QuestionListView({model:questionModel, collection: this.collection});
        $('#evaluateTable tbody').append(questionTableView.render().$el);
     },

    render: function() {
      var term = this.collection.term;
      var score = null;

      appData.models.selectedScoreModel = this.model;
      appData.models.selectedScoreModel = appData.collections.scores.where({'question_rating_points': this.model.attributes.final_score})[0];

      // prefill data      
      if(appData.models.selectedScoreModel){
        score = appData.models.selectedScoreModel.attributes.question_rating_id;
      }

		  this.$el.html(this.template({scoreOptions: appData.collections.scores.toJSON(), internship: this.model.toJSON(), term: this.collection.term, selectedScore: score }));

      // prefill data
      if(appData.models.selectedScoreModel){
        // if we are updating an evaluation, prefill the form
        $('.score-description', this.$el).text(appData.models.selectedScoreModel.attributes.question_ratings_context_nl);
      }

      // add the questions
      $('#evaluateTable tbody').empty();
      appData.collections.questions.each(function(question){
        this.renderQuestionViews(question);  
      },this);

      this.wireForm();

      // if we have prefilled data, enter it
      var renderQuestions = this.renderQuestionViews;
      var dataCollection = this.collection;
      $.when(this.collection.fetch()).then(function() {

        if(dataCollection.models.length > 0){
          $('#evaluateTable tbody').empty();

          dataCollection.each(function(question){
            renderQuestions(question);  
          },this);
        }
      });

     	return this;
    },

    wireForm: function(){
      var id = parseInt(this.collection.id);
      var term = this.collection.term;
      var evaluationModel = this.model;

      $('#evaluateForm', this.$el).validate({
        submitHandler: function(){

          // now save or update the data in the database
          $('.score').each(function(index, element){
            var answerModel = new Answer();
                answerModel.set('evaluation_id', id);
                answerModel.set('question_rating_id', parseInt($('.score-option', element)[0].selectedIndex));
                answerModel.set('question_id', $('td', element).first().attr('data-id'));
                answerModel.set('remarks', $('textarea', element).val());
                answerModel.save();
          });

          // update the internship model
          var scoreIndex = parseInt($('#totalScoreOptions')[0].selectedIndex-1);
          var score = appData.collections.scores.models[scoreIndex].attributes.question_rating_points;

          // save the score
          evaluationModel.set('final_score', score);
          $.when(evaluationModel.save()).then(function() {
            window.location = "#evaluate";
          });
        }
      });
    }
});

