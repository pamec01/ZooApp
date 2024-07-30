package zoo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Role {

    @Id
    @Column(nullable = false, updatable = false)
    private Long roleId;

    @Column(nullable = false, unique = true, length = 40)
    @Size(max = 40, message = "Délka názvu musí být maximálně 40 znaků")
    private String nazev;
}
