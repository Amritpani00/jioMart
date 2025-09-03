package com.example.jiomart.controller;

import com.example.jiomart.model.Order;
import com.example.jiomart.security.UserDetailsImpl;
import com.example.jiomart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Order createOrder(@RequestBody Order order) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        order.setUserId(userDetails.getId());
        order.setOrderDate(new Date());
        return orderService.createOrder(order);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Order> getOrdersForUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return orderService.getOrdersForUser(userDetails.getId());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return orderService.getOrderById(id)
                .map(order -> {
                    // Ensure the user can only access their own orders unless they are an admin
                    if (order.getUserId().equals(userDetails.getId()) || userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                        return ResponseEntity.ok(order);
                    } else {
                        return ResponseEntity.status(403).<Order>build(); // Forbidden
                    }
                })
                .orElse(ResponseEntity.notFound().<Order>build());
    }
}
