--"Jméno", hiearchie, "nadřízený", isleaf, "úroveň"
CREATE OR REPLACE VIEW hiearchie_view AS
SELECT lpad(' ', level * 5) || prijmeni || ' ' || jmeno as jmeno,
       SYS_CONNECT_BY_PATH(prijmeni, '/')               as hiearchie
       --CONNECT_BY_ROOT prijmeni                         as "nadřízený",
       --CONNECT_BY_ISLEAF                                as isleaf,
       --level                                            as "úroveň"
FROM osetrovatel
CONNECT BY manazer_id = PRIOR osetrovatel_id
START WITH MANAZER_ID IS NULL
ORDER SIBLINGS BY PRIJMENI;
