CREATE TABLE druh
(
    druh_id NUMBER       NOT NULL,
    nazev   VARCHAR2(40) NOT NULL
);

ALTER TABLE druh
    ADD CONSTRAINT zarazeni_pk PRIMARY KEY (druh_id);

CREATE TABLE krmeni
(
    krmeni_id      NUMBER       NOT NULL,
    nazev          VARCHAR2(40) NOT NULL,
    osetrovatel_id NUMBER       NOT NULL
);

ALTER TABLE krmeni
    ADD CONSTRAINT krmeni_pk PRIMARY KEY (krmeni_id);

CREATE TABLE medikament
(
    medikament_id  NUMBER       NOT NULL,
    nazev          VARCHAR2(40) NOT NULL,
    osetrovatel_id NUMBER       NOT NULL
);

ALTER TABLE medikament
    ADD CONSTRAINT medikament_pk PRIMARY KEY (medikament_id);

CREATE TABLE medikament_zvire
(
    medikament_zvire_id NUMBER NOT NULL,
    medikament_id       NUMBER NOT NULL,
    zvire_id            NUMBER NOT NULL,
    datum               DATE   NOT NULL
);

ALTER TABLE medikament_zvire
    ADD CONSTRAINT medikament_zvire_pk PRIMARY KEY (medikament_zvire_id);

CREATE TABLE nemocnost
(
    nemocnost_id NUMBER       NOT NULL,
    nazev        VARCHAR2(40) NOT NULL,
    zvire_id     NUMBER       NOT NULL,
    datum        DATE         NOT NULL
);

ALTER TABLE nemocnost
    ADD CONSTRAINT nemocnost_pk PRIMARY KEY (nemocnost_id);

CREATE TABLE osetrovatel
(
    osetrovatel_id NUMBER        NOT NULL,
    jmeno          VARCHAR2(60)  NOT NULL,
    prijmeni       VARCHAR2(60)  NOT NULL,
    plat           NUMBER        NOT NULL,
    email          VARCHAR2(100) NOT NULL UNIQUE,
    manazer_id     NUMBER
);

ALTER TABLE osetrovatel
    ADD CONSTRAINT osetrovatel_pk PRIMARY KEY (osetrovatel_id);

ALTER TABLE osetrovatel
    ADD CONSTRAINT osetrovatel_osetrovatel_fk FOREIGN KEY (manazer_id)
        REFERENCES osetrovatel (osetrovatel_id)
            ON DELETE CASCADE;

CREATE TABLE pece
(
    pece_id NUMBER       NOT NULL,
    nazev   VARCHAR2(40) NOT NULL
);

ALTER TABLE pece
    ADD CONSTRAINT pece_pk PRIMARY KEY (pece_id);

CREATE TABLE pece_zvire
(
    pece_zvire_id NUMBER NOT NULL,
    pece_id       NUMBER NOT NULL,
    zvire_id      NUMBER NOT NULL
);

ALTER TABLE pece_zvire
    ADD CONSTRAINT pece_zvire_pk PRIMARY KEY (pece_zvire_id);

CREATE TABLE suchozemske
(
    zvire_id NUMBER NOT NULL
);

ALTER TABLE suchozemske
    ADD CONSTRAINT suchozemske_pk PRIMARY KEY (zvire_id);

CREATE TABLE umisteni
(
    umisteni_id NUMBER       NOT NULL,
    velikost    NUMBER       NOT NULL,
    nazev       VARCHAR2(40) NOT NULL
);

ALTER TABLE umisteni
    ADD CONSTRAINT umisteni_pk PRIMARY KEY (umisteni_id);

CREATE TABLE typ_vody
(
    typ_vody_id NUMBER       NOT NULL PRIMARY KEY,
    nazev       VARCHAR(100) NOT NULL
);

CREATE TABLE vodni
(
    zvire_id    NUMBER NOT NULL,
    typ_vody_id NUMBER NOT NULL
);

ALTER TABLE vodni
    ADD CONSTRAINT vodni_pk PRIMARY KEY (zvire_id);

ALTER TABLE vodni
    ADD CONSTRAINT typ_vody_vody_fk FOREIGN KEY (typ_vody_id)
        REFERENCES typ_vody (typ_vody_id)
            ON DELETE CASCADE;

CREATE TABLE zvire
(
    zvire_id       NUMBER        NOT NULL,
    cip            VARCHAR2(200) NOT NULL UNIQUE,
    umisteni_id    NUMBER        NOT NULL,
    osetrovatel_id NUMBER        NOT NULL,
    druh_id        NUMBER        NOT NULL,
    jmeno          VARCHAR2(40)  NOT NULL,
    zeme_puvodu    VARCHAR2(60)  NOT NULL,
    soubory_id     NUMBER
);

ALTER TABLE zvire
    ADD CONSTRAINT zvire_pk PRIMARY KEY (zvire_id);

CREATE TABLE zvire_krmeni
(
    zvire_krmeni_id NUMBER NOT NULL,
    krmeni_id       NUMBER NOT NULL,
    zvire_id        NUMBER NOT NULL
);

ALTER TABLE zvire_krmeni
    ADD CONSTRAINT zvire_krmeni_pk PRIMARY KEY (zvire_krmeni_id);

ALTER TABLE krmeni
    ADD CONSTRAINT krmeni_osetrovatel_fk FOREIGN KEY (osetrovatel_id)
        REFERENCES osetrovatel (osetrovatel_id)
            ON DELETE CASCADE;

ALTER TABLE medikament
    ADD CONSTRAINT medikament_osetrovatel_fk FOREIGN KEY (osetrovatel_id)
        REFERENCES osetrovatel (osetrovatel_id)
            ON DELETE CASCADE;

ALTER TABLE nemocnost
    ADD CONSTRAINT nemocnost_zvire_fk FOREIGN KEY (zvire_id)
        REFERENCES zvire (zvire_id)
            ON DELETE CASCADE;

ALTER TABLE zvire_krmeni
    ADD CONSTRAINT relation_3_krmeni_fk FOREIGN KEY (krmeni_id)
        REFERENCES krmeni (krmeni_id)
            ON DELETE CASCADE;

ALTER TABLE zvire_krmeni
    ADD CONSTRAINT relation_3_zvire_fk FOREIGN KEY (zvire_id)
        REFERENCES zvire (zvire_id)
            ON DELETE CASCADE;

ALTER TABLE medikament_zvire
    ADD CONSTRAINT relation_6_medikament_fk FOREIGN KEY (medikament_id)
        REFERENCES medikament (medikament_id)
            ON DELETE CASCADE;

ALTER TABLE medikament_zvire
    ADD CONSTRAINT relation_6_zvire_fk FOREIGN KEY (zvire_id)
        REFERENCES zvire (zvire_id)
            ON DELETE CASCADE;

ALTER TABLE pece_zvire
    ADD CONSTRAINT relation_9_pece_fk FOREIGN KEY (pece_id)
        REFERENCES pece (pece_id)
            ON DELETE CASCADE;

ALTER TABLE pece_zvire
    ADD CONSTRAINT relation_9_zvire_fk FOREIGN KEY (zvire_id)
        REFERENCES zvire (zvire_id)
            ON DELETE CASCADE;

ALTER TABLE suchozemske
    ADD CONSTRAINT suchozemske_zvire_fk FOREIGN KEY (zvire_id)
        REFERENCES zvire (zvire_id)
            ON DELETE CASCADE;

ALTER TABLE vodni
    ADD CONSTRAINT vodni_zvire_fk FOREIGN KEY (zvire_id)
        REFERENCES zvire (zvire_id)
            ON DELETE CASCADE;

ALTER TABLE zvire
    ADD CONSTRAINT zvire_druh_fk FOREIGN KEY (druh_id)
        REFERENCES druh (druh_id)
            ON DELETE CASCADE;

ALTER TABLE zvire
    ADD CONSTRAINT zvire_osetrovatel_fk FOREIGN KEY (osetrovatel_id)
        REFERENCES osetrovatel (osetrovatel_id)
            ON DELETE CASCADE;

ALTER TABLE zvire
    ADD CONSTRAINT zvire_umisteni_fk FOREIGN KEY (umisteni_id)
        REFERENCES umisteni (umisteni_id)
            ON DELETE CASCADE;

alter table umisteni
    add constraint druh_uniq UNIQUE (velikost, nazev);

CREATE TABLE role
(
    role_id NUMBER       NOT NULL,
    nazev   VARCHAR2(40) NOT NULL UNIQUE
);

ALTER TABLE role
    ADD CONSTRAINT role_pk PRIMARY KEY (role_id);

CREATE TABLE uzivatel
(
    uzivatel_id NUMBER       NOT NULL,
    jmeno       VARCHAR2(40) NOT NULL,
    prijmeni    VARCHAR2(40) NOT NULL,
    email       VARCHAR(60)  NOT NULL UNIQUE,
    heslo       VARCHAR(100) NOT NULL,
    role_id     NUMBER       NOT NULL
);

ALTER TABLE uzivatel
    ADD CONSTRAINT uzivatel_pk PRIMARY KEY (uzivatel_id);

ALTER TABLE uzivatel
    ADD CONSTRAINT uzivatel_role_fk FOREIGN KEY (role_id)
        REFERENCES role (role_id)
            ON DELETE CASCADE;

CREATE TABLE logging_table
(
    logging_table_id NUMBER NOT NULL,
    pred             VARCHAR(2000),
    po               VARCHAR(2000),
    kdo              VARCHAR(100),
    kdy              VARCHAR(100),
    kde              VARCHAR(100),
    operace          VARCHAR(100)
);

ALTER TABLE logging_table
    ADD CONSTRAINT loggingtable_pk PRIMARY KEY (logging_table_id);

CREATE TABLE soubor
(
    soubor_id           NUMBER        NOT NULL,
    data                BLOB          NOT NULL,
    nazev               VARCHAR2(250) NOT NULL,
    typ                 VARCHAR2(250),
    medikament_zvire_id NUMBER        NOT NULL,
    osetrovatel_id      NUMBER        NOT NULL
);

ALTER TABLE soubor
    ADD CONSTRAINT soubor_pk PRIMARY KEY (soubor_id);

ALTER TABLE soubor
    ADD CONSTRAINT soubor_medikament_zvire_fk FOREIGN KEY (medikament_zvire_id)
        REFERENCES medikament_zvire (medikament_zvire_id)
            ON DELETE CASCADE;

ALTER TABLE soubor
    ADD CONSTRAINT soubor_osetrovatel_fk FOREIGN KEY (osetrovatel_id)
        REFERENCES osetrovatel (osetrovatel_id)
            ON DELETE CASCADE;

CREATE TABLE zpravy
(
    zpravy_id NUMBER    NOT NULL,
    kdo                 VARCHAR(100) NOT NULL,
    komu                VARCHAR(100) NOT NULL,
    obsah_zpravy        VARCHAR(1000) NOT NULL
);
ALTER TABLE zpravy
    ADD CONSTRAINT zpravy_pk PRIMARY KEY (zpravy_id);