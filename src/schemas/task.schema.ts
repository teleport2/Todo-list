import { Type, Static } from "@sinclair/typebox";

enum Status {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
}

export default Status;

export const createTaskSchema = Type.Object({
  name: Type.String({ maxLength: 256 }),
  description: Type.String({ maxLength: 1024 }),
  completeTo: Type.Optional(Type.Number()),
});

export const updateTaskSchema = Type.Object({
  name: Type.Optional(Type.String({ maxLength: 256 })),
  description: Type.Optional(Type.String({ maxLength: 1024 })),
  completeTo: Type.Optional(Type.Number()),
  status: Type.Optional(Type.Enum(Status)),
});

const updateTaskURLSchema = Type.Object({
  id: Type.Number(),
});

export type createTaskSchemaType = Static<typeof createTaskSchema>;
export type updateTaskSchemaType = Static<typeof updateTaskSchema>;
export type updateTaskURLSchemaType = Static<typeof updateTaskURLSchema>;
