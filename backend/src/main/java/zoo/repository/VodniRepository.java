package zoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zoo.entity.Vodni;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface VodniRepository extends JpaRepository<Vodni, String> {

    @Query("SELECT v FROM Vodni v")
    List<Vodni> findAll();

    @Query("SELECT v FROM Vodni v WHERE v.id = :zvireId")
    Optional<Vodni> findById(Long zvireId);

    @Modifying
    @Transactional
    @Query(value = "CALL vodni_package.insert_vodni(:zvireId, :typVodyId)", nativeQuery = true)
    void insertVodni(Long zvireId, Long typVodyId);

    @Modifying
    @Transactional
    @Query(value = "CALL vodni_package.update_vodni(:zvireId, :typVodyId)", nativeQuery = true)
    void updateVodni(Long zvireId, Long typVodyId);

    @Modifying
    @Transactional
    @Query(value = "CALL vodni_package.delete_vodni(:zvireId)", nativeQuery = true)
    void deleteVodni(Long zvireId);
}
