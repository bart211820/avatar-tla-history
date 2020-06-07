var activeEvent;
var activeYear;

$(document).ready(function(){
	constructTimeLine();
	loadFireTimeLine();

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

function loadFireTimeLine() {
	constructTimeLine();
	fEvents.forEach((element) => {
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
	fEvents.forEach((element) => {
		if(eventID == element.id) {
			eventFound = element;
		}
	});
	return eventFound;
}

function giveTimeLineClickEvents() {
	$(".timeLineEvent").click(function() {
		thisEvent = findEventByID(this.id.replace("timeLineEvent_", ""));
		setActiveYear(thisEvent.year);
		setActiveEvent(thisEvent.id);
	});
}

function setActiveYear(year){
	activeYear = year;
	showMapPointer();
}

function setActiveEvent(eventID){
	activeEvent = event;
}

function showMapPointer() {
	var currentPointers = document.querySelectorAll(".mapPointer");
	for(i = 0; i < currentPointers.length; i++){
		currentPointers[i].remove();
	}
	var pointsToShow = [];
	fEvents.forEach((element) => {
		if(activeYear == element.year) {
			pointsToShow.push(element);
		}
	});
	pointsToShow.forEach((element => {
		$("#worldMap").append('<div class="mapPointer" style="margin-left: ' + element.positionX + '%; margin-top: ' + element.positionY + '%"></div>');
	}));
}