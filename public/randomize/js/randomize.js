(function(){

    // My nice little object
    var $_$ = function(id) {
        if( !(this instanceof $_$) ) {
            return new $_$(id);
        }

        this.elem = document.getElementById(id);
    };

    $_$.each = function (arr, func) {
        for( var i = 0, len = arr.length; i < len; i++ ) {
            func( arr[i] );
        }
    };

    $_$.prototype = {

        print : function(item) {
            if ( item === null ) {
                this.elem.innerHTML = '[null]';
            } else if ( item instanceof Array) {
                this.elem.innerHTML = item.join('<br />');
            } else if ( typeof item === 'object' ) {
                this.elem.innerHTML = '[object]';
            } else if ( item === undefined ) {
                this.elem.innerHTML = '[undefined]';
            } else { // Number or String
                this.elem.innerHTML = item.toString();
            }
        },

        escape : function() {
            var text = this.elem.value,
                replacements = {
                "<": "&lt;",
                ">": "&gt;",
                "&": "&amp;",
                "\"": "&quot;",
                "\'": "&#39;"
            };

            return text.replace(/[<>&"\']/g, function(match) {
                return replacements[match];
            });
        },

        focus : function() {
            this.elem.focus();
        },

        addHandler : function(type, handler) {
            // normalize event inconsistencies in IE
            function normalizeAndHandle(event) {
                event = event || window.event;
                if (!event.preventDefault) {
                    event.preventDefault = function() { this.returnValue = false; };
                }
                handler(event);
            }

            if (typeof this.elem.addEventListener === "function") {
                this.elem.addEventListener(type, normalizeAndHandle, false);
            } else {
                this.elem.attachEvent("on" + type, normalizeAndHandle);
            }
        }

    };

    // Adds shuffle method to array object if it doesn't already exist
    if(typeof Array.prototype.shuffle !== 'function') {
        Array.prototype.shuffle = function() {
            var len = this.length, i, j, tmp;
            for(i = len-1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                tmp = this[i];
                this[i] = this[j];
                this[j] = tmp;
            }
            return this;
        };
    }

    // Initialize
    $_$('list').focus();
    $_$('randomizer').addHandler('click', function(e) {
        e.preventDefault();
        var contents = $_$('list').escape().split("\n").shuffle();
        $_$('results').print(contents);
    });

}());