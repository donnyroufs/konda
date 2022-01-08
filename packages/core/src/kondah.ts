import { Energizor, IEnergizor } from '@kondah/energizor'

import { EnergizorLoggerAdapter, Logger } from './logger'
import { IKondahLogger } from './types'

export abstract class Kondah {
  private readonly _energizor: IEnergizor
  private readonly _logger: IKondahLogger

  public constructor(logger?: IKondahLogger) {
    this._logger = logger || new Logger()
    this._energizor = new Energizor(new EnergizorLoggerAdapter(this._logger))
  }

  protected abstract configureServices(energizor: IEnergizor): void
  protected abstract setup(energizor: IEnergizor): Promise<void> | void

  public async boot() {
    this._energizor.addSingleton(Logger)

    this.configureServices(this._energizor)

    await this._energizor.boot()
    await this.setup(this._energizor)

    this._logger.info('Kondah is up and running.', 'KONDAH')
  }
}
