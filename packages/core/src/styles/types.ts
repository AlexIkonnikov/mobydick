import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

import {TWeights} from '../typography';

import {
  CurrentTheme,
  IDefaultSpaces,
  IBannerColors,
  IBgColors,
  IBorderColors,
  ICategoryColors,
  IChartColors,
  ICTAColors,
  IElementColors,
  IIconColors,
  ITextColors,
} from './constants';
import {getShadows} from './shadows/getShadows';

export type IStylesTypes = Record<string, ViewStyle | TextStyle | ImageStyle>;
export type ICurrentTheme = CurrentTheme | string;

export interface IDefaultTheme {
  currentTheme: ICurrentTheme;
  colors: Record<
    ICurrentTheme,
    ITextColors &
      IElementColors &
      IIconColors &
      IBgColors &
      ICTAColors &
      IBorderColors &
      IChartColors &
      ICategoryColors &
      IBannerColors
  >;
  spaces: IDefaultSpaces;
  fonts: TWeights;
  shadows: ReturnType<typeof getShadows>;
}

export interface IThemeContext {
  theme: IDefaultTheme;
  currentTheme: ICurrentTheme;
  colors: ITextColors &
    IElementColors &
    IIconColors &
    IBgColors &
    ICTAColors &
    IBorderColors &
    IChartColors &
    ICategoryColors &
    IBannerColors;
  spaces: IDefaultSpaces;
  fonts: TWeights;
  shadows: ReturnType<typeof getShadows>;

  setTheme: (theme: IDefaultTheme) => void;
  setCurrentTheme: (theme: ICurrentTheme) => void;
}

/**
 * @deprecated use IThemeContext
 */
export type IUseStylesTheme = IThemeContext;
