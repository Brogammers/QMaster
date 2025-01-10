package com.que.que.QRcode;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(path = "api/v1/qr")
@AllArgsConstructor
public class QRCodeController {

    private final QRCodeService qrCodeService;

    @GetMapping()
    public ResponseEntity<Object> requestQRCode(@Param("queueName") String queueName) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        String file = qrCodeService.getQRCode(queueName);

        if (file == null) {
            body.put("message", "QR Code not found");
            statusCode = HttpStatusCode.valueOf(404);
            return new ResponseEntity<Object>(body, statusCode);
        }

        body.put("message", "QR Code found");
        body.put("file", file);

        return new ResponseEntity<Object>(body, statusCode);
    }

}
