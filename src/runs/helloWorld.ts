import { ChatOllama } from '@langchain/ollama'
import { PromptTemplate } from '@langchain/core/prompts'
import * as readline from 'readline'
import { getEnv } from '../env.js'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const run = async (input: string, model: string, baseUrl: string) => {
	const llm = new ChatOllama({ baseUrl, model })
	const promp = PromptTemplate.fromTemplate(input)

	const chunk = await promp.pipe(llm).stream({})

	for await (const data of chunk) {
		rl.write(String(data.content))
	}

	rl.write('\n')
	rl.close()
}

const model = 'llama3.1:8b-instruct-fp16'
const baseUrl = getEnv('OLLAMA_ENDPOINT')
const input = 'Hello world!'

export const helloWorld = async () => {
	await run(input, model, baseUrl)
}
