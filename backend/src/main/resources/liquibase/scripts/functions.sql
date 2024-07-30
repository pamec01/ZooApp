CREATE OR REPLACE FUNCTION akronym(p_tabulka IN VARCHAR, p_id IN NUMBER, p_sloupec IN VARCHAR)
    RETURN VARCHAR AS
    v_id_sloupec_nazev VARCHAR2(50);
    v_sql              VARCHAR2(200);
    v_text             VARCHAR2(100);
    v_akronym          VARCHAR2(10);
BEGIN
    SELECT ACC.COLUMN_NAME
    INTO v_id_sloupec_nazev
    FROM ALL_CONS_COLUMNS ACC
             JOIN ALL_CONSTRAINTS AC ON ACC.CONSTRAINT_NAME = AC.CONSTRAINT_NAME
    WHERE AC.TABLE_NAME = p_tabulka
      AND AC.CONSTRAINT_TYPE = 'P';

    v_sql := 'SELECT ' || p_sloupec || ' FROM ' || p_tabulka || ' WHERE ' || v_id_sloupec_nazev || ' = :id';

    EXECUTE IMMEDIATE v_sql INTO v_text USING p_id;

    v_akronym := UPPER(SUBSTR(v_text, 0, 1));
    FOR i IN 1..LENGTH(v_text)
        LOOP
            IF SUBSTR(v_text, i, 1) = ' ' THEN
                v_akronym := v_akronym || UPPER(SUBSTR(v_text, i + 1, 1));
            END IF;
        END LOOP;

    RETURN v_akronym;
END;
/

CREATE OR REPLACE FUNCTION filetype(p_type IN VARCHAR2)
    RETURN VARCHAR2
    IS
    v_type VARCHAR2(200);
    FileTypeMissing EXCEPTION;
    PRAGMA EXCEPTION_INIT (FileTypeMissing, -20950);
BEGIN
    IF p_type IS NULL THEN
        RAISE FileTypeMissing;
    END IF;

    v_type :=
            CASE p_type
                WHEN 'text/plain' THEN 'Textový dokument'
                WHEN 'application/pdf' THEN 'PDF dokument'
                WHEN 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' THEN 'Word dokument'
                WHEN 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' THEN 'Excel dokument'
                WHEN 'image/jpeg' THEN 'JPG obrázek'
                WHEN 'image/png' THEN 'PNG obrázek'
                ELSE p_type
                END;
    RETURN v_type;
END;
/

CREATE OR REPLACE FUNCTION PocetZviratNaMetrCtverecni(p_umisteni_id NUMBER DEFAULT 1)
    RETURN NUMBER
    IS
    v_pocet_zvirat NUMBER;
    v_velikost_umisteni NUMBER;
BEGIN
    SELECT velikost INTO v_velikost_umisteni
    FROM umisteni
    WHERE umisteni_id = p_umisteni_id;

    SELECT COUNT(*) INTO v_pocet_zvirat
    FROM zvire
    WHERE umisteni_id = p_umisteni_id;

    RETURN v_velikost_umisteni / v_pocet_zvirat;
END PocetZviratNaMetrCtverecni;
/

CREATE OR REPLACE FUNCTION NajitNejnovejsiZaznamMedikamentZvireId(p_zvire_id NUMBER DEFAULT 1)
    RETURN NUMBER
    IS
    v_medikament_zvire_id NUMBER;
BEGIN
    SELECT medikament_zvire_id INTO v_medikament_zvire_id
    FROM (
             SELECT medikament_zvire_id, ROW_NUMBER() OVER (ORDER BY datum DESC) AS rnk
             FROM medikament_zvire
             WHERE zvire_id = p_zvire_id
         )
    WHERE rnk = 1;

    RETURN v_medikament_zvire_id;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 0;
END NajitNejnovejsiZaznamMedikamentZvireId;
/