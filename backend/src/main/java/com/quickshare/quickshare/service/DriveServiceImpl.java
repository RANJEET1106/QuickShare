package com.quickshare.quickshare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.client.http.InputStreamContent;
import com.google.api.services.drive.Drive;

@Service
public class DriveServiceImpl implements DriveService {

    private final Drive drive;

    @Value("${google.drive.root.folder.id}")
    private String rootFolderId;

    public DriveServiceImpl(Drive drive){
        this.drive=drive;
    }

    @Override
    public String driveUpload(MultipartFile multipartFile) {
        try {
            // 1. Metadata
            com.google.api.services.drive.model.File metadata =
                    new com.google.api.services.drive.model.File();
            metadata.setName(multipartFile.getOriginalFilename());
            metadata.setParents(List.of(rootFolderId));

            // 2. File content
            InputStreamContent mediaContent =
                    new InputStreamContent(
                            multipartFile.getContentType(),
                            multipartFile.getInputStream()
                    );

            // 3. Upload
            com.google.api.services.drive.model.File uploadedFile =
                    drive.files()
                         .create(metadata, mediaContent)
                         .setFields("id")
                         .execute();

            return uploadedFile.getId();

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to Drive", e);
        }
    }

    @Override
    public String driveDelete(String fileId) {
            try {
                drive.files()
                     .delete(fileId)
                     .execute();
                return "File deleted successfully";
            } catch (Exception e) {
                throw new RuntimeException("Failed to delete file from Drive", e);
            }
        
    }

}
