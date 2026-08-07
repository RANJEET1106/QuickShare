package com.quickshare.quickshare.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickshare.quickshare.model.Item;
import java.util.List;
import java.time.LocalDateTime;


public interface ItemRepository extends JpaRepository<Item, UUID> {
    List<Item> findBySharePin(String sharePin);
    boolean existsBySharePin(String sharePin);
    List<Item> findByCreatedAtBefore(LocalDateTime createdAt);
}
