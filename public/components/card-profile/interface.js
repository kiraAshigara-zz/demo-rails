var CardProfile = (function () {

    var template = '';

    function init() {
        loadTemplates();
    }

    function loadTemplates() {
        $.ajax({
            url: '/components/card-profile/template.html'
        }).done(function (html) {
            template = html;
        });
    }

    function item(container, isEditable) {
        this.item = $(template);

        if (isEditable) {
            var list = this.item.find('[data-editable]');

            $.each(list, function (i, a) {
                $(a).attr('data-editable', UUID.newId());
                DataEditable.addDataEditable(a);
            });
        }

        $(container).append(this.item);
    }


    return {
        init: init,
        item: item
    };

})();

$(document).ready(function () {
    CardProfile.init();
});