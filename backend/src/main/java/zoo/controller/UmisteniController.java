package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Umisteni;
import zoo.repository.UmisteniRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/umisteni")
public class UmisteniController {

    @Autowired
    private UmisteniRepository umisteniRepository;

    @GetMapping("/select/all")
    public List<Umisteni> selectAll() {
        return umisteniRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Umisteni> selectById(@PathVariable Long id) {
        return umisteniRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Umisteni umisteni) {
        try {
            umisteniRepository.insertUmisteni(umisteni.getVelikost(), umisteni.getNazev());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Umístění není validní");
        }

        return ResponseEntity.ok("Umístění bylo vytvořeno");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Umisteni umisteni) {
        try {
            umisteniRepository.updateUmisteni(umisteni.getUmisteniId(), umisteni.getVelikost(), umisteni.getNazev());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Umístění není validní");
        }

        return ResponseEntity.ok("Umístění bylo upraveno");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            umisteniRepository.deleteUmisteni(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Umístění nebylo odstraněno");
        }

        return ResponseEntity.ok("Umístění bylo odstraněno");
    }
}
