package zoo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import zoo.entity.Uzivatel;
import zoo.repository.RoleRepository;
import zoo.repository.UzivatelRepository;

@Controller
public class AuthController {

    @Autowired
    private UzivatelRepository uzivatelRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Value("${auth.enabled:true}")
    private Boolean authEnabled;

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("uzivatel", new Uzivatel());
        return "register";
    }

    @PostMapping("/register/save")
    public String registration(@Valid @ModelAttribute("uzivatel") Uzivatel uzivatel, BindingResult result, Model model) {
        Uzivatel existing = uzivatelRepository.findByEmail(uzivatel.getEmail());
        if (existing != null) {
            result.rejectValue("email", null, "Účet s tímto emailem již existuje");
        }
        if (result.hasErrors() && !(result.getAllErrors().size() == 1 && result.getFieldErrors("role").size() == 1)) {
            model.addAttribute("uzivatel", uzivatel);
            return "register";
        }

        uzivatel.setHeslo(new BCryptPasswordEncoder().encode(uzivatel.getHeslo()));
        uzivatelRepository.insertUzivatel(uzivatel.getJmeno(), uzivatel.getPrijmeni(), uzivatel.getEmail(),
                uzivatel.getHeslo(), roleRepository.findByName("ROLE_USER").getRoleId());

        return "redirect:/register?success";
    }

    @GetMapping("/whoami/username")
    public ResponseEntity<String> whoamiUsername() {
        if (Boolean.FALSE.equals(authEnabled))
            return ResponseEntity.ok("f");

        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            return ResponseEntity.ok(((User) auth.getPrincipal()).getUsername());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Nepodařilo se získat username");
        }
    }

    @GetMapping("/whoami/role")
    public ResponseEntity<String> whoamiRole() {
        if (Boolean.FALSE.equals(authEnabled))
            return ResponseEntity.ok("ROLE_ADMIN");

        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            return ResponseEntity.ok(((User) auth.getPrincipal()).getAuthorities().toArray()[0].toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Nepodařilo se získat roli");
        }
    }
}
