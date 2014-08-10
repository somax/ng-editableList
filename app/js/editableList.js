angular.module('app', [])
	.factory('List', function ($http) {
		var list = {
			updateUrl: '/',
			dataUrl: 'data/list.json',
			data: [],
			get: function (_params) {
				return $http.get(this.dataUrl,{params:_params}).success(function (_data) {
					list.data = _data;
				});
			},
			update: function (_data) {
				return $http.post(this.updateUrl, _data)
			}
		};

		return list;
	})
	.controller('mainCtrl', function ($scope, List) {
		$scope.editObj = null;
		var currentObj = null;

		var getList = $scope.getList = function () {
			var params ={pageSize:20,pageIndex:2};
			List.get(params)
				.success(function (_data) {
//					$scope.list = _data;
					$scope.list = List.data;

				})
				.error(function (_data) {
					//todo error callback
				})
		};


		$scope.doEdit = function (_obj) {
			currentObj = _obj;
			$scope.editObj = angular.copy(_obj);
		};

		$scope.doneEdit = function () {

			List.update($scope.editObj)
				.success(function (_data) {
					var _editObj = $scope.editObj;
					for (var _key in currentObj) {
						if (_editObj.hasOwnProperty(_key)) {
							currentObj[_key] = _editObj[_key];
						}
					}

					$scope.editObj = null;
				})
				.error(function (_data) {
					//todo error callback
				})


		};

		$scope.cancelEdit = function () {
			$scope.editObj = null;
		};

		// load list data automatic
		getList();

	}
);