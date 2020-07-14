package com.example.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.example.mapper.SeatMapper;
import com.example.pojo.Seat;
import com.example.service.SeatService;
import com.example.wxexception.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SeatServiceImpl implements SeatService {

    @Autowired
    private SeatMapper seatMapper;;

    @Override
    public List<Map> getSeatId(String floor) {
        JSONObject json = JSONObject.parseObject(floor);
        int f = Integer.valueOf(json.getString("floor"));
        return seatMapper.getSeatId(f);
    }

    @Override
    public Seat search(String seatId) throws MyException {
        JSONObject json = JSONObject.parseObject(seatId);
        String seat_id = json.getString("seatId");
        Seat seat = seatMapper.getSeatById(seat_id);
        if(seat==null){
            throw new MyException("座位未找到",404);
        }
        return seat;
    }

    @Override
    public Seat getSeatById(String seat_id) {
        return seatMapper.findById(seat_id);
    }

    @Override
    public List<Seat> intelligent(String data) {
        JSONObject json = JSONObject.parseObject(data);
        int  magorSend = Integer.parseInt(json.getString("magorSend"));
        int airSend = Integer.parseInt(json.getString("airSend"));
        int  windowSend = Integer.parseInt(json.getString("windowSend"));
        int typeSend = Integer.valueOf(json.getString("typeSend"));
        return seatMapper.findSeatList(typeSend,magorSend,windowSend,airSend);
    }
}
