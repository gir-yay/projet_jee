package ma.ensa.project_jee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
public class ProjectJeeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectJeeApplication.class, args);
	}

}
