package com.que.que.User;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import lombok.val;

public class AppUserSerializer extends StdSerializer<AppUser> {

  public AppUserSerializer() {
    this(null);
  }

  public AppUserSerializer(Class<AppUser> t) {
    super(t);
  }

  @Override
  public void serialize(
      AppUser value, JsonGenerator jgen, SerializerProvider provider) throws IOException {

    jgen.writeStartObject();
    jgen.writeStringField("first-name", value.getFirstName());
    jgen.writeStringField("last-name", value.getLastName());
    jgen.writeStringField("username", value.getUsername());

  }

}
