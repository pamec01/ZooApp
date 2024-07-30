CREATE OR REPLACE TRIGGER ZVIRE_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON ZVIRE
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.zvire_id || ', ' || :old.umisteni_id || ', ' || :old.osetrovatel_id || ', ' || :old.druh_id ||
                ', ' || :old.jmeno || ', ' || :old.zeme_puvodu || ', ' || :old.cip,
                :new.zvire_id || ', ' || :new.umisteni_id || ', ' || :new.osetrovatel_id || ', ' || :new.druh_id ||
                ', ' || :new.jmeno || ', ' || :new.zeme_puvodu || ', ' || :new.cip,
                SYS_CONTEXT('USERENV', 'SESSION_USER'),
                CURRENT_TIMESTAMP, 'ZVIRE', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.zvire_id || ', ' || :new.umisteni_id || ', ' || :new.osetrovatel_id || ', ' || :new.druh_id ||
                    ', ' || :new.jmeno || ', ' || :new.zeme_puvodu || ', ' || :new.cip,
                SYS_CONTEXT('USERENV', 'SESSION_USER'),
                CURRENT_TIMESTAMP, 'ZVIRE', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.zvire_id || ', ' || :old.umisteni_id || ', ' || :old.osetrovatel_id || ', ' || :old.druh_id ||
                ', ' || :old.jmeno || ', ' || :old.zeme_puvodu || ', ' || :old.cip, '',
                SYS_CONTEXT('USERENV', 'SESSION_USER'),
                CURRENT_TIMESTAMP, 'ZVIRE', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER DRUH_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON DRUH
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.druh_id || ', ' || :old.nazev, :new.druh_id || ', ' || :new.nazev,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'DRUH', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.druh_id || ', ' || :new.nazev, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP,
                'DRUH', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.druh_id || ', ' || :old.nazev, '', SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP,
                'DRUH', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER KRMENI_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON KRMENI
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.krmeni_id || ', ' || :old.nazev || ', ' || :old.osetrovatel_id,
                :new.krmeni_id || ', ' || :new.nazev || ', ' || :new.osetrovatel_id,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'KRMENI', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.krmeni_id || ', ' || :new.nazev || ', ' || :new.osetrovatel_id,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'KRMENI', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.krmeni_id || ', ' || :old.nazev || ', ' || :old.osetrovatel_id, '',
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'KRMENI', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER MEDIKAMENT_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON MEDIKAMENT
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.medikament_id || ', ' || :old.nazev || ', ' || :old.osetrovatel_id,
                :new.medikament_id || ', ' || :new.nazev || ', ' || :new.osetrovatel_id,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'MEDIKAMENT', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.medikament_id || ', ' || :new.nazev || ', ' || :new.osetrovatel_id,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'MEDIKAMENT', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.medikament_id || ', ' || :old.nazev || ', ' || :old.osetrovatel_id, '',
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'MEDIKAMENT', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER NEMOCNOST_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON NEMOCNOST
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.nemocnost_id || ', ' || :old.nazev || ', ' || :old.zvire_id || ', ' || :old.datum,
                :new.nemocnost_id || ', ' || :new.nazev || ', ' || :new.zvire_id || ', ' || :new.datum,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'NEMOCNOST', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.nemocnost_id || ', ' || :new.nazev || ', ' || :new.zvire_id || ', ' || :new.datum,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'NEMOCNOST', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.nemocnost_id || ', ' || :old.nazev || ', ' || :old.zvire_id || ', ' || :old.datum, '',
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'NEMOCNOST', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER OSETROVATEL_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON OSETROVATEL
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.osetrovatel_id || ', ' || :old.jmeno || ', ' || :old.prijmeni || ', ' || :old.plat || ', ' ||
                :old.email || ', ' || :old.manazer_id,
                :new.osetrovatel_id || ', ' || :new.jmeno || ', ' || :new.prijmeni || ', ' || :new.plat || ', ' ||
                :new.email || ', ' || :new.manazer_id,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'OSETROVATEL', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.osetrovatel_id || ', ' || :new.jmeno || ', ' || :new.prijmeni || ', ' || :new.plat || ', ' ||
                    :new.email || ', ' || :new.manazer_id,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'OSETROVATEL', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.osetrovatel_id || ', ' || :old.jmeno || ', ' || :old.prijmeni || ', ' || :old.plat || ', ' ||
                :old.email || ', ' || :old.manazer_id, '',
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'OSETROVATEL', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER PECE_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON PECE
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.pece_id || ', ' || :old.nazev, :new.pece_id || ', ' || :new.nazev,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'PECE', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.pece_id || ', ' || :new.nazev, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP,
                'PECE', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.pece_id || ', ' || :old.nazev, '', SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP,
                'PECE', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER ROLE_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON ROLE
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.role_id || ', ' || :old.nazev, :new.role_id || ', ' || :new.nazev,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'ROLE', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.role_id || ', ' || :new.nazev, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP,
                'ROLE', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.role_id || ', ' || :old.nazev, '', SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP,
                'ROLE', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER SUCHOZEMSKE_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON SUCHOZEMSKE
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.zvire_id, :new.zvire_id, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP,
                'SUCHOZEMSKE', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.zvire_id, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'SUCHOZEMSKE',
                'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.zvire_id, '', SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'SUCHOZEMSKE',
                'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER UMISTENI_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON UMISTENI
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.umisteni_id || ', ' || :old.velikost || ', ' || :old.nazev,
                :new.umisteni_id || ', ' || :new.velikost || ', ' || :new.nazev, SYS_CONTEXT('USERENV', 'SESSION_USER'),
                CURRENT_TIMESTAMP, 'UMISTENI', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.umisteni_id || ', ' || :new.velikost || ', ' || :new.nazev,
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'UMISTENI', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.umisteni_id || ', ' || :old.velikost || ', ' || :old.nazev, '',
                SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'UMISTENI', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER UZIVATEL_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON UZIVATEL
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.uzivatel_id || ', ' || :old.jmeno || ', ' || :old.prijmeni || ', ' || :old.email || ', ' ||
                :old.role_id,
                :new.uzivatel_id || ', ' || :new.jmeno || ', ' || :new.prijmeni || ', ' || :new.email || ', ' ||
                :new.role_id, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'UZIVATEL', 'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.uzivatel_id || ', ' || :new.jmeno || ', ' || :new.prijmeni || ', ' || :new.email || ', ' ||
                    :new.role_id, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'UZIVATEL',
                'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.uzivatel_id || ', ' || :old.jmeno || ', ' || :old.prijmeni || ', ' || :old.email || ', ' ||
                :old.role_id, '', SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'UZIVATEL',
                'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER VODNI_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON VODNI
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.zvire_id, :new.zvire_id, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'VODNI',
                'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('', :new.zvire_id, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'VODNI', 'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.zvire_id, '', SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'VODNI', 'DELETE');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER SOUBOR_LOG
    BEFORE INSERT OR DELETE OR UPDATE
    ON SOUBOR
    FOR EACH ROW
BEGIN
    IF
        UPDATING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.soubor_id || ', ' || :old.nazev || ', ' || :old.typ || ', ' || :old.medikament_zvire_id || ', ' ||
                :old.osetrovatel_id,
                :new.soubor_id || ', ' || :new.nazev || ', ' || :new.typ || ', ' || :new.medikament_zvire_id || ', ' ||
                :new.osetrovatel_id, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'SOUBOR',
                'UPDATE');
    ELSIF
        INSERTING THEN
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES ('',
                :new.soubor_id || ', ' || :new.nazev || ', ' || :new.typ || ', ' || :new.medikament_zvire_id || ', ' ||
                :new.osetrovatel_id, SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'SOUBOR',
                'INSERT');
    ELSE
        INSERT INTO LOGGING_TABLE (PRED, PO, KDO, KDY, KDE, OPERACE)
        VALUES (:old.soubor_id || ', ' || :old.nazev || ', ' || :old.typ || ', ' || :old.medikament_zvire_id || ', ' ||
                :old.osetrovatel_id, '', SYS_CONTEXT('USERENV', 'SESSION_USER'), CURRENT_TIMESTAMP, 'SOUBOR',
                'DELETE');
    END IF;
END;
/