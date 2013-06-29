Ext.define('Locator.view.details.Info', {
				extend: 'Ext.Container',
				xtype: 'info',
				config: {
								cls : 'transparent details-info',
								iconCls : 'info',
								title : Lang.info,
								scrollable : true,
								tpl : Ext.create('Ext.XTemplate', 
												document.getElementById('tpl_place_details_info').innerHTML, {
																getImage : function(data){
																				if(data.photos && data.photos.length > 0){
																								return '<div class="photo"><img src="' + data.photos[0].url + '" /></div>';
																				}
																				
																				return '<div class="icon-wrapper"><div class="icon" style="-webkit-mask-image:url(' + data.icon + ');" ></div></div>';
																},
                    
																getRating : function(rating){
																				return Locator.util.Util.getRating(rating);
																}
												})
				}
});
