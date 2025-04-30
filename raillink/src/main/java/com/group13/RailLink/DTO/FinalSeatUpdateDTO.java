package com.group13.RailLink.DTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class FinalSeatUpdateDTO {
    
    // For each seat, a map with keys like "wagon" and "number"
    private List<Map<String, Integer>> outboundSeats;
    private List<Map<String, Integer>> returnSeats;
    
    // IDs of the outbound trains (e.g., trainPrimaryIds)
    private List<Integer> outboundTrainIds;
    
    // IDs for the return trains; may be empty for one-way trips
    private List<Integer> returnTrainIds;

    public FinalSeatUpdateDTO() {
        // Initialize to empty lists so they’re never null:
        this.outboundSeats = new ArrayList<>();
        this.returnSeats = new ArrayList<>();
        this.outboundTrainIds = new ArrayList<>();
        this.returnTrainIds = new ArrayList<>();
    }

    public FinalSeatUpdateDTO(List<Map<String, Integer>> outboundSeats,
                              List<Map<String, Integer>> returnSeats,
                              List<Integer> outboundTrainIds,
                              List<Integer> returnTrainIds) {
        this.outboundSeats = outboundSeats;
        this.returnSeats = returnSeats;
        this.outboundTrainIds = outboundTrainIds;
        this.returnTrainIds = returnTrainIds;
    }

    public List<Map<String, Integer>> getOutboundSeats() {
        return outboundSeats;
    }

    public void setOutboundSeats(List<Map<String, Integer>> outboundSeats) {
        this.outboundSeats = outboundSeats;
    }

    public List<Map<String, Integer>> getReturnSeats() {
        return returnSeats;
    }

    public void setReturnSeats(List<Map<String, Integer>> returnSeats) {
        this.returnSeats = returnSeats;
    }

    public List<Integer> getOutboundTrainIds() {
        return outboundTrainIds;
    }

    public void setOutboundTrainIds(List<Integer> outboundTrainIds) {
        this.outboundTrainIds = outboundTrainIds;
    }

    public List<Integer> getReturnTrainIds() {
        return returnTrainIds;
    }

    public void setReturnTrainIds(List<Integer> returnTrainIds) {
        this.returnTrainIds = returnTrainIds;
    }
}
