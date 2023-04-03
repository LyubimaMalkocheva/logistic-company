package com.project.LogisticCompany.Employee;

import com.project.LogisticCompany.Company.Company;
import com.project.LogisticCompany.Company.CompanyRepository;
import com.project.LogisticCompany.Customer.Customer;
import com.project.LogisticCompany.Customer.CustomerRepository;
import com.project.LogisticCompany.Office.Office;
import com.project.LogisticCompany.Office.OfficeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class EmployeeConfig {
    /*
    (String egn, String first_name, String last_name, String phone, Position position, Office office,
                    String email, String password)
     */
    @Bean
    CommandLineRunner commandLineRunnerEmployee(EmployeeRepository employeeRepository, OfficeRepository officeRepository,
                                              CompanyRepository companyRepository)
    {
        return args -> {
            Company company =  new Company("Loggyy", 0.0, "Sofia, Montevideo");
            Office office = new Office("Bul Cherni vruh", company);
            Office office1 = new Office("Montevideo", company);
            Employee employee1 = new Employee("7845961235", "Maria", "Georgieva", "0877336614", Position.DRIVER,
                    office, "maria_g@abv.bg","mariika123" );
            Employee employee2 = new Employee("4875961235", "Ivan", "Georgiev", "0877335142", Position.IN_OFFICE,
                    office, "ivan.g@abv.bg","vanchoEPich" );
            Employee employee3 = new Employee("7596123485", "Vanya", "Georgiev", "0876540158", Position.IN_OFFICE,
                    office1, "vanya.g@abv.bg","vanchetoEQka" );
            Employee employee4 = new Employee("9648751235", "Irina", "Kostalova", "0835742731", Position.IN_OFFICE,
                    office, "IrinaK.g@abv.bg","1752!@ik" );
            Employee employee5 = new Employee("0175961235", "Boqna", "Lyubova", "0873714235", Position.DRIVER,
                    office1, "boqna.lyubova@abv.bg","someNewPass123" );
            companyRepository.saveAll(List.of(company));
            officeRepository.saveAll(List.of(office,office1));
            employeeRepository.saveAll(List.of(employee1,employee2,employee3,employee4,employee5));

        };
    }
}
