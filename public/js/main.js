(function(){

// application data
var appData = {
  views: {},
  models: {},
  routers: {},
  collections: {},
  settings: {},
  utils: {},
  templates: {}
};

appData.settings.apiPath = "/api";
appData.settings.defaultLanguage = "/nl";

// initialise jquery
$(document).on("ready", function () {

  // load backbone templates
  appData.utils.templates.load(["AppView", "LoginView", "RegisterView", "HomeView", "EvaluateView", "ScorePanelView", "InternListView", "QuestionListView", "NotFoundView"],
  function () {

    // create a new app view instance and render it
    var settings = new Settings(); 
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
	url: appData.settings.apiPath + "/companies",
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
		final_score: ''
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
		final_score: null,
		interim_score: null
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
	defaults: {},
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
    	return appData.settings.apiPath + "/answers/" + this.id;
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
    }, 

    events:{
      "click #languageSelection": "languageClickHandler",
      "click #logo": "logoClickHandler"
    },

    logoClickHandler: function(){
      window.history.back();
    },

    languageClickHandler: function(){
      //appData.settings.lang 
    },
    
    render: function() { 
      this.$el.html(this.template());    


    // new backbone router
    appData.router = new appData.routers.AppRouter();
      

      return this; 
    }
});



appData.views.EvaluateView = Backbone.View.extend({
    initialize: function () {
    	_.bindAll(this);
        
        appData.collections.internsCollection = new InternshipCollection();
        appData.collections.internsCollection.on("sync reset",this.render);
        appData.collections.internsCollection.fetch();
    },

    renderTableViews: function(internship){
		var internShipTableView = new appData.views.InternListView({model:internship});
       $('#internshipsTable tbody').append(internShipTableView.render().$el);
	},

    render: function() {
    	this.$el.html(this.template());

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
    },

    events: function(){

    },

    render: function() {
    	this.$el.html(this.template());
		return this;
    }
});


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
    	return this;
    }
   
});


appData.views.LoginView = Backbone.View.extend({
    initialize: function () {
      _.bindAll(this);    
    },

    events: function(){

    },

    render: function() {
    	this.$el.html(this.template());

		$('#loginForm', this.$el).validate({
			submitHandler: function(){

		    // store the user
		   
			}
		});

      return this;
    }
});


appData.views.NotFoundView = Backbone.View.extend({
    initialize: function () {
     	_.bindAll(this);      
    },
    
    render: function() {
    	this.$el.html(this.template());
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
    	this.$el.html(this.template({question: this.model.toJSON(), scoreOptions: appData.collections.scores.toJSON()}));

        if(this.model.attributes.question_rating_points){
            $('.score-points', this.$el).text(this.model.attributes.question_rating_points);
        }

    	return this;
    }
   
});


appData.views.RegisterView = Backbone.View.extend({
    initialize: function () {
     	_.bindAll(this);      
    },

    registerHandler: function(){

    },

    render: function() {
    	this.$el.html(this.template());
        this.submitHandler();
    	return this;
    },

    submitHandler: function(){

        $('#registerForm', this.$el).validate({
            submitHandler: function(){

                // store the organisation
                var companyModel = new Company();
                    companyModel.set("company_contact", $("#nameInput", this.$el).val());
                    companyModel.set("company_email", $("#emailInput", this.$el).val());
                    companyModel.set("company_name", $("#bedrijfInput", this.$el).val());
                    companyModel.save();
            
                    appData.models.myCompanyModel = companyModel;
                    appData.router.navigate('evaluate', true);
            }
        });
    }
});

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
       $('#container').empty().append(new appData.views.EvaluateView().render().$el);
    },

    rateinterim: function(internshipId){
        this.rate(internshipId, "interim");
    },

    ratefinal: function(internshipId){
        this.rate(internshipId, "final");
    },

    rate: function(internshipId, term){
        $.when(appData.collections.internsCollection.fetch()).then(function() {
            var selectedInternship = appData.collections.internsCollection.where({'internship_id':internshipId});
            var evaluationTerm = term;

            // find out if there is already an evaluation present for this student, otherwise create a new evaluation id 
            appData.models.selectedInternshipModel = selectedInternship[0];

            appData.models.evaluationModel = new Evaluation();
            if(appData.models.myCompanyModel){
                appData.models.evaluationModel.set('company_id', appData.models.myCompanyModel.get('company_id'));
            }
            
            appData.models.evaluationModel.set('internship_id', internshipId);
            appData.models.evaluationModel.set('evaluate_term', evaluationTerm);
            appData.models.evaluationModel.save(null, {
                success: function (model, response) {

                    // once we have retrieved the evaluation id forward the user to the question screen
                    appData.collections.evaluationCollection = new EvaluationCollection([], { id:model.attributes.evaluation_id, term: evaluationTerm });

                    // render the scorepanel view
                    $('#container').empty().append(new appData.views.ScorePanelView({collection: appData.collections.evaluationCollection, model: appData.models.selectedInternshipModel}).render().$el);

                },
                error: function (model, response) {
                    alert('error bij het ophalen van de data');
                }
            });
        });
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