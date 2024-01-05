module.exports.actualDate = () => {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDayOfMonth = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMinutes =
    (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();
  const currentMiliseconds = currentDate.getMilliseconds();

  const timeNow = `${currentYear}-${currentMonth}-${currentDayOfMonth} ${currentHour}:${currentMinutes}:${currentSeconds}.${currentMiliseconds}`;
  return timeNow;
};

module.exports.formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
