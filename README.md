# Начало разработки визуализатора данных

Создано с помощью [Create React App](https://github.com/facebook/create-react-app).

## Команды

Запуск:

### `npm start`

Интерфейс [http://localhost:3000](http://localhost:3000) - просмотр в браузере.


### `npm test`

Запуск тестов.\
Просмотр результатов [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Сборка.

## Компоненты
### App
базовый компонент

### UiControl
подготовка данных, формирование стилей (обертка вокруг Graph)

### Graph
отрисовка графа


# Требования к компоненту для отображения графов

## Интерфейс контрола

1. Все [props](#props) компонента должны быть корректно типизированы и задокументированные;
1. По умолчанию компонент должен растягиваться на 100% ширины и высоты своего родителя, но также необходима возможность настраивать его внешние стили с помощью [props](#props) `className` и `style`;
1. Нужна возможность настраивать стили элементов графа (например, узел графа) как:

    ```html
    <Graph
        itemsProps={{
          'название элемента': { className, style },
        }}
    />
    ```

    Более подробно подробно смотри [props](#props).

1. Контрол должен поддерживать два режима работы. В режиме визуального редактирования, когда данные (node, links) передаются в качестве пустых массивов. И в режиме отображения данных, когда данные будут переданы.

## Props

Набор передаваемых параметров в компонент графа.

```ts
import { CSSProperties } from 'react';

interface Props {
  // Класс применяемый к компоненту
  className?: string;
  // Объект с css стилями
  style?: CSSProperties;
}

interface IGraph extends Props {
  itemProps?: ItemProps;
  links: Link[],
  nodes: Node[],
}

type ItemProps = { [key: string]: Props }

type Node = {
  // Уникальный code элемента
  code: string;
  // Человеко читабельное наименование
  name: string;
  // Тип узла (Может быть любой строкой, выводится как часть узла)
  type: string;
}

type Link = {
  // Уникальный code элемента
  code: string;
  // Человеко читабельное наименование
  name: string;
  // Тип связи
  type: LinkType;
  // Код узла, который является основным
  primary: string;
  // Код узла, на который ссылаются
  secondary: string;
}

// Набор возможных типов связей между узлами
type LinkType = 'linked' | 'contains' | 'use' | 'implements' | 'associated';
```

### Пример nodes и links

```json
{
"nodes": [
  {
    "code": "foo",
    "name": "node 1",
    "type": "Host"
  },
  {
    "code": "bar",
    "name": "node 2",
    "type": "Web server"
  }
],
"links": [
  {
    "code": "link-foo",
    "type": "link type",
    "name": "view name",
    "primary": "foo",
    "secondary": "bar"
  }
]
}
```

## Требования к компоненту

* Использовать React >= `18.2.0`;
* Использовать typescript == `4.3.4`;

## Требование к сторонним библиотекам

Сторонние пакеты можно использовать если лицензия у них: `MIT, BSD или Apache`. Не использовать `jQuery`.

## Tests

Компонент должен быть покрыты тестами, которые можно запустить с помощью `jest`.
Тесты должны исполняться без ошибок.
Процент покрытия тестами не менее 75%.

## Документирование

Все методы, функции и компоненты должны сопровождаться докстригами описывающими их назначения, входные аргументы, выходной результат и ключевые моменты работы.

## Парадигмы

Код react компонента должен быть оформлен в функциональном стиле с использованием hooks.

## Linter

Весь код библиотеки должен проходить автоматическую проверку линтером.
Используемый линтеры:

* `eslint`
* `stylelint`

Плагины, обязательные для установки с `eslint`:

* `"eslint-config-airbnb-typescript": "12.3.1"`
* `"eslint-plugin-class-property": "1.1.0"`
* `"eslint-plugin-require-jsdoc-except": "1.5.0"`

Плагины, обязательные для установки с `stylelint`:

* `"stylelint": "14.9.1"`
* `"stylelint-config-standard": "26.0.0"`

### Настройка правил для eslint

.eslintrc

```json
{
    "extends": ["airbnb-typescript"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json"
    },
    "plugins": [
      "@typescript-eslint",
      "class-property",
      "react-hooks",
      "require-jsdoc-except"
    ],
    "env": {
      "browser": true,
      "node": true
    },
    "ignorePatterns": ["**/*.css"],
    "rules": {
      "@typescript-eslint/lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "camelcase": "off",
      "capitalized-comments": "off",
      "class-methods-use-this": "off",
      "class-property/class-property-semicolon": [
        "error",
        "always"
      ],
      "consistent-return": "off",
      "guard-for-in": "off",
      "import/extensions": "off",
      "import/named": "off",
      "import/no-named-as-default": "off",
      "import/no-unresolved": "error",
      "import/prefer-default-export": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/control-has-associated-label": "off",
      "jsx-a11y/interactive-supports-focus": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/media-has-caption": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "linebreak-style": 0,
      "max-len": [
        1,
        120,
        4
      ],
      "no-case-declarations": "off",
      "no-console": "error",
      "no-extra-boolean-cast": "off",
      "no-extra-semi": "off",
      "no-labels": "off",
      "no-param-reassign": "off",
      "no-restricted-globals": "off",
      "no-restricted-syntax": "off",
      "no-return-await": "off",
      "no-throw-literal": "off",
      "no-trailing-spaces": "off",
      "no-underscore-dangle": [
        "error",
        {
          "allowAfterThis": true,
          "allowAfterSuper": true
        }
      ],
      "no-unused-labels": "error",
      "object-curly-newline": "off",
      "operator-linebreak": "off",
      "prefer-destructuring": [
        "error",
        {
          "object": true,
          "array": false
        }
      ],
      "react/button-has-type": "off",
      "react/destructuring-assignment": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-tag-spacing": "off",
      "react/jsx-wrap-multilines": "off",
      "react/no-array-index-key": "off",
      "react/no-did-update-set-state": "off",
      "react/no-unknown-property": "off",
      "react/prop-types": "off",
      "react/state-in-constructor": "off",
      "react/static-property-placement": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/jsx-no-duplicate-props": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "require-jsdoc-except/require-jsdoc": [
        "error",
        {
          "require": {
            "ArrowFunctionExpression": true,
            "ClassDeclaration": true,
            "FunctionDeclaration": true,
            "FunctionExpression": true,
            "MethodDefinition": true
          },
          "ignore": [
            "componentDidMount",
            "componentDidUpdate",
            "componentWillUnmount",
            "constructor",
            "getDerivedStateFromProps",
            "getSnapshotBeforeUpdate",
            "render",
            "shouldComponentUpdate"
          ]
        }
      ],
      "semi": "error",
      "spaced-comment": [
        "error",
        "always"
      ]
    },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules/", "src/"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
}
```

### Настройка правил для stylelint

.stylelintrc

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "at-rule-no-unknown": null,
    "at-rule-no-vendor-prefix": true,
    "no-descending-specificity": null,
    "no-eol-whitespace": null,
    "property-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,
    "string-quotes": "single",
    "alpha-value-notation": "number",
    "font-family-name-quotes": "always-unless-keyword"
  },
  "ignoreFiles": [
    "**/*.ts",
    "**/*.tsx"
  ]
}
```

### Настройка правил для typescript

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "downlevelIteration": true,
    "useDefineForClassFields": true,
    "baseUrl": "./src",
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "removeComments": true,
    "noUnusedLocals": false,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "strictNullChecks": true,
    "noImplicitAny": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "experimentalDecorators": true
  },
  "include": [
    "src"
  ]
}
```

