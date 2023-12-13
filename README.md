# ggzlab
## Inhoudsopgave
1. [Inleiding](#Inleiding)
2. [Functionaliteit](#Functionaliteit)
3. [Technologie](#technologie)
4. [Installatie](#installatie)
5. [Bijdragen aan GGZLab](#Bijdragen)
6. [FAQs](#faqs)
### Inleiding
GGZLab is een simulatie-omgeving. Deze simulatie-omgeving is specifiek gericht op het simuleren (en illustreren) van informatieuitwisseling in de zorg, en daarbinnen de geestelijke gezondheidszorg. In de zorg en de GGZ-zorg bestaan er veel projecten en initiatieven rond informatie-uitwisseling en ICT. Enkele voorbeelden daarvan zijn Koppeltaal, ZorgAdresBoek en Mitz. Om inzichtelijk te kunnen maken welke invloed deze projecten kunnen hebben op het werk van de zorgverlener is GGZLab ontwikkeld.
De actuele versie richt zich op de toepassing van Mitz, de (centrale) toestemmingsvoorziening waarin burgers en patiënten kunnen aangeven voor welke uitwisselingen zij wel of geen toestemming geven.
### Functionaliteit
GGZLab presenteert zich op drie manieren (zie ook de afbeelding XXX):
* Het bewerkingsscherm. Dit scherm bootst normale gebruikerstoepassing na. Bijvoorbeeld MijnMitz voor een burger die zijn toestemmingen wil invoeren, een EPD van een zorgverlener of een voorschrijfsysteem van een apotheker
* Het monitorscherm. Het monitorscherm toont de communicatiestromen zoals die plaatsvinden vanuit de gebruikerstoepassing en naar de gebruikerstoepassing toe. Zo zal bij het "beschikbaarstellen" van behandelgegevens voor uitwisseling (vanuit het EPD van een zorgaanbieder) de communicatie met Mitz te zien zijn teneinde te bepalen of de patient dit toestaat of niet.
* Het configuratiescherm. Hierin worden de simulatiegegevens getoond, kunnen deze worden geimporteerd en geexporteerd en kunnen de instellingen voor de simulaties worden aangepast.
### Technologie
GGZLab is volledig gebouwd in HTML 5 en Javascript. Dit betekent dat een simpele webserver voldoende is om GGZLab te installeren. 
GGZLab maakt gebruik van de JQuery-library (versie 3.7.0) en van het Bootstrap framework (versie 5.3.0). Er worden iconen gebruikt uit fontawesome-free-5.15.4.
Omdat GGZLab volledig in de browser draait maakt het geen gebruik van server-side processing of database. Simulatie-gegevens worden opgeslagen in HTML 5 "local storage". Dit betekent:
* dat ingevoerde gegevens verloren gaan als de browser is ingesteld op het verwijderen van site-gegevens bij afsluiten en ook bij het leegmaken van de browser-cache en het verwijderen van site-gegevens.
* dat gegevens volledig beperkt zijn tot de specifieke browser-omgeving op een specifiek computersysteem. Ingevoerde gegevens kunnen niet vanaf een andere computer bekeken worden.
## Gebruik
Op een computer met één beeldscherm is het handig om de monitor op te starten in een browser-window en dat window in te krimpen tot de linker helft van het scherm. Vervolgens een nieuw browser-window openen met hierin een van de bewerkingsschermen (mijnMitz of Patientregistratie). Dit tweede scherm naast het eerste in het beeldscherm zetten en met de simulatie beginnen.
Op een computer met twee beeldschermen is kan de monitor in een browser-window op het eerste beeldscherm worden neergezet en een van de bewerkingsschermen (mijnMitz of Patientregistratie) op het tweede. 
## Licensering
Gebruik van GGZLab vanaf Github-Pages is vrij toegestaan. Het copyright van GGZLab ligt bij de ontwikkelaars. Overname van de broncode zonder hun toestemming is niet geoorloofd. 
