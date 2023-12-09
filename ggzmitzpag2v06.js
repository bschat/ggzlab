/*
	File:	GGZMitzpag2vXX.js
	
	Doel:
	
	Dit javascript/html programma simuleert het gebruik van MijnMitz door een burger/patient. Dit is het tweede scherm in de simulatie. De gehele "mijnmitz"-simulatie bestaat uit drie schermen: GGZMitzpag1vXX.html,GGZMitzpag2vXX.html en GGZMitzpag3vXX.html.  
	Vanwege de onderhoudbaarheid zijn javascript-code en HTML zoveel mogelijk gescheiden. Daardoor hoort bij ieder html-scherm een javascript-bestand. Dit zijn dus achtereenvolgens  GGZMitzpag1vXX.js,GGZMitzpag2vXX.js en GGZMitzpag3vXX.js

*/
	
/*	
	Function:	$(document).ready(function()
	
	Functionaliteit:
	
	Opzetten van het scherm (direct bij het laden) en controleren van de meegegeven parameters

	Parameters:
	
	searchParams	-	Om de communicatie tussen de drie schermen van de MijnMitz simulatie eenvoudig te houden wordt de searchparameter "patient" gebruikt om het bsn van de burger/patient door te geven. Deze parameter (het zogenaamde BSN) is uniek binnen de GGZLab-omgeving (zoals dit ook uniek is in NL).	

	Relaties met de GUI:
	
	GGZMitzpag2 is een geheel nieuw scherm t.o.v. GGZMitzpag1. GGZMitzpag2 toont alle categorieen dossierhouder en geeft daarbij de mogelijkheid om binnen die categorie specifiek per categorie opvrager een toestemming te verlenen of te onthouden.  In de GUI van GGZMitzpag 2 wordt iedere categorie dossierhouder weergegeven in een eigen "kaart" (omlijnde rechthoek). De "kaarten" worden onder elkaar getoond.
	
*/	
$(document).ready(function(){
	var thisbsn = "";
	let searchParams = new URLSearchParams(window.location.search);
	if (searchParams.has('patient')) {
		let thisbsn = searchParams.get('patient');
		document.getElementById("bsn").value = thisbsn;
	} else {
		alert("bsn niet meegegeven als query-parameter 'patient'!");
	}
	var windowheight = $(window).height();
	var windowwidth = $(window).width();
	var pagecenterW = windowwidth/2;
	var pagecenterH = windowheight/2;
	$("div.center-box")
		.css({top: pagecenterH-250 + 'px', left: pagecenterW-200 + 'px'});
	document.getElementById("appname").innerHTML ="<b>" +appname+"</b>";
	vulkaarten();
});	
/*	
	Function:	vulkaarten()
	
	Functionaliteit:
	
	Net zoals in het echte MijnMitz is er een overzichtsscherm met een "kaart" per categorie dossierhouder. De functie "vulkaarten" vult deze kaarten aan de hand van de toestemmingen die de burger wel of niet gegeven heeft.
	
	Relaties met de GUI:
	
	Dit is de kern van het tweede scherm in MijnMitz.
*/
function vulkaarten(){ //geef de juiste teksten bij de verschillende categorieen dossierhouders
	document.getElementById("card1txt").innerHTML = checktoestemmingen("Huisartsen en huisartsenposten");
	document.getElementById("card2txt").innerHTML = checktoestemmingen("Apotheken");
	document.getElementById("card3txt").innerHTML = checktoestemmingen("Ziekenhuizen, medische centra en klinieken");
	document.getElementById("card4txt").innerHTML = checktoestemmingen("Verpleging en verzorging");
	document.getElementById("card5txt").innerHTML = checktoestemmingen("Laboratoria en diagnostische centra");
	document.getElementById("card6txt").innerHTML = checktoestemmingen("Geestelijke gezondheidszorg (GGZ)");
	document.getElementById("card7txt").innerHTML = checktoestemmingen("Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)");
}
//
/*	
	Function:	checktoestemmingen(thiscatdossierhouder)
	
	Functionaliteit:
	
	Deze functie checkt per dossierhouder welke toestemmingen of expliciete verboden de burger (geidentificeerd door "bsn") heeft gegeven per uitwisselingsmogelijkheid per dossierhouder (thiscatdossierhouder). Voor de overzichtelijkheid wordt van de toestemmingsmogelijkheden (het "toestmog" array) steeds de volledige tekst gebruikt voor dossierhouder-categorie en opvrager-categorie
	
	Gegevensverzamelingen:
	
	autorisatiearray - verzameling van alle in GGZLab bekende autorisaties. Dit zijn dus alle (ingevulde) autorisatiemogelijkheden van alle binnen GGZLab bekende "personen".
*/
function checktoestemmingen(thiscatdossierhouder){
	let regel = "";
	let aantmogtoest 	= 	0; 	//aantal mogelijke toestemmingen bij deze dossierhouder
	let numpos 			=	0;  //aantal positieve toestemmingen van dit bsn bij deze dossierhouder
	let numneg			=	0; 	//aantal negatieve toestemmingen van dit bsn bij deze dossierhouder
	let numsel			=	0;	//aantal (nog) niet bepaalde toestemmingen van dit bsn bij deze dossierhouder
	let thisbsn		 	=	document.getElementById("bsn").value;
	let autorisatiearray	=	localStorage.getItem('autorisatiearray') ?
				JSON.parse(localStorage.getItem('autorisatiearray')) : [];			
	for (let i=0;i<autorisatiearray.length;i++) {//doorloop alle toestemmingen (van alle bsn's)
		if (autorisatiearray[i].bsn == thisbsn) {//we hebben een autorisatie van dit bsn
			for (let j=0;j<toestmog.length;j++){ //doorloop alle mogelijk te geven toestemmingen
				if (autorisatiearray[i].toestemmingsid == toestmog[j].toestemmingsid) {//we weten nu welke toestemmingsmogelijkheid het is
					if (toestmog[j].dossierhouder == thiscatdossierhouder) {
						aantmogtoest = aantmogtoest + 1;
						if (autorisatiearray[i].waarde == "J") {
							numpos = numpos + 1;
						}//if
						if (autorisatiearray[i].waarde == "N") {
							numneg = numneg + 1;
						}//if
						if (autorisatiearray[i].waarde == "S") {
							//Dit is nog niet geïmplementeerd in (de echte) Mitz. Tzt moet het mogelijk worden om ook per zorgaanbieder toestemming te geven/ontzeggen, in plaats van categoraal
						numsel = numsel + 1;
						}//if
					}//if	
				}//if
			}//for
		}//if
	}//for
	if (numpos == aantmogtoest) {//deze dossierhouder mag gegevens aan alle opvragers beschikbaarstellen
		regel = "mogen jouw gegevens beschikbaarstellen";
	} else {
		if (numneg == aantmogtoest) {//deze dossierhouder mag gegevens aan alle opvragers beschikbaarstellen
			regel = "mogen jouw gegevens niet beschikbaarstellen";
		}//if
	}//else
	if (regel == "") {
		regel = "mogen jouw gegevens beschikbaarstellen aan bepaalde zorgverleners";
	}//if	
	return(regel);
}//function
//
/*	
	Function:	wijzigauth(volgnr)
	
	Functionaliteit:
	
	Brugfunctie waarmee de burger, op basis van zijn keuze, veranderingen in zijn toestemmingen/ontzeggingen kan maken in het derde scherm van de MijnMitz-simulatie
*/
function wijzigauth(volgnr) {
	let catdossierhouder = "";
	switch(volgnr) {
		case 1:
			catdossierhouder = "Huisartsen en huisartsenposten";
			break;
		case 2:
			catdossierhouder = "Apotheken";
			break;
		case 3:
			catdossierhouder = "Ziekenhuizen, medische centra en klinieken";
			break;
		case 4:
			catdossierhouder = "Verpleging en verzorging";
			break;
		case 5:
			catdossierhouder = "Laboratoria en diagnostische centra";
			break;
		case 6:
			catdossierhouder = "Geestelijke gezondheidszorg (GGZ)";
			break;
		case 7:
			catdossierhouder = "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)";
			break;
		default:
			alert("Programmeerfout! functie Wijzigauth aangeroepen met verkeerde parameter (niet 1..7)!");
	}
	let thisbsn	=	document.getElementById("bsn").value;
	window.location.href = "ggzmitzpag3v06.html?patient=" + thisbsn +"&cathouder="+catdossierhouder;
}
//
/*	Function:	terug()
	
	Functionaliteit:
	
	Terug naar het eerste scherm van de MijnMitz-simulatie met meenemen van het BSN als search-parameter
*/
function terug(){
	let bsn 	=	document.getElementById("bsn").value;
	let prevpage="ggzmitzpag1v06.html?patient="+bsn;
	location = prevpage;
}