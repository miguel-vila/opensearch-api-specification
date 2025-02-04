export enum LogLevel {
  error = 1,
  warn = 2,
  info = 3
}

export class Logger {
  level: LogLevel

  constructor (level: LogLevel) {
    this.level = level
  }

  info (message: string): void {
    this.#log(LogLevel.info, message)
  }

  warn (message: string): void {
    this.#log(LogLevel.warn, message)
  }

  error (message: string): void {
    this.#log(LogLevel.error, message)
  }

  #log (level: LogLevel, message: string): void {
    if (level > this.level) return
    const output = `[${level}] ${message}`
    if (level === LogLevel.error) console.error(output)
    if (level === LogLevel.warn) console.warn(output)
    if (level === LogLevel.info) console.info(output)
  }
}
