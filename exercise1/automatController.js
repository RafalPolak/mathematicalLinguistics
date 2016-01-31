var automat = angular.module('automatApp',[]);

automat.controller('automatCtrl', function($scope){

	//macierz przejść

	$scope.transfer = [[0,0.5,1,1.5,2,2.5,3,3.5,4,-1],[0,1,2,3,4,-1,-1.-1,-1,-1],[0,2,4,-1,-1,-1,-1,-1,-1,-1]];

	//tabela informacji

	$scope.messages = [];

	//stan końcowy
	$scope.endState = 8;

	//obecny stan
	$scope.currentState = 0;

	//cena kawy
	$scope.sumPrice = 0;

	//zmienne na warunek
	$scope.isTooMuch1 = false;
	$scope.isTooMuch2 = false;
	$scope.isTooMuch3 = false;

	//obsługa błędu
	$scope.isError = false;

	//zmienne do obliczeń
	var equation = 0;


	//fun resetowanie stanu
	$scope.reset = function resetMachine() {
	    $scope.messages = [];
	    $scope.currentState = 0;
	    $scope.sumPrice = 0;
	    $scope.isTooMuch1 = false;
		$scope.isTooMuch2 = false;
		$scope.isTooMuch3 = false;
		$scope.isError = false;
	}


	//fun dodaj info o stanie do tabeli

	//fun przyciski
	$scope.dodajDoCeny = function add(coin) {


	    //wcisnelismy 0.5
	    if (coin === 0.5) {
	        //przejdź o jeden bo mamy co jeden stan "0,5"
	        $scope.currentState++;

	       	//wywołanie funkcji czyPrzekracza
	        czyPrzekracza();

	       	//dodanie do tabeli wynikowej(wrzucono)
	    	$scope.messages.push(coin);
	        //ustaw na kwotę jaka mamy po wrzuceniu
	        $scope.sumPrice = $scope.transfer[0][$scope.currentState];
	        console.log("KASA: ",$scope.sumPrice);
	        console.log("Test kasy 0.5: ", $scope.transfer[0][$scope.currentState]);

	    }

	    //wcisnelismy 1
	    if (coin === 1) {
	        //przejdź o dwa bo mamy co dwa stany "1"
	        $scope.currentState += 2;
	        //aby wybrać dobrą cenę musimy podzielić przez 2 co da nam resztę i ta reszta będzie odwołaniem do ceny

	        /*
	        	np. mamy stan 0 i wrzucamy 1 to przechodzimy do stanu 2 co odpowiada jedynce, ale żeby otrzymać 1 z tablicy stanów to musimy wiedziec że:
	        		- tablicę numerujemy od 0 
	        		- transfer[1][1] ma wartosc 1 która potrzebujemy ale żeby dostac się do 1 to currentState musimy podzelić przez 2 i reszta to nasz indeks
	        	Analogicznie w przypadku 2 tylko robimy dzielenie przez 4 jak by były monety 3zł to wtedy przez 6 itd. 
	        */

	        //wywołanie funkcji czyPrzekracza
	        czyPrzekracza();

	        //dodanie do tabeli wynikowej(wrzucono)
	    	$scope.messages.push(coin);

			/*
			ustaw na kwotę jak mamy po wrzuceniu plus warunek że jeżeli wyjdzie nam ułamek to wycigamy z pierwszej tabeli
			*/

			equation = $scope.currentState/2;
			//jeżeli to co dzielimy posiada resztę
			if(equation%1!=0){
				$scope.sumPrice = $scope.transfer[0][$scope.currentState];
				console.log("MA RESZTE: ",$scope.transfer[0][$scope.currentState]);				
			}else{
				$scope.sumPrice = $scope.transfer[1][equation];
				console.log("NIE MA RESZTY: ",$scope.sumPrice);
			}

			console.log("KASA: ",$scope.sumPrice);
	        console.log("Test kasy 1: ", $scope.transfer[1][equation]);

	    }

	    //wcisnelismy 2
	    if (coin === 2) {
	        //przejdź o cztery bo mamy co cztery stany "2"
	        $scope.currentState += 4;
	        czyPrzekracza();
	    	$scope.messages.push(coin);
	    	
	    	equation = $scope.currentState/4;

	    	if(equation%1!=0){
				$scope.sumPrice = $scope.transfer[0][$scope.currentState];				
			}else{
				$scope.sumPrice = $scope.transfer[2][equation];

			}

	       	console.log("KASA: ",$scope.sumPrice);
	        console.log("Test kasy 2: ", $scope.transfer[2][equation]);
	    }

	}

		//fun warunek na nie przekroczenie kwoty
	var czyPrzekracza = function tooMuch() {

	     //sprawdzenie czy to już stan końcowy i wtedy zablokowanie dodawania dla przycisków
	        if($scope.currentState>=$scope.endState){
	        	$scope.isTooMuch1 = true;
	        	$scope.isTooMuch2 = true;
	        	$scope.isTooMuch3 = true;
	        }

	        if($scope.currentState>$scope.endState){
	        	$scope.isError = true;
	        }
	}

});