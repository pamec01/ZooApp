package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.MedikamentZvire;
import zoo.repository.MedikamentRepository;
import zoo.repository.MedikamentZvireRepository;
import zoo.repository.ZvireRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/medikament-zvire")
public class MedikamentZvireController {

    @Autowired
    private MedikamentZvireRepository medikamentZvireRepository;

    @Autowired
    private MedikamentRepository medikamentRepository;

    @Autowired
    private ZvireRepository zvireRepository;

    @GetMapping("/select/all")
    public List<MedikamentZvire> selectAll() {
        return medikamentZvireRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<MedikamentZvire> selectById(@PathVariable Long id) {
        return medikamentZvireRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody MedikamentZvire medikamentZvire) {
        try {
            if (medikamentZvire.getZvire().getZvireId() == null || zvireRepository.findById(medikamentZvire.getZvire().getZvireId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané zvíře neexistuje");
            if (medikamentZvire.getMedikament().getMedikamentId() == null || medikamentRepository.findById(medikamentZvire.getMedikament().getMedikamentId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný medikament neexistuje");

            medikamentZvireRepository.insertMedikamentZvire(medikamentZvire.getMedikament().getMedikamentId(),
                    medikamentZvire.getZvire().getZvireId(),
                    medikamentZvire.getDatum());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vztah Medikament-Zvire není validní");
        }

        return ResponseEntity.ok("Vztah Medikament-Zvire byl vytvořen");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody MedikamentZvire medikamentZvire) {
        try {
            if (medikamentZvire.getZvire().getZvireId() == null || zvireRepository.findById(medikamentZvire.getZvire().getZvireId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané zvíře neexistuje");
            if (medikamentZvire.getMedikament().getMedikamentId() == null || medikamentRepository.findById(medikamentZvire.getMedikament().getMedikamentId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaný medikament neexistuje");

            medikamentZvireRepository.updateMedikamentZvire(medikamentZvire.getMedikament().getMedikamentId(),
                    medikamentZvire.getZvire().getZvireId(),
                    medikamentZvire.getDatum());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vztah Medikament-Zvire není validní");
        }

        return ResponseEntity.ok("Vztah Medikament-Zvire byl upraven");
    }

    @DeleteMapping("/delete/{medikamentZvireId}")
    public ResponseEntity<String> delete(@PathVariable Long medikamentZvireId) {
        try {
            medikamentZvireRepository.deleteMedikamentZvire(medikamentZvireId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vztah Medikament-Zvire nebyl odstraněn");
        }

        return ResponseEntity.ok("Vztah Medikament-Zvire byl odstraněn");
    }
}
