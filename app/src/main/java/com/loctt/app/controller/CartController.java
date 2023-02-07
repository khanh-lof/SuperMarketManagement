/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.loctt.app.controller;

import com.loctt.app.model.CartObject;
import com.loctt.app.model.ProductDetails;
import com.loctt.app.service.impl.CartService;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpSession;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    
    @PostMapping("/api/cart/update")
    public ResponseEntity updateProductInCart(@RequestBody JSONObject object, Model model, HttpSession session) {
        String productID = object.getAsString("productID");
        HashMap<String, String> response = new HashMap<>();
        int quantityInCart = Integer.parseInt(object.getAsString("quantityInCart"));
        CartObject cart = (CartObject) session.getAttribute("CART");

        if (cart != null) {
            cartService.updateItemInCart(productID, quantityInCart, cart);
            session.setAttribute("CART", cart);
            response.put("productID", productID);
            Map<String, Integer> items = cart.getItems();
            if (items != null) {
                for (Map.Entry<String, Integer> entry : items.entrySet()) {
                    System.out.println("Key : " + entry.getKey() + " Value : " + entry.getValue());
                }
            }
        }
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/api/cart/remove")
    public ResponseEntity removeProductInCart(@RequestBody JSONObject object, Model model, HttpSession session) {
        String productID = object.getAsString("productID");
        HashMap<String, String> response = new HashMap<>();
        CartObject cart = (CartObject) session.getAttribute("CART");

        if (cart != null) {
            cartService.removeItemInCart(productID, cart);
            session.setAttribute("CART", cart);
            response.put("productID", productID);
            response.put("cartSize", String.valueOf(cartService.getCartSize(cart)));
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/api/cart/show/{pageNum}")
    public ResponseEntity showCart(@PathVariable(value = "pageNum") Integer pageNum, Model model, HttpSession session) {
        CartObject cart = (CartObject) session.getAttribute("CART");
        int maxResult = 6;
        int fromItemIndex = (pageNum - 1) * maxResult + 1;
        int maxItemIndex = fromItemIndex + maxResult - 1;
        if (cart != null && cart.getItems() != null) {
            return ResponseEntity.ok().body(cartService.showCart(cart, fromItemIndex, maxItemIndex));
        } else {
            return ResponseEntity.ok().body(null);
        }
    }
}