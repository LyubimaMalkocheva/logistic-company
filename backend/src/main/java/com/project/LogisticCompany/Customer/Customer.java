package com.project.LogisticCompany.Customer;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.LogisticCompany.Package.Package;
import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.Set;

@Entity
@Table
public class Customer {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    private String first_name;
    private String last_name;
    private String address;
    private String phone;
    private String postalCode;
    private String Email;
    private String password;

    //One sender many packages
    @OneToMany(mappedBy = "sender")
    @JsonIgnoreProperties({"employeeInOffice","driver","sender","receiver"})
    private Set<Package> sendedPackages;

    //One receiver many packages
    @OneToMany(mappedBy = "receiver")
    @JsonIgnoreProperties({"employeeInOffice","driver","receiver","sender"})
    private Set<Package> receivedPackages;

    public Customer() {
    }

    public Customer(String first_name, String last_name, String address, String phone, String postalCode,
                    String email, String password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.phone = phone;
        this.postalCode = postalCode;
        this.Email = email;
        this.password = password;
    }

    public Customer(String first_name, String last_name, String address, String phone, String postalCode) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.phone = phone;
        this.postalCode = postalCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSendedPackages(Set<Package> sendedPackages) {
        this.sendedPackages = sendedPackages;
    }

    public void setReceivedPackages(Set<Package> receivedPackages) {
        this.receivedPackages = receivedPackages;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getEmail() {
        return Email;
    }

    public Set<Package> getSendedPackages() {
        return sendedPackages;
    }

    public Set<Package> getReceivedPackages() {
        return receivedPackages;
    }

    public void setEmail(String email) {
        Email = email;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", postalCode='" + postalCode + '\'' +
                '}';
    }
}
