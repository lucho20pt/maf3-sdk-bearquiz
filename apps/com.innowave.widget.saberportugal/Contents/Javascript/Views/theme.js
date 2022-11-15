var theme = new MAF.Class({
	ClassName: 'theme',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		this.parent();							
	},

	updateView: function () {
		
		// LOAAD CORRECT XML DEPENDING ON THE "var currentQuestion" NUMBER		
		if(currentQuestion === 1 || currentQuestion === 6){
			// historia
			xmlDocTheme = loadXMLDoc('historia.xml');
			picture = 'historia';
		}else if(currentQuestion === 2 || currentQuestion === 7){
			// geografia			
			xmlDocTheme = loadXMLDoc('geografia.xml');
			picture = 'geografia';
		}else if(currentQuestion === 3 || currentQuestion === 8){
			//gastronomia
			xmlDocTheme = loadXMLDoc('gastronomia.xml');
			picture = 'gastronomia';
		}else if(currentQuestion === 4 || currentQuestion === 9){
			//desporto
			xmlDocTheme = loadXMLDoc('desporto.xml');
			picture = 'desporto';
		}else if(currentQuestion === 5 || currentQuestion === 10){
			//artes
			xmlDocTheme = loadXMLDoc('artes.xml');
			picture = 'artes';	
		}
		
		//CURRENT THEME array of questions
		currentTheme = xmlDocTheme.getElementsByTagName("pergunta");		
		
		//get theme title
		var themeTitleXml = xmlDocTheme.getElementsByTagName("titulo")[0].childNodes[0].nodeValue;
		console.log( 'theme title CATEGORY from xml -> ' + themeTitleXml);
		
		//update labels
		this.themeTitle.setText(themeTitleXml);
		this.currentQuestCount.setText( currentQuestion + ' / 10');
		this.imgTheme.setSource( 'Images/img_theme_' + picture + '_big.png');
		
	},
	
	createView: function () {
		
		//get global text
		var viewTitleXml = xmlDocApp.getElementsByTagName("themeTitle")[0].childNodes[0].nodeValue;		 
		
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
		var themeBoxBackground = new MAF.element.Container({
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
		
		//STATIC TITLE
		var viewTitle =  new MAF.element.Text({
			label: viewTitleXml,
			styles: {
				width: 950,
				fontFamily: 'Comic Sans MS',
				fontSize: '1.1em',
				lineHeight: '1.1em',
				textAlign: 'center',
				left: (this.width / 2) - (950 / 2),
				top: 440,
				color: '#FFFFFF'
			}
		}).appendTo(this);	
				
		
		// current question
		this.currentQuestCount = new MAF.element.Text({
			label: '',
			styles: {
				width: 135,
				left: (this.width / 2) - (135 / 2),
				fontSize: '.9em',
				lineHeight: '.9em',
				textAlign: 'center',
				vOffset: viewTitle.outerHeight + 12,
				color: '#FFFFFF'
			}
		}).appendTo(this);
		
		// theme image
		this.imgTheme = new MAF.element.Image({
			src: '',
			styles: {
				width: 181,
				left: (this.width / 2) - (181 / 2),
				vOffset: this.currentQuestCount.outerHeight - 5
			}
		}).appendTo(this);
		
		// theme text title
		this.themeTitle = new MAF.element.Text({
			label: '',
			styles: {
				width: 500,
				fontFamily: 'Comic Sans MS',
				fontSize: '1.5em',
				lineHeight: '1.5em',
				textAlign: 'center',
				left: (this.width / 2) - (500 / 2),
				top: 670
			}
		}).appendTo(this);
		
		
		////////////////////
		// FOWARD BUTTON		
		this.fowardBtn = new MAF.control.TextButton({
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
					MAF.application.loadView('view-question');					
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						fontSize: '1.4em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_menu_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1.1em',
						color: "#660099",
						backgroundImage: 'Images/box_menu.png'
					});
				}
			}
		}).appendTo(this);
		
	}

	
});
