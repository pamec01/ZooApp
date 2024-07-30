package zoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import zoo.entity.Soubor;
import zoo.repository.MedikamentZvireRepository;
import zoo.repository.OsetrovatelRepository;
import zoo.repository.SouborRepository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/soubor")
public class SouborController {

    @Autowired
    SouborRepository souborRepository;

    @Autowired
    MedikamentZvireRepository medikamentZvireRepository;
    @Autowired
    OsetrovatelRepository osetrovatelRepository;

    @GetMapping("/select/all")
    public List<Soubor> selectAll() {
        return souborRepository.findAll();
    }

    @GetMapping("/select/{id}")
    public Optional<Soubor> selectById(@PathVariable Long id) {
        return souborRepository.findById(id);
    }

    @PostMapping(value = "/insert", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> insertSoubor(@RequestParam MultipartFile data, @RequestParam Long medikamentZvireId, @RequestParam Long osetrovatelId) {
        Soubor soubor = new Soubor();
        soubor.setNazev(data.getOriginalFilename());
        soubor.setTyp(data.getContentType());
        soubor.setMedikamentZvire(medikamentZvireRepository.findById(medikamentZvireId).orElse(null));
        soubor.setOsetrovatel(osetrovatelRepository.findById(osetrovatelId).orElse(null));

        if (soubor.getMedikamentZvire() == null)
            return ResponseEntity.badRequest().body("Zadaný Medikament-Zvíře neexistuje");
        if (soubor.getOsetrovatel() == null)
            return ResponseEntity.badRequest().body("Zadaný ošetřovatel neexistuje");

        try (InputStream is = data.getInputStream()) {
            soubor.setData(is.readAllBytes());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Nastala chyba při čtení soubour");
        }

        try {
            souborRepository.insertSoubor(soubor.getSouborId(), soubor.getData(), soubor.getNazev(), soubor.getTyp(),
                    soubor.getMedikamentZvire().getMedikamentZvireId(), soubor.getOsetrovatel().getOsetrovatelId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Nahraný soubor není validní");
        }

        return ResponseEntity.ok("Soubor byl vytvořen");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            souborRepository.deleteSoubor(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Soubor nebyl odstraněno");
        }

        return ResponseEntity.ok("Soubor bylo odstraněno");
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestParam Long souborId, @RequestParam(required = false) MultipartFile data, @RequestParam Long medikamentZvireId, @RequestParam Long osetrovatelId) {
        Soubor soubor = souborRepository.findById(souborId).orElse(null);

        if (soubor == null)
            return ResponseEntity.badRequest().body("Soubor již neexistuje");

        soubor.setMedikamentZvire(medikamentZvireRepository.findById(medikamentZvireId).orElse(null));
        soubor.setOsetrovatel(osetrovatelRepository.findById(osetrovatelId).orElse(null));

        if (soubor.getMedikamentZvire() == null)
            return ResponseEntity.badRequest().body("Zadaný Medikament-Zvíře neexistuje");
        if (soubor.getOsetrovatel() == null)
            return ResponseEntity.badRequest().body("Zadaný ošetřovatel neexistuje");

        if (data != null) {
            try (InputStream is = data.getInputStream()) {
                soubor.setNazev(data.getOriginalFilename());
                soubor.setTyp(data.getContentType());
                soubor.setData(is.readAllBytes());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("Nastala chyba při čtení soubour");
            }
        }

        try {
            souborRepository.updateSoubor(soubor.getSouborId(), soubor.getData(), soubor.getNazev(), soubor.getTyp(),
                    soubor.getMedikamentZvire().getMedikamentZvireId(), soubor.getOsetrovatel().getOsetrovatelId());
        } catch (
                Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Nahraný soubor není validní");
        }

        return ResponseEntity.ok("Soubor byl upraveno");
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        Soubor soubor = souborRepository.findById(id).orElse(null);

        if (soubor == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + soubor.getNazev() + "\"")
                .body(soubor.getData());
    }
}
