package com.example.service;

import com.example.pojo.OrderList;
import com.example.pojo.Seat;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@Service
public interface ListService {
    String updateList(OrderList list);
    List<Map> getSeat(String data);
    Map<String, String[]> getList(String seatId) throws ParseException;
    List<OrderList> getOrders(String openId);
    List<OrderList> getReserved(String openId);
    void changeList();
    void updataPosition();
    String deserve(String message) throws ParseException;
    String sign(int listId,int type);
    OrderList findListById(int listId);
}
