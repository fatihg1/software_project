package com.group13.RailLink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group13.RailLink.model.Seferler;

@Repository
public interface seferlerRepo extends JpaRepository<Seferler,Integer>{

}
