// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])


  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {$ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {   //当前 tab 也的状态
        url: '/tab',  // 当前tab  的url路径
        abstract: true,
        templateUrl: 'templates/tabs.html'   //页面模板路径也称id
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        /* 这是首页 路由*/
        url: '/home',
        views: {       //当前视图展现
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl'    //当前页面控制器
          }
        }
      })

      .state('tab.courseList', {//第二页
        cache:'false',
        url: '/courseList',
        views: {
          'tab-courseList': {
            templateUrl: 'templates/tab-courseList.html',
            controller: 'CourseListCtrl'
          }
        }
      })
      //点击过的详情页
      .state('tab.video', {
        cache:'false',
        url: '/video/:Id',
        views: {
          'tab-home': { /*从首页跳转*/
            templateUrl: 'templates/tb-video.html',
            controller: 'VideoCtrl'
          }
        }
      })
      .state('tab.video', {
        cache:'false',
        url: '/video/:Id',
        views: {
          'tab-home': { /*从首页跳转*/
            templateUrl: 'templates/tb-video.html',
            controller: 'VideoCtrl'
          }
        }
      })
      .state('tab.video', {
        cache:'false',
        url: '/video/:Id',
        views: {
          'tab-courseList': { /*从课程列表页面跳转*/
            templateUrl: 'templates/tb-video.html',
            controller: 'VideoCtrl'
          }
        }
      })
      .state('tab.video', {
        url: '/video/:Id',
        views: {
          'tab-myClass': { /*从我的课程页面跳转*/
            templateUrl: 'templates/tb-video.html',
            controller: 'VideoCtrl'
          }
        }
      })


      .state('tab.myClass', {
        cache:'false',
        url: '/myClass',
        views: {
          'tab-myClass': {
            templateUrl: 'templates/tab-myClass.html',
            controller: 'MyClassCtrl'
          }
        }
      })

      .state('tab.personal', {
        cache:'false',
        url: '/personal',
        views: {
          'tab-personal': {
            templateUrl: 'templates/tab-personal.html',
            controller: 'PersonalCtrl'
          }
        }
      })

      /*点击 登录页面里的 注册 */
      .state("tab.register", {
        cache:'false',
        url: "/register",
        views: {
          /*当前视图  register 的视图*/
          "tab-personal": {
            /*从登录页过去*/
            templateUrl: 'templates/tab-register.html',
            controller: 'registerCtrl'
          }
        }
      })
      /* 点击登录后 跳转到个人信息界面*/
      .state("tab.information", {
        cache:'false',           /* 是否缓存  */
        url: "/information",
        views: {
          "tab-personal": {
            /*从登录页过去*/
            templateUrl: 'templates/tab-information.html',
            controller: 'InformationCtrl'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');
    /*没有其他页时，默认加载首页*/

  });
