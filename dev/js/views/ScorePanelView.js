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
		  this.$el.html(this.template({scoreOptions: appData.collections.scores.toJSON(), internship: this.model.toJSON(), term: this.collection.term }));
      appData.models.selectedScoreModel = this.model;


      var scoresModel;
      var term = this.collection.term;

      if(term === "interim"){
        scoresModel = appData.collections.scores.where({'question_rating_points': this.model.attributes.interim_score})[0];
        $('.score-description', this.$el).text(this.model.attributes.interim_score);
      }else{
        scoresModel = appData.collections.scores.where({'question_rating_points': this.model.attributes.final_score})[0];
        $('.score-description', this.$el).text(this.model.attributes.final_score);
      }

      console.log(scoresModel);
      $('#totalScoreOptions', this.$el).val(parseInt(scoresModel.attributes.question_rating_id)-1);

      $('#evaluateTable tbody').empty();
      appData.collections.questions.each(function(question){
        this.renderQuestionViews(question);  
      },this);

      this.wireForm();

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

      console.log(this.model.attributes);

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

          if(term === "interim"){
            evaluationModel.set('final_score', score);
          }else{
            evaluationModel.set('final_score', score);
          }

          $.when(evaluationModel.save()).then(function() {
            window.location = "#evaluate";
          });
        }
      });
    }
});

