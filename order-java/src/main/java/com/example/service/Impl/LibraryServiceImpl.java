package com.example.service.Impl;

import com.example.mapper.LibraryMapper;
import com.example.pojo.Library;
import com.example.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class LibraryServiceImpl implements LibraryService {

    @Autowired
    private LibraryMapper libraryMapper;

    @Override
    public Library getLibIdBySchId(String schId) {
        return libraryMapper.findLibBySchId(schId);
    }
}
