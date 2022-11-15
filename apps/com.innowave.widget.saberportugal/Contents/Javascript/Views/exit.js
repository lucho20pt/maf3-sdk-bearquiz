var exit = new MAF.Class({
	ClassName: 'exit',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		this.parent();
	},

	createView: function () {
		
		//get global text
		var textExit = '<h1 style="display:block; padding-top:50px; font-size:42px; text-align:center; font-weight:100; line-height: 1.5em;">';
			textExit +=	xmlDocApp.getElementsByTagName("exitText")[0].childNodes[0].nodeValue;
			textExit += '</h1>';
		var textExitYes = xmlDocApp.getElementsByTagName("exitYes")[0].childNodes[0].nodeValue;
		var textExitNo = xmlDocApp.getElementsByTagName("exitNo")[0].childNodes[0].nodeValue;
		
		//container
		var container2 = new MAF.element.Container({
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
				backgroundImage: 'Images/background02.jpg'
			}
		}).appendTo(this);
		
		
		// Text box
		var textBoxBackground = new MAF.element.Container({
			label: 'container',
			styles: {
				left: (this.width / 2) - (1050 / 2),
				width: 1050,
				height: 365,
				vOffset: container2.outerHeight + 400,
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/box_text_info_02.png'
			}
		}).appendTo(this);
		
		var exitBox = new MAF.element.TextField({
			label: textExit,
			styles: {
				color: '#FFFFFF',
				padding: '0',
				left: (this.width / 2) - (880 / 2) - 10,
				vOffset: container2.outerHeight + 450,
				wrap: true,
				anchorStyle: 'justify',
				width: 880,
				height: 265
			}
		}).appendTo(this);		
		
		//Buttons	
		
		var exitYes = new MAF.control.TextButton({
			label: textExitYes,
			styles: {					
					width: 477,
					height: 100,
					top: 800,
					left: (this.width / 2) - (477 / 2) + (477 / 2),
					fontSize: '1.1em',
					color: '#660099',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_menu.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {
					MAF.application.exit();
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						//scale: 1.15,
						//duration: 0.5,
						fontSize: '1.4em',
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
						fontSize: '1.1em',
						color: "#660099",
						backgroundImage: 'Images/box_menu.png'
					}).animate({
						callback: function (animator) {
							//log('callback2 onBlur');
						}
					});
				}
			}
		}).appendTo(this);
		
		var exitNo = new MAF.control.TextButton({
			label: textExitNo,
			styles: {					
					width: 477,
					height: 100,
					top: 800,
					left: (this.width / 2) - (477),
					anchorStyle: 'Center',
					fontSize: '1.1em',
					color: '#660099',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_menu.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {
					//MAF.application.loadView('view-intro');
					MAF.application.previousView();
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						//scale: 1.15,
						//duration: 0.5,
						fontSize: '1.4em',
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
						fontSize: '1.1em',
						color: "#660099",
						backgroundImage: 'Images/box_menu.png'
					}).animate({
						callback: function (animator) {
							//log('callback2 onBlur');
						}
					});
				}
			}
		}).appendTo(this);
		
	}

	
});
