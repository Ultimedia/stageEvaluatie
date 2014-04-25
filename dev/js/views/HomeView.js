appData.views.HomeView = Backbone.View.extend({
    initialize: function () {
    	_.bindAll(this);
    	Backbone.on('languageChangeHandler', this.render);
    },

    events: function(){

    },

    render: function() {
    	this.$el.html(this.template({copy: appData.settings.attributes.copy[appData.settings.attributes.language].home }));
		return this;
    }
});