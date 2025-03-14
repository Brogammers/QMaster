package com.que.que.Queue;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.que.que.Statistics.ExponentialDistribution.ExponentialDistribution;

public class QueuesSerialier extends StdSerializer<Queues> {

  public QueuesSerialier() {
    this(null);
  }

  public QueuesSerialier(Class<Queues> t) {
    super(t);
  }

  @Override
  public void serialize(Queues value, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {
    jgen.writeStartObject();
    jgen.writeNumberField("id", value.getId());
    jgen.writeStringField("name", value.getName());
    jgen.writeNumberField("people", value.getPeopleInQueue());
    jgen.writeNumberField("averageServiceTime", ExponentialDistribution.mean(2.0 * 1.0 / value.getAverageServiceTime()));
    jgen.writeNumberField("maxQueueSize", value.getMaxQueueSize());
    jgen.writeBooleanField("isActive", value.isActive());
    jgen.writeNumberField("locationId", value.getLocation().getId());
    jgen.writeNumberField("counters", value.getQueueCounters().size());
    jgen.writeEndObject();
  }

}
