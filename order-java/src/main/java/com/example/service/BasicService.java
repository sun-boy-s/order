package com.example.service;

import com.example.pojo.User;
import org.springframework.stereotype.Service;

@Service
public interface BasicService {
    User login(String openid) throws Exception;
    String getOpenId(String code) throws Exception;
}
