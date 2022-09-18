import {
  drawTable,
} from './log'
import {
  getAuthor,
  getCodeChangeStat,
  getCurrentBranch,
  getBranchCreateTime,
} from './git'
import { getFormatDate, defineExecSync } from './utils'

;(async () => {
  try {
    const execSync = await defineExecSync()
    const today = getFormatDate(new Date())
    const branch = getCurrentBranch(execSync)
    const createDate = getBranchCreateTime(execSync, branch)

    const author = getAuthor(execSync)
    const [authorAdded, authorRemoved, authorChangeFilesCount] = getCodeChangeStat(execSync, branch, author, createDate, today)
    const [allAdded, allRemoved, allChangeFilesCount] = getCodeChangeStat(execSync, branch, '', createDate, today)

    drawTable([
      ['Git', '代码变更统计'],
      ['当前分支', branch],
      ['统计时间', `[${createDate}] 至 [${today}]`],
      {
        '代码编辑人': author,
        '编辑人-变更文件数': `${authorChangeFilesCount}`,
        '编辑人-变更行数': `新增 [${authorAdded}] 行 删除 [${authorRemoved}] 行 变更 [${authorAdded + authorRemoved}] 行`,
      },
      {
        '总计-变更文件数': `${allChangeFilesCount}`,
        '总计-变更行数': `新增 [${allAdded}] 行 删除 [${allRemoved}] 行 变更 [${allAdded + allRemoved}] 行`,
      }
    ])
    
  } catch (e) {
    console.error('🙏Git 统计炸了，希望人没事')
    console.error(e)
  }  
})();
