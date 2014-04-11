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
    	var evaluationTerm = $(evt.target).attr('data-target')
    	var selectedInternship = appData.collections.internsCollection.where({"internship_id":internshipId});

    	appData.models.evaluationModel = new Evaluation();
		appData.models.evaluationModel.set('company_id', '');
		appData.models.evaluationModel.set('internship_id', internshipId);
		appData.models.evaluationModel.set('evaluate_term', evaluationTerm);
		appData.models.evaluationModel.save();

    	//"#rate/interim/<%= internship.internship_id %>
    	//#rate/final/
    },

    render: function() {
    	this.$el.html(this.template({internship: this.model.toJSON()}));
    	return this;
    }
   
});
