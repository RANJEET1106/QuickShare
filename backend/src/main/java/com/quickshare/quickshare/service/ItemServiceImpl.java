package com.quickshare.quickshare.service;

import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

import com.quickshare.quickshare.model.Item;
import com.quickshare.quickshare.repository.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService{

    final ItemRepository itemRepository;
    final DriveService driveService;

    ItemServiceImpl(ItemRepository itemRepository, DriveService driveService) {
        this.itemRepository = itemRepository;
        this.driveService = driveService;
    }

    @Override
    public void deleteItem(UUID id){
        Optional<Item> optionalItem = itemRepository.findById(id);

        // Item not found
        if (optionalItem.isEmpty()) {
            throw new RuntimeException("Item not found");
        }

        Item item = optionalItem.get();

        if ("FILE".equals(item.getType())) {
            driveService.driveDelete(item.getDriveFileId());
        }

        itemRepository.delete(item);
    }
    
}