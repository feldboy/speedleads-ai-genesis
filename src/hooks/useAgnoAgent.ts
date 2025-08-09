
// useAgnoAgent React hook: initializes and returns the agno agent and registry
import { useState } from "react";
import { createAgnoAgent, getAgnoAgent } from "@/agno/agnoAgent";
import { AgnoTool, AgnoAgentConfig, AgnoAgentContext, AgnoAgentResponse } from "@/agno/types";

// Example placeholder tool (always available, can be removed later)
const pingTool: AgnoTool = {
  name: "ping",
  description: "Returns 'pong'. Used to test the agent-tool infrastructure.",
  parameters: {},
  run: async () => Promise.resolve("pong"),
};

const DEFAULT_SYSTEM_PROMPT = `
You are SpeedLeads.AI's agno-powered virtual agent. You can access data and perform actions via registered tools.
Always describe which tools you are calling and use natural Hebrew in your responses to the user.
`;

export function useAgnoAgent() {
  // Only initialize once (per app/session)
  const [initialized, setInitialized] = useState(false);

  // Initialize agent on first use
  if (!initialized) {
    createAgnoAgent({
      tools: [
        pingTool,
        // Future: Add more tools here, e.g. data fetch, Supabase, automations, etc.
      ],
      systemPrompt: DEFAULT_SYSTEM_PROMPT.trim(),
    });
    setInitialized(true);
  }

  const agent = getAgnoAgent();

  // Call a tool from React
  const callTool = async (
    toolName: string,
    params: Record<string, any>,
    context: AgnoAgentContext = {}
  ): Promise<AgnoAgentResponse> => {
    if (!agent) return { role: "assistant", content: "Agent not available." };
    return await agent.callTool(toolName, params, context);
  };

  return {
    agent,
    callTool,
    getToolDescriptions: () => agent?.getToolDescriptions() || [],
  };
}
