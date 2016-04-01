var wyrazenie = angular.module('expressionApp',[]);

wyrazenie.controller('expressionCtrl', function($scope){

	//Definiowanie wyrażenia do wprowadzania
	$scope.data = {gramatyka:"",wyrazenie:"",zdanie:"",wynik:"",wyjsciowaGramatyka:""};

	$scope.dataPierwsze = {pierwsze:""};
	//Tablica na dane historyczne
	$scope.historia = [];

	//dane pomocniczne
	$scope.czyWyrazenie = false;
	$scope.czyPierwsze = false;
	$scope.czyNastepne = false;
	$scope.czyRegula1 = false;
	$scope.czyRegula2 = false;

	//tablica na testy
	var test = [];
	var temp = [];
	var gramatykaNastepne = [];
	var gramatykaNastepneWynikowa = [];
	var temp2 = [];
	var tempIRegula = [];

	//fun sprawdzenie czy pasuje do wyrażenia 
	$scope.sprawdzCzyNalezy = function (wyrazenie,zdanie) {

		//przypisanie wyrazenia regularnego
	    var regex = new RegExp($scope.data.wyjsciowaGramatyka);
	    //przypisanie zdania
	    var zdanie = $scope.data.zdanie;


	    //sprawdzenie czy dane zdanie pasuje do wyrazenia
	    if(zdanie.match(regex)){
	    	$scope.data.wynik = "yes";
	    }else{
	    	$scope.data.wynik = "no";
	    }

	    //utworzenie zmiennej do tablicy historii
	    var test = {
	    	wyrazenie: $scope.data.wyjsciowaGramatyka,
	    	zdanie: $scope.data.zdanie,
	    	wynik: $scope.data.wynik,
	    	gramatyka: $scope.data.gramatyka
	    };

	    test.wyrazenie = test.wyrazenie.replace(/ /g,"");

	    //test wyjscia
	    console.log($scope.data.wyrazenie);
	    console.log($scope.data.zdanie);
	    console.log($scope.data.wynik);
	    console.log($scope.data.gramatyka);

	    //dodanie do tablicy wynikow/historii
	    $scope.historia.push(test);

	    return $scope.status;
	}

	//fun do tworzenia wyrazenia na bazie gramtyki
	$scope.utworzWyrazenie = function(){

		$scope.czyWyrazenie = true;

		var testGramatyka = $scope.data.gramatyka;
		//wyrazenie regularne do wycinania nowej lini
		var tablicaGramatyki = testGramatyka.split(/\r\n|\r|\n/g);
		//pobranie pierwszego wiersza jako gramatyki która będziemy rozpatrywać
		var wyjsciowaGramatyka = tablicaGramatyki[0];


		for(i=0;i<tablicaGramatyki.length;i++){

			console.log("Test: "+i);
			//pierwsza litera
			var litera = tablicaGramatyki[i][0];

			console.log(litera);
			//wyciac znaki od 4
			var gramatykaLitera = tablicaGramatyki[i].substring(4, tablicaGramatyki[i].length);

				//warunek na klamry

					var regexp1 = new RegExp(/([A-Z]+|\[)/gm);
					//jesli duze litery to idz dalej

					//jezeli cos innego to opakować to w okragle i alternatywe zamienic na spacje
					if(gramatykaLitera.search(regexp1)){
						gramatykaLitera = "("+gramatykaLitera+")";
					}
					
				
					if(gramatykaLitera.search(/\(\[\)/g)){
					gramatykaLitera = gramatykaLitera.replace(/\[/g,"<");}
					if(gramatykaLitera.search(/\(\]\)/g)){
					gramatykaLitera = gramatykaLitera.replace(/\]/g,">");}
					//console.log(gramatykaLitera);
					if(gramatykaLitera.search(/\(\(\)/g)){
					gramatykaLitera = gramatykaLitera.replace(/\(/g,"[");}
					if(gramatykaLitera.search(/\(\(\)/g)){
					gramatykaLitera = gramatykaLitera.replace(/\)/g,"]");}//console.log(gramatykaLitera);
					if(gramatykaLitera.search(/\(\{\)/g)){
					gramatykaLitera = gramatykaLitera.replace(/\{/g,"(");}
					if(gramatykaLitera.search(/\(\[\)/g)){
					gramatykaLitera = gramatykaLitera.replace(/\}/g,")?");}
					if(gramatykaLitera.search(/\(\<\)/g)){
					gramatykaLitera = gramatykaLitera.replace(/\</g,"(");}
					if(gramatykaLitera.search(/\(\>\)/g)){
					gramatykaLitera = gramatykaLitera.replace(/\>/g,")?");}
					if(gramatykaLitera.search(/\(\[\|]\)/g)){ 
					gramatykaLitera = gramatykaLitera.replace(/\|/g," ");}

								
					console.log(gramatykaLitera);
			//replace z wyjsciowejGramatyki podstawić za 1 litere to co z 4 pierwszych znaków 
			//skorzystanie z regexp'a
			var regexp2 = new RegExp(litera,"g");

			wyjsciowaGramatyka = wyjsciowaGramatyka.replace(regexp2,gramatykaLitera);
			console.log(wyjsciowaGramatyka);
		};
		console.log(wyjsciowaGramatyka.indexOf("::="));
		console.log("Wyciecie");
		wyjsciowaGramatyka = wyjsciowaGramatyka.substring(0, wyjsciowaGramatyka.indexOf("::="));
		console.log("Po wycieciu")
		console.log(wyjsciowaGramatyka);
		$scope.data.wyjsciowaGramatyka = wyjsciowaGramatyka;

	}

	$scope.utworzPierwsze = function(){
		$scope.czyPierwsze = true;

		console.log($scope.data.gramatyka);

		var gramatykaLitera;
		var testGramatyka = $scope.data.gramatyka;
		//wyrazenie regularne do wycinania nowej lini
		var tablicaGramatyki = testGramatyka.split(/\r\n|\r|\n/g);


		console.log("tablicaGramatyki",tablicaGramatyki);
		for(i=0;i<tablicaGramatyki.length;i++){

			//tablica wyjsciowa
			console.log(temp);

			//pierwsza litera
			var litera = tablicaGramatyki[i][0];
			//zmienna flaga czy mamy alternatywe
			var czyAlternatywa = false;
			//zmienna na wyrazenie pierwszych z suma alternatyw
			var tempWyrazenieAlternatywa = "";


			//wyciac znaki od 4
			gramatykaLitera = tablicaGramatyki[i].substring(4, tablicaGramatyki[i].length);


			/*wypelnienie tablicy tymczasowej
				Mamy główna tablice temp na której operujemy 
			*/
			temp.push({litera: litera, wyrazenie: gramatykaLitera, czyZawieraTerminal: false});

			//pobieramy pierwszy znak
			tempWyrazenieAlternatywa+=gramatykaLitera[0];

			console.log("Pobranie pierwszego znaku",tempWyrazenieAlternatywa);
				/*przegladamy nastepne znaki i wycinamy alternatywy oraz bierzemy pierwsze znaki za alternatywa i łaczymy ze soba
				np 1|2|3 to po tej petli bedziemy mieli 1u2u3
					*/
					for(j=1;j<gramatykaLitera.length;j++){
						console.log("Rozpatrywany znak: "+gramatykaLitera[j]);
						if(gramatykaLitera[j].match(/[|]/g)){
							console.log("Nastepny znak za alternatywa: ",gramatykaLitera[j+1]);

							tempWyrazenieAlternatywa += "u" + gramatykaLitera[j+1];

							console.log("Wyrazenie temp: ",tempWyrazenieAlternatywa);
						}
						console.log("Dlugosc wyrazenia tymczasowego: "+tempWyrazenieAlternatywa.length);
						console.log("Wyrazenie tymczasowe: "+tempWyrazenieAlternatywa);
					}

					
					/* tutaj mamy zamiane dla danej litery na to wyrazenie wyzej utworzone bez alternatyw 
						poniewaz przegladalismy każdy znak pojdynczo i laczylismy to teraz musimy to przypisac,
						aby zamiana nie poszla na marne
						czyli mielismy np W::=1|2|3 to petla nizej zrobi nam
						W::=1u2u3
						*/
					console.log("Podmiana zamienionego wyrazenia: ");
					for(k=0;k<temp.length;k++){
						if(temp[k].litera===litera&&temp[k].wyrazenie!=tempWyrazenieAlternatywa){
							temp[k].wyrazenie = tempWyrazenieAlternatywa;
						}
					}

		}


		//Wypisanie po zmianach alternatyw
		console.log("TEST PIERWSZYCH");
		for(a=0;a<temp.length;a++){
			console.log(temp[a]);
		}

		/*dodanie dodatkowej zmiennej do obiektów która będzie oznaczać 
		czy dane wyrażenie zawiera zawiera jakieś duże znaki które będziemy zamieniać w kolejnych krokach*/
		console.log("Dalsze wyznaczanie juz z wycietymi alternatywami");
		console.log("Pierwsza pentla sprawdzenie czy mamy gdzies same Terminalne");
		for(b=0;b<temp.length;b++){
			if(temp[b].wyrazenie.match(/[A-Z]/g)){
				temp[b].czyZawieraTerminal = true;
			}
		}

		//Wypisanie po dodaniu nowych zmiennych
		console.log("TEST PIERWSZYCH Z SPRAWDZONYMI TERMINALNYMI");
		for(a=0;a<temp.length;a++){
			console.log(temp[a]);
		}


		/*zajmujemy sie zamiana pozostalych znakow czyli tych bez alternatyw
		  poczawszy od dolu bierzemy poszczegolne litery i porownujemy z gora
		  jesli gdzies wystapi dany znak to go zamieniamy itp. czyli
				
				S:= D 	| czyZawieraTerminal = true
				D:= C 	| czyZawieraTerminal = true
				C:= O 	| czyZawieraTerminal = true
				O:= 1u2u3 | czyZawieraTerminal = false

				bierzemy O i lecimy od góry druga pentla i porównujemy litere O z wyrazeniem 
				czyli od gory to bedzie D jak dojdzie do C to warunek bedzie spelniony i zamieniamy
				wtedy bedzie

				S:= D 	| czyZawieraTerminal = true
				D:= C 	| czyZawieraTerminal = true
				C:= 1u2u3 | czyZawieraTerminal = false
				O:= 1u2u3 | czyZawieraTerminal = false

				tak to w skrócie wyglada
		  */

		//bierzemy od dolu po jednym i sprawdzamy z reszta i podmieniamy tam gdzie znalezlismy
		for(a=temp.length-1;a>0;a--){
			console.log("Rozpatrujemy litere: ",temp[a].litera);
			var test = "";
			//jezeli ostatni jest jako nonTerminal to przeleć wszystkie od góry i pozamieniaj
			if(temp[a].czyZawieraTerminal === false){
				console.log("mamy nonTerminalny!");
				for(b=0;b<temp.length;b++){
					console.log("Rozpatrujemy z litera: ",temp[b].litera);
					console.log("wbijam do pentli od gory, sprawdzam i zamieniam");
					test = temp[b].wyrazenie.replace(temp[a].litera,temp[a].wyrazenie);
					console.log("Po zamianie: ",temp[b].wyrazenie);
					temp[b].wyrazenie = test;
						console.log("Sprawdzam teraz czy zawiera jeszcze jakieś Terminalne znaki");
						//sprawdzenie czy teraz sa tam same nonTerminalne i ustawienie flagi(czyZawieraTerminal na false)
						var czyTerminalne = false;
						for(c=0;c<temp[b].wyrazenie;c++){
							if(temp[b].wyrazenie[c].match(/[A-Z]/g)){
								czyTerminalne = true;
							}
						}
						//jezeli po zmianie nie ma terminalnych to ustawiamy flage(czyZawieraTerminal)\
						if(czyTerminalne===false){
							temp[b].czyZawieraTerminal = false;
						}
					}
				}
			
		}

		//Wysietlenie po ostatnich zmianach
		console.log("TEST PIERWSZYCH PO ZMIANACH");
		for(a=0;a<temp.length;a++){
			console.log(temp[a]);
		}

		//przypisanie tego do modelu czyli textarea na UI'u aby to wyświetlić dla końcowego użytkownika
		$scope.pierwsze = "";
		
		for(a=0;a<temp.length;a++){
			$scope.pierwsze+=temp[a].litera+"::="+temp[a].wyrazenie+"\n";
		}

	}

	$scope.utworzNastepne = function(){

		//przygotowanie zmiennych do pracy
		$scope.czyNastepne = true;

		console.log($scope.data.gramatyka);

		var gramatykaLitera;
		var testGramatyka = $scope.data.gramatyka;
		//wyrazenie regularne do wycinania nowej lini
		var tablicaGramatyki = testGramatyka.split(/\r\n|\r|\n/g);


		console.log("tablicaGramatyki",tablicaGramatyki);
		for(i=0;i<tablicaGramatyki.length;i++){

			//tablica wyjsciowa
			console.log(temp2);

			//pierwsza litera
			var litera = tablicaGramatyki[i][0];
			//zmienna flaga czy mamy alternatywe
			var czyAlternatywa = false;
			//zmienna na wyrazenie pierwszych z suma alternatyw
			var tempWyrazenieAlternatywa = "";


			//wyciac znaki od 4
			gramatykaLitera = tablicaGramatyki[i].substring(4, tablicaGramatyki[i].length);


			/*wypelnienie tablicy tymczasowej
				Mamy główna tablice temp2 na której operujemy oraz gramatykaNastepne która zawiera gramatyke
				jako obiekty aby latwo operowac na nich

			*/
			temp2.push({litera: litera, wyrazenie: gramatykaLitera, czyZawieraTerminal: false});
			gramatykaNastepne.push({litera: litera, wyrazenie: gramatykaLitera, czyZawieraTerminal: false});
			gramatykaNastepneWynikowa.push({litera: litera, wyrazenie: "", czyZawieraTerminal: false});
		}


		/*pobieramy pierwsza litere z gramatyki i lecimy po wyrazeniach
				jezeli znajdziemy litere w wyrazeniu to do temp2 wstawiamy w danym wyrazeniu to co odczytamy z gramatykaNastepne
			 	- jezeli za ta litera jest | lub nic (length = indeksowi czyli koniec) to wstawiamy ta pierwsza litere z poczatku czyli nastepne
			 	- jezeli za ta litera jest nonTerminal to bierzemy pierwszy znak 
				- jezeli za ta litera jest duza litera to wstawiamy z temp1 to co jest przypisane do tej litery
				potem wyglada to tak jak przy pierwszych czyli jedziemy od dolu i sprawdzamy pozostale 
			*/

			for(a=0;a<gramatykaNastepne.length;a++){

				var litera = gramatykaNastepne[a].litera;
				console.log("Litera",litera);
				for(b=0;b<temp2.length;b++){
						for(c=0;c<temp2[b].wyrazenie.length;c++){
							//console.log("litera",temp2[b].wyrazenie[c]);
							//stworzenie rege'xpa do sprawdzenia czy dana litera znajduje sie w wyrazeniu
							var regex = new RegExp(litera);
							if(temp2[b].wyrazenie[c].match(regex)){

								// console.log("Mam dopasowanie: ",litera);
								// console.log("Do: ",temp2[b].wyrazenie[c]);
								// console.log("Nastepny znak",temp2[b].wyrazenie[c+1]);
								//po znalezieniu litery sprawdzamy co jest za nia poniżej 3 warunki o ktorych pisalem wyzej

								//zabezpieczenie na wyjście poza zakres

								if(temp2[b].wyrazenie.length>c+1){
									console.log("Tu wbijam");
								//mamy terminal jako nastepny
									if(temp2[b].wyrazenie[c+1].match(/[A-Z]/g)){
										console.log("mamy terminal: ",temp2[b].wyrazenie[c+1]);
											var znakTerminal = temp2[b].wyrazenie[c+1];

											//wykorzystanie biblioteki lodash do przeszukiwania z tablicy pierwszych
											var wyrazenieZPierwszych = 
															_.find(temp, function(obj) {
  															      return obj.litera === znakTerminal;
																	})

										//	experimental zwrocenie pierwszych na podstawie litery
										console.log("TESTA: ",wyrazenieZPierwszych.wyrazenie);

											//ustawienie first'a z terminala z tablicy temp ktora zawiera pierwsze
											if(gramatykaNastepneWynikowa[a].wyrazenie.length==0){
												gramatykaNastepneWynikowa[a].wyrazenie+=wyrazenieZPierwszych.wyrazenie;
											}else{
												gramatykaNastepneWynikowa[a].wyrazenie+="u"+wyrazenieZPierwszych.wyrazenie;
											}											


										console.log("litera: ",gramatykaNastepne[a].litera);
										console.log("litera z pierwszych: ",temp[a].litera);
										console.log("wyrazenie z pierwszych: ",temp[a].wyrazenie);

										console.log("Po zamianie: ");

											for(z=0;z<gramatykaNastepneWynikowa.length;z++){
												console.log(gramatykaNastepneWynikowa[z]);
												}

										//warunek jeśli nie ma terminala, ale też nie jest na końcu i mamy alternatywe
									}else if(temp2[b].wyrazenie[c+1].match(/[|]/g)){
										console.log("mamy alternatywe");

										//lecimy po tablicy wynikowej i wstawiamy follow(litera) jako duza litere
										if(gramatykaNastepneWynikowa[a].wyrazenie.length==0){
											gramatykaNastepneWynikowa[a].wyrazenie+=litera;
										}else{
											gramatykaNastepneWynikowa[a].wyrazenie+="u"+litera;
										}
										//a tutaj znaki non terminalne
									}else{
											//jak nie ma terminala i nie ma alternatywy
											if(gramatykaNastepneWynikowa[a].wyrazenie.length==0){
												gramatykaNastepneWynikowa[a].wyrazenie+=temp2[b].wyrazenie[c+1];
											}else{
												gramatykaNastepneWynikowa[a].wyrazenie+="u"+temp2[b].wyrazenie[c+1];
											}											
										}
								}

								//warunek kiedy mamy duża litere i nic za nia nie ma
								if(temp2[b].wyrazenie.length==c+1||temp2[b].wyrazenie[c+1].match(/[|]/g)){
									console.log("mamy alternatywe lub nic za litera nie ma");

										//lecimy po tablicy wynikowej i wstawiamy follow(litera) jako duza litere
										if(gramatykaNastepneWynikowa[a].wyrazenie.length==0){
											gramatykaNastepneWynikowa[a].wyrazenie+=litera;
										}else{
											gramatykaNastepneWynikowa[a].wyrazenie+="u"+litera;
										}
								}
							}
						}
					}
				}


		console.log("Pierwsze",temp);
		console.log("GramatykaNastepne",temp2);
		console.log("Nastepne",gramatykaNastepneWynikowa);

		//przypisanie tego do modelu czyli textarea na UI'u aby to wyświetlić dla końcowego użytkownika
		$scope.nastepne = "";
		
		for(a=0;a<gramatykaNastepneWynikowa.length;a++){
			if(gramatykaNastepneWynikowa[a].wyrazenie==""){
				$scope.nastepne+=gramatykaNastepneWynikowa[a].litera+"::="+String.fromCharCode(8709)+"\n";
			}else{
				$scope.nastepne+=gramatykaNastepneWynikowa[a].litera+"::="+gramatykaNastepneWynikowa[a].wyrazenie+"\n";
			}
		}

	}


	//wyzanaczanie regul

	//regula I
	$scope.sprawdzIRegule = function(){

		$scope.czyRegula1 = true;

		var testGramatyka = $scope.data.gramatyka;
		//wyrazenie regularne do wycinania nowej lini
		var tablicaGramatyki = testGramatyka.split(/\r\n|\r|\n/g);
		//pobranie pierwszego wiersza jako gramatyki która będziemy rozpatrywać
		var wyjsciowaGramatyka = tablicaGramatyki[0];

		console.log("Sprawdzam I regułę");

		for(i=0;i<tablicaGramatyki.length;i++){

			//tablica wyjsciowa
			console.log(temp);

			//pierwsza litera
			var litera = tablicaGramatyki[i][0];
			//zmienna flaga czy któres wyrazenie ma do poprawy regule
			var czyRegulaOK = true;


			//wyciac znaki od 4
			gramatykaLitera = tablicaGramatyki[i].substring(4, tablicaGramatyki[i].length);


			/*wypelnienie tablicy tymczasowej
				Mamy główna tablice tempIRegula na której operujemy 
			*/
			tempIRegula.push({litera: litera, wyrazenie: gramatykaLitera, czyIRegulaSpelniona: true});

			/*przegladamy nastepne znaki i bierzemy pierwsze znaki przed alternatywa i za alternatywa sprawdzamy iloczyn
					jesli wszystko ok to nie zmieniamy flagi, a jesli wystapi czesc wspolna to flage czyRegulaOK zmieniamy na false
				*/
				for(j=0;j<gramatykaLitera.length;j++){
						console.log("Rozpatrywany znak: "+gramatykaLitera[j]);
						if(gramatykaLitera[j].match(/[|]/g)){
							//znak przed alternatywa
							var znak = gramatykaLitera[j-1];
							console.log("Nastepny znak za alternatywa: ",gramatykaLitera[j+1]);
								//pentla porownanie z nastepnymi znakami
									for(k=j+1;k<gramatykaLitera.length;k++){
										if(znak==gramatykaLitera[k]){
											console.log("Mam dopasowanie, regula nie spelniona");
											czyRegulaOK = false;
										} 
										//jezeli porównujemy z terminalem to pobierz z pierwszych
										else if(gramatykaLitera[k].match(/[A-Z]/g)){
													//porównaj z wszystkimi znakami z pierwszej
														console.log("MAMY TERMINAL")
														//wykorzystanie biblioteki lodash do przeszukiwania z tablicy pierwszych
														var wyrazenieZPierwszych = 
																		_.find(temp, function(obj) {
  															      				return obj.litera === gramatykaLitera[k];
																				});
														console.log(wyrazenieZPierwszych);

														for(l=0;l<wyrazenieZPierwszych.wyrazenie.length;l++){
															console.log("litery z pierwszych",wyrazenieZPierwszych.wyrazenie[l]);
															//jezeli znak sie pokrywa z ktoryms z pierszych to regula niespelniona
															if(znak == wyrazenieZPierwszych.wyrazenie[l]){
																czyRegulaOK = false;
															}
														}
										}
									}
							console.log("Stan czy spelniona regula dla litery: "+litera);
							console.log(czyRegulaOK);
						}
					}

					
					/* tutaj mamy ustawienie czy dana regula jest spelniona
						*/
					console.log("Ustawienie czy regula spelniona: ");
					for(k=0;k<tempIRegula.length;k++){
						if(tempIRegula[k].litera===litera){
							tempIRegula[k].czyIRegulaSpelniona = czyRegulaOK;
						}
					}

		}

	// wyswietlenie tablicy z I regulą
	for(a=0;a<tempIRegula.length;a++){
		console.log(tempIRegula[a]);
		}


	//przypisanie tego do modelu czyli textarea na UI'u aby to wyświetlić dla końcowego użytkownika
		$scope.regulaA = "";
		
		for(a=0;a<tempIRegula.length;a++){
			if(tempIRegula[a].czyIRegulaSpelniona==true){
				$scope.regulaA+=tempIRegula[a].litera+"  == OK\n";
			}else{
				$scope.regulaA+=tempIRegula[a].litera+"  != OK\n";
			}
		}




	}

	//regula II
	$scope.sprawdzIIRegule = function(){

		$scope.czyRegula2 = true;

		//przypisanie tego do modelu czyli textarea na UI'U aby to wyświetlić dla końcowego użytkownika
		$scope.regulaB = "";

		for(a=0;a<gramatykaNastepneWynikowa.length;a++){
			//porównujemy znaki ale co drugi bo mamy "u" żeby unikąć nie
			console.log("Pierwsze: ",temp[a])
			console.log("Nastepne: ",gramatykaNastepneWynikowa[a]);
			console.log("Różnica dla: ",temp[a].litera);

			//wciagamy cześć wspólną z pierwszych i nastepnych
			var test = _.intersection(temp[a].wyrazenie.split(""),gramatykaNastepneWynikowa[a].wyrazenie.split(""));

			//jeżeli część wspólna wynosi 0 lub 1 to znaczy że tylko "u" więc reguła spełniona
			//jeżeli część wspólna wynosi więcej niż 1 to znaczy że musimy poprawić regułę 

			if(test.length>1){
				$scope.regulaB+=temp[a].litera+" != OK\n";
			}else{
				$scope.regulaB+=temp[a].litera+" == OK\n";
			}


			console.log("test: ",test);
			console.log("rozmiar: ",test.length);
		}

	}

	//fun do resetowania pol wejsciowych
	$scope.resetPol = function(){
		$scope.data.wyrazenie = "";
		$scope.data.wyjsciowaGramatyka = "";
		$scope.data.zdanie = "";
		$scope.data.wynik = "";
		$scope.czyWyrazenie = false;
		$scope.czyPierwsze = false;
		$scope.czyNastepne = false;
		$scope.czyRegula1 = false;
		$scope.czyRegula2 = false;
		$scope.pierwsze = "";
		test = [];
		temp = [];
		temp2 = [];
		tempIRegula = [];
		gramatykaNastepne = [];
		gramatykaNastepneWynikowa = [];
	}




});