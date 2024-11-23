package com.wcq.model;

/**
 * 圆形类，用于计算圆的面积和周长。
 */
public class Circle extends Shape {
    private double radius;

    /**
     * 构造函数，初始化圆的半径。
     * @param radius 圆的半径
     */
    public Circle(double radius) {
        if (radius < 0) {
            throw new IllegalArgumentException("半径不能为负数");
        }
        this.radius = radius;
    }

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }

    @Override
    public double calculatePerimeter() {
        return 2 * Math.PI * radius;
    }

    public double getRadius() {
        return radius;
    }
}