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

    languageClickHandler: function(evt){
      if(!$(evt.target).hasClass('selected')){

        // set button
        $('#languageSelection li a').toggleClass('selected');
        appData.settings.set('language', $(evt.target).attr('data-lang'));
      }
    },
    
    render: function() { 
      this.$el.html(this.template());    

      // new backbone router
      appData.router = new appData.routers.AppRouter();
    
      return this; 
    }
});

