javascript:(() => {
  const title = document.title;
  const url = window.location;
  const thingsUrl = `things:///add?title=${title}&notes=${url}&list-id=LMwSLNh9mn8bUYMYT6C8uA`;
  window.location = thingsUrl;
})()