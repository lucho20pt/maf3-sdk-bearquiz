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
		
		fowardBtn.focus(true);
		
		//CURRENT THEME array of questions
		currentTheme = xmlDocTheme.getElementsByTagName("pergunta");		
		
		//get theme title
		var themeTitleXml = xmlDocTheme.getElementsByTagName("titulo")[0].childNodes[0].nodeValue;
		console.log( 'theme title CATEGORY from xml -> ' + themeTitleXml);
		
		//update labels
		imgTheme.setSource( 'Images/img_theme_' + picture + '_big.png');
		themeTitle.setText(themeTitleXml);
		currentQuestCount.setText( currentQuestion + ' / 10');		
		
		
	},
	
	createView: function () {
		
		//get global text
		var viewTitleXml = xmlDocApp.getElementsByTagName("themeTitle")[0].childNodes[0].nodeValue;	
		var fowardBtnXML = xmlDocApp.getElementsByTagName("themeFoward")[0].childNodes[0].nodeValue;
		var backBtnXML = xmlDocApp.getElementsByTagName("themeBackMenu")[0].childNodes[0].nodeValue;	 
		
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
				left: (this.width / 2) - (1536 / 2),
				width: 1536,
				height: 513,
				vOffset: container2.outerHeight + 380,
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/box_text_info_02.png'
			}
		}).appendTo(this);		
		
		//STATIC TITLE
		var viewTitle =  new MAF.element.Text({
			label: viewTitleXml,
			styles: {
				width: 950,
				fontFamily: ' "Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif ',
				fontSize: '2.5em',
				lineHeight: '2.5em',
				textAlign: 'center',
				left: (this.width / 2) - (950 / 2),
				top: 390,
				color: '#FFFFFF'
			}
		}).appendTo(this);	
				
		
		// current question
		currentQuestCount = new MAF.element.Text({
			label: '',
			styles: {
				width: 135,
				left: (this.width / 2) - (135 / 2),
				fontWeight: 'bold',
				fontFamily: ' "Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif ',
				fontSize: '1.2em',
				lineHeight: '1.2em',
				textAlign: 'center',
				top: 515,
				color: '#FFFFFF'
			}
		}).appendTo(this);
		
		// theme image
		imgTheme = new MAF.element.Image({
			src: 'Images/img_theme_historia_big.png',
			styles: {
				width: 182,
				height: 182,
				left: (this.width / 2) - (182 / 2),
				top: 575
			}
		}).appendTo(this);
		
		// theme text title
		themeTitle = new MAF.element.Text({
			label: '',
			styles: {
				width: 700,
				fontFamily: ' "Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif ',
				fontSize: '2.5em',
				lineHeight: '2em',
				textAlign: 'center',
				left: (this.width / 2) - (700 / 2),
				top: 750
			}
		}).appendTo(this);
		
		
		
		///////////////////////////////
		// Buttons block
		///////////////////////////////

		// FOWARD BUTTON		
		fowardBtn = new MAF.control.TextButton({
			label: fowardBtnXML,
			styles: {					
					width: 674,
                    height: 110,
					top: 930,
					//left: (this.width / 2) - (674),
					left: 1001,
					position: 'relative',
					fontSize: '2em',
					color: '#ffffff',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_menu_focus.png',
					backgroundPosition: 'center center'				
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
		
		// BACK BUTTON
		var backMenu = new MAF.control.TextButton({
			label: backBtnXML,
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
					totalScore = 0;
					
					if(currentQuestion > 1){
						avatarPts.setText( 0 + ' ' + 'pts');
					}
					
					MAF.application.loadView('view-intro');
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
						//scale: 1,
						//duration: 0.5,
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_menu.png'
					});
				}
			}
		}).appendTo(this);
		
	}

	
});
