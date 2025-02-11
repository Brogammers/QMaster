package com.que.que.Location.OpeningHours;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class OpeningHoursSerializer extends StdSerializer<OpeningHours> {

    public OpeningHoursSerializer() {
        this(null);
    }

    public OpeningHoursSerializer(Class<OpeningHours> t) {
        super(t);
    }

    @Override
    public void serialize(OpeningHours value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("day", value.getDay());
        gen.writeStringField("open", value.getOpenTime());
        gen.writeStringField("close", value.getCloseTime());
        gen.writeBooleanField("isOpen", value.isOpen());
        gen.writeEndObject();
    }

}
