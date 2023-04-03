package com.project.LogisticCompany.Company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/company")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping("/getAllCompanies")
    public List<Company> getCompanies(){
        return companyService.getCompanies();
    }


    @GetMapping("/findCompanyById/{id}")
    public Company getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id);
    }

    @PostMapping
    public Company registerNewCompany(@RequestBody Company company){
        return companyService.registerNewCompany(company);
    }

    @PutMapping("/update/{id}")
    public Company updateCompany(@PathVariable Long id, @RequestBody Company company){
        company.setId(id);
        return companyService.updateCompany(company);
    }

    @DeleteMapping("/deleteCompanyById/{id}")
    public void deleteCompanyById(@PathVariable Long id){
        companyService.deleteCompanyById(id);
    }
}
