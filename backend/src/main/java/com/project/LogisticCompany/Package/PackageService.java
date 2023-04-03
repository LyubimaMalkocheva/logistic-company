package com.project.LogisticCompany.Package;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageService {
    @Autowired
    private  PackageRepository packageRepository;

    public List<Package> getPackages(){
        return packageRepository.findAll();
    }

    public Package  getPackageById(Long id) {
        Package aPackage = packageRepository.findAll().stream().filter(t -> id.equals(t.getId()))
                .findFirst()
                .orElse(null);
        return aPackage;
    }

    public Package registerNewPackage(Package pack) {
        return packageRepository.save(pack);
    }

    public Package updatePackage(Package pack){
        return  packageRepository.save(pack);
    }

    public void deletePackageById(Long id) {
        boolean exists = packageRepository.existsById(id);
        if(!exists){
            throw new IllegalStateException("Package with id " + id + " does not exists");
        }
        packageRepository.deleteById(id);
        System.out.println("Package with id - " + id +" is deleted!");
    }


}
