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
});
