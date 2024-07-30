package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Medikament;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface MedikamentRepository extends JpaRepository<Medikament, Long> {

    @Query("SELECT m FROM Medikament m")
    List<Medikament> findAll();

    @Query("SELECT m FROM Medikament m WHERE m.medikamentId = :id")
    Optional<Medikament> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "CALL medikament_package.insert_medikament(:nazev, :osetrovatelId)", nativeQuery = true)
    void insertMedikament(String nazev, Long osetrovatelId);

    @Modifying
    @Transactional
    @Query(value = "CALL medikament_package.update_medikament(:medikamentId, :nazev, :osetrovatelId)", nativeQuery = true)
    void updateMedikament(Long medikamentId, String nazev, Long osetrovatelId);

    @Modifying
    @Transactional
    @Query(value = "CALL medikament_package.delete_medikament(:medikamentId)", nativeQuery = true)
    void deleteMedikament(Long medikamentId);
}
