package com.project.LogisticCompany.Package;

import com.project.LogisticCompany.Company.CompanyRepository;
import com.project.LogisticCompany.Customer.CustomerService;
import com.project.LogisticCompany.Employee.EmployeeRepository;
import com.project.LogisticCompany.Employee.EmployeeService;
import com.project.LogisticCompany.Office.OfficeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PackageConfig {

    /*
    String nameofPackage, Employee employeeInOffice, Employee driver,
                   Category category, Integer kg, Double price, Status status, String date, Customer sender,
                   Customer receiver, String measures, String endPoint
     */
    @Bean
    CommandLineRunner commandLineRunnerPackage(PackageRepository packageRepository, EmployeeService employeeService, CustomerService customerService)
    {
        return args -> {
            Package package1 = new Package("package1", employeeService.getEmployeeByPhoneNumb("0877335142"),employeeService.getEmployeeByPhoneNumb("0877336614"), Category.TO_OFFICE,
                    10,  Status.SENT, "12-24-01",customerService.getCustomerByEmail("I.ivanov@abv.bg"), customerService.getCustomerByPhoneNumb("0886622884"),
                    "12x12x12", "Sofia");
            Package package2 = new Package("package2", employeeService.getEmployeeByPhoneNumb("0876540158"),employeeService.getEmployeeByPhoneNumb("0877336614"), Category.TO_ADDRESS,
                    3,  Status.SENT, "12-28-01",customerService.getCustomerByEmail("yoancheto1@abv.bg"), customerService.getCustomerByPhoneNumb("0800001234"),
                    "15x5x5", "Sofia");
            Package package3 = new Package("package3", employeeService.getEmployeeByPhoneNumb("0835742731"),employeeService.getEmployeeByPhoneNumb("0873714235"), Category.TO_OFFICE,
                    2,  Status.SENT, "12-06-02",customerService.getCustomerByEmail("geriPol@abv.bg"), customerService.getCustomerByPhoneNumb("0888899990"),
                    "20x15x15", "Sofia");
            packageRepository.saveAll(List.of(package1,package2,package3));
        };
    }
}
