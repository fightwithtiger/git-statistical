import { describe, test, expect } from 'vitest'
import { defineExecSync, getFormatDate } from '../src/utils'
import { getAuthor, getCurrentBranch, getBranchCreateTime, getCodeChangeStat } from '../src/git'

describe('git commmand', () => {
  test('getAuthor', async () => {
    const execSync = await defineExecSync()
    const author = getAuthor(execSync)
    expect(author).toMatchSnapshot()
  })

  test('getCurrentBranch', async () => {
    const execSync = await defineExecSync()
    const branch = getCurrentBranch(execSync)
    expect(branch).toMatchSnapshot()
  })

  test('getBranchCreateTime', async () => {
    const execSync = await defineExecSync()
    const branch = getCurrentBranch(execSync)
    const date = getBranchCreateTime(execSync, branch)
    expect(date).toMatchSnapshot()
  })

  test('getCodeChangeStat', async () => {
    const execSync = await defineExecSync()
    const today = getFormatDate(new Date())
    const branch = getCurrentBranch(execSync)
    const createDate = getBranchCreateTime(execSync, branch)

    const author = getAuthor(execSync)
    const stat = getCodeChangeStat(execSync, branch, author, createDate, today)
    
    expect(stat).toMatchSnapshot()
  })
})
