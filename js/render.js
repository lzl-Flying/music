(function ($,root){
    var $Scope = $(document.body);
    function renderInfo(data) {
        var html = "";
        html += "<h1 class='song-name'>"+data.song +"</h1>"+
        "<h3 class='singer-name'>"+data.singer+"</h3>"+
        "<h3 class='album-name'>"+data.album+"</h3>"
        $Scope.find(".song-info").html(html);
    }

    function renderImg(src){
        var image = new Image();
        image.onload = function () {
            $Scope.find(".img-wrap img").attr("src",src);
            root.blurImg(image,$Scope);
        }
        image.src = src;
    }

    function renderIsLike(isLike) {
        if(isLike){
            $Scope.find(".like-btn").addClass("liked");
        }else{
            $Scope.find(".like-btn").removeClass("liked");            
        }
    }

    root.render = function (data) {
        renderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})))