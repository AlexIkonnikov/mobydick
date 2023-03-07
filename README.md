# MobyDick

Библиотека компонентов для мобильной разработки.

Для использования библиотеки надо прописать зависимость из [доки](https://glab.lad24.ru/npm/registry).


# Содержание
1. [О проекте](#1-о-проекте)
2. [Разработка](#2-разработка)
    - [Локальный запуск](#локальный-запуск)
        - [Подготовка](#подготовка)
        - [Установка](#установка)
        - [Как запустить проект](#как-запустить-проект)
    - [Code style](#code-style)
    - [Процесс сборки приложения для релиза](#процесс-сборки-приложения-для-релиза)
3. [Тесты](#3-тесты)
4. [База знаний](#4-база-знаний)

# О проекте
Легковесная библиотека компонентов для разработки мобильных приложений. См. также [дизайн-систему в Figma](https://www.figma.com/file/O1ISmXoYQaYPfDZDBsme10/%E2%9D%96-Neotis--%C2%B7--Design-system?node-id=3%3A130).

Чтобы не тянуть все зависимости, которые могут не пригодиться, либу разделили на модули:


- [@npm/mobydick-core](./packages/core/README.md)
- [@npm/mobydick-utils](./packages/utils/README.md)


# 2. Разработка
## Локальный запуск
### Подготовка
- **Пакетный менеджер** [`yarn`](https://yarnpkg.com/getting-started/install), так как он быстрый.
- Конфигурацию ESlint. Информация о ней находится в [отдельном репозитории](https://glab.lad24.ru/npm/eslint-config), чтобы использовать ее на смежных проектах.

Чтобы установить все пакеты, нужно установить ассоциации для нашего gitlab registry и закрепить accessToken. Для этого изучи пункты 1 и 2 в инструкции [“Как скачать наш пакет”](https://glab.lad24.ru/npm/registry#%D0%BA%D0%B0%D0%BA-%D1%81%D0%BA%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%BD%D0%B0%D1%88-%D0%BF%D0%B0%D0%BA%D0%B5%D1%82).

### Установка
1. Сначала прочитай [инструкцию](https://reactnative.dev/docs/environment-setup).
2. Установить Android SDK можно через [Android Studio](https://developer.android.com/studio) (самый простой способ) или через [IDEA](https://www.jetbrains.com/ru-ru/idea/), прописав нужные переменные для `.bashrc` или аналоги:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/cmdline-tools/tools/bin
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator #регистируем новый Path
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
```

3. Чтобы установить пакеты, лучше использовать команду `yarn install --frozen-lockfile`.


### Как запустить проект
Чтобы запустить проект локально, используй:

- `yarn start`
- `yarn android` или `yarn ios`
- `yarn storybook`
- 
### Для debugging
Чтобы пользоваться React Native Debugger нужно добавить patch: закомментировать строчки в StyleSheet у React Native 
```bash
if (__DEV__) {
  for (const key in obj) {
    if (obj[key]) {
      Object.freeze(obj[key]);
    }
  }
}
```

## Code style
1. Константы
   `CAPS_SNAKE_CASE`
2. Функции
   `camelCase`
3. Классы
   `PascalCase`
4. Enum
   `PascalCaseEnum.camelCase`
5. Типы
   `PascalCaseType`
6. Интерфейсы
   `PascalCase`
7. Переменные внутри функций
   `camelCase`
8. Названия файлов
    - Если внутри файлов `default export Class`, то
      `PascalCase`
    - В любом другом случае (функции / константы / etc)
      `camelCase`

## Процесс сборки приложения для релиза

Запустить скрипт в `scripts/publish`

# 4. Тесты

Чтобы запустить тесты, используй команду `yarn run test`.

# 5. База знаний

**Несколько простых правил для readme**
1. Основная структура readme-файла нерушима.
2. Технические писатели обеспечивают структуру и читаемость. Если ты что-то меняешь в readme-файле, тегай Аню (@nazolinaas).
3. Если ты считаешь, что твоей команде не хватает какой-то информации, пиши в #docs.
4. Для каждой новой темы используй новый заголовок. Максимальный уровень вложенности заголовков равен 3.
5. Если на чём-то нужно заострить внимание, пиши полужирным “важно” и “примечание”. 
