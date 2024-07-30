package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.ZvireKrmeni;

import java.util.Optional;

@Repository
@Transactional
public interface ZvireKrmeniRepository extends JpaRepository<ZvireKrmeni, String> {

    @Query("SELECT zk FROM ZvireKrmeni zk WHERE zk.zvireKrmeniId = :id")
    Optional<ZvireKrmeni> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "CALL zvire_krmeni_package.insert_zvire_krmeni(:zvireId, :krmeniId)", nativeQuery = true)
    void insertZvireKrmeni(Long zvireId, Long krmeniId);

    @Modifying
    @Transactional
    @Query(value = "CALL zvire_krmeni_package.delete_zvire_krmeni(:zvireKrmeniId)", nativeQuery = true)
    void deleteZvireKrmeni(Long zvireKrmeniId);
}
