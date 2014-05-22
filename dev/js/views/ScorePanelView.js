appData.views.ScorePanelView = Backbone.View.extend({
    className: "scorePage",
    initialize: function () {
      _.bindAll(this);  

      // get the questions
      appData.collections.questions = new QuestionsCollection();
      appData.collections.questions.on("sync reset",this.render);
      appData.collections.questions.fetch();

      Backbone.on('languageChangeHandler', this.render);  
    },

    saveHandler: function(){
      $('#evaluateForm').submit();
    },

    events:{
      "change #totalScoreOptions": "totalScoreChangeHandler",
      "click #save": "saveHandler"
    },

    totalScoreChangeHandler: function(evt){
      var selectedScoreModel = appData.collections.scores.models[parseInt(evt.currentTarget.selectedIndex) -1];

      var copy = selectedScoreModel.get('question_ratings_context_nl');
      if(appData.settings.attributes.language == "en"){
        copy = selectedScoreModel.get('question_ratings_context_en');
      }

      $('.score-description', this.$el).text(copy);
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

      this.$el.html(this.template({scoreOptions: appData.collections.scores.toJSON(), internship: appData.models.selectedInternshipModel.toJSON(), term: this.collection.term, selectedScore: score, copy: appData.settings.attributes.copy[appData.settings.attributes.language].evaluation, language: appData.settings.attributes.language }));

      // prefill data
      if(appData.models.selectedScoreModel){
        var copy = appData.models.selectedScoreModel.attributes.question_ratings_context_nl;

        if(appData.settings.attributes.language === "en"){
          copy = appData.models.selectedScoreModel.attributes.question_ratings_context_en;
        }

        // if we are updating an evaluation, prefill the form
        $('.score-description', this.$el).text(copy);
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

      //pdfDownload
      if(this.model.get("pdf") !== ""){
        $('#pdfDownload').show().attr('href', this.model.attributes.pdf);
      }else{
        $('#pdfDownload').hide();
      }

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


          var name = appData.models.selectedInternshipModel.get("student");
              name = name.replace(/\s/g, '');

          var html = $('.scorePage').html();

          // now generate a pdf`
          $.ajax({
            url: appData.services.pdfService,
            type:'POST',
            data: "data="+html+"&name="+name+"&term="+term,
            timeout:60000,
              success:function(path){

                  // save the score
                  evaluationModel.set('pdf', path);
                  evaluationModel.set('update_score', true);
                  evaluationModel.set('final_score', score);
                  
                  $.when(evaluationModel.save()).then(function() { 
          
                    // forward the user when done
                    window.location = "#evaluate";
                  });

              },
              error: function(){
                alert('Error');
              }
          });
        }
      });
    }
});

