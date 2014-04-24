appData.views.RegisterView = Backbone.View.extend({
    initialize: function () {
     	_.bindAll(this);      
    },

    registerHandler: function(){

    },

    render: function() {
    	this.$el.html(this.template());
        this.submitHandler();
    	return this;
    },

    submitHandler: function(){

        $('#registerForm', this.$el).validate({
            submitHandler: function(){

                // store the organisation
                var companyModel = new Company();
                    companyModel.set("company_contact", $("#nameInput", this.$el).val());
                    companyModel.set("company_email", $("#emailInput", this.$el).val());
                    companyModel.set("company_name", $("#bedrijfInput", this.$el).val());
                    companyModel.save(null, {
                        success: function (model, response) {                         
                            appData.settings.set('loggedIn', true);
                            appData.models.myCompanyModel = companyModel;
                            appData.router.navigate('evaluate', true);
                        },
                        error: function (model, response) {

                        }
                    });
            }
        });
    }
});