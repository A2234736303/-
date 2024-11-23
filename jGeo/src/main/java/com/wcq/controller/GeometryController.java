package com.wcq.controller;

import com.wcq.service.GeometryCalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/geometry")
@CrossOrigin(origins = "*")  // 允许来自所有域的请求
public class GeometryController {

    @Autowired
    private GeometryCalculatorService service;

    @GetMapping("/circle/area")
    public ResponseEntity<?> getCircleArea(@RequestParam double radius) {
        if (radius <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "半径必须大于0"));
        }
        return ResponseEntity.ok(service.calculateCircleArea(radius));
    }

    @GetMapping("/circle/perimeter")
    public ResponseEntity<?> getCirclePerimeter(@RequestParam double radius) {
        if (radius <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "半径必须大于0"));
        }
        return ResponseEntity.ok(service.calculateCirclePerimeter(radius));
    }

    @GetMapping("/rectangle/area")
    public ResponseEntity<?> getRectangleArea(@RequestParam double length, @RequestParam double width) {
        if (length <= 0 || width <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "长和宽必须大于0"));
        }
        return ResponseEntity.ok(service.calculateRectangleArea(length, width));
    }

    @GetMapping("/rectangle/perimeter")
    public ResponseEntity<?> getRectanglePerimeter(@RequestParam double length, @RequestParam double width) {
        if (length <= 0 || width <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "长和宽必须大于0"));
        }
        return ResponseEntity.ok(service.calculateRectanglePerimeter(length, width));
    }

    @GetMapping("/triangle/area")
    public ResponseEntity<?> getTriangleArea(@RequestParam double sideA, @RequestParam double sideB, @RequestParam double sideC) {
        if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "三角形的边长必须大于0"));
        }
        if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
            return ResponseEntity.badRequest().body(Map.of("message", "输入的边长不能构成一个有效的三角形"));
        }
        return ResponseEntity.ok(service.calculateTriangleArea(sideA, sideB, sideC));
    }

    @GetMapping("/triangle/perimeter")
    public ResponseEntity<?> getTrianglePerimeter(@RequestParam double sideA, @RequestParam double sideB, @RequestParam double sideC) {
        if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "三角形的边长必须大于0"));
        }
        if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
            return ResponseEntity.badRequest().body(Map.of("message", "输入的边长不能构成一个有效的三角形"));
        }
        return ResponseEntity.ok(service.calculateTrianglePerimeter(sideA, sideB, sideC));
    }
}
