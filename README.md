# UrbanRental Backend
## A projektről

>Az **UrbanRental** egy modern webes alkalmazás, amely autók bérlését teszi lehetővé online. A felhasználóknak lehetőséget adunk arra, hogy böngésszenek különböző autókat, foglaljanak időpontot, kezeljék saját profiljukat és foglalásaikat, valamint adminisztrátorok számára teljes körű felügyeleti funkciókkal rendelkezünk. A projekt React 19 alapú SPA (Single Page Application) megoldás, amely gyors, dinamikus felhasználói élményt biztosít.

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

I. login – Admin bejelentkezés

II. whoAmI – Admin adatok lekérdezése

III. logout – Admin kijelentkezés

IV. carwithimgupload – Jármű feltöltése képekkel

V. delVehicleImg – Járműkép törlése

VI. deletewholevehicle – Jármű teljes törlése

VII. editcar – Jármű adatainak módosítása

VIII. showcdwi – Összes jármű lekérdezése (megtalálható képpel)

IX. allusers – Összes felhasználó lekérdezése

X. editoneuser – Felhasználó adatainak módosítása (admin jogosultsággal)

XI. banuser – Felhasználó törlése (bánás)

---

- 📋 RentalController.js:
  - ### **Függőségek:**
    1. database (rentalModel): Kibérlésekhez kapcsolódó SQL műveletek

I. viewARs – Összes kibérlés lekérdezése:

II. viewRs – Felhasználó kibérléseinek lekérdezése

III. NewRs – Új kibérlés létrehozása


IV. URs – Kibérlés módosítása

V. Drs – Kibérlés törlése

---

- 📋 UserreservationCont.js:
  - ### **Függőségek:**
    1. bcryptjs, jsonwebtoken: Hitelesítés (jelenleg nem aktív)
    2. database (reserveModel): Foglalásokhoz kapcsolódó SQL műveletek

I. viewRs – Felhasználói foglalások lekérdezése


II. NewRs – Új felhasználói foglalás létrehozása


III. URs – Foglalás módosítása


IV. Drs – Foglalás törlése


---

- 📋 AdminReservationCont.js:
  - ### **Függőségek:**
    1. bcryptjs, jsonwebtoken: Hitelesítés (jelenleg nem aktív)
    2. database (AdminreserveModel): Admin oldali foglalásokhoz kapcsolódó SQL műveletek

I. viewAdminreservations – Összes admin foglalás lekérdezése


II. UAdminreservations – Admin foglalás módosítása


III. DAdminreservations – Admin foglalás törlése

---

- 💳 paymentController.js:
  - ### **Függőségek:**
    1. database (db): MySQL adatbázis kapcsolat

I. processMockPayment – Szimulált fizetés feldolgozása

II. calculateRentalAmount – Kibérles árának számítása

III. calculateRentalDays – Kibérles napjainak számítása

IV. getCarPriceById – Jármű árának lekérdezése

---

- 🏷️ categoryController.js:
  - ### **Függőségek:**
    1. database (categoryModel): Kategóriákhoz kapcsolódó SQL műveletek

I. viewallC – Összes kategória lekérdezése

II. addNewC – Új kategória létrehozása

III. updateC – Kategória módosítása

IV. deleteC – Kategória törlése

---

- 🔍 FilterController.js:
  - ### **Függőségek:**
    1. database (filterModels): Szűréshez kapcsolódó SQL műveletek

I. filterCars – Jármű szűrés kritériumok alapján:

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

II. Upload (Feltöltési beállítások):
- fileSize limit: A feltöltött fájl maximális mérete 10MB.
- fileFilter: A fájl típusát ellenőrizzük a fileTypes változó segítségével. A megengedett formátumok:
  - **jpg, jpeg, png, gif, svg, webp, avif, bmp, tiff**
- Ha a fájl kiterjesztése vagy MIME típusa nem egyezik a megadott típusokkal, akkor hibaüzenetet küldünk: "csak képeket lehet feltölteni".


</details>

---

<details>
<summary>Models</summary>

- userModel.js – Felhasználói adatbázis műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. findByEmail(email) – Email alapján keresés

II. createUser(username, email, hash) – Új felhasználó létrehozása

III. isValidEmail(email) – Email formátum validálása

IV. insertUserImg(user_id, img) – Profilkép beszúrása

V. showuserprofilepic(user_id) – Profilkép lekérdezése

VI. deleteUserImg(user_id) – Profilkép törlése

VII. edituserdata(username, email, password, user_id) – Felhasználói adatok módosítása

VIII. deleteuserdata(user_id) – Felhasználó törlése

IX. viewalluser() – Összes felhasználó lekérdezése

X. adminedituser(username, email, password, role, user_id) – Felhasználói adatok módosítása admin jogosultsággal

XI. getallcarswithimg() – Összes jármű lekérdezése (megtalálható képpel)

XII. currentUserfromid(user_id) – Felhasználó lekérdezése user_id alapján

XIII. currentUser(user_id) – Felhasználó lekérdezése user_id alapján

---

- reserveModel.js – Foglalási műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. reservation(user_id) – Saját foglalások lekérdezése

II. checkAvailability(vehicle_id, pickup_date, return_date) – Jármű elérhetőségének ellenőrzése

III. newreservation(user_id, vehicle_id, pickup_date, return_date) – Új foglalás létrehozása

IV. updatereservation(vehicle_id, pickup_date, return_date, status, reservation_id) – Foglalás módosítása

V. deletereservation(reservation_id, user_id) – Foglalás törlése

---

- rentalModel.js – Kibérles műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. allrentals() – Összes kibérlés lekérdezése

II. myrental(user_id) – Felhasználó kibérléseinek lekérdezése

III. newrental(reservation_id, vehicle_id, user_id, start_time, expected_return, actual_return, status, damage_notes) – Új kibérlés létrehozása

IV. updaterental(reservation_id, vehicle_id, start_time, expected_return, actual_return, status, damage_notes, user_id) – Kibérlés módosítása

V. deleterental(rental_id) – Kibérlés törlése

VI. updatereservationstatus(status, reservation_id) – Foglalás státusz módosítása

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

I. getcardata() – Összes jármű lekérdezése

II. insernewvehicle(category_id, brand, model, color, transmission, license_plate, year, price_per_day) – Új jármű beszúrása

III. editvehicle(category_id, brand, model, color, transmission, license_plate, year, price_per_day, vehicle_id) – Jármű adatainak módosítása

IV. deletevehicle(vehicle_id) – Jármű törlése

---

- carImgModel.js – Jármű kép műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. insertVehicleImg(vehicle_id, img) – Járműkép beszúrása

II. allVehicleImg() – Összes járműkép lekérdezése

III. delCarImg(vehicle_id) – Járműkép törlése

---

- categoryModel.js – Kategória műveletek
  - ### **Függőségek:**
    - database (db): MySQL adatbázis kapcsolat

I. viewallcategory() – Összes kategória lekérdezése

II. addNewcategory(name) – Új kategória létrehozása

III. updateCategory(name, category_id) – Kategória módosítása

IV. deleteCategory(category_id) – Kategória törlése

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

I. Adminreservation() – Összes admin foglalás lekérdezése

II. Adminupdatereservation(user_id, vehicle_id, pickup_date, return_date, status, created_at, reservation_id) – Admin foglalás módosítása

III. Admindeletereservation(reservation_id) – Admin foglalás törlése

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

---

# Telepítés és használat:

## Lokális fejlesztés:

# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

---
### Használt eszközök

- [VS code](https://code.visualstudio.com)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [W3Schools](https://www.w3schools.com)
- [StackOverflow](https://stackoverflow.com/questions)
- [ChatGPT](https://chatgpt.com)
- [GitHub](https://github.com/)
- [Netlify](https://www.netlify.com)
- [Figma](https://www.figma.com)
- [FontAwesome](https://fontawesome.com)