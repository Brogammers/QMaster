package com.que.que.User.BusinessUser;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class BusinessCategorySerializer extends StdSerializer<BusinessCategory> {

    public BusinessCategorySerializer() {
        this(null);
    }

    public BusinessCategorySerializer(Class<BusinessCategory> t) {
        super(t);
    }

    @Override
    public void serialize(BusinessCategory value, JsonGenerator gen, SerializerProvider serializers)
            throws IOException {
        gen.writeStartObject();
        gen.writeNumberField("id", value.getId());
        gen.writeStringField("name", value.getName());
        gen.writeStringField("description", value.getDescription());
        gen.writeNumberField("partnersCount", value.getBusinessUsers().size());
        gen.writeStringField("status", value.getStatus());
        gen.writeEndObject();
    }

}
