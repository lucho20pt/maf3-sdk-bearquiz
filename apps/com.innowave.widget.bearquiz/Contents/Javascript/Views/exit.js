var exit = new MAF.Class({
	ClassName: 'exit',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		this.parent();
	},

	createView: function () {
		
		//this.exitYes.focus(true);
		
		//get global text
		var textExit = '<h1 style="display:block; padding-top:50px; font-size:2em; text-align:center; font-weight:700; line-height: 2em;">';
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
				left: (this.width / 2) - (1553 / 2),
				width: 1553,
				height: 513,
				vOffset: container2.outerHeight + 380,
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/box_text_info_02.png'
			}
		}).appendTo(this);
		
		var exitBox = new MAF.element.TextField({
			label: textExit,
			styles: {
				color: '#FFFFFF',
				padding: '0',
				left: (this.width / 2) - (900 / 2) - 10,
				vOffset: container2.outerHeight + 450,
				wrap: true,
				anchorStyle: 'justify',
				//height: 265,
				width: 900
			}
		}).appendTo(this);		
		
		//Buttons	
		
		var exitYes = new MAF.control.TextButton({
			label: textExitYes,
			styles: {					
					width: 674,
                    height: 110,
					top: 930,
					left: 1001,
					position: 'relative',
					fontSize: '1.4em',
					color: '#d65803',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_menu.png',
					backgroundPosition: 'center center'				
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
						fontSize: '2em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_menu_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_menu.png'
					});
				}
			}
		}).appendTo(this);
		
        var exitNo = new MAF.control.TextButton({
			label: textExitNo,
			styles: {					
					width: 674,
					height: 110,
					top: 930,
					left: 250,
					anchorStyle: 'Center',
					fontSize: '1.4em',
					color: '#d65803',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_menu.png',
					backgroundPosition: 'center center'				
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
						fontSize: '2em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_menu_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_menu.png'
					});
				}
			}
		}).appendTo(this);
		
	}

	
});
