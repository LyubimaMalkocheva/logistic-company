package com.project.LogisticCompany.Customer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CustomerConfig {

    @Bean
    CommandLineRunner commandLineRunnerCustomer(CustomerRepository customerRepository){
        return args -> {
            Customer customer1 = new Customer("Ivan", "Ivanov", "Sofia, Zapaden park",
                    "0888899990", "1373", "I.ivanov@abv.bg", "Ivan123@");
            Customer customer2 = new Customer("Petar", "Petrov", "Sofia, Krasno selo",
                    "0886622884", "1374", "P_Petrov@abv.bg", "Petar123@");
            Customer customer3 = new Customer("Yoanna", "Georgieva", "Sofia, Mladost",
                    "0877342827", "1700", "yoancheto1@abv.bg", "yGeorg1248");
            Customer customer4 = new Customer("Gergana", "Polkovnikova", "Sofia, Luilin",
                    "0800001234", "1234", "geriPol@abv.bg", "interpol1234*");
            customerRepository.saveAll(List.of(customer1,customer2,customer3,customer4));
        };
    }
}
