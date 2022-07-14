## @npm/mobydick-styles

Пакет, который отвечает за стили, темы и иконки

Для использование шрифтовых иконок необходимо установить шрифт

Для этого в `react-native.config.js` необходимо добавить в assets путь к шрифту

module.exports = {
  project: {
    ios: {},
    android: {},
  },
    assets: [
    'node_modules/@npm/mobydick-typography/src/assets/fonts/',
    'node_modules/@npm/mobydick-styles/src/icons/font/assets/fonts/', // <--- добавить эту строчку
  ], 
};

и выполнить команду `react-native link`


