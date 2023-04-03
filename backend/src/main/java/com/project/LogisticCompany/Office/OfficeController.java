package com.project.LogisticCompany.Office;

import com.project.LogisticCompany.Company.Company;
import com.project.LogisticCompany.Customer.Customer;
import com.project.LogisticCompany.Employee.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path ="/office")
public class OfficeController {
    public final OfficeService officeService;

    @Autowired
    public OfficeController(OfficeService officeService) {
        this.officeService = officeService;
    }

    @GetMapping("/getAllOffices")
    public List<Office> getOffices(){
        return officeService.getOffices();
    }

    @GetMapping("/findOfficeById/{id}")
    public Office getOfficeById(@PathVariable Long id) {
        return officeService.getOfficeByid(id);
    }

    @PostMapping
    public Office createOffice(@RequestBody Office office){
        return officeService.createOffice(office);
    }

    @PutMapping("/update/{id}")
    public Office updateOffice(@PathVariable Long id, @RequestBody Office office){
        office.setId(id);
        return officeService.updateOffice(office);
    }
}
