package com.wcq.service;

import com.wcq.model.Circle;
import com.wcq.model.Rectangle;
import com.wcq.model.Triangle;
import org.springframework.stereotype.Service;

@Service
public class GeometryCalculatorService {

    public double calculateCircleArea(double radius) {
        return new Circle(radius).calculateArea();
    }

    public double calculateCirclePerimeter(double radius) {
        return new Circle(radius).calculatePerimeter();
    }

    public double calculateRectangleArea(double length, double width) {
        return new Rectangle(length, width).calculateArea();
    }

    public double calculateRectanglePerimeter(double length, double width) {
        return new Rectangle(length, width).calculatePerimeter();
    }

    public double calculateTriangleArea(double sideA, double sideB, double sideC) {
        return new Triangle(sideA, sideB, sideC).calculateArea();
    }

    public double calculateTrianglePerimeter(double sideA, double sideB, double sideC) {
        return new Triangle(sideA, sideB, sideC).calculatePerimeter();
    }
}
