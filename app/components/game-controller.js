app.controller('GameController', function($scope, $timeout) {
    $scope.class = "pointerEvent";
    $scope.startDisable = false;
    var stopped = false;
    $scope.points = 0;
    $scope.timer = 30;
    var diffy = 1000;

    $scope.burrows = [{ id: 1, occupied: false, source: '/assets/img/empty.png' }, { id: 2, occupied: false, source: '/assets/img/empty.png' }, { id: 3, occupied: false, source: '/assets/img/empty.png' }, { id: 4, occupied: false, source: '/assets/img/empty.png' }, { id: 5, occupied: false, source: '/assets/img/empty.png' }, { id: 6, occupied: false, source: '/assets/img/empty.png' }, { id: 7, occupied: false, source: '/assets/img/empty.png' }, { id: 8, occupied: false, source: '/assets/img/empty.png' }, { id: 9, occupied: true, occupant: "Mole", source: '/assets/img/mole.png' }];

    $scope.peekaboo = function(burrow) {

        if (burrow.occupant === "Mole") {
            document.getElementById('strike').play();
            $scope.points += 100;
            $scope.class = "pointerEvent"
        } else {
            document.getElementById('miss').play();
            return;
        }
    }

    // Prevents double clicking mole
    $scope.pointerEvent = function() {
        if ($scope.class === "pointerEvent"){
            $scope.class = "enabled";
        }
    };
            
            

    // Game start
    $scope.start = function() {
        $scope.pointerEvent();
        $scope.startDisable = "pointerEvent"
        stopped = false;
        countDown();
        refresh();
    }
    // Game Reset
    $scope.reset = function() {
        stopped = true;
        $scope.class = "pointerEvent";
        $scope.startDisable = null;
        $scope.victory = false;
        $scope.points = 0;
        var diffy = 1000;
        $scope.timer = 30;
    }
    // Relocate Mole
    function refresh() {
        if ($scope.timer > 0 && stopped === false) {
            $timeout(function() {
                $scope.pointerEvent();
                shuffle();
                refresh();
            }, diffy);
        } else if($scope.timer < 1){
            victory();
        }
    }

    // Sets difficulty
    $scope.difficulty = function(x) {
        if (x == 'Easy') {
            diffy = 1000;
        }
        if (x == 'Extreme') {
            diffy = 475;
        }
        else {
            diffy = 650;
        }
        return diffy;
    }
    // Timer countdown
    function countDown() {
        if ($scope.timer > 0 && stopped === false) {
            $timeout(function() {
                $scope.timer--;
                countDown();
            }, 1000);
        }
    }
    // Fisher-Yates Shuffle
    function shuffle() {
        var m = $scope.burrows.length
        var t;
        var i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = $scope.burrows[m];
            $scope.burrows[m] = $scope.burrows[i];
            $scope.burrows[i] = t;
        }
    };
 
    // Check Victory
    function victory() {
        $scope.victory = true;
        document.getElementById('winner').play();
    };

})

