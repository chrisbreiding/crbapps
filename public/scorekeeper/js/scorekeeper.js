;(function ($) {
    $(function(){

        var ScoreKeeper = {

            init : function () {
                this.addBoard();
                this.addBoard();
                this.addEvents();
            },

            bind : function (fn, obj) {
                return function(){
                    return fn.apply(obj, arguments);
                };
            },

            addEvents : function () {
                $('body')
                    .on('keypress', '.score', this.updateScore)
                    .on('click', '.close', this.removeBoard);

                $('#plus').click(this.bind(this.addBoard, this));
            },

            updateScore : function (e) {
                var content, score, total, i, len, s;

                if ( e.keyCode == 13 ) {
                    content = $(this).val();
                    scores = content.split("\n");
                    total = 0;
                    len = scores.length;

                    for( i = 0; i < len; i++ ) {
                        s = +scores[i]; // + casts the value as a number

                        if( !isNaN(s) ) {
                            total += s;
                        }
                    }

                    $(this).parent('form').siblings('.total').html(total);
                }
            },

            boardTemplate : function () {
                return [
                    '<div class="scoreboard">',
                        '<form>',
                            '<input type="text" />',
                            '<textarea class="score"></textarea>',
                        '</form>',
                        '<div class="total"></div>',
                        '<a href="#" class="close">-</a>',
                    '</div>'
                ].join('');
            },

            addBoard : function (e) {
                if(e) e.preventDefault();

                $('#plus').before( this.boardTemplate() );
            },

            removeBoard : function (e) {
                e.preventDefault();
                $(this).parent('.scoreboard').remove();
            }

        };

        ScoreKeeper.init();

    });
}(jQuery));