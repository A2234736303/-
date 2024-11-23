package com.wcq.model;

/**
 * 抽象类，定义几何形状的基本接口。
 */
public abstract class Shape {
    /**
     * 计算面积的抽象方法。
     * @return 面积
     */
    public abstract double calculateArea();

    /**
     * 计算周长的抽象方法。
     * @return 周长
     */
    public abstract double calculatePerimeter();
}