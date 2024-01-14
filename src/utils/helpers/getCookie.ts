export const getCookie = key => {
  const cookieString = decodeURIComponent(document.cookie);
  const cookieArray = cookieString.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.startsWith(key + '=')) {
      return {
        device_id: cookie.substring(key.length + 1),
        session_info: window.navigator.userAgent,
      };
    }
  }
  return '';
};
