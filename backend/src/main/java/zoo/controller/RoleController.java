package zoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zoo.entity.Role;
import zoo.repository.RoleRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/role")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/select/all")
    public List<Role> selectAll() {
        return roleRepository.findAll();
    }
}
