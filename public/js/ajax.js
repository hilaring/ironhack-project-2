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

    // $('.sort-btn:button').on('click', () => {
    //     // alert($(this).val());
    //     // console.log($(event.target).attr('value'))
    //     const type = $(event.target).attr('value')
    //     const data = {
    //         btnType: $(event.target).attr('value')
    //     }

    //     $.ajax({
    //         url: `http://localhost:3333/courses/sort/:type`,
    //         method: 'POST',
    //         dataType: 'json',
    //         data: data,
    //         success: (data) => {
    //             console.log(data)
    //             // location.reload();
    //         },
    //         error: (error) => {
    //             console.log('error:', error);
    //         },
    //     })
    // });

    $('.remove-course').on('click', () => {
        console.log('remove course btn pressed')
        const courseId = $('.remove-course').attr('value');
        console.log(courseId)

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
            location.reload();
            // $(event.target).slideUp()
            // $('hide').slideUp()
        });
    });

    $(window).ajaxStart(() => { console.log('Ajax Start'); }); // hay una req de ajax y ninguna otra corriendo
    $(window).ajaxSend((send) => { console.log('Ajax Send:', send); }); // antes de que corra la req
    $(window).ajaxSuccess((success) => { console.log('Ajax Success', success); }); // solo si la req es success
    $(window).ajaxError((error) => { console.log('Ajax Error:', error); }); // solo si hay un error en la req
    $(window).ajaxComplete(() => { console.log('Ajax Complete'); }); // tanto si la req es sucess o no
    $(window).ajaxStop(() => { console.log('Ajax Stop'); }); // no se están procesando más ajax
});
