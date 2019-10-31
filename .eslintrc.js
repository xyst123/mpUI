module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        //   "plugin:vue/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
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
        "import/no-extraneous-dependencies": 0
    }
};