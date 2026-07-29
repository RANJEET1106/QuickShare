package com.quickshare.quickshare.model;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TextResponseDto {
    private UUID id;
    private String textContent;
}
