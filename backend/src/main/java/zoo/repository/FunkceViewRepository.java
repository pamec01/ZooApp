package zoo.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import zoo.entity.FunkceView;
import zoo.entity.PodrizeniView;

import java.util.List;

@Repository
@Transactional
public interface FunkceViewRepository extends JpaRepository<FunkceView, Long> {

    @Query("SELECT v FROM FunkceView v")
    List<FunkceView> findAll();

    @Query(value = "CALL VIEWNAFUNKCE(8,2)", nativeQuery = true)
    void refresh(Long umisteniId, Long zvireId);
}
