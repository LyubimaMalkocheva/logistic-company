package com.project.LogisticCompany.Office;


import com.project.LogisticCompany.Customer.Customer;
import com.project.LogisticCompany.Employee.Employee;
import com.project.LogisticCompany.Employee.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Set;

@Service
public class OfficeService {
    private final OfficeRepository officeRepository;
    @Autowired

    public OfficeService(OfficeRepository officeRepository) {
        this.officeRepository = officeRepository;
    }
    public List<Office> getOffices(){
        return officeRepository.findAll();
    }
    public Office getOfficeByid(@PathVariable Long id){
        return officeRepository.findOfficeByid(id);
    }

    public Office createOffice(Office office) {
        return officeRepository.save(office);
    }

    public Office updateOffice(Office office) {
        return  officeRepository.save(office);
    }

}
