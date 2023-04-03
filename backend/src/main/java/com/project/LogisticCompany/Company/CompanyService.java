package com.project.LogisticCompany.Company;

import com.project.LogisticCompany.Employee.Employee;
import com.project.LogisticCompany.Employee.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Company> getCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyById(Long id){
        return companyRepository.findAll().stream().filter(t -> id.equals(t.getId()))
                .findFirst()
                .orElse(null);

    }

    public Company registerNewCompany(Company transportCompany) {
        return companyRepository.save(transportCompany);
    }
    public Company updateCompany(Company company){
        return  companyRepository.save(company);
    }

    public void deleteCompanyById(Long id){
        boolean exists = companyRepository.existsById(id);
        if(!exists){
            throw new IllegalStateException("Company with id " + id + " does not exists");
        }
        companyRepository.deleteById(id);
        System.out.println("Company with id - " + id +" is deleted!");
    }

}
