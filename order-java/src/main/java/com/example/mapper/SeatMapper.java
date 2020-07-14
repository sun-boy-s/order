package com.example.mapper;

import com.example.pojo.Seat;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface SeatMapper {
    List<Map> getSeatId(@Param("floor") int floor);
    Seat getSeatById(@Param("seatId") String seatId);
    Seat findById(@Param("seatId") String searId);
    List<Seat> findSeatList(@Param("type") int type,@Param("major") int major,@Param("window") int window
        ,@Param("condition") int condition);
}
