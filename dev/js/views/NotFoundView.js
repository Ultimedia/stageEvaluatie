appData.views.NotFoundView = Backbone.View.extend({
    initialize: function () {
    	_.bindAll(this);    
    	Backbone.on('languageChangeHandler', this.render);
    },
    
    render: function() {
        this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].error}));
    	return this;
    }
});

