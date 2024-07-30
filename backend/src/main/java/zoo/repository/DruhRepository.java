package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Druh;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface DruhRepository extends JpaRepository<Druh, Long> {

    @Query("SELECT d FROM Druh d")
    List<Druh> findAll();

    @Query("SELECT d FROM Druh d WHERE d.druhId = :id")
    Optional<Druh> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "CALL druh_package.insert_druh(:nazev)", nativeQuery = true)
    void insertDruh(String nazev);

    @Modifying
    @Transactional
    @Query(value = "CALL druh_package.update_druh(:id, :nazev)", nativeQuery = true)
    void updateDruh(Long id, String nazev);

    @Modifying
    @Transactional
    @Query(value = "CALL druh_package.delete_druh(:id)", nativeQuery = true)
    void deleteDruh(Long id);
}
