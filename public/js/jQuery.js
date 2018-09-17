/* eslint-disable */
$(document).ready(() => {
  // flash message
  $('.alert-warning').slideUp(2000);

  //showPassword
  $('#showPassword').on('click', () => {
    const password = $('#inputPassword')
    if (password.attr('type') === 'text') {
      password.attr('type', 'password');
    } else {
      password.attr('type', 'text');
    }
  });
})


