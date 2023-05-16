const dayInMs = 1000 * 60 * 60 * 24;
const weekInMs = dayInMs * 7;
const monthInMs = dayInMs * 30;
const yearInMs = dayInMs * 365;

// const months = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function calculateDate(date) {
  // let colorState;

  const dateString = date;
  const [day, month, year] = dateString.split("/");
  const myDate = new Date(year, month - 1, day);
  const dateNow = new Date();

  const thisMonth = dateNow.getMonth();
  const itemMonth = myDate.getMonth();
  // const itemDay = myDate.getDate();

  // const dayName = days[myDate.getDay()];
  // const monthName = months[myDate.getDay()];
  // const dayOfMonth = myDate.getDate();
  // const itemYear = myDate.getFullYear();

  const dateDiff = myDate - dateNow;
  // let monthDifference = Math.floor(dateDiff / monthInMs);

  let yearDifference = Math.floor(dateDiff / yearInMs);

  let monthsInYearDiff =
    Math.floor(dateDiff / monthInMs) - Math.floor(dateDiff / yearInMs) * 12;


    
  if (dateDiff < 0) {
    return { dataFormatada: `Expired`, colorStatus: "red" };
  } else if (dateDiff <= weekInMs) {
    return lessThanWeek(dateDiff);
  } else if (dateDiff < yearInMs) {
    return lessThanYear(monthsInYearDiff, thisMonth, itemMonth);
  } else return moreThanYear(monthsInYearDiff, yearDifference);
}


function lessThanWeek(dateDiff) {
  return dateDiff < dayInMs ? { dataFormatada: "Tomorrow", colorStatus: "#a12a2a" } : 
  {
        dataFormatada: `In ${Math.ceil((dateDiff / dayInMs))} days`, colorStatus: "rgb(143, 54, 54)",
      };
}

function lessThanYear(monthsDiff, thisMonth, itemMonth) {
  switch (monthsDiff) {
    case 0:
      return thisMonth === itemMonth
        ? { dataFormatada: "This month", colorStatus: "#bf6000" }
        : { dataFormatada: "Next month", colorStatus: "#bf6000" };
    case 1:
      return { dataFormatada: "Next month", colorStatus: "#bf6000" };
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return {
        dataFormatada: `In ${monthsDiff} months`,
        colorStatus: "#707038",
      };
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      return {
        dataFormatada: `In ${monthsDiff} months`,
        colorStatus: "#6a9959",
      };
    default:
      return {
        dataFormatada: `Erro`,
        colorStatus: "#6a9959",
      };
  }
}

function moreThanYear(monthsDiff, yearDiff) {
  let monthFormat = "";
  let yearFormat = "";
  let color = "#02607a";
  switch (monthsDiff) {
    case 0:
      monthFormat = "";
      break;
    case 1:
      monthFormat = `1 month`;
      break;
    default:
      monthFormat = `${monthsDiff} months`;
  }
  switch (yearDiff) {
    case 0:
      yearFormat = "";
      break;
    case 1:
      yearFormat = `1 year`;
      color = "#263fad";
      break;
    default:
      yearFormat = `${yearDiff} years `;
      color = "#1c3378";
  }

  const formattedString = `In ${yearFormat}${
    monthFormat ? (yearFormat ? " and " : "") + monthFormat : ""
  }`;
  // yearFormat&&monthFormat ? `In ${yearFormat ?"" : ""} and ${monthFormat}` : `In ${yearFormat}${monthFormat}`;

  return { dataFormatada: formattedString, colorStatus: color };
}
