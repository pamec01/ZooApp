package zoo.entity;

import jakarta.persistence.Column;
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
@Table(name = "FUNKCE_VIEW")
@Subselect("SELECT sys_guid() AS id, v.* FROM FUNKCE_VIEW v")
public class FunkceView {

    @Id
    private Object id;

    private int zviratMetrCtverecni;

    private int nejnovejsiMedikament;
}
