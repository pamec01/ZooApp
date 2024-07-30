package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Pece;
import zoo.repository.PeceRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/pece")
public class PeceController {

    @Autowired
    private PeceRepository peceRepository;

    @GetMapping("/select/all")
    public List<Pece> selectAll() {
        return peceRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Pece> selectById(@PathVariable Long id) {
        return peceRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Pece pece) {
        try {
            peceRepository.insertPece(pece.getNazev());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Pece není validní");
        }

        return ResponseEntity.ok("Pece byla vytvořena");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Pece pece) {
        try {
            peceRepository.updatePece(pece.getPeceId(), pece.getNazev());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Pece není validní");
        }

        return ResponseEntity.ok("Pece byla upravena");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            peceRepository.deletePece(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Pece nebyla odstraněna");
        }

        return ResponseEntity.ok("Pece byla odstraněna");
    }
}
