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
      var optionSelected = $("option:selected", evt.target).attr('rating-id');

      var selectedScoreModel = appData.collections.scores.models[optionSelected -1];
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
      var evalu = this.model;

      appData.container = this.$el;
      appData.models.selectedScoreModel = this.model;
      appData.models.selectedScoreModel = appData.collections.scores.where({'question_rating_id': this.model.attributes.score_id})[0];

      // prefill data      
      if(appData.models.selectedScoreModel){
        score = appData.models.selectedScoreModel.attributes.question_rating_id;
      }

      this.$el.html(this.template({scoreOptions: appData.collections.scores.toJSON(), internship: appData.models.selectedInternshipModel.toJSON(), term: this.collection.term, selectedScore: score, copy: appData.settings.attributes.copy[appData.settings.attributes.language].evaluation, language: appData.settings.attributes.language }));
    
      $('#totalScoreOptions option', this.$el).each(function(index, element){
        var value = $(element).val();
        
        if(value ==  evalu.attributes.final_score){
          $(element).prop('selected', true);
        }
      });

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
        }else{

          // see if we can copy data (this feature prefills data in the final term if the interim term has data)
          var evaluations = appData.models.selectedInternshipModel.attributes.evaluations;

          if(term == "final" && evaluations.length > 0){

              var evaluation_id = evalu.attributes.evaluation_id;

              $(evaluations).each(function(index, element){

                if(element.evaluate_term === "interim"){

                  // get the scores model
                  var scoresModel = appData.collections.scores.where({"question_rating_id": element.score_id})[0];
                  if(scoresModel){

                    $('#totalScoreOptions option').eq(parseInt(element.score_index)+1).prop('selected', true);
                  
                    var copy = scoresModel.get('question_ratings_context_nl');
                    if(appData.settings.attributes.language == "en"){
                      copy = scoresModel.get('question_ratings_context_en');
                    }

                    $('.score-description', this.$el).text(copy);
                  }

                  var evaluation_id = element.evaluation_id;
                  var internship_id = element.internship_id;
                  var evaluation = element;
                  var storedResults = new EvaluationCollection([], { id:evaluation_id, term: term });

                  $.when(storedResults.fetch()).then(function() {
                    if(storedResults.models.length > 0){
                      $('#evaluateTable tbody').empty();

                      storedResults.each(function(question){
                        renderQuestions(question);  
                      },this);
                      }
                  });
                }
              });
            }
        }
      });

      //pdfDownload
      if(this.model.get("pdf") !== ""){
        $('#pdfDownload').show().attr('href', '/app/webroot/stageapp/pdf/' + this.model.attributes.pdf);
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
          //var score = appData.collections.scores.models[scoreIndex].attributes.question_rating_points;
          var score = $('#totalScoreOptions option:selected').val();
          var score_id = $('#totalScoreOptions option:selected').attr('rating-id');

          var name = appData.models.selectedInternshipModel.get("student");
              name = name.replace(/\s/g, '');


          // pdf generator
          var html = $('.scorePage').html();
          
          $('#pdfContainer').append(html);

          // replace textareas with text
          $('#pdfContainer textarea').each(function(index, element){
            var text = $(element).text();
                text = ConvChar(text);

            $(element).replaceWith("<p>" + text + "</p>");
          });

          var dd = $('#totalScoreOptions option:selected').text();
              dd = ConvChar(dd);

          $('#pdfContainer #totalScoreOptions').replaceWith('<p>' + dd + '</p>') 

          // replace select options with the selected field
          $('#pdfContainer select').each(function(index, element){
            // grab the selected option
            var text = $('option:selected', element).text();
                text = ConvChar(text);


            $(element).replaceWith("<p>" + text + "</p>");
          });
          
          function ConvChar( str ) {
            c = {'<':'', '>':'', '&':'&amp;', '"':'&quot;', "'":'&#039;',
                 '#':'&#035;' };
            return str.replace( /[<&>'"#]/g, function(s) { return c[s]; } );
          }

          $('#pdfContainer .score-points').each(function(index, element){
            var t = $(element).text();
                t = ConvChar(t);
            $(element).text(t);
          });


          html = $('#pdfContainer').html();
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
                  evaluationModel.set('score_id', score_id);
                  evaluationModel.set('score_index', scoreIndex);

                  $.when(evaluationModel.save()).then(function() { 
                    // download pdf
                    window.open(
                      '/app/webroot/stageapp/pdf/' + path
                    );
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

