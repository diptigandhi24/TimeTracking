//create a start time stamp and end time stamp

export function getTimeStamp(userTime) {
  let time = userTime;
  let hoursMins = time.split(":");
  var currentDate = new Date();
  currentDate.setHours(hoursMins[0], hoursMins[1], 0, 0);
  var timestamp = currentDate.getTime();
  return timestamp;
}
