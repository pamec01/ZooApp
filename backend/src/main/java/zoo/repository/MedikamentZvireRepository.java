package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.MedikamentZvire;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface MedikamentZvireRepository extends JpaRepository<MedikamentZvire, Long> {

    @Query("SELECT mz FROM MedikamentZvire mz")
    List<MedikamentZvire> findAll();

    @Query("SELECT mz FROM MedikamentZvire mz WHERE mz.medikamentZvireId = :id")
    Optional<MedikamentZvire> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "CALL medikament_zvire_package.insert_medikament_zvire(:medikamentId, :zvireId, :datum)", nativeQuery = true)
    void insertMedikamentZvire(Long medikamentId, Long zvireId, LocalDate datum);

    @Modifying
    @Transactional
    @Query(value = "CALL medikament_zvire_package.update_medikament_zvire(:medikamentId, :zvireId, :datum)", nativeQuery = true)
    void updateMedikamentZvire(Long medikamentId, Long zvireId, LocalDate datum);

    @Modifying
    @Transactional
    @Query(value = "CALL medikament_zvire_package.delete_medikament_zvire(:medikamentZvireId)", nativeQuery = true)
    void deleteMedikamentZvire(Long medikamentZvireId);
}
