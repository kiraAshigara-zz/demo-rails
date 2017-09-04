String.prototype.format = function () {
    var formatted = this, i, size = arguments.length;
    for (i = 0; i < size; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var UUID = (function () {

    var count = 0;
    var id = 'uuid-{0}';

    function newId() {
        count += 1;
        return id.format(count);
    }

    return {
        newId: newId
    };

})();