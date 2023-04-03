package com.project.LogisticCompany.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    public List<Employee> getEmployeesInCompany(){
        return employeeRepository.findAll();
    }

    public Employee getEmployeeByid(@PathVariable Long id){
        return employeeRepository.findEmployeeByid(id);
    }
    public Employee getEmployeeByPhoneNumb(String phoneNumber){
        Employee employee = employeeRepository.findAll().stream().filter(t -> phoneNumber.equals(t.getPhone())).findFirst().orElse(null);
        return employee;
    }
    public Employee getEmployeeByEmail(String email){
        Employee employee = employeeRepository.findAll().stream().filter(t -> email.equals(t.getEmail())).findFirst().orElse(null);
        return employee;
    }
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    public List<Employee> getDriverEmployees()
    {
        List<Employee> employeeList=new ArrayList<>();
        for(Employee employee: employeeRepository.findAll())
        {
            if(employee.getPosition().equals(Position.DRIVER))
            {
                employeeList.add(employee);
            }

        }
        return employeeList;
    }

    public Employee updateEmployee(Employee employee) {
        return  employeeRepository.save(employee);
    }
}
