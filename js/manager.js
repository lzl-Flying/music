(function($,root) {
    function Manager(length) {
        this.index = 0;
        this.length = length;
    }
    Manager.prototype = {
        next: function () {
            return this.getIndex(1);
        },
        prev: function () {
            return this.getIndex(-1);
        },
        getIndex: function (value) {
            var index = this.index;
            var length = this.length;
            var curIndex = (index + value + length) % length;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.Manager = Manager;
}(window.Zepto,window.player))