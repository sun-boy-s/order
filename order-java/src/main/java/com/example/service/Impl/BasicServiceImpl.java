package com.example.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.example.mapper.StudentMapper;
import com.example.mapper.UserMapper;
import com.example.pojo.User;
import com.example.service.BasicService;
import com.example.utils.HttpClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BasicServiceImpl implements BasicService {

    @Value("${wx.applet.appid}")
    private String appid;

    @Value("${wx.applet.appsecret}")
    private String appSecret;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private StudentMapper studentMapper;

    @Override
    public User login(String code) throws Exception {
        String openid = getOpenId(code);
        User person;
        person = studentMapper.findStudent(openid);
        if(person!=null){
            return person;
        }
        else if((person = userMapper.findUser(openid))!=null){
            return person;
        }else {
            person = new User(openid,"null",0);
            userMapper.addUser(person);
            return person;
        }
    }

    /**
     * 微信小程序获取openid，根据官方文档流程开发
     * @param code
     * @return
     * @throws Exception
     */
    @Override
    public String getOpenId(String code) throws Exception {
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String, String> param = new HashMap<>(4);
        param.put("appid", appid);
        param.put("secret", appSecret);
        param.put("js_code", code);
        param.put("grant_type", "authorization_code");

        //获取session_id
        String sr = HttpClientUtil.doGet(url, param);
//        System.out.println(sr);
        // 判断获取的是否有值
        if (sr==null) {
            throw new Exception("获取微信数据失败");
        }
//        //解析相应内容（转换成json对象）
        JSONObject json = JSONObject.parseObject(sr);
//        System.out.println(json);
        String openid = json.getString("openid");
//        System.out.println(openid);
        return openid;
    }

}
