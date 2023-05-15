const dayInMs = 1000 * 60 * 60 * 24;
const weekInMs = dayInMs * 7;
const monthInMs = dayInMs * 30;
const yearInMs = dayInMs * 365;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];




export function calculateDate(date) {

  let colorState;

  const dateString = date;
  const [day, month, year] = dateString.split("/");
  const myDate = new Date(year, month - 1, day);
  const dateNow = new Date();

  const thisMonth = dateNow.getMonth();
  const itemMonth = myDate.getMonth();
  const itemDay = myDate.getDate();
  
  const dayName = days[myDate.getDay()];
  const monthName = months[myDate.getDay()];
  const dayOfMonth = myDate.getDate();
  const itemYear = myDate.getFullYear();
  

  
  const dateDiff = myDate - dateNow;
  let monthDifference = Math.floor(dateDiff / monthInMs);

  let yearDifference = Math.floor(dateDiff / yearInMs);


  let monthsInYearDiff =
    Math.floor(dateDiff / monthInMs) - Math.floor(dateDiff / yearInMs) * 12;

if (dateDiff < 0) {
   return {dataFormatada:`Expired`, colorStatus: 'red'}; 
} else if (dateDiff <= weekInMs) {
    // console.log("Date diff is less than week in ms ", (dateDiff/dayInMs).toFixed(1));
    return ({dataFormatada:`Less than a week, in ${(dateDiff/dayInMs).toFixed(1)} days`, colorStatus: 'rgb(143, 54, 54)'}
    )
  }


  if (yearDifference === 0 && monthsInYearDiff > 1) {
    return {dataFormatada:`Less than a year, in ${monthsInYearDiff} months`, colorStatus: 'rgb(143, 54, 54)'};
  } 
  else if (
    yearDifference === 0 &&
    monthDifference === 0 &&
    thisMonth === itemMonth
  ) {
    return {dataFormatada:"This month", colorStatus: '#bf6000'};;
  } else if (
    (yearDifference === 0 &&
      monthDifference === 0 &&
      thisMonth !== itemMonth) ||
    (yearDifference === 0 && monthDifference === 1 && thisMonth !== itemMonth)
  ) {
    return {dataFormatada:"Next month", colorStatus: '#bf9300'};;
  } else if (yearDifference === 1 && monthDifference === 0) {
    return {dataFormatada:"In 1 year", colorStatus: '#7cbf00'};;
  } else if (yearDifference === 1 && monthDifference > 0) {
    return {dataFormatada:`In 1 year and ${monthsInYearDiff} months`, colorStatus: '#7cbf00'};;
  } else if (yearDifference === 1 && monthDifference === 1) {
    return {dataFormatada:`In 1 year and 1 month`, colorStatus: '#7cbf00'};;
  } else if (yearDifference > 1 && monthDifference > 0) {
    return {dataFormatada:`In ${yearDifference} years and ${monthsInYearDiff} months`, colorStatus: '#002a4f'};;
  } else if (yearDifference > 1 && monthDifference === 1) {
    return {dataFormatada:`In ${yearDifference} years and 1 month`, colorStatus: 'rgb(143, 54, 54)'};
  } else return {dataFormatada:`Don't know`, colorStatus: '#002a4f'};

}
