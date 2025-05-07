package com.group13.RailLink.repository;

import com.group13.RailLink.model.Train;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainRepository extends JpaRepository<Train, Integer> {
    
    List<Train> findAllByTrainId(Integer trainId);

    List<Train> findBySeferId(Integer seferId);

    List<Train> findBySeferIdAndDepartureStation(Integer seferId, String departureStation);

    @Query("SELECT t.id FROM Train t WHERE t.seferId = :seferId")
    List<Integer> findTrainIdsBySeferId(@Param("seferId") Integer seferId);
    
    // Find trains between specific stations
    List<Train> findBySeferIdAndDepartureStationAndArrivalStation(
        Integer seferId, String departureStation, String arrivalStation);

    List<Train> findByTrainIdAndDepartureStationAndArrivalStation(
        Integer trainId, String departureStation, String arrivalStation);
    
    // Find all train segments for a journey
    @Query("SELECT t FROM Train t WHERE t.seferId = :seferId AND " +
           "t.departureStation IN :stationsList AND t.arrivalStation IN :stationsList " +
           "ORDER BY LOCATE(t.departureStation, " +
           "(SELECT s.stations FROM Seferler s WHERE s.id = :seferId))")
    List<Train> findTrainSegmentsBySeferIdAndStations(
        @Param("seferId") Integer seferId, 
        @Param("stationsList") List<String> stationsList);

    List<Train> findTrainSegmentsByTrainId(
        @Param("trainId") Integer trainId
    );
    List<Train> findBySeferIdAndDepartureStationAndArrivalStationAndDepartureDateTimeBetween(
            Integer seferId, String departureStation, String arrivalStation, LocalDateTime startDateTime, LocalDateTime endDateTime);
        

            @Query("SELECT t.trainId FROM Train t WHERE " +
            "t.seferId = :seferId AND " +
            "t.departureStation = :departureStation AND " +
            "FUNCTION('DATE', t.departureDateTime) = :date")
     List<Integer> findTrainIdBySeferIdAndDepartureStationAndDate(
         @Param("seferId") Integer seferId,
         @Param("departureStation") String departureStation,
         @Param("date") LocalDate date
     );

     @Query("SELECT MAX(t.trainId) FROM Train t")
    Integer findMaxTrainId();

    @Query("SELECT COUNT(DISTINCT t.trainId) FROM Train t")
int countDistinctTrainIds();

}

