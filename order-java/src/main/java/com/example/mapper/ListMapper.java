package com.example.mapper;

import com.example.pojo.OrderList;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Date;
import java.util.List;
import java.util.Map;


@Mapper
public interface ListMapper {
    OrderList findListByListId(@Param("listId") int listId);
    OrderList findList(@Param("dateTime") Date date, @Param("times") String times, @Param("seat_id") String seatId);
    OrderList findListForDeserve(@Param("dateTime") Date date, @Param("times") String times,
                                 @Param("seat_id") String seatId,@Param("open_id") String openId);
    int addList(@Param("orderList") OrderList orderList);
    List<Map> getSeatId(@Param("schId") String schId, @Param("date") String date, @Param("time") String time);
    String[] findListString(@Param("seatId") String seatId,@Param("date") Date date);

    int deserve(@Param("dateTime") Date date,@Param("times") String time,
                @Param("seat_id") String seatId,@Param("open_id") String openId);

    int updateListOrdering(@Param("date") String date,@Param("times") String times);
    List<OrderList> findListOrdering(@Param("date") String date);

    List<OrderList> findListByOpenId(@Param("open_id") String openId);

    List<OrderList> findReservedById(@Param("open_id") String openId);

    int updateListBeginSign(@Param("listId") int listId);
    int updateListEndSign(@Param("listId") int listId);
}
