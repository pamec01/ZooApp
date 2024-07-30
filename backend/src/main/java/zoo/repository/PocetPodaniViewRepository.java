package zoo.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import zoo.entity.PocetPodaniView;
import zoo.entity.PodrizeniView;

import java.util.List;

@Repository
@Transactional
public interface PocetPodaniViewRepository extends JpaRepository<PocetPodaniView, Long> {

    @Query("SELECT v FROM PocetPodaniView v")
    List<PocetPodaniView> findAll();
}
