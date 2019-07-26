(function($) { 
	'use strict';
	
		var ModuleName = 'banner'; 
	
		var Module = function ( ele, options ) {
			this.ele = ele;
			this.$ele = $(ele);
			this.option = options;
			//this.$img = this.$ele.find(".img");
			this.$btn = this.$ele.find(".btn");
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
			// whenClickCallback: function() {
			// 	console.log('whenClickCallback');
			// }
			
		};

		// 設定一開始是否為開或合
		Module.prototype.init = function () {	
			var vm=this;
			// var str=document.getElementsByTagName('a');	
			// var classStr=str[0].classList[1];
			
			// function autoSlide() {
			// 	$(".wrap").toggleClass("opened");
			// 	$(".wrap").toggleClass("closed");   //closed
			// 	toggleTxt();
			// 	return {};  //測試
			// }	
			// function autoSlideUD() {
			// 	console.log('autoSlide');
			// 	$(".wrap").toggleClass("closed");
			// 	$(".wrap").toggleClass("opened");   //opened
			// 	toggleTxt();
			// 	return {};  //測試
			// }
			
			// openAtStart
			 if(typeof(this.option.openAtStart)=="boolean"&&this.option.openAtStart==true){					
				$(".wrap").addClass( "opened" );
				//console.log(' init add opened');	
				// vm.open();	
				// autoToggle();		
			 }
			 else if(typeof(this.option.openAtStart)=="boolean"&&this.option.openAtStart==false){				
				$(".wrap").addClass( "closed" );
				//console.log(' init add closed');			
				// vm.close();	 
				// autoToggle();
			 }

			//autoToggle  testing
			 //function autoToggle(){
				if(typeof(vm.option.autoToggle)=="boolean"&&vm.option.autoToggle==true){
					// if($( ".wrap" ).hasClass( "opened" )){
					setTimeout(() => {
						vm.toggle();
					}, 1000);	
						// vm.close();	 
						// console.log('close',vm);
					// }
					// if($( ".wrap" ).hasClass( "closed" )){
						// vm.toggle();
						// vm.open();	
						// console.log('open',vm);		
					// }
				}

				if(typeof(vm.option.autoToggle)==="number"){
					if($( ".wrap" ).hasClass( "opened" )){
						setTimeout(()=>{
							vm.toggle();
							//vm.close(); 
							//console.log('3000');
						}, vm.option.autoToggle);
						//setTimeout(closed, vm.option.autoToggle);	
						//vm.close();
						console.log('close2',vm);	 						
					}else{
						setTimeout(()=>{
							//vm.toggle();
							vm.open(); 
							//console.log('3000');
						}, vm.option.autoToggle);

						// var opened=vm.open();
						// setTimeout(opened, vm.option.autoToggle);	
						// //vm.open();
						// console.log('open2',vm);			
					}
	
				}
	
			 //}
			 
				// if(typeof(this.option.autoToggle)=="boolean"&&this.option.autoToggle==true){
				// 	console.log(vm);
				// 	var closed = vm.close(); 
				// 	setTimeout(closed, 1000);			
				// // }else if(typeof(this.option.autoToggle)=="boolean"&&this.option.autoToggle==false){
				// // 	console.log('this.option.autoToggle false，沒有自動開合');
				// }else if(typeof(this.option.autoToggle)=="number"){
				// 	var closed = vm.close(); 
				// 	setTimeout(closed, this.option.autoToggle);					
				// }	
				
				//  if(typeof(this.option.autoToggle)=="boolean"&&this.option.autoToggle==true){
				// 	var opened=vm.open();
				// 	setTimeout(opened, 1000);					
				// //  }else if(typeof(this.option.autoToggle)=="boolean"&&this.option.autoToggle==false){
				// // 	console.log('this.option.autoToggle false，沒有自動開合');			
				//  }else if(typeof(this.option.autoToggle)=="number"){
				// 	var opened=vm.open();
				// 	setTimeout(opened, this.option.autoToggle);		
				//  }	
			
			// // toggle text
			// function toggleTxt(){
			// 	//console.log(vm);
			// 	var txt=document.getElementsByTagName('a');
			// 	if(txt[0].classList[1]=="closed"){					
			// 		//console.log('btntxt',vm.$btn[0].textContent,'changeTo',vm.option.button.openText);									
			// 		vm.$btn[0].textContent=vm.option.button.openText;
			// 	}else if(txt[0].classList[1]=="opened"){
			// 		//console.log('btntxt',vm.$btn[0].textContent,'changeTo',vm.option.button.closeText);
			// 		vm.$btn[0].textContent=vm.option.button.closeText;
			// 	}
			// }
			 this.btn();	
		};
	
		// 設定收合展開按鈕
		Module.prototype.btn = function () {					
			var _banner = this;		
			$(this.$btn).on("click",function(){
				
				if($(".wrap").hasClass("opened")){
					_banner.close();
				}
				
				if($(".wrap").hasClass("closed")){
					_banner.open();	
				}

			});			
		};
				        
		Module.prototype.open = function (){
			var classStr=$( ".wrap" ).hasClass( "closed" );
			var vm=this;
			$( ".wrap" ).find( ".img" ).removeClass("top");
			//test
			var whenTransitionRun = vm.option.whenTransition;
			//whenTransitionRun();
			// setInterval(()=>console.log('time'),50);
			var print =setInterval(function(){
				whenTransitionRun();
			},50);

			//btn			
			if(this.option.transition==true){
				if(classStr===true){
					$(".wrap").removeClass( "closed" );
					$(".wrap").addClass( "opening" );
				}
			
				$(".wrap").on("transitionend",function(){
					//console.log('hasOpen',$( ".wrap" ).hasClass( "opening" ));
					if($( ".wrap" ).hasClass( "opening" )){
						$(".wrap").removeClass("opening").addClass("opened");
						// $( ".wrap" ).find( ".img" ).removeClass("top");							
					}
					//console.log('transitionend add opened');
					//vm.option.whenTransition();
					clearInterval(print);
				});

				this.$ele.find('.btn').text(this.option.button.closeText);

			}else{
				$(".wrap").removeClass( "closed" );
				$(".wrap").addClass( "opened" );			
				//console.log('this_open',this);
				this.$ele.find('.btn').text(this.option.button.closeText);				
			}	
			
		}

		Module.prototype.close = function (){
			
			var classStr2=$( ".wrap" ).hasClass( "opened" );
			var vm=this;

			//test
			var whenTransitionRun = vm.option.whenTransition;
			//whenTransitionRun();
			// setInterval(()=>console.log('time'),50);
			var print =setInterval(function(){
				whenTransitionRun();
			},50);
			

			//btn
			if(this.option.transition==true){
				if(classStr2===true){
					$(".wrap").removeClass("opened");
					$(".wrap").addClass( "closing" );
				}
				$(".wrap").on("transitionend",function(){
					if($( ".wrap" ).hasClass( "closing" )){
						$(".wrap").removeClass("closing").addClass("closed");
					}				
				
					if($( ".wrap" ).hasClass( "closed" )){
						$( ".wrap" ).find( ".img" ).addClass("top");	
					}
					
					//vm.option.whenTransition();
					//console.log('transitionend add closed');
					clearInterval(print);
					
				});
				this.$ele.find('.btn').text(this.option.button.openText);
				//console.log('close,transition=true');
				// if(!$( ".wrap" ).find( ".img" ).hasClass("top")){
				// 	setTimeout(()=>{
				// 		$( ".wrap" ).find( ".img" ).addClass("top");	
				// 	},1000)	
				// }

			}else{
				$(".wrap").removeClass( "opened" );
				$(".wrap").addClass( "closed" );
				//console.log('this_close',this);
				this.$ele.find('.btn').text(this.option.button.openText);
				//console.log('close,transition=false');
			}
									
		}

		Module.prototype.toggle = function (){
			if($(".wrap").hasClass("closed")){
				this.open();
				// $(".wrap").removeClass( "closed" );
				// $(".wrap").addClass( "opened" );	
				// this.$ele.find('.btn').text(this.option.button.closeText);				
			}else if($(".wrap").hasClass("opened")){
				this.close();
				// $(".wrap").removeClass( "opened" );
				// $(".wrap").addClass( "closed" );
				// this.$ele.find('.btn').text(this.option.button.openText);	
			}
			
		}
			
		$.fn[ModuleName] = function (options) {
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
					opts = $.extend( {}, Module.DEFAULTS, ( typeof options === 'object' && options ) );
					module = new Module(this, opts);
					$this.data( ModuleName, module );					
					// Do something to each element here.					
					module.init();	
				}
			});
		};
	
	})(jQuery);