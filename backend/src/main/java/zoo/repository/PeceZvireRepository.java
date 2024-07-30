package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.PeceZvire;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface PeceZvireRepository extends JpaRepository<PeceZvire, String> {

    @Query("SELECT pz FROM PeceZvire pz")
    List<PeceZvire> findAll();

    @Modifying
    @Transactional
    @Query("SELECT pz FROM PeceZvire pz WHERE pz.peceZvireId = :id")
    Optional<PeceZvire> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "CALL pece_zvire_package.insert_pece_zvire(:peceId, :zvireId)", nativeQuery = true)
    void insertPeceZvire(Long peceId, Long zvireId);

    @Modifying
    @Transactional
    @Query(value = "CALL pece_zvire_package.delete_pece_zvire(:peceZvireId)", nativeQuery = true)
    void deletePeceZvire(Long peceZvireId);
}