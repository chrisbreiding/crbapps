function CalcCtrl ($scope) {

    var op = {
        '+' : function (a, b) { return a + b; },
        '-' : function (a, b) { return a - b; },
        '*' : function (a, b) { return a * b; },
        '/' : function (a, b) { return a / b; }
    };

    var prevType = null;

    $scope.result = '0';
    $scope.currentCalculation = [];
    $scope.buttons = [
        { value: '7', type: 'number' },
        { value: '8', type: 'number' },
        { value: '9', type: 'number' },
        { value: '+', type: 'operator' },
        { value: '4', type: 'number' },
        { value: '5', type: 'number' },
        { value: '6', type: 'number' },
        { value: '-', type: 'operator' },
        { value: '1', type: 'number' },
        { value: '2', type: 'number' },
        { value: '3', type: 'number' },
        { value: '/', type: 'operator' },
        { value: '0', type: 'number' },
        { value: '.', type: 'number' },
        { value: 'C', type: 'operator' },
        { value: '*', type: 'operator' }
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
                type = 'number';
            }
            if( type === 'operator' ) {
                return;
            }
        }

        if( value === '.' && /\./.test(cC[cC.length - 1].value) ) {
            if( prevType !== 'calculation') return;
        }

        if( cC.length === 1 && cC[0].value === '-' && type === 'operator' ) {
            cC = [];
            prevType = 'number';
            return;
        }

        if( prevType === 'calculation' ) {
            if( type === 'number' ) {
                cC[0].value = value;
            } else {
                cC.push({
                    type  : type,
                    value : value
                });
            }
        } else if( prevType === type ) {
            lastInput = cC[cC.length - 1];
            lastInput.value = type === 'number' ? lastInput.value + value : value;
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
        prevType = 'calculation';
        $scope.result = cC[0].value;
    };
}