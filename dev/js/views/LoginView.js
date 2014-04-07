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
