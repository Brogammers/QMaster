package com.que.que.Queue;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class QueueDequeueSerializer extends StdSerializer<QueueDequeue> {

  public QueueDequeueSerializer() {
    this(null);
  }

  public QueueDequeueSerializer(Class<QueueDequeue> t) {
    super(t);
  }

  @Override
  public void serialize(
      QueueDequeue value, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeNumberField("id", value.getId());
    jgen.writeStringField("name", value.getQueue().getName());
    jgen.writeObjectField("time", value.getActionDate());
    jgen.writeStringField("notification", "You were dequeued successfully!");
    jgen.writeEndObject();
  }
}