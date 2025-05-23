import { Elysia, t } from "elysia";
import { processTransactionFile } from "../services/transactions";

const uploadBodySchema = t.Object({
  file: t.File({
    format: ["text/csv", "application/json", "application/xml"],
    maxSize: 10 * 1024 * 1024, // 10MB
  }),
});

export const transactionsRoutes = new Elysia().post(
  "/upload",
  async ({ body }) => {
    const { file } = body;
    console.log(
      `File received: Name=${file.name}, Type=${file.type}, Size=${file.size}`,
    );

    await processTransactionFile(file);
    return { message: "File uploaded successfully." };
  },
  {
    body: uploadBodySchema,
    type: "multipart/form-data",
  },
);
