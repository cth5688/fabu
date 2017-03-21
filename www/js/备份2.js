angular.module('starter.controllers', ["ionic"])

  //.controller('HomeCtrl', function($scope) {})
  //
  //.controller('CourseListCtrl', function($scope, Chats) {
  //  // With the new view caching in Ionic, Controllers are only called
  //  // when they are recreated or on app start, instead of every page change.
  //  // To listen for when this page is active (for example, to refresh data),
  //  // listen for the $ionicView.enter event:
  //  //
  //  //$scope.$on('$ionicView.enter', function(e) {
  //  //});
  //
  //  $scope.chats = Chats.all();
  //  $scope.remove = function(chat) {
  //    Chats.remove(chat);
  //  };
  //})
  //
  //.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  //  $scope.chat = Chats.get($stateParams.chatId);
  //})
  //
  //.controller('AccountCtrl', function($scope) {
  //  $scope.settings = {
  //    enableFriends: true
  //  };
  //});

  /*首页数据请求*/
  .controller("HomeCtrl", function ($scope, $http, $ionicSlideBoxDelegate) {
    $http({
      url: "/Handler/OfflineCourseHandler.ashx?action=indexshow",
      method: "post",
      params: ""
    }).success(function (result) {
      console.log(result);
      $scope.bannerL = result.data.bannerList;
      /*让轮播图纪实刷新*/
      //$ionicSlideBoxDelegate.$getByHandle("slide").update()
      $ionicSlideBoxDelegate.$getByHandle("slide").update();
      /*让轮播图循环播放*/
      $ionicSlideBoxDelegate.$getByHandle("slide").loop("true")

      /*好评榜 数据*/
      //$scope.goddL=result.data.goodList;
      $scope.goodL = [[result.data.goodList[0], result.data.goodList[1]], [result.data.goodList[2], result.data.goodList[3]]]
      console.log($scope.bannerL);
      /*最新课程 获取数据*/
      $scope.newL = [[result.data.newList[0], result.data.newList[1]], [result.data.newList[2], result.data.newList[3]]]


    })
    //$scope.goIn=function(id){
    //  window.location="#/tab/video/:"+id;
    //}
  })

  /*详情页 */
  //.controller("VideoCtrl",function($scope,$http){
  //
  //})




  /*登录界面里数据请求  里的数据*/
  .controller("PersonalCtrl", function ($scope, $http) {
    $scope.userInfo = {
      userName: "",
      userPwd: "",
    }
    $scope.doLogin = function () {
      $http({
        url: "/Handler/UserHandler.ashx?action=login",
        method: "post",
        params: $scope.userInfo,

      }).success(function (result) {
        if (result.success) {
          window.location = "#/tab/information"
        }
      })
    }
  })
  ///*第二种 方式  安全更高*/
  //$scope.doLogin = function () {
  //  $http.post("/Handler/UserHandler.ashx?action=login", $scope.userInfo)
  //    .success(function (result) {
  //      console.log(result)
  //    })
  //}

  /*个人信息   返回的数据*/
  .controller("InformationCtrl", function ($scope, $http) {

    /*个人信息 里面的退出登录*/
    $scope.off = function () {
      $http({
        url: "/Handler/UserHandler.ashx?action=quit",
        method: "post",
        params: "",
      }).success(function (result) {
        if (result.success) {
          window.location = "#/tab/personal"
        }
      })
    }


    $scope.personInfo = {
      nickname: "",
      //tokenId: "",   么有使用的 不要传
      //userPic: "",
      email: "",
      phone: "",
    }
    /*获取个人信息*/

    /*是否请求成功*/
    $http({
      url: "/Handler/UserHandler.ashx?action=isLogin",
      method: "post", /* 相当于type*/
      params: "", /*相当于data */
    }).success(function (result) {
      if (result.success) {
        $http({
          url: "/Handler/OnCourseHandler.ashx?action=returnuserinfo",
          method: "get",
          params: "",
        }).success(function (result) {
          $scope.userName = result.userName;
          $scope.email = result.email;
          $scope.phone = result.phone;
        })
      } else {
        alert(result.err);
      }
    })
  })


  /* 课程列表切换 */
  .controller("CourseListCtrl", function ($scope, $http, $interval) {
    $scope.courseShow = false;
    $scope.priceShow = false;
    $scope.course = function () {
      $scope.priceShow = false;
      $scope.colorA = {"color": "blue"};
      $scope.courseShow = !$scope.courseShow;

      if ($scope.courseShow) {
        $scope.colorA = {"color": "blue"};
        $scope.colorB = {"color": "#333"};
      } else {
        $scope.colorA = {"color": "#333"};
      }
    };

    $scope.price = function () {
      $scope.courseShow = false;
      $scope.colorB = {"color": "blue"};
      $scope.priceShow = !$scope.priceShow;
      if ($scope.priceShow) {
        $scope.colorB = {"color": "blue"};
        $scope.colorA = {"color": "#333"};
      } else {
        $scope.colorB = {"color": "#333"};
      }
    };

    ///*请求专业分类数据*/
    $http({
      url: "/Handler/OfflineCourseHandler.ashx?action=getcategory",
      method: "post",
      params: "",
    }).success(function (result) {
      //console.log(result);
      /*专业分类 数据*/
      $scope.courseBtn = result.data;
    })
    /*价格分类 数据*/
    $scope.priceBtn = {
      "priceBtn0": "免费",
      "priceBtn1": "全免",
      "priceBtn2": "18800",
    }
    /*  $scope.priceBtn=[
     {"id":"0","priceTitle":"免费"},
     {"id":"1","priceTitle":"全免"},
     {"id":"2","priceTitle":"18800"},
     ]*/

    //分页界面
    $scope.lists = [];
    $scope.pageStart = 0;
    $scope.searchText = "";
    $scope.CategoryId = "";
    /*专业分类*/
    $scope.CpriceId = "";

    $scope.loadPage = function (pageStart) {
      /*发送的数据 打了个包*/
      $scope.courseData = {
        searchText: $scope.searchText,
        CategoryTwo: $scope.CategoryId,
        CpriceId: $scope.CpriceId,
        pageStart: pageStart
      };

      /* 未开始请求时  先把加载禁止*/
      $scope.moreData = false;
      $http({
        url: "/Handler/OfflineCourseHandler.ashx?action=courseshow",
        method: "post",
        params: $scope.courseData
      }).success(function (result) {

        $scope.pageNum = Math.ceil(result.data.count / result.data.pageSize);
        $scope.pageStart = result.data.pageStart;
        $scope.lists = $scope.lists.concat(result.data.list);

        /*总页数         向上取整         总条数             每页包含几条数据 */
        if ($scope.pageStart < $scope.pageNum) {
          //  ng-if="moreData" 对数据进行时时监控
          $scope.moreData = true
        }
      });
    };
    $scope.moreData = true;
    $scope.showList = function () {
      $scope.loadPage($scope.pageStart + 1);
      $scope.$broadcast("scroll.infiniteScrollComplete");
      /*加载完整屏*/
    }

    //$scope.showList()

    /*上拉加载更多*/
    /* on 是$scope里面的方法之一  同事起到绑定作用 */
    $scope.$on("stateChangeSuccess", function () {
      $scope.showList()
    })

    /*筛选课程*/
    $scope.searchCourse = function (searchText, CategoryId, CpriceId) {
      $scope.CpriceId = CpriceId;
      $scope.searchText = searchText;
      $scope.CategoryId = CategoryId;
      $scope.pageStart = 0;
      $scope.lists = [];
      $scope.moreData = true;
      $scope.showList();
      //$scope.$broadcast("scroll.infiniteScrollComplete");
      $scope.courseShow = false;
      $scope.priceShow = false;
      $scope.colorA = {"color": "#333"};
      $scope.colorB = {"color": "#333"};

    }

    /*下拉刷新*/
    $scope.doRefresh = function () {
      $interval(function () {
        $scope.$broadcast("scroll.refreshComplete");
      }, 1000)
    }

  })

  /*我的课程 页面*/


  .controller("MyClassCtrl", function ($scope, $http) {
    /* 点击  请登录  是否显示*/
    $scope.loginShow = true;
    /*课程列表 分栏*/

    //$http({
    //  url: "/Handler/OnCourseHandler.ashx?action=mycourse",
    //  method: "get",
    //  params: ""
    //}).success(function (result) {
    //  $scope.loginShow = false;
    //  $scope.myCourseList = result.data
    //})

    $scope.course = function () {

      $http({
        url: "/Handler/OnCourseHandler.ashx?action=mycourse",
        method: "get",
        params: ""
      }).success(function (result) {
        $scope.bj_disabled=true;
        $scope.loginShow = false;
        $scope.myCourseList = result.data;
        $scope.colorB={"color":"#333"};
        $scope.colorA={"color":"blue"};

      })
      $scope.data={
        showDelete:false
      };
    }
    $scope.courseShow = true;
    $scope.course();
    //  收藏课程分栏

    $scope.Collection = function () {
      $http({
        url:"/Handler/OnCourseHandler.ashx?action=mycollection",
        method:"get",
        params:""
      }).success(function(result){
        console.log(result);
        $scope.bj_disabled=false;
        $scope.myCourseList="";
        $scope.loginShow = false;
        $scope.myCourseList = result.data
      })
      $scope.colorA={"color":"#333"};
      $scope.colorB={"color":"blue"};
      //$scope.courseShow = true;
    }

    /*收藏课程里面的 删除*/
    $scope.data={
      showDelete:false
    };

    $scope.del=function(item){

      $http({
        url:"/Handler/OnCourseHandler.ashx?action=deletecollection",
        method:"post",
        params:{courseId:item}
      }).success(function(result){

        if(result.success){
          $scope.Collection()
        }
      })
    }
  })

  /* 注册页面 */
  .controller("registerCtrl", function ($scope, $http) {
    $scope.regInfo = {
      userName: "",
      email: "",
      phone: "",
      userPwd: "",
      nickname: "",
      userPic: ""
    };
    $scope.join = function () {
      $http({
        url: "/Handler/UserHandler.ashx?action=add",
        method: "post",
        params: $scope.regInfo
      }).success(function (result) {
        if (result.success) {
          console.log(result)
          //window.location = "#/tab/personal"
        }
      })
    }
  });


