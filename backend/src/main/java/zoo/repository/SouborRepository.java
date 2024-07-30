package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Soubor;

import java.util.List;
import java.util.Optional;

public interface SouborRepository extends JpaRepository<Soubor, Long> {

    @Query("SELECT s FROM Soubor s")
    List<Soubor> findAll();

    @Query("SELECT s FROM Soubor s WHERE s.souborId = :souborId")
    Optional<Soubor> findById(Long souborId);

    @Modifying
    @Transactional
    @Query(value = "CALL soubor_package.insert_soubor(:souborId, :data, :nazev, :typ, :medikamentZvireId, :osetrovatelId)", nativeQuery = true)
    void insertSoubor(Long souborId, byte[] data, String nazev, String typ, Long medikamentZvireId, Long osetrovatelId);

    @Modifying
    @Transactional
    @Query(value = "CALL soubor_package.update_soubor(:souborId, :data, :nazev, :typ, :medikamentZvireId, :osetrovatelId)", nativeQuery = true)
    void updateSoubor(Long souborId, byte[] data, String nazev, String typ, Long medikamentZvireId, Long osetrovatelId);

    @Modifying
    @Transactional
    @Query(value = "CALL soubor_package.delete_soubor(:souborId)", nativeQuery = true)
    void deleteSoubor(Long souborId);
}
