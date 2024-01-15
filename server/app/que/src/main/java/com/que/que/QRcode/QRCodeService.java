package com.que.que.QRcode;

import com.google.zxing.qrcode.QRCodeWriter;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class QRCodeService {
    private final QRCodeWriter qrCodeWriter;

    public void createQRCode(Long queueHolderId, int queueHolderSpecificQueueId, String qrCodeText) {

    }
}
