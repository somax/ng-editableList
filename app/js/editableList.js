angular.module('app', [])
	.factory('List', function($http) {
		var list = {
			updateUrl: 'data/update.json',
			dataUrl: 'data/list.json',
			data: [],
			get: function(_params) {
				return $http.get(this.dataUrl, {
					params: _params
				}).success(function(_data) {
					list.data = _data;
				});
			},
			update: function(_data) {
				// return $http.post(this.updateUrl, _data)
				return $http.get(this.updateUrl, _data);
			}
		};

		return list;
	})

.factory('CountryList', function() {
	return [{
		"Country": 103,
		"CountryName": "伊拉克"
	}, {
		"Country": 104,
		"CountryName": "伊朗"
	}, {
		"Country": 105,
		"CountryName": "以色列"
	}, {
		"Country": 106,
		"CountryName": "意大利"
	}, {
		"Country": 107,
		"CountryName": "印度"
	}, {
		"Country": 108,
		"CountryName": "印度尼西亚"
	}, {
		"Country": 109,
		"CountryName": "英国"
	}, {
		"Country": 282,
		"CountryName": "英属维尔京群岛"
	}, {
		"Country": 110,
		"CountryName": "约旦"
	}, {
		"Country": 111,
		"CountryName": "越南"
	}, {
		"Country": 112,
		"CountryName": "赞比亚"
	}, {
		"Country": 114,
		"CountryName": "乍得"
	}, {
		"Country": 287,
		"CountryName": "直布罗陀"
	}, {
		"Country": 115,
		"CountryName": "智利"
	}, {
		"Country": 256,
		"CountryName": "中非"
	}, {
		"Country": 1,
		"CountryName": "中国"
	}]
})
	.filter('showCountryName', function(CountryList) {
		return function(_countryId) {
			if (!CountryList) return;
			var _out = _countryId,
				i, country;
			for (i in CountryList) {
				country = CountryList[i];
				if (country.Country == _countryId) {
					_out = country.CountryName;
					return _out;
				}
			}
			return _out;
		}
	})
//自定义过滤器
.filter('myFilter', function() {
	return function(_in, _filterWords) {
		console.log('myFilter:', _in, _filterWords);
		if (angular.isArray(_in)) {
			_filterWords = _filterWords.toString();
			if (_filterWords === '') {
				return _in;
			} else {
				var _out = [];
				_filterWords = _filterWords.replace(/ /gi, '|');

				for (var i = 0; i < _in.length; i++) {

					var _re = new RegExp(_filterWords, 'gi');

					if (_re.test(_in[i].name)) {
						_out.push(_in[i])
					}
				}
				return _out;
			}


		}

	}
})
	.controller('mainCtrl', function($scope, List, CountryList) {
		$scope.CountryList = CountryList;
		$scope.editObj = null;
		$scope.filterWords = 'AAA BBB CCC';
		var currentObj = null;


		var getList = $scope.getList = function() {
			var params = {
				pageSize: 20,
				pageIndex: 2
			};
			List.get(params)
				.success(function(_data) {
					//					$scope.list = _data;
					$scope.list = List.data;

				})
				.error(function(_data) {
					//todo error callback
				})
		};


		$scope.doEdit = function(_obj) {
			currentObj = _obj;
			$scope.editObj = angular.copy(_obj);
		};

		$scope.doneEdit = function() {

			List.update($scope.editObj)
				.success(function(_data) {
					var _editObj = $scope.editObj;
					for (var _key in currentObj) {
						if (_editObj.hasOwnProperty(_key)) {
							currentObj[_key] = _editObj[_key];
						}
					}

					$scope.editObj = null;
				})
				.error(function(_data) {
					//todo error callback
				})


		};

		$scope.cancelEdit = function() {
			$scope.editObj = null;
		};

		// load list data automatic
		getList();


		//提供内置过滤器filter的自定义过滤条件
		$scope.myfilter = function(_in) {
			// console.log('myfilter::',_in);
			var _filterWords = $scope.filterWords.toString();
			if (_filterWords.toString() === '') {
				return true;
			}
			var _re = new RegExp(_filterWords.replace(/ /gi, '|'), 'gi')
			// return _in.name.search(_re)>-1;
			return _re.test(_in.name);
		}

	});