import { program } from 'commander'

run()

function run() {
  program
    // .command('create')
    .description('description')
    .option('-a, --author <author>', 'author')
    .option('-b, --branch <branch>', 'branch')
    .option('-s, --start <start>', 'end')
    .option('-e, --end <start>', 'end')
    .action(action)
  
  program.parse();
}

function action(str, options) {
  console.log('str', str)
}