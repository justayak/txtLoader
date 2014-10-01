/**
 * Created by Julian on 10/1/2014.
 */
window.TxtLoader = function(){

    if( typeof XMLHttpRequest === "undefined") {
        throw "TxtLoader: TxtLoader is not supported by this browser";
    }

    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    function digestOptions(options) {
        if (typeof options === "undefined"){
            throw "TxtLoader: get - options are mandatory";
        }
        if (typeof options.success === "undefined"){
            throw "TxtLoader: No success-callback set";
        }
        if (!isFunction(options.success)){
            throw "TxtLoader: success must be a function";
        }
        var success = options.success;
        var fail = null;
        if ("failure" in options && isFunction(options.failure)){
            fail = options.failure;
        }
        var ctx = this;
        if (typeof options.ctx !== "undefined"){
            ctx = options.ctx;
        }
        var mime = 'application/json';
        if (typeof options.mime !== "undefined"){
            mime = options.mime;
        }
        return {
            ctx: ctx,
            success: success,
            fail: fail,
            mime : mime
        };
    }

    return {
        get : function(url, options){
            var o = digestOptions(options);
            var ctx = o.ctx;
            var fail = o.fail;
            var success = o.success;
            var client = new XMLHttpRequest();
            client.open('GET', url);
            client.onreadystatechange = function(){
                if (client.status !== 200){
                    if (fail !== null && client.readyState === 2){
                        fail.call(ctx, client.status);
                    }
                } else if (client.readyState === 4){
                    success.call(ctx,client.responseText);
                }
            };
            client.send();
        },

        post: function(url, data, options){
            var o = digestOptions(options);
            var ctx = o.ctx;
            var fail = o.fail;
            var success = o.success;
            var mime = o.mime;
            var client = new XMLHttpRequest();
            client.setRequestHeader('Content-type', mime);
            client.open('POST', url, true);
            client.onreadystatechange = function(){
                if (client.status !== 200){
                    if (fail !== null && client.readyState === 2){
                        fail.call(ctx, client.status);
                    }
                } else if (client.readyState === 4){
                    success.call(ctx,client.responseText);
                }
            };
            client.send(data);
        }
    };
}();