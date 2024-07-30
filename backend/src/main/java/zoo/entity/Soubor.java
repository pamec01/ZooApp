package zoo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Soubor {

    @Id
    Long souborId;

    @Lob
    private byte[] data;

    @Column(nullable = false, length = 250)
    private String nazev;


    @Column(length = 250)
    private String typ;

    @ManyToOne
    @JoinColumn(name = "medikament_zvire_id")
    private MedikamentZvire medikamentZvire;

    @ManyToOne
    @JoinColumn(name = "osetrovatel_id")
    private Osetrovatel osetrovatel;
}
