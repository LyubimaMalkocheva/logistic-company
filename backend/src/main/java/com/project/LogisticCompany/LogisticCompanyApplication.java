package com.project.LogisticCompany;

import com.project.LogisticCompany.Package.PackageConfig;
import com.project.LogisticCompany.Package.PackageController;
import com.project.LogisticCompany.Package.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LogisticCompanyApplication {

	public static void main(String[] args) {
		SpringApplication.run(LogisticCompanyApplication.class, args);
	}

}
