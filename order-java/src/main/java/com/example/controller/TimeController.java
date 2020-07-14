package com.example.controller;

import com.example.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling //定时任务注解
public class TimeController {

    @Autowired
    private ListService listService;
    /**
     * 每天晚上21:50运行
     */
    @Scheduled(cron = "5 0 8,10,12,14,16,18,22 * * ?")
    public void initTimerOne(){
        listService.changeList();
    }

    @Scheduled(cron = "0 35 23 * * ?")
    public void updataStudentPosition(){
        listService.updataPosition();
    }
}
