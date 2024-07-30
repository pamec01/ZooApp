package zoo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class LoggingTable {

    @Id
    @Column(nullable = false, updatable = false)
    private Long loggingTableId;

    @Column(length = 2000)
    private String pred;

    @Column(length = 2000)
    private String po;

    @Column(length = 100)
    private String kdo;

    @Column(length = 100)
    private String kdy;

    @Column(length = 100)
    private String kde;

    @Column(length = 100)
    private String operace;
}
