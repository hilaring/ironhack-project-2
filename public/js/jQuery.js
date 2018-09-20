/* eslint-disable */
$(document).ready(() => {
  // flash message
  $('.alert-warning').delay(3000).slideUp('slow');

  //showPassword
  $('#showPassword').on('click', () => {
    const password = $('#inputPassword')
    if (password.attr('type') === 'text') {
      password.attr('type', 'password');
    } else {
      password.attr('type', 'text');
    }
  });

  // console.log(window.location.pathname)
  var path = window.location.pathname.split("/")
  var generalPath = path[1]
  console.log(path)
  // console.log('general:' + generalPath)

  // if (generalPath === 'courses') {
  //   $("#courses").css("color", "#0087BE");
  //   // console.log($("#courses"))
  // }
  switch (generalPath) {
    case '':
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
  
})