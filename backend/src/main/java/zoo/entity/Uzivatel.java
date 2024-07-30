package zoo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Uzivatel {

    @Id
    @Column(nullable = false, updatable = false)
    private Long uzivatelId;

    @Column(nullable = false)
    @Size(max = 40, message = "Délka jména musí být maximálně 40 znaků")
    @NotBlank(message = "Jméno nesmí být prázdný")
    @NotEmpty
    private String jmeno;

    @Column(nullable = false)
    @Size(max = 40, message = "Délka příjmení musí být maximálně 40 znaků")
    @NotBlank(message = "Příjmení nesmí být prázdný")
    private String prijmeni;

    @Column(nullable = false, unique = true)
    @Size(max = 60, message = "Délka emailu musí být maximálně 60 znaků")
    @NotBlank(message = "Email nesmí být prázdný")
    @Email(message="Email nemá správny formát")
    private String email;

    @Column(nullable = false)
    @Size(max = 100, message = "Délka hesla musí být maximálně 100 znaků")
    @NotBlank(message = "Heslo nesmí být prázdný")
    private String heslo;

    @OneToOne
    @JoinColumn(name = "role_id", nullable = false)
    @NotNull(message = "Role nesmí být prázdná")
    private Role role;
}
