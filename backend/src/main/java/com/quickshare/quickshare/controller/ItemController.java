package com.quickshare.quickshare.controller;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.quickshare.quickshare.model.Item;
import com.quickshare.quickshare.model.RequestItemDto;
import com.quickshare.quickshare.model.ResponseItemDto;
import com.quickshare.quickshare.model.SystemStatus;
import com.quickshare.quickshare.repository.ItemRepository;
import com.quickshare.quickshare.repository.SystemStatusRepository;
import com.quickshare.quickshare.service.DriveService;
import com.quickshare.quickshare.service.DtoService;
import com.quickshare.quickshare.service.ItemService;

@RestController
// @CrossOrigin(origins = {
//     "http://localhost:5173",
//     "https://begin-try-mailman-furnished.trycloudflare.com"
// })

@CrossOrigin(
    originPatterns = {
        "http://localhost:5173"
    }
)
@RequestMapping("/api")
public class ItemController {

    private final ItemRepository itemRepository;

    private final SystemStatusRepository systemStatusRepository;

    private final DtoService dtoService;

    private final DriveService driveService;

    private final ItemService itemService;

    ItemController(ItemRepository itemRepository, SystemStatusRepository systemStatusRepository, DtoService dtoService, DriveService driveService,
        ItemService itemService) {
        this.itemRepository = itemRepository;
        this.systemStatusRepository = systemStatusRepository;
        this.dtoService = dtoService;
        this.driveService = driveService;
        this.itemService=itemService;
    }

    @GetMapping
    public String Test() {
        return "Hello World";
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(RequestItemDto requestItemDto,
            @RequestParam(required = false) MultipartFile file) {

        SystemStatus systemStatus = systemStatusRepository.findById(1).get();
        if (systemStatus.isMaintenance()) {
            return ResponseEntity.status(HttpStatus.SC_SERVICE_UNAVAILABLE)
                    .body("System is under maintenance. Please try again later.");
        }

        Item item = dtoService.toItem(requestItemDto);
        if (item.getSharePin() == null) {
            item.setSharePin(getSharePin());

        }
        System.out.println(item.getType());

        if ("TEXT".equals(item.getType())) {
            itemRepository.save(item);
            return ResponseEntity
                    .status(HttpStatus.SC_CREATED)
                    .body(item.getSharePin());
        }

        if ("FILE".equals(item.getType())) {
            if (file == null || file.isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body("File is required for FILE type");
            }

            String id = driveService.driveUpload(file);
            item.setFileName(file.getOriginalFilename());
            item.setDriveFileId(id);
            itemRepository.save(item);
            return ResponseEntity
                    .status(HttpStatus.SC_CREATED)
                    .body(item.getSharePin());
        }
        return ResponseEntity
                .badRequest()
                .body("Invalid item type");

    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseItemDto> viewFile(@PathVariable("id") String sharePin) {
        List<Item> items = itemRepository.findBySharePin(sharePin);
        if (items == null || items.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.SC_NOT_FOUND)
                    .build();
        }
        ResponseItemDto responseItemDto = dtoService.toDto(items);
        ;
        return ResponseEntity
                .ok(responseItemDto);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<String> deleteFile(@PathVariable("uuid") UUID id) {

        try{
            itemService.deleteItem(id);
            return ResponseEntity
                .ok("Deleted successfully");
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND)
                             .body(e.getMessage());
        }
    }

    @PatchMapping("/{uuid}")
    public ResponseEntity<String> updateText(
            @RequestBody RequestItemDto requestItemDto,
            @PathVariable("uuid") UUID id) {

        Optional<Item> optionalItem = itemRepository.findById(id);

        if (optionalItem.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.SC_NOT_FOUND)
                    .body("Item not found");
        }

        Item item = optionalItem.get();

        if (!"TEXT".equals(item.getType())) {
            return ResponseEntity
                    .status(HttpStatus.SC_BAD_REQUEST)
                    .body("Only TEXT items can be updated");
        }

        item.setTextContent(requestItemDto.getTextContent());
        itemRepository.save(item);

        return ResponseEntity
                .ok("Update successful");
    }

    public String getSharePin() {
        while (true) {
            String pin = String.format("%06d", new Random().nextInt(1_000_000));
            if (!itemRepository.existsBySharePin(pin)) {
                return pin;
            }
        }
    }

}
