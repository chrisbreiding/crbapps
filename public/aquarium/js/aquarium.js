$(function () {

    var $window = $(window),
        windowWidth = $window.width(),
        windowHeight = $window.height(),
        MIN_FISH_WIDTH = 60,
        MAX_FISH_WIDTH = 200,
        MAX_FISH_HEIGHT = 100,
        randPos = function (xOrY) {
            var limit = xOrY === 'x' ? windowWidth - MAX_FISH_WIDTH - 40 : windowHeight - MAX_FISH_HEIGHT - 40;
            return Math.floor(Math.random() * limit) + 40;
        },
        randColor = function () {
            return '#' + (function co(lor){
                return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ? lor : co(lor);
            })('');
        },
        randWidth = function() {
            return Math.floor( Math.random() * (MAX_FISH_WIDTH - MIN_FISH_WIDTH) ) + MIN_FISH_WIDTH;
        },
        nameList = [
            'Annabel',  'Asher',    'Atticus',  'August',   'Butch',    'Clementine',
            'Daisy',    'Dashiell', 'Delilah',  'Dexter',   'Dixie',    'Duke',
            'Edie',     'Ella',     'Elvis',    'Flora',    'Frances',  'Frank',
            'Georgia',  'Gus',      'Harper',   'Hazel',    'Homer',    'Hopper',
            'Hudson',   'Hugo',     'Ike',      'India',    'Ione',     'Iris',
            'Isla',     'Ivy',      'June',     'Kai',      'Kingston', 'Lennon',
            'Leonora',  'Leopold',  'Levi',     'Lila',     'Lionel',   'Lola',
            'Luca',     'Lulu',     'Magnus',   'Mamie',    'Matilda',  'Millie',
            'Milo',     'Minnie',   'Moses',    'Olive',    'Orson',    'Oscar',
            'Otis',     'Pearl',    'Piper',    'Poppy',    'Ray',      'Roman',
            'Romy',     'Roscoe',   'Ruby',     'Rufus',    'Sadie',    'Scarlett',
            'Sebastian','Silas',    'Stella',   'Stellan',  'Sullivan', 'Talullah',
            'Theo',     'Violet',   'Harriet'
        ];

    var Fish = Backbone.Model.extend({

        validate : function (attributes) {

            if( attributes.width > MAX_FISH_WIDTH ) {
                return 'Fish is too wide!';
            }

            if( attributes.height > MAX_FISH_HEIGHT ) {
                return 'Fish is too tall!';
            }

        },

        initialize : function () {

            var name;

            this.bind("error", function (model, error) {
                console.log( error );
            });

            if( !this.get('height') ) {
                this.set({ height : this.get('width') / 2 });
            }

        },

        defaults : function () {
            return {
                x : randPos('x'),
                y : randPos('y'),
                color : randColor(),
                width : randWidth(),
                name : (function () {
                    return nameList.length ? nameList.splice( Math.floor(Math.random()*nameList.length) - 1, 1) : 'Fishy';
                }())
            };
        },

        setPosition: function (x,y) {
            this.set({ x:x, y:y });
        }

    });

    var Aquarium = Backbone.Collection.extend({

        model : Fish,

        initialize : function () {

            this.bind('add', function (model) {
                new FishView({
                    model       : model,
                    className   : 'fish'
                });
            }, this);

        }

    });

    var Tank = new Aquarium();

    var FishView = Backbone.View.extend({

        initialize : function () {
            this.render();
            this.model.bind('change', this.updateView, this);
            $('#aquarium').mousemove(this, this.mousemove).mouseup(this, this.mouseup);
        },

        render : function () {
            $(this.el)
                .attr({ title : this.model.get('name') })
                .append( _.template( $('#fish').html() ) )
                .appendTo('#aquarium');
            this.updateView();
            return this;
        },

        events : {
            'click .delete'         : 'destroy',
            'click .change-color'   : 'changeColor',
            'mousedown'             : 'draggingStart'
        },

        updateView : function () {
            var bgColor = this.model.get('color'),
                height = this.model.get('height'),
                halfHeight = height / 2;
            $(this.el)
                .css({
                    backgroundColor : bgColor,
                    left            : this.model.get('x'),
                    top             : this.model.get('y'),
                    width           : this.model.get('width'),
                    height          : height
                })
                .find('.head-top')
                    .css({
                        backgroundColor : bgColor
                    })
                .end().find('.mouth')
                    .css({
                        'border-bottom-color'   : bgColor
                    })
                .end().find('.tail')
                    .css({
                        'border-right-color'    : bgColor,
                        'right'                 : -1 * halfHeight + 3,
                        'border-right-width'    : halfHeight,
                        'border-top-width'      : halfHeight,
                        'border-bottom-width'   : halfHeight
                    });
        },

        destroy : function () {
            this.model.destroy();
            $(this.el).remove();
        },

        changeColor : function () {
            this.model.set({ color: prompt('Enter color value', this.model.get('color')) });
        },

        draggingStart : function (e) {
            this.dragging = true;
            this.initialX = e.pageX - this.model.get('x');
            this.initialY = e.pageY - this.model.get('y');
            return false; // prevents text selection
        },

        mouseup : function (e) {
            if (!e.data) return;
            var self = e.data;
            self.dragging = false;
        },

        mousemove : function (e) {
            if (!e.data) return;
            var self = e.data;
            if (self.dragging) {
                self.model.setPosition(e.pageX - self.initialX, e.pageY - self.initialY);
            }
        }

    });

    var AquariumView = Backbone.View.extend({

        el : '#aquarium',

        collection : Tank,

        initialize : function () {

            var self = this;

            this.render();

            $window.resize(function () {
                // changing the 'global' variables
                windowWidth = $window.width();
                windowHeight = $window.height();

                self.render.call(self);
            });

        },

        render : function () {
            $(this.el).css({
                width : windowWidth,
                height : windowHeight
            });
        },

        events : {
            'click #new-fish' : 'newFish'
        },

        newFish : function (e) {
            this.collection.add({});
        }

    });

    new AquariumView();

    Tank.add([ {}, {}, {}, {} ]); // Add 4 fish

});