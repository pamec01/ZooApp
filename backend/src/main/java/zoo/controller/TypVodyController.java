package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.TypVody;
import zoo.repository.TypVodyRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/typ-vody")
public class TypVodyController {

    @Autowired
    private TypVodyRepository typVodyRepository;

    @GetMapping("/select/all")
    public List<TypVody> selectAll() {
        return typVodyRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<TypVody> selectAll(@PathVariable Long id) {
        return typVodyRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody TypVody typVody) {
        try {
            typVodyRepository.insertTypVody(typVody.getNazev());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Typ vody není validní");
        }

        return ResponseEntity.ok("Typ vody byl vytvořen");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody TypVody typVody) {
        try {
            typVodyRepository.updateTypVody(typVody.getTypVodyId(), typVody.getNazev());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Typ vody není validní");
        }

        return ResponseEntity.ok("Typ vody byl upraven");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            typVodyRepository.deleteTypVody(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Typ vody nebylo odstraněno nevalidní");
        }

        return ResponseEntity.ok("Typ vody byl odstraněn");
    }
}
