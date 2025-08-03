import type { Rule } from 'eslint';


export default {
  defaultOptions: [],
  meta: {
    type: 'problem',
    messages: {
      notBar: 'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.'
    },
    docs: {
      description: 'Enforce that a variable named `foo` can only be assigned a value of `bar`.',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.parent && node.parent.type === 'VariableDeclaration') {
          if (node.id.type === 'Identifier'  && node.id.name === 'foo') {
            if (node.init && node.init.type === 'Literal' && node.init.value !== 'bar') {
              context.report({
                node,
                messageId: 'notBar',
                data: {
                  notBar: String(node.init.value)
                },
                fix(fixer) {
                  if (node.init) return fixer.replaceText(node.init, '"bar"');
                  return null;
                }
              });
            }
          }
        }
      }

    };
  }
} as Rule.RuleModule;
