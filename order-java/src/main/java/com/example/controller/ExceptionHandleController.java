package com.example.controller;

import com.example.wxexception.MyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ExceptionHandleController {
    @ExceptionHandler(MyException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public Map<String,Object> handleStudent(MyException se){
        Map<String,Object> map = new HashMap<>();
        map.put("message",se.getMessage());
        map.put("code",se.getCode());
        return map;
    }
}
