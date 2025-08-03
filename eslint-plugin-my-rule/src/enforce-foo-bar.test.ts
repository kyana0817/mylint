import { RuleTester } from 'eslint';
import rule from './enforce-foo-bar';


const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    }
  }
});

ruleTester.run('enforce-foo-bar', rule, {
  valid: ['const foo = "bar";'],
  invalid: [
    {
      code: 'const foo = "baz";',
      errors: [{ messageId: 'notBar', data: { notBar: 'baz' } }],
      output: 'const foo = "bar";',
    },
  ],
});
