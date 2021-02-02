const cookies = function(){
    // 设置cookies值
    cookies.prototype.set = function(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires+"; path=/"   // 这个很重要代表在那个层级下可以访问cookie
    }

    // 获取cookies值
    cookies.prototype.get = function(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while(c.charAt(0) == ' ') c = c.substring(1);
            if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    // 清除cookeis值
    cookies.prototype.clear = function(cname){
        setCookie(cname, "", -1);
    }
}

return cookies