module.exports = {
    "env": {
        "mocha": true,
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "plugin:vue/recommended"
    ],
    "globals": {
        "expect": true,
        "sinon": true
    },
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        // 0/off 关闭规则  1/warn 开启规则(使用警告级别的错误) 2/error 开启规则(使用错误级别的错误)
        "no-underscore-dangle": 0,
        "func-names": 0,
        "func-style": 0,
        "no-console": 0,
        "semi": 0,
        "indent": ["error", 2],
        "comma-dangle": 0,
        "import/prefer-default-export": 0,
        "import/no-extraneous-dependencies": 0,
        "no-param-reassign": 0,
        "radix":0,
        "no-unused-expressions": 0,
        "vue/name-property-casing": 0,
        "import/no-unresolved": 0,
        "vue/no-v-html": 0
    }
};