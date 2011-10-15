App.views.Viewport = Ext.extend(Ext.Carousel, {
    fullscreen: true,
    initComponent: function() {
	     initialItems = new Array(); 
		 var party = document.getElementById('party_id').value;
		 $.ajax({
            url: '/party/' + party + '/queue',
            dataType: 'json',
            success: function(json) {
            	console.log(json)
                for (var song=0; song<json.length; song++){
                	var song = json[song];
                	initialItems.push({
					slug: song['song_id'],
					title: song['title'],
					artist: song['artist'],
					});
                }
                console.log(initialItems);
                
            }
        });
        Ext.apply(this, {

            defaults: {
                xtype: 'paintingcard',
            },            
            items: initialItems,
			listeners: {
            	beforecardswitch: function() {
					var me = this;
					$.ajax({
		                url: '/party/' + party + '/next',
		                dataType: 'json',
		                success: function(json) {
		                    var item = {
								slug: json['song_id'],
								title: json['title'],
								artist: json['artist'],
							};
							if(this.getItems().peek().songid != item.songid){
								me.add(item);
								this.doLayout();
							}
		                }
		            });
					
            	}
        	}
        });
        App.views.Viewport.superclass.initComponent.apply(this, arguments);
        console.log(initialItems);
    }
});
