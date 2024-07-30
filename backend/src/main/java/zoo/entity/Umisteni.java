package zoo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Entity
@Getter
@Setter
public class Umisteni {

    @Id
    @Column(nullable = false, updatable = false)
    private Long umisteniId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal velikost;

    @Column(nullable = false, length = 40)
    @Size(max = 40, message = "Délka názvu musí být maximálně 40 znaků")
    @NotBlank(message = "Název nesmí být prázdný")
    private String nazev;
}
