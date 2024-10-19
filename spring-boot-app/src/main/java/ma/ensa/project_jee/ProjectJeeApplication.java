package ma.ensa.project_jee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
public class ProjectJeeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectJeeApplication.class, args);
	}

}
