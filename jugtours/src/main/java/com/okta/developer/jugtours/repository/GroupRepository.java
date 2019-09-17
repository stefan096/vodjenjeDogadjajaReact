package com.okta.developer.jugtours.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.okta.developer.jugtours.model.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {
	
    Group findByName(String name);
    
}