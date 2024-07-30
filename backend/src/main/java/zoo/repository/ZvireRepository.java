package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Zvire;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ZvireRepository extends JpaRepository<Zvire, Long> {

    @Query("SELECT z FROM Zvire z")
    List<Zvire> findAll();

    @Query("SELECT z FROM Zvire z WHERE z.zvireId NOT IN (SELECT s.id FROM Suchozemske s) AND z.zvireId NOT IN (SELECT v.id FROM Vodni v)")
    List<Zvire> findNotSuchoVodni();

    @Query("SELECT z FROM Zvire z WHERE z.zvireId = :id")
    Optional<Zvire> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "CALL zvire_package.insert_zvire(:jmeno, :zemePuvodu, :cip, :druhId, :osetrovatelId, :umisteniId)", nativeQuery = true)
    void insertZvire(String jmeno, String zemePuvodu, String cip, Long druhId, Long osetrovatelId, Long umisteniId);

    @Modifying
    @Transactional
    @Query(value = "CALL zvire_package.update_zvire(:id, :jmeno, :zemePuvodu, :cip, :newDruhId, :osetrovatelId, :umisteniId)", nativeQuery = true)
    void updateZvire(Long id, String jmeno, String zemePuvodu, String cip, Long newDruhId, Long osetrovatelId, Long umisteniId);

    @Modifying
    @Transactional
    @Query(value = "CALL zvire_package.delete_zvire(:id)", nativeQuery = true)
    void deleteZvire(Long id);
}
