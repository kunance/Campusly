angular.module('service.property', ['service.firebase'])

    .filter('loadBid', ['propertyService',
    function (propertyService)
    {
        return function (bids)
        {
            bids= bids || [];

            bids.forEach(function (bid,idx)
            {
                if (_.keys(bid).length>1) return;

                propertyService.fetchBid(bid.$id,bid)
                .$inst().$ref().on('value',function (data)
                { 
                    _.extend(bid,data.val());
                });
            });

            return bids;
        };
    }])

    .filter('loadProperty', ['propertyService',
    function (propertyService)
    {
        return function (featured)
        {
            featured= featured || [];

            featured.forEach(function (property,idx)
            {
                if (_.keys(property).length>1) return;

                var obj= propertyService.fetchWithBids(property.$id,property);
                    
                obj.$inst().$ref().on('value',function (data)
                { 
                    _.extend(property,data.val());
                });
            });

            return featured;
        };
    }])


    .factory('propertyService', ["$rootScope", "firebaseRef", "syncData", 'uuid4', function($rootScope, firebaseRef, syncData,uuid4){
        return {
            create: function ()
            {
                return syncData('properties/'+uuid4.generate()).$asObject();
            },
            list : function(limit) {
                return syncData('properties',limit).$asArray();
            },
            featured: function(){
                return syncData('featured').$asArray();
            },
            fetch : function(propertyId){
                return syncData('properties/'+propertyId).$asObject();
            },
            fetchWithBids: function(propertyId,identity){
                var that= this,
                    property= syncData('properties/'+propertyId).$asObject();

                property.$loaded(function ()
                {
                    that.fetchBids(property.$id,3)
                    .$inst().$ref().on('value',function (data)
                    {
                         var bids= _.map(_.keys(data.val()),function ($id) { return { $id: $id }; });

                         identity ? identity.bids= bids : property.bids= bids;

                         console.log(property.bids);

                         if (bids.length)
                           that.fetchBid(bids[0].$id)
                             .$inst().$ref().on('value',function (data)
                             { 
                                   identity ? identity.bestOffer= data.val() : property.bestOffer= data.val();
                             });
                    });
                });
                
                return property;
            },
            fetchBid: function(bidId,identity){
                var bid= syncData('bids/all/'+bidId).$asObject();

                bid
                 .$inst().$ref().on('value',function (data)
                 { 
                      var val= data.val(); 

                      syncData('users/'+val.userId).$asObject() 
                         .$inst().$ref().on('value',function (data)
                         {
                              identity ? identity.user= data.val() : bid.user= data.val();
                         });
                 });

                return bid;
            },
            fetchBids: function(propertyId,limit){
                return syncData('bids/property/'+propertyId,limit).$asArray();
            },
            fetchRecentlyBiddedProperties: function(userId,limit){
                return syncData('bids/user/'+userId,limit).$asArray();
            },
            placeBid : function(propertyId, ownerId, userId, bid, cb){
                var bidId= uuid4.generate(),
                    priority= new Date().getTime();

                bid.propertyId= propertyId;
                bid.userId= userId;

                firebaseRef('bids', 'all', bidId).setWithPriority(bid,priority,function (err)
                {
                    if (err)
                      cb(err);
                    else
                      firebaseRef('bids', 'property', propertyId, bidId).setWithPriority(true,-bid.rentAmount,function (err)
                      {
                            if (err)
                              cb(err);
                            else
                              firebaseRef('bids', 'user', userId, propertyId).setWithPriority(true,priority,function (err)
                              {
                                  if (err)
                                      cb(err);
                                  else
                                  firebaseRef('bids', 'user', ownerId, propertyId).setWithPriority(true,priority,function (err)
                                  {
                                        if (err)
                                          cb(err);
                                        else
                                          cb(null,bidId);
                                  });
                              });
                      });
                });
            },
            isActive : function(property){
                var isActive =  false;
                if(property && property.endDate){
                    isActive =  moment().isBefore(property.endDate);
                    property.status = (isActive)?"Live":"Closed";
                }
                return isActive;
            },
            getStatus : function(property){
                var isActive =  false;
                if(property && property.endDate){
                    isActive =  moment().isBefore(property.endDate);
                }
                return (isActive)?"Live":"Closed";
            },
            local : function(){
                return {
                    "propId:1": {
                        address: "2606 Wilson Street #1105",
                        city: "Austin",
                        state: "TX",
                        zip: "78704",
                        rent: "1950",
                        rentItNow : "2499",
                        area: "1588",
                        area_unit: "sq ft",
                        beds : "4",
                        baths : "3",
                        garages : "2",
                        description: "<p>4-Level townhouse style 2 bedroom 2.5 bath just 3 blocks off South Congress.</p><p>Private Rooftop Terrace for you to love and enjoying dinner and drinks high above Austin.</p><p>The place is less than 1 year old and is in pristine condition with hardwood floors.</p><p>Attached 2 car garage.</p><p>Small Pets OK!</p>",
                        amenities: [
                            {
                                uid: "1",
                                name: "Air conditioning",
                                value: true
                            },
                            {
                                uid: "2",
                                name: "Balcony",
                                value: false
                            },
                            {
                                uid: "3",
                                name: "Small pets allowed",
                                value: true
                            }
                        ]
                    },
                    "propId:2" : {
                        address: "2006 Bird Creek Dr.",
                        city: "Austin",
                        state: "TX",
                        zip: "12345",
                        rent: "925",
                        area: "1200",
                        area_unit: "sq ft",
                        beds : "2",
                        baths : "1",
                        garages : "1",
                        description: "Vestibulum feugiat tempor mattis. Maecenas venenatis at erat sit amet viverra. " +
                            "Fusce sagittis pretium est vel iaculis. Proin vel tincidunt nisi. Sed non vehicula purus. " +
                            "In auctor sodales metus, ac fermentum odio sagittis quis. Curabitur volutpat, erat nec varius " +
                            "dapibus, felis libero malesuada mauris, at vestibulum enim erat non nibh. Donec ac nibh dapibus, " +
                            "sagittis libero a, sodales enim. Quisque a viverra mi.",
                        amenities: [
                            {
                                uid: "1",
                                name: "Air conditioning",
                                value: true
                            },
                            {
                                uid: "2",
                                name: "Balcony",
                                value: false
                            }
                        ]
                    }
                };
            }
        };
    }]);
