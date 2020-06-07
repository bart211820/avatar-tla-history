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
		eventHTML = '<div class="timeLineEvent"><div class="timeLineImage" style="background-image: url(events/' + element.id + '.png)"></div><p>' + element.year +'</p></div>';
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
}


















function loadFireEvents(){
	var timelineHTML = '';
	for (i = 0; i < 5; i++) {
		timelineHTML += '<div class="timelineYear">';
		fEvents.forEach((element) => {

			if(i == element.index) {
				switch(element.month) {
					case "spring":
						timelineHTML += '<div class="timelineMonth timelineSpring"></div>';
						break;
					case "summer":
						timelineHTML += '<div class="timelineMonth timelineSummer"></div>';
						break;
					case "autumn":
						timelineHTML += '<div class="timelineMonth timelineAutumn"></div>';
						break;
					case "winter":
						timelineHTML += '<div class="timelineMonth timelineWinter"></div>';
						break;
					default:
						// F
				}
			}
		})
		timelineHTML += '</div>';
	}
	console.log(timelineHTML);
	document.getElementById("timeline").innerHTML = timelineHTML;
}