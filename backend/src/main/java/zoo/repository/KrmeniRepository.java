package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Krmeni;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface KrmeniRepository extends JpaRepository<Krmeni, Long> {

    @Query("SELECT k FROM Krmeni k")
    List<Krmeni> findAll();

    @Query("SELECT k FROM Krmeni k WHERE k.krmeniId = :id")
    Optional<Krmeni> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "CALL krmeni_package.insert_krmeni(:nazev, :osetrovatelId)", nativeQuery = true)
    void insertKrmeni(String nazev, Long osetrovatelId);

    @Modifying
    @Transactional
    @Query(value = "CALL krmeni_package.update_krmeni(:krmeniId, :nazev, :osetrovatelId)", nativeQuery = true)
    void updateKrmeni(Long krmeniId, String nazev, Long osetrovatelId);

    @Modifying
    @Transactional
    @Query(value = "CALL krmeni_package.delete_krmeni(:krmeniId)", nativeQuery = true)
    void deleteKrmeni(Long krmeniId);
}