package com.example.pojo;


import java.sql.Date;

public class OrderList {
    private int listId;//订单标号
    private Date dateTime;//预约日期
    private String times;//约约时间段
    private int isOver;//订单是否结束
    private int beginSign;//开始签到
    private int endSign;//结束签到
    private String openId;//学生ID
    private String seatId;//所订座位号-即座位标识号
    private String schId;//学校

    public OrderList(int listId, Date dateTime, String times, int isOver, int beginSign, int endSign,
                     String openId, String seatId, String schId) {
        this.listId = listId;
        this.dateTime = dateTime;
        this.times = times;
        this.isOver = isOver;
        this.beginSign = beginSign;
        this.endSign = endSign;
        this.openId = openId;
        this.seatId = seatId;
        this.schId = schId;
    }

    public int getListId() {
        return listId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getTimes() {
        return times;
    }

    public void setTimes(String times) {
        this.times = times;
    }

    public int getIsOver() {
        return isOver;
    }

    public void setIsOver(int isOver) {
        this.isOver = isOver;
    }

    public int getBeginSign() {
        return beginSign;
    }

    public void setBeginSign(int beginSign) {
        this.beginSign = beginSign;
    }

    public int getEndSign() {
        return endSign;
    }

    public void setEndSign(int endSign) {
        this.endSign = endSign;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getSeatId() {
        return seatId;
    }

    public void setSeatId(String seatId) {
        this.seatId = seatId;
    }

    public String getSchId() {
        return schId;
    }

    public void setSchId(String schId) {
        this.schId = schId;
    }
}
