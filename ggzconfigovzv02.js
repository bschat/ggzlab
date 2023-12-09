/*
	File:	GGZConfigovzvXX.js
	
	doel: 	 
	GGZConfigovz bouwt het eerste scherm met beheer-functies voor het GGZLab. Vanuit onderhoudbaarheid is javascript-code zoveel mogelijk gescheiden van de HTML instructies. Daardoor hoort bij dit javascript-bestand een html-scherm GGZConfigovzvXX.html  
*/

/*	
	function: checkarray()
	
	Functionaliteit: 
	
	Gegevensopslag vindt in GGZLab plaats met gebruikmaking van LocalStorage. Hierin worden gegevens in JSON-formaat opgeslagen. Om ze actief te gebruiken worden de gegevens benaderd als JSON-array. Deze arrays kunnen in het scherm GGZConfigovz bekeken worden en (met uitzondering van enkele) worden ge-exporteerd of ge-importeerd. Checkarray controleert het door de gebruiker gekozen array voor bekijken/export/import. Interne arrays (als code opgenomen in ggzlabvXX.js) kunnen niet ge-exporteerd of geimporteerd worden omdat wijzigingen toch niet worden doorgevoerd.
	
	Relaties met de GUI:
	
	selentity (SELECT button) - bepaalt welke dataset ("entiteit")  er bekeken/ge-exporteerd/ge-importeerd moet worden
	
	importbutton - wordt disabled of enabled afhankelijk van de keuze
	
	exportbutton - wordt disabled of enabled afhankelijk van de keuze
		
*/
function checkarray(){ //
	var tdataset 	= document.getElementById('selentity').value;
	switch(tdataset) {
		case "xissen":
			$("#importbutton").attr("disabled", true);
			break;
		case "burgerarray":
			$("#importbutton").attr("disabled", false);
			break;
		case "patientarray":
			$("#importbutton").attr("disabled", false);
			break;
		case "toestmog":
			$("#importbutton").attr("disabled", true);
			break;
		case "autorisatiearray":
			$("#importbutton").attr("disabled", false);
			break;
		case "animarray":
			$("#importbutton").attr("disabled", false);
			break;
		default:
			alert("checkarray aangeroepen met incorrecte waarde!");
	}//switch	
}
//
/*	
	function: showarray()
	
	Functionaliteit: 
	
	Als de gebruiker een array gekozen heeft om te bekijken voert deze functie het volgende uit:
	
		1 - indien het array mogelijk nog niet geladen ("actief") is, haal het dan op uit LocalStorage;
		
		2 - kijk of het geladen array tenminste 1 element heeft, zoniet geef dat dan aangeroepen
		
		3 - laadt de elementen van het array in de tabel door "populatetable" aan te roepen met de juiste parameters
			
*/
function showarray(){
	var tdataset 	= document.getElementById('selentity').value;
	switch(tdataset) {
		case "xissen":
			populatetable(xissen);
			break;
		case "burgerarray":
			let burgerarray	=	localStorage.getItem('burgerarray') ?
				JSON.parse(localStorage.getItem('burgerarray')) : [];
			if (burgerarray.length === 0) {
				alert("geen geregistreerde burgers gevonden");
			} else {
				populatetable(burgerarray);
			}//else	
			break;
		case "patientarray":
			let patientarray	=	localStorage.getItem('patientarray') ?
				JSON.parse(localStorage.getItem('patientarray')) : [];
			if (patientarray.length === 0) {
				alert("geen geregistreerde patienten gevonden");
			} else {
				populatetable(patientarray);
			}
			break;
		case "toestmog":
			populatetable(toestmog);
			break;
		case "autorisatiearray":
			let autorisatiearray	=	localStorage.getItem('autorisatiearray') ?
				JSON.parse(localStorage.getItem('autorisatiearray')) : [];
			if (autorisatiearray.length === 0) {
				alert("geen toestemmingen gevonden");
			} else {	
				populatetable(autorisatiearray);
			}	
			break;
		case "animarray":
			let animarray	=	localStorage.getItem('animarray') ?
				JSON.parse(localStorage.getItem('animarray')) : [];
			if (animarray.length === 0) {
				alert("geen animaties gevonden");
			} else {	
				populatetable(animarray);
			}
			break;
		default:
			alert("showarray aangeroepen met incorrecte waarde!");
	}//switch	
}// functie
//
/*	
	function: populatetable(tarray)
	
	
	Functionaliteit: 
	
	Haal alle elementen op van het array "tarray" en vul de tabel met de gegevens. De kolomkoppen worden gelijk aan de attribuutnamen van de waarden in het array
	
	Parameters:
	
	tarray - naam van het array waarvan de elementen getoond worden. Het array moet actief zijn!
	
	
	Relaties met de GUI:
	
	lijsttabel - de te genereren HTML-tabel
		
*/
function populatetable(tarray){ 
	$("#lijsttabel thead").empty();
	$("#lijsttabel tbody").empty();
	var descript 	= $("#selentity option:selected").text();
	document.getElementById("caption1").innerHTML	=	"overzicht " + descript;
	let trow		=	tarray[0];
	let tregel 		=	"<tr class='firstRow'>";
	for (let [key, value] of Object.entries(trow)) {
		tregel += "<TH>"+key+"</TH>";
	}//for
	tregel 		+=	"</tr>";
	$("#lijsttabel thead").append(tregel);
	for (let i=0;i<tarray.length;i++) {
		dregel= "<tr>";
		drow = tarray[i];
		const waarden = Object.values(drow);
		for (let j=0;j<waarden.length;j++) {
			dregel = dregel + "<td>"+waarden[j]+"</td>";
		}//for
		dregel	= dregel + "</tr>";
		$("#lijsttabel tbody").append(dregel);
	}//for
}//function
//
/*	
	function: exportarray()
	
	Functionaliteit:
	
	Exporteer alle elementen van het gekozen array naar een (json-)tekstbestand. Deze functie maakt gebruik van de (hierna volgende) functie exporttabel(tarray) en zorgt voor de controles en de voorbereiding.
*/
function exportarray(){
	var tdataset 	= document.getElementById('selentity').value;
	switch(tdataset) {
		case "xissen":
			exporttabel(xissen);
			break;
		case "burgerarray":
			let burgerarray	=	localStorage.getItem('burgerarray') ?
				JSON.parse(localStorage.getItem('burgerarray')) : [];
			if (burgerarray.length === 0) {
				alert("geen geregistreerde burgers gevonden");
			} else {
				exporttabel(burgerarray);
			}//else	
			break;
		case "patientarray":
			let patientarray	=	localStorage.getItem('patientarray') ?
				JSON.parse(localStorage.getItem('patientarray')) : [];
			if (patientarray.length === 0) {
				alert("geen geregistreerde patienten gevonden");
			} else {
				exporttabel(patientarray);
			}
			break;
		case "toestmog":
			exporttabel(toestmog);
			break;
		case "autorisatiearray":
			let autorisatiearray	=	localStorage.getItem('autorisatiearray') ?
				JSON.parse(localStorage.getItem('autorisatiearray')) : [];
			if (autorisatiearray.length === 0) {
				alert("geen toestemmingen gevonden");
			} else {	
				exporttabel(autorisatiearray);
			}	
			break;
		case "animarray":
			let animarray	=	localStorage.getItem('animarray') ?
				JSON.parse(localStorage.getItem('animarray')) : [];
			if (animarray.length === 0) {
				alert("geen animaties gevonden");
			} else {	
				exporttabel(animarray);
			}
			break;
		default:
			alert("exportarray aangeroepen met incorrecte waarde!");
	}//switch	
}// functie
//
/*	
function: exporttabel(tarray)
    
	
	Functionaliteit:

	Exporteer alle elementen van het array tarray naar een (json-)tekstbestand.
	
	Parameters:
		tarray	-	naam van het array waarvan de elementen getoond worden. Het array moet actief zijn!
*/
function exporttabel(tarray){ 
	var descript 	= $("#selentity option:selected").text();
	let exportstr	= JSON.stringify(tarray);
	let filenaam	= descript.replace(/\s+/g, '-').toLowerCase();
	downloadBlob(exportstr,filenaam,"text/plain;;charset=utf-8;");
}//function
//
/*
function: downloadBlob(content,filename,contentType)

	Functionaliteit:
	
	Exporteer <content> naar een bestand met naam <filename> en contenttype <contentType>
	
	Zie: 
	
	https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
	
 */
function downloadBlob(content, filename, contentType) {
  // Create a blob
  var blob = new Blob([content], { type: contentType });
  var url = URL.createObjectURL(blob);

  // Create a link to download it
  var pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', filename);
  pom.click();
}

//
function importarray(arrayname) {
	let inpfile 	= document.getElementById('inputfile').files[0];	
	if (document.getElementById('inputfile').files.length == 0 ){
		alert("Om een gegevenset te importeren moet u het invoerbestand geselecteerd hebben!");
	} else {
		let filename 	= inpfile.name;
		switch(arrayname) {
			case 'burgerarray':				
				if (confirm("Het laden overschrijft de oude gegevensset 'burgerarray' en verwijdert alle elementen in 'patientarray'. Het bestand wordt niet gecontroleerd op juistheid. Wilt u toch doorgaan?") ==true){
					let reader=new FileReader();
					reader.readAsText(inpfile);
					reader.onload=function(){
						let burgerarray = [];
						let patientarray = [];
						burgerarray = JSON.parse(reader.result);
						localStorage.setItem('burgerarray',JSON.stringify(burgerarray));
						localStorage.setItem('patientarray',JSON.stringify(patientarray));
						alert("Gegevensset 'burgerarray' geladen van '" + filename + "'. Gegevensset 'patientarray' gewist.");
					}//onload
					reader.onerror=function() {
						alert("Fout bij het inlezen van '"+ filename+"'. Foutmelding: " + reader.error+".");
					}//on error
				}//if confirm	
			break;
			default:
				alert("Foute aanroep importarray!");
		}//switch
	}//else	
}
function exportconfig(){ 
	let burgerarray	=	localStorage.getItem('burgerarray') ?
				JSON.parse(localStorage.getItem('burgerarray')) : [];
	let patientarray	=	localStorage.getItem('patientarray') ?
				JSON.parse(localStorage.getItem('patientarray')) : [];					
	let autorisatiearray	=	localStorage.getItem('autorisatiearray') ?
				JSON.parse(localStorage.getItem('autorisatiearray')) : [];	
	var xissenobj = new Object();
	xissenobj.name = 'xissen';
	xissenobj.xissen = xissen;
	var toestmogarrobj = new Object();
	toestmogarrobj.name= 'toestmog';
	toestmogarrobj.toestmog = toestmog;
	var burgerarrayobj = new Object();
	burgerarrayobj.name= 'burgerarray';
	burgerarrayobj.burgerarray = burgerarray;
	var config = []; //maak een nieuw en leeg array om alle configuratiegegevens in op te nemen. Zet vervolgens alle arrays als object in het configuratiearray en maak er json van.
	config.push(xissenobj);
	config.push(toestmogarrobj);
	config.push(burgerarrayobj);
	var descript 	= 'configuratie-export';
	let exportstr	= JSON.stringify(config);
	let filenaam	= descript.replace(/\s+/g, '-').toLowerCase();
	downloadBlob(exportstr,filenaam,"text/plain;;charset=utf-8;");
}
//
function importconfig(){
let inpfile 	= document.getElementById('inputconfig').files[0];	
	if (document.getElementById('inputconfig').files.length == 0 ){
		alert("Om een configuratie te importeren moet u het invoerbestand geselecteerd hebben!");
	} else {
		if (confirm("Het laden overschrijft de nieuwe configuratie alle bestaande gegevens. Het bestand wordt niet gecontroleerd op juistheid. Wilt u toch doorgaan?") ==true){
			let filename = inpfile['name'];
			let reader=new FileReader();
			let newxissen = [];
			let newtoestmog = [];
			let newburgerarray=[];
			reader.readAsText(inpfile);
			reader.onload=function(){
			let importcfg = JSON.parse(reader.result);
				console.log(importcfg +" Typeof: "+typeof(importcfg));
				for (i=0;i<importcfg.length;i++){
					console.log(importcfg[i].name);
					//console.log(importcfg[i]+  " - - "+ typeof(importcfg[i]));
					//console.log(importcfg[i].name);
					if (importcfg[i].name == 'xissen') {
						newxissen = importcfg[i].xissen;	
					}
					if (importcfg[i].name == 'toestmog'){
						newtoestmog = importcfg[i].toestmog;
					}
					if (importcfg[i].name == 'burgerarray'){
						newburgerarray = importcfg[i].burgerarray;
					}
				}
				console.log(newxissen);
				console.log(newtoestmog);
				console.log(newburgerarray);
				//alert("Gehele configuratie geladen van '" + filename + "'. Oude configuratie overschreven.");
			}//onload
			reader.onerror=function() {
				alert("Fout bij het inlezen van '"+ filename+"'. Foutmelding: " + reader.error+".");
			}//on error
		}//if confirm	
	}//else		
}
