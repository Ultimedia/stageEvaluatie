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




