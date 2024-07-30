package zoo.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import zoo.entity.Uzivatel;
import zoo.repository.UzivatelRepository;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UzivatelRepository uzivatelRepository;

    public CustomUserDetailsService(UzivatelRepository uzivatelRepository) {
        this.uzivatelRepository = uzivatelRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Uzivatel uzivatel = uzivatelRepository.findByEmail(email);

        if (uzivatel != null) {
            return new org.springframework.security.core.userdetails.User(uzivatel.getEmail(),
                    uzivatel.getHeslo(),
                    List.of(new SimpleGrantedAuthority(uzivatel.getRole().getNazev())));
        }else{
            throw new UsernameNotFoundException("Neplatné přihlašovací údaje");
        }
    }
}

