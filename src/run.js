import { program } from 'commander'
import pc from "picocolors"
import { runStatistic } from './index'

run()
export function run () {
  program
    .description(pc.yellow('git statistic'))
    .usage(pc.yellow('<command> [options]'))
    .option('-a, --author <author>', 'which author ')
    .option('-b, --branch <branch>', 'which branch')
    .option('-s, --since <since>', 'statiscal sicne time, format: YYYY-MM-DD HH-mm-ss')
    .option('-u, --until <until>', 'statiscal until time, format: YYYY-MM-DD HH-mm-ss')
    .action(excute)

  program.parse();
}

async function excute () {
  try {
    const options = program.opts()
    await runStatistic(options)
    process.exit(0)
  } catch (e) {
    console.log(pc.bgRed(e.name), pc.bgRed(e.message))
    process.exit(1)
  }
}
