var activeEvent;
var selectedNation = 0;

$(document).ready(function(){
	constructTimeLine();
	loadTimeLine();

	$("#worldMap").click(function() {
		hidePopUp();
	});

	$("#buttonFire").click(function() {
		selectedNation = 0;
		loadTimeLine();
		changeLayoutColors("F");
		hidePopUp();
		removeMapPointers();
	});
	$("#buttonEarth").click(function() {
		selectedNation = 1;
		loadTimeLine();
		changeLayoutColors("E");
		hidePopUp();
		removeMapPointers();
	});
	$("#buttonAir").click(function() {
		selectedNation = 2;
		loadTimeLine();
		changeLayoutColors("A");
		hidePopUp();
		removeMapPointers();
	});
	$("#buttonWater").click(function() {
		selectedNation = 3;
		loadTimeLine();
		changeLayoutColors("W");
		hidePopUp();
		removeMapPointers();
	});
});

function changeLayoutColors(nationLetter) {
	document.getElementById("worldMap").style = "background-image: url(img/worldmap" + nationLetter + ".png)";
	document.getElementById("buttonsHolder").style = "background-image: url(img/buttonboxBackground" + nationLetter + ".png)";
	document.getElementById("infoBox").style = "background-image: url(img/infoboxBackground" + nationLetter + ".png)";
	document.getElementById("timeline").style = "background-image: url(img/timelineBackground" + nationLetter + ".png)";

	var backgroundColor = "";
	switch(nationLetter) {
		case "F":
			backgroundColor = "#fda979";
			document.getElementById("buttonFire").style = "";
			document.getElementById("buttonWater").style = "background-image: url(img/nationbuttonWd.png)";
			document.getElementById("buttonEarth").style = "background-image: url(img/nationbuttonEd.png)";
			document.getElementById("buttonAir").style = "background-image: url(img/nationbuttonAd.png)";
			break;
		case "E":
			backgroundColor = "#ffffd3";
			document.getElementById("buttonFire").style = "background-image: url(img/nationbuttonFd.png)";
			document.getElementById("buttonWater").style = "background-image: url(img/nationbuttonWd.png)";
			document.getElementById("buttonEarth").style = "";
			document.getElementById("buttonAir").style = "background-image: url(img/nationbuttonAd.png)";
			break;
		case "A":
			backgroundColor = "#f2f2f2";
			document.getElementById("buttonFire").style = "background-image: url(img/nationbuttonFd.png)";
			document.getElementById("buttonWater").style = "background-image: url(img/nationbuttonWd.png)";
			document.getElementById("buttonEarth").style = "background-image: url(img/nationbuttonEd.png)";
			document.getElementById("buttonAir").style = "";
			break;
		case "W":
			backgroundColor = "#e3f3ff";
			document.getElementById("buttonFire").style = "background-image: url(img/nationbuttonFd.png)";
			document.getElementById("buttonWater").style = "";
			document.getElementById("buttonEarth").style = "background-image: url(img/nationbuttonEd.png)";
			document.getElementById("buttonAir").style = "background-image: url(img/nationbuttonAd.png)";
			break;
		default:
			backgroundColor = "#E6C69D";
	}

	var eventDivs = document.querySelectorAll(".timelineYear");
	for (i = 0; i < eventDivs.length; i++) {
		eventDivs[i].style = "background-color: " + backgroundColor + ";";
	}
}

function constructTimeLine() {
	var timelineHTML = '';
	for (i = -82; i < 101; i++) {
		timelineHTML += '<div class="timelineYear" id="timelineYear' + convertIntToAvatarYear(i) + '">';
		timelineHTML += '<span class="timelineYearNumber">' + convertIntToAvatarYear(i) + '</span>';
		timelineHTML += '<div class="timelineMonth timelineSpring"><div class="timelineMonthNumber">Spring</div></div>';
		timelineHTML += '<div class="timelineMonth timelineSummer"><div class="timelineMonthNumber">Summer</div></div>';
		timelineHTML += '<div class="timelineMonth timelineAutumn"><div class="timelineMonthNumber">Autumn</div></div>';
		timelineHTML += '<div class="timelineMonth timelineWinter"><div class="timelineMonthNumber">Winter</div></div>';
		timelineHTML += '</div>';
	}
	document.getElementById("timelineEventsContainer").innerHTML = timelineHTML;
}

function removeEmtyTimeLineSlots() {
	var monthDivs = document.querySelectorAll(".timelineYear .timelineMonth");
	for (i = 0; i < monthDivs.length; i++) {
		if(monthDivs[i].innerHTML == '<div class="timelineMonthNumber">Spring</div>' || 
		   monthDivs[i].innerHTML == '<div class="timelineMonthNumber">Summer</div>' || 
		   monthDivs[i].innerHTML == '<div class="timelineMonthNumber">Autumn</div>' || 
		   monthDivs[i].innerHTML == '<div class="timelineMonthNumber">Winter</div>') {
		   monthDivs[i].remove();
		}
	}
}

function convertIntToAvatarYear(year) {
	if(year < 0) {
		return year.toString().replace("-", "") + 'BG';
	} else {
		return year + 'AG';
	}
}

function loadTimeLine() {
	constructTimeLine();
	events[selectedNation].forEach((element) => {
		eventHTML = '<div class="timeLineEvent" id="timeLineEvent_' + element.id + '"><div class="timeLineImage" style="background-image: url(events/' + element.id + '.png)"></div><p>' + element.year +'</p></div>';
		switch(element.month) {
			case "spring":
				document.querySelector('#timelineYear' + element.year + ' .timelineSpring').innerHTML += eventHTML;
				break;
			case "summer":
				document.querySelector('#timelineYear' + element.year + ' .timelineSummer').innerHTML += eventHTML;
				break;
			case "autumn":
				document.querySelector('#timelineYear' + element.year + ' .timelineAutumn').innerHTML += eventHTML;
				break;
			case "winter":
				document.querySelector('#timelineYear' + element.year + ' .timelineWinter').innerHTML += eventHTML;
				break;
			default:
				document.querySelector('#timelineYear' + element.year).innerHTML += eventHTML;
		}
	});
	removeEmtyTimeLineSlots();
	giveTimeLineClickEvents();
}

function findEventByID(eventID) {
	var eventFound;
	events[selectedNation].forEach((element) => {
		if(eventID == element.id) {
			eventFound = element;
		}
	});
	return eventFound;
}

function giveTimeLineClickEvents() {
	$(".timeLineEvent").click(function() {
		thisEvent = findEventByID(this.id.replace("timeLineEvent_", ""));
		setActiveEvent(thisEvent);
	});
}

function giveMapPointersClickEvents() {
	$(".mapPointer").click(function() {
		thisEvent = findEventByID(this.id.replace("mapPointer_", ""));
		setActiveEvent(thisEvent);
	});
}

function setActiveEvent(newEvent){
	activeEvent = newEvent;
	showMapPointer();
	showPopUp();
}

function showMapPointer() {
	removeMapPointers();
	var pointsToShow = [];
	events[selectedNation].forEach((element) => {
		if(activeEvent.year == element.year) {
			pointsToShow.push(element);
		}
	});
	pointsToShow.forEach((element => {
		$("#worldMap").append('<div id="mapPointer_' + element.id + '" class="mapPointer" style="margin-left: ' + element.positionX + '%; margin-top: ' + element.positionY + '%"></div>');
	}));
	giveMapPointersClickEvents();
}

function removeMapPointers() {
	var currentPointers = document.querySelectorAll(".mapPointer");
	for(i = 0; i < currentPointers.length; i++){
		currentPointers[i].remove();
	}
}

function showPopUp() {
	setTimeout(function(){
		var newText = '<h2>' + activeEvent.name + '</h2>' + activeEvent.description;
		document.querySelector('#infoText').innerHTML = newText;
		document.querySelector('#infoImage').style = 'background-image: url(events/' + activeEvent.id + '.png)';
		document.getElementById('mapArrow').className = "";

		var heightValue = "65vh - (1923px * " + activeEvent.positionY / 100 + ") - 20px";
		var topValue = activeEvent.positionY + "% + 20px";
		var leftValue = activeEvent.positionX + "% - 15px";
		var arrowValue;
		switch(selectedNation) {
			case 0:
				arrowValue = "F";
				break;
			case 1:
				arrowValue = "E";
				break;
			case 2:
				arrowValue = "A";
				break;
			case 3:
				arrowValue = "W";
				break;
			default:
				arrowValue = "";
		}

		document.getElementById("mapArrow").style = "background-image: url(img/arrowUp" + arrowValue + ".png);height: calc(" + heightValue + "); margin-top: calc(" + topValue + "); margin-left: calc(" + leftValue + ");";
	}, 80);
}

function hidePopUp() {
	document.querySelector('#infoText').innerHTML = "";
	document.querySelector('#infoImage').style = '';
	document.getElementById('mapArrow').className = "displayNone";
}