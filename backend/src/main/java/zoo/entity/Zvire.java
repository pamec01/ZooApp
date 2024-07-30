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
public class Zvire {

    @Id
    @Column(nullable = false, updatable = false)
    private Long zvireId;

    @Column(nullable = false, length = 40)
    @Size(max = 40, message = "Délka jména musí být maximálně 40 znaků")
    @NotBlank(message = "Jméno nesmí být prázdný")
    private String jmeno;

    @Column(nullable = false, length = 60)
    @Size(max = 60, message = "Délka země původu musí být maximálně 60 znaků")
    @NotBlank(message = "Země původu nesmí být prázdný")
    private String zemePuvodu;

    @Column(nullable = false, length = 40)
    @Size(max = 200, message = "Délka čipu musí být maximálně 200 znaků")
    private String cip;

    @ManyToOne
    @JoinColumn(name = "druh_id", nullable = false)
    @NotNull(message = "Druh nesmí být prázdný")
    private Druh druh;

    @ManyToOne
    @JoinColumn(name = "osetrovatel_id", nullable = false)
    @NotNull(message = "Ošetřovatel nesmí být prázdný")
    private Osetrovatel osetrovatel;

    @ManyToOne
    @JoinColumn(name = "umisteni_id", nullable = false)
    @NotNull(message = "Umístění nesmí být prázdný")
    private Umisteni umisteni;
}
