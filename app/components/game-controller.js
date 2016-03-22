app.controller('GameController', function ($scope, $timeout) {
    $scope.points = 0;
    $scope.timer = 10;

    $scope.burrows = [{ id: 1, occupied: false, source: '/assets/img/empty.png' }, { id: 2, occupied: false, source: '/assets/img/empty.png' }, { id: 3, occupied: false, source: '/assets/img/empty.png' }, { id: 4, occupied: false, source: '/assets/img/empty.png' }, { id: 5, occupied: false , source: '/assets/img/empty.png'}, { id: 6, occupied: false, source: '/assets/img/empty.png' }, { id: 7, occupied: false, source: '/assets/img/empty.png' }, { id: 8, occupied: false, source: '/assets/img/empty.png' }, { id: 9, occupied: true, occupant: "Mole", source: '/assets/img/mole.png' }];

    $scope.peekaboo = function (burrow) {
       
        if (burrow.occupant === "Mole") {
            $scope.points += 100;
        } else {
           return;
        }
    }
    // Relocates Mole
    $scope.refresh = function(){ 
        if($scope.timer > 1){
            $timeout(function () {
                shuffle();
                $scope.refresh();
                $scope.timer--;
            }, 1000); 
        }       
    }
    // Timer Function
    // $scope.countdown = function(){
    //     $timeout(function () {
    //         $scope.timer -= 1;
    //     }, 1000);
    // }
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
        if ($scope.points >= 5) {
            $scope.victory = true;
            document.getElementById('winner').play();
        } else if ($scope.points <= -5) {
            $scope.defeat = true;
        }
    };

})
