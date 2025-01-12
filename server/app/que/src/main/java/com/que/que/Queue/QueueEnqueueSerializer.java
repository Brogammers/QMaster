package com.que.que.Queue;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class QueueEnqueueSerializer extends StdSerializer<QueueEnqueue> {

  public QueueEnqueueSerializer() {
    this(null);
  }

  public QueueEnqueueSerializer(Class<QueueEnqueue> t) {
    super(t);
  }

  @Override
  public void serialize(
      QueueEnqueue value, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeNumberField("id", value.getId());
    jgen.writeStringField("name", value.getQueue().getName());
    jgen.writeObjectField("time", value.getActionDate());
    jgen.writeStringField("location", value.getQueue().getStore().getLocation());
    jgen.writeStringField("notification", "You queued successfully!");
    jgen.writeEndObject();
  }
}