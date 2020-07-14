package com.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.pojo.Student;
import com.example.service.StudentService;
import com.example.wxexception.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/order1.0/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @RequestMapping(value = "/update",method = RequestMethod.POST)
    @ResponseBody
    public Student updateStudent(@RequestBody String stu) throws MyException {
        JSONObject jb = JSONObject.parseObject(stu);
        String user = jb.getString("user");
        JSONObject student = JSONObject.parseObject(user);
        Student s1 = new Student(student.getString("openId"),student.getString("name"),
                Integer.valueOf(student.getString("type")),student.getString("userId"),
                student.getString("userName"),
                student.getString("userPhone"),100,4,student.getString("schId"));
        if(studentService.updateStudent(s1)>0){
            return s1;
        }
        throw new MyException("未找到",404);
    }
}
