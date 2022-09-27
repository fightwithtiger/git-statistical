import {
  drawTable,
} from './log'
import {
  getAuthor,
  getCodeChangeStat,
  getCurrentBranch,
  getBranchCreateTime,
} from './git'
import { getFormatDate, defineExecSync, mergeOptions } from './utils'

export async function runStatistic (options) {
  const baseOptions = await createBaseOptions(options.branch)
  options = mergeOptions(baseOptions, options)
  console.log('2222222222', options)

  const execSync = await defineExecSync()
  const authorStat = getCodeChangeStat(execSync, options)
  const allStat = getCodeChangeStat(execSync, options, true)
  const tableContent = getStatistcalContent(authorStat, allStat, options)
  drawTable(tableContent)
}

async function createBaseOptions(_branch) {
  const execSync = await defineExecSync()
  const author = getAuthor(execSync)
  const branch = _branch || getCurrentBranch(execSync)
  
  const since = getBranchCreateTime(execSync, branch)
  const until = getFormatDate(new Date())

  return {
    author,
    branch,
    since,
    until,
  }
}

function getStatistcalContent(authorStat, allStat, options) {
  const [authorAdded, authorRemoved, authorChangeFilesCount] = authorStat
  const [allAdded, allRemoved, allChangeFilesCount] = allStat
  const { author, branch, since, until } = options

  return [
    ['Git', '代码变更统计'],
    ['当前分支', branch],
    ['统计时间', `[${since}] 至 [${until}]`],
    {
      '代码编辑人': author,
      '编辑人-变更文件数': `${authorChangeFilesCount}`,
      '编辑人-变更行数': `新增 [${authorAdded}] 行 删除 [${authorRemoved}] 行 变更 [${authorAdded + authorRemoved}] 行`,
    },
    {
      '总计-变更文件数': `${allChangeFilesCount}`,
      '总计-变更行数': `新增 [${allAdded}] 行 删除 [${allRemoved}] 行 变更 [${allAdded + allRemoved}] 行`,
    }
  ]
}
