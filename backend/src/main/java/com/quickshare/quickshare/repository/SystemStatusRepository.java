package com.quickshare.quickshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickshare.quickshare.model.SystemStatus;

@Repository
public interface SystemStatusRepository extends JpaRepository<SystemStatus, Integer> {

}
