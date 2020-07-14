package com.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.pojo.Library;
import com.example.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/order1.0/library")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    @RequestMapping(value = "/getLibBySchId",method = RequestMethod.POST)
    @ResponseBody
    public Library getLib(@RequestBody String schId){
        JSONObject id = JSONObject.parseObject(schId);
        String sch_id = id.getString("schId");
        return libraryService.getLibIdBySchId(sch_id);
    }

}
