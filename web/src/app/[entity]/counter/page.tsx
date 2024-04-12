"use client"

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Entity from '../page';


type Ticket = {
  id: string;
  content: string;
};

type Tickets = {
  [key: string]: Ticket;
};

type Column = {
  id: string;
  title: string;
  ticketIds: string[];
}

type Columns = {
  [key: string]: Column;
}

// Sample data
const initialData = {
  tickets: {
    'ticket-1': { id: 'ticket-1', content: 'Ticket 1' },
    'ticket-2': { id: 'ticket-2', content: 'Ticket 2' },
    // Add more tickets as needed
  } as Tickets,
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Queue',
      ticketIds: ['ticket-1', 'ticket-2'], // Add the ids of the tickets here
    },
    // Add more columns as needed
  } as Columns,
  // Column order if you have multiple columns
  columnOrder: ['column-1'],
};

export default function CounterView() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result: any) => {
    // Implement drag and drop functionality
  };

  return (
    <Entity>

      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tickets = column.ticketIds.map((ticketId: string | number) => data.tickets[ticketId]);

          return (
            <div key={column.id}>
              <h2>{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tickets.map((ticket: { id: Key | null | undefined; content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: number) => (
                      <Draggable key={ticket.id} draggableId={String(ticket.id)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {ticket.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </Entity>
  );
}
