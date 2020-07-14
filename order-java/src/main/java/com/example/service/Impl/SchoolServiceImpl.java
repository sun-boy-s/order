package com.example.service.Impl;

import com.example.mapper.SchoolMapper;
import com.example.pojo.School;
import com.example.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SchoolServiceImpl implements SchoolService {

    @Autowired
    private SchoolMapper schoolMapper;

    @Override
    public School findSchoolByCode(String inviteCode) {
        return schoolMapper.findSchoolByCode(inviteCode);
    }

    @Override
    public String getSchoolNameByCode(String inviteCode) {
        return schoolMapper.getSchoolNameByCode(inviteCode);
    }

    @Override
    public School getSchoolById(String schId) {
        return schoolMapper.findSchoolById(schId);
    }


}
