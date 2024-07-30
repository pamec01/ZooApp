package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Pece;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface PeceRepository extends JpaRepository<Pece, Long> {

    @Query("SELECT p FROM Pece p")
    List<Pece> findAll();

    @Query("SELECT p FROM Pece p WHERE p.peceId = :peceId")
    Optional<Pece> findById(Long peceId);

    @Modifying
    @Transactional
    @Query(value = "CALL pece_package.insert_pece(:nazev)", nativeQuery = true)
    void insertPece(String nazev);

    @Modifying
    @Transactional
    @Query(value = "CALL pece_package.update_pece(:peceId, :nazev)", nativeQuery = true)
    void updatePece(Long peceId, String nazev);

    @Modifying
    @Transactional
    @Query(value = "CALL pece_package.delete_pece(:peceId)", nativeQuery = true)
    void deletePece(Long peceId);
}
