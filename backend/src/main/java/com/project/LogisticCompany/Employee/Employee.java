package com.project.LogisticCompany.Employee;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.LogisticCompany.Company.Company;

import com.project.LogisticCompany.Office.Office;
import com.project.LogisticCompany.Package.Package;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table
public class Employee {
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
    private String egn;
    private String first_name;
    private String last_name;
    private String phone;
    private Position position;
    private String email;
    private String password;

//MANY TO ONE :  many employees in office-> one office
    @ManyToOne
    @JoinColumn(name = "office_id")
    @JsonIgnoreProperties({"employees"})
    private Office office;

    //One employee In office many packages
    @OneToMany(mappedBy = "employeeInOffice")
    @JsonIgnoreProperties({"employeeInOffice","driver","sender","receiver"})
    private Set<Package> processedPackages;

    //One driver many packages
    @OneToMany(mappedBy = "driver")
    @JsonIgnoreProperties({"employeeInOffice","driver","sender","receiver"})
    private Set<Package> deliveredPackages;

    //Constructors
    public Employee() {
    }

    public Employee(String egn, String first_name, String last_name, String phone, Position position, Office office,
                    String email, String password) {
        this.egn = egn;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.position = position;
        this.office = office;
        this.email = email;
        this.password = password;
    }

    //Getters
    public Long getId() {
        return id;
    }

    public String getEgn() {
        return egn;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getPhone() {
        return phone;
    }

    public Position getPosition() {
        return position;
    }

    public Office getOffice() {
        return office;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }


    //Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setEgn(String egn) {
        this.egn = egn;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public void setOffice(Office office) {
        this.office = office;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    //ToString

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", egn='" + egn + '\'' +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", phone='" + phone + '\'' +
                ", position=" + position +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}


