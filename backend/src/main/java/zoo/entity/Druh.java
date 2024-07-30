package zoo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Druh {

    @Id
    @Column(nullable = false, updatable = false)
    private Long druhId;

    @Column(nullable = false, length = 40)
    @NotBlank(message = "Název nesmí být prázdné")
    @Size(max = 40, message = "Délka názvu musí být maximálně 40 znaků")
    private String nazev;
}
