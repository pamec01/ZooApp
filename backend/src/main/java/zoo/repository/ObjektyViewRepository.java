package zoo.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import zoo.entity.ObjektyView;
import zoo.entity.PodrizeniView;

import java.util.List;

@Repository
@Transactional
public interface ObjektyViewRepository extends JpaRepository<ObjektyView, Long> {

    @Query("SELECT v FROM ObjektyView v")
    List<ObjektyView> findAll();
}
