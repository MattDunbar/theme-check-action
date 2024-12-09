import { getExecOutput } from '@actions/exec';

export async function runChecksJson(
  root: string,
  shopifyExecutable: string = 'shopify',
  devPreview = true,
  flags = '',
) {
  const { exitCode, stdout, stderr } = await getExecOutput(
    shopifyExecutable,
    [
      'theme',
      'check',
      devPreview ? '--dev-preview' : undefined,
      ...flags.split(' '),
      ...['--output', 'json'],
      ...['--path', root],
    ].filter((x): x is string => Boolean(x)),
    {
      silent: true,
      ignoreReturnCode: true,
    },
  );
  console.error(stderr);

  console.log('test...');
  console.log(stdout);
  console.log('test2...');

  return {
    exitCode,
    report: JSON.parse(stdout),
  };
}
