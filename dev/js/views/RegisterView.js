appData.views.RegisterView = Backbone.View.extend({
    initialize: function () {
     	_.bindAll(this);    
        Backbone.on('languageChangeHandler', this.render);  
    },

    render: function() {
        this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].registration}));
        this.wireForm();
    	return this;
    },

    wireForm: function(){

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