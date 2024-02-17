package com.que.que.Queue;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class QueueDeletionSerializer extends StdSerializer<QueueDeletion> {

  public QueueDeletionSerializer() {
    this(null);
  }

  public QueueDeletionSerializer(Class<QueueDeletion> t) {
    super(t);
  }

  @Override
  public void serialize(
      QueueDeletion value, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeNumberField("id", value.getId());
    jgen.writeStringField("name", value.getQueue().getName());
    jgen.writeObjectField("time", value.getActionDate());
    jgen.writeStringField("notification", "You created a queue successfully!");
    jgen.writeEndObject();
  }
}