package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Krmeni;
import zoo.repository.KrmeniRepository;
import zoo.repository.OsetrovatelRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/krmeni")
public class KrmeniController {

    @Autowired
    private KrmeniRepository krmeniRepository;

    @Autowired
    private OsetrovatelRepository osetrovatelRepository;

    @GetMapping("/select/all")
    public List<Krmeni> selectAll() {
        return krmeniRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Krmeni> selectById(@PathVariable Long id) {
        return krmeniRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Krmeni krmeni) {
        try {
            if (krmeni.getOsetrovatel().getOsetrovatelId() == null || osetrovatelRepository.findById(krmeni.getOsetrovatel().getOsetrovatelId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný ošetřovatel neexistuje");

            krmeniRepository.insertKrmeni(krmeni.getNazev(),
                    krmeni.getOsetrovatel().getOsetrovatelId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Krmivo není validní");
        }

        return ResponseEntity.ok("Krmivo bylo vytvořeno");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Krmeni krmeni) {
        try {
            if (krmeni.getOsetrovatel().getOsetrovatelId() == null || osetrovatelRepository.findById(krmeni.getOsetrovatel().getOsetrovatelId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný ošetřovatel neexistuje");

            krmeniRepository.updateKrmeni(krmeni.getKrmeniId(), krmeni.getNazev(),
                    krmeni.getOsetrovatel().getOsetrovatelId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Krmivo není validní");
        }

        return ResponseEntity.ok("Krmivo bylo upraveno");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            krmeniRepository.deleteKrmeni(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Krmivo nebylo odstraněno");
        }

        return ResponseEntity.ok("Krmivo bylo odstraněno");
    }
}