appData.views.InternListView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {
     	_.bindAll(this);    
    },

    events: {
    	"click .evaluateList":"evaluateListHandler"
    },

    evaluateListHandler: function(evt){
    	var internshipId = $(evt.target).attr('data-id');
    	var evaluationTerm = $(evt.target).attr('data-target');

        window.location.hash = "#rate/" + evaluationTerm + "/" + internshipId;
    },

    render: function() {
    	this.$el.html(this.template({internship: this.model.toJSON()}));
    	return this;
    }
   
});
