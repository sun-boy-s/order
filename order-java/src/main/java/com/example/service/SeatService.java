package com.example.service;

import com.example.pojo.Seat;
import com.example.wxexception.MyException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface SeatService {
    List<Map> getSeatId(String floor);
    Seat search(String seatId) throws MyException;
    Seat getSeatById(String seat_id);
    List<Seat> intelligent(String data);
}
