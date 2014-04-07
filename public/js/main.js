(function(){

// data containers
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

// Jquery Document Ready
$(document).on("ready", function () {
  appData.router = new appData.routers.AppRouter();

  // Load data on app init
  appData.collections.questions = new QuestionsCollection();
  appData.collections.questions.fetch();


  appData.collections.scores = new ScoresCollection();
  appData.collections.scores.fetch();

  // Load templates
  appData.utils.templates.load(["LoginView", "RegisterView", "HomeView", "EvaluateView", "ScorePanelView", "InternListView", "QuestionListView"],
  function () {

      // Init backbone history
      Backbone.history.start();
  });
});







Company = Backbone.Model.extend({
	url: appData.settings.apiPath + "/companies",
	defaults:{
		company_email: undefined,
		company_contact: undefined,
		company_name: undefined
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
		coach: undefined
	},
	initialize: function(){

	}
});



Question = Backbone.Model.extend({
	defaults:{
		question_id: undefined,
		question_description_nl: undefined,
		question_description_en: undefined
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

CompanyCollection = Backbone.Collection.extend({
	model: Company,
	initialize: function (models,options) { 

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
	model: Score,
	initialize: function (models,options) { 

	}
});

ScoresCollection = Backbone.Collection.extend({
	url:  appData.settings.apiPath + "/scores",
	model: Question,
	initialize: function (models,options) { 

	}
});

appData.views.EvaluateView = Backbone.View.extend({
    initialize: function () {
    	_.bindAll(this);
        
        this.collection = new InternshipCollection();
        this.collection.on("sync reset",this.render);
        this.collection.fetch();
    },

    events: function(){

    },

    renderTableViews: function(internship){

		var internShipTableView = new appData.views.InternListView({model:internship});
       $('#internshipsTable tbody').append(internShipTableView.render().$el);
	},

    render: function() {
    	this.$el.html(this.template());

        // update the
        $('#internshipsTable tbody', this.$el).empty();
      	this.collection.each(function(internship){
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
      return this;
    }
});


appData.views.QuestionListView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {
     	_.bindAll(this);      
    },

    events: {
    	"change .score-option": "scoreOptionChangeHandler"
    },

    scoreOptionChangeHandler: function(evt){
    	var selectedScoreModel = appData.collections.scores.models[evt.currentTarget.selectedIndex];
    		$('.score-points', this.$el).text(selectedScoreModel.get('question_rating_points'));
    },

    render: function() {
    	this.$el.html(this.template({question: this.model.toJSON(), scoreOptions: appData.collections.scores.toJSON()}));
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

		appData.collections.questions = new QuestionsCollection();
		appData.collections.questions.on("sync reset",this.render);
		appData.collections.questions.fetch();
    },

    events:{
      "change #totalScoreOptions": "totalScoreChangeHandler"
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
		  this.$el.html(this.template({scoreOptions: appData.collections.scores.toJSON()}));

      $('#evaluateTable tbody').empty();
      appData.collections.questions.each(function(question){
        this.renderQuestionViews(question);  
      },this);

     	return this;
    }
});


appData.routers.AppRouter = Backbone.Router.extend({
    routes: {
        "":                 "home",
        "login":            "login",
        "register":         "register",
        "evaluate":			"evaluate",
        "rate/interim/:id":  "rate",
        "rate/final/:id":    "rate"
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

    rate: function(id){
        $('#container').empty().append(new appData.views.ScorePanelView().render().$el);
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