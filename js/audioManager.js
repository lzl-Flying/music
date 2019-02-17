(function($,root) {
    var $Scope = $(document.body);
    function audioManager() {
        this.audio = new Audio();
        this.status = 'pause';
        this.bindEvent();
    }
    audioManager.prototype = {
        bindEvent: function() {
            $(this.audio).on('ended',function() {
                $Scope.find('.next-btn').trigger('click');
            })
        },
        play: function() {
            this.audio.play();
            this.status = 'play';
        },
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },
        setAudio: function(src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay: function(duration){
            this.audio.currentTime = duration;
            this.play();
        }
        
    }
    root.audioManager = audioManager;
}(window.Zepto,window.player))