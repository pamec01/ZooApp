package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Vodni;
import zoo.repository.VodniRepository;
import zoo.repository.ZvireRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/vodni")
public class VodniController {

    @Autowired
    private VodniRepository vodniRepository;

    @Autowired
    private ZvireRepository zvireRepository;

    @GetMapping("/select/all")
    public List<Vodni> selectAll() {
        return vodniRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Vodni> selectById(@PathVariable Long id) {
        return vodniRepository.findById(String.valueOf(id));
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Vodni vodni) {
        try {
            if (vodni.getZvire().getZvireId() == null || zvireRepository.findById(vodni.getZvire().getZvireId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadané zvíře neexistuje");

            vodniRepository.insertVodni(vodni.getZvire().getZvireId(), vodni.getTypVody().getTypVodyId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vodní není validní");
        }

        return ResponseEntity.ok("Vodni bylo vytvořeno");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Vodni vodni) {
        try {
            vodniRepository.updateVodni(vodni.getZvire().getZvireId(), vodni.getTypVody().getTypVodyId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vodni není validní");
        }

        return ResponseEntity.ok("Vodni bylo upraveno");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            vodniRepository.deleteVodni(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Vodni nebylo odstraněno");
        }

        return ResponseEntity.ok("Vodni bylo odstraněno");
    }
}

