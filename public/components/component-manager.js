var ComponentManager = (function () {

    var container;

    function init() {
        container = $('.profile-container');
        registerEvents();
    }

    function registerEvents() {
        $('body').on('click', '[create-component]', function () {
            var component = $(this).attr('create-component');
            components[component]();
        });
    }

    var components = {
        card_profile: function () {
            new CardProfile.item(container, true);
        }
    };

    return {
        init: init
    };

})();

$(document).ready(function () {
    ComponentManager.init();
});