/* eslint-disable */
$(document).ready(() => {
  // FLASH MESSAGE
  $('.alert-warning').delay(3000).slideUp('slow');

  //SHOW PASSWORD
  $('#showPassword').on('click', () => {
    const password = $('#inputPassword')
    if (password.attr('type') === 'text') {
      password.attr('type', 'password');
    } else {
      password.attr('type', 'text');
    }
  });

  // NAVBAR MENU COLOR
  var path = window.location.pathname.split("/")
  var currentPath = path[1]

  switch (currentPath) {
    case '': // home case
      $("#home").css("color", "#0087BE");
      break;
    case 'courses':
      $("#courses").css("color", "#0087BE");
      break;
    case 'profile':
      $("#profile").css("color", "#0087BE");
      break;
    case 'signup':
      $("#signup").css("color", "#0087BE");
      break;
    default:
      $(".nav-item").css("color", "white");
  }
});
