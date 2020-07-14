package com.example.mapper;

import com.example.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    int addUser(@Param("user") User user);
    User findUser(@Param("open_id") String openId);
}
