/* eslint-disable */
$(document).ready(() => {
    $('#add').on('click', () => {
        console.log('add course')
        const courseId = $('#add').attr('value');

        $.ajax({
            url: `http://localhost:3333/courses/${courseId}/add`,
            method: 'POST',
            success: function (res) {
                console.log(res);
            },
            error: function (error) {
                console.log('error:', error);
            },
        })
        $('#add').text('✔');
    });

    $('.remove-course').on('click', () => {
        console.log('remove course')
        const courseId = $('.remove-course').attr('value');
        console.log(courseId)

        $.ajax({
            url: `http://localhost:3333/profile/${courseId}/remove`,
            method: 'POST',
            success: function (res) {
                console.log(res);
            },
            error: function (error) {
                console.log('error:', error);
            },
        })
        $('.hide').click(function() {
            $(this).slideUp();
        })
    });
});

/* eslint-enable */
