package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Nemocnost;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface NemocnostRepository extends JpaRepository<Nemocnost, Long> {

    @Query("SELECT n FROM Nemocnost n")
    List<Nemocnost> findAll();

    @Query("SELECT n FROM Nemocnost n WHERE n.nemocnostId = :nemocnostId")
    Optional<Nemocnost> findById(Long nemocnostId);

    @Modifying
    @Transactional
    @Query(value = "CALL nemocnost_package.insert_nemocnost(:nazev, :datum, :zvireId)", nativeQuery = true)
    void insertNemocnost(String nazev, LocalDate datum, Long zvireId);

    @Modifying
    @Transactional
    @Query(value = "CALL nemocnost_package.update_nemocnost(:nemocnostId, :nazev, :datum, :zvireId)", nativeQuery = true)
    void updateNemocnost(Long nemocnostId, String nazev, LocalDate datum, Long zvireId);

    @Modifying
    @Transactional
    @Query(value = "CALL nemocnost_package.delete_nemocnost(:nemocnostId)", nativeQuery = true)
    void deleteNemocnost(Long nemocnostId);
}
