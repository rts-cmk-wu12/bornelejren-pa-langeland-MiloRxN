[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/kLIfpuEh)

# Børnelejren på Langeland - Projektdokumentation

## Om projektet
Dette projekt er et redesign af hjemmesiden for "Foreningen Børnelejren på Langeland" - en velgørende forening, der afholder finansierede lejre for dårligt stillede børn og unge fra hele Danmark.

## Design og UX
Designet følger det originale [Figma-design](https://www.figma.com/design/iEDZm6uBcBeBpYTJBXnaEt/Boernelejren?node-id=0-1&t=kQevqYEY3vEQGTwH-1) med et par ændringer ses forneden. Hjemmesiden har et responsivt design med tilpasset visning til både desktop og mobile enheder. Designet anvender en konsistent farvepalet med `$primary-color: #D0000B` som den primære brandfarve.

### Design Komponenter
- Moderne, tilgængelig typografi med Urbanist fontfamilien
- Responsivt grid layout med CSS Grid
- Tilpasset billedslider med automatisk og manuel navigation
- Breakpoints er håndtere med SCSS mixins for at sikre responsivt layout på tværs af enheder

## Teknologier anvendt
### Frontend
- React til UI-komponenter
- React Router til client-side routing
- Vite som build tool og udviklingsserver
- SCSS til modulær styling

### Backend
- Express.js til API-endpoints
- MongoDB med Mongoose til databaseoperationer
- Miljøvariable håndteret med `.env`-filer

### Udviklingsværktøjer
- Vite Plugin Pages til filbaseret routing
- CORS til at håndtere API-anmodninger

## Projektstruktur
Projektet følger en komponentbaseret arkitektur med følgende hovedsektioner:

### Sider
- Forsiden (`/`) - Introduktion til organisationen
- Om os (`/about`) - Information om organisationen med billedslider
- Bliv sponsor (`/sponsor`) - Sponsorformular for virksomheder
- Børnelejren takker (`/thanks`) - Takkeside med visning af sponsorer

### Komponenter
- Layout komponenter: `Header`, `Footer`, `Hero`
- UI komponenter: `ImageSlider`, `SponsorForm`, `SponsorList`
- Navigationskomponenter: `BurgerMenu`, `BurgerMenuButton`

### Styling
Modulær SCSS-arkitektur der følger 7-1 mønsteret:
- Abstracts: Variabler (`_variables.scss`) og mixins (`_mixins.scss`)
- Base styles: `_reset.scss`, `_typography.scss`, `_base.scss`
- Komponentspecifikke stylesheets for layout og UI
- Hovedkompilering gennem `main.scss`

### API-struktur
- Ruter defineret i `sponsor.routes.js`
- Controllers i `sponsor.controller.js`
- Datamodeller i `sponsor.model.js`

## Features
### Responsivt design
- Adaptivt layout med CSS Grid og flexbox
- Mobilmenu med burgermenu-navigation
- Media queries håndteret gennem SCSS mixins

### Interaktive elementer
- Billedslider/karrusel på Om os-siden med automatisk rotation og manuelt fungerende navigation
- Formularvalidering på sponsorsiden
- Filtrerbar sponsorliste med kategorier

### Backend-integration
- MongoDB-integration til lagring af sponsorinformation
- RESTful API til håndtering af sponsordata
- Client-side integration med API-endpoints

## Udviklingsopsætning
For at køre projektet lokalt:

```sh
# Installer dependencies
npm install

# Start udviklingsserveren
npm run dev
```

Applikationen forbinder til MongoDB ved hjælp af connection string i `.env`-filen og kører som standard på port 3000.

## Ændringer fra det originale design

### Om os
Har valgt at fratræde designet iforhold til 2 kolonner på om os, da slideren fylder for meget og det vil være svært at få det til at se pænt ud.

Har valgt at lave en ny slider, da den gamle slider ikke kunne tilpasses til det design jeg havde i tankerne.

### Sponsor side
Har valgt at lave få ændringer i sponsor sidens form så det så pænt ud, da det virket meget kantet og ikke så pænt ud.

## Vigtigt information
- Der er ikke nogen aktiv side, da jeg ikke har fået sat den op inden for tidsfristen.
- Projektet er lavet i React og kan derfor ikke åbnes uden at have sat det op med npm og node.js


## forbedringer og fremtidige tiltag
Jeg må ærligt erkende, at der stadig er flere forbedringsmuligheder. Navigationsmenuen fremstår ikke så æstetisk tiltalende som planlagt, og om os-siden følger ikke fuldstændig det originale design grundet tekniske udfordringer med at implementere den planlagte layout-struktur.

## Udfordringer
En særlig udfordring var integrationen af logoet på en konsistent og æstetisk måde. Efter flere forsøg besluttede jeg at begrænse logoet til headeren for at undgå, at det tager for meget opmærksomhed på de enkelte sider og forstyrrer det overordnede design. Dette kompromis gav efter min vurdering det mest balancerede resultat, selvom det afviger fra de oprindelige opgave beskrivelser.

## Konklusion
Projektet har resulteret i et moderniseret og mere brugervenligt design, som gør det nemmere for besøgende at navigere og finde relevant information. Siden er blevet optimeret til at være responsiv og tilgængelig på forskellige enheder, hvilket var et centralt mål for redesignet.