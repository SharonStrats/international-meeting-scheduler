const addItem = () => {
  const time = getTimeToConvert();
  console.log(time); 
  const ul = document.getElementById("timezone-list");
  const timezone = document.getElementById("timezone");
  const meetingTimeForTimezone = getTimeForTimezone(time.value, timezone.value);
  const li = document.createElement("li");
  li.setAttribute('id',timezone.value);
  li.appendChild(document.createTextNode(timezone.value));
  li.appendChild(document.createTextNode(meetingTimeForTimezone));
  ul.appendChild(li);
}

const removeItem = () => {
  const ul = document.getElementById("timezone-list");
  const timezone = document.getElementById("timezone");
  const item = document.getElementById(timezone.value);
  ul.removeChild(item);
}

const createOptions = () =>  {
  const timezoneSelect = document.getElementById('timezone');
  aryIannaTimeZones.forEach(timezone => {
    const timezoneParts = timezone.split('/');
    console.log("time zone: " +  timezoneParts);
    const city = timezoneParts[timezoneParts.length-1];
    const option = document.createElement('option');
    option.value = timezone;
    option.innerHTML = city;
    timezoneSelect.appendChild(option);
  });
}
const getTimeToConvert = () => {
  return document.getElementById('meeting-datetime');
}
const getTimeForTimezone = (time, timezone) => {
  const localTime = luxon.DateTime.local();
  let meetingZone = luxon.DateTime.fromISO(time, { zone: localTime.zoneName });
  let overrideZone = meetingZone.setZone(timezone);
  //let overrideZone = luxon.DateTime.fromISO(time, { zone: "Australia/Melbourne" });
  //overrideZone.zoneName = timezone; //=> 'Europe/Paris'
  return overrideZone.toLocaleString(luxon.DateTime.DATETIME_FULL);
  
}