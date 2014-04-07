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





