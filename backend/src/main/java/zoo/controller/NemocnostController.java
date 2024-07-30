package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Nemocnost;
import zoo.repository.NemocnostRepository;
import zoo.repository.ZvireRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/nemocnost")
public class NemocnostController {

    @Autowired
    private NemocnostRepository nemocnostRepository;

    @Autowired
    private ZvireRepository zvireRepository;

    @GetMapping("/select/all")
    public List<Nemocnost> selectAll() {
        return nemocnostRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Nemocnost> selectById(@PathVariable Long id) {
        return nemocnostRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Nemocnost nemocnost) {
        try {
            if (nemocnost.getZvire().getZvireId() == null || zvireRepository.findById(nemocnost.getZvire().getZvireId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané zvíře neexistuje");

            nemocnostRepository.insertNemocnost(nemocnost.getNazev(), nemocnost.getDatum(), nemocnost.getZvire().getZvireId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Nemocnost není validní");
        }

        return ResponseEntity.ok("Nemocnost byla vytvořena");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Nemocnost nemocnost) {
        try {
            if (nemocnost.getZvire().getZvireId() == null || zvireRepository.findById(nemocnost.getZvire().getZvireId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané zvíře neexistuje");

            nemocnostRepository.updateNemocnost(nemocnost.getNemocnostId(), nemocnost.getNazev(), nemocnost.getDatum(), nemocnost.getZvire().getZvireId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Nemocnost není validní");
        }

        return ResponseEntity.ok("Nemocnost byla upravena");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            nemocnostRepository.deleteNemocnost(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Nemocnost nebyla odstraněna");
        }

        return ResponseEntity.ok("Nemocnost byla odstraněna");
    }
}
