package com.project.LogisticCompany.Package;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.LogisticCompany.Customer.Customer;
import com.project.LogisticCompany.Employee.Employee;
import com.project.LogisticCompany.Employee.Position;
import com.project.LogisticCompany.Office.Office;
import jakarta.persistence.*;


@Entity
@Table
public class Package {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    private String nameofPackage;

    //MANY TO ONE :  many packages -> one employeeInOffice
    @ManyToOne
    @JoinColumn(name = "employee_in_office_id")
    @JsonIgnoreProperties({"egn","phone","password","office","position"})
    private Employee employeeInOffice;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    @JsonIgnoreProperties({"egn","phone","password","office","position"})
    private Employee driver;

    private Category category;
    private Integer kg;
    private Double price;
    private Status status;
    private String date;
    private String measures;
    private String startPoint;
    private String endPoint;

    @ManyToOne
    @JsonIgnoreProperties({"sendedPackages","receivedPackages","address","postalCode"})
    private Customer sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    @JsonIgnoreProperties({"sendedPackages","receivedPackages","address","postalCode"})
    private Customer receiver;

    public Package() {
    }

    public Package(String nameofPackage, Employee employeeInOffice, Employee driver,
                   Category category, Integer kg,  Status status, String date, Customer sender,
                   Customer receiver, String measures, String endPoint)
    {
        this.nameofPackage = nameofPackage;
        if(employeeInOffice.getPosition() == Position.IN_OFFICE) this.employeeInOffice = employeeInOffice;
        if(driver.getPosition() == Position.DRIVER) this.driver = driver;
        this.category = category;
        this.kg = kg;
        this.price = this.calculatePrice();
        this.status = status;
        this.date = date;
        this.sender = sender;
        this.receiver = receiver;
        this.measures=measures;
        this.startPoint = this.employeeInOffice.getOffice().getAddress();
        this.endPoint = endPoint;
    }

    public Package(String nameofPackage, Employee employeeInOffice, Employee driver, Category category,
                   Integer kg, Double price, Status status, String date, String measures, String startPoint,
                   String endPoint, Customer sender, Customer receiver)
    {
        this.nameofPackage = nameofPackage;
        this.employeeInOffice = employeeInOffice;
        this.driver = driver;
        this.category = category;
        this.kg = kg;
        this.price = price;
        this.status = status;
        this.date = date;
        this.measures = measures;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.sender = sender;
        this.receiver = receiver;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public String getMeasures() {
        return measures;
    }

    public void setMeasures(String measures) {
        this.measures = measures;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameofPackage() {
        return nameofPackage;
    }

    public void setNameofPackage(String nameofPackage) {
        this.nameofPackage = nameofPackage;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }


    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public double calculatePrice()
    {
        this.price=this.category.getCategoryPrice()*kg;

        return this.price;
    }

    public void setKg(Integer kg) {
        this.kg = kg;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setSender(Customer sender) {
        this.sender = sender;
    }


    public Integer getKg() {
        return kg;
    }

    public Status getStatus() {
        return status;
    }

    public String getDate() {
        return date;
    }

    public Customer getSender() {
        return sender;
    }


    public Customer getReceiver() {
        return receiver;
    }

    public void setReceiver(Customer receiver) {
        this.receiver = receiver;
    }

    public Employee getEmployeeInOffice() {
        return employeeInOffice;
    }

    public Employee getDriver() {
        return driver;
    }

    public void setEmployeeInOffice(Employee employeeInOffice) {
        if(employeeInOffice.getPosition() == Position.IN_OFFICE) this.employeeInOffice = employeeInOffice;
        else System.out.println("Please select employee in office");
    }

    public void setDriver(Employee driver) {
        if(driver.getPosition() == Position.DRIVER) this.driver = driver;
        else System.out.println("Please select driver");
    }

    @Override
    public String toString() {
        return "Package{" +
                "id=" + id +
                ", nameofPackage='" + nameofPackage + '\'' +
                ", category=" + category +
                ", kg=" + kg +
                ", price=" + price +
                ", status=" + status +
                ", date='" + date + '\'' +
                '}';
    }
}
