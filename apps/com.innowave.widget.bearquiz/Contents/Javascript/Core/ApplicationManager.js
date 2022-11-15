// Javascript: BeerQuiz for METROLOGICAL
// Developer: Daniel Batista
// Company: InnoWave Technologies
// version: 1.0

//*********************************//
/////////// BUTTONS EVENTS ///////////
//*********************************//
var introButtons = {
    startPlay : {},
    help : {},
    exit : {}
};
var questionButtons = {
    answer_1 : {},
    answer_2 : {},
    answer_3 : {},
    answer_4 : {},
    fowardBtn : {}
};

//*********************************//
/////////// GENERIC VARS ///////////
//*********************************//
var currentQuestion = 1;
var picture = {};
var xmlDocApp = {};
var xmlDocTheme = {};
var element;

// FN - GET GENERIC TEXT XML
function loadXMLDocApp() {
	var xmlhttp;				
	xmlhttp = new XMLHttpRequest();				
	xmlhttp.open("GET","apps/com.innowave.widget.bearquiz/Contents/xml/saber_portugal.xml?time=120001033",false);				
	xmlhttp.send();
	xmlDocApp = xmlhttp.responseXML;			
} loadXMLDocApp();

// FN - GET THEME XML
function loadXMLDoc(xmlFilePath) {
	var xmlhttpGeo;				
	xmlhttpGeo = new XMLHttpRequest();				
	xmlhttpGeo.open("GET","apps/com.innowave.widget.bearquiz/Contents/xml/" + xmlFilePath + "?time=120001033",false);				
	xmlhttpGeo.send();
	xmlDocTheme = xmlhttpGeo.responseXML;
	return xmlDocTheme;		
}



// FN - COUNTER
var viewTimerObject = {};
var pointsResult = {};
//
var currentSeconds = 30;
var stepTime = 1000;

var questionScore = 0;
var totalScore = 0;

function scoreTimer(){
	if(currentSeconds < 1){
		clearTimeout(timerObject);
		return;
	}else{
		currentSeconds--;
				
	}
	//console.log('scoreTimer() : currentSeconds -> ' + currentSeconds);	
	if( currentSeconds > 27){		
			viewTimerObject.setText('100');
			questionScore = 100;
			viewTimerObject.animate({
				backgroundPosition: '0 0'
			});
		}else if ( currentSeconds === 27 ){			
			viewTimerObject.setText('90');
			questionScore = 90;
			viewTimerObject.animate({
				backgroundPosition: '0 -222px'
			});
		}else if ( currentSeconds === 24 ){			
			viewTimerObject.setText('80');
			questionScore = 80;
			viewTimerObject.animate({
				backgroundPosition: '0 -444px'
			});
		}else if ( currentSeconds === 21 ){			
			viewTimerObject.setText('70');
			questionScore = 70;
			viewTimerObject.animate({
				backgroundPosition: '0 -666px'
			});	
		}else if ( currentSeconds === 18 ){			
			viewTimerObject.setText('60');
			questionScore = 60;
			viewTimerObject.animate({
				backgroundPosition: '0 -888px'
			});		
		}else if ( currentSeconds === 15 ){			
			viewTimerObject.setText('50');
			questionScore = 50;
			viewTimerObject.animate({
				backgroundPosition: '0 -1110px'
			});
		}else if ( currentSeconds === 12 ){			
			viewTimerObject.setText('40');
			questionScore = 40;
			viewTimerObject.animate({
				backgroundPosition: '0 -1332px'
			});
		}else if ( currentSeconds === 9 ){			
			viewTimerObject.setText('30');
			questionScore = 30;
			viewTimerObject.animate({
				backgroundPosition: '0 -1554px'
			});
		}else if ( currentSeconds === 6 ){			
			viewTimerObject.setText('20');
			questionScore = 20;
			viewTimerObject.animate({
				backgroundPosition: '0 -1776px'
			});
		}else if ( currentSeconds === 3 ){			
			viewTimerObject.setText('10');
			questionScore = 10;
			viewTimerObject.animate({
				backgroundPosition: '0 -1998px'
			});
		}else if ( currentSeconds === 0 ){			
			viewTimerObject.setText('0');
			questionScore = 0;
			viewTimerObject.animate({
				backgroundPosition: '0 -2220px'
			});
		}	
	//viewTimerObject.setText(currentSeconds);	
	timerObject = setTimeout( scoreTimer, stepTime);		
}


// FN - VALIDATE IF ANSWER IS CORRECT OR WRONG
function validateAnswer( id, _this) {	
	if( answersCorrect === id ){		
		console.log('correct');		
		totalScore += questionScore;		
		_this.animate({
			fontSize: '1.6em',
			color: '#FFFFFF',
			backgroundImage: 'Images/box_answer_result2.png',
			opacity: 1
		});		
	}else{
		console.log('wrong');				
		_this.animate({
			fontSize: '1.6em',
			color: '#FFFFFF',
			backgroundImage: 'Images/box_answer_result1.png',
			opacity: 1
		});		
	}	
	stopScoretimer();	
	avatarPts.setText( totalScore + ' ' + 'pts');	
	_this.setDisabled(true);	
}
function stopScoretimer(){	
	clearTimeout(timerObject);	
}


// FN - Prevent the backspace key from navigating back.
function KeyDownHandler(e) {
    if (e.keyCode === 8) {
        var el = document.activeElement;
        if (!((el.nodeName === "INPUT" && (el.type === "text" || el.type === "password")) || el.nodeName === "TEXTAREA")) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}
if (document.attachEvent) document.attachEvent("onkeydown", KeyDownHandler);
else document.addEventListener("keydown", KeyDownHandler);


//*********************************//
/////////// GLOBAL SCOPE POLUTED FIX ///////////
//*********************************//
var avatarPts = {};
var answersCorrect = {};
var currentTheme = {};
var timerObject = {};
var i = {};
var currentQuestCount = {};
var imgTheme = {};
var themeTitle = {};
var fowardBtn = {};
var theImgTheme = {};
var questionGameText = {};
var answer_1 = {};
var answer_2 = {};
var answer_3 = {};
var answer_4 = {};



// FN - GET the Next question
//
/*
function getNextQuestion(viewID) {
	switch (viewID) {
		case 'view-historia':
		 
			return 'view-question';
			
		case 'view-geografia':
		 
			return 'view-question';

		case 'view-gastronomia':
		
			return 'view-question';

		case 'view-desporto': 
		
			return 'view-question';

		case 'view-artes': 
		
			return 'view-question';

		default:
		
			return 'view-intro';

	}
	
}
*/				