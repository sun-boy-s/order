package com.example.pojo;

public class Library {
    private String libId;//图书馆id
    private String name;//图书馆名称
    private String position;//图书馆位置
    private String describe;//图书馆描述
    private int floorSize;//图书馆楼高
    private String schId;//图书馆所属学校

    public Library(String libId, String name, String position, String describe, int floorSize, String schId) {
        this.libId = libId;
        this.name = name;
        this.position = position;
        this.describe = describe;
        this.floorSize = floorSize;
        this.schId = schId;
    }

    public Library(){};
    //get、set方法
    public String getLibId() {
        return libId;
    }

    public void setLibId(String libId) {
        this.libId = libId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public int getFloor() {
        return floorSize;
    }

    public void setFloor(int floor) {
        this.floorSize = floor;
    }

    public String getSchId() {
        return schId;
    }

    public void setSchId(String schId) {
        this.schId = schId;
    }
}
