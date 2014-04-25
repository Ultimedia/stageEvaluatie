appData.views.LoginView = Backbone.View.extend({
    initialize: function () {
      _.bindAll(this);    
      Backbone.on('languageChangeHandler', this.render);
    },

    render: function() {
    	this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].login}));

      var template = this.$el;

  		$('#loginForm', this.$el).validate({
  			submitHandler: function(){

  		    // store the user
  		    appData.models.userModel = new User();
          appData.models.userModel.set('password', $('#password', template).val());
          appData.models.userModel.set('email', $('#email', template).val());
          appData.models.userModel.save(null, {
              success: function (model, response) {
                $('#errorBox').addClass('hide');

                // set loggedIn to true
                appData.settings.set('loggedIn', true);
                appData.router.navigate('evaluate', true);
              },
              error: function (model, response) {
                $('#errorBox').removeClass('hide');
              }
          });
  			}
  		});

      return this;
    }
});

