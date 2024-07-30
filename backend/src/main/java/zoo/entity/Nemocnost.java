package zoo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import jakarta.validation.constraints.*;

@Entity
@Getter
@Setter
public class Nemocnost {

    @Id
    @Column(nullable = false, updatable = false)
    private Long nemocnostId;

    @Column(nullable = false, length = 40)
    @Size(max = 40, message = "Délka názvu musí být maximálně 40 znaků")
    @NotBlank(message = "Název nesmí být prázdný")
    private String nazev;

    @Column(nullable = false)
    @NotNull(message = "Datum nesmí být prázdný")
    private LocalDate datum;

    @ManyToOne
    @JoinColumn(name = "zvire_id", nullable = false)
    @NotNull(message = "Zvíře nesmí být prázdný")
    private Zvire zvire;
}
