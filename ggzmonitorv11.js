/*	
	File:	GGZMonitorvXX.js
	
	Doel:  
	
	GGZMonitor laat met animaties zien welke gegevensstromen er lopen als er uitwisseling plaatsvindt. De uitwisseling zelf wordt geactiveerd vanuit andere programma's. Als ggzmonitor naast die programma's is opgestart en geactiveerd starten/stoppen de animaties vanzelf.
	
	ggzmonitorvXX.js hoort bij ggzmonitorvXX.html. Voor onderhoudbaarheid is ervoor gekozen om de javascript-code in aan afzonderlijk bestand onder te brengen
	
	Relaties met de GUI:
	
	de animaties vinden plaats in de 2D context van een canvas welke in GGZMonitorvXX.html gedefinieerd is. 
	GGZMonitor gaat uit van de beschikbaarheid van **ctx** als 2D context op een canvas. Het volgende wordt gedefinieerd:
	
	-	var cvs = document.getElementById("canvas");
	
	-	var ctx = cvs.getContext("2d");
		
	De monitoring functie bekijkt en bewerkt een localstorage "animarray", hierin staan de uit te voeren animaties, dus mijnmitz,askxis,xisasks en askmitz
*/
//
/*	Constants: globale variabelen
	cvs	-	het canvas element in dit scherm
	ctx	-	de 2d context van cvs 
	Zowel cvs als ctx moeten op globaal niveau gedeclareerd en gedefinieerd zijn om animatevXX.js zijn werk te kunnen laten doen. Declaratie/definitie gebeurt in de html file.
*/

/*	
	function: drawconfig()
	
	Functionaliteit:
	
	Tekent alle zorgaanbieders op het canvas (links en rechts langs de randen) en de centrale component zoals LSP of Mitz (onderin, midden). Het xisid is een (lelijke) identifier die de identificatie, het type én de plaatsing in het canvas combineert. Idealiter wordt dit xisid vervangen door een betekenisloze identifier (GUID) + xistype + xispositie. Nu dus in één!
*/
    function drawconfig() { 
		//We beginnen met het logo van DEGGZ. Dit het is primaire GGZ vanwaar we de meeste scenario's bekijken				
		var ypos = 10;
		var xpos = 220;
		var xislogo = new Image();
		xislogo.src = 'img/'+ xissen[0].img;
		ctx.drawImage(xislogo,xpos,ypos,160,40); //Het connectiepunt bij DEGGZ ligt dus op x = 220+ (160/2) = 300 en y= 10+40=50. Om het logo niet te raken wordt het y=55	
		//teken Mitz in het midden onderin
		var mitzlogo=new Image();
		mitzlogo.src = 'img/logomitz.png';
		ctx.drawImage(mitzlogo,250,590,100,100); //Connectiepunt bij Mitz ligt op x = 250+(100/2)= 300 en y=590. Om het logo niet te raken wordt het y=585
		//Nu de overige XISsen
		for(var i=1;i<xissen.length;i++){
			if (i<6) {
				//Vijf GGZen aan de linkerkant
				var ypos = 5 +(105*i);
				var xislogo = new Image();
				xislogo.src = 'img/'+ xissen[i].img;
				ctx.drawImage(xislogo,50,ypos,160,40);	
				//Het connectiepunt ligt bij deze XISsen dus op x = 50+160=210 en op y=ypos+20 waarin ypos=5+(105*(xisid-1))
			} else {
				//2x Huisarts aan rechterkant en 2x apotheek plus 1x ziekenhuis
				var ypos = 5 +(105*(i-5));
				var xislogo = new Image();
				xislogo.src = 'img/'+ xissen[i].img;
				ctx.drawImage(xislogo,390,ypos,160,40);
				//En hier ligt het connectiepunt op  x=390 en y=ypos+20 waarin ypos=5+(105*(xisid-5))
			}//else
		}//for
	}//function	
///
/*	
	function: askmitz(xisid,janee)
	
	Functionaliteit:
	
	Animatie bij een bevraging op toestemming van Mitz. Bevraging is een request vanuit een XIS met xisid. Bij janee="ja" is de response positief (groen), bij "nee" (en al het andere) negatief (rood).
	
	
	Parameters:
		xisid	-	de identificatie van de zorgaanbieder (het "xis")
		janee	-	"ja" (positief) of "nee" (negatief) *Let op: dit is geen boolean!*
*/
function askmitz(xisid,janee) { //Animatie bij een bevraging op toestemming van Mitz. Bevraging is een request vanuit een XIS met xisid. Bij janee="ja" is de response groen, bij "nee" (en al het andere) rood.
	//console.log("askmitz! xisid: "+xisid+". janee: "+ janee);
	let requestpattern		= [7,7]; //korte streepjes
	let acceptpattern		= [];//doorgetrokken streep
	let rejectpattern		= [25,10]; //langere streepjes 
	let MitzX  				= 300;
	let MitzY  				= 585;
	let dikte  				= 5;//lijndikte animaties
	let achtergrondkleur 	= "white"; //achtergrondpattern ("dash") is altijd [] dus dat zetten we in de betreffende animatie
	let kleur1 				= "#4285f4"; //We gebruiken lichtblauw om een "request" om toestemming weer te geven
	let pattern1			= requestpattern;
	let kleur2 = "#ea4335";	//felrood
	let pattern2			= rejectpattern;
	if (janee == "ja") {
		kleur2 = "#34a853";//felgroen
		pattern2		= acceptpattern;
	}//if
	if (xisid == 1) {// Het request komt van DEGGGZ - een rechte communicatie naar omlaag
		DEGGZx = 300;
		DEGGZy = 55;
		animateverticalcomm(dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,DEGGZx,DEGGZy,MitzY,0);
	}//if 	
	if ((xisid > 1) && (xisid <7)) {//van een xis links naar Mitz (RD);
		var connX = 215; //connector aan de rechterkant van het logo, 5 pix van de rechterrand om overtekenen te voorkomen
		var connY = 25 +(105*(xisid-1));//Dit kan door het betekenisvol nummeren van xisid's. Niet mooi!
		MitzX=MitzX-(xisid*dikte);//zodat lijnen elkaar niet overlappen
		//De call is: animatecomm(vorm,dikte,achtergrondkleur,kleur1,kleur2,x1,y1,x2,y2,ratio) hierin is ratio altijd 0 (nodig vanwege recursie!).
		//console.log("askmitz <6!");
		animatecomm("RD",dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,connX,connY,MitzX,MitzY,0);
	}//if
	if	((xisid>=7) && (xisid<11)){//van een xis rechts van het lsp (LD), maar niet MijnMitz;
		var connX = 385; //connector aan de rechterkant van het logo, 5 pix op afstand
		var connY = 25 +(105*(xisid-6));//Dit kan door het betekenisvol nummeren van xisid's. Niet mooi!
		MitzX=MitzX+((xisid-5)*dikte);//om overlappen tegen te gaan
		//De call is: animatecomm(vorm,dikte,achtergrondkleur,kleur1,kleur2,x1,y1,x2,y2,ratio) hierin is ratio altijd 0 (nodig vanwege recursie!).
		//console.log("askmitz >6 !");
		animatecomm("LD",dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,connX,connY,MitzX,MitzY,0);
	} else {
		if (xisid==11) {
			alert("Programmeerfout! XisAsks aangeroepen met xisid = 11 (MijnMitz).");
		}
	}//else	
}//function
//
/*	
	function: xisasks(xisid,janee)
	
	Functionaliteit:
	
	Animatie bij een bevraging (request) van DEGGZ vanuit een andere zorgaanbieder. Bij janee="ja" is de response positief en komt wordt de info vanuit DEGGZ verstuurd, bij "nee" (en al het andere) is de response negatief.
	
	
	Parameters:
		xisid	-	de identificatie van de zorgaanbieder (het "xis")
		janee	-	"ja" (positief) of "nee" (negatief) *Let op: dit is geen boolean!*
*/
function xisasks(xisid,janee) {
	//console.log("xisasks: "+xisid+ ". janee: "+janee);
	let requestpattern		= [7,7]; //korte streepjes
	let acceptpattern		= [];//doorgetrokken streep
	let rejectpattern		= [25,10]; //langere streepjes 
	let ggzX  				= 300;
	let ggzY  				= 55;
	let dikte  				= 5;//lijndikte animaties
	let achtergrondkleur 	= "white";
	let kleur1 				= "#8497B0"; //grijs
	let pattern1			= requestpattern;
	let kleur2 				= "#D0446C"; //rood/paars: weigering uitwisselen info
	let pattern2			=	rejectpattern;
	if (janee == 'ja'){
		kleur2 				= "#8EF6C0"; //licht blauw/groen: uitgewisselde patientinfo
		pattern2			=	acceptpattern;
	}//if
	if ((xisid > 1) && (xisid <7)) {//van een xis links naar DEGGZ (RU);
		var connX = 215; //connector aan de rechterkant van het logo, 5 pix van de rechterrand om overtekenen te voorkomen
		var connY = 25 +(105*(xisid-1));//Dit kan door het betekenisvol nummeren van xisid's. Niet mooi!
		ggzX=ggzX-(xisid*dikte);//zodat lijnen elkaar niet overlappen
		//De call is: animatecomm(vorm,dikte,achtergrondkleur,kleur1,kleur2,x1,y1,x2,y2,ratio) hierin is ratio altijd 0 (nodig vanwege recursie!).
		//console.log("askmitz <6!");
		animatecomm("RU",dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,connX,connY,ggzX,ggzY,0);
	}//if
	if	((xisid>=7) && (xisid<11)){//van een xis rechts van het lsp (LU), maar niet MijnMitz;
		var connX = 385; //connector aan de rechterkant van het logo, 5 pix op afstand
		var connY = 25 +(105*(xisid-6));//Dit kan door het betekenisvol nummeren van xisid's. Niet mooi!
		ggzX=ggzX+((xisid-5)*dikte);//om overlappen tegen te gaan
		//De call is: animatecomm(vorm,dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,x2,y2,ratio) hierin is ratio altijd 0 (nodig vanwege recursie!).
		//console.log("askmitz >6 !");
		animatecomm("LU",dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,connX,connY,ggzX,ggzY,0);
	} else {
		if (xisid==11) {
			alert("Programmeerfout! XisAsks aangeroepen met xisid = 11 (MijnMitz).");
		}
	}//else	
}	
//
/*	
	function: askxis(xisid,janee)
	
	Functionaliteit:
	
	Animatie bij een bevraging (request) vanuit DEGGZ naar een andere zorgaanbieder. Bij janee="ja" is de response positief en komt wordt de info vanuit het XIS naar DEGGZ verstuurd, bij "nee" (en al het andere) is de response negatief.
	Parameters:
		xisid	-	de identificatie van de zorgaanbieder (het "xis")
		janee	-	"ja" (positief) of "nee" (negatief) *Let op: dit is geen boolean!*
*/
function askxis(xisid,janee) {
	//console.log("xisid: "+xisid+ ". janee: "+janee);
	let requestpattern		= [7,7]; //korte streepjes
	let acceptpattern		= [];//doorgetrokken streep
	let rejectpattern		= [25,10]; //langere streepjes 
	let ggzX  				= 300;
	let ggzY  				= 55;
	let dikte  				= 5;//lijndikte animaties
	let achtergrondkleur 	= "white";
	let kleur1 				= "#8497B0"; //grijs
	let pattern1			= requestpattern;
	let kleur2 				= "#D0446C"; //rood/paars: weigering uitwisselen info
	let pattern2			= rejectpattern;
	if (janee == "ja") {
		kleur2 				= "#8EF6C0"; //licht blauw/groen: uitgewisselde patientinfo
		pattern2			=	acceptpattern;
	}//if
	if ((xisid > 1) && (xisid <7)) {//van DEGGZ naar een xis links (DL);
		var connX = 215; //connector aan de rechterkant van het logo, 5 pix van de rechterrand om overtekenen te voorkomen
		var connY = 25 +(105*(xisid-1));//Dit kan door het betekenisvol nummeren van xisid's. Niet mooi!
		ggzX=ggzX-(xisid*dikte);//zodat lijnen elkaar niet overlappen
		//De call is: animatecomm(vorm,dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,x2,y2,ratio) hierin is ratio altijd 0 (nodig vanwege recursie!).
		console.log("askmitz <7!");
		animatecomm("DL",dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,ggzX,ggzY,connX,connY,0);
	}//if
	if	((xisid>=7) && (xisid<11)){//van DEGGZ naar een xis links (DR);
		var connX = 385; //connector aan de rechterkant van het logo, 5 pix op afstand
		var connY = 25 +(105*(xisid-6));//Dit kan door het betekenisvol nummeren van xisid's. Niet mooi!
		ggzX=ggzX+((xisid-5)*dikte);//om overlappen tegen te gaan
		//De call is: animatecomm(vorm,dikte,achtergrondkleur,kleur1,kleur2,x1,y1,x2,y2,ratio) hierin is ratio altijd 0 (nodig vanwege recursie!).
		console.log("askmitz >=7 ! Kleur2: "+kleur2);
		animatecomm("DR",dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,ggzX,ggzY,connX,connY,0);
	} else {
		if (xisid==11) {
			alert("Programmeerfout! AskXis aangeroepen met xisid = 11 (MijnMitz).");
		}//if
	}//else	
}		
//
/*	
	function: mijnmitz()
	
	Functionaliteit:
	
	animatie van de simpele (enkelvoudige) communicatie vanuit MijnMitz naar Mitz
*/
function mijnmitz(){ 
	let MitzX  				= 	300;
	let MitzY  				= 	585;
	let dikte  				= 	5;//lijndikte animaties
	let achtergrondkleur 	= 	"white";
	let kleur 				=	"black";
	let x1					=	385;
	let y1					=	550;
	animate("RD",dikte,kleur,dikte,achtergrondkleur,0,x1,y1,MitzX,MitzY);
}
//
/*	
	function: clean()
	
	Functionaliteit:
	
	Maak het scherm schoon en teken de xissen (GGZen, huisartsen enz) en de centrale component (LSP, Mitz, enz)
*/
function clean(){
	//console.log("clean!");
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	ctx.strokeStyle="black";
	ctx.fillStyle="white";
	drawconfig();	//Teken de vijf GGZ-instellingen, de twee huisartsen, drie apotheken en het LSP.
}
//
/*	
	function: monitor()
	
	Functionaliteit:
	
	"Watchdog"-proces dat in animarray (bewaard/opgehaald in local storage) kijkt welke animaties er nog uitgevoerd moeten worden. Geeft vervolgens de animatie(s) die nog niet zijn uitgevoerd door aan de animatie-engines in animetevXX.js
	
	Gegevensverzamelingen:
	
	animarray - Localstorage met alle uit te voeren, uitvoerende en uitgevoerde animaties.  
*/
function monitor() { 
	//Kijk welke animaties er nog niet zijn getoond in de monitor
	let animarray		=	localStorage.getItem('animarray') ?
		JSON.parse(localStorage.getItem('animarray')) : [];
	for (let i=0;i<animarray.length;i++) {
		//console.log(aanmeldlist[i]);
		if (animarray[i].done == false) {//animatie nog niet getoond
			let animatie 		=	animarray[i].animatie;
			let xisid			=	animarray[i].xisid;
			let resultaat		=	animarray[i].resultaat; //resultaat is "ja" of "nee"
			switch(animatie) {
				case "mijnmitz":
					mijnmitz();
				break;
				case "askxis":
					askxis(xisid,resultaat);
				break;
				case "xisasks":
					xisasks(xisid,resultaat);
				break;
				case "askmitz":
					askmitz(xisid,resultaat);
				break;
				default:
					alert("Programmeerfout. Animarray bevat onbekende animatie: "+animatie+" !");
			}//switch
			animarray[i].done = true;
			localStorage.setItem('animarray',JSON.stringify(animarray));
		}//if	
	}//for
}//function
///
/*	
	function: startmonitor()
	
	Functionaliteit:
	
	Maakt het scherm schoon en start vervolgens het monitoring watchdog-proces
*/
function startmonitor(){
 clean();
 intervalid = window.setInterval(monitor,2000);
 document.getElementById("startmonitor").disabled=true;
 document.getElementById("stopmonitor").disabled=false;
}
//
/*	
	function: stopmonitor()
	
	Functionaliteit:
	
	Stopt het monitoring watchdog-proces
*/
function stopmonitor(){
 window.clearInterval(intervalid);
 document.getElementById("startmonitor").disabled=false;
 document.getElementById("stopmonitor").disabled=true;
}
//
/*	
	function: drawlegend()
	
	Functionaliteit: vult het pop-up scherm "legendcanvas"  met de legenda waarin de verschillende kleuren/streepsoorten van de communicatie worden toegelicht
	
	Relaties met de GUI:
	
	Het html-element "legendcanvas" wordt gebruikt om de verschillende lijnstijlen en -kleuren met hun betekenis weer te geven. Via buttons op het monitor-scherm kan het canvas zichtbaar gemaakt en verborgen worden.	
*/
function drawlegend(){
	const lgcanvas = document.getElementById("legendcanvas");
	const ctx2 = lgcanvas.getContext("2d");
	ctx2.lineWidth = 5;	
	let requestpattern		= [7,7]; //korte streepjes
	let acceptpattern		= [];//doorgetrokken streep
	let rejectpattern		= [25,10]; //langere streepjes 
	let achtergrondkleur 	= "white";
	let inforequestkleur	= "#8497B0"; //grijs (request voor patientinformatie)
	let inforejectkleur		= "#D0446C"; //rood/paars: weigering uitwisselen info
	let infotransferkleur 	= "#8EF6C0"; //licht blauw/groen: uitgewisselde patientinfo
	let permrequestkleur 	= "#4285f4"; //We gebruiken lichtblauw om een "request" om toestemming weer te geven
	let permrejectkleur	    = "#ea4335"; //felrood.  Toestemming geweigerd
	let permpermitkleur		= "#34a853"; //felgroen. Toestemming verleend
	//
	ctx2.beginPath();
	ctx2.moveTo(10,30);
	ctx2.setLineDash(requestpattern);
	ctx2.strokeStyle=permrequestkleur;
	ctx2.lineTo(200,30);
	ctx2.stroke();
	ctx2.fillText("Verzoek om toestemming (aan Mitz)", 210, 35);
	//
	ctx2.beginPath();
	ctx2.moveTo(10,60);
	ctx2.setLineDash(acceptpattern);
	ctx2.strokeStyle=permpermitkleur;
	ctx2.lineTo(200,60);
	ctx2.stroke();
	ctx2.fillText("Toestemming gegeven (door Mitz)", 210, 65);
	//
	ctx2.beginPath();
	ctx2.moveTo(10,90);
	ctx2.setLineDash(rejectpattern);
	ctx2.strokeStyle=permrejectkleur;
	ctx2.lineTo(200,90);
	ctx2.stroke();
	ctx2.fillText("Toestemming afgewezen (door Mitz)", 210, 95);
	//
	ctx2.beginPath();
	ctx2.moveTo(10,120);
	ctx2.setLineDash(requestpattern);
	ctx2.strokeStyle=inforequestkleur;
	ctx2.lineTo(200,120);
	ctx2.stroke();
	ctx2.fillText("Patientinformatie opgevraagd", 210, 125);
	//
	ctx2.beginPath();
	ctx2.moveTo(10,150);
	ctx2.setLineDash(acceptpattern);
	ctx2.strokeStyle=infotransferkleur;
	ctx2.lineTo(200,150);
	ctx2.stroke();
	ctx2.fillText("Patientinformatie wordt geleverd", 210, 155);
	//
	ctx2.beginPath();
	ctx2.moveTo(10,180);
	ctx2.setLineDash(rejectpattern);
	ctx2.strokeStyle=inforejectkleur;
	ctx2.lineTo(200,180);
	ctx2.stroke();
	ctx2.fillText("Aanvraag patientinformatie geweigerd", 210, 185);
	//
	ctx2.beginPath();
	ctx2.moveTo(10,210);
	ctx2.setLineDash([]);
	ctx2.strokeStyle="black";
	ctx2.lineTo(200,210);
	ctx2.stroke();
	ctx2.fillText("MijnMitz-Mitz communicatie", 210, 215);
}