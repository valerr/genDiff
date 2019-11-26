#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig);
    console.log(diff);
  });

program.parse(process.argv);
