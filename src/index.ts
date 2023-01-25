import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import todoRouter from "./routes/task.router";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

// register routes
fastify.register(todoRouter);

fastify.listen({ port: 3000 }, (err: Error | null, address: string) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
