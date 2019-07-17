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
			openAtStart: true, // [boolean] true | false			
			autoToggle: true, // [boolean|number] true | false | 3000
			button: { 
				closeText: '收合', // [string]
				openText: '展開', // [string]
				class: 'btn' // [string]
			},
			class: {
				closed: 'closed', // [string]
				closing: 'closing', // [string]
				opened: 'opened', // [string]
				opening: 'opening' // [string]
			},
			transition: true,			
			whenClickCallback: function() {
				console.log('whenClickCallback');
			}
			
		};

		// 設定一開始是否為開或合
		Module.prototype.init = function () {
			console.log(this);	
			 if(this.option.openAtStart==true){							 
				$(".wrap").addClass( "slideDown" );
				if(this.option.autoToggle==true){
					console.log(this);
					console.log(this.option.autoToggle);
					//testing
					var slide = setInterval(function(){ autoSlide() }, 1000);
 
					function autoSlide() {
						$(".wrap").removeClass( "slideDown" );
						$(".wrap").toggleClass( "slideUp" );  //1
						console.log('1');
						$(".img").css("top","-300px");
						$(".btn").text("展開");
						//console.log(this.option.button.openText);
						$(".wrap").toggleClass( "slideUp" );
						$(".img").css("top","0");
						$(".btn").text("收合");
						//console.log(this.option.button.closeText);				
						$(".wrap").toggleClass( "slideDown" );  //2	
						console.log('2');
					}
					//transitionend事件

					clearInterval(slide);
				}	
			 }else{
			 	$(".wrap").addClass( "slideUp" );	
			 }
            
		};
		
		//設定啟動後是否要自動開或合
		// Module.prototype.auto = function () {
		// 	console.log(this);
		// 	console.log(this.option.autoToggle);			
		// 	// if(this.option.autoToggle==true){	
		// 	// 	   $(".wrap").addClass( "slideUp" );
		// 	// }
		// 	//if(typeof(this.option.autoToggle)==number){
		// 		//
		// 	//}
		// };
	
		// 設定收合展開按鈕
		Module.prototype.btn = function () {
			console.log(Module.btn);
			console.log(this);	
			var btntext = this;
			console.log(btntext);
			$(".btn").on("click",function(e){
				if(e.target.textContent==btntext.option.button.closeText){					
					console.log(btntext.option.button.closeText);
					console.log(this);
					$(".wrap").removeClass( "slideDown" );
					$(".wrap").toggleClass( "slideUp" );
					$(".img").css("top","-300px");
					e.target.textContent=btntext.option.button.openText;										
				}else{
					$(".wrap").removeClass( "slideUp" );
					$(".wrap").toggleClass( "slideDown" );
					$(".img").css("top","0");
					e.target.textContent=btntext.option.button.closeText;										
				}	
			});
				
		};
		Module.prototype.open = function (){
			console.log(this);	
		}

		Module.prototype.close = function (){

		}

		Module.prototype.toggle = function (){

		}

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
					//module.auto();
					module.btn();
								
				}
			});
		};
	
	})(jQuery);










//使用 clearInterval() 来停止 setInterval 的执行：
/*1.
var timeoutID = window.setInterval(( () => console.log("Hello!") ), 1000);
window.clearInterval(timeoutID);
*/ 

/*2.
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
