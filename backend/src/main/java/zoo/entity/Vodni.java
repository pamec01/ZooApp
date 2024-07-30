package zoo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Vodni {

    @Id
    @Column(name = "zvire_id")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "zvire_id", nullable = false)
    @NotNull(message = "Zvíře nesmí být prázdný")
    private Zvire zvire;

    @JoinColumn(name = "typ_vody_id", nullable = false)
    @NotNull(message = "Typ vody nesmí být prázdný")
    @ManyToOne
    private TypVody typVody;
}
