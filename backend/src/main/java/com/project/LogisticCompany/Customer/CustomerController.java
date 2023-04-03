package com.project.LogisticCompany.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/customer")
public class CustomerController {
    @Autowired
    private  CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/getAllCustomers")
    public List<Customer> getCustomers(){
        return customerService.getCustomers();
    }

    @GetMapping("/findCustomerById/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerByid(id);
    }

    @GetMapping("/findCustomerByPhoneNumb/{phoneNumber}")
    public Customer getCustomerByPhoneNumb(@PathVariable String phoneNumber) {
        return customerService.getCustomerByPhoneNumb(phoneNumber);
    }
    @GetMapping("/findCustomerByEmail/{email}")
    public Customer getCustomerByEmail(@PathVariable String email) {
        return customerService.getCustomerByEmail(email);
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }

    @PutMapping("/update/{phoneNumber}")
    public Customer updateCustomer(@PathVariable String phoneNumber, @RequestBody Customer customer){
        customer.setPhone(phoneNumber);
        return customerService.updateCustomer(customer);
    }
}
