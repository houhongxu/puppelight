import { Gatherer } from "lighthouse";

class MemoryGather extends Gatherer {
  meta = {
    supportedModes: ["navigation", "timespan"]
  };

  async startInstrumentation(context) {
    const session = context.driver.defaultSession;
    await session.sendCommand("Memory.startSampling");
  }

  async stopInstrumentation(context) {
    const session = context.driver.defaultSession;
    await session.sendCommand("Memory.stopSampling");
  }

  async getArtifact(context) {
    const session = context.driver.defaultSession;
    const { profile } = await session.sendCommand("Memory.getSamplingProfile");

    return profile;
  }
}

export default MemoryGather;
