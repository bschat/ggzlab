/*	
	File:	animatevXX.js
	
	Doel: 	 
	Deze library bevat alle functies in het animation framework voor het GGZLab.
	
	Synchroon/Asynchroon:
	
	De functies zijn asynchroon. Dit betekent dat het tekenwerk zich los van de aanroepende functies voortzet!
	
	Relaties met de GUI: 
	
	Deze library gaat uit van de beschikbaarheid van **ctx** als 2D context op een canvas. Aanroepende programma's moeten dus het volgende gedefinieerd hebben:
	
	-	var cvs = document.getElementById("canvas");
	
	-	var ctx = cvs.getContext("2d");
	
*/
//
//
/*	
	function: drawline(vorm,dikte1,kleur1,dikte2,kleur2,x1,y1,x2,y2,ratio)

	Functionaliteit: 
	
	Drawline tekent de verbinding tussen twee punten door twee haakse lijnen. Het traject wordt tweemaal getekend, zodat (door de tweede keer de inktkleur gelijk te maken aan de achtergrondkleur) de verbinding ook weer verwijderd kan worden.
	
	Parameters:
		vorm	-	De verbinding kan acht verschillende vormen hebben (een "L" in vier posities, met steeds twee mogelijke richtingen)de vorm en de richting van de haakse lijnen. RD (naar rechts en dan omlaag), LD (naar links en omlaag), DL (omlaag en dan naar links), DR (omlaag en dan naar rechts),	UL(omhoog en dan naar links), UR (omhoog, rechts), LU (Links en dan omhoog), RU (rechts, omhoog).
		
		dikte1	-	de dikte (breedte) van de eerste lijn
		
		kleur1	-	de kleur van de eerste lijn	
		
		dikte2	- 	de dikte (breedte) van de tweede lijn
		
		kleur2	-	de kleur van de tweede lijn	
		
		x1,y1	-	het eerste punt in de lijn (beginpunt) is x1,y1. 
		
		x2,y2	-	het eindpunt van de lijn is x2,y2.
		
		ratio	-	de mate waarin de opeenvolgende animaties gevorderd zijn. De animaties beginnen bij ratio=0 en vorderen dan bij iedere iteratie naar een volgende stap Ratio = 0-1 : het eerste lijnstuk. Ratio = 1-2 : het tweede lijnstuk.  Ratio = 2-3: het wissen (overtekenen) van het eerste lijnstuk. Ratio = 3-4: wissen (overtekenen) van het tweede lijnstuk
*/
function drawline(vorm,dikte1,kleur1,dikte2,kleur2,x1,y1,x2,y2,ratio) {
	ctx.lineCap = "square"; //zorg dat de rechte hoek tussen de lijnstukken netjes afgewerkt zijn
	switch(vorm) {
		case "RD":   //Rechts-Omlaag
			if (ratio<=4) {//twee lijnstukken die twee keer getekend worden ==> 4. Is ratio>4 dan stoppen we
				if (ratio<=1) {//de eerste lijn is horizontaal en in kleur 1
					ctx.lineWidth = dikte1;
					ctx.strokeStyle=kleur1;
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 + ratio * (x2-x1);
					ctx.lineTo(x2,y1);//horizontaal
					ctx.stroke();
				} else {
					if (ratio<=2) {//de tweede lijn is verticaal en in kleur 1
						ctx.lineWidth = dikte1;
						ctx.strokeStyle=kleur1;
						ctx.beginPath();
						ctx.moveTo(x2,y1);
						y2 = y1 + ((ratio-1) * (y2-y1));
						ctx.lineTo(x2,y2);
						ctx.stroke();
					} else {
						if (ratio<=3) { //ratio tussen 2 en 3. Dus lijn 1 in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y1);
							x2 = x1 + (ratio-2) * (x2-x1);
							ctx.lineTo(x2,y1);//horizontaal
							ctx.stroke();
						} else { //ratio tussen 3 en 4. Dus lijn 2 in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x2,y1);
							y2 = y1 + ((ratio-3) * (y2-y1));
							ctx.lineTo(x2,y2);
							ctx.stroke();
						}//else (ratio<=3) 	
					}//else (ratio <=2)
				}// else (ratio <=1)
			} else { //(ratio <=4)
				//console.log("einde drawline "+ vorm);//einde animatie
			}	
			break;
		case "LD":	//Links-Omlaag
			if (ratio <=4) {
				if (ratio <=1) {//de eerste lijn is horizontaal en in kleur 1
					ctx.lineWidth = dikte1;
					ctx.strokeStyle=kleur1;
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 - ratio * (x1-x2);
					ctx.lineTo(x2,y1);
					ctx.stroke();		
				} else { 
					if (ratio<=2) {//de tweede lijn is verticaal. Nog steeds in kleur 1
						ctx.lineWidth = dikte1;
						ctx.strokeStyle=kleur1;
						ctx.beginPath();
						ctx.moveTo(x2,y1);
						y2 = y1 + (ratio-1) * (y2-y1);
						ctx.lineTo(x2,y2);
						ctx.stroke();
					} else {
						if (ratio <=3) { //de derde lijn is hetzelfde als de eerste, maar nu in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y1);
							x2 = x1 - (ratio-2) * (x1-x2);
							ctx.lineTo(x2,y1);
							ctx.stroke();
						} else { //Lijn 2 in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x2,y1);
							y2 = y1 + (ratio-3) * (y2-y1);
							ctx.lineTo(x2,y2);
							ctx.stroke();
						}//else (ratio<=3)
					}//else (ratio <=2)
				}//else	(ratio<=1)
			} else { //(ratio <=4)
				//console.log("einde drawline "+ vorm);//einde animatie
			}		
			break;
		case "DL":	//Omlaag-Links
			if (ratio <=4) {
				if (ratio<=1) {//de eerste lijn is verticaal en in kleur 1
					ctx.lineWidth = dikte1;
					ctx.strokeStyle=kleur1;
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					y2 = y1 + ratio * (y2-y1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				} else {
					if (ratio <=2) {//de tweede lijn is horizontaal en in kleur 1
						ctx.lineWidth = dikte1;
						ctx.strokeStyle=kleur1;
						ctx.beginPath();
						ctx.moveTo(x1,y2);
						x2 = x1 + (ratio-1) * (x2-x1);
						ctx.lineTo(x2,y2);
						ctx.stroke();				
					} else {
						if (ratio <=3) { //de derde lijn is gelijk aan de eerste maar in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y1);
							y2 = y1 + (ratio-2) * (y2-y1);
							ctx.lineTo(x1,y2);
							ctx.stroke();
						} else { //de vierde lijn is gelijk aan de tweede maar in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y2);
							x2 = x1 + (ratio-3) * (x2-x1);
							ctx.lineTo(x2,y2);
							ctx.stroke();
						}// else (ratio <=3)
					}//else (ratio <=2)
				}//else (ratio <=1)
			} else { //if ratio <=4)
				//console.log("einde drawline "+ vorm);//einde animatie
			}
			break;	
		case "DR":	//Omlaag-Rechts
			if (ratio <=4) {
				if (ratio<=1) {//de eerste lijn is verticaal en in kleur 1
					ctx.lineWidth = dikte1;
					ctx.strokeStyle=kleur1;
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					y2 = y1 + ratio * (y2-y1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				} else {
					if (ratio <=2) {
						ctx.lineWidth = dikte1;
						ctx.strokeStyle=kleur1;
						ctx.beginPath();
						ctx.moveTo(x1,y2);
						x2 = x1 + (ratio-1) * (x2-x1);
						ctx.lineTo(x2,y2);
						ctx.stroke();
					} else {
						if (ratio <=3) {
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y1);
							y2 = y1 + (ratio-2) * (y2-y1);
							ctx.lineTo(x1,y2);
							ctx.stroke();
						} else {
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y2);
							x2 = x1 + (ratio-3) * (x2-x1);
							ctx.lineTo(x2,y2);
							ctx.stroke();
						}//else (ratio <=3)	
					}//else (ratio <=2)				
				} //else (ratio <=1)
			} else { 
				//console.log("einde drawline "+ vorm);//einde animatie
			}//if ratio <=4)
			break;	
		case "UL":	//Omhoog-Links
			if (ratio <=4) {
				if (ratio<=1) {//de eerste lijn is verticaal
					ctx.lineWidth = dikte1;
					ctx.strokeStyle=kleur1;
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					y2 = y1 + ratio * (y2-y1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				} else {
					if (ratio <=2) { //de tweede lijn horizontaal naar links
						ctx.lineWidth = dikte1;
						ctx.strokeStyle=kleur1;
						ctx.beginPath();
						ctx.moveTo(x1,y2);
						x2 = x1 + (ratio-1) * (x2-x1);
						ctx.lineTo(x2,y2);
						ctx.stroke();
					} else {
						if (ratio <=3) { //Als lijn 1 in andere kleur
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y1);
							y2 = y1 + (ratio-2) * (y2-y1);
							ctx.lineTo(x1,y2);
							ctx.stroke();
						} else { //Als lijn 2, in andere kleur
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2; 
							ctx.beginPath();
							ctx.moveTo(x1,y2);
							x2 = x1 + (ratio-3) * (x2-x1);
							ctx.lineTo(x2,y2);
							ctx.stroke();
						} //(ratio <=3)
					} //(ratio <=2)					
				} //else (ratio <=1)
			} else {
				//console.log("einde drawline "+ vorm);//einde animatie
			}//if ratio <=4)
			break;	
		case "UR":	//Omhoog-Rechts
			if (ratio <=4) {
				if (ratio<=1) {//de eerste lijn is verticaal omhoog in kleur 1
					ctx.lineWidth = dikte1;
					ctx.strokeStyle=kleur1;
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					y2 = y1 + ratio * (y2-y1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				} else {	
					if (ratio <=2) { //de tweede lijn horizontaal naar rechts in kleur 1
						ctx.lineWidth = dikte1;
						ctx.strokeStyle=kleur1;
						ctx.beginPath();
						ctx.moveTo(x1,y2);
						x2 = x1 + (ratio-1) * (x2-x1);
						ctx.lineTo(x2,y2);
						ctx.stroke();
					} else {
						if (ratio <=3) { //de derde lijn is verticaal omhoog in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y1);
							y2 = y1 + (ratio-2) * (y2-y1);
							ctx.lineTo(x1,y2);
							ctx.stroke();
						} else { //de vierde lijn horizontaal naar rechts in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y2);
							x2 = x1 + (ratio-3) * (x2-x1);
							ctx.lineTo(x2,y2);
							ctx.stroke();
						}//else (ratio <=3)
					}//else (ratio <=2)
				} //else (ratio <=1)
			} else {
				//console.log("einde drawline "+ vorm);//einde animatie
			}//if ratio <=4)
			break;
		case "LU":	//Naar links en omhoog
			if (ratio <=4) {
				if (ratio<=1) {//de eerste lijn is horizontaal naar links
					ctx.lineWidth = dikte1;
					ctx.strokeStyle=kleur1;
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 + ratio * (x2-x1);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				} else {	
					if (ratio <=2) {//de tweede lijn verticaal omhoog
						ctx.lineWidth = dikte1;
						ctx.strokeStyle=kleur1;
						ctx.beginPath();
						ctx.moveTo(x2,y1);
						y2 = y1 + (ratio-1) * (y2-y1);
						ctx.lineTo(x2,y2);
						ctx.stroke();
					} else {
						if (ratio<=3) {
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y1);
							x2 = x1 + (ratio-2) * (x2-x1);
							ctx.lineTo(x2,y1);
							ctx.stroke();
						} else {
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x2,y1);
							y2 = y1 + (ratio-3) * (y2-y1);
							ctx.lineTo(x2,y2);
							ctx.stroke();
						}//else (ratio<=3)
					}//else (ratio <=2)	
				} //else (ratio <=1)
			} else { 
				//console.log("einde drawline "+ vorm);//einde animatie
			}//(ratio <=4)
			break;	
		case "RU":	//Naar rechts en omhoog
			if (ratio <=4) {
				if (ratio<=1) {//de eerste lijn is horizontaal naar rechts
					ctx.lineWidth = dikte1;
					ctx.strokeStyle=kleur1;
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 + ratio * (x2-x1);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				} else {
					if (ratio <=2) {//de tweede lijn verticaal omhoog
						ctx.lineWidth = dikte1;
						ctx.strokeStyle=kleur1;
						ctx.beginPath();
						ctx.moveTo(x2,y1);
						y2 = y1 + (ratio-1) * (y2-y1);
						ctx.lineTo(x2,y2);
						ctx.stroke();
					} else {
						if (ratio <=3) { //de derde lijn is als de eerste, maar in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x1,y1);
							x2 = x1 + (ratio-2) * (x2-x1);
							ctx.lineTo(x2,y1);
							ctx.stroke();
						} else { //de vierde lijn is als de tweede, maar in kleur 2
							ctx.lineWidth = dikte2;
							ctx.strokeStyle=kleur2;
							ctx.beginPath();
							ctx.moveTo(x2,y1);
							y2 = y1 + (ratio-3) * (y2-y1);
							ctx.lineTo(x2,y2);
							ctx.stroke();
						}//else (ratio <=3)
					} //else (ratio <=2)
				}//else (ratio<=1)	
			} else {
				//console.log("einde drawline "+ vorm);//einde animatie
			}//(ratio <=4)
			break;
		default: //als niks werkt
			alert("Programmeerfout! Functie drawline verkeerd aangeroepen. vorm was: "+vorm);			
	}
}
/*	
Function:	drawcomm(vorm,dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,x2,y2,ratio) 

Functionaliteit:	

Drawcomm tekent een communicatieverbinding  ("request" en "response" tussen twee punten in de vorm van twee haakse lijnen. De functie is een meer complexe uitwerking van drawline omdat er in het totaal acht lijnstukken getekend worden. 

Parameters:
		vorm	-	de verbinding kan vier verschillende vormen hebben en in deze functie is die vorm gerelateerd aan het initiërende (eerste) bericht. Er is dus een "heen"-communicatie die wordt getekend en uitgewist door deze nogmaals te tekenen met de achtergrondkleur. En er is een "terug"-communicatie in omgekeerde richting, waarbij ook deze uiteindelijk wordt uitgewist. De vorm van de initiërende verbinding wordt dus meegegeven: RD (naar rechts en dan omlaag), LD (naar links en omlaag), DL (omlaag en dan naar links), DR (omlaag en dan naar rechts).
		dikte	-	de dikte (breedte) van de lijnen. In tegenstelling tot bij drawline is de dikte hier altijd voor alle lijnen dezelfde
		achtergrondkleur	-	de kleur waarmee alle lijnen overtrokken worden (=onzichtbaar gemaakt). Ook dit wijkt af van drawline
		kleur1	-	de kleur van de eerste (=initiële) communicatieverbinding ("request")
		pattern1	-	het patroon van de eerste lijn (streepjes, punten enz)
		kleur2	-	de kleur van de tweede communicatieverbinding ("response")
		pattern2	-	het patroon van de tweede lijn (streepjes, punten enz)
		x1,y1	-	het eerste punt (beginpunt) is x1,y1. 
		x2,y2	-	het eindpunt is x2,y2.
		ratio	-	de mate waarin de opeenvolgende animaties gevorderd zijn. De animaties beginnen bij ratio=0 en vorderen dan bij iedere iteratie naar een volgende stap. De ratio's 0 t/m 4 betreffen het "request", de ratio's 4 t/m 8 de "response".	Ratio = 0-1 : het eerste lijnstuk. Ratio = 1-2 : het tweede lijnstuk.  Ratio = 2-3: het wissen (overtekenen) van het eerste lijnstuk. Ratio = 3-4: wissen (overtekenen) van het tweede lijnstuk, Ratio = 4-5 : tweede lijnstuk terug. Ratio 5-6: eerste ratio terug. Ratio 6-7: twee lijnstuk wissen. Ratio 7-8: eerste lijn stuk wissen.
*/

async function drawcomm(vorm,dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,x2,y2,ratio) {
	ctx.lineCap = "square"; //zorg dat de rechte hoek tussen de lijnstukken netjes afgewerkt zijn
	switch(vorm) {
		case "RD":   //Rechts-Omlaag
			if (ratio<=8) {//vier lijnstukken die twee keer getekend worden ==> 8. Is ratio>8 dan stoppen we
				if (ratio<=1) {//de eerste lijn is horizontaal en in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 + ratio * (x2-x1);
					ctx.lineTo(x2,y1);//horizontaal
					ctx.stroke();
				} 
				if ((ratio>1) &&(ratio<=2))  {//de tweede lijn is verticaal en in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					y2 = y1 + ((ratio-1) * (y2-y1));
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}
				if ((ratio>2) && (ratio<=3)) { //ratio tussen 2 en 3. Dus lijn 1 in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 + (ratio-2) * (x2-x1);
					ctx.lineTo(x2,y1);//horizontaal
					ctx.stroke();
				}
				if ((ratio>3) && (ratio<=4)) {//ratio tussen 3 en 4. Dus lijn 2 in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					y2 = y1 + ((ratio-3) * (y2-y1));
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}
				if ((ratio>4) && (ratio <=5)) {//ratio tussen 4 en 5. Dus lijn 2 in kleur 2 en in omgekeerde richting!
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					y1 = y2 - ((ratio-4) * (y2-y1));
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>5) && (ratio <=6)) { //ratio tussen 5 en 6, dus lijn 1 in kleur 2 en in omgekeerde richting
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					x1 = x2 - (ratio-5) * (x2-x1);
					ctx.lineTo(x1,y1);//horizontaal
					ctx.stroke();
				}
				if ((ratio>6) && (ratio<=7)) { //lijn 2 in achtergrondkleur en omgekeerd
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					y1 = y2 - ((ratio-6) * (y2-y1));
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if (ratio >7) { //	//lijn 1 in achtergrondkleur en omgekeerd
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					x1 = x2 - (ratio-7) * (x2-x1);
					ctx.lineTo(x1,y1);//horizontaal
					ctx.stroke();
				}
			} else { //(ratio <=8)
				//console.log("einde drawcomm "+ vorm);//einde animatie
				document.getElementById("feedback").value = "einde drawcomm "+ vorm;
				$('#klaarbutton').trigger( "click");
				return(true);
			}	
			break;
		case "LD":	//Links-Omlaag
			if (ratio <=8) {//vier lijnstukken die twee keer getekend worden ==> 8. Is ratio>8 dan stoppen we
				if (ratio <=1) {//de eerste lijn is horizontaal en in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 - ratio * (x1-x2);
					ctx.lineTo(x2,y1);
					ctx.stroke();		
				} 
				if ((ratio >1) && (ratio<=2)) {//de tweede lijn is verticaal. Nog steeds in kleur 1
						ctx.lineWidth = dikte;
						ctx.strokeStyle=kleur1;
						ctx.setLineDash(pattern1);
						ctx.beginPath();
						ctx.moveTo(x2,y1);
						y2 = y1 + (ratio-1) * (y2-y1);
						ctx.lineTo(x2,y2);
						ctx.stroke();
				}
				if ((ratio >2) && (ratio <=3)) { //de derde lijn is hetzelfde als de eerste, maar nu in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 - (ratio-2) * (x1-x2);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>3) && (ratio<=4)){ //Lijn 2 in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					y2 = y1 + (ratio-3) * (y2-y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}
				if ((ratio>4) && (ratio<=5)){//lijn 2 in omgekeerde richting en met kleur 2
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					y1 = y2 - (ratio-4) * (y2-y1);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>5) && (ratio<=6)){//lijn 1 in omgekeerde richting en met kleur 2
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					x1 = x2 - (ratio-5) * (x2-x1);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}
				if ((ratio>6) && (ratio<=7)){//lijn 2 in omgekeerde richting en met achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					y1 = y2 - (ratio-6) * (y2-y1);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if (ratio>7) {//lijn 1 in omgekeerde richting en met achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					x1 = x2 - (ratio-7) * (x2-x1);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}
			} else { //(ratio <=8)
				//console.log("einde drawcomm "+ vorm);//einde animatie
			}		
			break;
		case "DL":	//Omlaag-Links
			if (ratio <=8) {
				if (ratio<=1) {//de eerste lijn is verticaal en in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					y2 = y1 + ratio * (y2-y1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				}
				if ((ratio>1) && (ratio <=2)) {//de tweede lijn is horizontaal en in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x1,y2);
					x2 = x1 + (ratio-1) * (x2-x1);
					ctx.lineTo(x2,y2);
					ctx.stroke();				
				}
				if ((ratio>2) && (ratio<=3)) { //de derde lijn is gelijk aan de eerste maar in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					y2 = y1 + (ratio-2) * (y2-y1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				}
				if ((ratio>3) &&(ratio <=4)) {//de vierde lijn is gelijk aan de tweede maar in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y2);
					x2 = x1 + (ratio-3) * (x2-x1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}
				if ((ratio>4) && (ratio<=5)) {//lijn 2 (vlnr) in kleur 2 
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					x1 = x2 - (ratio-4) * (x2-x1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				}
				if ((ratio>5) && (ratio<=6)) {//lijn 1 (omhoog) in kleur 2 
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x1,y2);
					y1 = y2 - (ratio-5) * (y2-y1);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}
				if ((ratio>6) && (ratio<=7)) {//lijn 2 (vlnr) in achtergrondkleur 
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					x1 = x2 - (ratio-6) * (x2-x1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				}
				if (ratio >7) {//lijn 1 (omhoog) in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y2);
					y1 = y2 - (ratio-7) * (y2-y1);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}	
			} else { //if ratio <=8)
				//console.log("einde drawComm "+ vorm);//einde animatie
			}//else
			break;	
		case "DR":	//Omlaag-Rechts
			if (ratio <=8) {
				if (ratio<=1) {//de eerste lijn omlaag en in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					y2 = y1 + ratio * (y2-y1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				}
				if ((ratio>1) && (ratio<=2)) {//tweede lijn is horizontaal (vlnr) in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x1,y2);
					x2 = x1 + (ratio-1) * (x2-x1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}
				if ((ratio>2) && (ratio<=3)) {//de eerste lijn omlaag en in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					y2 = y1 + (ratio-2) * (y2-y1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				}
				if ((ratio>3) && (ratio<=4)){ //tweede lijn is horizontaal (vlnr) in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y2);
					x2 = x1 + (ratio-3) * (x2-x1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}	
				if ((ratio>4) && (ratio <=5)) {//tweede lijn horizontaal (vrnl) in kleur 2
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					x1 = x2 - (ratio-4) * (x2-x1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				}
				if ((ratio>5) && (ratio <=6)) {//eerste lijn omhoog in kleur 2
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x1,y2);
					y1 = y2 - (ratio-5) * (y2-y1);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}
				if ((ratio>6) && (ratio <=7)) {//tweede lijn horizontaal (vrnl) in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					x1 = x2 - (ratio-6) * (x2-x1);
					ctx.lineTo(x1,y2);
					ctx.stroke();
				}
				if ((ratio>7) && (ratio <=8)) {//eerste lijn omhoog in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y2);
					y1 = y2 - (ratio-7) * (y2-y1);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}						
			} else { 
				//console.log("einde drawComm "+ vorm);//einde animatie
			}//if ratio <=8)
			break;
		case "LU":	//Naar links en omhoog
			if (ratio <=8) {
				if (ratio<=1) {//de eerste lijn naar links en in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 - ratio * (x1-x2);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>1) && (ratio<=2)) {//tweede lijn is omhoog in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					y2 = y1 - (ratio-1) * (y1-y2);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}
				if ((ratio>2) && (ratio<=3)) {//de eerste lijn naar links en in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 - (ratio-2) * (x1-x2);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>3) && (ratio<=4)){ ////tweede lijn is omhoog in  achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					y2 = y1 - (ratio-3) * (y1-y2);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}	
				if ((ratio>4) && (ratio <=5)) {//eerste lijn omlaag in kleur 2
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					y1 = y2 +(ratio-4) * (y1-y2);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>5) && (ratio <=6)) {//tweede lijn naar rechts in kleur 2
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					x1 = x2 + (ratio-5) * (x1-x2);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}
				if ((ratio>6) && (ratio <=7)) {//eerste lijn omlaag in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					y1 = y2 +(ratio-6) * (y1-y2);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>7) && (ratio <=8)) {//tweede lijn naar rechts in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					x1 = x2 + (ratio-7) * (x1-x2);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}						
			} else { 
				//console.log("einde drawComm "+ vorm);//einde animatie
			}//if ratio <=8)
			break;
		case "RU":  //Naar rechts en omhoog
			if (ratio <=8) {
				if (ratio<=1) {//de eerste lijn naar rechts en in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 + ratio * (x2-x1);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>1) && (ratio<=2)) {//tweede lijn is omhoog in kleur 1
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur1;
					ctx.setLineDash(pattern1);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					y2 = y1 - (ratio-1) * (y1-y2);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}
				if ((ratio>2) && (ratio<=3)) {//de eerste lijn naar rechts en in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					x2 = x1 + (ratio-2) * (x2-x1);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>3) && (ratio<=4)){ ////tweede lijn is omhoog in  achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					y2 = y1 - (ratio-3) * (y1-y2);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}	
				if ((ratio>4) && (ratio <=5)) {//eerste lijn omlaag in kleur 2
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					y1 = y2 +(ratio-4) * (y1-y2);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>5) && (ratio <=6)) {//tweede lijn naar links in kleur 2
					ctx.lineWidth = dikte;
					ctx.strokeStyle=kleur2;
					ctx.setLineDash(pattern2);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					x1 = x2 - (ratio-5) * (x2-x1);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}
				if ((ratio>6) && (ratio <=7)) {//eerste lijn omlaag in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y2);
					y1 = y2 +(ratio-6) * (y1-y2);
					ctx.lineTo(x2,y1);
					ctx.stroke();
				}
				if ((ratio>7) && (ratio <=8)) {//tweede lijn naar links in achtergrondkleur
					ctx.lineWidth = dikte;
					ctx.strokeStyle=achtergrondkleur;
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(x2,y1);
					x1 = x2 - (ratio-7) * (x2-x1);
					ctx.lineTo(x1,y1);
					ctx.stroke();
				}						
			} else { 
				//console.log("einde drawComm "+ vorm);//einde animatie
			}//if ratio <=8)
			break;
		default: //als niks werkt
			alert("Programmeerfout! Functie drawComm verkeerd aangeroepen. vorm was: "+vorm);			
	}
}//function DrawComm
//
/*	
Function: drawverticalcomm(vorm,dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,x2,y2,ratio) 

Functionaliteit: 

Drawverticalcomm tekent een communicatieverbinding  ("request" en "response") tussen twee punten door 1 verticale lijn. 

Parameters:
		vorm	-	de verbinding kan vier verschillende vormen hebben en in deze functie is die vorm gerelateerd aan het initiërende (eerste) bericht. Er is dus een "heen"-communicatie die wordt getekend en uitgewist door deze nogmaals te tekenen met de achtergrondkleur. En er is een "terug"-communicatie in omgekeerde richting, waarbij ook deze uiteindelijk wordt uitgewist. De vorm van de initiërende verbinding wordt dus meegegeven: RD (naar rechts en dan omlaag), LD (naar links en omlaag), DL (omlaag en dan naar links), DR (omlaag en dan naar rechts).
		dikte	-	de dikte (breedte) van de lijnen. De dikte hier voor beide lijnen dezelfde
		achtergrondkleur	-	de kleur waarmee alle lijnen overtrokken worden (=onzichtbaar gemaakt). 
		kleur1	-	de kleur van de eerste (=initiële) communicatieverbinding ("request")
		pattern1	-	het patroon van de eerste lijn (streepjes, punten enz)
		kleur2	-	de kleur van de tweede communicatieverbinding ("response")
		pattern2	-	het patroon van de tweede lijn (streepjes, punten enz)
		x1,y1	-	het eerste punt (beginpunt) is x1,y1. 
		y2	-	de verticale positie van het eindpunt (de horizontale positie is gelijk aan die van het beginpunt: x1).
		ratio	-	de mate waarin de opeenvolgende animaties gevorderd zijn. De animaties beginnen bij ratio=0 en vorderen dan bij iedere iteratie naar een volgende stap. De ratio's 0 t/m 4 betreffen het "request", de ratio's 4 t/m 8 de "response".	Ratio = 0: de lijn heen. Ratio = 1: het wissen (overtekenen) van de heen-lijn. Ratio = 2: de lijn terug. Ratio 3: wissen van de terug-lijn.
*/
async function drawverticalcomm(dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2, x1,y1,y2,ratio) { //teken een verticale communicatielijn. 
	//console.log("drawverticalcomm. Pattern1: "+pattern1+".  pattern2: "+pattern2);
	ctx.lineCap = "square"; //zorg dat de rechte hoek tussen de lijnstukken netjes afgewerkt zijn
	if (ratio<4) {
		if (ratio<=1) {//verticaal omlaag in kleur 1
			ctx.lineWidth = dikte;
			ctx.strokeStyle=kleur1;
			ctx.setLineDash(pattern1);
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			y2 = y1 + ratio * (y2-y1);
			ctx.lineTo(x1,y2);
			ctx.stroke();
		}//if
		if ((ratio >1) && (ratio<=2)) {//verticaal omlaag in kleur achtergrondkleur
			ctx.lineWidth = dikte;
			ctx.strokeStyle=achtergrondkleur;
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			y2 = y1 + ((ratio-1) * (y2-y1));
			ctx.lineTo(x1,y2);
			ctx.stroke();
		}//if	
		if ((ratio>2) && (ratio<=3)) { //ratio tussen 2 en 3. Dus verticaal omhoog in kleur 2
			ctx.lineWidth = dikte;
			ctx.strokeStyle=kleur2;
			ctx.setLineDash(pattern2);
			ctx.beginPath();
			ctx.moveTo(x1,y2);
			y1 = y2 - (ratio-2) * (y2-y1);
			ctx.lineTo(x1,y1);//horizontaal
			ctx.stroke();
		}//if
		if (ratio>3){ //ratio tussen 3 en 4. Dus verticaal omhoog in achtergrondkleur
			ctx.lineWidth = dikte;
			ctx.strokeStyle=achtergrondkleur;
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.moveTo(x1,y2);
			y1 = y2 - ((ratio-3) * (y2-y1));
			ctx.lineTo(x1,y1);
			ctx.stroke();
		}//if 	
	} else { //(ratio <=4)
		console.log("einde drawverticalcomm");//einde animatie
	}//else	
}//function
//
/*	
	Function: animate(vorm,dikte1,kleur1,dikte2,kleur2,ratio,x1,y1,x2,y2) 

	Functionaliteit: 
	
	Animate() animeert het tekenen van een verbinding bestaande uit twee (haaks op elkaar staande) lijnstukken. De verbinding wordt tweemaal getekend, zo kan er een accent gegeven worden, maar kan de verbinding (die tijdens de eerste keer werd getekend) ook worden gewist (gedurende de tweede keer). 

Parameters:
		vorm	-	zie de drawline-functie
		dikte1	-	de dikte (breedte) van de lijnstukken bij de eerste keer. 
		kleur1	-	de kleur van de verbinding tijdens de eerste keer
		dikte2	-	de dikte (breedte) van de lijnstukken bij de tweede keer. 
		kleur2	-	de kleur van de verbinding tijdens de tweede keer (door hier de achtergrondkleur te kiezen wordt de lijn gewist
		ratio	-	de mate waarin de opeenvolgende animaties gevorderd zijn. Tijdens de animatie wordt deze ratio bij iedere iteratie met 0.01 opgehoogd, zodat de lijn 'groeit" 
		x1,y1	-	het eerste punt (beginpunt) is x1,y1. 
		x2,y2	-	het eindpunt is x2,y2.
		
*/
async function animate(vorm,dikte1,kleur1,dikte2,kleur2,ratio,x1,y1,x2,y2) { //iteratieve functie. Functie roept zichzelf aan zolang ratio <=4
	let animID = 0;
	ratio = ratio || 0;
	drawline(vorm,dikte1,kleur1,dikte2, kleur2, x1,y1,x2,y2,ratio);
	if(ratio<=4) {
		animID = requestAnimationFrame(function() {
			animate(vorm,dikte1,kleur1, dikte2, kleur2, ratio + 0.01,x1,y1,x2,y2);
		});
	} else {
		cancelAnimationFrame(animID);
		return(true);
	};
}
//
/*	
	Function:	animatecomm(vorm,dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,x2,y2,ratio)

	Functionaliteit: 
	
	Animatecomm() animeert de communicatie door het tekenen van een heengaande ("request") en terugkomende ("response") verbinding bestaande uit twee (haaks op elkaar staande) lijnstukken. 

Parameters:
		vorm	-	zie de drawline-functie
		dikte	-	de dikte (breedte) van de lijnstukken. 
		achtergrondkleur-	de kleur waarmee de verbindingen gewist worden
		kleur1	-	de kleur van de heengaande verbinding
		pattern1	-	het patroon (streepjes, punten..) van de heengaande verbinding
		kleur2	-	de kleur van de terugkomende verbinding
		pattern2	-	het patroon (streepjes, punten..) van de terugkomende verbinding
		x1,y1	-	het eerste punt (beginpunt) is x1,y1. 
		x2,y2	-	het eindpunt is x2,y2.
		ratio	-	de mate waarin de opeenvolgende animaties gevorderd zijn. Tijdens de animatie wordt deze ratio bij iedere iteratie met 0.01 opgehoogd, zodat de lijn 'groeit" 
		
		
*/
async function animatecomm(vorm,dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,x2,y2,ratio) { //iteratieve functie. Functie roept zichzelf aan zolang ratio <=8
	let animID2 = 0;
	ratio = ratio || 0;
	drawcomm(vorm,dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,x2,y2,ratio);
	if(ratio<=8) {
		animID2 = await(requestAnimationFrame(function() {
			animatecomm(vorm,dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,x2,y2,(ratio+0.01));
		}));
	} else {
		cancelAnimationFrame(animID2);
		return(true);
	};
}
//
/*	
Function: animateverticalcomm(dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,y2,ratio) 

Functionaliteit: 
	
Animateverticalcomm animeert communicatie door het tekenen van een heengaande ("request") en terugkomende ("response") verbinding bestaande uit 1 verticaal lijnstuk.

Parameters:
		dikte	-	de dikte (breedte) van de lijn. 
		achtergrondkleur-	de kleur waarmee de verbindingen gewist worden
		kleur1	-	de kleur van de heengaande verbinding
		pattern1	-	het patroon (streepjes, punten..) van de heengaande verbinding
		kleur2	-	de kleur van de terugkomende verbinding
		pattern2	-	het patroon (streepjes, punten..) van de terugkomende verbinding
		x1,y1	-	het eerste punt (beginpunt) is x1,y1. 
		y2	-	de verticale positie van het eindpunt. (Positie eindpunt is x1,y2)
		ratio	-	de mate waarin de opeenvolgende animaties gevorderd zijn. Tijdens de animatie wordt deze ratio bij iedere iteratie met 0.01 opgehoogd, zodat de lijn 'groeit" 
		
		
*/
function animateverticalcomm(dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,y2,ratio) { //iteratieve functie. Functie roept zichzelf aan zolang ratio <=4
	let animID3 = 0;
	ratio = ratio || 0;
	drawverticalcomm(dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2, x1,y1,y2,ratio);
	if(ratio<=4) {
		animID2 = requestAnimationFrame(function() {
			animateverticalcomm(dikte,achtergrondkleur,kleur1,pattern1,kleur2,pattern2,x1,y1,y2,(ratio+0.01));
		});
	} else {
		//console.log("Einde animateverticalcomm");
		//cancelAnimationFrame(animID);
		//animationEnded = true;
	};
}