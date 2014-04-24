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

