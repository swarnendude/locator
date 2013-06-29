Ext.define('Locator.controller.PlaceDetails', {
				extend : 'Ext.app.Controller',
				util : Locator.util.Util,
				config : {
								routes: {
												'categories/:type/:reference' : 'showDetails'
								},
								
								refs : {
												main : 'main',
												placeDetailsPanel : 'detailspanel'	,
												
												placeDetailsInfo : 'info',
												placeDetailsGallery : 'gallery',
												placeDetailsReview : 'review'
								},
				
								control : {
												
				}
				},
				
				showDetails : function(categoryType, placeReference){
								var me = this;
																
								if(!me.getPlaceDetailsPanel()){
												me.getMain().add({
																xtype : 'detailspanel'
												});
								}
								
								me.util.showActiveItem(me.getMain(), me.getPlaceDetailsPanel());
								me.loadPlaceDetails(placeReference);
								
								me.getApplication().fireEvent('categorychange', categoryType);
								me.getApplication().fireEvent('placechange', placeReference);
				},
				
				loadPlaceDetails : function(placeReference){
								var me = this;
								
								me.util.showLoading(me.getPlaceDetailsPanel(), true);
								
								Ext.Ajax.request({
												url : me.util.api.baseUrl,
												method : 'GET',
												params : {
																action : me.util.api.details,
																reference : placeReference,
																key : me.util.API_KEY,
																sensor : true
												},
												success : function(response){
																me.util.showLoading(me.getPlaceDetailsPanel(), false);
																var json = me.currentLocation = Ext.decode(response.responseText);
																
																me.getPlaceDetailsInfo().setData(json.result);
																me.getPlaceDetailsGallery().setData(json.result);
																me.getPlaceDetailsReview().setData(json.result);
																me.showPlaceLocation();
												},
												failure : function(){
																me.util.showMsg(Lang.serverConnectionError);
												}
								});
				},

				showPlaceLocation : function(){
								var me = this,
								showMarker = function(){
												var location = me.currentLocation.result.geometry.location,
												latLng = new google.maps.LatLng(location.lat,location.lng),
												image = new google.maps.MarkerImage('resources/images/marker.png',
																new google.maps.Size(32, 32),
																new google.maps.Point(0,0)
																);
																				
												console.log('there is marker', location.lat,location.lng)
												if(me.singleMapMarker){
																me.singleMapMarker.setMap(null);
												}

												me.singleMapMarker = new google.maps.Marker({
																position: latLng, 
																map: me.singleLocationMap, 
																icon : image
												});
												
												me.singleLocationMap.panTo(latLng);
												me.singleLocationMap.setCenter(latLng);
								};
								
//								if(!this.getSingleLocationMap()){
												Ext.create('Ext.Map', {
																renderTo : 	me.getPlaceDetailsInfo().element.down('.map'),
																height : 140,
																mapOptions : {
																				zoom : 15
																},
																listeners : {
																				maprender : function(mapCmp, gMap){
																								me.singleLocationMap = gMap;
																								showMarker();
																				}
																}
												});
//								}else{
//												showMarker();
//								}
				}
});