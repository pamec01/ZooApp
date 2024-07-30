package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import zoo.entity.Uzivatel;
import zoo.repository.RoleRepository;
import zoo.repository.UzivatelRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/admin/uzivatel")
public class UzivatelController {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UzivatelRepository uzivatelRepository;

    @GetMapping("/select/all")
    public List<Uzivatel> selectAll() {
        return uzivatelRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Uzivatel> selectById(@PathVariable Long id) {
        return uzivatelRepository.findById(id);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@Valid @RequestBody Uzivatel uzivatel) {
        try {
            Uzivatel existing = uzivatelRepository.findByEmail(uzivatel.getEmail());
            if (existing != null)
                return ResponseEntity.badRequest().body("Účet s tímto emailem již existuje");

            if (uzivatel.getRole().getRoleId() == null || roleRepository.findById(uzivatel.getRole().getRoleId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaná role neexistuje");

            uzivatel.setHeslo(encodePasswordIfNeeded(uzivatel.getHeslo()));
            uzivatelRepository.insertUzivatel(uzivatel.getJmeno(), uzivatel.getPrijmeni(), uzivatel.getEmail(),
                    uzivatel.getHeslo(), uzivatel.getRole().getRoleId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Uživatel není validní");
        }

        return ResponseEntity.ok("Uživatel byl vytvořeno");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@Valid @RequestBody Uzivatel uzivatel) {
        try {
            Uzivatel existing = uzivatelRepository.findByEmail(uzivatel.getEmail());
            if (existing != null && !uzivatel.getUzivatelId().equals(existing.getUzivatelId())) {
                return ResponseEntity.badRequest().body("Účet s tímto emailem již existuje");
            }

            if (uzivatel.getRole().getRoleId() == null || roleRepository.findById(uzivatel.getRole().getRoleId()).isEmpty())
                return ResponseEntity.badRequest().body("Zadaná role neexistuje");

            uzivatel.setHeslo(encodePasswordIfNeeded(uzivatel.getHeslo()));
            uzivatelRepository.updateUzivatel(uzivatel.getUzivatelId(), uzivatel.getJmeno(), uzivatel.getPrijmeni(), uzivatel.getEmail(),
                    uzivatel.getHeslo(), uzivatel.getRole().getRoleId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Uživatel není validní");
        }

        return ResponseEntity.ok("Uživatel byl upraven");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            uzivatelRepository.deleteUzivatel(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Uživatel nebyl odstraněn");
        }

        return ResponseEntity.ok("Uživatel byl odstraněn");
    }

    private String encodePasswordIfNeeded(String password) {
        if (password != null && !(password.startsWith("$2a$10$") && password.length() == 60))
            return new BCryptPasswordEncoder().encode(password);

        return password;
    }
}
