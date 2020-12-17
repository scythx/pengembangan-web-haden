CREATE SEQUENCE "articleId_sequence"
  INCREMENT 1
  START 1
  MINVALUE 1
  MAXVALUE 100000
  CACHE 1;

CREATE SEQUENCE "leagueId_sequence"
  INCREMENT 1
  START 1
  MINVALUE 1
  MAXVALUE 10000
  CACHE 1;

CREATE SEQUENCE "sportId_sequence"
  INCREMENT 1
  START 1
  MINVALUE 1
  MAXVALUE 10000
  CACHE 1;

CREATE SEQUENCE "teamId_sequence"
  INCREMENT 1
  START 1
  MINVALUE 1
  MAXVALUE 10000
  CACHE 1;

CREATE TABLE IF NOT EXISTS sport (
  id_sport bigserial NOT NULL,
  name text COLLATE pg_catalog."default",
  CONSTRAINT sport_pkey
  PRIMARY KEY (id_sport));

CREATE TABLE IF NOT EXISTS images (
  id INT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  unique_name TEXT NOT NULL,
  extension TEXT NOT NULL,
  PRIMARY KEY(ID));

CREATE TABLE IF NOT EXISTS league (
  id_league bigserial NOT NULL,
  name text COLLATE pg_catalog."default",
  sport_id bigint NOT NULL,
  country text COLLATE pg_catalog."default",
  CONSTRAINT league_pkey PRIMARY KEY (id_league),
  CONSTRAINT sport_fkey FOREIGN KEY (sport_id)
  REFERENCES sport (id_sport) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
  NOT VALID);

CREATE TABLE IF NOT EXISTS users (
  id_user BIGSERIAL PRIMARY KEY NOT NULL,
  fullname VARCHAR (255) NOT NULL,
  email VARCHAR (255) NOT NULL,
  password_digest VARCHAR (60) NOT NULL,
  is_subscribed_newsletter boolean NOT NULL,
  is_writer boolean NOT NULL,
  created_on date NOT NULL);

CREATE TABLE IF NOT EXISTS team (
  id_team bigserial NOT NULL,
  name text COLLATE pg_catalog."default",
  sport_id bigint NOT NULL,
  country text COLLATE pg_catalog."default",
  CONSTRAINT team_pkey PRIMARY KEY (id_team),
  CONSTRAINT sport_id_fkey FOREIGN KEY (sport_id)
  REFERENCES sport (id_sport) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION);

CREATE TABLE IF NOT EXISTS match (
  id_match BIGSERIAL PRIMARY KEY NOT NULL,
  home_team_id BIGINT NOT NULL,
  away_team_id BIGINT,
  home_score INT NOT NULL,
  away_score INT,
  league_id BIGINT NOT NULL,
  sport_id BIGINT NOT NULL,
  FOREIGN KEY(home_team_id) REFERENCES team(id_team),
  FOREIGN KEY(away_team_id) REFERENCES team(id_team),
  FOREIGN KEY(league_id) REFERENCES league(id_league),
  FOREIGN KEY(sport_id) REFERENCES sport(id_sport));

CREATE TABLE IF NOT EXISTS article (
  id_article bigserial NOT NULL,
  title text COLLATE pg_catalog."default",
  author text COLLATE pg_catalog."default",
  content text COLLATE pg_catalog."default",
  date_published date,
  is_headline boolean,
  id_sport integer,
  id_league integer,
  id_team integer,
  user_id integer,
  CONSTRAINT article_pkey PRIMARY KEY (id_article));

CREATE TABLE IF NOT EXISTS user_fav_league(
    id_fav_league bigserial NOT NULL,
    user_id integer NOT NULL,
    league_id integer NOT NULL,
    CONSTRAINT user_fav_league_pkey PRIMARY KEY (id_fav_league)
);

CREATE TABLE IF NOT EXISTS user_fav_sport(
    id_fav_sport bigserial NOT NULL,
    user_id integer NOT NULL,
    sport_id integer NOT NULL,
    CONSTRAINT user_fav_sport_pkey PRIMARY KEY (id_fav_sport)
);

CREATE TABLE IF NOT EXISTS user_fav_team(
    id_fav_team bigserial NOT NULL,
    user_id integer NOT NULL,
    team_id integer NOT NULL,
    CONSTRAINT user_fav_team_pkey PRIMARY KEY (id_fav_team)
);

INSERT INTO
  sport (name)
VALUES
  ('Basketball'),
  ('American Football'),
  ('Soccer'),
  ('Baseball'),
  ('Tennis'),
  ('MMA');

INSERT INTO league
  (sport_id, name, country)
VALUES
  (1, 'NBA', 'United States'),
  (2, 'NFL', 'United States'),
  (4, 'MLB', 'United States'),
  (3, 'Premier League', 'England');
  (3, 'UEFA Champions League', 'Europe');

INSERT INTO
  team (name, sport_id, country)
VALUES
  ('Los Angeles Lakers', 1, 'United States'),
  ('New York Giants', 2, 'United States'),
  ('Manchester United F.C.', 3, 'England'),
  ('New York Yankees', 4, 'United States');

INSERT INTO
  article (title, author, content, date_published, is_headline, id_sport, id_league)
VALUES
  ('LaMelo Ball mengadakan latihan di depan personel Warriors, Hornets, Pistons', 'Harden', 'Nomor 1 overall pick LaMelo Ball melakukan latihan individu di depan kepala dan eksekutif untuk Golden State Warriors, Charlotte Hornets, dan Detroit Pistons pada kamis di California Selatan.', '2020-11-17', true, 1, 1),
  ('Sources : James Harden menolak perpanjangan Rockets, fokus pada trade ke Nets', 'Harden', 'Setelah menolak kesempatan menjadi pemain pertama dengan bayaran 50 juta USD per tahun dalam sejarah liga, All-NBA guard nya Houston Rockets, James Harden telah menjelaskan kepada ownership bahwa dia sangat fokus pada trade ke Brooklyn Nets, sumber mengatakan kepada ESPN.', '2020-11-17', true, 1, 1),
  ('DeMar DeRozan menggunakan opsi pemainnya untuk kembali ke San Antonio', 'Harden', 'Small forward DeMar DeRozan telah menggunakan opsi pemainnya untuk musim mendatang dan akan tetap bersama San Antonio Spurs, tim mengumumkannya.', '2020-11-17', false, 1, 1),
  ('Sumber: Milwaukee Bucks menyetujui kesepakatan untuk Jrue Holiday New Orleans Pelicans, Bogdan Bogdanovic dari Sacramento Kings', 'Harden', 'Milwaukee Bucks menjanjikan MVP berturut-turut Giannis Antetokounmpo sebuah roster yang dibentuk ulang untuk mencoba mengubah kesuksesan musim reguler menjadi dorongan kejuaraan. Dalam rentang jam Senin malam hingga Selasa pagi, Bucks mencapai kesepakatan untuk mengakuisisi dua pemain penting, guard New Orleans Pelicans Jrue Holiday dan forward Sacramento Kings Bogdan Bogdanovic, kata sumber kepada ESPN.', '2020-11-17', false, 1, 1),
  ('Bintang Dallas Mavericks Kristaps Porzingis absen di awal musim NBA', 'Harden', 'Bintang big man Dallas Mavericks Kristaps Porzingis akan absen untuk memulai musim karena ia terus melakukan rehabilitasi dari operasi untuk memperbaiki meniskus di lutut kanannya, menurut presiden operasi bola basket Mavs Donnie Nelson.', '2020-11-17', false, 1, 1),
  ('Hati Neymar sangat besar- bos PSG Tuchel memuji pemain Brasil sebab memberikan penalti kepada Mbappe untuk mengakhiri kekeringan', 'Harden', 'Pemain internasional Prancis itu mengakhiri 9 pertandingan di Liga Champions tanpa berhasil dengan mencetak 2 berhasil melawan Basaksehir', '2020-12-10', true, 3, 5),
  ('‘Tujuan kami ialah jadi lebih baik’ - Bernardo Silva mengatakan motivasi Manchester City di Liga Champions', 'Harden', 'Raksasa Liga Premier sudah berjuang di kompetisi klub top Eropa serta ingin mengganti nasib mereka, menurut playmaker tersebut.', '2020-11-17', false, 3, 5),
  ('Bos Liverpool Klopp menerangkan kenapa Salah bermain penuh sepanjang 90 menit melawan Midtjylland', 'Harden', 'Pemain internasional Mesir itu tampil sepanjang durasi game walaupun The Reds sudah mengamankan pertumbuhan Liga Champions', '2020-11-17', false, 3, 5),
  ('Ozil betul- betul setia & masih jadi bagian dari tim- Leno membela handal Arsenal yang tersisih', 'Harden', 'Penjaga gawang The Gunners bersikeras kalau playmaker yang lagi berjuang itu senantiasa berkomitmen penuh kepada klub walaupun terjebak di pinggir lapangan.', '2020-11-17', true, 3, 4),
  ('‘Salah wajib disalahkan namun ia menyebarkan ketakutan di antara para pengecut di kamp Mesir’- Mido mengancam bintang Liverpool sebab tertular Covid- 19 di perkawinan kerabat laki- lakinya', 'Harden', 'Penyerang The Reds wajib mengisolasi diri, memaksanya buat absen di pertandingan berarti buat klub serta negaranya, serta tindakannya dipertanyakan.', '2020-11-17', false, 3, 4),
  ('Dallas Cowboys Tidak Takut untuk Menekan Kontrak Besar dengan Dak Prescott', 'Harden', 'Di Philadelphia Eagles baru saja mencadangkan quarterback (QB) seharga 128 US$ untuk memberi kesempatan bagi rookie QB Jalen Hurts. Di Dallas situasinya tidak jauh berbeda, cederanya Dak Prescott membuat Dallas tidak memiliki QB yang baik dan harus mempertimbangkan pemain free agents.', '2020-12-10', true, 2, 2),
  ('GM Cleveland Browns : Baker Mayfield “layak mendapatkan banyak pujian” untuk performa di tahun 2020', 'Harden', 'Setelah mengalahkan Tennessee Titans di minggu ke-13 Baker Mayfield dan Cleveland Browns terlihat lebih berbahaya daripada sebelumnya. Tetapi, jika anda cermati, QB muda ini tidak hanya mengalami peningkatan performa secara bertahap di tahun ketiga, tetapi juga perannya sebagai kekuatan yang kokoh untuk Browns franchise di musim yang seperti ini.', '2020-11-17', true, 2, 2),
  ('Larry Fitzgerald mendahulukan “Bertahan Hidup” Dibandingkan Karir Perihal COVID-19', 'Harden', 'Penerima Hall of Fame di masa depan Larry Fitzgerald kembali dari daftar pemain cadangan Arizona Cardinals setelah absen dari dua pertandingan karena COVID-19. Pria berusia 37 tahun ini melewati masa yang sulit selama melawan virus COID-19.', '2020-11-17', false, 2, 2),
  ('Kansas City Chiefs QB Patrick Mahomes memimpin pemungutan suara Pro Bowl', 'Harden', 'Quarterback Patrick Mahomes, dengan 261.305 suara, memimpin proses pemungutan suara untuk Pro Bowl 2021 yang diadakan oleh Verizon. Di sisi lain QB Seattle Seahawks Russel Wilson dengan 251.39- suara menempati urutan kedua secara keseluruhan. Posisi ketiga ditempati oleh Derrick Henry running back dari Tennessee Titans. Posisi keempat ditempati oleh Travis Kelce tight end dari tim yang sama dengan Patrick Mahomes, Dan posisi nomor lima ditempati oleh running back dari Minnesota Vikings Dalvin Cook.', '2020-11-17', true, 2, 2),
  ('Cam Newton, Kekalahan Patriots dari Rams setelah mencetak 45 poin di minggu sebelumnya', 'Harden', 'Hal baik hanya bertahan untuk New England Patriots selama satu minggu. Kekalahan 24-3 dari Los Angeles Rams menghancurkan semuanya.', '2020-11-17', true, 2, 2);

INSERT INTO 
  user_fav_sport (user_id, sport_id)
VALUES 
  (1, 1),
  (1, 3),
  (2, 3);

INSERT INTO 
  user_fav_league (user_id, league_id)
VALUES 
  (1, 1),
  (1, 5),
  (2, 4);

INSERT INTO 
  user_fav_team (user_id, team_id)
VALUES 
  (1, 1),
  (1, 3),
  (2, 3);