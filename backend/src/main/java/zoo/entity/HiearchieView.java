package zoo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

@Entity
@Getter
@Setter
@Table(name = "HIEARCHIE_VIEW")
@Subselect("SELECT sys_guid() AS id, v.* FROM Hiearchie_View v")
public class HiearchieView {

    @Id
    private Object id;

    private String jmeno;

    private String hiearchie;
}
