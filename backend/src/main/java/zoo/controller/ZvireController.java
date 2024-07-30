package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Zvire;
import zoo.repository.DruhRepository;
import zoo.repository.OsetrovatelRepository;
import zoo.repository.UmisteniRepository;
import zoo.repository.ZvireRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/zvire")
public class ZvireController {

    @Autowired
    private ZvireRepository zvireRepository;

    @Autowired
    private OsetrovatelRepository osetrovatelRepository;

    @Autowired
    private DruhRepository druhRepository;

    @Autowired
    private UmisteniRepository umisteniRepository;

    @GetMapping("/select/all")
    public List<Zvire> selectAll() {
        return zvireRepository.findAll();
    }

    @GetMapping("/select/notSuchoVodni")
    public List<Zvire> selectNotSuchoVodni() {
        return zvireRepository.findNotSuchoVodni();
    }

    @GetMapping("/select/{id}")
    public Optional<Zvire> selectById(@PathVariable Long id) {
        return zvireRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Zvire zvire) {
        try {
            if (zvire.getOsetrovatel().getOsetrovatelId() == null || osetrovatelRepository.findById(zvire.getOsetrovatel().getOsetrovatelId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný ošetřovatel neexistuje");
            if (zvire.getUmisteni().getUmisteniId() == null || umisteniRepository.findById(zvire.getUmisteni().getUmisteniId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané umístění neexistuje");
            if (zvire.getDruh().getDruhId() == null || druhRepository.findById(zvire.getDruh().getDruhId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný druh neexistuje");


            zvireRepository.insertZvire(zvire.getJmeno(), zvire.getZemePuvodu(), zvire.getCip(),
                    zvire.getDruh().getDruhId(), zvire.getOsetrovatel().getOsetrovatelId(),
                    zvire.getUmisteni().getUmisteniId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Zvíře není validní");
        }

        return ResponseEntity.ok("Zvíře bylo vytvořeno");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Zvire zvire) {
        try {
            if (zvire.getOsetrovatel().getOsetrovatelId() == null || osetrovatelRepository.findById(zvire.getOsetrovatel().getOsetrovatelId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný ošetřovatel neexistuje");
            if (zvire.getUmisteni().getUmisteniId() == null || umisteniRepository.findById(zvire.getUmisteni().getUmisteniId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané umístění neexistuje");
            if (zvire.getDruh().getDruhId() == null || druhRepository.findById(zvire.getDruh().getDruhId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný druh neexistuje");

            zvireRepository.updateZvire(zvire.getZvireId(), zvire.getJmeno(), zvire.getZemePuvodu(), zvire.getCip(),
                    zvire.getDruh().getDruhId(), zvire.getOsetrovatel().getOsetrovatelId(),
                    zvire.getUmisteni().getUmisteniId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Zvíře není validní");
        }

        return ResponseEntity.ok("Zvíře bylo upraveno");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            zvireRepository.deleteZvire(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Zvíře nebylo odstraněno");
        }

        return ResponseEntity.ok("Zvíře bylo odstraněno");
    }
}
