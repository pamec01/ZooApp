package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Umisteni;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UmisteniRepository extends JpaRepository<Umisteni, Long> {

    @Query("SELECT u FROM Umisteni u")
    List<Umisteni> findAll();

    @Query("SELECT u FROM Umisteni u WHERE u.umisteniId = :umisteniId")
    Optional<Umisteni> findById(Long umisteniId);

    @Modifying
    @Transactional
    @Query(value = "CALL umisteni_package.insert_umisteni(:velikost, :nazev)", nativeQuery = true)
    void insertUmisteni(BigDecimal velikost, String nazev);

    @Modifying
    @Transactional
    @Query(value = "CALL umisteni_package.update_umisteni(:umisteniId, :velikost, :nazev)", nativeQuery = true)
    void updateUmisteni(Long umisteniId, BigDecimal velikost, String nazev);

    @Modifying
    @Transactional
    @Query(value = "CALL umisteni_package.delete_umisteni(:umisteniId)", nativeQuery = true)
    void deleteUmisteni(Long umisteniId);
}
