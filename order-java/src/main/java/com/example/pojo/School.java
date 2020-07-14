package com.example.pojo;

import java.util.Date;

public class School {
    private String schId;//学校唯一标识
    private String name;//学校名
    private String introduce;//简介
    private Date createTime;//创建时间
    private String inviteCode;//邀请码
    private String schAdmId;//学校管理员id

    public School(String schId, String name, String introduce, Date createTime, String inviteCode, String schAdmId) {
        this.schId = schId;
        this.name = name;
        this.introduce = introduce;
        this.createTime = createTime;
        this.inviteCode = inviteCode;
        this.schAdmId = schAdmId;
    }

    public School(){}
    //get、set方法

    public String getSchId() {
        return schId;
    }

    public void setSchId(String schId) {
        this.schId = schId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public String getSchAdmId() {
        return schAdmId;
    }

    public void setSchAdmId(String schAdmId) {
        this.schAdmId = schAdmId;
    }
}
