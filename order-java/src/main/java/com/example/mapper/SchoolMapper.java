package com.example.mapper;

import com.example.pojo.School;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SchoolMapper {
    School findSchoolByCode(@Param("invite_code") String inviteCode);
    String getSchoolNameByCode(@Param("invite_code") String inviteCode);
    School findSchoolById(@Param("sch_id") String schId);
}
