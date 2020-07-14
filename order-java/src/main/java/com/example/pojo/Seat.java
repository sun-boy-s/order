package com.example.pojo;

public class Seat {
    private String seatId;//座位唯一标识
    private int floor;//座位楼层
    private int type;//座位类型
    private int major;//座位专业区域
    private int win;//座位靠窗程度
    private int condit;//座位靠空调程度
    private int ordering;//座位是否被预定
    private String libId;//座位所属图书馆

    public Seat(String seatId, int floor, int type,int major,int win,int condit, int ordering, String libId) {
        this.seatId = seatId;
        this.floor = floor;
        this.type = type;
        this.major = major;
        this.win = win;
        this.condit = condit;
        this.ordering = ordering;
        this.libId = libId;
    }

    public Seat(){}
    //get、set方法
    public String getSeatId() {
        return seatId;
    }

    public void setSeatId(String seatId) {
        this.seatId = seatId;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getMajor() {
        return major;
    }

    public void setMajor(int major) {
        this.major = major;
    }

    public int getWin() {
        return win;
    }

    public void setWin(int win) {
        this.win = win;
    }

    public int getCondit() {
        return condit;
    }

    public void setCondit(int condit) {
        this.condit = condit;
    }

    public int getOrdering() {
        return ordering;
    }

    public void setOrdering(int ordering) {
        this.ordering = ordering;
    }

    public String getLibId() {
        return libId;
    }

    public void setLibId(String libId) {
        this.libId = libId;
    }
}
