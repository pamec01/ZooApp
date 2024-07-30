package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Uzivatel;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UzivatelRepository extends JpaRepository<Uzivatel, Long> {

    @Query("SELECT u FROM Uzivatel u")
    List<Uzivatel> findAll();

    @Query("SELECT u FROM Uzivatel u WHERE u.uzivatelId = :id")
    Optional<Uzivatel> findById(Long id);

    @Query("SELECT u FROM Uzivatel u WHERE u.email = :email")
    Uzivatel findByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "CALL uzivatel_package.insert_uzivatel(:jmeno, :prijmeni, :email, :heslo, :roleId)", nativeQuery = true)
    void insertUzivatel(String jmeno, String prijmeni, String email, String heslo, Long roleId);

    @Modifying
    @Transactional
    @Query(value = "CALL uzivatel_package.update_uzivatel(:uzivatelId, :jmeno, :prijmeni, :email, :heslo, :roleId)", nativeQuery = true)
    void updateUzivatel(Long uzivatelId, String jmeno, String prijmeni, String email, String heslo, Long roleId);

    @Modifying
    @Transactional
    @Query(value = "CALL uzivatel_package.delete_uzivatel(:uzivatelId)", nativeQuery = true)
    void deleteUzivatel(Long uzivatelId);
}

