import { describe, expect, it } from "vitest";
import {
  DETERMINISTIC_GATEWAY_REPLY,
  DETERMINISTIC_NOTE_REPLY,
  isDeterministicGatewayModel,
  resolveDeterministicGatewayReply,
} from "./deterministic-gateway-model.js";

describe("deterministic gateway models", () => {
  it("accepts dummy/dummy and dummy/note", () => {
    expect(isDeterministicGatewayModel("dummy", "dummy")).toBe(true);
    expect(isDeterministicGatewayModel("dummy", "note")).toBe(true);
    expect(isDeterministicGatewayModel("dummy", "other")).toBe(false);
  });

  it("returns the model-specific deterministic response", () => {
    expect(resolveDeterministicGatewayReply("dummy", "dummy")).toBe(DETERMINISTIC_GATEWAY_REPLY);
    expect(resolveDeterministicGatewayReply("dummy", "note")).toBe(DETERMINISTIC_NOTE_REPLY);
    expect(resolveDeterministicGatewayReply("dummy", "other")).toBeUndefined();
  });
});
