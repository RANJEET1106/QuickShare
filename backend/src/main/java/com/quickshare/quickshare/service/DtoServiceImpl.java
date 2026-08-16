package com.quickshare.quickshare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.quickshare.quickshare.model.FileResponseDto;
import com.quickshare.quickshare.model.Item;
import com.quickshare.quickshare.model.RequestItemDto;
import com.quickshare.quickshare.model.ResponseItemDto;
import com.quickshare.quickshare.model.TextResponseDto;

@Service
public class DtoServiceImpl implements DtoService {

    

    @Override
    public Item toItem(RequestItemDto requestItemDto) {
        Item item=new Item();
        item.setSharePin(requestItemDto.getSharePin());
        item.setType(requestItemDto.getType());
        item.setTextContent(requestItemDto.getTextContent());
        return item;
    }

    @Override
    public ResponseItemDto toDto(List<Item> items) {

        List<TextResponseDto> textResponseDtos = items.stream()
        .filter(item-> "TEXT".equals(item.getType()))
        .map(item->{
            TextResponseDto textResponseDto= new TextResponseDto();
            textResponseDto.setId(item.getId());
            textResponseDto.setTextContent(item.getTextContent());
            return textResponseDto;
        }).toList();

        List<FileResponseDto> fileResponseDtos = items.stream()
        .filter(item-> "FILE".equals(item.getType()))
        .map(item->{
            String link="https://drive.google.com/file/d/"+item.getDriveFileId()+"/view";
            String downloadLink="https://drive.google.com/uc?export=download&id="+item.getDriveFileId();
            FileResponseDto fileResponseDto= new FileResponseDto();
            fileResponseDto.setId(item.getId());
            fileResponseDto.setFileName(item.getFileName());
            fileResponseDto.setFileLink(link);
            fileResponseDto.setFileDownload(downloadLink);
            return fileResponseDto;
        }).toList();

        ResponseItemDto responseItemDto = new ResponseItemDto();
        responseItemDto.setTextItemList(textResponseDtos);
        responseItemDto.setFileItemList(fileResponseDtos);
        return responseItemDto;

    }

}
