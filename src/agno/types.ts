
// Types/interfaces for agno agent, tools, actions, and context

// The context accessible to tools and the agent
export interface AgnoAgentContext {
  userId?: string;
  sessionId?: string;
  conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
  [key: string]: any;
}

// Agent response
export interface AgnoAgentResponse {
  role: "assistant" | "tool";
  content: string;
  toolCall?: {
    name: string;
    params: Record<string, any>;
    output: string;
  };
}

// Tool registration details
export interface AgnoTool {
  name: string;
  description: string;
  parameters: Record<string, string>; // param name -> type
  run: (input: Record<string, any>, context: AgnoAgentContext) => Promise<string>;
}

// High-level Agent config
export interface AgnoAgentConfig {
  tools: AgnoTool[];
  systemPrompt: string;
}
