(function () {
  "use strict";

  angular
    .module('app.landing')
    .controller('LandingCtrl', LandingCtrl);

  LandingCtrl.$inject=['$scope', 'common', '$window', 'Auth'];

  function LandingCtrl($scope, common, $window, Auth) {
    $scope.$parent.seo = {
      pageTitle: 'Campusly',
      pageDescription: 'Secure off-campus community. Connect with verified students. Find off-campus housing. Meet new students - walk safely, share a ride, attend events.'
    };

    if(window.Gdistinct_id) {
      mixpanel.track("landing page");
    }

    var vm = this;
    vm.user = {};
    vm.user.confirmPassword = '';
    vm.errors = {};
    vm.loading = false;
    vm.showValidationMessage = false;
    $scope.$parent.seo = {
      pageTitle:'Campusly Sign-up',
      pageDescription:'Free Sign-up for Campusly'
    };

    /*
     * Name: register function - registers a new user, checks email validity, checks input fields for errors
     * Description: Takes in the input from the html form
     * Input: first name, last name, email, and password
     * Return: none
     * Side effects: Creates a user in node, creates a user in the Postgres DB, sends confirmation email to user upon successful user creation
     */

    vm.register = function (form) {
      vm.submitted = true;
      if(form.email.$valid){
        form.email.$setValidity('required',(/\.edu$/.test(vm.user.email.toLowerCase()) || (/campusly.org$/.test(vm.user.email.toLowerCase()))));
      }
      if (form.$valid) {
        common.Auth.createUser({
          firstname: vm.user.firstname,
          lastname: vm.user.lastname,
          email: vm.user.email.toLowerCase(),
          password: vm.user.password
        })
          .then(function () {
            // Account created, sending verification email, logging out user
            vm.loading = true;
            common.Auth.sendConfirmationMail({userId: vm.user.email})
              .then(function () {
                vm.loading = false;
                vm.showValidationMessage = true;
                mixpanel.track("sign up - send confirm email",{distinct:Gdistinct_id});
                mixpanel.alias(vm.user.email);
              });
            Auth.logout();
          })
          /*
           * Checks if user is already signed in and if the user has valid .edu address
           */
          .catch(function (err) {
            err = err.data;
            vm.errors = {};
            if (err.name) {
              angular.forEach(err.errors, function (field) {
                if (field.type == 'unique violation'){
                  field.message = 'You have already signed-up! Please Sign-in.';
                  vm.errors[field.path] = field.message;
                  mixpanel.track("sign up - unique email violation",{distinct:Gdistinct_id});
                }
                if (field.type == 'Validation error'){
                  field.message = 'Your email needs to be a valid .edu address!';
                  vm.errors[field.path] = field.message;
                  mixpanel.track("sign up - .edu email violation",{distinct:Gdistinct_id});
                }
              });
            }
          });
      } else {
        mixpanel.track("sign up - invalid form",{distinct:Gdistinct_id});
      }
    };

    vm.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };

    setTimeout(function () {
      $scope.$apply(function () {

          scaleVideoContainer();

          initBannerVideoSize('.video-container .poster img');
          initBannerVideoSize('.video-container .filter');
          initBannerVideoSize('.video-container video');

          angular.element($window).bind('resize', function() {
            scaleVideoContainer();
            scaleBannerVideoSize('.video-container .poster img');
            scaleBannerVideoSize('.video-container .filter');
            scaleBannerVideoSize('.video-container video');
          });

        });
      }, 100);

    function scaleVideoContainer() {

      var height = $window.innerHeight + 5;
      var unitHeight = parseInt(height) + 'px';
      $('.homepage-hero-module').css('height',unitHeight);

    }

    function initBannerVideoSize(element){

      $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
      });

      scaleBannerVideoSize(element);

    }

    function scaleBannerVideoSize(element){

      var windowWidth = $window.innerWidth,
        windowHeight = $window.innerHeight + 5,
        videoWidth,
        videoHeight;

      console.log(windowHeight);

      $(element).each(function(){
        var videoAspectRatio = $(this).data('height') / $(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
          videoHeight = windowHeight;
          videoWidth = videoHeight / videoAspectRatio;
          $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

          $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

      });
    }

  }
}());
