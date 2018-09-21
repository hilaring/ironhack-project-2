/* eslint-disable */
// const domain = 'http://localhost:3333';
const domain = 'https://courstory.herokuapp.com';

$(document).ready(() => {
    console.log('jQuery ready')
// NOTE: ADD COURSE------------------
    $('#add').on('click', () => {
        const courseId = $('#add').attr('value');

        $.ajax({
            url: `${domain}/courses/${courseId}/add`,
            method: 'POST',
            success: (data) => {
                $('#add').toggleClass('button-css-disable')
                $('#add').html('Added to your courses!')
            },
            error: (error) => {
                console.log('error:', error);
            },
        })
    });

// NOTE: REMOVE COURSE-----------------
    //$('.remove-course').on('click', () => {
    $('.remove-course').click(function() {
        // console.log('remove course, btn pressed')
        const courseId = $(this).data('id');
        $(this).parent().addClass("removed");
        // $(this).parent().slideUp('slow')

        $.ajax({
            url: `${domain}/profile/${courseId}/remove`,
            method: 'POST',
            success: (data) => {
                // $(this).parent().slideDown('slow')
                $(this).parent().hide()
            },
            error: (error) => {
                console.log('error:', error);
            },
        })

        // $(document).ajaxSuccess(() => {
        //     $(event.target).slideUp();
            // location.reload();
            // $(event.target).slideUp()
            // $('hide').slideUp()
        // });
    });

    // $(window).ajaxStart(() => { console.log('Ajax Start'); }); // hay una req de ajax y ninguna otra corriendo
    // $(window).ajaxSend((send) => { console.log('Ajax Send:', send); }); // antes de que corra la req
    // $(window).ajaxSuccess((success) => { console.log('Ajax Success', success); }); // solo si la req es success
    // $(window).ajaxError((error) => { console.log('Ajax Error:', error); }); // solo si hay un error en la req
    // $(window).ajaxComplete(() => { console.log('Ajax Complete'); }); // tanto si la req es sucess o no
    // $(window).ajaxStop(() => { console.log('Ajax Stop'); }); // no se están procesando más ajax
});
