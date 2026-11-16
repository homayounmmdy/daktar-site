module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', 'fix', 'add', 'docs', 'style', 'refactor', 
        'test', 'perf', 'build', 'init', 'ci', 'chore', 
        'revert', 'a11y'
      ]
    ],
    'subject-max-length': [2, 'always', 72],
  },
};