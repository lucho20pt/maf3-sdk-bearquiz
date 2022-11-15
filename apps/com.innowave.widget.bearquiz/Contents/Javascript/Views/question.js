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
		theImgTheme.setSource( 'Images/img_theme_' + picture + '_small.png');
		questionGameText.setText('<div style="display: table; height: 100px;"><p style="display: table-cell; vertical-align: middle;">' + quentionText + '</p></div>');
		answer_1.setText( '<p style="padding:30px 30px 30px 30px; text-align:left; display:block;"> <span style="margin-right:30px;">1. </span>' + answerText_1 + '</p>');
		answer_2.setText( '<p style="padding:30px 30px 30px 30px; text-align:left; display:block;"> <span style="margin-right:30px;">2. </span>' + answerText_2 + '</p>');
		answer_3.setText( '<p style="padding:30px 30px 30px 30px; text-align:left; display:block;"> <span style="margin-right:30px;">3. </span>' + answerText_3 + '</p>');
		answer_4.setText( '<p style="padding:30px 30px 30px 30px; text-align:left; display:block;"> <span style="margin-right:30px;">4. </span>' + answerText_4 + '</p>');
		
		
		answer_1.setDisabled(false);
		answer_2.setDisabled(false).animate({
			fontSize: '1.4em',
			color: "#d65803",
			backgroundImage: 'Images/box_answer.png'
		});
		answer_3.setDisabled(false).animate({
			fontSize: '1.4em',
			color: "#d65803",
			backgroundImage: 'Images/box_answer.png'
		});
		answer_4.setDisabled(false).animate({
			fontSize: '1.4em',
			color: "#d65803",
			backgroundImage: 'Images/box_answer.png'
		});
		questionButtons.fowardBtn.setDisabled(true);
		questionButtons.fowardBtn.setStyles ({
			background: 'none',
			textIndent: '-9000px'				
		});
		
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
				width: 1560,
				height: 150,
				left: (this.width / 2) - (1560 / 2),
				top: 327,
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'Images/box_question.png'
			}
		}).appendTo(this);
		
		//Avatar
		var avatarBg = new MAF.element.Text({
			styles: {
				width: 336,
				height: 430,
				right: 104,
				top: 528,
				display:'block',
				overflow:'hidden',
				backgroundImage: 'Images/box_avatar.png',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '0 0'				
			}
		}).appendTo(this);
		
		var avatarImage = new MAF.element.Text({
			styles: {
				width: 190,
				height: 190,
				right: 174,
				top: 564,
				display:'block',
				backgroundImage: 'Images/avatar.png',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '0 0'				
			}
		}).appendTo(this);
		
		avatarPts = new MAF.element.Text({
			label: '0 pts',
			styles: {
				width: 332,
				textAlign: 'center',
				fontSize: '1em',
				fontWeight: 700,
				right: 100,
				top: 766,
				//color: '#ffffff',
				display:'block',
				overflow:'hidden'				
			}
		}).appendTo(this);
				
		
		///////////////////////////////
		// question block
		///////////////////////////////
		
		//image theme
		theImgTheme = new MAF.element.Image({
			src:'',
			styles: {
				width: 77,
				height: 77,
				paddingRight: 5,
				paddingBottom:5,
				left: 230,
				top: 368,
				display: 'block',
				overflow: 'hidden'
			}
		}).appendTo(this);
		
		//question text
		questionGameText =  new MAF.element.Text({
			label: '',
			styles: {
				width: 1230,
				height: 100,
				fontSize: '1.4em',
				lineHeight: '1.4em',
				whiteSpace: 'normal',
				textAlign: 'leftCenter',
				left: (this.width / 2) - (1230 / 2),
				top: 353,
				color: '#FFFFFF'
			}
		}).appendTo(this);
		
		//timer counter
		viewTimerObject = new MAF.element.Text({
			label: '100',
			styles: {
				width: 220,
				height: 220,
				paddingTop: 70,
				textAlign: 'center',
				fontSize: '2em',
				fontWeight: 900,
				right: 100,
				top: 285,
				color: '#d65803',
				display:'block',
				overflow:'hidden',
				backgroundImage: 'Images/counter.png',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '0 0'				
			}
		}).appendTo(this);
		
		var viewTimerObjectPointsTxt = new MAF.element.Text({
			label: 'points',
			styles: {
				width: 220,
				textAlign: 'center',
				fontSize: '.6em',
				fontWeight: 700,
				right: 100,
				top: 410,
				color: '#d65803'				
			}
		}).appendTo(this);
				
		
		///////////////////////////////
		// answers block
		///////////////////////////////	
		
		//answer 1
		answer_1 = new MAF.control.TextButton({
			label: '',
			disabled: false,			
			styles: {					
					width: 1230,
					height: 107,
					top: 520,
					left: 190,
					fontSize: '1.4em',
					color: '#d65803',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_answer.png',
					backgroundPosition: 'left'				
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
						fontSize: '1.6em',
						fontWeight: 'bold',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_answer_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_answer.png'
					});
				}
			}
		}).appendTo(this);
		
		//answer 2
		answer_2 = new MAF.control.TextButton({
			label: '',
			styles: {					
					width: 1230,
					height: 107,
					top: answer_1.outerHeight + 10,
					left: 190,
					fontSize: '1.4em',
					color: '#d65803',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_answer.png',
					backgroundPosition: 'left'				
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
						fontSize: '1.6em',
						fontWeight: 'bold',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_answer_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_answer.png'
					});
				}
			}
		}).appendTo(this);
		
		//answer 3
		answer_3 = new MAF.control.TextButton({
			label: '',
			styles: {					
					width: 1230,
					height: 107,
					top: answer_2.outerHeight + 10,
					left: 190,
					fontSize: '1.4em',
					color: '#d65803',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_answer.png',
					backgroundPosition: 'left'				
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
						fontSize: '1.6em',
						fontWeight: 'bold',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_answer_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_answer.png'
					});
				}
			}
		}).appendTo(this);
		
		//answer 4
		answer_4 = new MAF.control.TextButton({
			label: '',
			styles: {					
					width: 1230,
					height: 107,
					top: answer_3.outerHeight + 10,
					left: 190,
					fontSize: '1.4em',
					color: '#d65803',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'Images/box_answer.png',
					backgroundPosition: 'left'				
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
						fontSize: '1.6em',
						fontWeight: 'bold',
						color: "#FFFFFF",
						backgroundImage: 'Images/box_answer_focus.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1.4em',
						color: "#d65803",
						backgroundImage: 'Images/box_answer.png'
					});
				}
			}
		}).appendTo(this);
		
		
		///////////////////////////////
		// foward button
		///////////////////////////////	
		var fowardBtn = new MAF.control.TextButton({
			label: 'Next',
			disabled: true,
			styles: {					
					width: 240,
					height: 107,
					top: 819,
					left: 1531,
					color: "#FFFFFF",
					fontWeight: 700,
					fontSize: '1.1em',
					//textIndent: '-9000px',
					backgroundRepeat: 'no-repeat',
					//backgroundImage: 'Images/box_next.png',
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
						fontWeight: 700,
						textIndent: 0,
						backgroundImage: 'Images/box_next.png'
					});
				},
				onBlur: function () {
					this.animate({
						fontSize: '1.1em',
						color: "#FFFFFF",
						fontWeight: 700,
						backgroundImage: 'Images/box_next.png'
					});
				}
			}
		}).appendTo(this);
		
		
		questionButtons.answer_1 = answer_1;
		questionButtons.answer_2 = answer_2;
		questionButtons.answer_3 = answer_3;
		questionButtons.answer_4 = answer_4;
		questionButtons.fowardBtn = fowardBtn;

				
		
	}
	
});	
