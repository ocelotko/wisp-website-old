import { Handlers } from "$fresh/server.ts";
import { proxyApi } from "../../../utils/proxy.ts";

export const handler: Handlers = {
  async GET(req) {
    return await proxyApi(req, "/api/v1/blocks");
  },
};
