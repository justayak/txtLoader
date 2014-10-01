TxtLoader
Very simple AJAX-lib

```javascript

// get a text via AJAX
var url = "hallo/welt.txt";
TxtLoader.get(url, {
    success: function(txt){
        console.log(txt);
        ...
    },
    failure: function(statusCode){ /*optional*/
        ...
    },
    ctx : this /*optional*/
});

// send a text via AJAX
TxtLoader.post(url, {test:1, demo:[1,2,3]}, {
    success: function(txt){
        ...
    },
    failure: function(statusCode){ /*optional*/
        ...
    },
    ctx : this, /*optional*/
    mime: "application/json" /*optional*/
});

```
