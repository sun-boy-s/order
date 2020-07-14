package com.example.mapper;

import com.example.pojo.Library;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LibraryMapper {
    Library findLibBySchId(@Param("sch_id") String schId);
}
