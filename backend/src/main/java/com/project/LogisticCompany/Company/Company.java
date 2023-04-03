package com.project.LogisticCompany.Company;

import com.project.LogisticCompany.Employee.Employee;

import com.project.LogisticCompany.Office.Office;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table
public class Company {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    private String name;
    private Double income;

//one to many : one company -> many offices
    @OneToMany(mappedBy = "company")
    private Set<Office> offices;

    private String address;

    public Company() {
    }

    public Company(Long id, String name, Double income, String address) {
        this.id = id;
        this.name = name;
        this.income = income;
        this.address = address;
    }
    public Company( String name, Double income, String address) {
        this.name = name;
        this.income = income;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", income=" + income +
                ", address='" + address + '\'' +
                '}';
    }
}
