package com.que.que.User.BusinessUser;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
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
        jgen.writeNumberField("id", value.getId());
        jgen.writeStringField("username", value.getUsername());
        jgen.writeObjectField("businessCategory", value.getPartner().getBusinessCategory());
        jgen.writeObjectField("locations", value.getPartner().getLocations());
        jgen.writeObjectField("createdAt", value.getDateOfRegistration());
        jgen.writeBooleanField("status",
                value.isEnabled() && value.isAccountNonLocked() && value.isAccountNonExpired());
        jgen.writeEndObject();
    }
}
