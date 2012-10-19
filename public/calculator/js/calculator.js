(function (ng) {

    var Events = {
        events : {},
        on : function (event, handler) {
            this.events[event] = this.events[event] || [];
            this.events[event].push(handler);
        },
        off : function (event) {
            delete this.events[event];
        },
        trigger : function (event, arg) {
            var handlers = this.events[event],
                i = 0,
                len;

            if( handlers ) {
                len = handlers.length;

                for( i; i < len; i++ ) {
                    handlers[i].call(this, arg);
                }
            }
        }
    };

    var extend = function (target, source) {
        for ( var prop in source ) {
            if ( source.hasOwnProperty(prop) ) {
                target[prop] = source[prop];
            }
        }
    };

    var calculator = {
        ACCURACY : 1000,

        op : {
            '+' : function (a, b) { return (a * calculator.ACCURACY + b * calculator.ACCURACY) / calculator.ACCURACY; },
            '-' : function (a, b) { return (a * calculator.ACCURACY - b * calculator.ACCURACY) / calculator.ACCURACY; },
            '*' : function (a, b) { return a * b; },
            '/' : function (a, b) { return a / b; }
        },

        Calculation : function () {
            this.reset();
        },

        Number : function (value) {
            this.value = value;
            this.type = 'num';
        },

        Operator : function (value) {
            this.value = value;
            this.type = 'op';
        },

        Clear : function () {
            this.value = 'C';
            this.type = 'op';
        }
    };

    extend(calculator, Events);

    extend(calculator.Calculation.prototype, {
        reset : function () {
            this.result = {
                value : '0',
                type : null
            };
            this.collection = [];
            calculator.trigger('result:change', '0');
        },

        setResult : function (value, type) {
            // issue: will never be able to set properties to null
            this.result = {
                value : value || this.result.value,
                type : type || this.result.type
            };
            calculator.trigger('result:change', this.result.value);
        },

        calculate : function () {
            var coll = this.collection,
                num1, operator, num2;
            if ( !coll.length ) {
                return;
            }

            while( coll.length > 1 ) {
                num1 = parseFloat(coll[0].value);
                operator = coll[1].value;
                num2 = parseFloat(coll[2].value);

                coll[2].value = calculator.op[operator](num1, num2);
                coll.shift();
                coll.shift();
            }

            this.setResult( coll[0].value, 'calc' );
        }
    });

    extend(calculator.Number.prototype, {
        process : function () {
            var cC = calculation.collection,
                prevType = calculation.result.type,
                value = this.value,
                type = this.type;

            if ( this.value === '.') {
                if ( cC.length > 1 && /\./.test(cC[cC.length - 1].value) && prevType !== 'calc') {
                    return;
                }
                if ( !prevType || prevType === 'calc' ) {
                    value = '0.';
                    type = 'num';
                }
            }

            if ( prevType === 'calc' ) {
                cC[0].value = value;
            } else if ( prevType === type ) {
                value = cC[cC.length - 1].value = cC[cC.length - 1].value + value;
            } else {
                cC.push({
                    value : value,
                    type  : type
                });
            }

            calculation.setResult(value, type);
        }
    });

    extend(calculator.Operator.prototype, {
        process : function () {
            var cC = calculation.collection,
                prevType = calculation.result.type,
                value = this.value,
                type = this.type;

            if ( !cC.length ) {
                cC.push({
                    value : '0',
                    type : 'num'
                });
            }

            if ( prevType === type ) {
                cC[cC.length - 1].value = value;
            } else {
                cC.push({
                    value : value,
                    type  : type
                });
            }

            calculation.setResult(value, type);
        }
    });

    extend(calculator.Clear.prototype, {
        process : function () {
            calculation.reset();
        }
    });

    var calculation;

    var calculatorApp = ng.module('calculatorApp', []);

    calculatorApp.controller('CalcCtrl', function CalcCtrl ($scope) {

        $scope.buttons = [
            new calculator.Number('7'),
            new calculator.Number('8'),
            new calculator.Number('9'),
            new calculator.Operator('+'),
            new calculator.Number('4'),
            new calculator.Number('5'),
            new calculator.Number('6'),
            new calculator.Operator('-'),
            new calculator.Number('1'),
            new calculator.Number('2'),
            new calculator.Number('3'),
            new calculator.Operator('/'),
            new calculator.Number('0'),
            new calculator.Number('.'),
            new calculator.Clear(),
            new calculator.Operator('*' )
        ];

        $scope.buttonClick = function (button) {
            button.process();
        };

        $scope.calculate = function () {
            calculation.calculate();
        };

        calculator.on('result:change', function (result) {
            $scope.result = result;
        });

        calculation = new calculator.Calculation();

    });

}(angular));

// TODO
// - add tests
// - add ability to continually hit = and repeat last action
// - add ERROR display when dividing by 0, and handle next interaction
// - replace improvised events and extend with more robust solution?