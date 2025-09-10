# RVA projekat

## Repozitorijum za fakultativni projekat za predmet **Razvoj web aplikacija**

**Autor:** Filip Pavlović


## Tehnologije i dokumentacija

1. Front-end: `html`, `css`, `js`
   - Rađen sa "*plain*" tehnologijama, koristi se `FetchAPI` za kontakt sa Back-end API-jem. 
   - Interfejs je jednostavan i responzivan, prilagođen za desktop i mobilne uređaje.
   - Stilizacija se vrši kombinacijom CSS-a i jednostavnih klasa za raspored elemenata.
2. Back-end: `NodeJS`
   - Postavljen kao REST API sa osnovnim CRUD funkcionalnostima.
   - Koristi `express` za upravljanje rutama i `body-parser` za parsiranje podataka.
   - Omogućava povezivanje sa SQLite bazom podataka i osnovnu validaciju podataka.
   - Svi pozivi i logika vezana za rad sa bazom podataka se nalaze u `databaseFunctions.js`
3. Baza podataka: `sqlite3`
   - Laka, file-based baza pogodna za razvojne projekte.
   - Svi podaci se čuvaju u lokalnom fajlu `database.sqlite`.
   - Podržava osnovne SQL upite za kreiranje, čitanje, ažuriranje i brisanje podataka.
   
--- 

**U folderu se nalazi i `RVA.postman_collection.json` u kojoj je nalazi vec kreirana kolekcija Request-ova za ovaj projekat**
