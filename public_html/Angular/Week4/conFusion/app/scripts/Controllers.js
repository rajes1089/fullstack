'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

                $scope.tab = 1;
                $scope.filtText = '';
                $scope.showDetails = false;
                $scope.showMenu = false;
                $scope.message = "Loading ...";

                menuFactory.getDishes().query(
                    function(response){
                        $scope.dishes = response;
                        $scope.showMenu = true;
                    },
                    function(response){
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                });

                $scope.select = function (setTab) {
                    $scope.tab = setTab;

                    if (setTab === 2) {
                        $scope.filtText = "appetizer";
                    } else if (setTab === 3) {
                        $scope.filtText = "mains";
                    } else if (setTab === 4) {
                        $scope.filtText = "dessert";
                    } else {
                        $scope.filtText = "";
                    }
                };

                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.toggleDetails = function () {
                    $scope.showDetails = !$scope.showDetails;
                };
            }])

        .controller('ContactController', ['$scope', function ($scope) {

                $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

                var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

                $scope.channels = channels;
                $scope.invalidChannelSelection = false;

            }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function ($scope,feedbackFactory) {

                $scope.sendFeedback = function () {

                    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                        $scope.invalidChannelSelection = true;
                    } else {
                        $scope.invalidChannelSelection = false;
                        
                        feedbackFactory.getFeedback().save($scope.feedback);
                        
                        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
                        $scope.feedback.mychannel = "";
                        $scope.feedbackForm.$setPristine();
                        
                    }
                };
            }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
                 $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                    .$promise.then(
                        function(response){
                            $scope.dish = response;
                            $scope.showDish = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
                $scope.showDish = true;
                $scope.message = "Loading ...";
            }])

        .controller('DishCommentController', ['$scope','menuFactory', function ($scope,menuFactory) {

                $scope.comment = {rating: 5, comment: "", author: "", date: ""};

                $scope.submitComment = function () {

                    $scope.comment.date = new Date().toISOString();
                    console.log($scope.comment);

                    $scope.dish.comments.push($scope.comment);
                    
                    menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

                    $scope.commentForm.$setPristine();

                    $scope.comment = {rating: 5, comment: "", author: "", date: ""};
                };
            }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

                $scope.message = "Loading ...";        
                
                $scope.showDish = false;
                menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
                
                $scope.showPromotion = false;
                menuFactory.getPromotions().get({id:0},function(response){
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
                
                $scope.showChef =false;
                 corporateFactory.getLeaders().get({id:3},function(response){
                    $scope.execChef = response;
                    $scope.showChef = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
                
            }])

        .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
                $scope.showLeaders =false; 
                $scope.message= "Loading...";
                corporateFactory.getLeaders().query(function(response){
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
                );
            }])

        ;
