package zoo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import jakarta.validation.constraints.*;

@Entity
@Getter
@Setter
public class MedikamentZvire {

    @Id
    @Column(nullable = false, updatable = false)
    private Long medikamentZvireId;

    @ManyToOne
    @JoinColumn(name = "medikament_id", nullable = false)
    @NotNull(message = "Medikament nesmí být prázdný")
    private Medikament medikament;

    @ManyToOne
    @JoinColumn(name = "zvire_id", nullable = false)
    @NotNull(message = "Zvíře nesmí být prázdný")
    private Zvire zvire;

    @Column(nullable = false)
    @NotNull(message = "Datum nesmí být prázdný")
    private LocalDate datum;
}
