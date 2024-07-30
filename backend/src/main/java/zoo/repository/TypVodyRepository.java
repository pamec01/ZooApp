package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.TypVody;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface TypVodyRepository extends JpaRepository<TypVody, Long> {

    @Query("SELECT tv FROM TypVody tv")
    List<TypVody> findAll();

    @Query("SELECT tv FROM TypVody tv WHERE tv.typVodyId = :id")
    Optional<TypVody> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "CALL typ_vody_package.insert_typ_vody(:nazev)", nativeQuery = true)
    void insertTypVody(String nazev);

    @Modifying
    @Transactional
    @Query(value = "CALL typ_vody_package.update_typ_vody(:id, :nazev)", nativeQuery = true)
    void updateTypVody(Long id, String nazev);

    @Modifying
    @Transactional
    @Query(value = "CALL typ_vody_package.delete_typ_vody(:id)", nativeQuery = true)
    void deleteTypVody(Long id);
}
