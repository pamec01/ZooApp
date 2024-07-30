package zoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zoo.entity.PodrizeniView;
import zoo.repository.PodrizeniViewRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/podrizeni-view")
public class PodrizeniViewController {

    @Autowired
    private PodrizeniViewRepository podrizeniViewRepository;

    @GetMapping("/select/all")
    public List<PodrizeniView> selectAll() {
        return podrizeniViewRepository.findAll();
    }
}
