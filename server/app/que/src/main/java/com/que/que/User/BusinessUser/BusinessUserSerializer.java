package com.que.que.User.BusinessUser;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class BusinessUserSerializer extends StdSerializer<BusinessUser> {

    public BusinessUserSerializer() {
        this(null);
    }

    public BusinessUserSerializer(Class<BusinessUser> t) {
        super(t);
    }

    @Override
    public void serialize(
            BusinessUser value, JsonGenerator jgen, SerializerProvider provider) throws IOException {

        jgen.writeStartObject();
        jgen.writeStringField("first-name", value.getFirstName());
        jgen.writeStringField("last-name", value.getLastName());
        jgen.writeStringField("username", value.getUsername());

    }
}
