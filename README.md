# @tegor/git-statistic

[![NPM version](https://img.shields.io/npm/v/@tegor/git-statistic?color=a1b858&label=)](https://www.npmjs.com/package/@tegor/git-statistic)

A git tool for statistics on how many files change and how many lines update.

## Usage
`npm i @tegor/git-statistic -D`

write script in your package.json

```json
{
  "script": {
    "stat": "git-stat"
  }
}
```

`npm run stat`

## Options

```bash
Options:
  -a, --author <author>  which author
  -b, --branch <branch>  which branch
  -s, --since <since>    statiscal sicne time, format: YYYY-MM-DD HH-mm-ss
  -u, --until <until>    statiscal until time, format: YYYY-MM-DD HH-mm-ss
  -h, --help             display help for command
```

## License

[MIT](./LICENSE) License © 2022 [fightwithtiger](https://github.com/fightwithtiger)

