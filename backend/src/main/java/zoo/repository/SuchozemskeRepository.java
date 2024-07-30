package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Suchozemske;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface SuchozemskeRepository extends JpaRepository<Suchozemske, Long> {

    @Query("SELECT s FROM Suchozemske s")
    List<Suchozemske> findAll();

    @Query("SELECT s FROM Suchozemske s WHERE s.id = :id")
    Optional<Suchozemske> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "CALL suchozemske_package.insert_suchozemske(:zvireId)", nativeQuery = true)
    void insertSuchozemske(Long zvireId);

    @Modifying
    @Transactional
    @Query(value = "CALL suchozemske_package.delete_suchozemske(:zvireId)", nativeQuery = true)
    void deleteSuchozemske(Long zvireId);
}
