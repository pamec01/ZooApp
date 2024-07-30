package zoo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class PeceZvire {

    @Id
    @Column(nullable = false, updatable = false)
    private Long peceZvireId;

    @ManyToOne
    @JoinColumn(name = "pece_id", nullable = false)
    private Pece pece;

    @ManyToOne
    @JoinColumn(name = "zvire_id", nullable = false)
    private Zvire zvire;
}
