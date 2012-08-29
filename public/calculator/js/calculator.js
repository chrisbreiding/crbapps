function CalcCtrl ($scope) {

    var op = {
        '+' : function (a, b) { return a + b; },
        '-' : function (a, b) { return a - b; },
        '*' : function (a, b) { return a * b; },
        '/' : function (a, b) { return a / b; }
    };

    var prevType = null;

    var Button = function (value, type) {
        this.value = value;
        this.type = type;
    };

    $scope.result = '0';
    $scope.currentCalculation = [];
    $scope.buttons = [
        new Button('7', 'num'),
        new Button('8', 'num'),
        new Button('9', 'num'),
        new Button('+', 'op' ),
        new Button('4', 'num'),
        new Button('5', 'num'),
        new Button('6', 'num'),
        new Button('-', 'op' ),
        new Button('1', 'num'),
        new Button('2', 'num'),
        new Button('3', 'num'),
        new Button('/', 'op' ),
        new Button('0', 'num'),
        new Button('.', 'num'),
        new Button('C', 'op' ),
        new Button('*', 'op' )
    ];

    $scope.buttonClick = function (button) {
        var lastInput,
            cC = $scope.currentCalculation,
            type = button.type,
            value = button.value;

        if( value === 'C' ) {
            $scope.result = '0';
            $scope.currentCalculation = [];
            prevType = null;
            return;
        }

        if( !cC.length ) {
            if( value === '-' ) {
                type = 'num';
            }
            if( type === 'op' ) {
                return;
            }
        }

        if( value === '.' && /\./.test(cC[cC.length - 1].value) ) {
            if( prevType !== 'calculation') return;
        }

        if( cC.length === 1 && cC[0].value === '-' && type === 'op' ) {
            cC = [];
            prevType = 'num';
            return;
        }

        if( prevType === 'calc' ) {
            if( type === 'num' ) {
                cC[0].value = value;
            } else {
                cC.push({
                    type  : type,
                    value : value
                });
            }
        } else if( prevType === type ) {
            lastInput = cC[cC.length - 1];
            lastInput.value = type === 'num' ? lastInput.value + value : value;
        } else {
            cC.push({
                type  : type,
                value : value
            });
        }

        $scope.result = cC[cC.length - 1].value;
        prevType = type;
    };

    $scope.calculate = function () {
        var cC = $scope.currentCalculation,
            num1, operator, num2;
        while( cC.length > 1 ) {
            num1 = parseFloat(cC[0].value);
            operator = cC[1].value;
            num2 = parseFloat(cC[2].value);
            cC[2].value = op[operator](num1, num2);
            cC.shift();
            cC.shift();
        }
        prevType = 'calc';
        $scope.result = cC[0].value;
    };
}