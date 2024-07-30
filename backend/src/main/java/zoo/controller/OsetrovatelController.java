package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Osetrovatel;
import zoo.repository.OsetrovatelRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/osetrovatel")
public class OsetrovatelController {

    @Autowired
    private OsetrovatelRepository osetrovatelRepository;

    @GetMapping("/select/all")
    public List<Osetrovatel> selectAll() {
        return osetrovatelRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Osetrovatel> selectById(@PathVariable Long id) {
        return osetrovatelRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Osetrovatel osetrovatel) {
        try {
            osetrovatelRepository.insertOsetrovatel(osetrovatel.getJmeno(), osetrovatel.getPrijmeni(), osetrovatel.getPlat(),
                    osetrovatel.getEmail(), osetrovatel.getManazerId().getOsetrovatelId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Osetrovatel není validní");
        }

        return ResponseEntity.ok("Osetrovatel byl vytvořen");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Osetrovatel osetrovatel) {
        try {
            osetrovatelRepository.updateOsetrovatel(osetrovatel.getOsetrovatelId(), osetrovatel.getJmeno(), osetrovatel.getPrijmeni(),
                    osetrovatel.getPlat(), osetrovatel.getEmail(), osetrovatel.getManazerId().getOsetrovatelId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Osetrovatel není validní");
        }

        return ResponseEntity.ok("Osetrovatel byl upraven");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            osetrovatelRepository.deleteOsetrovatel(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Osetrovatel nebyl odstraněn");
        }

        return ResponseEntity.ok("Osetrovatel byl odstraněn");
    }
}
