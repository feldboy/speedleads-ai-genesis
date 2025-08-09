
// Core agent registry and orchestration logic
import { AgnoAgentConfig, AgnoTool, AgnoAgentContext, AgnoAgentResponse } from './types';

// Singleton agent object (expandable)
class AgnoAgent {
  tools: AgnoTool[] = [];
  systemPrompt: string;
  constructor(config: AgnoAgentConfig) {
    this.systemPrompt = config.systemPrompt ?? "You are an intelligent assistant.";
    if (config.tools) this.tools = config.tools;
  }
  // Register new tool
  registerTool(tool: AgnoTool) {
    this.tools.push(tool);
  }
  // Find and execute a tool by name
  async callTool(toolName: string, params: Record<string, any>, context: AgnoAgentContext): Promise<AgnoAgentResponse> {
    const tool = this.tools.find(t => t.name === toolName);
    if (!tool) {
      return { role: "assistant", content: `Tool "${toolName}" not found.` };
    }
    try {
      const output = await tool.run(params, context);
      return { role: "tool", content: output, toolCall: { name: toolName, params, output } };
    } catch (e) {
      return { role: "assistant", content: `Error running tool "${toolName}": ${(e as any).message}` };
    }
  }
  // Get list of registered tools
  getToolDescriptions() {
    return this.tools.map(t => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters
    }));
  }
}

// Singleton export (will be configured during use)
let agentSingleton: AgnoAgent | null = null;

// Factory function to initialize/configure the agent
export function createAgnoAgent(config: AgnoAgentConfig) {
  agentSingleton = new AgnoAgent(config);
  return agentSingleton;
}

// Hook to retrieve the current agent
export function getAgnoAgent(): AgnoAgent | null {
  return agentSingleton;
}
