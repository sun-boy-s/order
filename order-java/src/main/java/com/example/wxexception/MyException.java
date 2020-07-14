package com.example.wxexception;

public class MyException extends Exception {
    private int code;

    public MyException(String message, int code) {
        super(message);
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
