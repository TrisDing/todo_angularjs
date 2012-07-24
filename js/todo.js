function TodoCtrl($scope) {

    $scope.todos = [];

    $scope.done = function () {
        return _.filter($scope.todos, function (todo) {
            return todo.done;
        });
    };

    $scope.remaining = function () {
        return _.filter($scope.todos, function (todo) {
            return !todo.done;
        });
    };

    $scope.addTodo = function () {
        if ($scope.newTodoText && $scope.newTodoText !== "") {
            $scope.todos.push({
                title:$scope.newTodoText,
                done:false,
                editing:false
            });
            $scope.newTodoText = "";
        }
    };

    $scope.editTodo = function (todo) {
        todo.editing = true;
    };

    $scope.finishEditing = function (todo) {
        if (todo.title === "") {
            $scope.removeTodo(todo);
        }
        todo.editing = false;
    };

    $scope.removeTodo = function (todo) {
        $scope.todos = _.without($scope.todos, todo);
    };

    $scope.clearCompleted = function () {
        $scope.todos = $scope.remaining();
    };
}

angular.module('todoApp', [])
    // blur directive
    .directive('myBlur', function ($parse) {
        return {
            restrict:'A',
            compile:function (tElement, tAttrs, transclude) {
                return function (scope, element, attr) {
                    var fn = $parse(attr['myBlur']);
                    element.bind('blur', function (event) {
                        scope.$apply(function () {
                            fn(scope, {$event:event});
                        });
                    });
                };
            }
        }
    })
    // focus directive
    .directive('myFocus', function () {
        return {
            restrict:'A',
            compile:function (tElement, tAttrs, transclude) {
                return function (scope, element, attr) {
                    scope.$watch(attr['myFocus'], function (value) {
                        if (value === true) {
                            element[0].focus();
                            element[0].select();
                        }
                    });
                };
            }
        }
    });
