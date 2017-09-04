$(document).ready(function () {

    var list = $('.collection li.collection-item,li.collection-header h5,span.card-title');

    $.each(list, function (i, item) {
        $(item).attr('data-editable', UUID.newId());
        $(item).attr('data-editable-type', 'text');
    });

    list = $('.profile-container img');

    $.each(list, function (i, item) {
        $(item).attr('data-editable', UUID.newId());
        $(item).attr('data-editable-type', 'image');
    });
});