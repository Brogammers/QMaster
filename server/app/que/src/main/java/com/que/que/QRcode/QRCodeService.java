package com.que.que.QRcode;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import com.google.zxing.qrcode.QRCodeWriter;

@Service
@Configuration
public class QRCodeService {
    public void createQRCode(Long queueHolderId, int queueHolderSpecificQueueId, String qrCodeText) {
        QRCodeWriter writer = new QRCodeWriter();
    }
}
