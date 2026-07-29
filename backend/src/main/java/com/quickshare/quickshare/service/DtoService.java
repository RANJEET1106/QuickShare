package com.quickshare.quickshare.service;

import java.util.List;

import com.quickshare.quickshare.model.Item;
import com.quickshare.quickshare.model.RequestItemDto;
import com.quickshare.quickshare.model.ResponseItemDto;

public interface DtoService {
    Item toItem(RequestItemDto requestItemDto);
    ResponseItemDto toDto(List<Item> items);
}
