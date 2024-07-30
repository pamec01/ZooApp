package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Druh;
import zoo.repository.DruhRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/druh")
public class DruhController {

    @Autowired
    private DruhRepository druhRepository;

    @GetMapping("/select/all")
    public List<Druh> selectAll() {
        return druhRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Druh> selectAll(@PathVariable Long id) {
        return druhRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Druh druh) {
        try {
            druhRepository.insertDruh(druh.getNazev());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Druh není validní");
        }

        return ResponseEntity.ok("Druh byl vytvořen");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Druh druh) {
        try {
            druhRepository.updateDruh(druh.getDruhId(), druh.getNazev());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Druh není validní");
        }

        return ResponseEntity.ok("Druh byl upraven");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            druhRepository.deleteDruh(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Druh nebylo odstraněno nevalidní");
        }

        return ResponseEntity.ok("Druh byl odstraněn");
    }
}
