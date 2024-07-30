CREATE OR REPLACE PROCEDURE AnalyzaPlatu AUTHID CURRENT_USER AS
  i_avg_plat NUMBER;
  i_nadprumer VARCHAR2(4000) := '';
  i_podprumer VARCHAR2(4000) := '';
  v_sql VARCHAR2(30000);
BEGIN
    SELECT AVG(plat) INTO i_avg_plat FROM osetrovatel;

    FOR x IN (SELECT jmeno, prijmeni, plat FROM osetrovatel)
      LOOP
        IF x.plat > i_avg_plat THEN
          i_nadprumer := i_nadprumer || x.jmeno || ' ' || x.prijmeni || ', ';
    ELSE
          i_podprumer := i_podprumer || x.jmeno || ' ' || x.prijmeni || ', ';
    END IF;
    END LOOP;

  v_sql := 'CREATE OR REPLACE VIEW ANALYZA_PLATU_VIEW AS SELECT TO_CHAR(''' || RTRIM(i_podprumer, ', ') || ''') AS podprumerna, TO_CHAR('''  || RTRIM(i_nadprumer, ', ') || ''') AS nadprumerna ' || ' FROM DUAL';

    EXECUTE IMMEDIATE v_sql;

END AnalyzaPlatu;
/

CREATE OR REPLACE PROCEDURE PrintTopLeafData AUTHID CURRENT_USER AS
v_sql VARCHAR2(30000);
v_id NUMBER;
BEGIN
FOR x IN (SELECT osetrovatel_id, jmeno, prijmeni, plat
    FROM osetrovatel
        WHERE CONNECT_BY_ISLEAF = 1 AND PLAT = (
            SELECT MAX(plat)
            FROM osetrovatel
            WHERE CONNECT_BY_ISLEAF = 1
            CONNECT BY manazer_id = PRIOR osetrovatel_id
            START WITH manazer_id IS NULL)
        CONNECT BY manazer_id = PRIOR osetrovatel_id
        START WITH manazer_id IS NULL)
    LOOP
        v_id:=x.osetrovatel_id;
    END LOOP;

    v_sql:='CREATE OR REPLACE VIEW PODRIZENI_VIEW AS SELECT jmeno, prijmeni, plat, email FROM OSETROVATEL WHERE osetrovatel_id = ' || v_id;
    EXECUTE IMMEDIATE v_sql;

END PrintTopLeafData;
/

CREATE OR REPLACE PROCEDURE VypisNejvetsiSpotrebuMedikamentu(p_pocet_podani_min NUMBER DEFAULT 1) AUTHID CURRENT_USER AS
    v_jmeno_zvirete         VARCHAR2(4000) := '';
    v_nazev_medikamentu     VARCHAR2(4000) := '';
    v_pocet_podani          VARCHAR2(4000) := '';
    v_datum_posledni_podani VARCHAR2(4000) := '';
    v_sql                   VARCHAR2(30000);
    ArgTooSmallValue EXCEPTION;
    PRAGMA EXCEPTION_INIT (ArgTooSmallValue, -20950);
BEGIN
    IF (p_pocet_podani_min < 1) THEN
        RAISE ArgTooSmallValue;
    END IF;

    v_sql := 'CREATE OR REPLACE VIEW POCET_PODANI_VIEW AS ';
    FOR rec IN (
        SELECT z.zvire_id,
               z.jmeno       AS jmeno_zvirete,
               m.medikament_id,
               m.nazev       AS nazev_medikamentu,
               COUNT(*)      AS pocet_podani,
               MAX(mz.datum) AS posledni_datum_podani
        FROM zvire z
                 JOIN
             medikament_zvire mz ON z.zvire_id = mz.zvire_id
                 JOIN
             medikament m ON mz.medikament_id = m.medikament_id
        GROUP BY z.zvire_id, z.jmeno, m.medikament_id, m.nazev
        )
        LOOP

            v_jmeno_zvirete := rec.jmeno_zvirete;
            v_nazev_medikamentu := rec.nazev_medikamentu;
            v_pocet_podani := rec.pocet_podani;
            v_datum_posledni_podani := TO_CHAR(rec.posledni_datum_podani);

            IF (v_pocet_podani > p_pocet_podani_min) THEN

                v_sql := v_sql || 'SELECT TO_CHAR(''' || v_jmeno_zvirete || ''') AS jmeno_zvirete,
        TO_CHAR(''' || v_nazev_medikamentu || ''') AS nazev_medikamentu,
        TO_CHAR(''' || v_pocet_podani || ''') AS pocet_podani,
        TO_CHAR(''' || v_datum_posledni_podani || ''') AS datum_posledni_podani FROM DUAL UNION ALL ';
            END IF;
        END LOOP;

    v_sql := SUBSTR(v_sql, 1, LENGTH(v_sql) - 10);

    EXECUTE IMMEDIATE v_sql;
END VypisNejvetsiSpotrebuMedikamentu;
/

CREATE OR REPLACE PROCEDURE VypisVsechnyObjekty(p_typ_objektu VARCHAR DEFAULT 'Všechny') AUTHID CURRENT_USER AS
    v_typ_objektu VARCHAR2(200) := '';
    v_sql         VARCHAR2(200);
BEGIN
    v_typ_objektu :=
            CASE p_typ_objektu
                WHEN 'Tabulky' THEN 'TABLE'
                WHEN 'Procedury' THEN 'PROCEDURE'
                WHEN 'Funkce' THEN 'FUNCTION'
                WHEN 'Triggery' THEN 'TRIGGER'
                WHEN 'Indexy' THEN 'INDEX'
                WHEN 'Balíčky' THEN 'PACKAGE'
                WHEN 'Sekvence' THEN 'SEQUENCE'
                WHEN 'Pohledy' THEN 'VIEW'
                ELSE p_typ_objektu
                END;

    IF (v_typ_objektu = 'Všechny') THEN
        v_sql := 'CREATE OR REPLACE VIEW OBJEKTY_VIEW AS
                 SELECT object_type AS typ_objektu, object_name AS nazev_objektu
				FROM USER_OBJECTS';
    ELSE
        v_sql := 'CREATE OR REPLACE VIEW OBJEKTY_VIEW AS
        SELECT object_type AS typ_objektu, object_name AS nazev_objektu
        FROM USER_OBJECTS WHERE object_type = ''' || v_typ_objektu || '''';
    END IF;
    EXECUTE IMMEDIATE v_sql;
END VypisVsechnyObjekty;
/



CREATE OR REPLACE PROCEDURE ViewNaFunkce(p_zvirat_metr_ctverecni NUMBER DEFAULT 1, nejnovejsi_medikament NUMBER DEFAULT 1) AUTHID CURRENT_USER AS
BEGIN
    EXECUTE IMMEDIATE 'CREATE OR REPLACE VIEW FUNKCE_VIEW AS SELECT '
        || PocetZviratNaMetrCtverecni(p_zvirat_metr_ctverecni) ||
                      ' AS zvirat_metr_ctverecni, '
        || NajitNejnovejsiZaznamMedikamentZvireId(nejnovejsi_medikament) ||
                      ' AS nejnovejsi_medikament FROM DUAL';

END ViewNaFunkce;