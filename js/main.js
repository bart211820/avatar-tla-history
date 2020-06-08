var activeEvent;
var selectedNation = 0;

$(document).ready(function(){
	constructTimeLine();
	loadTimeLine();

	$("#worldMap").click(function() {
		document.querySelector('#infoPopUp').className = "displayNone";
	});

	$("#nattionButtonFire").click(function() {
		selectedNation = 0;
		loadTimeLine();
	});
	$("#nattionButtonEarth").click(function() {
		selectedNation = 1;
		loadTimeLine();
	});
	$("#nattionButtonAir").click(function() {
		selectedNation = 2;
		loadTimeLine();
	});
	$("#nattionButtonWater").click(function() {
		selectedNation = 3;
		loadTimeLine();
	});
});

function constructTimeLine() {
	var timelineHTML = '';
	for (i = -82; i < 101; i++) {
		timelineHTML += '<div class="timelineYear" id="timelineYear' + convertIntToAvatarYear(i) + '">';
		timelineHTML += '<div class="timelineMonth timelineSpring"></div>';
		timelineHTML += '<div class="timelineMonth timelineSummer"></div>';
		timelineHTML += '<div class="timelineMonth timelineAutumn"></div>';
		timelineHTML += '<div class="timelineMonth timelineWinter"></div>';
		timelineHTML += '</div>';
	}
	document.getElementById("timeline").innerHTML = timelineHTML;
}

function removeEmtyTimeLineSlots() {
	var monthDivs = document.querySelectorAll(".timelineYear .timelineMonth");
	for (i = 0; i < monthDivs.length; i++) {
		if(monthDivs[i].innerHTML == "") {
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
	var currentPointers = document.querySelectorAll(".mapPointer");
	for(i = 0; i < currentPointers.length; i++){
		currentPointers[i].remove();
	}
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

function showPopUp() {
	document.querySelector('#infoPopUp h2').innerHTML = activeEvent.name;
	document.querySelector('#infoPopUp p').innerHTML = activeEvent.description;
	document.querySelector('#infoPopUpImage').style = 'background-image: url(events/' + activeEvent.id + '.png)';
	setTimeout(function(){
		document.querySelector('#infoPopUp').className = "";
	}, 50);
}