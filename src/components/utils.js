//create a start time stamp and end time stamp

export function getTimeStamp(userTime, currentDate = new Date()) {
  let time = userTime;
  let hoursMins = time.split(":");
  currentDate.setHours(hoursMins[0], hoursMins[1], 0, 0);
  var timestamp = currentDate.getTime();
  return currentDate;
}
//2020-07-16T08:50:00.000Z------------wrong
//2020-03-01 11:00:00-06--------correct
//todo recheck the time
