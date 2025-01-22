package com.que.que.Store.Purchase;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class PurchaseSerializer extends StdSerializer<Purchase> {
    public PurchaseSerializer() {
        this(null);
    }

    public PurchaseSerializer(Class<Purchase> t) {
        super(t);
    }

    @Override
    public void serialize(Purchase value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeEndObject();
    }
}
