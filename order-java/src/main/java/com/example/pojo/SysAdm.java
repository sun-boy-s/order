package com.example.pojo;

public class SysAdm {
    private String sysAdmId;//唯一标识，web登录名
    private String name;//昵称
    private String password;//web登录密码

    public SysAdm(String sysAdmId, String name, String password) {
        this.sysAdmId = sysAdmId;
        this.name = name;
        this.password = password;
    }

    public SysAdm(){}
    //get、set方法
    public String getSysAdmId() {
        return sysAdmId;
    }

    public void setSysAdmId(String sysAdmId) {
        this.sysAdmId = sysAdmId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
