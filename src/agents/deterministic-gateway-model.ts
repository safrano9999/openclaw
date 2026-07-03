export const DETERMINISTIC_GATEWAY_PROVIDER = "dummy";
export const DETERMINISTIC_GATEWAY_MODEL = "dummy";
export const DETERMINISTIC_GATEWAY_MODEL_REF = `${DETERMINISTIC_GATEWAY_PROVIDER}/${DETERMINISTIC_GATEWAY_MODEL}`;
export const DETERMINISTIC_NOTE_MODEL = "note";
export const DETERMINISTIC_NOTE_MODEL_REF = `${DETERMINISTIC_GATEWAY_PROVIDER}/${DETERMINISTIC_NOTE_MODEL}`;
export const DETERMINISTIC_GATEWAY_REPLY =
  "No AI is configured. This gateway is running in deterministic mode. Use /tools to view available tools.";
export const DETERMINISTIC_NOTE_REPLY =
  "Note AI is configured. This gateway is running in deterministic mode. Use /tools to view available tools.";

export function isDeterministicGatewayModel(provider: string, model: string): boolean {
  return (
    provider.trim().toLowerCase() === DETERMINISTIC_GATEWAY_PROVIDER &&
    [DETERMINISTIC_GATEWAY_MODEL, DETERMINISTIC_NOTE_MODEL].includes(model.trim().toLowerCase())
  );
}

export function resolveDeterministicGatewayReply(
  provider: string,
  model: string,
): string | undefined {
  if (provider.trim().toLowerCase() !== DETERMINISTIC_GATEWAY_PROVIDER) return undefined;
  const normalizedModel = model.trim().toLowerCase();
  if (normalizedModel === DETERMINISTIC_GATEWAY_MODEL) return DETERMINISTIC_GATEWAY_REPLY;
  if (normalizedModel === DETERMINISTIC_NOTE_MODEL) return DETERMINISTIC_NOTE_REPLY;
  return undefined;
}
