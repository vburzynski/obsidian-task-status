module.exports = {
  extends: [
    '@commitlint/config-conventional', // scoped packages are not prefixed
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'test', // adding or correcting tests
        'fix', // bug fix
        'refactor', // changes that neither fixes a bug nor adds a feature
        'perf', // changes that improve performance
        'chore', // changes that don't modify src or test files
        'style', // changes that do not affect the meaning of the code
        'docs', // changes to documentation
        'ci', // change to Continuous Integrations (CI) files and scripts
        'build', // changes that affect the build system or external dependencies
        'revert', // reverts a previous commit
        'release', // version and other trivial changes preparing for a release
      ],
    ],
  },
};
