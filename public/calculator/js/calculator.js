function CalcCtrl ($scope) {

    var calculator = {
        ACCURACY : 1000,
        prevType : null,

        op : {
            '+' : function (a, b) { return (a * this.ACCURACY + b * this.ACCURACY) / this.ACCURACY; },
            '-' : function (a, b) { return (a * this.ACCURACY - b * this.ACCURACY) / this.ACCURACY; },
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

    calculator.Calculation.prototype = {
        reset : function () {
            this.result = {
                value : '0',
                type : null
            };
            this.collection = [];
        },

        setResult : function (value, type) {
            // issue: will never be able to set to null
            this.result = {
                value : value || this.result.value,
                type : type || this.result.type
            };
            $scope.result = this.result.value;
        },

        calculate : function () {
            var coll = this.collection,
                num1, operator, num2;
            if( !coll.length ) {
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
    };

    calculator.Number.prototype = {
        process : function () {
            var cC = calculation.collection,
                prevType = calculation.result.type,
                value = this.value,
                type = this.type;

            if( this.value === '.') {
                if ( cC.length > 1 && /\./.test(cC[cC.length - 1].value) && prevType !== 'calc') {
                    return;
                }
                if( !prevType || prevType === 'op' || prevType === 'calc' ) {
                    value = '0.';
                }
            }

            if( prevType === 'calc' ) {
                cC[0].value = value;
            } else if( prevType === type ) {
                cC[cC.length - 1].value = cC[cC.length - 1].value + value;
            } else {
                cC.push({
                    type  : type,
                    value : value
                });
            }

            calculation.setResult(value, type);
        }
    };

    calculator.Operator.prototype = {
        process : function () {
            var cC = calculation.collection,
                prevType = calculation.result.type,
                value = this.value,
                type = this.type;

            if( !cC.length ) {
                if( this.value === '-' ) {
                    type = 'num';
                } else if( this.type === 'op' ) {
                    return;
                }
            }

            if( cC.length === 1 && cC[0].value === '-' && this.type === 'op' ) {
                cC = [];
                type = 'num';
            }

            if( prevType === 'calc' ) {
                cC.push({
                    type  : type,
                    value : value
                });
            } else if ( prevType === type ) {
                cC[cC.length - 1].value = value;
            } else {
                cC.push({
                    type  : type,
                    value : value
                });
            }

            calculation.setResult(value, type);
        }
    };

    calculator.Clear.prototype = {
        process : function () {
            calculation.reset();
        }
    };

    var calculation = new calculator.Calculation();

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
        calculation.calculate.call(calculation);
    };

}