var help = new MAF.Class({
	ClassName: 'help',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		this.parent();
				
	},	
	
	createView: function () {		
		
		// get text		
		var t = '<h1 style="display:block; margin-bottom:20px; text-align:center; line-height: 1.1em;">';
			t += xmlDocApp.getElementsByTagName("helpTitle")[0].childNodes[0].nodeValue;
			t += '</h1>';
		
		var abc = '';
		var x = xmlDocApp.getElementsByTagName("helpLine");		
	
		for ( i = 0; i < x.length; i++ ) {
			var y = '<p style=" display:block; background: url(apps/com.innowave.widget.bearquiz/Contents/Images/bullet.png) no-repeat 0 4px; padding-left:50px; font-size: 1.2em; line-height: 1.2em; margin-bottom:22px;"> ';
				//y += '<strong style="font-size:50px; line-height:25px; vertical-align:middle;"> &bull; </strong>';
				y += xmlDocApp.getElementsByTagName("helpLine")[i].childNodes[0].nodeValue;
				y += '</p>';
			abc += y;
		}		
		var textHelp = t + abc;
		
		var textGoBack = xmlDocApp.getElementsByTagName("goBack")[0].childNodes[0].nodeValue;

		
		//container
		var container2 = new MAF.element.Container({
			label: 'container',
			styles: {
				vOffset: 0,
				width: '100%',
				height: '100%',
				zIndex: '0',
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
				left: (this.width / 2) - (1536 / 2),
				width: 1536,
				height: 513,
				vOffset: container2.outerHeight + 350,
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/box_text_info_02.png'
			}
		}).appendTo(this);
		
		var textBox = new MAF.element.TextField({
			label: textHelp,
			styles: {
				color: '#FFFFFF',
				padding: '0',
				left: (this.width / 2) - (1360 / 2),
				vOffset: container2.outerHeight + 390,
				wrap: true,
				anchorStyle: 'justify',
				width: 1360,
				height: 440
			}
		}).appendTo(this);
		
		//textBox.visibleLines = 10;
		
		
		
		/*var scrollDown = new MAF.control.Button({
			label: 'Scroll Down',
			styles: {
				width: 30,
				height: 18,
				top: 810,
				left: 1420,
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/arrow_down.png'
			},
			textStyles: {
				anchorStyle: 'center'
			},
			events: {
				onSelect: function () {
					textBox.firstLine += 3;
				},
				onFocus: function () {
					this.animate({
						backgroundImage: 'Images/arrow_down_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						backgroundImage: 'Images/arrow_down.png'
					});
				}
			}
		}).appendTo(this);
		
		var scrollUp = new MAF.control.Button({
			label: 'Scroll Up',
			styles: {
				width: 30,
				height: 18,
				top: 446,
				left: 1420,
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/arrow_up.png'
			},
			textStyles: {
				anchorStyle: 'center'
			},
			events: {
				onSelect: function () {
					textBox.firstLine -= 3;
				},
				onFocus: function () {
					this.animate({
						backgroundImage: 'Images/arrow_up_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						backgroundImage: 'Images/arrow_up.png'
					});
				}
			}
		}).appendTo(this);*/		
		
		
		var exitNo = new MAF.control.TextButton({
			label: textGoBack,
			styles: {					
					width: 674,
                    height: 110,
					top: 930,
					left: (this.width / 2) - (674 / 2),
					position: 'relative',
					fontSize: '2em',
					color: '#ffffff',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_menu_focus.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {
					MAF.application.previousView();
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
