CREATE
    OR REPLACE TRIGGER ZVIRE_CIP
    BEFORE INSERT
    ON ZVIRE
    FOR EACH ROW
DECLARE
    inicialy_druh        VARCHAR2(10);
    inicialy_zeme        VARCHAR2(10);
    inicialy_jmeno       VARCHAR2(10);
    inicialy_osetrovatel VARCHAR2(10);
BEGIN
    IF :new.cip IS NULL OR :new.cip = '' THEN
        inicialy_druh := akronym('DRUH', :new.DRUH_ID, 'nazev');

        inicialy_zeme := UPPER(SUBSTR(:new.ZEME_PUVODU, 0, 1));
        FOR i IN 1..LENGTH(:new.ZEME_PUVODU)
            LOOP
                IF SUBSTR(:new.ZEME_PUVODU, i, 1) = ' ' THEN
                    inicialy_zeme := inicialy_zeme || UPPER(SUBSTR(:new.ZEME_PUVODU, i + 1, 1));
                END IF;
            END LOOP;

        inicialy_jmeno := UPPER(SUBSTR(:new.JMENO, 0, 1));
        FOR i IN 1..LENGTH(:new.JMENO)
            LOOP
                IF SUBSTR(:new.JMENO, i, 1) = ' ' THEN
                    inicialy_jmeno := inicialy_jmeno || UPPER(SUBSTR(:new.JMENO, i + 1, 1));
                END IF;
            END LOOP;

        inicialy_osetrovatel := akronym('OSETROVATEL', :new.osetrovatel_id, 'jmeno');
        inicialy_osetrovatel := akronym('OSETROVATEL', :new.osetrovatel_id, 'prijmeni');

        :new.cip := inicialy_druh || '-' || inicialy_zeme || '-' || inicialy_jmeno || '-' || inicialy_osetrovatel ||
                    '-' || sys_guid();
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20200, SQLERRM);
END;
/

CREATE OR REPLACE TRIGGER ZVIRE_UMISTENI
    BEFORE INSERT
    ON ZVIRE
    FOR EACH ROW
DECLARE
    v_min_rozloha_na_zvire NUMBER := 0;
    v_min_umisteni_id      NUMBER := 1;
    v_umisteni_rozloha     UMISTENI.VELIKOST%TYPE;
    v_umisteni_id          UMISTENI.UMISTENI_ID%TYPE;
    v_pocet_zvirat         NUMBER;
    v_rozloha_na_zvire     NUMBER;
    CURSOR c_umisteni IS
        SELECT UMISTENI_ID, VELIKOST
        FROM UMISTENI;
    rec_umisteni            c_umisteni%ROWTYPE;
BEGIN
    IF :new.umisteni_id IS NULL OR :new.umisteni_id = '' THEN
        OPEN c_umisteni;
        LOOP
            FETCH c_umisteni INTO rec_umisteni;
            EXIT WHEN c_umisteni%NOTFOUND;

            v_umisteni_rozloha := rec_umisteni.VELIKOST;
            v_umisteni_id := rec_umisteni.UMISTENI_ID;

            SELECT COUNT(*) INTO v_pocet_zvirat FROM ZVIRE WHERE UMISTENI_ID = v_umisteni_id;

            IF v_pocet_zvirat = 0 THEN
                v_rozloha_na_zvire := 999999999;
            ELSE
                v_rozloha_na_zvire := v_umisteni_rozloha / v_pocet_zvirat;
            END IF;

            IF v_rozloha_na_zvire > v_min_rozloha_na_zvire THEN
                v_min_rozloha_na_zvire := v_rozloha_na_zvire;
                v_min_umisteni_id := v_umisteni_id;
            END IF;
        END LOOP;
        CLOSE c_umisteni;

        :new.umisteni_id := v_min_umisteni_id;
    END IF;
END;
/