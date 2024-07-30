package zoo.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import zoo.entity.LoggingTable;

import java.util.List;

@Repository
@Transactional
public interface LoggingTableRepository extends JpaRepository<LoggingTable, Long> {

    @Query("SELECT lt FROM LoggingTable lt")
    List<LoggingTable> findAll();
}
