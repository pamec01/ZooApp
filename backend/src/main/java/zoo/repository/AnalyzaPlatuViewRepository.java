package zoo.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import zoo.entity.AnalyzaPlatuView;

import java.util.List;

@Repository
@Transactional
public interface AnalyzaPlatuViewRepository extends JpaRepository<AnalyzaPlatuView, Long> {

    @Query("SELECT v FROM AnalyzaPlatuView v")
    List<AnalyzaPlatuView> findAll();
}
