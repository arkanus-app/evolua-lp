import { initClient } from "@ts-rest/core";
import { appContract } from "./contract";

export const api = initClient(appContract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  baseHeaders: {},
  credentials: "include",
});

export function getApiErrorMessage(response: { body: unknown; status: number }) {
  if (
    response.body &&
    typeof response.body === "object" &&
    "message" in response.body &&
    typeof response.body.message === "string"
  ) {
    return response.body.message;
  }

  return `API request failed with status ${response.status}`;
}
