var DataEditable = (function () {

    var dataEditorTemplate = '';
    var component;

    function initialize() {
        loadDataEditorHtml(function () {
            registerEvents();
            initDataEditable();
        });
    }

    function loadDataEditorHtml(done) {
        $.ajax({
            url: '/plugins/editor/editor.html'
        }).done(function (html) {
            dataEditorTemplate = html;
            $.ajax({
                url: '/plugins/editor/modal.html'
            }).done(function (_html) {
                $('body').append(_html);
                $('.modal').modal();
                return done();
            });
        });
    }

    function registerEvents() {
        $('body').on('mouseenter', '[data-editable]', function () {
            showDataEditable(this);
        });

        $('body').on('mouseleave', '[data-editable-container]', function () {
            $('[data-editable-container]').hide();
        });

        $('body').on('click', '.de-edit-button', function () {
            var id = $(this).parent().attr('data-editable-container');

            openModalEditor(id);
        });

        $('body').on('click', '.de-delete-button', function () {
            var id = $(this).parent().attr('data-editable-container');

            deleteComponent(id);
        });

        $('body').on('click', '.modal-data-editor-save-text', function (e) {
            e.preventDefault();
            var text = $('#modal-data-editor-text #textarea-content').val();
            component.text(text);
        });

        $('body').on('click', '.modal-data-editor-save-image', function (e) {
            e.preventDefault();
            var src = $('#modal-data-editor-image .preview-image').attr('src');
            component.attr('src', src);
        });

        document.getElementById("modal-data-editor-image-input").onchange = function () {
            var reader = new FileReader();

            reader.onload = function (e) {
                // get loaded data and render thumbnail.
                document.querySelector("#modal-data-editor-image .preview-image").src = e.target.result;
            };

            // read the image file as a data URL.
            reader.readAsDataURL(this.files[0]);
        };
    }

    function initDataEditable() {
        var containers = $('[data-editable]');
        $.each(containers, function (i, item) {
            addDataEditable(item);
        });
    }

    function addDataEditable(item) {
        var id = $(item).attr('data-editable');
        $(dataEditorTemplate.format(id)).insertAfter(item);
    }

    function showDataEditable(item) {
        $('[data-editable-container]').hide();
        var id = $(item).attr('data-editable');
        var container = $('[data-editable-container="{0}"]'.format(id));

        setContainerPosition(item, container);
        setContainerSize(item, container);

        container.show();
    }

    function setContainerPosition(item, container) {
        var pos = $(item).position();
        $(container).css('top', pos.top);
        $(container).css('left', pos.left);
    }

    function setContainerSize(item, container) {
        var width = $(item).outerWidth(true);
        var height = $(item).outerHeight(true);
        $(container).width(width);
        $(container).height(height);
    }

    function openModalEditor(componentId) {
        component = $('[data-editable="{0}"]'.format(componentId));
        var type = component.attr('data-editable-type');
        var modal = $('#modal-data-editor-{0}'.format(type));


        if (type === 'text') {
            var textArea = modal.find('#textarea-content');
            textArea.val(component.text());
        } else if (type === 'image') {
            var image = modal.find('.preview-image');
            image.attr('src', component.attr('src'));
        }

        modal.modal('open');
    }

    function deleteComponent(componentId) {
        component = $('[data-editable="{0}"]'.format(componentId));
        component.remove();
        $('[data-editable-container="{0}"]'.format(componentId)).remove();
    }

    return {
        init: initialize,
        addDataEditable: addDataEditable
    };

})();

$(document).ready(function () {
    DataEditable.init();
});