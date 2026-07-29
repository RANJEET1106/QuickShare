package com.quickshare.quickshare.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestItemDto {
    String sharePin;
    String type;
    String textContent;
}
