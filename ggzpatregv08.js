/*
	File:	GGZpatregvXX.js
	
	Doel: 	 
	GGZPatreg simuleert de patientregistratie-functie bij een GGZ, ziekenhuis, huisartsenpraktijk, apotheek enz. Dit is de stap waarin het BSN van de patient geregistreerd wordt en zijn overige persoons- en adresgegevens worden vastgelegd.
	
	Vanuit onderhoudbaarheid is de javascript-code zoveel mogelijk gescheiden van de HTML instructies. Daardoor hoort bij ieder html-scherm een javascript-bestand: GGZpatregvXX.js. 
	
	In het GGZLab worden patienten/burgers geidentificeerd op basis van hun "BSN". Dit betekent dat bij het invoeren van een correct (=reeds in GGZLab bekend) BSN direct ook naam- en adresgegevens getoond kunnen worden (vergelijk de "BSN verificatie" in de werkelijke wereld). De betrokken persoon is daarmee nog niet automatisch "patient" bij de betreffende zorgaanbieder. Om dat te bereiken is er een actie vanuit de zorgaanbieder nodig. Zodra de betrokken persoon (met dat "BSN") patient is bij de zorgaanbieder kunnen naam- en adresgegevens gewijzigd worden en kunnen behandelgegevens worden toegevoegd, gewijzigd, opgevraagd en beschikbaargesteld worden.

*/	
//
/*	
	function:	logochange()
	
	
	Functionaliteit:
	Omdat dit "patientregistratiescherm" voor verschillende zorgaanbieders gebruikt kan worden, moet bovenin het scherm een andere zorgaanbieder gekozen kunnen worden. Daarbij hoort dan ook een ander logo.
*/
function logochange() { //Laat het juiste logo zien bij een gekozen zorginstelling
	plaatje = 	"";
	xisid 	=	document.getElementById("aanbieder").value;
	plaatje = 	kieslogo(xisid);
	document.getElementById("logoimg").src = plaatje;
}//function	
//
/*	
	function: clearform()
	
	Functionaliteit: 
	Alle velden in het patientregistratiescherm leegmaken voor nieuwe of gewijzigde invoer
*/
function clearform(){ //Scherm leegmaken tbv nieuwe invoer.
	$('#wijzigbutton').prop('disabled',true);
	$('#doorvoerbutton').prop('disabled',true);
	$('#aanmeldbutton').prop('disabled',true);
	document.getElementById("result").innerHTML 		= 	"";
	document.getElementById('titel').value 				=	"";
	document.getElementById('geslacht').selectedIndex	=	3;
	document.getElementById('achternaam').value			=	""
	document.getElementById('voornaam').value			=	"";
	document.getElementById('geboortedatum').value		=	"";
	document.getElementById('straatnaam').value			=	"";
	document.getElementById('huisnummer').value			=	"";
	document.getElementById('woonplaats').value			=	"";
	document.getElementById('postcode').value			=	"";
	document.getElementById('telefoon').value			=	"";	
	for (var i = 0; i < xissen.length; i++) { //Vul de Select button met alle mogelijke xissen
		$("#aanbieder").append('<option value=' + xissen[i].xisid + '>' + xissen[i].naam + '</option>');
    }//for
 }//function
 //
 /*	
	function: toonheader()
	
	Functionaliteit:
	
	Het scherm leegmaken
*/
 function toonheader(){ //Vul de schermtitel in
	document.getElementById("appname").innerHTML ="<b>" +appname+"</b>";
	clearform();//vul initieel de velden
}
/*	
	function: xischange()
	
	Functionaliteit: 
	
	Als de gebruiker voor een andere zorgaanbieder ("xis") kiest, dan moet ook het logo worden aangepast en moet de bsn-controle opnieuw plaatsvinden om te zien of dit BSN al patient is bij het andere XIS.
*/
function xischange(){ //de zorgaanbieder is veranderd
	logochange(); //laat het juiste logo zien
	$('#wijzigbutton').prop('disabled',true);
	$('#doorvoerbutton').prop('disabled',true);
	$('#aanmeldbutton').prop('disabled',true);
	document.getElementById("result").innerHTML 		= 	"";
	document.getElementById('titel').value 				=	"";
	document.getElementById('geslacht').selectedIndex	=	3;
	document.getElementById('achternaam').value			=	""
	document.getElementById('voornaam').value			=	"";
	document.getElementById('geboortedatum').value		=	"";
	document.getElementById('straatnaam').value			=	"";
	document.getElementById('huisnummer').value			=	"";
	document.getElementById('woonplaats').value			=	"";
	document.getElementById('postcode').value			=	"";
	document.getElementById('telefoon').value			=	"";	
	bsnveldchange();//hoewel bsn en achternaam hetzelfde kunnen zijn gebleven is de zorgaanbieder veranderd
}	
//
/*	
	function:	lockform(modus)
	
	Functionaliteit: 
	
	Het invoerscherm met de persoonsgegevens is standaard readonly, totdat het BSN een patient is bij de betrokken zorgaanbieder (XIS). In dat geval kunnen gegevens na een knopdruk gewijzigd worden
	
	Parameters:
		modus	-	true: dan is het scherm readonly. false: dan zijn wijzigingen mogelijk
*/
function lockform(modus){ //maak het invoerscherm readonly (lockform(true)) of bewerkbaar (lockform(false))
	$("#voornaam").prop("readonly",modus);
	$("#achternaam").prop("readonly",modus);
	$("#titel").prop("readonly",modus);
	$("#geslacht").prop("readonly",modus);
	$("#geboortedatum").prop("readonly",modus);
	$("#straatnaam").prop("readonly",modus);
	$("#huisnummer").prop("readonly",modus);
	$("#woonplaats").prop("readonly",modus);
	$("#postcode").prop("readonly",modus);
	$("#telefoon").prop("readonly",modus);
}
//
/*	
	function:	bsnveldchange()
	
	Functionaliteit:
	
	Controleer het bsn als het bsn-veld of het zorgaanbiedersveld (xis) gewijzigd is. Is het bsn al bekend binnen GGZLab en (indien dat zo is) is het bsn patient bij de betrokken zorgaanbieder.
*/
function bsnveldchange() {
	var bsn		= 	document.getElementById('bsn').value;
	var xisid 	=	document.getElementById("aanbieder").value;
	checkbsn(bsn,xisid);
}//function
//
/*	
	function:	checkbsn(bsn,xisid)
	
	Functionaliteit:
	
	controleer het bsn als het bsn-veld of het zorgaanbiedersveld (xis) gewijzigd is. Is het bsn al bekend binnen GGZLab en (indien dat zo is) is het bsn patient bij de betrokken zorgaanbieder. 
	
	Gegevensverzamelingen:
	
	burgerarray - de LocalStorage waarin alle personen ("burgers") in GGZLab geregistreerd staan met hun naam en eventuele adresgegevens
	patientarray - de koppeling tussen burgerarray en zorgaanbieder, aangevend dat een bepaald BSN patient is bij deze zorgaanbieder
	
	Triggers en Events:
	
	De functie wordt getriggered door de functie bsnveldchange()
*/
function checkbsn(bsn,xisid){ //Kijk of het bsn al bekend is binnen GGZLab. Zo ja, toon dan de persoonsgegevens en kijk of de patient al is ingeschreven bij deze specifieke zorgaanbieder.  
	let bsninggzlab = 	false;
	let bsninxis	=	false;
	let thisxis		=	$('#aanbieder :selected').text();
	console.log(thisxis);
	let burgerarray	=	localStorage.getItem('burgerarray') ?
		JSON.parse(localStorage.getItem('burgerarray')) : [];
	for (let i=0;i<burgerarray.length;i++) {
		if (bsn	== 	burgerarray[i].bsn) { //patient is bekend binnen GGZLab
			bsninggzlab = true;
			let patientarray	=	localStorage.getItem('patientarray') ?
				JSON.parse(localStorage.getItem('patientarray')) : [];
			for (let j=0;j<patientarray.length;j++) {
				if (patientarray[j].bsn == bsn) { //we hebben dezelfde patient/burger
					if (patientarray[j].xisid == xisid) { //deze is al ingeschreven bij deze zorgaanbieder
						bsninxis = true;
					}//if
				}//if
			}//for
		}//if
	}//for
	if (bsninggzlab == true) { //bsn is al bekend binnen GGZLab. We kunnen de NAW-gegevens dus tonen voor zover we die hebben
		lockform(true); //zet alle velden op "readonly"		
		for (let i=0;i<burgerarray.length;i++) {
			if (bsn	== 	burgerarray[i].bsn) {
				if (burgerarray[i].voornaam != undefined) {
					document.getElementById('voornaam').value 		= 	burgerarray[i].voornaam;
				}
				if (burgerarray[i].achternaam != undefined) {
					document.getElementById('achternaam').value		= 	burgerarray[i].achternaam;
				}
				if (burgerarray[i].geslacht != undefined){ 
					document.getElementById('geslacht').value		= 	burgerarray[i].geslacht;
				}	
				if (burgerarray[i].titel != undefined) { 
					document.getElementById('titel').value			=	burgerarray[i].titel;
				}
				if (burgerarray[i].geboortedatum != undefined) {
					document.getElementById('geboortedatum').value	=	burgerarray[i].geboortedatum;
				}
				if (burgerarray[i].straatnaam != undefined) {
					document.getElementById('straatnaam').value		=	burgerarray[i].straatnaam;
				}	
				if (burgerarray[i].huisnummer != undefined) { 
					document.getElementById('huisnummer').value		=	burgerarray[i].huisnummer;
				}
				if (burgerarray[i].woonplaats != undefined) {					
					document.getElementById('woonplaats').value		=	burgerarray[i].woonplaats;
				}
				if (burgerarray[i].postcode != undefined) {
					document.getElementById('postcode').value		=	burgerarray[i].postcode;
				}
				if (burgerarray[i].telefoon != undefined) {					
					document.getElementById('telefoon').value		=	burgerarray[i].telefoon;
				}	
			}//if
		}//for
		if (bsninxis == true) {//bsn bekend in GGZLab én als patient geregistreerd bij dit XIS			
			$('#wijzigbutton').prop('disabled',false); //we kunnen na deze knop gedrukt te hebben de gegevens aanvullen of wijzigen
			$('#doorvoerbutton').prop('disabled',true);  //zolang er niet op de wijzigbutton is gedrukt kunnen de gegevens niet worden opgeslagen
			$('#aanmeldbutton').prop('disabled',false); //we kunnen proberen om het dossier aan te melden bij het abonnementenregister
		} else {//bsn wel bekend in GGZLab, maar niet als patient in dit XIS
			if (confirm("Deze persoon is nog niet als patient geregistreerd bij "+ thisxis +". Registreren als patient?") == true) {
				let patientarray	=	localStorage.getItem('patientarray') ?
					JSON.parse(localStorage.getItem('patientarray')) : [];
				var newpatient 		= 	new Object(); 
				newpatient.bsn		= 	bsn;
				newpatient.xisid	=	xisid;
				patientarray.push(newpatient);
				localStorage.setItem('patientarray',JSON.stringify(patientarray));
				domelding("Patient met bsn "+newpatient.bsn+" geregistreerd als patient bij "+ thisxis+".");
				$('#doorvoerbutton').prop('disabled',true)//voorkom tweemaal registreren
				$('#wijzigbutton').prop('disabled',false);//wijzigingen kunnen wel bij de eigen patienten
				$('#aanmeldbutton').prop('disabled',false);//aanmelden (proberen) kan ook bij de eigen patienten
			}//if
		}//else
	
	} else { //bsn nog niet bekend en dus ook niet opgenomen als patient in dit XIS
		if (confirm("Dit BSN is nog niet bekend in GGZLab. Wilt u deze persoon toevoegen en registreren als patient?") == true) {
			clearform();
			lockform(false);
			$('#wijzigbutton').prop('disabled',true); //
			$('#doorvoerbutton').prop('disabled',false);//
			$('#aanmeldbutton').prop('disabled',true);
		}//if	
	}//else
}//function	
//
/*	
	function:	naambsnveldchange()
	
	Functionaliteit:
	Check op (verplichte) achternaam en bsn. Alleen als die zijn ingevuld en niet uit alleen spaties bestaan werkt de invoerknop
*/
function naambsnveldchange() { 
	var famname = document.getElementById('achternaam').value;
	var bsn		= document.getElementById('bsn').value
	if ((famname && famname.trim()) && (bsn && bsn.trim()) ) {
		$('#wijzigbutton').prop('disabled',false);
		$('#aanmeldbutton').prop('disabled',false);
	} else {
		$('#wijzigbutton').prop('disabled',true);
		$('#aanmeldbutton').prop('disabled',true);
	}
}
//
/*	
	function: patientwijz()
	
	Functionaliteit:
	
	Stel het scherm zo in dat het mogelijk wordt om patientgegevens aan te vullen of te wijzigen
*/	
function patientwijz() {//
	lockform(false);//haal de velden van readonly
	$('#doorvoerbutton').prop('disabled',false);	
}
//
/*	
	function: patientinv()
	
	Functionaliteit:
	
	Invoeren van een nieuwe patient vanuit het gevulde NAW-scherm en opslaan in local storage "patientarray"
	
	Gegevensverzamelingen:
	
	burgerarray - de LocalStorage waarin alle personen ("burgers") in GGZLab geregistreerd staan met hun naam en eventuele adresgegevens
	
	patientarray - de koppeling tussen burgerarray en zorgaanbieder, aangevend dat een bepaald BSN patient is bij deze zorgaanbieder
	
*/	
function patientinv() {
	let xisid 	= 	document.getElementById("aanbieder").value;
	let bsn		=	document.getElementById('bsn').value;
	let burgerarray			=	localStorage.getItem('burgerarray') ?
	 JSON.parse(localStorage.getItem('burgerarray')) : [];
	var newburger 				= 	new Object(); //Voer eerst de persoonsgegevens als "burger"  in
	newburger.bsn				= 	bsn;
	newburger.voornaam			=	document.getElementById('voornaam').value;
	newburger.achternaam		=	document.getElementById('achternaam').value;
	newburger.geslacht			=	document.getElementById('geslacht').value;
	newburger.titel				=	document.getElementById('titel').value;
	newburger.geboortedatum		=	document.getElementById('geboortedatum').value;
	newburger.straatnaam		=	document.getElementById('straatnaam').value;
	newburger.huisnummer		=	document.getElementById('huisnummer').value;
	newburger.woonplaats		=	document.getElementById('woonplaats').value;
	newburger.postcode			=	document.getElementById('postcode').value;
	newburger.telefoon			=	document.getElementById('telefoon').value;
	burgerarray.push(newburger);
	localStorage.setItem('burgerarray',JSON.stringify(burgerarray));
	let patientarray	=	localStorage.getItem('patientarray') ?
		JSON.parse(localStorage.getItem('patientarray')) : [];
	var newpatient 		= 	new Object(); 
	newpatient.bsn		= 	bsn;
	newpatient.xisid	=	xisid;
	patientarray.push(newpatient);
	localStorage.setItem('patientarray',JSON.stringify(patientarray));
	domelding("Patient met bsn "+newpatient.bsn+" ingevoerd en geregistreerd als patient");
	$('#doorvoerbutton').prop('disabled',true)//voorkom tweemaal registreren
	$('#wijzigbutton').prop('disabled',false);//wijzigingen kunnen wel bij de eigen patienten
	$('#aanmeldbutton').prop('disabled',false);//aanmelden (proberen) kan ook bij de eigen patienten
}
//
/*	
	function: patientaanmeld()
	
	Functionaliteit:
	
	proberen om het dossier van deze patient aan te melden bij het bij het Mitz abonnementenregister. Dit lukt alleen indien de patient hiervoor toestemming heeft gegeven
	
	Gegevensverzamelingen:
	abonnreg - vastlegging van alle abonnementen binnen GGZLab
*/	
function patientaanmeld(){
	let bsn 			= 	document.getElementById('bsn').value;
	let xisid 			= 	document.getElementById('aanbieder').value; 
	if (checkaanmeldtoestemming(bsn,xisid) == false) {
		alertnawait("Deze patient heeft geen toestemming gegeven voor beschikbaarstellen van het dossier",8);
	} else {	
		let abonnreg		=	localStorage.getItem('abonnreg') ?
			JSON.parse(localStorage.getItem('abonnreg')) : [];
		var newaanmeld = new Object();
		newaanmeld.bsn = bsn;
		newaanmeld.xisid = xisid;
		newaanmeld.committed = false;
		abonnreg.push(newaanmeld);
		localStorage.setItem('abonnreg',JSON.stringify(abonnreg));
		domelding("Dossier voor patient met bsn "+bsn+" aangemeld bij Mitz abonnementenregister");
		document.getElementById("aanmeldbutton").prop('disabled',true); //voorkom dubbele aanmelding bij het register
	 }//else
}
//
/*	
	function: checkaanmeldtoestemming(bsn,xisid)
	
	Functionaliteit:
	
	controleer of de patient aan deze categorie zorgaanbieder toestemming heeft gegeven voor het aanmelden van zijn dossier bij het abonnementenregister
*/	
function checkaanmeldtoestemming(bsn,xisid) {
	let okay 				= 	false;
	let catdossierhouder	=	"";
	for (let i=0;i<xissen.length;i++) {
		if (xissen[i].xisid == xisid) {
			catdossierhouder = xissen[i].catdh;
		}//if
	}//for
	if (catdossierhouder == "") {
		alert("categorie dossierhouder niet gevonden voor deze zorgaanbieder!");
	}	else {
		let autorisaties	=	localStorage.getItem('autorisatiearray') ?
			JSON.parse(localStorage.getItem('autorisatiearray')) : [];
		for (let j=0;j<autorisaties.length;j++) {
			if ((autorisaties[j].bsn == bsn) && (autorisaties[j].waarde == "J")) { //we hebben een toestemmingsprofiel van dit BSN en er is instemming
				toestemmingsid = autorisaties[j].toestemmingsid;
				for (k=0;k<toestmog.length;k++) {
					if ((toestmog[k].toestemmingsid == toestemmingsid) && (toestmog[k].dossierhouder==catdossierhouder)) {
						okay = true;
					}//if
				}//for						
			}//if
		}//for		
	}//else
	//Zorg dat het opvragen van de toestemming ook bij GGZMonitor bekend wordt
	let animarray		=	localStorage.getItem('animarray') ?
		JSON.parse(localStorage.getItem('animarray')) : [];
	var newanim 		= new Object();
	newanim.animatie 	= "askmitz";
	newanim.xisid 		= xisid;
	if (okay == true) {
		newanim.resultaat	= "ja";
	} else {
		newanim.resultaat 	= "nee";
	}
	newanim.done		= false;
	animarray.push(newanim);
	localStorage.setItem('animarray',JSON.stringify(animarray));
	return(okay);
}//function
//
/* 	
	function: alertnawait(melding,secs)
	
	Functionaliteit:
	
	Geef na <secs> seconden wachttijd <melding>  in een alertbox. Deze functie wordt overbodig zodra de animationqueue is gerealiseerd.
	
	Parameters:
		melding	-	de tekst van de melding
		secs	-	de wachttijd in seconden
		
	Opmerking:
	
		deze functie wordt tzt vervangen door de implementatie van een "animatiequeue" waarin verschillende animaties (zowel in de monitor als op het invoerscherm) geplaatst kunnen worden en waarbij een afgeronde animatie de volgende triggert.
		
*/		
function alertnawait(melding,secs){
    setTimeout(function () {
        alert(melding); // wordt na 3 sec uitgevoerd
    },1000*secs);
}