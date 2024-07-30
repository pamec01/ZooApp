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
@Table(name = "OBJEKTY_VIEW")
@Subselect("SELECT sys_guid() AS id, v.* FROM OBJEKTY_VIEW v")
public class ObjektyView {

    @Id
    private Object id;

    private String typObjektu;

    private String nazevObjektu;
}
