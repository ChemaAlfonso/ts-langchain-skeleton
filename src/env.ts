import { config } from '@dotenvx/dotenvx'
config()

export const getEnv = (key: string) => {
	if (process.env[key] === undefined) throw new Error(`Environment variable ${key} is not set`)
	return process.env[key]
}
