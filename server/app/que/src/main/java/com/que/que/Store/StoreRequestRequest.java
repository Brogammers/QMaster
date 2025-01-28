package com.que.que.Store;

import java.io.File;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
class DocumentRequest {
    private String type;
    private Optional<File> file;
}

@AllArgsConstructor
@Getter
public class StoreRequestRequest {
    private long locationId;
    private DocumentRequest[] documents;
}
