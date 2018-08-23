/* eslint-disable */
$(document).ready(() => {
    $('#add').on('click', () => {
        console.log('hola')
        const courseId = $('#add').attr('value');
        // let user = req.session.currentUser;

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
    });

    $('.remove-course').on('click', () => {
        console.log('remove')
        const courseId = $('.remove-course').attr('value');
        console.log(courseId)
        $.ajax({
            url: `http://localhost:3333/profile/${courseId}/remove`,
            method: 'POST',
            // dataType: 'text',
            success: function (res) {
                console.log(res);
            },
            error: function (error) {
                console.log('error:', error);
            },
        })
    });
});



/* eslint-enable */
