//create a start time stamp and end time stamp

export function getTimeStamp(userTime, currentDate = new Date()) {
  let time = userTime;
  let hoursMins = time.split(":");
  currentDate.setHours(hoursMins[0], hoursMins[1], 0, 0);
  var timestamp = currentDate.getTime();
  return timestamp;
}
