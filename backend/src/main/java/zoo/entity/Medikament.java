package zoo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Entity
@Getter
@Setter
public class Medikament {

    @Id
    @Column(nullable = false, updatable = false)
    private Long medikamentId;

    @Column(nullable = false, length = 40)
    @NotBlank(message = "Název nesmí být prázdný")
    @Size(max = 40, message = "Délka názvu musí být maximálně 40 znaků")
    private String nazev;

    @ManyToOne
    @JoinColumn(name = "osetrovatel_id", nullable = false)
    @NotNull(message = "Ošetřovatel nesmí být prázdný")
    private Osetrovatel osetrovatel;
}
