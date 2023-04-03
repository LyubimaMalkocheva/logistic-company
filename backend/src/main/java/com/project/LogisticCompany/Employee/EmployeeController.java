package com.project.LogisticCompany.Employee;

import com.project.LogisticCompany.Customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path ="/employeeInCompany")
public class EmployeeController {
    public final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/getAllEmployeesInCompany")
    public List<Employee> getEmployeesInCompany(){
        return employeeService.getEmployeesInCompany();
    }

    @GetMapping("/findEmployeeById/{id}")
    public Employee getEmployeeByid(@PathVariable Long id) {
        return employeeService.getEmployeeByid(id);
    }

    @GetMapping("/findEmployeeByPhoneNumb/{phoneNumber}")
    public Employee getCustomerByPhoneNumb(@PathVariable String phoneNumber) {
        return employeeService.getEmployeeByPhoneNumb(phoneNumber);
    }
    @GetMapping("/findEmployeeByEmail/{email}")
    public Employee getCustomerByEmail(@PathVariable String email) {
        return employeeService.getEmployeeByEmail(email);
    }
    @GetMapping("/findDriverEmployees/")
    public List<Employee> getEmployeeByDriverPosition()
    {
        return employeeService.getDriverEmployees();
    }
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeService.createEmployee(employee);
    }
    @PutMapping("/update/{phoneNumber}")
    public Employee updateEmployee(@PathVariable String phoneNumber, @RequestBody Employee employee){
        employee.setPhone(phoneNumber);
        return employeeService.updateEmployee(employee);
    }
}
