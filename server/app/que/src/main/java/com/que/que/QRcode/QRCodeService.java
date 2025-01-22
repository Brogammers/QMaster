package com.que.que.QRcode;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.que.que.Queue.QueueRepository;
import com.que.que.Queue.Queues;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QRCodeService {

    private final QueueRepository queueRepository;

    private final String QR_CODE_IMAGE_PATH = "src/main/webapp/WEB-INF/QRS/%d-%d.png";

    public void createQRCode(Long queueHolderId, int queueHolderSpecificQueueId, String qrCodeText)
            throws IOException, WriterException {
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix bitMatrix = writer.encode(qrCodeText, BarcodeFormat.QR_CODE, 300, 150);
        BufferedImage img = MatrixToImageWriter.toBufferedImage(bitMatrix);
        File output = new File(
                String.format(
                        QR_CODE_IMAGE_PATH, queueHolderId,
                        queueHolderSpecificQueueId));
        ImageIO.write(img, "png", output);
    }

    public String getQRCode(String queueName) {
        Queues queue = queueRepository.findByName(queueName)
                .orElse(null);

        if (queue == null) {
            return null;
        }

        File file = new File(
                String.format(
                        QR_CODE_IMAGE_PATH, queue.getCreator().getId(),
                        queue.getSpecificSlot()));

        if (!file.exists()) {
            return null;
        }

        return String.format(
                "http://localhost:8080/images/QRS/%d-%d.png", queue.getCreator().getId(),
                queue.getSpecificSlot());

    }
}
