//ggzlabv08.js
//##############################################
//##Generieke functies en global variables voor de GGZlab-omgeving##
//##############################################
//
/*	
	File:	ggzlabvXX.js
	
	Doel: 	 Deze library bevat generieke constanten, variabelen en functies voor het GGZLab.
		
	Relaties met de GUI: 
	
	Deze library gaat uit van een gestandaardiseerde opzet van de HTML-schermen met een voor alle schermen identieke kop met menu-opties, logo enz. en met de beschikbaarheid van een meldregel onderin het scherm.
	
*/
//	
/* 	Constant: xissen

	Beschrijving:
	
	Alle in GGZLab beschikbare zorgaanbieders en/of informatieverstrekkers en -opvragers. Gebruik is tweeledig: (1) teksten en logica rond de zorgaanbieder en (2) de afbeelding (en positionering) in de monitor-schermen.
	
	Attributen:
		xisid 	- 	volgnummer/identificatie van de zorgaanbieder
		naam	-	de (gevel-)naam van de zorgaanbieder
		img		-	de naam van de image-file waarin het logo van de zorgaanbieder is opgenomen
		catdh	-	de dossierhouder-categorie waarin de zorgaanbieder valt
		catopvr	-	de opvrager-categorie waarin de zorgaanbieder valt
*/
const xissen = [ 	
		{"xisid":"1","naam":"DE GGZ","img":"logoDEGGZ.png","catdh":"Geestelijke gezondheidszorg (GGZ)","catopvr":"Geestelijke gezondheidszorg (GGZ)"},
		{"xisid":"2","naam":"GGZ Geel","img":"logoggzgeel.png","catdh":"Geestelijke gezondheidszorg (GGZ)","catopvr":"Geestelijke gezondheidszorg (GGZ)"},
		{"xisid":"3","naam":"Thuiszorg Oost","img":"logotzoost.png","catdh":"Verpleging en verzorging","catopvr":"Verpleging en verzorging"}, 
		{"xisid":"4","naam":"Thuiszorg West","img":"logotzwest.png","catdh":"Verpleging en verzorging","catopvr":"Verpleging en verzorging"},
		{"xisid":"5","naam":"Apotheek Geel","img":"logoapothkgeel.png","catdh":"Apotheken","catopvr":"Apotheken"},
		{"xisid":"6","naam":"Apotheek Grijs","img":"logoapothkgrijs.png","catdh":"Apotheken","catopvr":"Apotheken"},
		{"xisid":"7","naam":"Dr Groen","img":"logodrgroen.png","catdh":"Huisartsen en huisartsenposten","catopvr":"Huisartsen en huisartsenposten"},
		{"xisid":"8","naam":"Dr Goud","img":"logodrgoud.png","catdh":"Huisartsen en huisartsenposten","catopvr":"Huisartsen en huisartsenposten"},
		{"xisid":"9","naam":"ZH Groen","img":"logozhgroen.png","catdh":"Ziekenhuizen, medische centra en klinieken","catopvr":"Ziekenhuizen, medische centra, klinieken, laboratoria en diagnostische centra"},
		{"xisid":"10","naam":"ZH Blauw","img":"logozhblauw.png","catdh":"Ziekenhuizen, medische centra en klinieken","catopvr":"Ziekenhuizen, medische centra, klinieken, laboratoria en diagnostische centra"},
		{"xisid":"11","naam":"MijnMitz","img":"logomijnmitz.png","catdh":"n/a","catopvr":"n/a"}
	];
/*	Constant:  toestmog
	
	Beschrijving:
	
	Alle mogelijke toestemmingen-situaties (categoraal) via Mitz. Iedere toestemmingsmogelijkheid bestaat uit een dossierhouder(categorie), een gegevenscategorie en een opvrager(categorie).
	
	Attributen:
		toestemmingsid		-	volgnummer/identificatie van de toestemmingsmogelijkheid
		dossierhouder		-	categorie dossierhouder bij deze toestemmingsmogelijkheid
		gegevenscategorie	-	categorie gegevens bij deze toestemmingsmogelijkheid
		opvrager			-	categorie opvrager bij deze toestemmingsmogelijkheid
*/
const toestmog = [
      {"toestemmingsid":"T001","dossierhouder": "Huisartsen en huisartsenposten","gegevenscategorie": "Behandelgegevens","opvrager": "Huisartsen en huisartsenposten"},
      {"toestemmingsid":"T002","dossierhouder": "Huisartsen en huisartsenposten","gegevenscategorie": "Behandelgegevens","opvrager": "Apotheken"},
      {"toestemmingsid":"T003","dossierhouder": "Huisartsen en huisartsenposten","gegevenscategorie": "Behandelgegevens","opvrager": "Ziekenhuizen, medische centra, klinieken, laboratoria en diagnostische centra"},
      {"toestemmingsid":"T004","dossierhouder": "Huisartsen en huisartsenposten","gegevenscategorie": "Behandelgegevens","opvrager": "Verpleging en verzorging"},
      {"toestemmingsid":"T005","dossierhouder": "Huisartsen en huisartsenposten","gegevenscategorie": "Behandelgegevens","opvrager": "Geestelijke gezondheidszorg (GGZ)"},
      {"toestemmingsid":"T006","dossierhouder": "Huisartsen en huisartsenposten","gegevenscategorie": "Behandelgegevens","opvrager": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)"},
      {"toestemmingsid":"T007","dossierhouder": "Apotheken","gegevenscategorie": "Medicatiegegevens","opvrager": "Huisartsen en huisartsenposten"},
      {"toestemmingsid":"T008","dossierhouder": "Apotheken","gegevenscategorie": "Medicatiegegevens","opvrager": "Apotheken"},
      {"toestemmingsid":"T009","dossierhouder": "Apotheken","gegevenscategorie": "Medicatiegegevens","opvrager": "Ziekenhuizen, medische centra, klinieken, laboratoria en diagnostische centra"},
      {"toestemmingsid":"T010","dossierhouder": "Apotheken","gegevenscategorie": "Medicatiegegevens","opvrager": "Verpleging en verzorging"},
      {"toestemmingsid":"T011","dossierhouder": "Apotheken","gegevenscategorie": "Medicatiegegevens","opvrager": "Geestelijke gezondheidszorg (GGZ)"},
      {"toestemmingsid":"T012","dossierhouder": "Apotheken","gegevenscategorie": "Medicatiegegevens","opvrager": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)"},
      {"toestemmingsid":"T013","dossierhouder": "Ziekenhuizen, medische centra en klinieken","gegevenscategorie": "Behandelgegevens","opvrager": "Huisartsen en huisartsenposten"},
      {"toestemmingsid":"T014","dossierhouder": "Ziekenhuizen, medische centra en klinieken","gegevenscategorie": "Behandelgegevens","opvrager": "Apotheken"},
      {"toestemmingsid":"T015","dossierhouder": "Ziekenhuizen, medische centra en klinieken","gegevenscategorie": "Behandelgegevens","opvrager": "Ziekenhuizen, medische centra, klinieken, laboratoria en diagnostische centra"},
      {"toestemmingsid":"T016","dossierhouder": "Ziekenhuizen, medische centra en klinieken","gegevenscategorie": "Behandelgegevens","opvrager": "Verpleging en verzorging"},
      {"toestemmingsid":"T017","dossierhouder": "Ziekenhuizen, medische centra en klinieken","gegevenscategorie": "Behandelgegevens","opvrager": "Geestelijke gezondheidszorg (GGZ)"},
      {"toestemmingsid":"T018","dossierhouder": "Ziekenhuizen, medische centra en klinieken","gegevenscategorie": "Behandelgegevens","opvrager": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)"},
      {"toestemmingsid":"T019","dossierhouder": "Verpleging en verzorging","gegevenscategorie": "Behandelgegevens","opvrager": "Huisartsen, huisartsenposten, ziekenhuizen, medische centra, klinieken, geestelijke gezondheidszorg (GGZ), verpleging en verzorging, laboratoria en diagnostische centra"},
      {"toestemmingsid":"T020","dossierhouder": "Verpleging en verzorging","gegevenscategorie": "Behandelgegevens","opvrager": "Apotheken"},
      {"toestemmingsid":"T021","dossierhouder": "Verpleging en verzorging","gegevenscategorie": "Behandelgegevens","opvrager": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)"},
      {"toestemmingsid":"T022","dossierhouder": "Laboratoria en diagnostische centra","gegevenscategorie": "Uitslagen","opvrager": "Huisartsen, huisartsenposten, ziekenhuizen, medische centra, klinieken, geestelijke gezondheidszorg (GGZ), laboratoria en diagnostische centra"},
      {"toestemmingsid":"T023","dossierhouder": "Laboratoria en diagnostische centra","gegevenscategorie": "Uitslagen","opvrager": "Apotheken"},
      {"toestemmingsid":"T024","dossierhouder": "Laboratoria en diagnostische centra","gegevenscategorie": "Uitslagen","opvrager": "Verpleging en verzorging"},
      {"toestemmingsid":"T025","dossierhouder": "Laboratoria en diagnostische centra","gegevenscategorie": "Uitslagen","opvrager": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)"},
      {"toestemmingsid":"T026","dossierhouder": "Geestelijke gezondheidszorg (GGZ)","gegevenscategorie": "Behandelgegevens","opvrager": "Huisartsen en huisartsenposten"},
      {"toestemmingsid":"T027","dossierhouder": "Geestelijke gezondheidszorg (GGZ)","gegevenscategorie": "Behandelgegevens","opvrager": "Apotheken"},
      {"toestemmingsid":"T028","dossierhouder": "Geestelijke gezondheidszorg (GGZ)","gegevenscategorie": "Behandelgegevens","opvrager": "Ziekenhuizen, medische centra, klinieken, laboratoria en diagnostische centra"},
      {"toestemmingsid":"T029","dossierhouder": "Geestelijke gezondheidszorg (GGZ)","gegevenscategorie": "Behandelgegevens","opvrager": "Verpleging en verzorging"},
      {"toestemmingsid":"T030","dossierhouder": "Geestelijke gezondheidszorg (GGZ)","gegevenscategorie": "Behandelgegevens","opvrager": "Geestelijke gezondheidszorg (GGZ)"},
      {"toestemmingsid":"T031","dossierhouder": "Geestelijke gezondheidszorg (GGZ)","gegevenscategorie": "Behandelgegevens","opvrager": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)"},
      {"toestemmingsid":"T032","dossierhouder": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)","gegevenscategorie": "Behandelgegevens","opvrager": "Huisartsen, huisartsenposten, ziekenhuizen, medische centra, klinieken, geestelijke gezondheidszorg (GGZ), verpleging en verzorging, laboratoria en diagnostische centra"},
      {"toestemmingsid":"T033","dossierhouder": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)","gegevenscategorie": "Behandelgegevens","opvrager": "Apotheken"},
      {"toestemmingsid":"T034","dossierhouder": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)","gegevenscategorie": "Behandelgegevens","opvrager": "Overige zorg (tandartsen, paramedici, jeugdgezondheidszorg)"}
    ];
/*	
	Constant: imageXXX (imgXXX)
	
	
	Beschrijving:
	
	Dit zijn FontAwesome images die door de hele applicatie heen gebruikt worden. Door ze op globaal te declareren en definiëren is een nieuwe versie/migratie makkelijker
*/
const imgencounter 	= 	'<i class="fas fa-people-arrows"></i>';
const imgpatient		=	'<i class="fas fa-address-card"></i>';
const imgpractit		=	'<i class="fas fa-user"></i>';
const imgtask			=	'<i class="fas fa-tasks"></i>';
const imgactdef		=	'<i class="fas fa-clipboard-list"></i>';
const imgconfig		=	'<i class="fas fa-cog"></i>';
const imgmain			=	'<i class="fas fa-people-arrows"></i>';
const imgobserv		=	'<i class="fas fa-chart-line"></i>';
//
/*	

	function:	toonheader() 
	
	Functionaliteit:
	Vul de kop boven de HTML-schermen van GGZLab
*/
function toonheader(){ //Vul de schermtitel in
	document.getElementById("appname").innerHTML ="<b>" +appname+"</b>";
}
/*	
	function:	kieslogo(xisid)
	
	Functionaliteit: 
	
	Om met hetzelfde basisscherm voor verschillende zorgaanbieders de patientregistratie te kunnen nabootsen moet het mogelijk zijn om van titel (zorgaanbieder) en logo te kunnen wisselen. Met kieslogo(xisid) is deze logowisseling mogelijk

	Parameters: 	
	xisid	-	Verwijzing naar xisid in de het globale array "xissen".

	Returns: 	
	de filenaam van het logo-image
*/
//Kies het juiste logo-plaatje
function kieslogo(xisid){
	plaatje = "img/"+xissen[xisid-1].img;
	if (plaatje != "") {
		return plaatje;
	} else {
		alert("Geen logo bij deze keuze gevonden!");
	}	
}
//
/* 	
	function: thisfilename()
	
	Functionaliteit:
	
	Geeft de (fysieke) naam van de pagina. Dit is handig als "onderwater" mogelijkheid bij ondersteuning en debuggen.
	
	Returns:  
	de (fysieke) naam van de pagina. 
 */
function thisfilename(){
 var thisurl = window.location.pathname;
 var filename = thisurl.substring(thisurl.lastIndexOf('/')+1);
 return(filename);
}
/* 
	function: doheader()
	
	Functionaliteit:
	
	Opmaken van de bovenbalk die in ieder scherm terugkomt.
*/
function doheader() {
	//document.getElementById("appname").innerHTML = "<h4>&nbsp &nbsp"+appname+"&nbsp"+appimg+"("+thisfilename+")</h4>";
}
//
/* 
	function: gopatreg()
	
	Functionaliteit:
	
	Doorklikken naar de patientregistratie
*/
 function gopatreg(){
	window.location.href = "ggzpatregv08.html";
}
//
/* 
	function: gomonitor()
	
	Functionaliteit:
	
	Doorklikken naar monitoring
*/
 function gomonitor() {
	//window.location.href = "ggzmonitorv11.html";
	monwin = window.open("ggzmonitorv11.html", 'GGZMonitor', 'location=1,status=1,scrollbars=1');
 } 
//
/* 
	function: gomitz()
	
	Functionaliteit:
	
	Doorklikken naar MijnMitz
*/
 function gomitz() {
	window.location.href = "ggzmitzpag1v06.html";
 } 
//
/* 
	function: goconfig()
	
	Functionaliteit:
	
	Doorklikken naar configuratiepagina's
*/
function goconfig(){ 
	window.location.href = "ggzconfigovzv02.html";
}
//
/* 	
	function: goinfo()

	Functionaliteit:
	
	Doorklikken naar de informatie-pagina
*/
function goinfo(){
	window.location.href = "ggzinfov01.html";
}
//
/* 	
	function: gonatdocs()

	Functionaliteit:
	
	Doorklikken naar de NaturalDocs index.html voor technische (Detail-) info over GGZLab
*/
function gonatdocs(){
	window.location.href = "documentation/index.html";
}
//
/* 	
	function: datumtijd()
	
	Functionaliteit:
	
	Geef de actuele datum+tijd tot op de seconde nauwkeurig
	
	Returns: 
	
	De actuele datum en tijd in YYY-MM-DDThh:mm:ss formaat
*/	
function datumtijd(){
	let currentdate = new Date(); 
    let datetime 	= 	currentdate.getFullYear() 	+ 	"-" 
					+ 	(currentdate.getMonth()+1) 	+	"-"
					+	currentdate.getDate() 		+ 	"T"
					+ 	currentdate.getHours() 		+ 	":"  
					+ 	currentdate.getMinutes() 	+ 	":" 
					+ 	currentdate.getSeconds();
	return datetime;
}
/* 	

	function: splitdatetime()
	
	Functionaliteit
	
	Splitst een datetimestring in twee stukken. 
	
	Parameters:
	p1 - datetimestring als input
	
	Returns: 
	Een array met twee elementen. dtarr[0] is de datum en dtarr[1] de tijd tot op de seconde.
*/
function splitdatetime(datetimestr){
	let dtarr = datetimestr.substr(0,19);
	dtarr = dtarr.split('T');
	return dtarr; 
}
/* 	
	function: domelding(meldtekst)
	
	Functionaliteit:
	
	Geeft meldtekst weer op het scherm op de plek van de <div> "result"
	
	Parameters:
		Meldtekst	-	de melding die getoond moet worden
		
	Relatie met de GUI:
		De div "result" moet in het scherm gedefinieerd zijn.
*/
function domelding(meldtekst) {
	document.getElementById("result").innerHTML  = meldtekst;
}