(function(){

// application data
var appData = {
  views: {},
  models: {},
  routers: {},
  collections: {},
  settings: {},
  utils: {},
  templates: {},
  services: {}
};

appData.settings.apiPath = "/app/webroot/stageapp/eni/alp/syn";
appData.settings.pdfPath = "/app/webroot/stageapp/pdf/";
appData.services.servicePath = "/app/webroot/stageapp/almo/services/";

appData.settings.apiPath = "eni/alp/syn/";
appData.settings.pdfPath = "/pdf/";
appData.services.servicePath = "almo/services/";


appData.services.loginService =  appData.services.servicePath + "loginService.php";
appData.services.registerService = appData.services.servicePath + "registerService.php";
appData.services.pdfService = appData.services.servicePath + "pdfService.php";

appData.settings.defaultLanguage = "/nl";

// initialise jquery
$(document).on("ready", function () {

  // load backbone templates
  appData.utils.templates.load(["AppView", "LoginView", "RegisterView", "HomeView", "EvaluateView", "ScorePanelView", "InternListView", "QuestionListView", "NotFoundView"],
  function () {

    // create a new app view instance and render it
    appData.settings = new Settings(); 
    
    var app = new appData.views.AppView();
    $("body").prepend(app.render().$el);

    // start history tracking
    Backbone.history.start();
  });
});





Answer = Backbone.Model.extend({
	defaults:{
		evaluation_id: '',
		question_id: '',
		question_rating_id: '',
		remarks: ''
	},
	url: appData.settings.apiPath + "/answer",
	initialize: function(){

	}
});

Company = Backbone.Model.extend({
	url: appData.services.registerService,
	defaults:{
		company_email: undefined,
		company_contact: undefined,
		company_name: undefined,
		company_id: 0
	},
	initialize: function(){

	}
});

Evaluation = Backbone.Model.extend({
	url: appData.settings.apiPath + "/evaluation",
	defaults:{
		company_id: '',
		internship_id: '',
		evaluate_term: '',
		final_score: '',
		update_score: false,
		pdf: '',
		score_id: '',
		score_index: ''
	},
	initialize: function(){

	}
});

Internship = Backbone.Model.extend({
	defaults:{
		internship_id: undefined,
		international: undefined,
		student: undefined,
		email: undefined,
		organisation: undefined,
		mentor: undefined,
		location: undefined,
		discipline: undefined,
		coach: undefined,
		evaluations: []
	},
	initialize: function (models,options) { 
		this.id = options.id;
	},

	url: function() {
    	return appData.settings.apiPath + "/internshipd/" + this.attributes.internship_id;
  	}
});



Question = Backbone.Model.extend({
	defaults:{
		question_id: undefined,
		question_description_nl: undefined,
		question_description_en: undefined,
		evaluation_id: undefined,
		question_rating_id: undefined,
		remarks: undefined
	},
	initialize: function(){

	}
});

Score = Backbone.Model.extend({
	defaults:{
		question_rating_id: undefined,
		question_rating_rating_nl: undefined,
		question_rating_rating_en: undefined,
		question_ratings_context_nl:undefined, 
		question_ratings_context_en: undefined,
		question_rating_points: undefined
	},
	initialize: function(){

	}
});

Settings = Backbone.Model.extend({
	defaults: {
		loggedIn: false,
		language: "nl",
		copy: {
			nl: {
				general: {
					title: "DEVINE STAGE EVALUATIE"
				},
				home: {
					companyBtn: "STAGEBEDRIJF OF ORGANISATIE"
				},
				registration: {
					registerTitle: "Registratie",
					registerBtn: "REGISTREER",
					nameField: "Naam",
					emailField: "E-mailadres",
					companyField: "Bedrijf",
					verifyCode: "Verificatie code",
					registerError: "De verificatie code is niet correct!"
				},
				login: {
					loginBtn: "Login",
					emailField: "E-mailadres",
					passwordField: "Paswoord",
					loginError: "Je paswoord is niet correct of je hebt geen toegang tot het stageplatform."
				},
				internships:{
					studentLabel: "Student",
					organisationLabel: "Organisatie",
					mentorLabel: "Begeleider",
					interimLabel: "Tussentijdse evaluatie",
					finalLabel: "Eindevaluatie",
					evaluateBtn: "Vul aan..."
				},
				evaluation: {
					questionLabel: "Vraag",
					ratingLabel: "Beoordeling",
					scoreLabel: "Punt",
					remarkLabel: "Opmerking",
					selectionLabel: "Maak een keuze",
					requiredField: "Dit veld moet worden ingevuld",
					finalScoreLabel: "Eindscore",
					interimLabel: "Tussentijdse evaluatie",
					finalLabel: "Eindevaluatie",
					saveLabel: "Bewaar",
					exportLabel: "Download PDF"
				},
				error: {
					notFound: "<b>404:</b> Deze pagina werd niet gevonden"
				}
			},

			en: {
				general: {
					title: "DEVINE INTERNSHIP EVALUATION"
				},
				home: {
					companyBtn: "COMPANY OR ORGANISATION"
				},
				registration: {
					registerTitle: "Registration",
					registerBtn: "REGISTER",
					nameField: "Name",
					emailField: "Email",
					companyField: "Company",
					verifyCode: "Verification code",
					registerError: "The verification code is incorrect!"
				},
				login: {
					loginBtn: "LOGIN",
					emailField: "Email",
					passwordField: "Password",
					loginError: "The password you have entered is not correct."
				},
				internships:{
					studentLabel: "Student",
					organisationLabel: "Organisation",
					mentorLabel: "Coach",
					interimLabel: "Interim evaluation",
					finalLabel: "Final evaluation",
					evaluateBtn: "Evaluate...",
				},
				evaluation: {
					questionLabel: "Question",
					ratingLabel: "Rating",
					scoreLabel: "Score",
					remarkLabel: "Remark",
					selectionLabel: "Select a score",
					requiredField: "This field is required",
					finalScoreLabel: "Final score",
					interimLabel: "Interim evaluation",
					finalLabel: "Final evaluation",
					saveLabel: "Save",
					exportLabel: "Download PDF"
				},
				error: {
				  notFound: "<b>404:</b> The page could not be found"
				}
			}
		}
	},
	initialize: function(){
    	this.bind("change:language", this.languageChangeHandler)
	},

	// update the language
    languageChangeHandler: function(event){
    	Backbone.trigger('languageChangeHandler');
    }
});



User = Backbone.Model.extend({
	defaults:{
		email: "",
		password: ""
	},
	url: appData.services.loginService,
	initialize: function(){

	}
});



CompanyCollection = Backbone.Collection.extend({
	model: Company,
	initialize: function (models,options) { 

	}
});

EvaluationCollection = Backbone.Collection.extend({
	model: Answer,
	initialize: function (models,options) { 
		this.id = options.id;
		this.term = options.term;
	},

	url: function() {
		//return "/app/webroot/stageapp/eni/alp/syn/answers/" + this.id;

    	return "eni/alp/syn/answers/" + this.id;
  	}
});



InternshipCollection = Backbone.Collection.extend({
	url:  appData.settings.apiPath + "/internships",
	model: Internship,
	initialize: function (models,options) { 

	}
});

QuestionsCollection = Backbone.Collection.extend({
	url:  appData.settings.apiPath + "/questions",
	model: Question,
	initialize: function (models,options) { 

	}
});




ScoresCollection = Backbone.Collection.extend({
	url:  appData.settings.apiPath + "/scores",
	model: Question,
	initialize: function (models,options) { 

	}
});

  // Create the app view container
  appData.views.AppView = Backbone.View.extend({
    tagName: 'div',
    id: "application",

    initialize: function(options) { 
      _.bindAll(this); 

      // Load data on app init
      appData.collections.questions = new QuestionsCollection();
      appData.collections.questions.fetch();

      appData.collections.internsCollection = new InternshipCollection();
      appData.collections.internsCollection.fetch();

      appData.collections.scores = new ScoresCollection();
      appData.collections.scores.fetch();

      Backbone.on('languageChangeHandler', this.changeLanguage);  
    }, 

    events:{
      "click #languageSelection": "languageClickHandler",
      "click #logo": "logoClickHandler"
    },

    logoClickHandler: function(){
      appData.router.navigate('#evaluate', true);
    },

    languageClickHandler: function(evt){
      if(!$(evt.target).hasClass('selected')){

        // set button
        $('#languageSelection li a').toggleClass('selected');
        appData.settings.set('language', $(evt.target).attr('data-lang'));
      }
    },
    
    render: function() { 
      this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].general}));    
      appData.router = new appData.routers.AppRouter();
 
      return this; 
    },

    changeLanguage: function(){
      $('#brand h2').text(appData.settings.attributes.copy[appData.settings.attributes.language].general.title);
    }
});



appData.views.EvaluateView = Backbone.View.extend({
    initialize: function () {
    	_.bindAll(this);
        
        appData.collections.internsCollection = new InternshipCollection();
        appData.collections.internsCollection.on("sync reset",this.render);
        appData.collections.internsCollection.fetch();

        Backbone.on('languageChangeHandler', this.render);
    },

    renderTableViews: function(internship){
        var internShipTableView = new appData.views.InternListView({model:internship});
        $('#internshipsTable tbody').append(internShipTableView.render().$el);
	},

    render: function() {
        this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].internships}));

        // update the
        $('#internshipsTable tbody', this.$el).empty();
      	appData.collections.internsCollection.each(function(internship){
			this.renderTableViews(internship);  
		},this);

      	return this;
    }
});


appData.views.HomeView = Backbone.View.extend({
    initialize: function () {
    	_.bindAll(this);
    	Backbone.on('languageChangeHandler', this.render);
    },

    render: function() {
    	this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].home }));
		return this;
    }
});

appData.views.InternListView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {
     	_.bindAll(this);  
        Backbone.on('languageChangeHandler', this.render);  
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
    	this.$el.html(this.template({internship: this.model.toJSON(), copy: appData.settings.attributes.copy[appData.settings.attributes.language].internships}));
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


appData.views.LoginView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this);
        Backbone.on('languageChangeHandler', this.render);
    },

    render: function () {
        this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].login}));

        var template = this.$el;

        $('#loginForm', this.$el).validate({
            submitHandler: function () {

                // store the user
                appData.models.userModel = new User();
                appData.models.userModel.set('password', $('#password', template).val());
                appData.models.userModel.set('email', $('#email', template).val());
                appData.models.userModel.save(null, {
                    success: function (model, response) {
                        $('#errorBox').addClass('hide');

                        // set loggedIn to true
                        appData.settings.set('loggedIn', true);
                        appData.router.navigate('evaluate', true);
                    },
                    error: function (model, response) {
                        $('#errorBox').removeClass('hide');
                    }
                });
            }
        });

        return this;
    }
});



appData.views.NotFoundView = Backbone.View.extend({
    initialize: function () {
    	_.bindAll(this);    
    	Backbone.on('languageChangeHandler', this.render);
    },
    
    render: function() {
        this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].error}));
    	return this;
    }
});



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
    	this.$el.html(this.template({question: this.model.toJSON(), scoreOptions: appData.collections.scores.toJSON(), language: appData.settings.attributes.language, copy: appData.settings.attributes.copy[appData.settings.attributes.language].evaluation}));

        if(this.model.attributes.question_rating_points){
            $('.score-points', this.$el).text(this.model.attributes.question_rating_points);
        }

    	return this;
    }
});


appData.views.RegisterView = Backbone.View.extend({
    initialize: function () {
     	_.bindAll(this);    
        Backbone.on('languageChangeHandler', this.render);  
    },

    render: function() {
        this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].registration}));
        this.wireForm();
    	return this;
    },

    wireForm: function(){

        $('#registerForm', this.$el).validate({
            submitHandler: function(){

                // store the organisation
                var companyModel = new Company();
                    companyModel.set("company_contact", $("#nameInput", this.$el).val());
                    companyModel.set("company_email", $("#emailInput", this.$el).val());
                    companyModel.set("company_name", $("#bedrijfInput", this.$el).val());
                    companyModel.set("verify_code", $("#verifyCode", this.$el).val());

                    companyModel.save(null, {
                        success: function (model, response) {    
                            console.log(response);
                            console.log(model);

                            appData.settings.set('loggedIn', true);
                            appData.models.myCompanyModel = companyModel;
                            appData.router.navigate('evaluate', true);

                            $('#errorBox').addClass('hide');
                        },
                        error: function (model, response) {
                            $('#errorBox').removeClass('hide');
                        }
                    });
            }
        });
    }
});

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



appData.routers.AppRouter = Backbone.Router.extend({
    routes: {
        "":              "home",
        "login":            "login",
        "register":         "register",
        "evaluate":			"evaluate",
        "rate/interim/:id":  "rateinterim",
        "rate/final/:id":    "ratefinal",
        "*notFound": "notfound"
    },

    initialize: function () {
        this.routesHit = 0;
        //keep count of number of routes handled by the application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    home: function () {
        $('#container').empty().append(new appData.views.HomeView().render().$el);
    },

    login: function () {
    	$('#container').empty().append(new appData.views.LoginView().render().$el);
	},

    register: function(){
        $('#container').empty().append(new appData.views.RegisterView().render().$el);
    },

    evaluate: function(){
       if (appData.settings.get('loggedIn')) $('#container').empty().append(new appData.views.EvaluateView().render().$el);
       else appData.router.navigate('', true);
    },

    rateinterim: function(internshipId){
        this.rate(internshipId, "interim");
    },

    ratefinal: function(internshipId){
        this.rate(internshipId, "final");
    },

    rate: function(internshipId, term){
        if (appData.settings.get('loggedIn')){
            $.when(appData.collections.internsCollection.fetch()).then(function() {
                var selectedInternship = appData.collections.internsCollection.where({'internship_id':internshipId});
                var evaluationTerm = term;

                // find out if there is already an evaluation present for this student, otherwise create a new evaluation id 
                appData.models.selectedInternshipModel = selectedInternship[0];

                appData.models.evaluationModel = new Evaluation();
                if(appData.models.myCompanyModel){
                    appData.models.evaluationModel.set('company_id', appData.models.myCompanyModel.get('company_id'));
                }
        
                appData.models.evaluationModel.set('update_score', false);
                appData.models.evaluationModel.set('internship_id', internshipId);
                appData.models.evaluationModel.set('evaluate_term', evaluationTerm);
                appData.models.evaluationModel.save(null, {
                    success: function (model, response) {

                        // once we have retrieved the evaluation id forward the user to the question screen
                        appData.collections.evaluationCollection = new EvaluationCollection([], { id:model.attributes.evaluation_id, term: evaluationTerm });

                        // render the scorepanel view
                        $('#container').empty().append(new appData.views.ScorePanelView({collection: appData.collections.evaluationCollection, model: appData.models.evaluationModel}).render().$el);

                    },
                    error: function (model, response) {
                        alert('error bij het ophalen van de data');
                    }
                });
            });
        }else{
            appData.router.navigate('', true);
        }
    },

    notfound: function(){
       $('#container').empty().append(new appData.views.NotFoundView().render().$el);
    }
});



appData.utils.templates = (function() {

    var load = function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (appData.views[view]) {
                deferreds.push($.get('public/templates/' + view + '.html', function(data) {
                    appData.views[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });


        $.when.apply(null, deferreds).done(callback);
    }



    // The public API
    return {
        load: load
    };


}());

})();