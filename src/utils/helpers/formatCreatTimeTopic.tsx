export function formatCreatTimeTopic(milliseconds: number): string {
  const now = Date.now();
  const distance = now - milliseconds;

  if (distance < 0) {
    return 'in the future';
  }

  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (distance < minute) {
    const seconds = Math.round(distance / second);
    return `${seconds} giây trước`;
  } else if (distance < hour) {
    const minutes = Math.round(distance / minute);
    return `${minutes} phút trước`;
  } else if (distance < day) {
    const hours = Math.round(distance / hour);
    return `${hours} giờ trước`;
  } else if (distance < week) {
    const days = Math.round(distance / day);
    return `${days} ngày trước`;
  } else if (distance < month) {
    const weeks = Math.round(distance / week);
    return `${weeks} tuần trước`;
  } else if (distance < year) {
    const months = Math.round(distance / month);
    return `${months} tháng trước`;
  } else {
    const years = Math.round(distance / year);
    return `${years} năm trước`;
  }
}

const milliseconds = 1684782230254;
console.log(Date.now() - 1684782230254);
