package com.quickshare.quickshare.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.quickshare.quickshare.model.Item;
import com.quickshare.quickshare.model.SystemStatus;
import com.quickshare.quickshare.repository.ItemRepository;
import com.quickshare.quickshare.repository.SystemStatusRepository;

@Service
@Async
public class SchedularServiceImpl implements SchedularService {

    
    final SystemStatusRepository statusRepository;
    final ItemRepository itemRepository;
    final ItemService itemService;

    SchedularServiceImpl(SystemStatusRepository statusRepository,
            ItemRepository itemRepository,
        ItemService itemService) {
        this.statusRepository = statusRepository;
        this.itemRepository = itemRepository;
        this.itemService = itemService;
    }


    @Scheduled(cron = "0 0 * * * *")
    public void cleanup() {

        SystemStatus state = statusRepository.findById(1).orElseThrow();
        if (state.getLastCleanupTime().isBefore(LocalDateTime.now().minusHours(24))) {

            state.setCleanupRunning(true);
            statusRepository.save(state);

            try {
                List<Item> items=itemRepository.findByCreatedAtBefore(LocalDateTime.now().minusDays(7));
                for (Item item : items) {
                    UUID id=item.getId();
                    itemService.deleteItem(id);
                }

                state.setLastCleanupTime(LocalDateTime.now());

            }catch(RuntimeException e){
                state.setLastCleanupStatus("FAILURE");
            } finally {

                state.setCleanupRunning(false);
                state.setLastCleanupStatus("SUCCESS");

                statusRepository.save(state);
            }
        }

    }
}
