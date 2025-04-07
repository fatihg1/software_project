package com.group13.RailLink.repository;

import com.group13.RailLink.model.Wagons;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WagonsRepository extends JpaRepository<Wagons, Integer> {
    List<Wagons> findByTrainId(Integer trainId);
    List<Wagons> findByTrainIdAndWagonNumber(Integer trainId, Integer wagonNumber);
    Optional<Wagons> findById(Integer id);
}
