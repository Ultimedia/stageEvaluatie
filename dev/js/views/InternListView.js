appData.views.InternListView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {
     	_.bindAll(this);      
    },

    render: function() {
    	this.$el.html(this.template({internship: this.model.toJSON()}));
    	return this;
    }
   
});
