angular.module('makeHub.controllers', ['flash']).
  controller('ChatController', ['$scope', 'flash', function($scope, flash) {
        $scope.messages = [];
        $scope.projects = [];
        $scope.selectedProject = {};
        $scope.rawProject = '';
        $scope.newProject = {};
        $scope.newProject.title = '';
        $scope.newProject.body = '';
        
        
        
        $scope.display_project = function display_project(project) {
            $.ajax({
                url: "/display_project",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({project: project}),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function() {
                  //called when complete
                  console.log('process complete');
                },
            
                success: function(data) {
                    $scope.$apply( function () {
                      console.log(data);
                      $scope.selectedProject = data;
                      $scope.rawProject = data._raw;
                      console.log('process sucess');
                    });
                },
            
                error: function() {
                  console.log('process error');
                  flash('error', 'Something went wrong with your request. Are you logged in?');
                },
            }); 
        }
        
        $scope.my_projects = function my_projects() {
            $.ajax({
                url: "/my_projects",
                type: "POST",
                dataType: "json",
                data: "{}",
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function() {
                  //called when complete
                  console.log('process complete');
                },
            
                success: function(data) {
                    $scope.$apply( function () {
                      console.log(data);
                      $scope.projects = data.projects;
                      console.log('process sucess');
                    });
                },
            
                error: function() {
                  console.log('process error');
                  flash('error', 'Something went wrong with your request. Are you logged in?');
                },
            }); 
        }

        $scope.save = function save() {
          console.log('Sending message:', $scope.newProject);
          $.ajax({
                url: "/save",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({newProject: $scope.newProject}),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function() {
                  //called when complete
                  console.log('process complete');
                },
            
                success: function(data) {
                  console.log(data);
                  console.log('process sucess');
                },
            
                error: function() {
                  console.log('process error');
                },
            });
            $scope.text = '';
        };

        $scope.modify = function modify() {
          console.log('Sending message:', $scope.rawProject);
          $.ajax({
                url: "/modify",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    rawProject: $scope.rawProject,
                    selectedProject: $scope.selectedProject}),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function() {
                  //called when complete
                  console.log('process complete');
                },
            
                success: function(data) {
                  console.log(data);
                  console.log('process sucess');
                },
            
                error: function() {
                  console.log('process error');
                },
            });
            $scope.text = '';
        };
  }])
  .controller('ProjectCtrl', ['$scope', 'flash', '$routeParams', '$http',
  function($scope, flash, $routeParams, $http) {
        $scope.projectId = $routeParams.projectId;
        var projectUrl = ['project', $routeParams.projectUser, $routeParams.projectId].join('/');
        $http.get(projectUrl).success(function(data) {
          console.log(data);
          $scope.project = data;
        });
    
  }
]);