/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

global.STORIES = [
  {
    titlePrefix: "",
    directory: "./.storybook/stories",
    files: "**/*.stories.?(ts|tsx|js|jsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:\\.storybook\\/stories(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$",
  },
];

import "@storybook/addon-ondevice-notes/register";
import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-backgrounds/register";
import "@storybook/addon-ondevice-actions/register";
import "@storybook/addon-knobs/register";

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    "./.storybook/stories/calendar/Calendar.stories.tsx": require("./stories/calendar/Calendar.stories.tsx"),
    "./.storybook/stories/chat/Chat.stories.tsx": require("./stories/chat/Chat.stories.tsx"),
    "./.storybook/stories/controls/Controls.stories.tsx": require("./stories/controls/Controls.stories.tsx"),
    "./.storybook/stories/cta/Button/Button.stories.tsx": require("./stories/cta/Button/Button.stories.tsx"),
    "./.storybook/stories/icons/SimpleIcon/SimpleIcon.stories.tsx": require("./stories/icons/SimpleIcon/SimpleIcon.stories.tsx"),
    "./.storybook/stories/inputs/DropDown/DropDown.stories.tsx": require("./stories/inputs/DropDown/DropDown.stories.tsx"),
    "./.storybook/stories/inputs/Inputs.stories.tsx": require("./stories/inputs/Inputs.stories.tsx"),
    "./.storybook/stories/navbars/Navbars.stories.tsx": require("./stories/navbars/Navbars.stories.tsx"),
    "./.storybook/stories/other/Other.stories.tsx": require("./stories/other/Other.stories.tsx"),
    "./.storybook/stories/popups/Popup/Popup.stories.tsx": require("./stories/popups/Popup/Popup.stories.tsx"),
    "./.storybook/stories/progress/Progress.stories.tsx": require("./stories/progress/Progress.stories.tsx"),
    "./.storybook/stories/typography/Typography/Typography.stories.tsx": require("./stories/typography/Typography/Typography.stories.tsx"),
  };
};

configure(getStories, module, false);
