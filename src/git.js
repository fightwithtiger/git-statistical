

export function getAuthor(execSync) {
  return execSync('git config user.name')
    .toString()
    .trim()
}

export function getCurrentBranch(execSync) {
  return execSync('git branch')
    .toString()
    .trim()
    .split('\n')
    .find(e => e.startsWith('* '))
    .replace('* ', '')
}

export function getBranchCreateTime(execSync, branch) {
  const sp = execSync(`git reflog show --date=iso ${branch}`)
    .toString()
    .trim()
    .split('\n')
  const times = sp[sp.length - 1].match(/@\{([\s\S]*)? \+0800\}/)[1].split(' ')
  return `${times[0]} ${times[1]}`
}

export function getCodeChangeStat(execSync, branch, author, since, until) {
  const lines = execSync(`git log ${branch} --author="${author}" --since="${since}" --until="${until}" --pretty=tformat: --numstat`)
    .toString()
    .trim()
    .split('\n')

  let added = 0
  let removed = 0
  console.log('line', lines, author, since, until)
  lines.forEach(e => {
    const sp = e.split('\t')
    added += (isNaN(Number(sp[0])) ? 0 : Number(sp[0]))
    removed += (isNaN(Number(sp[1])) ? 0 : Number(sp[1]))
  })
  
  return [added, removed, lines.length]
}