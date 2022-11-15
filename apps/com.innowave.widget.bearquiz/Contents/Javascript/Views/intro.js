var intro = new MAF.Class({
	ClassName: 'intro',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		this.parent();
			
	},
	updateView: function () {
		currentQuestion = 1;
		//totalScore = 0; // assim não faz update a zeros
	},

	createView: function () {
		
		// get text	
		var button1 = xmlDocApp.getElementsByTagName("menuBtn")[0].childNodes[0].nodeValue;
		var button2 = xmlDocApp.getElementsByTagName("menuBtn")[1].childNodes[0].nodeValue;	
		var button3 = xmlDocApp.getElementsByTagName("menuBtn")[2].childNodes[0].nodeValue;	
		
		//container
		var container = new MAF.element.Container({
			label: 'container',
			styles: {
				vOffset: 0,
				width: '100%',
				height: '100%',
				zIndex: '0',
				//position: 'absolute',
				backgroundSize: '100% 100%',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundImage: 'Images/background01.jpg'
			}
		}).appendTo(this);
				
		
		// MENU BUTTONS	
		
		// style		
		var buttonStyleMenu =  {
			left: (this.width / 2) - (674 / 2),
			width: 675,
			height: 110,
			paddingBottom: 5,
			paddingTop: 0,
			marginBottom: 10,
			fontSize: '1.4em',
			fontWeight: 'bold',
			color: '#d65803',
			overflow: 'hidden',
			backgroundRepeat: 'no-repeat',
			backgroundImage: 'Images/box_menu.png',
			backgroundPosition: 'center center',
			position: 'relative',
			top: 625
		};
		
		var startPlay = new MAF.control.TextButton({
			label: button1,
			disabled: false,
			styles: {
				left: (this.width / 2) - (674 / 2),
				width: 675,
				height: 110,
				paddingBottom: 5,
				paddingTop: 0,
				marginBottom: 10,
				fontSize: '2em',
				fontWeight: 'bold',
				color: '#fff',
				overflow: 'hidden',
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/box_menu_focus.png',
				backgroundPosition: 'center center',
				position: 'relative',
				top: 625
			},
			events: {
				onSelect: function () {			
					MAF.application.loadView('view-theme');
															
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						//scale: 1.15,
						//duration: 0.5,
						fontSize: '2em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_menu_focus.png'
					}).animate({
						callback: function (animator) {
							//log('callback1 onFocus');
						}
					});
				},
				onBlur: function () {
					this.animate({
						//scale: 1,
						//duration: 0.5,
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_menu.png'
					}).animate({
						callback: function (animator) {
							//log('callback2 onBlur');
						}
					});
				}
			}
		}).appendTo(this);
		
		
		var help = new MAF.control.TextButton({
			label: button2,
			styles: buttonStyleMenu,
			events: {
				onSelect: function () {
					MAF.application.loadView('view-help');
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						//scale: 1.15,
						//duration: 0.5,
						fontSize: '2em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_menu_focus.png'
					}).animate({
						callback: function (animator) {
							//log('callback1 onFocus');
						}
					});
				},
				onBlur: function () {
					this.animate({
						//scale: 1,
						//duration: 0.5,
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_menu.png'
					}).animate({
						callback: function (animator) {
							//log('callback2 onBlur');
						}
					});
				}
			}
		}).appendTo(this);	
		
		
		var exit = new MAF.control.TextButton({
			label: button3,
			styles: buttonStyleMenu,
			events: {
				onSelect: function () {
					MAF.application.loadView('view-exit');
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						//scale: 1.15,
						//duration: 0.5,
						fontSize: '2em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_menu_focus.png'
					}).animate({
						callback: function (animator) {
							//log('callback1 onFocus');
						}
					});
				},
				onBlur: function () {
					this.animate({
						//scale: 1,
						//duration: 0.5,
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_menu.png'
					}).animate({
						callback: function (animator) {
							//log('callback2 onBlur');
						}
					});
				}
			}
		}).appendTo(this);		
		
		introButtons.startPlay = startPlay;
		introButtons.help = help;
		introButtons.exit = this.exit;
		
	}

});
