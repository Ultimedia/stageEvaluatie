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
    appData.settings = new Settings(); 
    
    var app = new appData.views.AppView();
    $("body").prepend(app.render().$el);

    // start history tracking
    Backbone.history.start();
  });
});






