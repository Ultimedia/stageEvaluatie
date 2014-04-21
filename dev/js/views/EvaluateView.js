appData.views.EvaluateView = Backbone.View.extend({
    initialize: function () {
    	_.bindAll(this);
        
        appData.collections.internsCollection = new InternshipCollection();
        appData.collections.internsCollection.on("sync reset",this.render);
        appData.collections.internsCollection.fetch();
    },

    renderTableViews: function(internship){
		var internShipTableView = new appData.views.InternListView({model:internship});
       $('#internshipsTable tbody').append(internShipTableView.render().$el);
	},

    render: function() {
    	this.$el.html(this.template());

        // update the
        $('#internshipsTable tbody', this.$el).empty();
      	appData.collections.internsCollection.each(function(internship){
			this.renderTableViews(internship);  
		},this);

      	return this;
    }
});
