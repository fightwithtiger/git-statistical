import { program } from 'commander'
import { runStatistic } from './index'

run()

function run() {
  program
    .description('description')
    .option('-a, --author <author>', 'author')
    .option('-b, --branch <branch>', 'branch')
    .option('-s, --since <since>', 'sicne')
    .option('-u, --until <until>', 'until')
    .action(excuteAction)
  
  program.parse();
}

function excuteAction() {
  const options = program.opts()
  runStatistic(options)
}
