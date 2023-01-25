import { prisma } from "../db";
import Status, {
  createTaskSchemaType,
  updateTaskSchemaType,
  updateTaskURLSchemaType,
} from "../schemas/task.schema";
import { FastifyReply, FastifyRequest } from "fastify";

export const getTasks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const tasks = await prisma.task.findMany();
  reply.send(tasks);
};

export const createTask = async (
  request: FastifyRequest<{ Body: createTaskSchemaType }>,
  reply: FastifyReply
) => {
  const { name, description, completeTo } = request.body;
  const completeToDB: Date | null = completeTo === undefined ? null : new Date(completeTo);

  await prisma.task.create({
    data: {
      name,
      description,
      completeTo: completeToDB,
    },
  });

  reply.status(204).send();
};

export const updateTask = async (
  request: FastifyRequest<{
    Body: updateTaskSchemaType;
    Params: updateTaskURLSchemaType;
  }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const { name, description, completeTo, status } = request.body;
  const completeToDB: Date | undefined =
    completeTo === undefined ? undefined : new Date(completeTo);

  const idConv: number = Number(id);
  if (Number.isNaN(idConv)) {
    reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "ID must be int",
    });
    return;
  }

  await prisma.task.update({
    where: { id: idConv },

    data: {
      name,
      description,
      completeTo: completeToDB,
      status,
    },
  });

  reply.status(204).send();
};
