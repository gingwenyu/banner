(function($) { 
	'use strict';
	
		var ModuleName = 'banner'; 
	
		var Module = function ( ele, options ) {
			this.ele = ele;
			this.$ele = $(ele);
			this.option = options;
		};
		
		Module.DEFAULT = {
			style: 'classname',
			whenClickCallback: function() {
				console.log('whenClickCallback');
			}
			
		};

		// 設定一開始是否為開或合
		Module.prototype.init = function () {
			console.log('this',this);	
			 if(this.option.openAtStart==true){	
			 	$(".wrap").slideDown();
			 }else{
			 	$(".wrap").toggleClass( "slideUp" );	
			 }
            
		};
		
		//設定啟動後是否要自動開或合
		Module.prototype.auto = function () {
			console.log(this);
			console.log(typeof(this.option.autoToggle));			
			if(this.option.autoToggle==true){	
				//testing
				$(".wrap").toggleClass( "slideUp" ).toggleClass( "slideDown" ).toggleClass( "slideUp" );	 
				
			}
			//if(typeof(Module.auto.autoToggle)==number){
				//
			//}
		};
	
		// 設定收合展開按鈕
		Module.prototype.btn = function () {
			console.log(Module.btn);
			console.log(this);			
			$(".btn").on("click",function(e){
				if(e.target.textContent=='收合'){
					$(".wrap").toggleClass( "slideUp" );						
					e.target.textContent='展開';										
				}else{
					$(".wrap").toggleClass( "slideDown" );
					e.target.textContent='收合';										
				}	
			});
				
		};

		Module.prototype.func1 = function (option) {
			console.log('this is a prototype function1!!!');
			console.log(option);
		};
	
		$.fn[ModuleName] = function ( methods, options ) {
			return this.each(function(){
				var $this = $(this);
				var module = $this.data( ModuleName );
				var opts = null;
				if ( !!module ) {
					if ( typeof options === 'string' &&  typeof options2 === 'undefined' ) {
						module[options]();
					} else if ( typeof options === 'string' &&  typeof options2 === 'object' ) {
						module[options](options2);
					} else {
						console.log('unsupported options!');
						throw 'unsupported options!';
					}
				} else {
					opts = $.extend( {}, Module.DEFAULTS, ( typeof methods === 'object' && methods ), ( typeof options === 'object' && options ) );
					module = new Module(this, opts);
					$this.data( ModuleName, module );					
					// Do something to each element here.					
					module.init();		
					//console.log("module opts",options)
					module.auto();
					module.btn();			
				}
			});
		};
	
	})(jQuery);










//使用 clearInterval() 来停止 setInterval 的执行：
/*
var myVar = setInterval(function(){ myTimer() }, 1000);
 
function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
}
 
function myStopFunction() {
    clearInterval(myVar);
}

*/


//在指定的元素上监听transitionend事件, 例如#slidingMenu， 然后指定一个函数, 例如 showMessage()
/*
function showMessage() {
    console.log('Transition 已完成');
}

var element = document.getElementById("slidingMenu");
element.addEventListener("transitionend", showMessage, false);
*/
