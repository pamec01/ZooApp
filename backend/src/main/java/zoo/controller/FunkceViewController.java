package zoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zoo.entity.FunkceView;
import zoo.repository.FunkceViewRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/api/funkce-view")
public class FunkceViewController {

    @Autowired
    private FunkceViewRepository funkceViewRepository;

    @GetMapping("/select/all")
    public List<FunkceView> selectAll() {
        return funkceViewRepository.findAll();
    }

    @GetMapping("refresh/{umisteniId}/{zvireId}")
    public void refresh(@PathVariable Long umisteniId, @PathVariable Long zvireId) {
        funkceViewRepository.refresh(umisteniId, zvireId);
    }
}
