package com.project.LogisticCompany.Package;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/package")
public class PackageController {
    private final PackageService packageService;

    @Autowired
    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

        @GetMapping("/getPackages")
        public List<Package> getPackages(){
            return packageService.getPackages();
        }

        @GetMapping("/getPackageById/{id}")
        public Package getPackageById(@PathVariable Long id) {
            return packageService.getPackageById(id);
        }


        @PostMapping
        public Package registerNewPackage(@RequestBody Package pack){
            return packageService.registerNewPackage(pack);    }

        @PutMapping("/update/{id}")
        public Package updatePackage(@PathVariable Long id, @RequestBody Package pack){
            pack.setId(id);
            return packageService.updatePackage(pack);
        }


        @DeleteMapping("/deletePackageById/{id}")
        public void deletePackageById(@PathVariable Long id){
             packageService.deletePackageById(id);
        }
}
