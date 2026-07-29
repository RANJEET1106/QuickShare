package com.quickshare.quickshare.model;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileResponseDto {
    private UUID  id;
    private String fileName;
    private String fileLink;
}
