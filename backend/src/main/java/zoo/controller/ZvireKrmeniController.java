package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.ZvireKrmeni;
import zoo.repository.KrmeniRepository;
import zoo.repository.ZvireKrmeniRepository;
import zoo.repository.ZvireRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/zvire-krmeni")
public class ZvireKrmeniController {

    @Autowired
    private ZvireKrmeniRepository zvireKrmeniRepository;

    @Autowired
    private KrmeniRepository krmeniRepository;

    @Autowired
    private ZvireRepository zvireRepository;

    @GetMapping("/select/all")
    public List<ZvireKrmeni> selectAll() {
        return zvireKrmeniRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<ZvireKrmeni> selectById(@PathVariable Long id) {
        return zvireKrmeniRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody ZvireKrmeni zvireKrmeni) {
        try {
            if (zvireKrmeni.getZvire().getZvireId() == null || zvireRepository.findById(zvireKrmeni.getZvire().getZvireId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané zvíře neexistuje");
            if (zvireKrmeni.getKrmeni().getKrmeniId() == null || krmeniRepository.findById(zvireKrmeni.getKrmeni().getKrmeniId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané krmení neexistuje");

            zvireKrmeniRepository.insertZvireKrmeni(zvireKrmeni.getZvire().getZvireId(),
                    zvireKrmeni.getKrmeni().getKrmeniId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vztah Zvire-Krmeni není validní");
        }

        return ResponseEntity.ok("Vztah Zvire-Krmeni byl vytvořen");
    }

    @DeleteMapping("/delete/{zvireKrmeniId}")
    public ResponseEntity<String> delete(@PathVariable Long zvireKrmeniId) {
        try {
            zvireKrmeniRepository.deleteZvireKrmeni(zvireKrmeniId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vztah Zvire-Krmeni nebyl odstraněn");
        }

        return ResponseEntity.ok("Vztah Zvire-Krmeni byl odstraněn");
    }
}
