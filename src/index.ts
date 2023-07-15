import * as dotenv from "dotenv";
import { OpenAI } from "langchain";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

dotenv.config();

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory });
const terminal = readline.createInterface({ input, output });

let answer = "";
// eslint-disable-next-line no-constant-condition
while (true) {
  const response = await chain.call({ input: answer });
  answer = await terminal.question(`[GPT] ${response.response}\n`);
}
