var question = new MAF.Class({
	ClassName: 'question',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		this.parent();				
	},
	
	updateView: function () {
				
		var randomQuestionId = currentTheme[Math.floor(Math.random() * currentTheme.length)];
		//get result -> 1 pergunta random
		//console.log( randomQuestionId );		
		
		var quentionText = randomQuestionId.getElementsByTagName("textoPergunta")[0].childNodes[0].nodeValue;
		//get result -> texto da pergunta
		//console.log( quentionText );		
		var answerText_1 = randomQuestionId.getElementsByTagName("textoResposta")[0].childNodes[0].nodeValue;
		//answerID_1 = randomQuestionId.getElementsByTagName("respostas")[0].getElementsByTagName("resposta")[0].getAttribute("id");
		//get result -> texto da resposta 1
		//console.log( answerText_1 );
		var answerText_2 = randomQuestionId.getElementsByTagName("textoResposta")[1].childNodes[0].nodeValue;
		//get result -> texto da resposta 2
		//console.log( answerText_2 );
		var answerText_3 = randomQuestionId.getElementsByTagName("textoResposta")[2].childNodes[0].nodeValue;
		//get result -> texto da resposta 3
		//console.log( answerText_3 );
		var answerText_4 = randomQuestionId.getElementsByTagName("textoResposta")[3].childNodes[0].nodeValue;
		//get result -> texto da resposta 4
		//console.log( answerText_4 );
		
		answersCorrect = randomQuestionId.getElementsByTagName("correcta")[0].getAttribute("id");
		console.log( 'correct answer is -> ' + answersCorrect );
		
		/////////////////////////////////////////////////////////////////////////////////////////////
		//update labels
		this.imgTheme.setSource( 'Images/img_theme_' + picture + '_small.png');
		this.questionGameText.setText('<p>' + quentionText + '</p>');
		this.answer_1.setText( '<p style="padding:30px 30px 30px 100px; text-align:left;">' + answerText_1 + '</p>');
		this.answer_2.setText( '<p style="padding:30px 30px 30px 100px; text-align:left;">' + answerText_2 + '</p>');
		this.answer_3.setText( '<p style="padding:30px 30px 30px 100px; text-align:left;">' + answerText_3 + '</p>');
		this.answer_4.setText( '<p style="padding:30px 30px 30px 100px; text-align:left;">' + answerText_4 + '</p>');
		
		
		this.answer_1.setDisabled(false);
		this.answer_2.setDisabled(false).animate({
			fontSize: '1em',
			color: "#660099",
			backgroundImage: 'Images/box_answer.png'
		});
		this.answer_3.setDisabled(false).animate({
			fontSize: '1em',
			color: "#660099",
			backgroundImage: 'Images/box_answer.png'
		});
		this.answer_4.setDisabled(false).animate({
			fontSize: '1em',
			color: "#660099",
			backgroundImage: 'Images/box_answer.png'
		});
		questionButtons.fowardBtn.setDisabled(true);
		
		//Game Timer changes
		viewTimerObject.animate({
				backgroundPosition: '0 0'
			});
		viewTimerObject.setText('100');		
		currentSeconds = 30;
		scoreTimer();
		
		
	},

	createView: function () {	
		
		///////////////////////////////
		// backgrounds
		///////////////////////////////		
					
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
				
		//the question
		var questionGameBg =  new MAF.element.Container({
			label: 'question background',
			styles: {
				width: 1046,
				height: 116,
				left: (this.width / 2) - (1046 / 2),
				top: 340,
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/box_question.png'
			}
		}).appendTo(this);
		
		//Avatar
		avatar = new MAF.element.Text({
			label: '0 pts',
			styles: {
				width: 250,
				height: 250,
				paddingTop: 190,
				textAlign: 'center',
				fontSize: '1em',
				fontWeight: 700,
				right: (this.width / 5),
				top: 500,
				color: '#ffffff',
				display:'block',
				overflow:'hidden',
				backgroundImage: 'Images/box_avatar2.png',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '0 0'				
			}
		}).appendTo(this);
				
		
		///////////////////////////////
		// question block
		///////////////////////////////
		
		//image theme
		this.imgTheme = new MAF.element.Image({
			src:'',
			styles: {
				width: 73,
				left: (this.width / 4),
				top: 360
			}
		}).appendTo(this);
		
		//question text
		this.questionGameText =  new MAF.element.Text({
			label: '',
			styles: {
				width: 780,
				height: 80,
				fontFamily: 'Comic Sans MS',
				fontSize: '0.9em',
				lineHeight: '1.5em',
				whiteSpace: 'normal',
				textAlign: 'leftCenter',
				left: (this.width / 2) - (780 / 2),
				top: 365,
				color: '#FFFFFF'
			}
		}).appendTo(this);
		
		//timer counter
		viewTimerObject = new MAF.element.Text({
			label: '100',
			styles: {
				width: 148,
				height: 148,
				paddingTop: 56,
				textAlign: 'center',
				fontSize: '1em',
				fontWeight: 700,
				right: (this.width / 5),
				top: 330,
				color: 'black',
				display:'block',
				overflow:'hidden',
				backgroundImage: 'Images/counter.png',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '0 0'				
			}
		}).appendTo(this);
				
		
		///////////////////////////////
		// answers block
		///////////////////////////////	
		
		//answer 1
		this.answer_1 = new MAF.control.TextButton({
			label: '',
			disabled: false,			
			styles: {					
					width: 836,
					height: 95,
					top: 500,
					left: (this.width / 2) - (836 / 2) - 100,
					fontSize: '1em',
					color: '#660099',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_answer.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {	
					var id = '1';									
					questionButtons.answer_1.setDisabled(true);
					questionButtons.answer_2.setDisabled(true);
					questionButtons.answer_3.setDisabled(true);
					questionButtons.answer_4.setDisabled(true);
					questionButtons.fowardBtn.setDisabled(false);
					questionButtons.fowardBtn.focus(true);						
					validateAnswer(id, this);											
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						fontSize: '1.2em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_answer_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1em',
						color: "#660099",
						backgroundImage: 'Images/box_answer.png'
					});
				}
			}
		}).appendTo(this);
		
		//answer 2
		this.answer_2 = new MAF.control.TextButton({
			label: '',
			styles: {					
					width: 836,
					height: 95,
					top: 600,
					left: (this.width / 2) - (836 / 2) - 100,
					fontSize: '1em',
					color: '#660099',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_answer.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {
					var id = '2';					
					questionButtons.answer_1.setDisabled(true);
					questionButtons.answer_2.setDisabled(true);
					questionButtons.answer_3.setDisabled(true);
					questionButtons.answer_4.setDisabled(true);
					questionButtons.fowardBtn.setDisabled(false);
					questionButtons.fowardBtn.focus(true);										
					validateAnswer(id, this);
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						fontSize: '1.2em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_answer_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1em',
						color: "#660099",
						backgroundImage: 'Images/box_answer.png'
					});
				}
			}
		}).appendTo(this);
		
		//answer 3
		this.answer_3 = new MAF.control.TextButton({
			label: '',
			styles: {					
					width: 836,
					height: 95,
					top: 700,
					left: (this.width / 2) - (836 / 2) - 100,
					fontSize: '1em',
					color: '#660099',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_answer.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {
					var id = '3';
					questionButtons.answer_1.setDisabled(true);
					questionButtons.answer_2.setDisabled(true);
					questionButtons.answer_3.setDisabled(true);
					questionButtons.answer_4.setDisabled(true);
					questionButtons.fowardBtn.setDisabled(false);
					questionButtons.fowardBtn.focus(true);										
					validateAnswer(id, this);					
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						fontSize: '1.2em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_answer_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1em',
						color: "#660099",
						backgroundImage: 'Images/box_answer.png'
					});
				}
			}
		}).appendTo(this);
		
		//answer 4
		this.answer_4 = new MAF.control.TextButton({
			label: '',
			styles: {					
					width: 836,
					height: 95,
					top: 800,
					left: (this.width / 2) - (836 / 2) - 100,
					fontSize: '1em',
					color: '#660099',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_answer.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {
					var id = '4';
					questionButtons.answer_1.setDisabled(true);
					questionButtons.answer_2.setDisabled(true);
					questionButtons.answer_3.setDisabled(true);
					questionButtons.answer_4.setDisabled(true);
					questionButtons.fowardBtn.setDisabled(false);
					questionButtons.fowardBtn.focus(true);				
					validateAnswer(id, this);						
				},
				onAnimationEnded: function () {
					//log('animate ended');
				},
				onFocus: function () {
					this.animate({
						fontSize: '1.2em',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_answer_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1em',
						color: "#660099",
						backgroundImage: 'Images/box_answer.png'
					});
				}
			}
		}).appendTo(this);
		
		
		///////////////////////////////
		// foward button
		///////////////////////////////	
		var fowardBtn = new MAF.control.TextButton({
			label: 'Avançar',
			disabled: true,
			styles: {					
					width: 477,
					height: 100,
					top: 900,
					left: (this.width / 2) - (477 / 2),
					fontSize: '1.1em',
					color: '#660099',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_menu.png',
					backgroundPosition: 'center'				
				},
			events: {
				onSelect: function () {
					if( currentQuestion < 10 ){
						currentQuestion++;
						MAF.application.loadView('view-theme');	
					}else{
						MAF.application.loadView('view-result');	
					}					
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
		
		
		questionButtons.answer_1 = this.answer_1;
		questionButtons.answer_2 = this.answer_2;
		questionButtons.answer_3 = this.answer_3;
		questionButtons.answer_4 = this.answer_4;
		questionButtons.fowardBtn = fowardBtn;

				
		
	}
	
});	
