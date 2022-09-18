let execSync;

async function defineExecSync() {
  try {
    return (await import('child_process')).execSync;
  } catch (e) {
    const { execSync } = require('child_process');
    return execSync;
  }
}

function drawTable(arrMap) {

  function getRealLength(str) {
    let length = 0;
    for (let i = 0; i < str.length; i++) {
      length += (str.charCodeAt(i) > 127 ? 2 : 1);
    }
    return length;
  }

  function getArrAttr(el) {
    return {
      keyLen: getRealLength(` ${el[0]}  `),
      valLen: getRealLength(` ${el[1]}  `),
      key: ` ${el[0]}  `,
      val: ` ${el[1]}  `,
    };
  }

  function getObjAttr(el) {
    return Object
      .keys(el)
      .map(e => ({
      keyLen: getRealLength(` ${e}  `),
      valLen: getRealLength(` ${el[e]}  `),
      key: ` ${e}  `,
      val: ` ${el[e]}  `,
    }));
  }

  const parsedMap = arrMap.map(e => Array.isArray(e) ? getArrAttr(e) : getObjAttr(e));
  let maxKeyLen = 0;
  let maxValLen = 0;
  parsedMap.forEach(e => {
    if (Array.isArray(e)) {
      e.forEach(c => {
        maxKeyLen = c.keyLen > maxKeyLen ? c.keyLen : maxKeyLen;
        maxValLen = c.valLen > maxValLen ? c.valLen : maxValLen;
      });
    } else {
      maxKeyLen = e.keyLen > maxKeyLen ? e.keyLen : maxKeyLen;
      maxValLen = e.valLen > maxValLen ? e.valLen : maxValLen;
    }
  });

  const divider = `+${Array(maxKeyLen).fill('-').join('')}-${Array(maxValLen).fill('-').join('')}+\n`;
  const str = parsedMap.map(e => {
    if (Array.isArray(e)) {
      return e.map(c => {
        c.keyLen < maxKeyLen && (c.key = c.key + Array(maxKeyLen - c.keyLen).fill(' ').join(''));
        c.valLen < maxValLen && (c.val = c.val + Array(maxValLen - c.valLen).fill(' ').join(''));
        return `|${c.key}|${c.val}|`;
      }).join('\n') + '\n';
    } 

    e.keyLen < maxKeyLen && (e.key = e.key + Array(maxKeyLen - e.keyLen).fill(' ').join(''));
    e.valLen < maxValLen && (e.val = e.val + Array(maxValLen - e.valLen).fill(' ').join(''));
    return `|${e.key}|${e.val}|\n`;
  }).join(divider);

  console.log(`${divider}${str}${divider}`);
}

function getAuthor() {
  return execSync('git config user.name')
    .toString()
    .trim();
}

function getCurrentBranch() {
  return execSync('git branch')
    .toString()
    .trim()
    .split('\n')
    .find(e => e.startsWith('* '))
    .replace('* ', '');
}

function getBranchCreateTime(branch) {
  const sp = execSync(`git reflog show --date=iso ${branch}`)
    .toString()
    .trim()
    .split('\n');
  return sp[sp.length - 1].match(/@\{([\s\S]*)? \+0800\}/)[1].split(' ')[0];
}

function getCodeChangeStat(branch, author, since, until) {
  const lines = execSync(`git log ${branch} --author="${author}" --since=${since} --until=${until} --pretty=tformat: --numstat`)
    .toString()
    .trim()
    .split('\n');

  let added = 0;
  let removed = 0;
  lines.forEach(e => {
    const sp = e.split('\t');
    added += (isNaN(Number(sp[0])) ? 0 : Number(sp[0]));
    removed += (isNaN(Number(sp[1])) ? 0 : Number(sp[1]));
  });
  
  return [added, removed, lines.length];
}

function getFormatDate(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return year + '-' +
        (month < 10 ? '0' + month : month) + '-' +
        (day < 10 ? '0' + day : day);
}

(async () => {
  try {
    execSync = await defineExecSync();
    const today = getFormatDate(new Date());
    const branch = getCurrentBranch();
    const createDate = getBranchCreateTime(branch);

    const author = getAuthor();
    const [authorAdded, authorRemoved, authorChangeFilesCount] = getCodeChangeStat(branch, author, createDate, today);
    const [allAdded, allRemoved, allChangeFilesCount] = getCodeChangeStat(branch, '', createDate, today);

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
    console.error('🙏Git 统计炸了，希望人没事');
    console.error(e);
  }  
})();
