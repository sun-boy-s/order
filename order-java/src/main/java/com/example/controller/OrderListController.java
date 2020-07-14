package com.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.pojo.OrderList;
import com.example.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/order1.0/orderList")
public class OrderListController {

    @Autowired
    private ListService listService;

    @RequestMapping(value = "/ordering",method = RequestMethod.POST)
    @ResponseBody
    public String ordering(@RequestBody String list) throws ParseException {
        JSONObject listJson = JSONObject.parseObject(list);
        String listBody = listJson.getString("list");
        JSONObject orderList = JSONObject.parseObject(listBody);
        java.util.Date d = new SimpleDateFormat( "yyyy-MM-dd").parse(orderList.getString("date"));
        java.sql.Date data = new java.sql.Date(d.getTime());
        OrderList l = new OrderList(1, data,
                orderList.getString("time"),0,0,0,orderList.getString("openId"),
                orderList.getString("seatId"),orderList.getString("schId"));
        return listService.updateList(l);
    }

    @RequestMapping(value = "/deserve", method = RequestMethod.POST)
    @ResponseBody
    public String deserve(@RequestBody String message) throws ParseException {
        return listService.deserve(message);
    }

    @RequestMapping(value = "/getSeat",method = RequestMethod.POST)
    @ResponseBody
    public List<Map> getSeat(@RequestBody String date){
        return listService.getSeat(date);
    }
    @RequestMapping(value = "/getList",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String[]> getList(@RequestBody String seatId) throws ParseException {
        return listService.getList(seatId);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getOrders(@RequestParam("openId") String openId) {
        Map<String, Object> map = new HashMap<>();
        List<OrderList> orderLists = listService.getOrders(openId);
        map.put("orderList", orderLists);
        return map;
    }

    @RequestMapping(value = "/reserved", method = RequestMethod.GET)
    public ResponseEntity<List<OrderList>> allReserved(@RequestParam("openId") String openId) {
        return new ResponseEntity<>(listService.getReserved(openId), HttpStatus.OK);
    }

    @RequestMapping(value = "/sign",method = RequestMethod.GET)
    @ResponseBody
    public String sign(@RequestParam("listId") int listId,@RequestParam("type") int type){
        return listService.sign(listId,type);
    }

    @RequestMapping(value = "/findListByListId", method = RequestMethod.GET)
    @ResponseBody
    public OrderList findListByListId(@RequestParam("listId") int listId){
        return listService.findListById(listId);
    }
}
