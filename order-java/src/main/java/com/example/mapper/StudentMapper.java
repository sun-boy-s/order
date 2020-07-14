package com.example.mapper;

import com.example.pojo.Student;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface StudentMapper {
    int addStudent(@Param("student") Student student);
    Student findStudent(@Param("open_id") String openId);
    int updateStudent(@Param("student") Student student);
    int addPosition();
    int updataPosition(@Param("openId") String openId,@Param("num") int num,@Param("flag") int flag);
    int reduceTimes(@Param("openId") String openId);
    int addTimes(@Param("openId") String openId);
    int initStudentTimes();
}
