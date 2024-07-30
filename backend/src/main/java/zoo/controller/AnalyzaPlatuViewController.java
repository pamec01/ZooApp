package zoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zoo.entity.AnalyzaPlatuView;
import zoo.repository.AnalyzaPlatuViewRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/analyza-platu-view")
public class AnalyzaPlatuViewController {

    @Autowired
    private AnalyzaPlatuViewRepository analyzaPlatuViewRepository;

    @GetMapping("/select/all")
    public List<AnalyzaPlatuView> selectAll() {
        return analyzaPlatuViewRepository.findAll();
    }
}
