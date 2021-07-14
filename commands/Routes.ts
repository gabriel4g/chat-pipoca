import { join } from 'path'
import { BaseCommand, args } from '@adonisjs/core/build/standalone'

export default class Greet extends BaseCommand {
  public static commandName = 'make:route'

  @args.string({ description: 'Name of the route' })
  public name: string

  public async run() {
    const filePath: string = `app/Modules/${this.name}/`

    this.generator
      .addFile('routes', {
        extname: '.ts',
      })
      .appRoot(this.application.appRoot)
      .destinationDir(filePath)
      .useMustache()
      .stub(join(__dirname, './templates/routes.txt'))
      .apply('routes')

    await this.generator.run()
  }
}
