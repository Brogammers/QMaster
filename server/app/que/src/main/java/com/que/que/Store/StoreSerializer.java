package com.que.que.Store;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class StoreSerializer extends StdSerializer<Store> {
    public StoreSerializer() {
        this(null);
    }

    public StoreSerializer(Class<Store> t) {
        super(t);
    }

    @Override
    public void serialize(Store store, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", store.getId());
        jsonGenerator.writeStringField("name",
                store.getLocation().getPartner().getName() + " - " + store.getLocation().getName());
        jsonGenerator.writeStringField("category", store.getLocation().getPartner().getBusinessCategory().getName());
        jsonGenerator.writeStringField("storeStatus", store.getLocation().getStoreStatus().toString());
        jsonGenerator.writeNumberField("productsCount", store.getProducts().size());
        jsonGenerator.writeNumberField("monthlyRevenue", 100);
        jsonGenerator.writeEndObject();
    }
}
