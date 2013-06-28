Ext.define('Locator.view.details.Review', {
				extend: 'Ext.Container',
				xtype: 'review',
				config: {
								cls : 'transparent',
								title : Lang.reviews,
								iconCls : 'chat2',
								scrollable : true,
								tpl : Ext.create('Ext.XTemplate',
												document.getElementById('tpl_place_details_reviews').innerHTML, {
																toTitleCase : function(str){
																				return Locator.util.Util.toTitleCase(str);
																},
																				
																getDate : function(timestamp){
																				return Locator.util.Util.prettyDate(timestamp * 1000);
																},
																				
																getUserImage : function(authorUrl){
																				if(authorUrl){
																								var arr = authorUrl.split('/');
																								return 'https://plus.google.com/s2/photos/profile/' + arr[arr.length - 1] + '?sz=50';
																				}
																								
																				return Locator.util.Util.defaultUserImage;
																},
																				
																getStars : function(rating){
																				return Locator.util.Util.getRating(rating, 3, true);
																}, 
																				
																isEmpty : function(result){
																				if(!result.reviews || result.reviews.length === 0){
																								return true;
																				}
																				
																				return false;
																}
												})
				}
});
