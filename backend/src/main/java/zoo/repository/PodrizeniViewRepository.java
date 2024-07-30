package zoo.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import zoo.entity.PodrizeniView;

import java.util.List;

@Repository
@Transactional
public interface PodrizeniViewRepository extends JpaRepository<PodrizeniView, Long> {

    @Query("SELECT v FROM PodrizeniView v")
    List<PodrizeniView> findAll();
}
