package zoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zoo.entity.HiearchieView;
import zoo.repository.HiearchieViewRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/api/hiearchie-view")
public class HiearchieViewController {

    @Autowired
    private HiearchieViewRepository hiearchieViewRepository;

    @GetMapping("/select/all")
    public List<HiearchieView> selectAll() {
        return hiearchieViewRepository.findAll();
    }
}
