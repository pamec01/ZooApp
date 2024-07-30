package zoo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Suchozemske {

    @Id
    @Column(name = "zvire_id")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "zvire_id", nullable = false)
    @NotNull(message = "Zvíře nesmí být prázdný")
    private Zvire zvire;
}
