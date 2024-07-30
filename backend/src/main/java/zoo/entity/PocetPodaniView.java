package zoo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "POCET_PODANI_VIEW")
@Subselect("SELECT sys_guid() AS id, v.* FROM POCET_PODANI_VIEW v")
public class PocetPodaniView {

    @Id
    private Object id;

    private String jmenoZvirete;

    private String nazevMedikamentu;

    private int pocetPodani;

    private String datumPosledniPodani;
}
