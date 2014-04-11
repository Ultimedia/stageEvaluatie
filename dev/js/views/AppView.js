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
    
    render: function() { 
      this.$el.html(this.template());    
      return this; 
    }
});

