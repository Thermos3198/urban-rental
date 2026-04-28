# UrbanRental Backend
---
## Készítette:
- Kovács Péter
- Drágán Daniel

---

# Backend Felépítése:

1. API végpontok
  - Adatbázis
      - MySQL adatbázis, kapcsolódás dotenv konfiguráció alapján
    - Auth rendszer
      - JWT token alapú hitelesítés cookie-kban
      - Felhasználói és adminisztrátori bejelentkezés
    - Postman tesztelés: Az API végpontok Postmanben való teszteléséhez használható
    - A weboldal linkje:
      - Frontend: https://urbanrentalbaross.netlify.app

---
# Fő Csomagok

2. Csomagok/Middleware-ek:
   - express:
      - Web Framework az API létrehozásához
      - express.json() – JSON kérések kezelése
   - cookie-parser:
       - cookieParser() – Cookie-k kezelése a JWT token elhelyezéséhez
   - cors:
       - CORS beállítások a frontend (localhost:5173, netlify) hozzáféréséhez
    - jsonwebtoken:
        - jwt.sign() – JWT token generálás
        - jwt.verify() – Token érvényességének ellenőrzése
     - bcryptjs:
         - Jelszavak titkosítása (bcrypt.hash)
         - Jelszó összehasonlítás (bcrypt.compare)
   - multer:
       - Fájlok feltöltésére (képek, profilképek)
     - mysql2/promise:
        - MySQL adatbázis kapcsolat létrehozása
        - Connection pool használata párhuzamos lekérdezésekhez

---

# Statikus Fájlok:
- /public/carimgs mappa elérhető publikus úton (jármű képekért)
- /public/userpics mappa elérhető publikus úton (felhasználói profilképekért)

---

# Útvonalak:

## Felhasználói útvonalak (/users)
| URL           | Fájl                  | Funkciók |
| :---          | :---:                 | ---:  |
| POST /register    | userRoutes.js       | Felhasználó regisztrálása      |
| POST /login       | userRoutes.js       | Bejelentkezés                  |
| GET /whoami       | userRoutes.js       | Aktuális felhasználó adatai (JWT szükséges)  |
| POST /logout      | userRoutes.js       | Kijelentkezés                  |
| GET /userprofile  | userRoutes.js       | Profil adatok lekérdezése      |
| POST /newuserprofile/:user_id | userRoutes.js | Profilkép feltöltése    |
| PUT /edituser/:user_id | userRoutes.js | Felhasználói adatok módosítása |
| DELETE /deleteuserpic/:user_id | userRoutes.js | Profilkép törlése |
| DELETE /deleteuser/:user_id | userRoutes.js | Felhasználó törlése |
| GET /cars         | userRoutes.js       | Összes jármű lekérdezése (megtalálható képpel)  |
| GET /reservation  | userRoutes.js       | Saját foglalások lekérdezése  |
| POST /newreservation | userRoutes.js   | Új foglalás létrehozása       |
| PUT /updatereservation | userRoutes.js | Foglalás módosítása          |
| DELETE /deletereservation/:reservation_id | userRoutes.js | Foglalás törlése  |
| POST /filter      | userRoutes.js       | Jármű szűrés kritériumok alapján |

## Adminisztrátori útvonalak (/admin)
| URL                    | Fájl                  | Funkciók |
| :---                   | :---:                 | ---:  |
| POST /login            | adminRoutes.js        | Admin bejelentkezés           |
| GET /whoami            | adminRoutes.js        | Admin adatok lekérdezése (JWT + admin jogosultság szükséges) |
| POST /logout           | adminRoutes.js        | Admin kijelentkezés           |
| POST /carwithimgupload | adminRoutes.js        | Jármű feltöltés képekkel      |
| DELETE /deletecarimg/:vehicle_id | adminRoutes.js | Járműkép törlése     |
| GET /adminshowallcars  | adminRoutes.js        | Összes jármű lekérdezése (megtalálható képpel) |
| DELETE /deletewholecar/:vehicle_id | adminRoutes.js | Jármű teljes törlése |
| PUT /editvehicle/:vehicle_id | adminRoutes.js  | Jármű adatainak módosítása    |
| GET /allcategory       | adminRoutes.js        | Kategóriák lekérdezése        |
| POST /newcategory      | adminRoutes.js        | Új kategória létrehozása      |
| PUT /updatecategory/:category_id | adminRoutes.js | Kategória módosítása  |
| DELETE /deletecategory/:category_id | adminRoutes.js | Kategória törlése |
| GET /alluser           | adminRoutes.js        | Összes felhasználó lekérdezése |
| PUT /editoneuser/:user_id | adminRoutes.js       | Felhasználó adatainak módosítása |
| DELETE /deleteoneuser/:user_id | adminRoutes.js   | Felhasználó törlése (bánás)  |
| GET /reservation       | adminRoutes.js        | Összes foglalás lekérdezése (admin oldalról) |
| PUT /updatereservation/:reservation_id | adminRoutes.js | Foglalás módosítása (admin) |
| DELETE /deletereservation/:reservation_id | adminRoutes.js | Foglalás törlése (admin) |
| GET /allrentals        | adminRoutes.js        | Összes kibérlés lekérdezése   |
| GET /rentals/:user_id  | adminRoutes.js        | Felhasználó kibérléseinek lekérdezése |
| POST /newrental        | adminRoutes.js        | Új kibérlés létrehozása       |
| PUT /updaterental/:user_id | adminRoutes.js      | Kibérlés módosítása           |
| DELETE /deleterental   | adminRoutes.js        | Kibérlés törlése              |
| POST /filter           | adminRoutes.js        | Jármű szűrés kritériumok alapján |

## Nyilvános útvonalak (/global)
| URL           | Fájl                  | Funkciók |
| :---          | :---:                 | ---:  |
| GET /cars     | notLoggedinRoutes.js  | Összes jármű lekérdezése (megtalálható képpel) - bejelentkezés nélkül is elérhető |
| POST /filter  | notLoggedinRoutes.js  | Jármű szűrés kritériumok alapján - bejelentkezés nélkül is elérhető |

## Fizetési útvonalak (/api/payments)
| URL              | Fájl                  | Funkciók |
| :---             | :---:                 | ---:  |
| POST /process    | paymentRoutes.js      | Szimulált fizetés feldolgozása (biller típus) |
| POST /calculate  | paymentRoutes.js      | Kibérles árának számítása |

---

# Backend adatok:

 - config/dotenvConfig.js:
   - HOST: A szerver hosztja (alapértelmezett)
   - PORT: A szerver portja
   - DB_HOST: MySQL adatbázis host
   - DB_USER: MySQL felhasználónév
   - DB_PASSWORD: MySQL jelszó
   - DB_NAME: Adatbázis neve
   - DB_TIMEZONE: Időzóna (Z/UTC)
   - JWT_SECRET: JWT token aláírásához szükséges kulcs
   - JWT_EXPIRES_IN: Token érvényességi idő
   - COOKIE_NAME: Sütik neve a JWT tokennak

<details>
  
<summary>Controllers:</summary>

- 👤 userController.js:
  - ### **Függőségek:**
    1. bcryptjs: Jelszavak titkosítása és ellenőrzése
    2. jsonwebtoken: JWT token generálás és validálás
    3. database (userModel): Az adatbázis kapcsolódása és SQL lekérdezések végrehajtása
    4. config/dotenvConfig: Környezeti változók betöltése

I. register – Regisztráció:

II. login – Bejelentkezés:

III. whoAmI – Aktuális felhasználó adatai:

IV. logout – Kijelentkezés:

VI. newuserprofilepic – Profilkép feltöltése:

VIII. deleteuserprofilepic – Profilkép törlése:

IX. deleteuser – Felhasználó törlése:

X. viewcars – Összes jármű lekérdezése (megtalálható képpel):

XI. viewReservations – Saját foglalások lekérdezése:

XII. NewReservations – Új foglalás létrehozása:

XIII. UReservations – Foglalás módosítása:

XIV. DReservations – Foglalás törlése:

XV. filterCars – Jármű szűrés kritériumok alapján:

---

- 👨‍💼 adminController.js:
  - ### **Függőségek:**
    1. bcryptjs: Jelszavak titkosítása és ellenőrzése
    2. jsonwebtoken: JWT token generálás
    3. database (adminModel): Admin adatbázis lekérdezések
    4. database (carDataModel, carImgModel): Járművek kezelése
    5. database (userModel): Felhasználók kezelése (admin jogosultsággal)
    6. multer: Fájl feltöltés kezelése

I. login – Admin bejelentkezés:

II. whoAmI – Admin adatok lekérdezése:

III. logout – Admin kijelentkezés:

IV. carwithimgupload – Jármű feltöltése képekkel:

V. delVehicleImg – Járműkép törlése:

VI. deletewholevehicle – Jármű teljes törlése:


VII. editcar – Jármű adatainak módosítása:

VIII. showcdwi – Összes jármű lekérdezése (megtalálható képpel):

IX. allusers – Összes felhasználó lekérdezése:

X. editoneuser – Felhasználó adatainak módosítása (admin jogosultsággal):

XI. banuser – Felhasználó törlése (bánás):

---

- 📋 RentalController.js:
  - ### **Függőségek:**
    1. database (rentalModel): Kibérlésekhez kapcsolódó SQL műveletek

I. viewARs – Összes kibérlés lekérdezése:
- Funkció:
  - Lekéri az összes kibérlést a rentals táblából
  - Adminisztrátori funkció (minden kibérlés megtekintése)
- Válasz:
  - Sikeres lekérés: 201-es válasz státusz (result objektum)
  - Lekérési hiba esetén: 500-as válasz státusz

II. viewRs – Felhasználó kibérléseinek lekérdezése:
- Funkció:
  - Lekéri egy adott felhasználó összes kibérlését
  - user_id az útvonal paraméterből érkezik
- Bemenet:
  - user_id az útvonal paraméterből
- Válasz:
  - Sikeres lekérés: 201-es válasz státusz (result objektum)
  - Lekérési hiba esetén: 500-as válasz státusz

III. NewRs – Új kibérlés létrehozása:
- Funkció:
  - Új kibérlést hoz létre az adatbázisban
  - Az updatereservationstatus függvényt is meghívja a foglalás statuszának 'active_rental'-re frissítéséhez
- Bemenet:
  - reservation_id, vehicle_id, user_id, start_time, expected_return, actual_return, status, damage_notes a kérés törzsében
- Válasz:
  - Sikeres létrehozás: 201-es válasz státusz (result és result2)
  - Lekérési hiba esetén: 500-as válasz státusz

IV. URs – Kibérlés módosítása:
- Funkció:
  - Módosítja egy kibérlés adatait (reservation_id, vehicle_id, start_time, expected_return, actual_return, status, damage_notes)
  - Ha a status 'completed', akkor a foglalás státuszt is frissíti 'completed'-re
- Bemenet:
  - user_id az útvonal paraméterből
  - reservation_id, vehicle_id, start_time, expected_return, actual_return, status, damage_notes a kérés törzsében
- Válasz:
  - Sikeres módosítás: 201-es válasz státusz
  - Lekérési hiba esetén: 500-as válasz státusz

V. Drs – Kibérlés törlése:
- Funkció:
  - Törli egy kibérlést a rental_id alapján
- Bemenet:
  - rental_id az útvonal paraméterből
- Válasz:
  - Sikeres törlés: 201-es válasz státusz
  - Lekérési hiba esetén: 500-as válasz státusz

---

- 📋 UserreservationCont.js:
  - ### **Függőségek:**
    1. bcryptjs, jsonwebtoken: Hitelesítés (jelenleg nem aktív)
    2. database (reserveModel): Foglalásokhoz kapcsolódó SQL műveletek

I. viewRs – Felhasználói foglalások lekérdezése:
- Funkció:
  - Lekéri egy adott felhasználó összes foglalását
  - user_id az útvonal paraméterből érkezik
- Bemenet:
  - user_id az útvonal paraméterből
- Válasz:
  - Sikeres lekérés: 201-es válasz státusz (result objektum)
  - Lekérési hiba esetén: 500-as válasz státusz

II. NewRs – Új felhasználói foglalás létrehozása:
- Funkció:
  - Új járműfoglalást hoz létre
  - pickup_date és return_date mezők kitöltött-e validáció
  - Konfliktusok ellenőrzése a checkAvailability függvény segítségével
- Bemenet:
  - user_id, vehicle_id, pickup_date, return_date az útvonal paraméterből
- Validálás:
  - Pickup_date és return_date mezők kitöltött-e
- Válasz:
  - Sikeres foglalás: 201-es válasz státusz
  - Konfliktus (jármű már foglalt): 409-es válasz státusz
  - Hiba esetén: 500-as válasz státusz

III. URs – Foglalás módosítása:
- Funkció:
  - Módosítja egy foglalás adatait (vehicle_id, pickup_date, return_date, status)
- Bemenet:
  - vehicle_id, pickup_date, return_date, status az útvonal paraméterből
- Válasz:
  - Sikeres módosítás: 201-es válasz státusz
  - Lekérési hiba esetén: 500-as válasz státusz

IV. Drs – Foglalás törlése:
- Funkció:
  - Törli egy foglalást a reservation_id alapján
- Bemenet:
  - reservation_id az útvonal paraméterből
- Válasz:
  - Sikeres törlés: 201-es válasz státusz
  - Lekérési hiba esetén: 500-as válasz státusz

---

- 📋 AdminReservationCont.js:
  - ### **Függőségek:**
    1. bcryptjs, jsonwebtoken: Hitelesítés (jelenleg nem aktív)
    2. database (AdminreserveModel): Admin oldali foglalásokhoz kapcsolódó SQL műveletek

I. viewAdminreservations – Összes admin foglalás lekérdezése:
- Funkció:
  - Lekéri az összes foglalást a reservations táblából
  - Adminisztrátori jogosultság szükséges
- Válasz:
  - Sikeres lekérés: 201-es válasz státusz (result objektum)
  - Lekérési hiba esetén: 500-as válasz státusz

II. UAdminreservations – Admin foglalás módosítása:
- Funkció:
  - Módosítja egy foglalás adatait adminisztrátori jogosultsággal
  - user_id, vehicle_id, pickup_date, return_date, status, created_at mezők módosíthatók
- Bemenet:
  - reservation_id az útvonal paraméterből
  - user_id, vehicle_id, pickup_date, return_date, status, created_at a kérés törzsében
- Validálás:
  - Pickup_date és return_date mezők kitöltött-e
- Válasz:
  - Sikeres módosítás: 201-es válasz státusz (result objektum)
  - Lekérési hiba esetén: 500-as válasz státusz

III. DAdminreservations – Admin foglalás törlése:
- Funkció:
  - Törli egy foglalást a reservation_id alapján adminisztrátori jogosultsággal
- Bemenet:
  - reservation_id az útvonal paraméterből
- Válasz:
  - Sikeres törlés: 201-es válasz státusz (result objektum)
  - Lekérési hiba esetén: 500-as válasz státusz

---

- 💳 paymentController.js:
  - ### **Függőségek:**
    1. database (db): MySQL adatbázis kapcsolat

I. processMockPayment – Szimulált fizetés feldolgozása:
- Funkció:
  - Szimulál egy fizetési tranzakciót a megadott adatok alapján
  - Kártyaszám maszkolása (****-****-****-XXXX formátum)
  - Szimulált időkésleltetés (1 másodperc) a tranzakcióhoz
  - Visszaadja a tranzakciós adatokat (cardNumber, expiryDate, cardName, amount, currency, timestamp, reservationId)
- Bemenet:
  - cardNumber, expiryDate, cardName, cvc, amount, reservationId a kérés törzsében
- Validálás:
  - Minden mező kitöltött-e (cardNumber, expiryDate, cardName, cvc, amount)
- Válasz:
  - Sikeres fizetés: 200-as válasz státusz (success, message, transaction objektum)
  - Hiányzó adatok esetén: 400-as válasz státusz
  - Fizetési hiba esetén: 500-as válasz státusz

II. calculateRentalAmount – Kibérles árának számítása:
- Funkció:
  - Kiszámítja a kibérlés teljes árát a pickup_date és return_date alapján
  - Számolja ki az eltelt napokat (minimum 1 nap)
  - A végső összeget 2 tizedesjegyre kerekíti
- Bemenet:
  - pickupDate, returnDate, pricePerDay a függvény paraméterekben
- Válasz:
  - sikeres számítás: days, pricePerDay, totalAmount objektum

III. calculateRentalDays – Kibérles napjainak számítása:
- Funkció:
  - Kiszámítja a kibérlés napjainak számát
  - Számolja ki az eltelt napokat (minimum 1 nap)
- Bemenet:
  - pickupDate, returnDate a függvény paraméterekben
- Válasz:
  - sikeres számítás: diffDays (egész szám)

IV. getCarPriceById – Jármű árának lekérdezése:
- Funkció:
  - Lekéri egy jármű price_per_day értékét a vehicle_id alapján
- Bemenet:
  - vehicle_id az SQL paraméterben
- Válasz:
  - sikeres lekérés: result[0]?.price_per_day (ha van) vagy 0

---

- 🏷️ categoryController.js:
  - ### **Függőségek:**
    1. database (categoryModel): Kategóriákhoz kapcsolódó SQL műveletek

I. viewallC – Összes kategória lekérdezése:
- Funkció:
  - Lekéri az összes kategóriát a vehicle_category táblából
- Válasz:
  - sikeres lekérés: 201-es válasz státusz (result objektum)
  - hiba esetén: 500-as válasz státusz

II. addNewC – Új kategória létrehozása:
- Funkció:
  - Új kategóriát hoz létre a vehicle_category táblában
- Bemenet:
  - name a kérés törzsében
- Válasz:
  - sikeres létrehozás: 201-es válasz státusz (result objektum)
  - hiba esetén: 500-as válasz státusz

III. updateC – Kategória módosítása:
- Funkció:
  - Módosítja egy kategória nevét a category_id alapján
- Bemenet:
  - category_id az útvonal paraméterből
  - name a kérés törzsében
- Válasz:
  - sikeres módosítás: 200-as válasz státusz
  - nem található kategória esetén: 404-es válasz státusz
  - hiba esetén: 500-as válasz státusz

IV. deleteC – Kategória törlése:
- Funkció:
  - Törli egy kategóriát a category_id alapján
- Bemenet:
  - category_id az útvonal paraméterből
- Válasz:
  - sikeres törlés: 201-es válasz státusz
  - nem található kategória esetén: 404-es válasz státusz
  - hiba esetén: 500-as válasz státusz

---

- 🔍 FilterController.js:
  - ### **Függőségek:**
    1. database (filterModels): Szűréshez kapcsolódó SQL műveletek

I. filterCars – Jármű szűrés kritériumok alapján:
- Funkció:
  - Dinamikus SQL lekérdezést hoz létre a szűrési kritériumok alapján
  - Támogatott szűrési feltételek: brand, color, transmission, year, min_price, max_price, sort_order
  - Rendezés növekvő vagy csökkenő sorrendben (price_per_day szerint)
- Bemenet:
  - filters objektum a kérés törzsében (brand, color, transmission, year, min_price, max_price, sort_order)
- Validálás:
  - A szűrési mezők nem üres stringek lehetnek
- Válasz:
  - sikeres szűrés: 201-es válasz státusz (result objektum)
  - hiba esetén: 500-as válasz státusz

---

</details>

<details>
<summary>Middleware</summary>

- 👤 auth middleware – Felhasználó hitelesítése JWT token alapján
  - ### **Függőségek:**
    - jsonwebtoken (jwt): A JSON Web Token (JWT) kezelésére használt könyvtár.
    - config/dotenvConfig: Környezeti változókat tartalmazó konfigurációs fájl (COOKIE_NAME, JWT_SECRET).

I. auth – Middleware a token ellenőrzésére
- Funkció:
  - A middleware ellenőrzi, hogy a kérés tartalmazza-e az érvényes JWT tokent a cookie-ban.
  - Ha a token érvényes, a felhasználói adatokat hozzáadja a req.user objektumhoz.
  - Ha nem érvényes a token vagy nincs token, akkor hibát jelez.
- Bemenet:
  - cookie: A kérés tartalmazza a config.COOKIE_NAME nevű cookie-t, amely a felhasználó JWT tokenjét tartalmazza.
- Funkcionalitás:
  - Token keresése: A middleware megpróbálja megtalálni a tokent a kérés cookie-jában (req.cookies?.[config.COOKIE_NAME]).
  - Token validálás: A jwt.verify metódus segítségével érvényesíti a tokent a JWT_SECRET kulcs használatával.
- Hibák:
  - Ha a token nincs a kérésben, akkor 401-es státuszkóddal hibaüzenet: "Nem vagy bejelentkezve".
  - Ha a token érvénytelen (jwt.verify hiba), akkor 401-es státuszkóddal hibaüzenet: "cookie error".
- Válasz:
  - Sikeres hitelesítés: Ha a token érvényes, a felhasználói adatokat (dekódolt token) hozzáadja a req.user objektumhoz, majd a next() metódust hívja, hogy a következő middleware-t vagy route handler-t lefuttathassa.
  - Hiba: Ha a token nem található vagy érvénytelen, hibát küld vissza a válaszban.

---
 
- 👨‍💼 admin middleware – Adminisztrátori jogosultság ellenőrzése
  - ### **Függőségek:**
    - Nincsenek függőségek, csak a req.user objektumot használja.
  
- Funkció:
  - A middleware ellenőrzi, hogy a bejelentkezett felhasználó adminisztrátor-e (req.user.role === 'admin').
  - Ha nem admin, akkor hibát jelez.
- Hibák:
  - Ha a felhasználó role nem "admin", akkor 409-es státuszkóddal hibaüzenet: "nem vagy admin".
- Válasz:
  - Sikeres jogosultság ellenőrzés: A next() metódust hívja, hogy a következő middleware-t vagy route handler-t lefuttathassa.
  - Hiba: Ha a felhasználó nem admin, hibát küld vissza a válaszban.

---

- 📎 upload – Fájlok feltöltése (Multer middleware)
  - ### **Függőségek:**
    - multer: A fájlok feltöltésére használt middleware az Express.js alkalmazások számára.
    - fs: A fájlrendszer kezelésére használt modul.
    - path: A fájlok elérési útvonalának kezelésére használt modul.

- Funkció:
  - A upload middleware lehetővé teszi a több fájl (képformátumok) feltöltését az Express.js alkalmazásba.
  - A feltöltött fájlokat ideiglenesen a /public/carimgs/temp mappába menti, majd áthelyezi végleges helyre.
  
I. Funkcionalitás:
- destination:
  - A fájlokat az ./public/carimgs/temp mappába tárolja (ideiglenes hely).
- filename:
  - A fájl nevét a következő formátumban generálja: <dátum>-<eredeti_fájlnév>.
  - A dátum az aktuális időpont (Date.now()), így egyedi lesz minden fájlnév.

II. Upload (Feltöltési beállítások):
- fileSize limit: A feltöltött fájl maximális mérete 20MB, amit a limits beállításban adunk meg. Ha egy fájl meghaladja ezt a méretet, akkor a rendszer elutasítja a feltöltést.
- fileFilter: A fájl típusát ellenőrizzük a fileTypes változó segítségével. A megengedett formátumok:
  - **jpg, jpeg, png, gif, svg, webp, avif, bmp, tiff**
- Ha a fájl kiterjesztése vagy MIME típusa nem egyezik a megadott típusokkal, akkor hibaüzenetet küldünk: "Csak képeket lehet feltölteni".

- Válasz:
  - Sikeres feltöltés: A fájl sikeresen feltöltődik a szerverre, és a válaszban a feltöltött fájl elérési útja (vagy más információ) kerül visszaküldésre.
  - Hiba: Fájl túl nagy vagy érvénytelen formátum.

---

- 📎 useruploadpic – Profilkép feltöltése (Multer middleware)
  - ### **Függőségek:**
    - multer: A fájlok feltöltésére használt middleware.
    - fs: A fájlrendszer kezelésére használt modul.
    - path: A fájlok elérési útvonalának kezelésére használt modul.

- Funkció:
  - A useruploadpic middleware lehetővé teszi a felhasználói profilkép feltöltését az Express.js alkalmazásba.
  - Minden felhasználó saját mappájába menti a képeket (public/userpics/{user_id}/).
  
I. Funkcionalitás:
- destination:
  - A fájlokat a public/userpics/{user_id} mappába tárolja.
  - Ha a mappa nem létezik, automatikusan létrehozza a fs.mkdirSync segítségével (recursive: true).
- filename:
  - A fájl nevét a következő formátumban generálja: <dátum>-<eredeti_fájlnév>.
  - A dátum ISO 8601 formátumban van, például: 2025-04-23.

II. Upload (Feltöltési beállítások):
- fileSize limit: A feltöltött fájl maximális mérete 10MB.
- fileFilter: A fájl típusát ellenőrizzük a fileTypes változó segítségével. A megengedett formátumok:
  - **jpg, jpeg, png, gif, svg, webp, avif, bmp, tiff**
- Ha a fájl kiterjesztése vagy MIME típusa nem egyezik a megadott típusokkal, akkor hibaüzenetet küldünk: "csak képeket lehet feltölteni".

- Válasz:
  - Sikeres feltöltés: A fájl sikeresen feltöltődik a szerverre.
  - Hiba: Hiányzó user_id vagy érvénytelen formátum.

</details>

---

<details>
<summary>Models</summary>

- userModel.js – Felhasználói adatbázis műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. findByEmail(email) – Email alapján keresés:
- Funkció:
  - Lekéri egy felhasználót az email cím alapján
- Válasz:
  - Ha találat van, visszaadja a felhasználó adatait (egy objektum)
  - Ha nincs találat, null értékkel tér vissza

II. createUser(username, email, hash) – Új felhasználó létrehozása:
- Funkció:
  - Létrehoz egy új felhasználót az adatbázisban
  - A role alapértelmezett értéke: "user"
  - created_at mezőbe beállítja a jelenlegi időpontot (CURRENT_TIMESTAMP)
- Válasz:
  - insertId: Az újonnan létrehozott felhasználó azonosítója

III. isValidEmail(email) – Email formátum validálása:
- Funkció:
  - Ellenőrzi, hogy a megadott email cím érvényes-e (regex alapján)
- Válasz:
  - true: Érvényes email cím
  - false: Érvénytelen email cím

IV. insertUserImg(user_id, img) – Profilkép beszúrása:
- Funkció:
  - Beszúr egy új profilképet a users_img táblába
- Válasz:
  - A beszúrt adatokhoz tartozó eredmény objektum

V. showuserprofilepic(user_id) – Profilkép lekérdezése:
- Funkció:
  - Lekéri a felhasználó profilképének elérési útvonalát
- Válasz:
  - A kép elérési útvonala (string formájában)

VI. deleteUserImg(user_id) – Profilkép törlése:
- Funkció:
  - Törli a felhasználó profilképét az adatbázisból
- Válasz:
  - A törölt adatokhoz tartozó eredmény objektum

VII. edituserdata(username, email, password, user_id) – Felhasználói adatok módosítása:
- Funkció:
  - Módosítja a felhasználó nevét, email címét és jelszavát
- Válasz:
  - A módosított adatokhoz tartozó eredmény objektum

VIII. deleteuserdata(user_id) – Felhasználó törlése:
- Funkció:
  - Törli a felhasználót az adatbázisból
- Válasz:
  - A törölt adatokhoz tartozó eredmény objektum

IX. viewalluser() – Összes felhasználó lekérdezése:
- Funkció:
  - Lekéri az összes felhasználót a users táblából
- Válasz:
  - A felhasználók tömbje (több objektum is lehet)

X. adminedituser(username, email, password, role, user_id) – Felhasználói adatok módosítása admin jogosultsággal:
- Funkció:
  - Módosítja a felhasználó nevét, email címét, jelszavát és szerepkörét
- Válasz:
  - A módosított adatokhoz tartozó eredmény objektum

XI. getallcarswithimg() – Összes jármű lekérdezése (megtalálható képpel):
- Funkció:
  - Lekéri az összes járművet a vehicles táblából
  - JOIN segítségével hozzáadja a képeket is (vehicles_img tábla)
- Válasz:
  - A járművek és képek tömbje

XII. currentUserfromid(user_id) – Felhasználó lekérdezése user_id alapján:
- Funkció:
  - Lekéri a felhasználót az adatbázisból a user_id alapján
- Válasz:
  - A felhasználó adatai (egy objektum)

XIII. currentUser(user_id) – Felhasználó lekérdezése user_id alapján:
- Funkció:
  - Lekéri a felhasználót az adatbázisból a user_id alapján
- Válasz:
  - A felhasználó adatai (egy objektum)

---

- reserveModel.js – Foglalási műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. reservation(user_id) – Saját foglalások lekérdezése:
- Funkció:
  - Lekéri a felhasználó összes foglalását
  - JOIN segítségével hozzáadja a jármű adatait is (vehicles tábla)
- Válasz:
  - A felhasználó foglalásainak tömbje

II. checkAvailability(vehicle_id, pickup_date, return_date) – Jármű elérhetőségének ellenőrzése:
- Funkció:
  - Ellenőrzi, hogy a jármű elérhető-e az adott időszakra
  - Keres olyan foglalásokat, amelyek átfedésben vannak az új foglalással
  - Csak az 'lefoglalva' és 'active_rental' státuszú foglalásokat veszi figyelembe
- Válasz:
  - Ha van konfliktus, visszaadja a konfliktusokat (tömb)
  - Ha nincs konfliktus, üres tömbbel tér vissza

III. newreservation(user_id, vehicle_id, pickup_date, return_date) – Új foglalás létrehozása:
- Funkció:
  - Létrehoz egy új foglalást az adatbázisban
  - Először ellenőrzi az elérhetőséget (checkAvailability)
  - Ha nincs konfliktus, létrehozza a foglalást 'lefoglalva' státuszban
- Válasz:
  - Sikeres létrehozás: A beszúrt adatokhoz tartozó eredmény objektum
  - Ha konfliktus van, hibaüzenetet dob: "Ez a jármű lefoglalt az adott időszakra"

IV. updatereservation(vehicle_id, pickup_date, return_date, status, reservation_id) – Foglalás módosítása:
- Funkció:
  - Módosítja egy foglalás adatait
- Válasz:
  - A módosított adatokhoz tartozó eredmény objektum

V. deletereservation(reservation_id, user_id) – Foglalás törlése:
- Funkció:
  - Törli egy foglalást (csak a saját felhasználó törölheti)
- Válasz:
  - A törölt adatokhoz tartozó eredmény objektum

---

- rentalModel.js – Kibérles műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. allrentals() – Összes kibérlés lekérdezése:
- Funkció:
  - Lekéri az összes kibérlést a rentals táblából
- Válasz:
  - A kibérlések tömbje

II. myrental(user_id) – Felhasználó kibérléseinek lekérdezése:
- Funkció:
  - Lekéri egy adott felhasználó összes kibérlését
- Válasz:
  - A felhasználó kibérléseinek tömbje

III. newrental(reservation_id, vehicle_id, user_id, start_time, expected_return, actual_return, status, damage_notes) – Új kibérlés létrehozása:
- Funkció:
  - Létrehoz egy új kibérést az adatbázisban
  - A status és damage_notes mezők megadhatók paraméterként
- Válasz:
  - A beszúrt adatokhoz tartozó eredmény objektum

IV. updaterental(reservation_id, vehicle_id, start_time, expected_return, actual_return, status, damage_notes, user_id) – Kibérlés módosítása:
- Funkció:
  - Módosítja egy kibérles adatait
- Válasz:
  - A módosított adatokhoz tartozó eredmény objektum

V. deleterental(rental_id) – Kibérlés törlése:
- Funkció:
  - Törli egy kibérést a rental_id alapján
- Válasz:
  - A törölt adatokhoz tartozó eredmény objektum

VI. updatereservationstatus(status, reservation_id) – Foglalás státusz módosítása:
- Funkció:
  - Módosítja egy foglalás státuszát (pl. 'active_rental', 'completed')
- Válasz:
  - A módosított adatokhoz tartozó eredmény objektum

---

- adminModel.js – Adminisztrátori adatbázis műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. findByEmail(email) – Email alapján keresés (admin):
- Funkció:
  - Lekéri egy admin felhasználót az email cím alapján
  - Csak azokat a felhasználókat adja vissza, akiknek role="admin"
- Válasz:
  - Ha találat van, visszaadja a felhasználó adatait (egy objektum)
  - Ha nincs találat, null értékkel tér vissza

II. isValidEmail(email) – Email formátum validálása:
- Funkció:
  - Ellenőrzi, hogy a megadott email cím érvényes-e (regex alapján)
- Válasz:
  - true: Érvényes email cím
  - false: Érvénytelen email cím

---

- cardataModel.js – Jármű adatbázis műveletek
  - ### **Függőségeg:**
    - database (db): MySQL adatbázis kapcsolat

I. getcardata() – Összes jármű lekérdezése:
- Funkció:
  - Lekéri az összes járművet a vehicles táblából
  - A mysql2/promise formátumban adja vissza az eredményt (result[0])
- Válasz:
  - A járművek tömbje

II. insernewvehicle(category_id, brand, model, color, transmission, license_plate, year, price_per_day) – Új jármű beszúrása:
- Funkció:
  - Létrehoz egy új járművet az adatbázisban
- Válasz:
  - A beszúrt adatokhoz tartozó eredmény objektum

III. editvehicle(category_id, brand, model, color, transmission, license_plate, year, price_per_day, vehicle_id) – Jármű adatainak módosítása:
- Funkció:
  - Módosítja egy jármű adatait
- Válasz:
  - A módosított adatokhoz tartozó eredmény objektum

IV. deletevehicle(vehicle_id) – Jármű törlése:
- Funkció:
  - Törli egy járművet a vehicle_id alapján
- Válasz:
  - A törölt adatokhoz tartozó eredmény objektum

---

- carImgModel.js – Jármű kép műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. insertVehicleImg(vehicle_id, img) – Járműkép beszúrása:
- Funkció:
  - Beszúr egy új járműképet a vehicles_img táblába
- Válasz:
  - A beszúrt adatokhoz tartozó eredmény objektum

II. allVehicleImg() – Összes járműkép lekérdezése:
- Funkció:
  - Lekéri az összes járműhöz tartozó képet
  - JOIN segítségével kapcsolja össze a vehicles táblával
- Válasz:
  - A járművekhez tartozó képek tömbje

III. delCarImg(vehicle_id) – Járműkép törlése:
- Funkció:
  - Törli egy járműhöz tartozó képeket az adatbázisból
- Válasz:
  - A törölt adatokhoz tartozó eredmény objektum

---

- categoryModel.js – Kategória műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. viewallcategory() – Összes kategória lekérdezése:
- Funkció:
  - Lekéri az összes kategóriát a vehicle_category táblából
- Válasz:
  - A kategóriák tömbje

II. addNewcategory(name) – Új kategória létrehozása:
- Funkció:
  - Létrehoz egy új kategóriát a vehicle_category táblában
- Válasz:
  - A beszúrt adatokhoz tartozó eredmény objektum

III. updateCategory(name, category_id) – Kategória módosítása:
- Funkció:
  - Módosítja egy kategória nevét
- Válasz:
  - A módosított adatokhoz tartozó eredmény objektum

IV. deleteCategory(category_id) – Kategória törlése:
- Funkció:
  - Törli egy kategóriát a category_id alapján
- Válasz:
  - A törölt adatokhoz tartozó eredmény objektum

---

- filterModels.js – Szűrési műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. filterVehicles(filters) – Jármű szűrés kritériumok alapján:
- Funkció:
  - Dinamikus SQL lekérdezést hoz létre a szűrési kritériumok alapján
  - Támogatott szűrési feltételek: brand, color, transmission, year, min_price, max_price
  - Rendezés növekvő vagy csökkenő sorrendben (price_per_day szerint)
- Válasz:
  - A szűrt járművek tömbje

---

- AdminreserveModel.js – Admin foglalás műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. Adminreservation() – Összes admin foglalás lekérdezése:
- Funkció:
  - Lekéri az összes foglalást a reservations táblából
- Válasz:
  - A foglalások tömbje

II. Adminupdatereservation(user_id, vehicle_id, pickup_date, return_date, status, created_at, reservation_id) – Admin foglalás módosítása:
- Funkció:
  - Módosítja egy foglalás adatait adminisztrátori jogosultsággal
- Válasz:
  - A módosított adatokhoz tartozó eredmény objektum

III. Admindeletereservation(reservation_id) – Admin foglalás törlése:
- Funkció:
  - Törli egy foglalást a reservation_id alapján adminisztrátori jogosultsággal
- Válasz:
  - A törölt adatokhoz tartozó eredmény objektum

---

</details>

# app.js – Alkalmazás belépési pontja
  1. Függőségek:
    - express: A szerver létrehozásához használt web framework.
    - cookie-parser: A HTTP-sütik kezeléséhez (JWT token cookie-ban történő tárolása).
    - cors: A cross-origin kérések kezelése a frontend (localhost:5173, netlify) és backend között.
    - path: Az elérési utak kezelésére szolgáló natív Node.js modul.
   
  2. CORS beállítások:
     - origin: ['http://localhost:5173', 'https://urbanrentalbaross.netlify.app']
     - credentials: true (sütik küldése cross-origin kérésekben)
  
  3. Betöltött route-ok:
      - /users: Felhasználói műveletek (regisztráció, bejelentkezés, profil, foglalások, szűrés)
      - /admin: Adminisztrátori műveletek (jármű kezelés, kategória kezelés, felhasználók kezelése, foglalások, kibérlések)
      - /global: Nyilvános útvonalak (járműkatalógus, szűrés bejelentkezés nélkül is elérhető)
      - /api/payments: Fizetési műveletek (fizetés feldolgozása, ár számítás)
  
  4. Middleware-ek:
     - express.json(): A JSON típusú body-k elemzése.
     - cookieParser(): Sütik olvasása a kérésekből.
     - express.urlencoded({ extended: true }): URL-kódolt body-k elemzése.
     - cors(): CORS beállítások engedélyezése.

  5. Statikus fájlkezelés:
     - app.use('/public', express.static(...)): A feltöltött fájlokat (képek) statikus útvonalon keresztül teszi elérhetővé.
  
  6. Megjegyzések:
     - Több route modul van regisztrálva, amelyek közös middlewareket használnak (auth, admin).
     - Az upload middleware képekre van beállítva, külön profilkép feltöltés is elérhető.

---

# Adatbázis Sémák:

## users tábla:
- user_id: INT (AUTO_INCREMENT, PRIMARY KEY)
- username: VARCHAR(255) – Felhasználónév
- email: VARCHAR(255) – Email cím (egedi)
- password: VARCHAR(255) – Jelszó (titkosítva bcrypt-al)
- role: ENUM('user', 'admin') – Szerepkör
- created_at: DATETIME – Létrehozás időpontja

## users_img tábla:
- user_id: INT (FOREIGN KEY, REFERENCES users.user_id)
- user_img: VARCHAR(255) – Profilkép elérési útvonala

## reservations tábla:
- reservation_id: INT (AUTO_INCREMENT, PRIMARY KEY)
- user_id: INT (FOREIGN KEY, REFERENCES users.user_id)
- vehicle_id: INT (FOREIGN KEY, REFERENCES vehicles.vehicle_id)
- pickup_date: DATE – Felveszés dátuma
- return_date: DATE – Visszaadás dátuma
- status: ENUM('lefoglalva', 'active_rental', 'completed') – Státusz
- created_at: DATETIME – Létrehozás időpontja

## rentals tábla:
- rental_id: INT (AUTO_INCREMENT, PRIMARY KEY)
- reservation_id: INT (FOREIGN KEY, REFERENCES reservations.reservation_id)
- vehicle_id: INT (FOREIGN KEY, REFERENCES vehicles.vehicle_id)
- user_id: INT (FOREIGN KEY, REFERENCES users.user_id)
- start_time: DATETIME – Kibérles kezdete
- expected_return: DATETIME – Várható visszaadás
- actual_return: DATETIME – Tényleges visszaadás
- status: ENUM('active', 'completed') – Státusz
- damage_notes: TEXT – Károsodások megjegyzései

## vehicles tábla:
- vehicle_id: INT (AUTO_INCREMENT, PRIMARY KEY)
- category_id: INT (FOREIGN KEY, REFERENCES vehicle_category.category_id)
- brand: VARCHAR(255) – Marka
- model: VARCHAR(255) – Modell
- color: VARCHAR(100) – Szín
- transmission: ENUM('manual', 'automatic') – Váltó típusa
- license_plate: VARCHAR(20) – Rendszám
- year: INT – Évjárat
- price_per_day: DECIMAL(10, 2) – Ár naponta

## vehicles_img tábla:
- vehicle_id: INT (FOREIGN KEY, REFERENCES vehicles.vehicle_id)
- img: VARCHAR(255) – Kép elérési útvonala

## vehicle_category tábla:
- category_id: INT (AUTO_INCREMENT, PRIMARY KEY)
- name: VARCHAR(255) – Kategória neve