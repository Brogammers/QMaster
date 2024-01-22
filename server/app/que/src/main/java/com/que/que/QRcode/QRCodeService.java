package com.que.que.QRcode;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

@Service
@Configuration
public class QRCodeService {
    public void createQRCode(Long queueHolderId, int queueHolderSpecificQueueId, String qrCodeText)
            throws IOException, WriterException {
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix bitMatrix = writer.encode(qrCodeText, BarcodeFormat.QR_CODE, 300, 150);
        BufferedImage img = MatrixToImageWriter.toBufferedImage(bitMatrix);
        File output = new File(
                String.format("server/app/que/src/main/resources/static/QRS/%d-%d.png", queueHolderId,
                        queueHolderSpecificQueueId));
        ImageIO.write(img, "png", output);
    }
}
