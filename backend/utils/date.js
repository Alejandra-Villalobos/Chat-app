module.exports.actualDate = () => {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDayOfMonth = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();
  const currentMiliseconds = currentDate.getMilliseconds();

  const timeNow = `${currentYear}-${currentMonth}-${currentDayOfMonth} ${currentHour}:${currentMinutes}:${currentSeconds}.${currentMiliseconds}`;
  return timeNow;
};
