//Function need daysAndTimeSlots and options object. Then optionally function that will run within time range or out of time range or both situations.

module.exports.intervalChecker = (
  daysAndTimeSlots,
  options,
  functionWithinRange,
  functionOutOfRange
) => {
  var weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  // FUNCTION to check if current time is in range for scheduled timeslots.
  function isInRange(value, range) {
    return value >= range[0] && value <= range[1];
  }

  // FUNCTION to convert 12 hour format to 24 format. Need to be done to work with isInRange function.
  function convertTimeFormat(format, str) {
    var time = str;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM.toLowerCase() === "pm" && hours < 12) hours = hours + 12;
    if (AMPM.toLowerCase() === "am" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
  }

  //Just like the variables says
  var d = new Date();

  var currentDay = weekdays[d.getDay()];
  var currentDayIndex = d.getDay();

  // Checking if user has this current day as false or true.
  var currentDayState = daysAndTimeSlots[currentDayIndex][currentDay];

  // Getting the users timeslots for this day.
  var pickedTimeSlots = daysAndTimeSlots[currentDayIndex].time;

  // Getting the user current timezone.

  var userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Converting the user time to the developers time .

  var convertedTime = d.toLocaleTimeString(navigator.language, {
    timeZone: options.myTimeZone,
    hour: "2-digit",
    minute: "2-digit"
  });

  // console.log(
  //   "This is the time from where I as a user am right now " +
  //     d.toLocaleTimeString(navigator.language, {
  //       hour: "2-digit",
  //       minute: "2-digit"
  //     })
  // );

  // console.log(
  //   "This is the time from which the developer has set scheduled times " +
  //     convertedTime
  // );

  if (currentDayState) {
    if (
      options.timeFormat === 24 &&
      isInRange(convertedTime, pickedTimeSlots)
    ) {
      functionWithinRange && functionWithinRange();
    } else if (options.timeFormat === 12) {
      var myNativeTimeSlots = daysAndTimeSlots[currentDayIndex].time;

      console.log(daysAndTimeSlots[currentDayIndex].time);
      var convertedTimeSlots = [];
      myNativeTimeSlots.forEach(timeSlot => {
        convertedTimeSlots.push(convertTimeFormat("24", timeSlot));
      });

      if (
        myNativeTimeSlots.length === convertedTimeSlots.length &&
        isInRange(convertedTime, convertedTimeSlots)
      ) {
        functionWithinRange && functionWithinRange();
      } else {
        functionOutOfRange && functionOutOfRange();
      }
    } else {
      functionOutOfRange && functionOutOfRange();
    }
  } else {
    functionOutOfRange && functionOutOfRange();
  }
};
