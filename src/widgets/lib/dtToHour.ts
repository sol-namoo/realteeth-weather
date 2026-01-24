const TIMEZONE_OFFSET = 60 * 9;

export const dtToHour = (dt: number) => {
  const ms = (dt + TIMEZONE_OFFSET) * 1000;
  const date = new Date(ms);

  let hour = date.getHours().toString();
  if (hour.toString().length < 2) {
    hour = `0${hour}`;
  }
  return hour;
};
