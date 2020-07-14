package com.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.pojo.School;
import com.example.pojo.Student;
import com.example.service.SchoolService;
import com.example.service.StudentService;
import com.example.wxexception.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/order1.0/school")
public class SchoolController {
//    Date date = new Date();
//    java.sql.Date sqlDate = new java.sql.Date(date.getTime());

    @Autowired
    private SchoolService schoolService;
    @Autowired
    private StudentService studentService;

    @RequestMapping(value = "/identify",method = RequestMethod.POST)
    @ResponseBody
    public Student schIdentify(@RequestBody String userMassage) throws MyException {
        JSONObject userTemp = JSONObject.parseObject(userMassage);
        String userBody = userTemp.getString("userMessage");
        JSONObject userBodyTemp = JSONObject.parseObject(userBody);
        School sch = schoolService.findSchoolByCode(userBodyTemp.getString("invite_code"));
        if(sch==null){
            throw new MyException("邀请码错误",404);
        }
        else{
            Student stu = new Student(userBodyTemp.getString("id"),userBodyTemp.getString("name"),
                    1,userBodyTemp.getString("num_id"),
                    userBodyTemp.getString("real_name"),
                    userBodyTemp.getString("tele_number"),100,4,sch.getSchId());
            if(studentService.addStudent(stu)>0){
                return stu;
            }
        }
        throw new MyException("系统异常",404);
    }

    @RequestMapping(value = "/getSch",method = RequestMethod.POST)
    @ResponseBody
    public School getSchStuId(@RequestBody String openId) throws MyException {
        JSONObject id = JSONObject.parseObject(openId);
        String stuId = id.getString("openId");
        try {
            return schoolService.getSchoolById(studentService.getSchIdById(stuId));
        } catch (Exception e) {
            throw new MyException("没有该学生",404);
        }
    }

    @RequestMapping(value = "/getSchByCode",method = RequestMethod.POST)
    @ResponseBody
    public School getSchByCode(@RequestBody String inviteCode) throws MyException {
        JSONObject json = JSONObject.parseObject(inviteCode);
        String invite_code = json.getString("inviteCode");
        System.out.println(json);
        System.out.println(invite_code);
        try {

            return schoolService.findSchoolByCode(invite_code);
        } catch (Exception e) {
            throw new MyException("没有学校",404);
        }
    }
}
