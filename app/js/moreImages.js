angular.module('app', [])
	
.directive('images',function(){
	return {
		scope:{
			images:'=',
			limit:'=',
			step:'='
		},
		template:'<img ng-repeat="img in images | limitTo:_limit" src="{{img.url}}" title="{{img.title}}"><a ng-hide="noMore" href="" ng-click="showMore()">showMore...</a>',
		link:function (scope,element,attrs) {
			scope.noMore = false;
			scope._limit = scope.limit || 6;
			var _step = scope.step || 6
			scope.showMore = function () {
				scope._limit = scope._limit + _step;
				if(scope._limit >= scope.images.length){
					scope.noMore = true;
				}
			}
		}
	}
})
.controller('moreImageCtrl', function($scope){
	$scope.data = [{
		disc:'shanghai',
		images:[{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		}]
	},
	{
		disc:'beijing',
		images:[{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		}]
	},{
		disc:'taiwan',
		images:[{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		},{
			title:'image',
			url:'images/img.jpg'
		}]
	}];
})
	