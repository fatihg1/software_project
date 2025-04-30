package com.group13.RailLink.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.group13.RailLink.model.Seferler;

@Repository
public interface SeferlerRepository extends JpaRepository<Seferler,Integer>{
    @Query("SELECT s FROM Seferler s WHERE s.stations LIKE %:departure% AND s.stations LIKE %:arrival% AND " +
           "LOCATE(:departure, s.stations) < LOCATE(:arrival, s.stations)")
    List<Seferler> findByDepartureAndArrivalStations(@Param("departure") String departure, 
                                                    @Param("arrival") String arrival);
}
