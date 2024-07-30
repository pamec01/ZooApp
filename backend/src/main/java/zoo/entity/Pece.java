package zoo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Pece {

    @Id
    @Column(nullable = false, updatable = false)
    private Long peceId;

    @Column(nullable = false, length = 40)
    @Size(max = 40, message = "Délka názvu musí být maximálně 40 znaků")
    @NotBlank(message = "Název nesmí být prázdný")
    private String nazev;
}
