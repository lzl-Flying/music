var $ = window.Zepto;
var $Scope = $(document.body);
var root = window.player;
var render = root.render;
var songList;
var manager;
var audiomanager = new root.audioManager();
var processor = root.processor;
var playlist = root.playlist;

function bindClick() {
    $Scope.on('playChange', function (e, index,flag) {
        render(songList[index]);
        audiomanager.setAudio(songList[index].audio);
        if (audiomanager.status == 'play' || flag) {
            audiomanager.play();
            processor.start();
        }
        processor.renderAllTime(songList[index].duration);
        processor.upDate(0);        
    })

    $Scope.find('.prev-btn').on("click", function () {
        var index = manager.prev();
        $Scope.trigger('playChange', index);
    })
    $Scope.find('.next-btn').on("click", function () {
        var index = manager.next();
        $Scope.trigger('playChange', index);
    })

    $Scope.find('.play-btn').on("click", function () {
        if (audiomanager.status == 'pause') {
            audiomanager.play();
            $Scope.find('.play-btn').addClass('playing');
            processor.start();
        } else {
            audiomanager.pause();
            $Scope.find('.play-btn').removeClass('playing');
            processor.stop();            
        }
    })
    $Scope.find('.list-btn').on('click',function() {
        playlist.show(manager);
    })
}
function bindTouch() {
    var $silder = $Scope.find('.silder');
    var offset = $Scope.find('.processor').offset();
    var left = offset.left;
    var width = offset.width;
    $silder.on('touchstart',function() {
        processor.stop();
    }).on('touchmove',function(e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent < 0){
            percent = 0;
        }else if(percent > 1){
            percent = 1;
        }
        processor.upDate(percent);
    }).on('touchend',function(e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent < 0){
            percent = 0;
        }else if(percent > 1){
            percent = 1;
        }
        var curDuration = songList[manager.index].duration * percent;
        audiomanager.jumpToPlay(curDuration);
        processor.start(percent);
        $Scope.find('.play-btn').addClass('playing');
    })
}
function getData(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            playlist.renderList(data);
            manager = new root.Manager(data.length);
            bindClick();
            bindTouch();
            songList = data;
            $Scope.trigger('playChange', 0);
        }
    })
}
getData("./mock/data.json");