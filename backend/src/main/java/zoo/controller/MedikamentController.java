package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Medikament;
import zoo.repository.MedikamentRepository;
import zoo.repository.OsetrovatelRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/medikament")
public class MedikamentController {

    @Autowired
    private MedikamentRepository medikamentRepository;

    @Autowired
    private OsetrovatelRepository osetrovatelRepository;

    @GetMapping("/select/all")
    public List<Medikament> selectAll() {
        return medikamentRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Medikament> selectById(@PathVariable Long id) {
        return medikamentRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Medikament medikament) {
        try {
            if (medikament.getOsetrovatel().getOsetrovatelId() == null || osetrovatelRepository.findById(medikament.getOsetrovatel().getOsetrovatelId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný ošetřovatel neexistuje");

            medikamentRepository.insertMedikament(medikament.getNazev(),
                    medikament.getOsetrovatel().getOsetrovatelId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lék není validní");
        }

        return ResponseEntity.ok("Lék byl vytvořen");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Medikament medikament) {
        try {
            if (medikament.getOsetrovatel().getOsetrovatelId() == null || osetrovatelRepository.findById(medikament.getOsetrovatel().getOsetrovatelId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný ošetřovatel neexistuje");

            medikamentRepository.updateMedikament(medikament.getMedikamentId(), medikament.getNazev(),
                    medikament.getOsetrovatel().getOsetrovatelId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lék není validní");
        }

        return ResponseEntity.ok("Lék byl upraven");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            medikamentRepository.deleteMedikament(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lék nebyl odstraněn");
        }

        return ResponseEntity.ok("Lék byl odstraněn");
    }
}