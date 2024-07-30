package zoo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class ZvireKrmeni {

    @Id
    @Column(nullable = false, updatable = false)
    private Long zvireKrmeniId;

    @ManyToOne
    @JoinColumn(name = "zvire_id", nullable = false)
    @NotNull(message = "Zvíře nesmí být prázdný")
    private Zvire zvire;

    @ManyToOne
    @JoinColumn(name = "krmeni_id", nullable = false)
    @NotNull(message = "Krmení nesmí být prázdný")
    private Krmeni krmeni;
}
