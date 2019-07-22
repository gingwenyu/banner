(function($) { 
	'use strict';
	
		var ModuleName = 'banner'; 
	
		var Module = function ( ele, options ) {
			this.ele = ele;
			this.$ele = $(ele);
			this.option = options;
			//this.$img = this.$ele.find(".img");
			this.$btn = this.$ele.find(".btn");
			// this.btn = '<button class="btn">收合</button>'; // var btn = '<button class="btn">收合</button>'
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
			//console.log("this.option.openAtStart",this.option.openAtStart);				
			//console.log(this);
			var vm=this;

			function autoSlide() {
				$(".wrap").toggleClass("opened");
				$(".wrap").toggleClass("closed");
				toggleTxt();
				return {};  //測試
			}	
			function autoSlideUD() {
				$(".wrap").toggleClass("closed");
				$(".wrap").toggleClass("opened");
				toggleTxt();
				return {};  //測試
			}
			
			//openAtStart & autoToggle  
			var open=this.option.openAtStart;
			console.log('openAtStart',open);
			var classN=document.getElementsByTagName('a');			
			var clStr=classN[0].classList[1];			
			
			 if(typeof(open)=="boolean"&&open==true){	
				$(".wrap").removeClass( clStr );
				$(".wrap").addClass( "opened" ); 
				var atToggle = this.option.autoToggle;
				console.log('autoToggle',atToggle);

				if(typeof(atToggle)=="boolean"&&atToggle==true){					
					setTimeout(autoSlide, 1000);										
				}else if(typeof(atToggle)=="boolean"&&atToggle==false){
					console.log('atToggle false，沒有自動開合');
				}else if(typeof(atToggle)=="number"){
					setTimeout(autoSlide, this.option.autoToggle);					
				}	
			 }else if(typeof(open)=="boolean"&&open==false){
				 $(".wrap").removeClass( clStr );
				 $(".wrap").addClass( "closed" );
				 this.$btn[0].textContent=this.option.button.openText;
				 if(typeof(this.option.autoToggle)=="boolean"&&this.option.autoToggle==true){
					setTimeout(autoSlideUD, 1000);					
				 }else if(typeof(this.option.autoToggle)=="boolean"&&this.option.autoToggle==false){
					console.log('atToggle false，沒有自動開合');			
				 }else if(typeof(this.option.autoToggle)=="number"){
					setTimeout(autoSlideUD, this.option.autoToggle);		
				 }	
			 }

			// toggle text
			function toggleTxt(){
				console.log(vm);
				var txt=document.getElementsByTagName('a');
				if(txt[0].classList[1]=="closed"){					
					console.log('btntxt',vm.$btn[0].textContent,'changeTo',vm.option.button.openText);									
					vm.$btn[0].textContent=vm.option.button.openText;
				}else if(txt[0].classList[1]=="opened"){
					console.log('btntxt',vm.$btn[0].textContent,'changeTo',vm.option.button.closeText);
					vm.$btn[0].textContent=vm.option.button.closeText;
				}
			}
			
			 this.btn();			 
			 //this.toggle();
		};
	
		// 設定收合展開按鈕
		Module.prototype.btn = function () {
			//console.log(this);	
			var btntext = this.option.button;
			var _banner = this;
			//console.log(btntext);
			$(this.$btn).on("click",function(e){
				console.log("this.textContent",this.textContent)
				console.log(this.textContent==btntext.closeText)
				if(this.textContent==btntext.closeText){									
					// console.log(btntext.option.button.closeText);
					// console.log(this);
					// $(".wrap").removeClass( "opened" );
					// $(".wrap").toggleClass( "closed" );
					// $(".img").css("top","-300px");
					// //e.target.textContent=btntext.option.button.openText;	
					// this.textContent=btntext.option.button.openText;
					_banner.close();
				}else{
					// $(".wrap").removeClass( "closed" );
					// $(".wrap").toggleClass( "opened" );
					// $(".img").css("top","0");
					// e.target.textContent=btntext.option.button.closeText;
					_banner.open();										
				}	
			});
		};
        
		Module.prototype.open = function (){
			var str=document.getElementsByTagName('a');			
			var classStr=str[0].classList[1];
			var vm=this;
			console.log(classStr,vm);
			//btn start
			$(".wrap").removeClass( classStr );
			$(".wrap").addClass( "opened" );			
			console.log('this_open',this);
			this.$ele.find('.btn').text(this.option.button.closeText);
			//btn end
				if(this.option.openAtStart==true&&classStr=='opened'&&this.option.transition==true){
					$(".wrap").removeClass( classStr );
					$(".wrap").addClass( "closing" );
					$(".wrap").on("transitionend",function(){
						$(".wrap").removeClass("closing").addClass("closed");						
						console.log('closing transitionend ');
						vm.option.whenTransition();
					})
					this.$ele.find('.btn').text(this.option.button.openText);

				}else if(this.option.openAtStart==false&&classStr=='closed'&&this.option.transition==true){
					$(".wrap").removeClass( classStr );
					$(".wrap").addClass( "opening" );
					$(".wrap").on("transitionend",function(){
						$(".wrap").removeClass("opening").addClass("opened");
						console.log('opening transitionend ');
						vm.option.whenTransition();
					})
					this.$ele.find('.btn').text(this.option.button.closeText);
				}

			// //testing
			// var str=document.getElementsByTagName('a');			
			// var classStr=str[0].classList[1];
			// console.log(classStr);
			// $(".wrap").removeClass( classStr );
			// $(".wrap").addClass( "opening" );
			// console.log('this_open',this);
			// $(".wrap").on("transitionend",function(){			
			// 	$(".wrap").removeClass("opening").addClass("opened");
			// 	console.log('opening transitionend ');
			// })
			// this.$ele.find('.btn').text(this.option.button.closeText);

			// // origin
			// $(".wrap").removeClass( "closed" );
			// //$(".wrap").addClass( "opened" );
			// $(".img").css("top","0");
			// console.log('this_open',this);			
			// this.$ele.find('.btn').text(this.option.button.closeText);
		}

		Module.prototype.close = function (){
			var str2=document.getElementsByTagName('a');			
			var classStr2=str2[0].classList[1];
			var vm=this;
			console.log(classStr2,vm);
			//btn start
			$(".wrap").removeClass( classStr2 );
			$(".wrap").addClass( "closed" );
			console.log('this_close',this);
			this.$ele.find('.btn').text(this.option.button.openText);
			//btn end

			if(this.option.openAtStart==true&&classStr2=='opened'&&this.option.transition==true){
				$(".wrap").removeClass( classStr2 );
				$(".wrap").addClass( "closing" );
				$(".wrap").on("transitionend",function(){
					$(".wrap").removeClass("closing").addClass("closed");						
					console.log('closing transitionend ');
					vm.option.whenTransition();
				})
				this.$ele.find('.btn').text(this.option.button.openText);

			}else if(this.option.openAtStart==false&&classStr2=='closed'&&this.option.transition==true){
				$(".wrap").removeClass( classStr2 );
				$(".wrap").addClass( "opening" );
				$(".wrap").on("transitionend",function(){
					$(".wrap").removeClass("opening").addClass("opened");
					console.log('opening transitionend ');
					vm.option.whenTransition();
				})
				this.$ele.find('.btn').text(this.option.button.closeText);
			}
			// //btn origin ok
			// $(".wrap").removeClass( "opened" );
			// $(".wrap").addClass( "closed" );
			// $(".img").css("top","-300px");
			// console.log('this_close',this);
			// //e.target.textContent=btntext.option.button.openText;	
			// this.$ele.find('.btn').text(this.option.button.openText);
		}

		Module.prototype.toggle = function (){
			var el=document.getElementsByTagName('a');
			console.log(el[0].classList[1]);
			if(el[0].classList[1]=="closed"){
				$(".wrap").removeClass( "closed" );
				$(".wrap").toggleClass( "opened" );	
			}else if(el[0].classList[1]=="opened"){
				$(".wrap").removeClass( "opened" );
				$(".wrap").toggleClass( "closed" );		
			}
			console.log('toggle done');
		}
			
		$.fn[ModuleName] = function (options ) {
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
					//console.log("module opts",options)
				}
			});
		};
	
	})(jQuery);