package com.example.controller;

import com.example.pojo.Seat;
import com.example.service.SeatService;
import com.example.wxexception.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/order1.0/seat")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @RequestMapping(value = "/getSeat",method = RequestMethod.POST)
    @ResponseBody
    public List<Map> getSeats(@RequestBody String data){
        return seatService.getSeatId(data);
    }

    @RequestMapping(value = "/search",method = RequestMethod.POST)
    @ResponseBody
    public Seat searchSeat(@RequestBody String seatId) throws MyException {
        return seatService.search(seatId);
    }

    @RequestMapping(value = "/{seatId}", method = RequestMethod.GET)
    @ResponseBody
    public Seat getSeat(@PathVariable("seatId") String seatId) {
        return seatService.getSeatById(seatId);
    }

    @RequestMapping(value = "intelligent" ,method = RequestMethod.POST)
    @ResponseBody
    public List<Seat> intelligentSearch(@RequestBody String data){
        return seatService.intelligent(data);
    }

}
