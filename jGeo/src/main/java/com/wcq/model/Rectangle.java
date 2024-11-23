package com.wcq.model;

/**
 * 矩形类，用于计算矩形的面积和周长。
 */
public class Rectangle extends Shape {
    private double length;
    private double width;

    /**
     * 构造函数，初始化矩形的长度和宽度。
     * @param length 矩形的长度
     * @param width 矩形的宽度
     */
    public Rectangle(double length, double width) {
        if (length < 0 || width < 0) {
            throw new IllegalArgumentException("长度和宽度不能为负数");
        }
        this.length = length;
        this.width = width;
    }

    @Override
    public double calculateArea() {
        return length * width;
    }

    @Override
    public double calculatePerimeter() {
        return 2 * (length + width);
    }
}