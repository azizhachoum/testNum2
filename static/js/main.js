$(document).ready(function() {
    $('.delete-employee').on('click', function(e) {
        e.preventDefault();
        const $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/employee/delete/'+id,
            success: function(response) {
                alert('Employee deleted successfully');
                window.location.href = '/';
            },
            error: function(err) {
                console.error('Error deleting employee:', err);
            }
        });
    });
});
