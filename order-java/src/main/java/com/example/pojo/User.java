package com.example.pojo;

public class User {
    private String openId;//用户微信openid
    private String name;//用户微信昵称
    private int type;//用户类型 0-用户 1-学生

    public User(String openId, String name, int type) {
        this.openId = openId;
        this.name = name;
        this.type = type;
    }

    public User(){}

    //get、set方法
    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
