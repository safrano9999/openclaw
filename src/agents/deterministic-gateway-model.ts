import fs from "node:fs";
import { fileURLToPath } from "node:url";

const repliesPath = fileURLToPath(new URL("./deterministic-gateway-replies.txt", import.meta.url));
const [gatewayReply, noteReadyReply, noteMissingReply] = fs
  .readFileSync(repliesPath, "utf8")
  .trimEnd()
  .split(/\r?\n/u);
if (!gatewayReply || !noteReadyReply || !noteMissingReply)
  throw new Error(`Invalid deterministic replies file: ${repliesPath}`);

export const DETERMINISTIC_GATEWAY_PROVIDER = "dummy";
export const DETERMINISTIC_GATEWAY_MODEL = "dummy";
export const DETERMINISTIC_GATEWAY_MODEL_REF = `${DETERMINISTIC_GATEWAY_PROVIDER}/${DETERMINISTIC_GATEWAY_MODEL}`;
export const DETERMINISTIC_NOTE_MODEL = "note";
export const DETERMINISTIC_NOTE_MODEL_REF = `${DETERMINISTIC_GATEWAY_PROVIDER}/${DETERMINISTIC_NOTE_MODEL}`;
export const DETERMINISTIC_GATEWAY_REPLY = gatewayReply;
export const DETERMINISTIC_NOTE_READY_REPLY = noteReadyReply;
export const DETERMINISTIC_NOTE_MISSING_REPLY = noteMissingReply;
export function isDeterministicGatewayModel(provider: string, model: string): boolean {
  return (
    provider.trim().toLowerCase() === DETERMINISTIC_GATEWAY_PROVIDER &&
    [DETERMINISTIC_GATEWAY_MODEL, DETERMINISTIC_NOTE_MODEL].includes(model.trim().toLowerCase())
  );
}

export function resolveDeterministicGatewayReply(
  provider: string,
  model: string,
  options: { notePluginLoaded?: boolean } = {},
): string | undefined {
  if (provider.trim().toLowerCase() !== DETERMINISTIC_GATEWAY_PROVIDER) return undefined;
  const normalizedModel = model.trim().toLowerCase();
  if (normalizedModel === DETERMINISTIC_GATEWAY_MODEL) return DETERMINISTIC_GATEWAY_REPLY;
  if (normalizedModel === DETERMINISTIC_NOTE_MODEL) {
    return options.notePluginLoaded
      ? DETERMINISTIC_NOTE_READY_REPLY
      : DETERMINISTIC_NOTE_MISSING_REPLY;
  }
  return undefined;
}
