var result = new MAF.Class({
	ClassName: 'result',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		this.parent();			
	},
	updateView: function () {
		//console.log('total score in update view is -> ' + totalScore);
		pointsResult.setText( totalScore + ' ' + 'pts');
	},

	createView: function () {
		
		//get global text
		var themeTextTitle = xmlDocApp.getElementsByTagName("resultTitle")[0].childNodes[0].nodeValue;		
		
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
		
		// theme box
		var resultBoxBackground = new MAF.element.Container({
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
		
		
		//title
		var resultTitle =  new MAF.element.Text({
			label: themeTextTitle,
			styles: {
				width: 950,
				fontFamily: 'Comic Sans MS',
				fontSize: '1.4em',
				lineHeight: '1.4em',
				textAlign: 'center',
				left: (this.width / 2) - (950 / 2),
				top: 440,
				color: '#FFFFFF'
			}
		}).appendTo(this);
		
		// player image
		var avatarWinner = new MAF.element.Image({
			src: 'Images/avatar.png',
			styles: {
				width: 150,
				height: 150,
				left: (this.width / 2) - (150 / 2),
				vOffset: resultTitle.outerHeight + 8
			}
		}).appendTo(this);
		
		// winner image
		var imgWinner = new MAF.element.Image({
			src: 'Images/img_winner.png',
			styles: {
				width: 248,
				left: (this.width / 2) - (248 / 2),
				vOffset: resultTitle.outerHeight + 0
			}
		}).appendTo(this);
		
		// FINAL RESULT
		pointsResult = new MAF.element.Text({
			label: 'grr',
			styles: {
				width: 500,
				fontFamily: 'Comic Sans MS',
				fontSize: '1.6em',
				lineHeight: '1.6em',
				textAlign: 'center',
				left: (this.width / 2) - (500 / 2) + 15,
				top: 669
			}
		}).appendTo(this);	
		
		
		
		
		
		
		//Buttons		
		var fowardBtn = new MAF.control.TextButton({
			label: 'Avançar',
			styles: {					
					width: 477,
					height: 100,
					top: 800,
					left: (this.width / 2) - (477 / 2),
					fontSize: '1.1em',
					color: '#660099',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_menu.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {
					totalScore = 0;
					avatar.setText( 0 + ' ' + 'pts');
					pointsResult.setText( 0 + ' ' + 'pts');
					MAF.application.loadView('view-intro');
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
