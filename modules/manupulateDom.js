import { DateTime } from '../node_modules/luxon/src/luxon.js';

export const findHight = () => {
  if (window.innerHeight < document.body.scrollHeight) {
    document.querySelector('footer').style.position = 'relative';
  } else {
    document.querySelector('footer').style.position = 'fixed';
  }
};

export const dateTimeFormater = (day, time) => {
  const toCheck = DateTime.now().get('day');
  let suffix;
  switch (true) {
    case toCheck === 1:
      suffix = 'st';
      break;
    case toCheck === 2:
      suffix = 'nd';
      break;
    case toCheck === 3:
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
      break;
  }
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  day.innerHTML = `${monthNames[DateTime.now().get('month') - 1]} ${DateTime.now().get('day')}<sup>${suffix}</sup> ${DateTime.now().get('year')}`;
  setInterval(() => {
    time.textContent = DateTime.now().setLocale('en').toLocaleString(DateTime.TIME_WITH_SECONDS);
  }, 1000);
};