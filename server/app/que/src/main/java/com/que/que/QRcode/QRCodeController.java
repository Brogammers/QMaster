package com.que.que.QRcode;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/qr")
@AllArgsConstructor
public class QRCodeController {

    private final QRCodeService qrCodeService;

    @GetMapping("/queue")
    public ResponseEntity<Object> requestQueueQRCode(@RequestParam("queueName") String queueName) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        File file = qrCodeService.getQueueQRCode(queueName);

        if (file == null) {
            body.put("message", "QR Code not found");
            statusCode = HttpStatusCode.valueOf(404);
            return new ResponseEntity<Object>(body, statusCode);
        }

        try {
            byte[] imageBytes = java.nio.file.Files.readAllBytes(file.toPath());
            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(imageBytes);
        } catch (java.io.IOException e) {
            body.put("message", "Error reading QR Code file");
            statusCode = HttpStatusCode.valueOf(500);
            return new ResponseEntity<Object>(body, statusCode);
        }
    }

    @GetMapping("/partner")
    public ResponseEntity<Object> requestPartnerQRCode(@RequestParam("partnerName") String partnerName) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        File file = qrCodeService.getPartnerQRCode(partnerName);

        if (file == null) {
            body.put("message", "QR Code not found");
            statusCode = HttpStatusCode.valueOf(404);
            return new ResponseEntity<Object>(body, statusCode);
        }

        try {
            byte[] imageBytes = java.nio.file.Files.readAllBytes(file.toPath());
            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(imageBytes);
        } catch (java.io.IOException e) {
            body.put("message", "Error reading QR Code file");
            statusCode = HttpStatusCode.valueOf(500);
            return new ResponseEntity<Object>(body, statusCode);
        }
    }

}
