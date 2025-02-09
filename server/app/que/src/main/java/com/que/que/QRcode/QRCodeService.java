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
import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;
import com.que.que.Queue.QueueRepository;
import com.que.que.Queue.Queues;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QRCodeService {

    private final QueueRepository queueRepository;
    private final PartnerRepository partnerRepository;
    private final String QUEUE_QR_CODE_IMAGE_PATH = "src/main/webapp/WEB-INF/QRS/%d/%d.png";
    private final String PARTNER_QR_CODE_IMAGE_PATH = "src/main/webapp/WEB-INF/QRS/%d/partner.png";

    public void createQRCode(Long partnerId, String qrCodeText) throws IOException, WriterException {
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix bitMatrix = writer.encode(qrCodeText, BarcodeFormat.QR_CODE, 300, 150);
        BufferedImage img = MatrixToImageWriter.toBufferedImage(bitMatrix);
        File output = new File(String.format(PARTNER_QR_CODE_IMAGE_PATH, partnerId));
        output.getParentFile().mkdirs();
        output.createNewFile();
        ImageIO.write(img, "png", output);
    }

    public void createQRCode(Long queueHolderId, int queueHolderSpecificQueueId, String qrCodeText)
            throws IOException, WriterException {
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix bitMatrix = writer.encode(qrCodeText, BarcodeFormat.QR_CODE, 300, 150);
        BufferedImage img = MatrixToImageWriter.toBufferedImage(bitMatrix);
        File output = new File(
                String.format(
                        QUEUE_QR_CODE_IMAGE_PATH, queueHolderId,
                        queueHolderSpecificQueueId));
        output.getParentFile().mkdirs();
        output.createNewFile();
        ImageIO.write(img, "png", output);
    }

    public File getQueueQRCode(String queueName) {
        Queues queue = queueRepository.findByName(queueName)
                .orElse(null);

        if (queue == null) {
            return null;
        }

        File file = new File(
                String.format(
                        QUEUE_QR_CODE_IMAGE_PATH, queue.getPartner().getId(),
                        queue.getSpecificSlot()));

        if (!file.exists()) {
            return null;
        }

        return file;
    }

    public File getPartnerQRCode(String partnerName) {
        Partner partner = partnerRepository.findByName(partnerName)
                .orElse(null);

        if (partner == null) {
            return null;
        }

        File file = new File(
                String.format(
                        PARTNER_QR_CODE_IMAGE_PATH, partner.getId()));

        if (!file.exists()) {
            return null;
        }

        return file;
    }
}
