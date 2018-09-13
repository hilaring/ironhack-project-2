/* eslint-disable */
$(document).ready(() => {
  $('#showPassword').on('click', () => {
    const password = $('#inputPassword')
    if (password.attr('type') === 'text') {
      password.attr('type', 'password');
    } else {
      password.attr('type', 'text');
    }
  });
})
