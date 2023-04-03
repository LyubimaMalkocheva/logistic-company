package com.project.LogisticCompany.Office;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.LogisticCompany.*;
import com.project.LogisticCompany.Company.Company;

import com.project.LogisticCompany.Employee.Employee;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table
public class Office {
    @Id
    @SequenceGenerator(
            name = "employee_sequence",
            sequenceName = "employee_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.IDENTITY,
            generator = "employee_sequence"
    )
    private Long id;
    private String address;

//MANY TO ONE :  many offices -> one company
    @ManyToOne
    @JoinColumn(name = "company")
    @JsonIgnoreProperties({"income","address"})
    private Company company;

//one to many : one office -> many employeesInOffice
    @OneToMany(mappedBy = "office")
    @JsonIgnoreProperties({"egn","phone","email","password","office"})
    private Set<Employee> employees;


//Constructors
    public Office() {
    }

    public Office(String address, Company company) {
        this.address = address;
        this.company = company;
    }

    //Getters
    public Long getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public Company getCompany() {
        return company;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setId(Long id) {
        this.id = id;
    }

    //ToString
    @Override
    public String toString() {
        return "Office{" +
                "id=" + id +
                ", address='" + address + '\'' +
                '}';
    }
}
