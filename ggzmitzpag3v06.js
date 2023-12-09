/*
	File:	GGZMitzpag3vXX.js
	
	Doel: 	 
	
	Dit javascript/html programma simuleert het gebruik van MijnMitz door een burger/patient. De gehele "mijnmitz"-simulatie bestaat uit drie schermen: GGZMitzpag1vXX.html,GGZMitzpag2vXX.html en GGZMitzpag3vXX.html.  
	Vanwege de onderhoudbaarheid zijn javascript-code en HTML zoveel mogelijk gescheiden. Daardoor hoort bij ieder html-scherm een javascript-bestand. Dit zijn dus achtereenvolgens  GGZMitzpag1vXX.js,GGZMitzpag2vXX.js en GGZMitzpag3vXX.js
	
	Dit is het derde scherm van de "MijnMitz"-simulatie. In dit scherm kan de gebruiker (burger) per categorie dossierhouder specifiek aangeven voor welke categorie opvrager(s) zijn dossier beschikbaar gesteld mag worden.
*/

/*	
	Constants:
	toestmog	-	alle toestemmingsmogelijkheden via MijnMitz. Deze constante is gedeclareerd en gedefinieerd in ggzlabv0x.js.
	
	Variables:
	global var erisgewijzigd	-	true of false. Geeft aan of er een animatie moet plaatsvinden (erisgewijzigd == true) of niet (erisgewijzigd == false).
*/
var erisgewijzigd	= false;
//
/*	Function:	$(document).ready(function()
	
	Functionaliteit:
	
	Controleren search parameters en (op basis daarvan) opzetten van het scherm (direct bij het laden)

	Parameters:
	
	searchParams	-	Om de communicatie tussen de drie schermen van de MijnMitz simulatie eenvoudig te houden worden de searchparameters "patient" en "cathouder" gebruikt om informatie van het tweede naar het derde scherm door te geven.
	
	"patient"	-	het bsn van de burger/patient
	
	"cathouder"	- 	de categorie dossierhouder waarbij we de toestemmingen willen aanpassen.
*/	
$(document).ready(function(){
	var thisbsn = "";
	let thiscathouder = "";
	$('#parameters').hide(); //commentarieer dit uit om in het scherm de doorgegeven Search-parameters te zien
	$('#autorisatietabel tbody').on('click', 'td', function () {            
	    alert('ColumnIndex:'+ $(this).parent().find('td').index(this));
	    alert('RowIndex:'+ $(this).parent().parent().find('tr').index($(this).parent()));            
        });
	let searchParams = new URLSearchParams(window.location.search);
	if (searchParams.has('patient')) {
		let thisbsn = searchParams.get('patient');
		document.getElementById("bsn").value = thisbsn;
	} else {
		alert("bsn niet meegegeven als query-parameter 'patient'!");
	}
	if (searchParams.has('cathouder')) {
		thiscathouder = searchParams.get('cathouder');
		document.getElementById("cathouder").value = thiscathouder;
	} else {
		alert("categorie dossierhouder niet meegegeven als query-parameter 'cathouder'!");
	}
	var windowheight = $(window).height();
	var windowwidth = $(window).width();
	var pagecenterW = windowwidth/2;
	var pagecenterH = windowheight/2;
	$("div.center-box")
		.css({top: pagecenterH-250 + 'px', left: pagecenterW-200 + 'px'});
	document.getElementById("appname").innerHTML ="<b>" +appname+"</b>";
	let kopje = '<b>Aan wie mogen <span style="color: #2d89d8">' + thiscathouder + '</span> jouw medische gegevens beschikbaar stellen? </b>';
	document.getElementById("kopje").innerHTML = kopje;
	vultabel();
});	
//

/*	
	Function: vultabel()
	
	Functionaliteit:
	
	Vul de tabel met gedetailleerde toestemmingsinformatie op basis van de toestemmingen van dit BSN bij deze dossierhouder-categorie
	
	Gegevensverzamelingen:
	
	toestmog			-	alle mogelijke toestemminsgsverleningen (bronhouder-gegevenscategorie- opvrager). Deze zijn gedefinieerd in ggzlabvXX.js
	
	autorisatiearray	-	alle vastgelegde autorisaties binnen GGZLab voor alle binnen GGZLab bekende "personen"
*/	
function vultabel(){ //maak de juiste tabel bij dit bsn en deze dossierhouder-categorie
	$("#autorisatietabel tr").remove();
	let thishouder 		= 	document.getElementById("cathouder").value;
	let thisbsn			=	document.getElementById("bsn").value;
	let tabelregel		=	"";
	let buttongroen 	= "<img src='img/btngrnV.png' width='40px'";
	let buttonrood  	= "<img src='img/btnroodX.png' width='40px'";
	let buttongrijsX	= "<img src='img/btngrijsX.png' width='40px'";
	let buttongrijsV	= "<img src='img/btngrijsV.png' width='40px'";
	let autorisatiearray	=	localStorage.getItem('autorisatiearray') ?
				JSON.parse(localStorage.getItem('autorisatiearray')) : [];
	for (let i=0;i<autorisatiearray.length;i++) {//doorloop alle toestemmingen (van alle bsn's)
		if (autorisatiearray[i].bsn == thisbsn) {//we hebben een autorisatie van dit bsn
			for (let j=0;j<toestmog.length;j++){ //doorloop alle mogelijk te geven toestemmingen
				if (autorisatiearray[i].toestemmingsid == toestmog[j].toestemmingsid) {//we weten nu welke toestemmingsmogelijkheid het is
					let onclickfunc1 = "onclick='wijzigauth(\"" + thisbsn+ "\",\"" + autorisatiearray[i].toestemmingsid + "\",\"J\")'/>"; //Er is op de groene J gedrukt - let op double quotes zijn ge-escaped
					let onclickfunc2 = "onclick='wijzigauth(\"" + thisbsn+ "\",\"" + autorisatiearray[i].toestemmingsid + "\",\"N\")'/>"; //Er is op de grijze N gedrukt  - let op double quotes zijn ge-escaped
					if (toestmog[j].dossierhouder == thishouder) {//we hebben nu de autorisatie bij een toestemmingsmogelijkheid van déze dossierhouder
						tabelregel = "<tr><td>" + toestmog[j].opvrager +"</td>";
						if (autorisatiearray[i].waarde == "J") {							
							tabelregel	= tabelregel + "<td>"+buttongroen+onclickfunc1+"</td><td>"+buttongrijsX+onclickfunc2+"</td></tr>"; //uitwisseling mag
							//alert(tabelregel);
						} else {
							if (autorisatiearray[i].waarde == "N") {
								tabelregel	= tabelregel + "<td>"+buttongrijsV+onclickfunc1+"</td><td>"+buttonrood+onclickfunc2+"</td></tr>"; //uitwisseling mag niet
								//alert(tabelregel);
							} else {
								tabelregel 	= tabelregel  + "<td>"+buttongrijsV+onclickfunc1+"</td><td>"+buttongrijsX+onclickfunc2+"</td></tr>";//uitwisseling nog niet ingevuld
								//alert(tabelregel);
							}//else
						}//else
						tabelregel = tabelregel + "<tr></tr>";//geef een lege regel tussen de informatie
						$('#autorisatietabel').append(tabelregel);	
					}//if
				}//if
			}//for
		}//if
	}//for	
}//function
//
/*	
	Function:	wijzigauth(thisbsn, thistoestemmingsid,thiswaarde)
	
	Parameters:
	
	thisbsn - het bsn van de persoon voor wie de autorisatie wordt gewijzigd (de burger of de patient)
	thistoestemmingsid - verwijzing naar de identifier van de toestemmingsmogelijkheid ("toestmog") waarvoor de wijziging geldt
	thiswaarde - "J" of "N". Bij "J" wordt toestemming gegegeven, bij "N" wordt deze uitwisseling verboden.
	
	Functionaliteit:
	
	Werk de tabel met autorisaties bij voor dit BSN, deze specifieke toestemmingsmogelijkheid en deze specifieke waarde ("J" of "N")
	
	Gegevensverzamelingen:
	
	autorisatiearray	-	alle vastgelegde autorisaties binnen GGZLab voor alle binnen GGZLab bekende "personen"
*/	
function wijzigauth(thisbsn, thistoestemmingsid,thiswaarde){
	let autorisatiearray	=	localStorage.getItem('autorisatiearray') ?
				JSON.parse(localStorage.getItem('autorisatiearray')) : [];
	for (let i=0;i<autorisatiearray.length;i++) {//doorloop alle toestemmingen (van alle bsn's)
		if (autorisatiearray[i].bsn == thisbsn) {//we hebben een autorisatie van dit bsn
			if (autorisatiearray[i].toestemmingsid == thistoestemmingsid) { //en nu de specifieke autorisatie voor dit bsn
				if (autorisatiearray[i].waarde == thiswaarde) {
					//er gebeurt niks, want de patient heeft op de al gegeven keuze gedrukt
				} else {
					autorisatiearray[i].waarde = thiswaarde;
					erisgewijzigd = true;
				}//else
			}//if
		}//if
	}//for
	localStorage.setItem('autorisatiearray',JSON.stringify(autorisatiearray)); //sla nieuwe autorisatiearray op
	vultabel();	
}//function	
//
/*	
	Function: naarpag2()
	
	Functionaliteit:
	
	Keer terug naar de tweede pagina, maar als de gebruiker één of meer toestemmingen heeft gewijzigd wordt ook het animatiearray hiervoor bijgewerkt.
	
	Gegevensverzamelingen:
	
	animarray	-	Uit te voeren animaties.  (Deze gegevensverzameling wordt alleen benaderd bij wijzigingen).
*/
function naarpag2() {
	if (erisgewijzigd == true) {
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
	}//if		
	let bsn 	=	document.getElementById("bsn").value;
	let prevpage="ggzmitzpag2v06.html?patient="+bsn;
	location = prevpage;
}