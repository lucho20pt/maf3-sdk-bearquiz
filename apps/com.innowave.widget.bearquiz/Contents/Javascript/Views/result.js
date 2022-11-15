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
		var winnerTitle = xmlDocApp.getElementsByTagName("resultTitle")[0].childNodes[0].nodeValue;
		var fowardBtnXml = xmlDocApp.getElementsByTagName("resultBtn")[0].childNodes[0].nodeValue;		
		
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
				left: (this.width / 2) - (1536 / 2),
				width: 1536,
				height: 513,
				vOffset: container2.outerHeight + 380,
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/box_text_info_02.png'
			}
		}).appendTo(this);
		
		
		//title
		var resultTitle =  new MAF.element.Text({
			label: winnerTitle,
			styles: {
				width: 950,
				fontSize: '2.5em',
				lineHeight: '2.5em',
				textAlign: 'center',
				left: (this.width / 2) - (950 / 2),
				top: 375,
				color: '#fff'
			}
		}).appendTo(this);
		
		// player image
		var avatar = new MAF.element.Image({
			src: 'Images/avatar.png',
			styles: {
				width: 190,
				height: 190,
				left: (this.width / 2) - (190 / 2),
				vOffset: resultTitle.outerHeight + 85
			}
		}).appendTo(this);
		
		// winner image
		var imgWinner = new MAF.element.Image({
			src: 'Images/img_winner.png',
			styles: {
				width: 368,
				height: 280,
				left: (this.width / 2) - (368 / 2),
				vOffset: resultTitle.outerHeight + 55
			}
		}).appendTo(this);
		
		// FINAL RESULT
		pointsResult = new MAF.element.Text({
			label: 'pts',
			styles: {
				width: 500,
				fontSize: '2em',
				lineHeight: '2em',
				textAlign: 'center',
				left: (this.width / 2) - (500 / 2) + 5,
				top: 790
			}
		}).appendTo(this);	
		
		
		
		
		
		
		//Buttons		
		var fowardBtn = new MAF.control.TextButton({
			label: fowardBtnXml,
			styles: {					
					width: 674,
                    height: 110,
					top: 930,
					left: (this.width / 2) - (674 / 2),
					position: 'relative',
					fontSize: '2em',
					color: '#fff',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_menu_focus.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {
					totalScore = 0;
					avatarPts.setText( 0 + ' ' + 'pts');
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
