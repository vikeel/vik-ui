/*
** By Vikeel 2018-06
*/
;
var vui = function(v) {
	
	var $v = {};  // 函数对象容器
	
	// dom获取
	$v.getdom = function(ele) {
		if(ele == '') return;
		if(ele.substr(0,1) == '.') {
			return document.getElementsByClassName(ele.substr(1));
		}else if(ele.substr(0,1) == '#') {
			return document.getElementById(ele.substr(1));
		}
	}
	// 添加事件监听
	$v.addEvt = function(ele, event, callback) {
		return ele.addEventListener(event, callback, false);
	}
	// 选项卡
	$v.tab = function() {
		var navTag = $v.getdom('#navTab').children;
		var i, j, l = navTag.length;
		for(i=0; i<l; i++) {
			$v.addEvt(navTag[i], 'click', function() {
				var index = this.getAttribute('data-indx');
				for(j=0; j<l; j++) {
					navTag[j].classList.remove('on');
				}
				this.classList.add('on');
				
				console.log(index)
				
			})
		}
	}
	// 计数器
	$v.counter = function() {
		var dec = $v.getdom('.decrease');
		var inc = $v.getdom('.increase');
		var counter = 1;  // 计数器初始值
		$v.addEvt(dec[0], 'click', function() {
			if(counter <= 1) {
				return;
			}else {
				counter -= 1;
			}
			$v.getdom('#counter').value = counter;
		}, false);
		$v.addEvt(inc[0], 'click', function() {
			counter += 1;
			$v.getdom('#counter').value = counter;
		}, false);
	}
	// 轮播图
	$v.carsousel = function() {
		var byClass = function(param) {
			return document.getElementsByClassName(param);
		};
		var innerWidth = byClass('slider-inner')[0].offsetWidth;  // 轮播图宽度
		var item = byClass('slider-item');
		for(var i=0; i<item.length; i++) {
			item[i].style.width = innerWidth + 'px';
		}
		var sliderList = byClass('slider-list');  // item-list
		sliderList[0].style.width = innerWidth * item.length + innerWidth*1 + 'px';  // slider-list总宽度
		var timer;
		var n = 1;
		var speed = innerWidth / 10;  // 欢动速度
		var currentLeft = innerWidth;  // 当前移动的距离
		var itemTotal = item.length;
		sliderList[0].style.left = -currentLeft + 'px';
		
		function _init() {
			_createIndicator();
			_autoplay();
			
		}
		// 创建指示器
		function _createIndicator(param) {
			var indicatorCon = byClass('slider-indicator');
			var fragment = document.createDocumentFragment();
			var ul = document.createElement('ul');
			for(var i=0; i<itemTotal; i++) {
				var li = document.createElement('li');
				ul.appendChild(li);
			}
			fragment.appendChild(ul);
			indicatorCon[0].appendChild(fragment);
		}
		// 自动轮播
		function _autoplay() {
			timer = setInterval(function() {
				if(n > itemTotal) {
					// clearInterval(timer)
					currentLeft = 0;
					n = 0;
				};
				var totalLeft = innerWidth * n;  // 需要移动的总距离
				n++;
				var timer2 = setInterval(function() {
					if(currentLeft >= totalLeft) {
						clearInterval(timer2);
					}else {
						sliderList[0].style.left = -currentLeft - speed + 'px';
						currentLeft += speed;
					}
				}, 50);
				
			}, 3000);
		}
		_init();
	}
	
	// 返回前一个历史页面
		var back = $v.getdom('.vik-back');
		var menu = $v.getdom('.vik-menu');
		$v.addEvt(back[0], 'click', function() {
			window.history.go(-1)
		});
		$v.addEvt(menu[0], 'click', function() {
			var html = `<div class="menu"></div>`;
			var alert = document.createElement('div');
			alert.setAttribute('class', 'alert');
			document.body.appendChild(alert);
			console.log($v.getdom('.alert')[0])
			$v.getdom('.alert')[0].innerHTML = html;
		})
		
		
	
	v.v = $v;  // 对象赋值给
	
	return;

};

