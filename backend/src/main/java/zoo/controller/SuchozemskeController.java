package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Suchozemske;
import zoo.repository.SuchozemskeRepository;
import zoo.repository.ZvireRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/suchozemske")
public class SuchozemskeController {

    @Autowired
    private SuchozemskeRepository suchozemskeRepository;

    @Autowired
    private ZvireRepository zvireRepository;

    @GetMapping("/select/all")
    public List<Suchozemske> selectAll() {
        return suchozemskeRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Suchozemske> selectById(@PathVariable Long id) {
        return suchozemskeRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Suchozemske suchozemske) {
        try {
            if (suchozemske.getZvire().getZvireId() == null || zvireRepository.findById(suchozemske.getZvire().getZvireId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané zvíře neexistuje");

            suchozemskeRepository.insertSuchozemske(suchozemske.getZvire().getZvireId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Suchozemske není validní");
        }

        return ResponseEntity.ok("Suchozemske bylo vytvořeno");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            suchozemskeRepository.deleteSuchozemske(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Suchozemske nebylo odstraněno");
        }

        return ResponseEntity.ok("Suchozemske bylo odstraněno");
    }
}
