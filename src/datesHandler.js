const dayInMs = 1000 * 60 * 60 * 24;

////// 2024,12,9

export function calculateDate(dayValue, monthValue, yearValue) {
  const dateNow = new Date();
  const futureDateObj = new Date(`${yearValue}-${monthValue}-${dayValue}`);

  const dateDiff = futureDateObj - dateNow;
  const diffDays = Math.floor(dateDiff / dayInMs);
  console.log(diffDays);

  const remainingYears = Math.floor(diffDays / 365);
  const remaningMonths = Math.floor((diffDays % 365) / 30);
  const remainingDays = diffDays - remainingYears * 365 - remaningMonths * 30;

  console.log(
    `${remainingYears} years, ${remaningMonths} months, ${remainingDays} days`
  );
  if (remainingYears > 0) {
    return { remainingYears, remaningMonths, remainingDays };
  } else if (remaningMonths > 0){
    return {remaningMonths, remainingDays}
  } else return {remainingDays}
}
