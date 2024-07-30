package zoo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Krmeni {

    @Id
    @Column(nullable = false, updatable = false)
    private Long krmeniId;

    @Column(nullable = false, length = 40)
    @NotBlank(message = "Název nesmí být prázdný")
    @Size(max = 40, message = "Délka názvu musí být maximálně 40 znaků")
    private String nazev;

    @ManyToOne
    @JoinColumn(name = "osetrovatel_id", nullable = false)
    @NotNull(message = "Ošetřovatel nesmí být prázdný")
    private Osetrovatel osetrovatel;
}
