import express = require('express')

import { ILogger, HttpVerb } from './types'

export class KondahServer {
  private readonly _server = express()
  private readonly _logger: ILogger

  constructor(logger: ILogger) {
    this._logger = logger
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public run(port: number, onSuccess?: () => void) {
    this._server.listen(port, () => this.onSuccessListen(port))
  }

  public use(path: string, fn: express.RequestHandler): void
  public use(fn: express.RequestHandler): void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public use(...args: any[]) {
    if (args.length === 1) {
      this._server.use(args[0])
      return
    }

    this._server.use(args[0], args[1])
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public set(setting: string, val: any): void {
    this._server.set(setting, val)
  }

  public engine(
    ext: string,
    // TODO: Fix
    fn: any
    // fn: (
    //   path: string,
    //   options: Record<string, unknown>,
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   callback: (e: any, rendered?: string) => void
    // ) => void
  ) {
    this._server.engine(ext, fn)
  }

  public get(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('get', path, handlers)
  }

  public post(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('post', path, handlers)
  }

  public put(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('put', path, handlers)
  }

  public patch(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('patch', path, handlers)
  }

  public delete(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('delete', path, handlers)
  }

  public head(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('head', path, handlers)
  }

  public options(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('options', path, handlers)
  }

  public getRawServer() {
    return this._server as express.Application
  }

  private registerRoute(
    verb: HttpVerb,
    path: string,
    handlers: express.RequestHandler[]
  ) {
    this._server[verb](path, handlers)
  }

  private onSuccessListen(port: number) {
    this._logger.info(`server is running on http://localhost:${port}`, 'SERVER')
  }
}
