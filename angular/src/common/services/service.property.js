angular.module('service.property', ['service.firebase'])
    .factory('propertyService', ["$rootScope", "firebaseRef", "syncData", function($rootScope, firebaseRef, syncData){
        return {
            list : function() {
                return syncData('properties');
            },
            fetch : function(propertyId){
                return syncData('properties/'+propertyId);
            },
            fetchBids: function(propertyId){
                return syncData('bids/'+propertyId+'/bids');
            },
            placeBid : function(propertyId, userId, bid){
                firebaseRef('users', userId, 'properties', propertyId).set({ hasBids : true });
                firebaseRef('properties', propertyId, 'bids', userId).push(bid);
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