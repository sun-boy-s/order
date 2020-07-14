package com.example.service;

import com.example.pojo.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    int addUser(User user);
}
