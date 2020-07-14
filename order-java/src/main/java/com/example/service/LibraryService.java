package com.example.service;

import com.example.pojo.Library;
import org.springframework.stereotype.Service;

@Service
public interface LibraryService {
    Library getLibIdBySchId(String schId);
}
