CREATE OR REPLACE PACKAGE druh_package AS
    PROCEDURE insert_druh(p_nazev VARCHAR);
    PROCEDURE update_druh(p_druh_id NUMBER, p_nazev VARCHAR);
    PROCEDURE delete_druh(p_druh_id NUMBER);
END druh_package;
/

CREATE OR REPLACE PACKAGE BODY druh_package AS

    PROCEDURE insert_druh(p_nazev VARCHAR) AS
    BEGIN
        INSERT INTO DRUH (nazev) VALUES (p_nazev);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_druh;

    PROCEDURE update_druh(p_druh_id NUMBER, p_nazev VARCHAR) AS
    BEGIN
        UPDATE DRUH SET nazev = p_nazev WHERE druh_id = p_druh_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_druh;

    PROCEDURE delete_druh(p_druh_id NUMBER) AS
    BEGIN
        DELETE FROM DRUH WHERE druh_id = p_druh_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_druh;
END druh_package;
/



CREATE OR REPLACE PACKAGE krmeni_package AS
    PROCEDURE insert_krmeni(p_nazev VARCHAR, p_osetrovatel_id NUMBER);
    PROCEDURE update_krmeni(p_krmeni_id NUMBER, p_nazev VARCHAR, p_osetrovatel_id NUMBER);
    PROCEDURE delete_krmeni(p_krmeni_id NUMBER);
END krmeni_package;
/

CREATE OR REPLACE PACKAGE BODY krmeni_package AS
    PROCEDURE insert_krmeni(p_nazev VARCHAR, p_osetrovatel_id NUMBER) AS
    BEGIN
        INSERT INTO KRMENI (nazev, osetrovatel_id) VALUES (p_nazev, p_osetrovatel_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20101, SQLERRM);
    END insert_krmeni;

    PROCEDURE update_krmeni(p_krmeni_id NUMBER, p_nazev VARCHAR, p_osetrovatel_id NUMBER) AS
    BEGIN
        UPDATE KRMENI SET nazev = p_nazev, osetrovatel_id = p_osetrovatel_id WHERE krmeni_id = p_krmeni_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20101, SQLERRM);
    END update_krmeni;

    PROCEDURE delete_krmeni(p_krmeni_id NUMBER) AS
    BEGIN
        DELETE FROM KRMENI WHERE krmeni_id = p_krmeni_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20101, SQLERRM);
    END delete_krmeni;
END krmeni_package;
/



CREATE OR REPLACE PACKAGE medikament_package AS
    PROCEDURE insert_medikament(p_nazev VARCHAR, p_osetrovatel_id NUMBER);
    PROCEDURE update_medikament(p_medikament_id NUMBER, p_nazev VARCHAR, p_osetrovatel_id NUMBER);
    PROCEDURE delete_medikament(p_medikament_id NUMBER);
END medikament_package;
/

CREATE OR REPLACE PACKAGE BODY medikament_package AS
    PROCEDURE insert_medikament(p_nazev VARCHAR, p_osetrovatel_id NUMBER) AS
    BEGIN
        INSERT INTO MEDIKAMENT (nazev, osetrovatel_id) VALUES (p_nazev, p_osetrovatel_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_medikament;

    PROCEDURE update_medikament(p_medikament_id NUMBER, p_nazev VARCHAR, p_osetrovatel_id NUMBER) AS
    BEGIN
        UPDATE MEDIKAMENT SET nazev = p_nazev, osetrovatel_id = p_osetrovatel_id WHERE medikament_id = p_medikament_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_medikament;

    PROCEDURE delete_medikament(p_medikament_id NUMBER) AS
    BEGIN
        DELETE FROM MEDIKAMENT WHERE medikament_id = p_medikament_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_medikament;
END medikament_package;
/



CREATE OR REPLACE PACKAGE medikament_zvire_package AS
    PROCEDURE insert_medikament_zvire(p_medikament_id NUMBER, p_zvire_id NUMBER, p_datum DATE);
    PROCEDURE update_medikament_zvire(p_medikament_id NUMBER, p_zvire_id NUMBER, p_datum DATE);
    PROCEDURE delete_medikament_zvire(p_medikament_zvire_id NUMBER);
END medikament_zvire_package;
/

CREATE OR REPLACE PACKAGE BODY medikament_zvire_package AS
    PROCEDURE insert_medikament_zvire(p_medikament_id NUMBER, p_zvire_id NUMBER, p_datum DATE) AS
    BEGIN
        INSERT INTO medikament_zvire (medikament_id, zvire_id, datum) VALUES (p_medikament_id, p_zvire_id, p_datum);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_medikament_zvire;

    PROCEDURE update_medikament_zvire(p_medikament_id NUMBER, p_zvire_id NUMBER, p_datum DATE) AS
    BEGIN
        UPDATE medikament_zvire SET datum = p_datum WHERE medikament_id = p_medikament_id AND zvire_id = p_zvire_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_medikament_zvire;

    PROCEDURE delete_medikament_zvire(p_medikament_zvire_id NUMBER) AS
    BEGIN
        DELETE FROM medikament_zvire WHERE medikament_zvire_id = p_medikament_zvire_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_medikament_zvire;
END medikament_zvire_package;
/



CREATE OR REPLACE PACKAGE nemocnost_package AS
    PROCEDURE insert_nemocnost(p_nazev VARCHAR, p_datum DATE, p_zvire_id NUMBER);
    PROCEDURE update_nemocnost(p_nemocnost_id NUMBER, p_nazev VARCHAR, p_datum DATE, p_zvire_id NUMBER);
    PROCEDURE delete_nemocnost(p_nemocnost_id NUMBER);
END nemocnost_package;
/

CREATE OR REPLACE PACKAGE BODY nemocnost_package AS
    PROCEDURE insert_nemocnost(p_nazev VARCHAR, p_datum DATE, p_zvire_id NUMBER) AS
    BEGIN
        INSERT INTO NEMOCNOST (nazev, datum, zvire_id) VALUES (p_nazev, p_datum, p_zvire_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_nemocnost;

    PROCEDURE update_nemocnost(p_nemocnost_id NUMBER, p_nazev VARCHAR, p_datum DATE, p_zvire_id NUMBER) AS
    BEGIN
        UPDATE NEMOCNOST SET nazev = p_nazev, datum = p_datum WHERE nemocnost_id = p_nemocnost_id AND zvire_id = p_zvire_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_nemocnost;

    PROCEDURE delete_nemocnost(p_nemocnost_id NUMBER) AS
    BEGIN
        DELETE FROM NEMOCNOST WHERE nemocnost_id = p_nemocnost_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_nemocnost;
END nemocnost_package;
/



CREATE OR REPLACE PACKAGE osetrovatel_package AS
    PROCEDURE insert_osetrovatel(p_jmeno VARCHAR, p_prijmeni VARCHAR, p_plat NUMBER, p_email VARCHAR,
                                 p_manazer_id NUMBER);
    PROCEDURE update_osetrovatel(p_osetrovatel_id NUMBER, p_jmeno VARCHAR, p_prijmeni VARCHAR, p_plat NUMBER,
                                 p_email VARCHAR, p_manazer_id NUMBER);
    PROCEDURE delete_osetrovatel(p_osetrovatel_id NUMBER);
END osetrovatel_package;
/

CREATE OR REPLACE PACKAGE BODY osetrovatel_package AS
    PROCEDURE insert_osetrovatel(p_jmeno VARCHAR, p_prijmeni VARCHAR, p_plat NUMBER, p_email VARCHAR,
                                 p_manazer_id NUMBER) AS
    BEGIN
        INSERT INTO OSETROVATEL (jmeno, prijmeni, plat, email, manazer_id)
        VALUES (p_jmeno, p_prijmeni, p_plat, p_email, p_manazer_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_osetrovatel;

    PROCEDURE update_osetrovatel(p_osetrovatel_id NUMBER, p_jmeno VARCHAR, p_prijmeni VARCHAR, p_plat NUMBER,
                                 p_email VARCHAR, p_manazer_id NUMBER) AS
    BEGIN
        UPDATE OSETROVATEL
        SET jmeno      = p_jmeno,
            prijmeni   = p_prijmeni,
            plat       = p_plat,
            email      = p_email,
            manazer_id = p_manazer_id
        WHERE osetrovatel_id = p_osetrovatel_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_osetrovatel;

    PROCEDURE delete_osetrovatel(p_osetrovatel_id NUMBER) AS
    BEGIN
        DELETE FROM OSETROVATEL WHERE osetrovatel_id = p_osetrovatel_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_osetrovatel;
END osetrovatel_package;
/



CREATE OR REPLACE PACKAGE pece_package AS
    PROCEDURE insert_pece(p_nazev VARCHAR);
    PROCEDURE update_pece(p_pece_id NUMBER, p_nazev VARCHAR);
    PROCEDURE delete_pece(p_pece_id NUMBER);
END pece_package;
/

CREATE OR REPLACE PACKAGE BODY pece_package AS
    PROCEDURE insert_pece(p_nazev VARCHAR) AS
    BEGIN
        INSERT INTO PECE (nazev) VALUES (p_nazev);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_pece;

    PROCEDURE update_pece(p_pece_id NUMBER, p_nazev VARCHAR) AS
    BEGIN
        UPDATE PECE SET nazev = p_nazev WHERE pece_id = p_pece_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_pece;

    PROCEDURE delete_pece(p_pece_id NUMBER) AS
    BEGIN
        DELETE FROM PECE WHERE pece_id = p_pece_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_pece;
END pece_package;
/



CREATE OR REPLACE PACKAGE umisteni_package AS
    PROCEDURE insert_umisteni(p_velikost NUMBER, p_nazev VARCHAR);
    PROCEDURE update_umisteni(p_umisteni_id NUMBER, p_velikost NUMBER, p_nazev VARCHAR);
    PROCEDURE delete_umisteni(p_umisteni_id NUMBER);
END umisteni_package;
/

CREATE OR REPLACE PACKAGE BODY umisteni_package AS
    PROCEDURE insert_umisteni(p_velikost NUMBER, p_nazev VARCHAR) AS
    BEGIN
        INSERT INTO UMISTENI (velikost, nazev) VALUES (p_velikost, p_nazev);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_umisteni;

    PROCEDURE update_umisteni(p_umisteni_id NUMBER, p_velikost NUMBER, p_nazev VARCHAR) AS
    BEGIN
        UPDATE UMISTENI SET velikost = p_velikost, nazev = p_nazev WHERE umisteni_id = p_umisteni_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_umisteni;

    PROCEDURE delete_umisteni(p_umisteni_id NUMBER) AS
    BEGIN
        DELETE FROM UMISTENI WHERE umisteni_id = p_umisteni_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_umisteni;
END umisteni_package;
/



CREATE OR REPLACE PACKAGE zvire_package AS
    PROCEDURE insert_zvire(p_jmeno VARCHAR, p_zeme_puvodu VARCHAR, p_cip VARCHAR, p_druh_id NUMBER,
                           p_osetrovatel_id NUMBER, p_umisteni_id NUMBER);
    PROCEDURE update_zvire(p_zvire_id NUMBER, p_jmeno VARCHAR, p_zeme_puvodu VARCHAR, p_cip VARCHAR, p_druh_id NUMBER,
                           p_osetrovatel_id NUMBER, p_umisteni_id NUMBER);
    PROCEDURE delete_zvire(p_zvire_id NUMBER);
END zvire_package;
/

CREATE OR REPLACE PACKAGE BODY zvire_package AS
    PROCEDURE insert_zvire(p_jmeno VARCHAR, p_zeme_puvodu VARCHAR, p_cip VARCHAR, p_druh_id NUMBER,
                           p_osetrovatel_id NUMBER, p_umisteni_id NUMBER) AS
    BEGIN
        INSERT INTO ZVIRE (jmeno, zeme_puvodu, cip, druh_id, osetrovatel_id, umisteni_id)
        VALUES (p_jmeno, p_zeme_puvodu, p_cip, p_druh_id, p_osetrovatel_id, p_umisteni_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_zvire;

    PROCEDURE update_zvire(p_zvire_id NUMBER, p_jmeno VARCHAR, p_zeme_puvodu VARCHAR, p_cip VARCHAR, p_druh_id NUMBER,
                           p_osetrovatel_id NUMBER, p_umisteni_id NUMBER) AS
    BEGIN
        UPDATE ZVIRE
        SET jmeno          = p_jmeno,
            cip            = p_cip,
            zeme_puvodu    = p_zeme_puvodu,
            druh_id        = p_druh_id,
            osetrovatel_id = p_osetrovatel_id,
            umisteni_id    = p_umisteni_id
        WHERE zvire_id = p_zvire_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_zvire;

    PROCEDURE delete_zvire(p_zvire_id NUMBER) AS
    BEGIN
        DELETE FROM ZVIRE WHERE zvire_id = p_zvire_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_zvire;
END zvire_package;
/




CREATE OR REPLACE PACKAGE vodni_package AS
    PROCEDURE insert_vodni(p_zvire_id NUMBER, p_typ_vody_id NUMBER);
    PROCEDURE update_vodni(p_zvire_id NUMBER, p_typ_vody_id NUMBER);
    PROCEDURE delete_vodni(p_zvire_id NUMBER);
END vodni_package;
/

CREATE OR REPLACE PACKAGE BODY vodni_package AS
    PROCEDURE insert_vodni(p_zvire_id NUMBER, p_typ_vody_id NUMBER) AS
    BEGIN
        INSERT INTO VODNI (zvire_id, typ_vody_id) VALUES (p_zvire_id, p_typ_vody_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_vodni;

    PROCEDURE update_vodni(p_zvire_id NUMBER, p_typ_vody_id NUMBER) AS
    BEGIN
        UPDATE VODNI SET typ_vody_id = p_typ_vody_id WHERE zvire_id = p_zvire_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_vodni;

    PROCEDURE delete_vodni(p_zvire_id NUMBER) AS
    BEGIN
        DELETE FROM VODNI WHERE zvire_id = p_zvire_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_vodni;
END vodni_package;
/



CREATE OR REPLACE PACKAGE suchozemske_package AS
    PROCEDURE insert_suchozemske(p_zvire_id NUMBER);
    PROCEDURE delete_suchozemske(p_zvire_id NUMBER);
END suchozemske_package;
/

CREATE OR REPLACE PACKAGE BODY suchozemske_package AS
    PROCEDURE insert_suchozemske(p_zvire_id NUMBER) AS
    BEGIN
        INSERT INTO SUCHOZEMSKE (zvire_id) VALUES (p_zvire_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_suchozemske;

    PROCEDURE delete_suchozemske(p_zvire_id NUMBER) AS
    BEGIN
        DELETE FROM SUCHOZEMSKE WHERE zvire_id = p_zvire_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_suchozemske;
END suchozemske_package;
/



CREATE OR REPLACE PACKAGE pece_zvire_package AS
    PROCEDURE insert_pece_zvire(p_pece_id NUMBER, p_zvire_id NUMBER);
    PROCEDURE delete_pece_zvire(p_pece_zvire_id NUMBER);
END pece_zvire_package;
/

CREATE OR REPLACE PACKAGE BODY pece_zvire_package AS
    PROCEDURE insert_pece_zvire(p_pece_id NUMBER, p_zvire_id NUMBER) AS
    BEGIN
        INSERT INTO PECE_ZVIRE (PECE_ID, ZVIRE_ID) VALUES (p_pece_id, p_zvire_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_pece_zvire;

    PROCEDURE delete_pece_zvire(p_pece_zvire_id NUMBER) AS
    BEGIN
        DELETE FROM PECE_ZVIRE WHERE pece_zvire_id = p_pece_zvire_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_pece_zvire;
END pece_zvire_package;
/



CREATE OR REPLACE PACKAGE zvire_krmeni_package AS
    PROCEDURE insert_zvire_krmeni(p_zvire_id NUMBER, p_krmeni_id NUMBER);
    PROCEDURE delete_zvire_krmeni(p_zvire_krmeni_id NUMBER);
END zvire_krmeni_package;
/

CREATE OR REPLACE PACKAGE BODY zvire_krmeni_package AS
    PROCEDURE insert_zvire_krmeni(p_zvire_id NUMBER, p_krmeni_id NUMBER) AS
    BEGIN
        INSERT INTO ZVIRE_KRMENI (KRMENI_ID, ZVIRE_ID) VALUES (p_krmeni_id, p_zvire_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_zvire_krmeni;

    PROCEDURE delete_zvire_krmeni(p_zvire_krmeni_id NUMBER) AS
    BEGIN
        DELETE FROM ZVIRE_KRMENI WHERE zvire_krmeni_id = p_zvire_krmeni_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_zvire_krmeni;
END zvire_krmeni_package;
/



CREATE OR REPLACE PACKAGE uzivatel_package AS
    PROCEDURE insert_uzivatel(p_jmeno VARCHAR, p_prijmeni VARCHAR, p_email VARCHAR, p_heslo VARCHAR, p_role_id NUMBER);
    PROCEDURE update_uzivatel(p_uzivatel_id NUMBER, p_jmeno VARCHAR, p_prijmeni VARCHAR, p_email VARCHAR, p_heslo VARCHAR, p_role_id NUMBER);
    PROCEDURE delete_uzivatel(p_uzivatel_id NUMBER);
END uzivatel_package;
/

CREATE OR REPLACE PACKAGE BODY uzivatel_package AS
    PROCEDURE insert_uzivatel(p_jmeno VARCHAR, p_prijmeni VARCHAR, p_email VARCHAR, p_heslo VARCHAR, p_role_id NUMBER) AS
    BEGIN
        INSERT INTO UZIVATEL (jmeno, prijmeni, email, heslo, role_id) VALUES (p_jmeno, p_prijmeni, p_email, p_heslo, p_role_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_uzivatel;

    PROCEDURE update_uzivatel(p_uzivatel_id NUMBER, p_jmeno VARCHAR, p_prijmeni VARCHAR, p_email VARCHAR, p_heslo VARCHAR, p_role_id NUMBER) AS
    BEGIN
        UPDATE UZIVATEL SET jmeno = p_jmeno, prijmeni = p_prijmeni, email = p_email, heslo = p_heslo, role_id = p_role_id WHERE uzivatel_id = p_uzivatel_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_uzivatel;

    PROCEDURE delete_uzivatel(p_uzivatel_id NUMBER) AS
    BEGIN
        DELETE FROM UZIVATEL WHERE uzivatel_id = p_uzivatel_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_uzivatel;
END uzivatel_package;
/



CREATE OR REPLACE PACKAGE soubor_package AS
    PROCEDURE insert_soubor(p_soubor_id NUMBER, p_data BLOB, p_nazev VARCHAR, p_typ VARCHAR, p_medikamentZvireId NUMBER,
                            p_osetrovatelId NUMBER);
    PROCEDURE update_soubor(p_soubor_id NUMBER, p_data BLOB, p_nazev VARCHAR, p_typ VARCHAR, p_medikamentZvireId NUMBER,
                            p_osetrovatelId NUMBER);
    PROCEDURE delete_soubor(p_soubor_id NUMBER);
END soubor_package;
/

CREATE OR REPLACE PACKAGE BODY soubor_package AS
    PROCEDURE insert_soubor(p_soubor_id NUMBER, p_data BLOB, p_nazev VARCHAR, p_typ VARCHAR, p_medikamentZvireId NUMBER,
                            p_osetrovatelId NUMBER) AS
        v_type VARCHAR2(200);
    BEGIN
        v_type := filetype(p_typ);
        INSERT INTO SOUBOR (soubor_id, data, nazev, typ, medikament_zvire_id, osetrovatel_Id)
        VALUES (p_soubor_id, p_data, p_nazev, v_type, p_medikamentZvireId, p_osetrovatelId);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_soubor;

    PROCEDURE update_soubor(p_soubor_id NUMBER, p_data BLOB, p_nazev VARCHAR, p_typ VARCHAR,
                            p_medikamentZvireId NUMBER, p_osetrovatelId NUMBER) AS
        v_type VARCHAR2(200);
    BEGIN
        v_type := filetype(p_typ);
        UPDATE SOUBOR
        SET data                = p_data,
            nazev               = p_nazev,
            typ                 = v_type,
            medikament_zvire_id = p_medikamentZvireId,
            osetrovatel_id      = p_osetrovatelId
        WHERE soubor_id = p_soubor_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_soubor;

    PROCEDURE delete_soubor(p_soubor_id NUMBER) AS
    BEGIN
        DELETE FROM SOUBOR WHERE soubor_id = p_soubor_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_soubor;
END soubor_package;
/



CREATE OR REPLACE PACKAGE typ_vody_package AS
    PROCEDURE insert_typ_vody(p_nazev VARCHAR);
    PROCEDURE update_typ_vody(p_typ_vody_id NUMBER, p_nazev VARCHAR);
    PROCEDURE delete_typ_vody(p_typ_vody_id NUMBER);
END typ_vody_package;
/

CREATE OR REPLACE PACKAGE BODY typ_vody_package AS

    PROCEDURE insert_typ_vody(p_nazev VARCHAR) AS
    BEGIN
        INSERT INTO TYP_VODY (nazev) VALUES (p_nazev);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END insert_typ_vody;

    PROCEDURE update_typ_vody(p_typ_vody_id NUMBER, p_nazev VARCHAR) AS
    BEGIN
        UPDATE TYP_VODY SET nazev = p_nazev WHERE typ_vody_id = p_typ_vody_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END update_typ_vody;

    PROCEDURE delete_typ_vody(p_typ_vody_id NUMBER) AS
    BEGIN
        DELETE FROM TYP_VODY WHERE typ_vody_id = p_typ_vody_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20100, SQLERRM);
    END delete_typ_vody;
END typ_vody_package;
/