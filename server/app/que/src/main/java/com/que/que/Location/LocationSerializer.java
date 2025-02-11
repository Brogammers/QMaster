package com.que.que.Location;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class LocationSerializer extends StdSerializer<Location> {

    public LocationSerializer() {
        this(null);
    }

    public LocationSerializer(Class<Location> t) {
        super(t);
    }

    @Override
    public void serialize(Location value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeNumberField("id", value.getId());
        gen.writeStringField("address", value.getAddress());
        gen.writeStringField("name", value.getPartner().getName() + " - " + value.getName());
        gen.writeNumberField("longtitude", value.getLongitude());
        gen.writeNumberField("latitude", value.getLatitude());
        gen.writeStringField("description", value.getDescription());
        gen.writeStringField("category", value.getPartner().getBusinessCategory().getName());
        gen.writeEndObject();
    }

}
