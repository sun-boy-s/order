package com.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.pojo.User;
import com.example.service.BasicService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/order1.0/basic")
public class BasicController {

    @Autowired
    private BasicService basicService;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public User userLogin(@RequestBody String code) throws Exception {
        JSONObject userJson = JSONObject.parseObject(code);
//        String userBody = userJson.getString("user");
//        JSONObject userIdName = JSONObject.parseObject(userBody);
        return basicService.login(userJson.getString("code"));
    }
}
