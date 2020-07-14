package com.example.service;

import com.example.pojo.School;
import org.springframework.stereotype.Service;

@Service
public interface SchoolService {
    School findSchoolByCode(String inviteCode);
    String getSchoolNameByCode(String inviteCode);
    School getSchoolById(String schId);
}
