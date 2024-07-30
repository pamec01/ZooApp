package zoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zoo.entity.ObjektyView;
import zoo.entity.PodrizeniView;
import zoo.repository.ObjektyViewRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/objekty-view")
public class ObjektyViewController {

    @Autowired
    private ObjektyViewRepository objektyViewRepository;

    @GetMapping("/select/all")
    public List<ObjektyView> selectAll() {
        return objektyViewRepository.findAll();
    }
}
