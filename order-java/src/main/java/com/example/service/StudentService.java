package com.example.service;

import com.example.pojo.Student;
import com.example.wxexception.MyException;
import org.springframework.stereotype.Service;

@Service
public interface StudentService {
    int addStudent(Student student);
    String getSchIdById(String openId) throws MyException;
    int updateStudent(Student student);
}
