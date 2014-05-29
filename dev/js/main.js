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

appData.settings.apiPath = "/app/webroot/stageapp/eni/alp/syn/";
appData.settings.pdfPath = "/app/webroot/stageapp/pdf/";
appData.services.servicePath = "/app/webroot/stageapp/almo/services/";

//appData.settings.apiPath = "eni/alp/syn/";
//appData.settings.pdfPath = "/pdf/";
//appData.services.servicePath = "almo/services/";

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



