/* eslint-disable */
$(document).ready(() => {
    console.log('jQuery ready')
    $('#add').on('click', () => {
        console.log('add course btn pressed')
        const courseId = $('#add').attr('value');

        $.ajax({
            url: `http://localhost:3333/courses/${courseId}/add`,
            method: 'POST',
            success: (req, res, next) => {
                console.log('Request:', req);
                console.log('Response:', res);
            },
            error: (error) => {
                console.log('error:', error);
            },
        })

        $(document).ajaxSuccess(() => { 
            if ($('#add-icon').hasClass('fa-plus')) { 
                $('#add-icon').removeClass('fa-plus').addClass('fa-minus');
            } else {
                $('#add-icon').removeClass('fa-minus').addClass('fa-plus');
            }
            // .load no funciona, hace una copia de la pagina :S
            // $('#container-number-students').load('#number-students')

            location.reload();
            // recarga la web entera
            // $(function () {
            //     $('#number-students').fadeIn(100);
            //     setTimeout(function () {
            //         console.log('fade')
            //         $('#number-students').fadeOut(100, function () {
                             // location.reload();
            //         });
            //     }, 100);
            // });
        });
    });

    $('.remove-course').on('click', () => {
        console.log('remove course btn pressed')
        const courseId = $(event.target).attr('value');

        $.ajax({
            url: `http://localhost:3333/profile/${courseId}/remove`,
            method: 'POST',
            success: (req, res, next) => {
                console.log('Request:', req);
                console.log('Response:', res);
            },
            error: (error) => {
                console.log('error:', error);
            },
        })

        $(document).ajaxSuccess(() => {
            // $('.hide').click(() => {
            $('.hide').slideUp();
            // })
        });
    });

    $(window).ajaxStart(() => { console.log('Ajax Start'); }); // triggered if an Ajax request is started and no other Ajax requests are currently running
    $(window).ajaxSend((send) => { console.log('Ajax Send:', send); }); // triggered before the request is run
    $(window).ajaxSuccess((success) => { console.log('Ajax Success', success); }); // only called if the request was successful
    $(window).ajaxError((error) => { console.log('Ajax Error:', error); }); // only called if an error occurred with the request
    $(window).ajaxComplete(() => { console.log('Ajax Complete'); }); // called regardless of if the request was successful, or not.
    $(window).ajaxStop(() => { console.log('Ajax Stop'); }); // triggered if there are no more Ajax requests being processed.
});

/* eslint-enable */
