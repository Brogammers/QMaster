package com.que.que.QRcode;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

@Service
@Configuration
public class QRCodeService {
    public void createQRCode(Long queueHolderId, int queueHolderSpecificQueueId, String qrCodeText) {
        QRCodeWriter writer = new QRCodeWriter();
    }

    public void QRCodeGenerator(Long queueHolderId, int queueHoldeRSpecificQueueId, String qrCodeText) {
        BitMatrix bitMatrix = qrcodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, 300, 150);
        BufferedImage img = MatrixToImageWriter.toBufferedImage(bitMatrix);
        File output = new File(String.format("resources/static/QRS/%d-%d.png", queueHolderId, queueHoldeRSpecificQueueId));
        ImageIO.write(img, "png", output);
    }
}
