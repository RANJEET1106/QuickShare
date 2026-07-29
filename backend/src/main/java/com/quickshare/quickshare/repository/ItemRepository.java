package com.quickshare.quickshare.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickshare.quickshare.model.Item;
import java.util.List;


@Repository
public interface ItemRepository extends JpaRepository<Item, UUID> {
    List<Item> findBySharePin(String sharePin);
    boolean existsBySharePin(String sharePin);
}
