package com.project.LogisticCompany.Office;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfficeRepository extends JpaRepository<Office, Long> {
    Office findOfficeByid(Long id);
}
