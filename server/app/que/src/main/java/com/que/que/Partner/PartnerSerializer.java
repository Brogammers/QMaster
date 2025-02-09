package com.que.que.Partner;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class PartnerSerializer extends StdSerializer<Partner> {
    public PartnerSerializer() {
        this(null);
    }

    public PartnerSerializer(Class<Partner> t) {
        super(t);
    }

    @Override
    public void serialize(Partner partner, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", partner.getId());
        jsonGenerator.writeStringField("name", partner.getName());
        jsonGenerator.writeNumberField("queueId", partner.getQueueId());
        jsonGenerator.writeObjectField("locations", partner.getLocations());
        jsonGenerator.writeStringField("businessCategory", partner.getBusinessCategory().getName());
        jsonGenerator.writeBooleanField("status", true);
        jsonGenerator.writeStringField("createdAt", partner.getCreatedAt().toString());
        jsonGenerator.writeEndObject();
    }
}