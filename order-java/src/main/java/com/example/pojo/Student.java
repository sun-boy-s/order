package com.example.pojo;

public class Student extends User {
    private String numId;//学号
    private String realName;//真名
    private String teleNumber;//手机号码
    private int reputation ;//信誉值
    private int times;//预约限定次数
    private String schId;//学校Id

    public Student(String openId, String name, int type, String numId, String realName, String teleNumber, int reputation, int times, String schId) {
        super(openId, name, type);
        this.numId = numId;
        this.realName = realName;
        this.teleNumber = teleNumber;
        this.reputation = reputation;
        this.times = times;
        this.schId = schId;
    }

    public Student(String numId, String realName, String teleNumber, int reputation, int times, String schId) {
        this.numId = numId;
        this.realName = realName;
        this.teleNumber = teleNumber;
        this.reputation = reputation;
        this.times = times;
        this.schId = schId;
    }

    public Student(){}

    //get、set方法

    public String getNumId() {
        return numId;
    }

    public void setNumId(String numId) {
        this.numId = numId;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getTeleNumber() {
        return teleNumber;
    }

    public void setTeleNumber(String teleNumber) {
        this.teleNumber = teleNumber;
    }

    public int getReputation() {
        return reputation;
    }

    public void setReputation(int reputation) {
        this.reputation = reputation;
    }

    public int getTimes() {
        return times;
    }

    public void setTimes(int times) {
        this.times = times;
    }

    public String getSchId() {
        return schId;
    }

    public void setSchId(String schId) {
        this.schId = schId;
    }
}
