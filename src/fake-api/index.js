/* eslint-disable import/no-anonymous-default-export */
import { createServer, Model } from "miragejs";

export default function () {
  createServer({
    models: {
      client: Model,
    },

    routes() {
      this.namespace = "api";

      this.get("/clients", (schema) => {
        return schema.clients.all();
      });

      this.post("/clients", (schema, { requestBody }) => {
        const client = JSON.parse(requestBody);

        return schema.clients.create(client);
      });

      this.delete("/clients/:id", (schema, request) => {
        const id = request.params.id;

        schema.clients.findBy({ id }).destroy();
      });

      this.put("/clients/:id", (schema, { requestBody, params }) => {
        const { id } = params;
        const data = JSON.parse(requestBody);

        schema.clients.findBy({ id }).update(data);
      });
    },
  });
}
