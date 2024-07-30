CREATE OR REPLACE TRIGGER druh_insert_trigger
    BEFORE INSERT ON DRUH
    FOR EACH ROW
    WHEN (new.druh_id IS NULL)
BEGIN
    :new.druh_id := druh_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER krmeni_insert_trigger
    BEFORE INSERT ON KRMENI
    FOR EACH ROW
    WHEN (new.krmeni_id IS NULL)
BEGIN
    :new.krmeni_id := krmeni_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER medikament_insert_trigger
    BEFORE INSERT ON MEDIKAMENT
    FOR EACH ROW
    WHEN (new.medikament_id IS NULL)
BEGIN
    :new.medikament_id := medikament_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER nemocnost_insert_trigger
    BEFORE INSERT ON NEMOCNOST
    FOR EACH ROW
    WHEN (new.nemocnost_id IS NULL)
BEGIN
    :new.nemocnost_id := nemocnost_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER osetrovatel_insert_trigger
    BEFORE INSERT ON OSETROVATEL
    FOR EACH ROW
    WHEN (new.osetrovatel_id IS NULL)
BEGIN
    :new.osetrovatel_id := osetrovatel_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER pece_insert_trigger
    BEFORE INSERT ON PECE
    FOR EACH ROW
    WHEN (new.pece_id IS NULL)
BEGIN
    :new.pece_id := pece_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER umisteni_insert_trigger
    BEFORE INSERT ON UMISTENI
    FOR EACH ROW
    WHEN (new.umisteni_id IS NULL)
BEGIN
    :new.umisteni_id := umisteni_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER zvire_insert_trigger
    BEFORE INSERT ON ZVIRE
    FOR EACH ROW
    WHEN (new.zvire_id IS NULL)
BEGIN
    :new.zvire_id := zvire_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER uzivatel_insert_trigger
    BEFORE INSERT ON UZIVATEL
    FOR EACH ROW
    WHEN (new.uzivatel_id IS NULL)
BEGIN
    :new.uzivatel_id := uzivatel_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER role_insert_trigger
    BEFORE INSERT ON UZIVATEL
    FOR EACH ROW
    WHEN (new.role_id IS NULL)
BEGIN
    :new.role_id := role_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER LOGGINGTABLE_INSERT_TRIGGER
    BEFORE INSERT ON LOGGING_TABLE
    FOR EACH ROW
    WHEN (new.logging_table_id IS NULL)
BEGIN
    :new.logging_table_id := loggingtable_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER PECE_ZVIRE_INSERT_TRIGGER
    BEFORE INSERT ON PECE_ZVIRE
    FOR EACH ROW
    WHEN (new.pece_zvire_id IS NULL)
BEGIN
    :new.pece_zvire_id := pece_zvire_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER MEDIKAMENT_ZVIRE_INSERT_TRIGGER
    BEFORE INSERT ON MEDIKAMENT_ZVIRE
    FOR EACH ROW
    WHEN (new.medikament_zvire_id IS NULL)
BEGIN
    :new.medikament_zvire_id := medikament_zvire_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER ZVIRE_KRMENI_INSERT_TRIGGER
    BEFORE INSERT
    ON ZVIRE_KRMENI
    FOR EACH ROW
    WHEN (new.zvire_krmeni_id IS NULL)
BEGIN
    :new.zvire_krmeni_id := zvire_krmeni_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER SOUBOR_INSERT_TRIGGER
    BEFORE INSERT
    ON SOUBOR
    FOR EACH ROW
    WHEN (new.soubor_id IS NULL)
BEGIN
    :new.soubor_id := soubor_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER ZPRAVY_INSERT_TRIGGER
    BEFORE INSERT ON ZPRAVY
    FOR EACH ROW
    WHEN (new.zpravy_id IS NULL)
BEGIN
    :new.zpravy_id := zpravy_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER typ_vody_insert_trigger
    BEFORE INSERT ON TYP_VODY
    FOR EACH ROW
    WHEN (new.typ_vody_id IS NULL)
BEGIN
    :new.typ_vody_id := typ_vody_seq.NEXTVAL;
END;
/
