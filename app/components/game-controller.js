app.controller('GameController', function ($scope, $timeout) {
    $scope.class = "pointerEvent";
    $scope.points = 0;
    $scope.timer = 30;
    var diffy = 1000;

    $scope.burrows = [{ id: 1, occupied: false, source: '/assets/img/empty.png' }, { id: 2, occupied: false, source: '/assets/img/empty.png' }, { id: 3, occupied: false, source: '/assets/img/empty.png' }, { id: 4, occupied: false, source: '/assets/img/empty.png' }, { id: 5, occupied: false , source: '/assets/img/empty.png'}, { id: 6, occupied: false, source: '/assets/img/empty.png' }, { id: 7, occupied: false, source: '/assets/img/empty.png' }, { id: 8, occupied: false, source: '/assets/img/empty.png' }, { id: 9, occupied: true, occupant: "Mole", source: '/assets/img/mole.png' }];

    $scope.peekaboo = function (burrow) {
       
        if (burrow.occupant === "Mole") {
            $scope.points += 100;
            $scope.class = "pointerEvent"
        } else {
           return;
        }
    }
    

  $scope.pointerEvent = function(){
    if ($scope.class === "pointerEvent")
      $scope.class = "enabled";
    else
      $scope.class = "enabled";
  };
    // Relocates Mole
    $scope.refresh = function(){
        $scope.pointerEvent();
        if($scope.timer > 0){
            $timeout(function () {
                shuffle();
                $scope.timer--;
                $scope.refresh();
            }, diffy); 
        }else{
            victory();
        }
    }
    // Sets difficulty
    $scope.difficulty = function(x){
        if(x == 'Easy'){
            diffy = 1000;
        }
        if(x == 'Extreme'){
            diffy = 600;
        }
        else{
            diffy = 800;
        }
        return diffy;
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
        
        // if ($scope.points >= 5) {
        //     document.getElementById('winner').play();
        // } else if ($scope.points <= -5) {
        //     $scope.defeat = true;
        // }
    };

})
