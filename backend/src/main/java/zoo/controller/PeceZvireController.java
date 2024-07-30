package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.PeceZvire;
import zoo.repository.PeceRepository;
import zoo.repository.PeceZvireRepository;
import zoo.repository.ZvireRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/pece-zvire")
public class PeceZvireController {

    @Autowired
    private PeceZvireRepository peceZvireRepository;

    @Autowired
    private ZvireRepository zvireRepository;

    @Autowired
    private PeceRepository peceRepository;

    @GetMapping("/select/all")
    public List<PeceZvire> selectAll() {
        return peceZvireRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<PeceZvire> selectById(@PathVariable Long id) {
        return peceZvireRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody PeceZvire peceZvire) {
        try {
            if (peceZvire.getZvire().getZvireId() == null || zvireRepository.findById(peceZvire.getZvire().getZvireId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané zvíře neexistuje");
            if (peceZvire.getPece().getPeceId() == null || peceRepository.findById(peceZvire.getPece().getPeceId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaná péče neexistuje");

            peceZvireRepository.insertPeceZvire(peceZvire.getPece().getPeceId(),
                    peceZvire.getZvire().getZvireId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vztah Pece-Zvire není validní");
        }

        return ResponseEntity.ok("Vztah Pece-Zvire byl vytvořen");
    }

    @DeleteMapping("/delete/{peceZvireId}")
    public ResponseEntity<String> delete(@PathVariable Long peceZvireId) {
        try {
            peceZvireRepository.deletePeceZvire(peceZvireId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vztah Pece-Zvire nebyl odstraněn");
        }

        return ResponseEntity.ok("Vztah Pece-Zvire byl odstraněn");
    }
}
