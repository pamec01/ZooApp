package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Osetrovatel;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface OsetrovatelRepository extends JpaRepository<Osetrovatel, Long> {

    @Query("SELECT o FROM Osetrovatel o")
    List<Osetrovatel> findAll();

    @Query("SELECT o FROM Osetrovatel o WHERE o.osetrovatelId = :osetrovatelId")
    Optional<Osetrovatel> findById(Long osetrovatelId);

    @Modifying
    @Transactional
    @Query(value = "CALL osetrovatel_package.insert_osetrovatel(:jmeno, :prijmeni, :plat, :email, :manazerId)", nativeQuery = true)
    void insertOsetrovatel(String jmeno, String prijmeni, BigDecimal plat, String email, Long manazerId);

    @Modifying
    @Transactional
    @Query(value = "CALL osetrovatel_package.update_osetrovatel(:osetrovatelId, :jmeno, :prijmeni, :plat, :email, :manazerId)", nativeQuery = true)
    void updateOsetrovatel(Long osetrovatelId, String jmeno, String prijmeni, BigDecimal plat, String email, Long manazerId);

    @Modifying
    @Transactional
    @Query(value = "CALL osetrovatel_package.delete_osetrovatel(:osetrovatelId)", nativeQuery = true)
    void deleteOsetrovatel(Long osetrovatelId);
}
