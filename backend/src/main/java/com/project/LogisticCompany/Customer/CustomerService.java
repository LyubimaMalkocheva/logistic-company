package com.project.LogisticCompany.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class CustomerService{
    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getCustomers(){
        return customerRepository.findAll();
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public void deleteCustomerById(Long id){
        boolean exists = customerRepository.existsById(id);
        if(!exists){
            throw new IllegalStateException("customer with id " + id + " does not exists");
        }
        customerRepository.deleteById(id);
        System.out.println("Customer with id - " + id +" is deleted!");
    }

    public Customer getCustomerByid(@PathVariable Long id){
        return customerRepository.findCustomerByid(id);
    }
    public Customer getCustomerByPhoneNumb(String phoneNumber){
        Customer customer = customerRepository.findAll().stream().filter(t -> phoneNumber.equals(t.getPhone())).findFirst().orElse(null);
        return customer;
    }
    public Customer getCustomerByEmail(String email){
        Customer customer = customerRepository.findAll().stream().filter(t -> email.equals(t.getEmail())).findFirst().orElse(null);
        return customer;
    }
    public Customer updateCustomer(Customer customer){
        return  customerRepository.save(customer);
    }

}