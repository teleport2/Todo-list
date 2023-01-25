import { FastifyInstance } from "fastify";
import {
  getTasks,
  createTask,
  updateTask,
} from "../controllers/task.controller";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";

const todoRouter = async (fastify: FastifyInstance) => {
  fastify.get("/", getTasks);
  fastify.post(
    "/",
    {
      schema: {
        body: createTaskSchema,
      },
    },
    createTask
  );
  fastify.put(
    "/:id/",
    {
      schema: {
        body: updateTaskSchema,
      },
    },
    updateTask
  );
};

export default todoRouter;
