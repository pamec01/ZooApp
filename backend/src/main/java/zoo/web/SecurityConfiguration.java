package zoo.web;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private static final String ADMIN = "ADMIN";
    private static final String USER = "USER";
    private static final String LOGIN = "/login";

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    @ConditionalOnProperty(value = "auth.enabled", havingValue = "false")
    public SecurityFilterChain filterChainAuthDisabled(HttpSecurity http) throws Exception {
        http.addFilterAfter(new SpaWebFilter(), BasicAuthenticationFilter.class);
        http.csrf().disable();
        return http.build();
    }

    @Bean
    @ConditionalOnProperty(value = "auth.enabled", havingValue = "true", matchIfMissing = true)
    public SecurityFilterChain filterChainAuthEnabled(HttpSecurity http) throws Exception {
        // @formatter:off
        http.csrf().disable()
                .authorizeHttpRequests(authorize ->
                        authorize
                                .requestMatchers("/register/**").permitAll()
                                .requestMatchers("/error*").permitAll()
                                .requestMatchers("/api/admin/**").hasRole(ADMIN)
                                .requestMatchers("/api/**").hasAnyRole(ADMIN, USER)
                                .requestMatchers("/**").hasAnyRole(ADMIN, USER)
                ).formLogin(form ->
                        form
                                .loginPage(LOGIN)
                                .loginProcessingUrl(LOGIN)
                                .defaultSuccessUrl("/", true)
                                .permitAll()
                ).logout(logout ->
                        logout
                                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                                .permitAll()
                )
                .addFilterAfter(new SpaWebFilter(), BasicAuthenticationFilter.class);
        // @formatter:on

        return http.build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOriginPatterns("*");
                registry.addMapping("/**").allowedMethods("*");
            }
        };
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private static class SpaWebFilter extends OncePerRequestFilter {
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            String path = request.getRequestURI();
            if (!path.startsWith("/api") &&
                !path.startsWith("/whoami") &&
                !path.contains(".") &&
                !path.startsWith("/register") &&
                !path.equals(LOGIN) &&
                !path.equals("/logout") &&
                !path.equals("/error") &&
                path.matches("/(.*)")
            ) {
                request.getRequestDispatcher("/").forward(request, response);
                return;
            }

            filterChain.doFilter(request, response);
        }
    }
}
