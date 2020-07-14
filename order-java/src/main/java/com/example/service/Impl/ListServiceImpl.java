package com.example.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.example.mapper.ListMapper;
import com.example.mapper.StudentMapper;
import com.example.pojo.OrderList;
import com.example.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ListServiceImpl implements ListService {

    @Autowired
    private ListMapper listMapper;
    @Autowired
    private StudentMapper studentMapper;

    @Override
    @Transactional
    public String updateList(OrderList orderList) {
        OrderList orderlist = listMapper.findList(orderList.getDateTime(),orderList.getTimes(),orderList.getSeatId());
        if(orderlist==null){
            int times = studentMapper.findStudent(orderList.getOpenId()).getTimes();
            if(times<=0){
                return "今天预约次数用完";
            }
            else if(listMapper.addList(orderList)>0){
                studentMapper.reduceTimes(orderList.getOpenId());
                return "预约成功";
            }
        }
        return "该时段已被预约";
    }

    @Override
    public List<Map> getSeat(String data) {
        JSONObject dataJson = JSONObject.parseObject(data);
        String schId = dataJson.getString("schId");
        String date = dataJson.getString("date");
        String time = dataJson.getString("time");
        return listMapper.getSeatId(schId,date,time);
    }

    @Override
    public Map<String, String[]> getList(String seatId) throws ParseException {
        JSONObject json = JSONObject.parseObject(seatId);
        String seat_id = json.getString("seatId");
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        calendar.add(Calendar.DAY_OF_MONTH, +1);
        Date day1 = sdf.parse(sdf.format(calendar.getTime()));
        calendar.add(Calendar.DAY_OF_MONTH, +1);
        Date day2 = sdf.parse(sdf.format(calendar.getTime()));
        calendar.add(Calendar.DAY_OF_MONTH, +1);
        Date day3 = sdf.parse(sdf.format(calendar.getTime()));
        java.sql.Date d1 = new java.sql.Date(day1.getTime());
        java.sql.Date d2 = new java.sql.Date(day2.getTime());
        java.sql.Date d3 = new java.sql.Date(day3.getTime());
        String[] todayList = listMapper.findListString(seat_id,d1);
        String[] tomorrowList = listMapper.findListString(seat_id,d2);
        String[] afterTList = listMapper.findListString(seat_id,d3);
        Map<String,String[]> map = new HashMap<>();
        map.put("todayList",todayList);
        map.put("tomorrowList",tomorrowList);
        map.put("afterTList",afterTList);
        return map;
    }

    @Override
    public List<OrderList> getOrders(String openId) {
        return listMapper.findListByOpenId(openId);
    }

    @Override
    public List<OrderList> getReserved(String openId) {
        return listMapper.findReservedById(openId);
    }

    @Override
    public void changeList() {
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dates = sdf.format(d);
        String[] dateTime = dates.split(" ");
        listMapper.updateListOrdering(dateTime[0],dateTime[1]);
    }

    @Override
    public void updataPosition(){
        studentMapper.initStudentTimes();
        studentMapper.addPosition();
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dates = sdf.format(d);
        String[] dateTime = dates.split(" ");
        List<OrderList> orderList = listMapper.findListOrdering(dateTime[0]);
        for (OrderList e:orderList) {
            if(e.getBeginSign()==0&&e.getEndSign()==0){
                int a = studentMapper.updataPosition(e.getOpenId(),5,0);
            }else if(e.getBeginSign()==0||e.getEndSign()==0){
                int b = studentMapper.updataPosition(e.getOpenId(),3,0);
            }else{
                int c = studentMapper.updataPosition(e.getOpenId(),1,1);
            }
        }
    }

    @Override
    public String deserve(String message) throws ParseException {
        JSONObject json = JSONObject.parseObject(message);
        String date = json.getString("date");
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dateTime = simpleDateFormat.parse(date);
        String time = json.getString("time");
        String seatId = json.getString("seatId");
        String openId = json.getString("openId");
        OrderList ol = listMapper.findListForDeserve(new java.sql.Date(dateTime.getTime()),time,seatId,openId);
        if(ol!=null){
            if(listMapper.deserve(new java.sql.Date(dateTime.getTime()),time,seatId,openId)>0){
                studentMapper.addTimes(openId);
                return "succeed";
            }
        }
        return "filed";
    }

    @Override
    public String sign(int listId, int type) {
        String message = "重新签到";
        if(listMapper.findListByListId(listId)!=null) {
            if (type == 0) {
                if (listMapper.updateListBeginSign(listId) > 0) {
                    return "签到成功";
                }
            }else if (type==1){
                if(listMapper.updateListEndSign(listId) > 0){
                    return "签到成功";
                }
            }
        }
        return message;
    }

    @Override
    public OrderList findListById(int listId) {
        return listMapper.findListByListId(listId);
    }


}
