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
