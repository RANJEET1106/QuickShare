package com.quickshare.quickshare.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "system_state")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class SystemStatus {
    @Id
    private Integer id; // always = 1

    @Column(nullable = false)
    private boolean maintenance;
}
