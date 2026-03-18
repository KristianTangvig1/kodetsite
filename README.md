# SWAPSORY

SWAPSORY er en webshop-koncept hvor brugere kan leje og swapsory accessories med god samvittighed. Projektet er bygget som en statisk hjemmeside med HTML, CSS og JavaScript.

## Sider

- **index.html** – Forsiden med hero-sektion, produktkort (solbriller, ure, drømmeprodukter), CTA-sektion og inspirationssektion.
- **produktliste.html** – Oversigt over alle produkter med filtreringsfunktion på kategorier.
- **produkt.html** – Detaljeside for et enkelt produkt.
- **about.html** – Om os-side.

## Teknologier

- **HTML5** – Sidestruktur
- **CSS3** – Styling fordelt på flere stylesheet-filer (`custom.css`, `style.css`, `layout.css`, `forside.css`, `produktListe.css`, `produkt.css`)
- **Vanilla JavaScript (ES Modules)** – Dynamisk indlæsning af produktdata fra [DummyJSON API](https://dummyjson.com)

## Projektstruktur

```
kodetsite-1/
├── index.html
├── produktliste.html
├── produkt.html
├── about.html
├── css/
│   ├── custom.css        # Farvevariabler, fonte og typografi
│   ├── style.css         # Grundlæggende elementer
│   ├── layout.css        # Header og footer layout
│   ├── forside.css       # Forsidespecifik styling
│   ├── produktListe.css  # Produktkort og filterlayout
│   └── produkt.css       # Produktdetaljeside
├── js/
│   ├── index.js          # Forsidiens produkthentning og rendering
│   ├── produktliste.js   # Produktlistelogik og filtrering
│   └── produkt.js        # Produktdetaljeside logik
├── img/                  # Billeder og ikoner
└── fonts/                # Lokale skrifttyper (Bebas Neue, Wavehaus)
```

## Funktioner

- Produkter hentes dynamisk fra DummyJSON API fordelt på kategorier (solbriller, ure, smykker, tasker)
- Filtrering af produkter efter kategori på produktlistesiden
- Responsivt design der fungerer på både mobil og desktop
- Kurv-knap på hvert produktkort med hover- og klik-feedback
