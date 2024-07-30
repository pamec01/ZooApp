package zoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zoo.entity.LoggingTable;
import zoo.repository.LoggingTableRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/logging-table")
public class LoggingTableController {

    @Autowired
    private LoggingTableRepository loggingTableRepository;

    @GetMapping("/select/all")
    public List<LoggingTable> selectAll() {
        return loggingTableRepository.findAll();
    }
}
