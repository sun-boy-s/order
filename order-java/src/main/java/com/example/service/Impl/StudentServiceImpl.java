package com.example.service.Impl;

import com.example.mapper.StudentMapper;
import com.example.pojo.Student;
import com.example.service.StudentService;
import com.example.wxexception.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentMapper studentMapper;

    @Override
    public int addStudent(Student student) {
        return studentMapper.addStudent(student);
    }

    @Override
    public String getSchIdById(String openId) throws MyException {
        try{
            return studentMapper.findStudent(openId).getSchId();
        }catch (NullPointerException e){
            throw new MyException("没有这个学生",404);
        }

    }

    @Override
    public int updateStudent(Student student) {
        return studentMapper.updateStudent(student);
    }


}
