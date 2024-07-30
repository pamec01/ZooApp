package zoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import zoo.entity.PocetPodaniView;
import zoo.entity.PodrizeniView;
import zoo.repository.PocetPodaniViewRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/api/pocet-podani-view")
public class PocetPodaniViewController {

    @Autowired
    private PocetPodaniViewRepository pocetPodaniViewRepository;

    @GetMapping("/select/all")
    public List<PocetPodaniView> selectAll() {
        return pocetPodaniViewRepository.findAll();
    }
}
