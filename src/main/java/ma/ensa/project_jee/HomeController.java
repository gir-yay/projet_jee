package ma.ensa.project_jee;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";  // It will look for src/main/resources/templates/index.html (for Thymeleaf or similar templating engine)
    }
}
