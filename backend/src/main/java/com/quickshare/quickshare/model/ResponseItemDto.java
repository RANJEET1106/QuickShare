package com.quickshare.quickshare.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseItemDto {
    private List<TextResponseDto> textItemList;
    private List<FileResponseDto> fileItemList;
}
