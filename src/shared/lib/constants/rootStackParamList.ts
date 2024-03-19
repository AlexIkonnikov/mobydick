import { SCREENS } from 'shared/lib/constants/screens';

type IRootStackParamList = {
  [SCREENS.Home]: undefined,
  [SCREENS.Settings]: undefined

  [SCREENS.Core]: undefined
  [SCREENS.Calendar]: undefined
  [SCREENS.Utils]: undefined
  [SCREENS.Chart]: undefined

  [SCREENS.Chat]: undefined
  [SCREENS.Controls]: undefined
  [SCREENS.CTA]: undefined
  [SCREENS.Inputs]: undefined
  [SCREENS.Popups]: undefined
  [SCREENS.Progress]: undefined
  [SCREENS.Styles]: undefined
  [SCREENS.Typography]: undefined
  [SCREENS.Other]: undefined

  [SCREENS.LineChart]: undefined
  [SCREENS.BarChart]: undefined

  [SCREENS.KeyboardAware]: undefined
  [SCREENS.KeyboardAwareScrollView]: undefined
  [SCREENS.KeyboardAwareScrollViewWithBottom]: undefined

  [SCREENS.KeyboardAwareScrollViewTabs]: undefined
  [SCREENS.KeyboardAwareScrollViewWithTabs]: undefined
  [SCREENS.KeyboardAwareScrollViewWithBottomAndTabs]: undefined
}

export default IRootStackParamList
