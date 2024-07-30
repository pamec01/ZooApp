package zoo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Entity
@Getter
@Setter
public class Osetrovatel {

    @Id
    @Column(nullable = false, updatable = false)
    private Long osetrovatelId;

    @Column(nullable = false, length = 60)
    @Size(max = 60, message = "Délka jména musí být maximálně 60 znaků")
    @NotBlank(message = "Jméno nesmí být prázdný")
    private String jmeno;

    @Column(nullable = false, length = 60)
    @Size(max = 60, message = "Délka příjmení musí být maximálně 60 znaků")
    @NotBlank(message = "Příjmení nesmí být prázdný")
    private String prijmeni;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal plat;

    @Size(max = 100, message = "Délka emailu musí být maximálně 100 znaků")
    private String email;

    @ManyToOne
    @JoinColumn(name = "manazer_id")
    private Osetrovatel manazerId;
}
