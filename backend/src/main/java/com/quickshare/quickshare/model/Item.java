package com.quickshare.quickshare.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "items", indexes = {
        @Index(name = "idx_items_share_pin", columnList = "share_pin")
})
@Builder
public class Item {
    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(name = "share_pin", length = 6, nullable = false)
    private String sharePin;

    // @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private String type;

    // FILE fields
    @Column(name = "drive_file_id")
    private String driveFileId;

    @Column(name = "file_name")
    private String fileName;

    // TEXT field
    @Column(name = "text_content", columnDefinition = "TEXT")
    private String textContent;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.id = UUID.randomUUID();
        this.createdAt = LocalDateTime.now();
    }
}
