package com.quickshare.quickshare.service;

import org.springframework.web.multipart.MultipartFile;

public interface DriveService {
    String driveUpload(MultipartFile multipartFile);
    String driveDelete(String fileId);
}
