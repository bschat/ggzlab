/*
	File:	GGZMitzpag1vXX.js
	
	Doel: 	 
	
	Dit javascript/html programma simuleert het gebruik van MijnMitz door een burger/patient. De gehele "mijnmitz"-simulatie bestaat uit drie schermen: GGZMitzpag1vXX.html,GGZMitzpag2vXX.html en GGZMitzpag3vXX.html.  
	Vanwege de onderhoudbaarheid zijn javascript-code en HTML zoveel mogelijk gescheiden. Daardoor hoort bij ieder html-scherm een javascript-bestand. Dit zijn dus achtereenvolgens  GGZMitzpag1vXX.js,GGZMitzpag2vXX.js en GGZMitzpag3vXX.js

*/
/*	
	Function:	$(document).ready(function()
	
	Functionaliteit:
	
	Opzetten van het scherm (direct bij het laden) en controleren van de meegegeven parameters
	
	Parameters:
	
	searchParams	-	Om de communicatie tussen de drie schermen van de MijnMitz simulatie eenvoudig te houden wordt de searchparameter "patient" gebruikt om het bsn van de burger/patient door te geven. Deze parameter (het zogenaamde BSN) is uniek binnen de GGZLab-omgeving (zoals dit ook uniek is in NL).	
	
	Relaties met de GUI:
	
	<div> startscherm - "startscherm" is een popup-scherm met eerste (grove) keuzemogelijkheid
	
*/	
$(document).ready(function(){
	toonheader();
	clearscreen();
	//
	var windowheight = $(window).height();
	var windowwidth = $(window).width();
	var pagecenterW = windowwidth/2;
	var pagecenterH = windowheight/2;
	$("div.center-box")
		.css({top: pagecenterH-250 + 'px', left: pagecenterW-200 + 'px', display:'none'});
	//	
	var thisbsn = "";
	let searchParams = new URLSearchParams(window.location.search);
	if (searchParams.has('patient')) {
		let thisbsn = searchParams.get('patient');
		document.getElementById("bsn").value = thisbsn;
		checkbsn();
	} else {
		$("#startscherm").hide("");
	}	
});
//
/*	
	Function:	clearscreen()
	
	Functionaliteit: 	
	
	Maak scherm klaar voor nieuw/volgend bsn
	
	Relaties met de GUI:
	
	alle velden en images van dit scherm worden leeggemaakt/naar default teruggezet
*/
function clearscreen(){
	document.getElementById("bsn").value = "";
	document.getElementById("titel").innerHTML = "";
	document.getElementById("regel1").innerHTML = "";
	document.getElementById("regel2").innerHTML = "";
	document.getElementById("regel3").innerHTML = "";
	document.getElementById("aanbiederlink").innerHTML = "";
	document.getElementById("faqlink").innerHTML = "";
	$("#plaat1").hide("");
	$("#pasaan").hide("");
	$("#bekijk").hide("");
}
//
/*	
	Function:	toonstartscherm()
	
	Functionaliteit: 
	
	het startscherm zichtbaar maken
	
	Relaties met de GUI:
	
	de <div> startscherm wordt zichtbaar gemaakt
*/
function toonstartscherm(){
	$("#startscherm").show("");
}
//
/*	Function:	gostep2()
	
	Functionaliteit: 
	
	Ga naar het tweede scherm van de MijnMitz-simulatie (ggzmitzpag2vXX.html)
*/
function gostep2(){
	let bsn 	=	document.getElementById("bsn").value;
	let nxtpage="ggzmitzpag2v06.html?patient="+bsn;
	location = nxtpage;
}
//
/*	
	Function:	stelbeschikbaar(thischoice)
	
	Functionaliteit: 
	
	Overschrijf een eerdere (alle uitwisseling omvattende) keuze in MijnMitz
	
	Parameters:
		thischoice	-	"J", "N" of "S" (nog niet geimplementeerd)
*/
function stelbeschikbaar(thischoice){
	if (confirm("Uw nieuwe keuze overschrijft uw eventuele vorige keuze(s).  Wilt u doorgaan?")) {
		switch(thischoice) {
			case "J":
				$("#startscherm").hide(""); //de eerste keuze is gemaakt
				updateautorisatiearray("J");
				showscreen("J");
			break;
			case "N":
				$("#startscherm").hide(""); //de eerste keuze is gemaakt
				updateautorisatiearray("N");
				showscreen("N");
			break;
			case "S":
				$("#startscherm").hide(""); //de eerste keuze is gemaakt
				updateautorisatiearray("S");
				showscreen("S");
			break;
			default:
				alert("Programmeerfout in stelbeschikbaar(thischoice). Parameter moet A,N of S zijn!");
		}//switch
	}//if	
}
//
/*	
	Function:	showscreen(modus)
	
	Functionaliteit:
	
	Toon het initiele scherm bij een bekend bsn. 
	
	Parameters:
	
	modus	-	modus is: "N"(geen uitwisseling),"A" (alles uitwisselen), "S" (zelf selectie maken, overal "J" of "N" ingevuld),"T" (zelf selectie maken, nog niet overal "J" of "N" ingevuld)
*/
function showscreen(modus){ 
	const noggeenaanbtekst = "<p><small>Jouw zorgaanbieders zijn nog niet aangesloten op Mitz. Je kunt wel alvast een keuze<br>maken voor een groep zorgaanbieders of voor alle zorgaanbieders. Deze keuze<br>wordt dan nog niet gebruikt. Gaat jouw zorgaanbieder aan de slag met Mitz, dan<br>gebruikt deze jouw keuze.</small></p>";						
	switch(modus) {
		case "N": 
			document.getElementById("titel").innerHTML  = "<b>Geen enkele zorgaanbieder</b>";
			document.getElementById("regel1").innerHTML = "mag jouw medische gegevens elektronisch beschikbaar stellen";
			document.getElementById("regel2").innerHTML = "Lees hieronder welke zorgaanbieder jouw keuze gebruikt.";
			document.getElementById("aanbiederlink").innerHTML = "<font color='#4285f4'><u>Jouw zorgaanbieders</u></font>" + noggeenaanbtekst;
			document.getElementById("faqlink").innerHTML="<a href='https://www.mijnmitz.nl/veelgestelde-vragen'>Veelgestelde vragen</a>";
			$("#plaat1").attr("src","img/img-geentoest.png");
			
		break;
		case "J":
			document.getElementById("titel").innerHTML  = "<b>Al jouw eigen zorgaanbieders</b>";
			document.getElementById("regel1").innerHTML = "mogen jouw medische gegevens elektronisch beschikbaar stellen";
			document.getElementById("regel2").innerHTML = "Lees hieronder welke zorgaanbieder jouw keuze gebruikt.";
			document.getElementById("aanbiederlink").innerHTML = "<font color='#4285f4'><u>Jouw zorgaanbieders</u></font>"+ noggeenaanbtekst;
			document.getElementById("faqlink").innerHTML="<a href='https://www.mijnmitz.nl/veelgestelde-vragen'>Veelgestelde vragen</a>";
			$("#plaat1").attr("src","img/img-alletoest.png");
		break;
		case "S":
			document.getElementById("titel").innerHTML  = "<b>Bepaalde zorgaanbieders</b>";
			document.getElementById("regel1").innerHTML = "mogen jouw medische gegevens elektronisch beschikbaar stellen";
			document.getElementById("regel2").innerHTML = "Lees hieronder welke zorgaanbieder jouw keuze gebruikt.";
			document.getElementById("aanbiederlink").innerHTML = "<font color='#4285f4'><u>Jouw zorgaanbieders</u></font>" + noggeenaanbtekst;
			document.getElementById("faqlink").innerHTML="<a href='https://www.mijnmitz.nl/veelgestelde-vragen'>Veelgestelde vragen</a>";
			$("#plaat1").attr("src","img/img-beperkttoest.png");
		break;
		case "T":
			document.getElementById("titel").innerHTML  = "<b>Bepaalde zorgaanbieders</b>";
			document.getElementById("regel1").innerHTML = "mogen jouw medische gegevens elektronisch beschikbaar stellen";
			document.getElementById("regel2").innerHTML = "(je hebt nog niet bij alle uitwisselingen aangegeven of je die wel of niet toestaat)";
			document.getElementById("regel3").innerHTML = "Lees hieronder welke zorgaanbieder jouw keuze gebruikt.";
			document.getElementById("aanbiederlink").innerHTML = "<font color='#4285f4'><u>Jouw zorgaanbieders</u></font> + noggeenaanbtekst";
			document.getElementById("faqlink").innerHTML="<a href='https://www.mijnmitz.nl/veelgestelde-vragen'>Veelgestelde vragen</a>";
			$("#plaat1").attr("src","img/img-beperkttoest.png");
		break;
		default:
			alert("Ontwikkelfout! modus moet J,N,S of T zijn!");
	} 
	$("#plaat1").show("");
	$("#pasaan").show("");
	$("#bekijk").show("");
	$("#aanbiederlink").show("");
	$("#faqlink").show("");	
}
//
/*	
	Function:	checkbsn()
	
	Functionaliteit: 
	
	Kijk bij ingevuld/gewijzigd BSN of dit bekend is binnen de GGZLab omgeving. Hiervoor wordt de localStorage burgerarray gebruikt. Indien het BSN bekend is wordt de gebruiker verwelkomt en worden zijn eerdere keuzes zichtbaar gemaakt. Indien het BSN onbekend is moet eerst de (achter-)naam worden ingevuld en moeten BSN en naam binnen GGZLab bekend worden gemaakt. Daarna kan er verder worden gegaan.
	
	Gegevensverzamelingen:
	
	burgerarray - de NAW-gegevens van de in GGZLab bekende "personen" (burgers), geidentificeerd door hun BSN
	autorisatiearray - verzameling van alle in GGZLab bekende autorisaties. Dit zijn dus alle (ingevulde) autorisatiemogelijkheden van alle binnen GGZLab bekende "personen".
*/
function checkbsn(){
	let gevonden = false;
	let autorarray = [];
	let autorrecord = {};
	document.getElementById("welkom").innerHTML= "";
	let thisbsn = document.getElementById("bsn").value;
	let burgerarray	=	localStorage.getItem('burgerarray') ?
		JSON.parse(localStorage.getItem('burgerarray')) : []; //we gebruiken "burgerarray" voor persoonsgegevens van zowel burgers (zonder koppeling met een zorginstelling) als patienten (met koppeling naar zorginstelling)
	for (let i=0;i<burgerarray.length;i++) {
		if (burgerarray[i].bsn == thisbsn){
			document.getElementById("welkom").innerHTML="Welkom " + burgerarray[i].voornaam + " " + burgerarray[i].achternaam;
			gevonden = true;
		}//if
	}//for
	if (gevonden == true) { //we hebben een geldig bsn van de patient
		let autorisatiearray	=	localStorage.getItem('autorisatiearray') ?
			JSON.parse(localStorage.getItem('autorisatiearray')) : [];
		let numauth 	= 	0;
		let numpos 		=	0;
		let numneg		=	0;
		let numsel		=	0;
		for (let j=0;j<autorisatiearray.length;j++) {
			if (autorisatiearray[j].bsn == thisbsn) {//we hebben een autorisatie van deze patient
				numauth	=	numauth + 1;//aantal autorisatiearray bij dit bsn
				switch(autorisatiearray[j].waarde) {
					case "J": 
						numpos	=	numpos + 1;//J=toegestaan 
						break;
					case "N":
						numneg 	=	numneg + 1;//N=verboden S
						break;
					case "S":
						numsel	=	numsel + 1;//S=(nog)niet ingevuld
						break;
					default:
						alert("Fout in checkbsn, tweede deel. autorisatiearray[j].waarde moet J, N of S zijn!");
				}//switch
			}//if
		}//for
		if (numauth <= 0) { //er zijn voor dit bsn nog geen autorisatiearray
			$("#startscherm").show(""); //geef de initiële keuzemogelijkheden
		} else {	
			if (numpos == numauth){
				showscreen("J"); //Patient geeft voor alle uitwisselingen toestemming
			} else {
				if (numneg == numauth){
					showscreen("N"); //Patient geeft voor geen enkele uitwisseling toestemming
				} else {
					if (numsel > 0) {
						showscreen("T"); //Patient selecteert zelf, maar heeft nog niet bij alle mogelijke uitwisselingen "J" of "N" gegeven
					} else {
						showscreen("S"); //Patient selecteert zelf en heeft bij alle mogelijke uitwisselingen "J" of "N" gegeven
					}
				}//else					
			}//else
		}//else	
	} else {
		showInvoer();
	}//else
}//function	
//
/*	
	Function:	voerbsnin()
	
	Functionaliteit: 
	
	Invullen van de persoonsgegevens bij een nieuw BSN en opslaan in de localstorage burgerarray.
	
	Gegevensverzamelingen:
	
	burgerarray - de NAW-gegevens van de in GGZLab bekende "personen" (burgers), geidentificeerd door hun BSN
*/
function voerbsnin() {
	let burgerarray			=	localStorage.getItem('burgerarray') ?
		JSON.parse(localStorage.getItem('burgerarray')) : []; //we gebruiken "burgerarray" voor zowel burgers (zonder koppeling met een zorginstelling) als patienten (met koppeling naar zorginstelling)
	if ((document.getElementById('bsn').value == "") || (document.getElementById('achternaam').value =="")) { 
		alert("BSN en Achternaam zijn verplichte velden en moeten gevuld zijn!") 
	} else {	
		var newpatient 				= 	new Object();
		newpatient.bsn				= 	document.getElementById('bsn').value;
		newpatient.voornaam			=	document.getElementById('voornaam').value;
		newpatient.achternaam		=	document.getElementById('achternaam').value;
		newpatient.titel			=	document.getElementById('titel').value;
		newpatient.geslacht			=	document.getElementById('geslacht').value;
		newpatient.geboortedatum	=	document.getElementById('geboortedatum').value;
		newpatient.straatnaam		=	document.getElementById('straatnaam').value;
		newpatient.huisnummer		=	document.getElementById('huisnummer').value;
		newpatient.woonplaats		=	document.getElementById('woonplaats').value;
		newpatient.postcode			=	document.getElementById('postcode').value;
		newpatient.telefoon			=	document.getElementById('telefoon').value;
		burgerarray.push(newpatient);
		localStorage.setItem('burgerarray',JSON.stringify(burgerarray));
		console.log("Gegevens van de persoon met bsn "+newpatient.bsn+" zijn opgeslagen");
		hideInvoer();
		checkbsn();
	}//else 	
}  
//
/*	
	Function:	annuleerkeus1()
	
	Functionaliteit: 
	
	Als de gebruiker ervoor kiest om toch zijn eerdere keuzes niet te wijzigen
	
	Relaties met de GUI:

		de div "startscherm" wordt verborgen
*/
function annuleerkeus1(){
	$("#startscherm").hide("");
}	
//
/*	
	Function:	showInvoer() 
	
	Functionaliteit: 
	
	Toon het invoerscherm voor naam- en adresgegevens
	
	Relaties met de GUI:

		de div "invoerscherm" wordt getoond
*/
function showInvoer() { 
	$("#invoerscherm").show("");
} 
//
/*	
	Function:	hideInvoer() 
	
	Functionaliteit: 
	
	Verberg het invoerscherm voor naam- en adresgegevens
	
	Relaties met de GUI:

		de div "invoerscherm" wordt verborgen
*/	
function hideInvoer() { 
	$("#invoerscherm").hide("");
} 
//
/*	
	Function:	updateautorisatiearray(thischoice)
	
	Functionaliteit: 
	
	Maak of update de toestemmingen van de patient als hij alles wil autoriseren (thischoice="J"), of alles wil afwijzen (thischoice ="N"), of zelf wil selecteren ("S")
	
	Gegevensverzamelingen:
	
	autorisatiearray - alle vastgelegde autorisaties binnen GGZLab voor alle binnen GGZLab bekende "personen"
	
	
*/	
function updateautorisatiearray(thischoice) { 
	let bsn = document.getElementById("bsn").value;
	let newautorisatiearray	= []; //het nieuwe array met autorisatiearray van alle patienten, behalve die van <dit bsn>
	if (bsn == "") {
		alert("Voer eerst uw bsn in!");
	} else {	
		if ((thischoice != "J") && (thischoice != "N") &&(thischoice !="S")) {
			alert('Programmeerfout in of bij module:ggzmitzpag1, functie:updateautorisatiearray. Parameter moet J,N of S zijn!');
		} else {	
			let autorisatiearray	=	localStorage.getItem('autorisatiearray') ?
				JSON.parse(localStorage.getItem('autorisatiearray')) : []; //het array met alle bestaande autorisatiearray van alle patienten					
			for (let i=0;i<autorisatiearray.length;i++) { //We gooien eerst alle oude autorisatiearray weg	
				if (autorisatiearray[i].bsn != bsn) {//we hebben een autorisatie van een andere patient
					newautorisatiearray.push(autorisatiearray[i]);
				}//if   Zo raken we de oude autorisatiearray van <dit bsn>  kwijt	
			}//for
			for (j=0;j<toestmog.length;j++) { //doorloop nu alle MOGELIJKE toestemmingen
				let nwautor = {};
				nwautor["bsn"] = bsn;
				nwautor["toestemmingsid"] = toestmog[j].toestemmingsid;
				switch(thischoice) {
					case("J"):
						nwautor.waarde = "J";
						break;
					case("N"):
						nwautor.waarde = "N";
						break;
					case("S"):
						nwautor.waarde = "S";
						break;
					default:
							alert("thischoice is geen J,N of S in updateautorisatiearray!");
				}//switch
				newautorisatiearray.push(nwautor);
			}//for
			localStorage.setItem('autorisatiearray',JSON.stringify(newautorisatiearray));
			//Zorg dat de nieuwe/gewijzigde toestemming ook bij GGZMonitor bekend wordt
			let animarray		=	localStorage.getItem('animarray') ?
				JSON.parse(localStorage.getItem('animarray')) : [];
				var newanim 		= new Object();
				newanim.animatie 	= "mijnmitz";
				newanim.xisid 		= 11;
				newanim.resultaat	= "ja";
				newanim.done		= false;
				animarray.push(newanim);
				localStorage.setItem('animarray',JSON.stringify(animarray));
		}//else
	}//else	
}