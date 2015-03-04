(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('universityData', universityData);

  universityData.$inject = [];

  function universityData() {
    var service = {
      getUniversityList: getUniversityList
    };
    return service;
///////////////
    function getUniversityList() {
      return [
        {educationCenterName: 'University of California - Berkeley', streetNumeric:'5', streetName:'South Hall Road', city:'Berkeley', zip:'94720', state:'CA', latitude:'37.872200',longitude:'-122.258698'},
        {educationCenterName: 'University of California - Davis', streetNumeric:'1', streetName:'Shields Avenue', city:'Davis', zip:'95616', state:'CA', latitude:'38.538232',longitude:'-121.761713'},
        {educationCenterName: 'University of California - San Diego', streetNumeric:'9500', streetName:'Gilman Drive', city:'La Jolla', zip:'92093', state:'CA', latitude:'32.880219',longitude:'-117.235855'},
        {educationCenterName: 'University of California - Santa Cruz', streetNumeric:'1156', streetName:'High Street', city:'Santa Cruz', zip:'95064', state:'CA', latitude:'36.997994',longitude:'-122.055524'},
        {educationCenterName: 'University of California - Irvine', streetNumeric:'311', streetName:'West Peltason Drive', city:'Irvine', zip:'92697', state:'CA', latitude:'33.648961',longitude:'-117.842224'},
        {educationCenterName: 'University of California - Los Angeles', streetNumeric:'308', streetName:'Westwood Plaza', city:'Los Angeles', zip:'90095', state:'CA', latitude:'34.070443',longitude:'-118.444180'},
        {educationCenterName: 'University of California - Merced', streetNumeric:'5200', streetName:'Lake Road', city:'Merced', zip:'95340', state:'CA', latitude:'37.366175',longitude:'-120.424355'},
        {educationCenterName: 'University of California - Riverside', streetNumeric:'900', streetName:'University Avenue', city:'Riverside', zip:'92521', state:'CA', latitude:'33.973702',longitude:'-117.328062'},
        {educationCenterName: 'University of California - Santa Barbara', streetNumeric:'1', streetName:'Ucen Road', city:'Santa Barbara', zip:'93106', state:'CA', latitude:'34.411717',longitude:'-119.848463'},
        {educationCenterName: 'University of California - San Francisco', streetNumeric:'500', streetName:'Parnassus Avenue', city:'San Francisco', zip:'94143', state:'CA', latitude:'37.762724',longitude:'-122.4580203'},
        {educationCenterName: 'California State University - San Jose', streetNumeric:'1', streetName:'Washington Square', city:'San Jose', zip:'95192', state:'CA', latitude:'37.335180',longitude:'-121.881073'},
        {educationCenterName: 'California State University - San Francisco', streetNumeric:'1600', streetName:'Holloway Avenue', city:'San Francisco', zip:'94132', state:'CA', latitude:'37.721886',longitude:'-122.478220'},
        {educationCenterName: 'California State University - East Bay', streetNumeric:'25800', streetName:'Carlos Bee Blvd', city:'Hayward', zip:'94542', state:'CA', latitude:'37.655762',longitude:'-122.056629'},
        {educationCenterName: 'California State University - Northridge', streetNumeric:'18111', streetName:'Nordhoff Street', city:'Northridge', zip:'91330', state:'CA', latitude:'34.240711',longitude:'-118.529297'},
        {educationCenterName: 'California State University - Fullterton', streetNumeric:'800', streetName:'North State College Blvd', city:'Fullerton', zip:'92831', state:'CA', latitude:'33.883144',longitude:'-117.886863'},
        {educationCenterName: 'California State University - Long Beach', streetNumeric:'1250', streetName:'Bellflower Blvd', city:'Long Beach', zip:'90840', state:'CA', latitude:'33.781363',longitude:'-118.113460'},
        {educationCenterName: 'California State University - Fresno', streetNumeric:'5241', streetName:'North Maple Drive', city:'Fresno', zip:'93740', state:'CA', latitude:'36.812706',longitude:'-119.748398'},
        {educationCenterName: 'California State University - Sacramento', streetNumeric:'6000', streetName:'J Street', city:'Sacramento', zip:'95819', state:'CA', latitude:'38.559673',longitude:'-121.422282'},
        {educationCenterName: 'California State University - San Diego', streetNumeric:'5500', streetName:'Campanile Drive', city:'San Diego', zip:'92182', state:'CA', latitude:'32.774775',longitude:'-117.071658'}
      ]
    }

  }
}());

