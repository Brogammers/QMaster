package com.que.que.User.AdminUser;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class AdminUserSerializer extends StdSerializer<AdminUser> {
    public AdminUserSerializer() {
        this(null);
    }

    public AdminUserSerializer(Class<AdminUser> t) {
        super(t);
    }

    @Override
    public void serialize(AdminUser value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeNumberField("id", value.getId());
        gen.writeStringField("firstName", value.getFirstName());
        gen.writeStringField("lastName", value.getLastName());
        gen.writeStringField("email", value.getEmail());
        gen.writeStringField("phoneCode", value.getPhoneCode());
        gen.writeStringField("phoneNumber", value.getPhoneNumber());
        gen.writeStringField("location", value.getLocation());
        gen.writeBooleanField("enabled", value.isEnabled());
        gen.writeStringField("userRole", value.getUserRole().toString());
        gen.writeEndObject();
    }

}
