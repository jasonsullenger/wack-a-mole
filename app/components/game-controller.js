app.controller('GameController', function ($scope, $timeout) {
    $scope.points = 0;

    $scope.burrows = [{ id: 1, occupied: false }, { id: 2, occupied: false }, { id: 3, occupied: true, occupant: "Mole", source: '/assets/img/Monty_Mole.png' }, { id: 4, occupied: true, occupant: "Mole", source: '/assets/img/Monty_Mole.png' }, { id: 5, occupied: true, occupant: "Charlie Sheen", source: '/assets/img/charlie.png' }, { id: 6, occupied: true, occupant: "Badger", source: '/assets/img/HONEY_BADGER.png' }];

    $scope.peekaboo = function (burrow) {
        if (!burrow.occupied) {
            return
        }
        burrow.show = true;
        if (burrow.occupant === "Mole") {
            $scope.points += 5;
        } else if (burrow.occupant === "Badger") {
            $scope.points--;
        } else {
            $scope.points -= 5;
        }

        victory();

        $timeout(function () {
            burrow.show = false;
            shuffle();
        }, 1000);



    }

    function shuffle() {

        var m = $scope.burrows.length
        var t;
        var i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = $scope.burrows[m];
            $scope.burrows[m] = $scope.burrows[i];
            $scope.burrows[i] = t;
        }

    };

    function victory() {
        if ($scope.points >= 5) {
            $scope.victory = true;
            document.getElementById('winner').play();
        } else if ($scope.points <= -5) {
            $scope.defeat = true;
        }
    };

})
