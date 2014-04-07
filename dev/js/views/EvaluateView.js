appData.views.EvaluateView = Backbone.View.extend({
    initialize: function () {
    	_.bindAll(this);
        
        this.collection = new InternshipCollection();
        this.collection.on("sync reset",this.render);
        this.collection.fetch();
    },

    events: function(){

    },

    renderTableViews: function(internship){

		var internShipTableView = new appData.views.InternListView({model:internship});
       $('#internshipsTable tbody').append(internShipTableView.render().$el);
	},

    render: function() {
    	this.$el.html(this.template());

        // update the
        $('#internshipsTable tbody', this.$el).empty();
      	this.collection.each(function(internship){
			this.renderTableViews(internship);  
		},this);

      	return this;
    }
});
