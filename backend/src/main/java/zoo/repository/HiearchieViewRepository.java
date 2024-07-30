package zoo.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import zoo.entity.HiearchieView;

import java.util.List;

@Repository
@Transactional
public interface HiearchieViewRepository extends JpaRepository<HiearchieView, Long> {

    @Query("SELECT v FROM HiearchieView v")
    List<HiearchieView> findAll();
}
