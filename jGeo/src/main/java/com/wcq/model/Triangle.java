package com.wcq.model;

/**
 * 三角形类，用于计算三角形的面积和周长。
 */
public class Triangle extends Shape {
    private double sideA;
    private double sideB;
    private double sideC;

    /**
     * 构造函数，初始化三角形的三条边。
     * @param sideA 三角形的第一条边
     * @param sideB 三角形的第二条边
     * @param sideC 三角形的第三条边
     */
    public Triangle(double sideA, double sideB, double sideC) {
        if (sideA < 0 || sideB < 0 || sideC < 0) {
            throw new IllegalArgumentException("边长不能为负数");
        }
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }

    @Override
    public double calculateArea() {
        double s = (sideA + sideB + sideC) / 2;
        return Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
    }

    @Override
    public double calculatePerimeter() {
        return sideA + sideB + sideC;
    }
}