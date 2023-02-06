import {boolean, select, text} from '@storybook/addon-knobs';
import React, {FC, useCallback} from 'react';

import selectFont from '../../../utils/selectFont';

import ImageModal from './icons/svg/imageModal.svg';

import {
  IContentProps,
  ModalBase,
  usePopups,
  rem,
  useTheme,
  IButtonSize,
  IButtonTypes,
} from '@npm/mobydick-core';

const allowAccessText = 'Разрешить доступ';

const ExampleModal: FC<IContentProps> = props => {
  const popupContext = usePopups();
  const {colors} = useTheme();
  const {onClose} = props;
  const titleFont = select('Title font', selectFont, 'SemiBold-Primary-L');
  const descriptionFont = select(
    'Description font',
    selectFont,
    'Regular-Tertiary-XS',
  );
  const onPress = useCallback(
    () => popupContext.openPopup({Content: NestedExampleModal}),
    [],
  );
  return (
    <ModalBase {...props}>
      <ModalBase.CloseIcon onPress={onClose} />
      {boolean('show alert check', true) && <ModalBase.AlertContent />}
      {boolean('show alert warning', false) && (
        <ModalBase.AlertContent
          name={'icon-warning'}
          color={colors.IconAttention}
          style={{backgroundColor: colors.BgError}}
        />
      )}
      {boolean('show image', false) && (
        <ModalBase.ImageView image={<ImageModal />} />
      )}

      {boolean('show textContent', true) && (
        <ModalBase.TextContent
          title={text('Title text ', 'Нет доступа к камере')}
          titleFont={titleFont}
          descriptionText={text(
            'Description text',
            'Разрешите доступ к камере в настройках, чтобы сканировать штрихкод или QR-код на картах',
          )}
          descriptionFont={descriptionFont}
        />
      )}

      {boolean('show vertical button', false) && (
        <ModalBase.VerticalButtonsView>
          <ModalBase.VerticalButton
            onPress={onPress}
            type={select(
              'type one vertical button',
              IButtonTypes,
              IButtonTypes.primary,
            )}
            text={text('text one vertical button', allowAccessText)}
            style={{marginBottom: rem(12)}}
          />
          <ModalBase.VerticalButton
            onPress={onPress}
            type={select(
              'type two vertical button',
              IButtonTypes,
              IButtonTypes.destructive,
            )}
            text={text('text two vertical button', allowAccessText)}
          />
        </ModalBase.VerticalButtonsView>
      )}
      {boolean('show horizontal button', true) && (
        <ModalBase.HorizontalButtonsView
          typeRight={select(
            'type right button',
            IButtonTypes,
            IButtonTypes.secondary,
          )}
          textRight={text('text right button ', 'Добавить')}
          onPressRight={onPress}
          typeLeft={select(
            'type left button',
            IButtonTypes,
            IButtonTypes.destructive,
          )}
          disabledLeft={boolean('disabledLeft', false)}
          disabledRight={boolean('disabledRight', false)}
          textLeft={text('text left button ', 'Отмена')}
          onPressLeft={onClose}
        />
      )}
      {boolean('show one button', false) && (
        <ModalBase.VerticalButtonsView>
          <ModalBase.VerticalButton
            onPress={() =>
              popupContext.openPopup({Content: NestedExampleModal})
            }
            type={select('type one button', IButtonTypes, IButtonTypes.primary)}
            text={text('text one button', allowAccessText)}
            size={select('size one button', IButtonSize, IButtonSize.fixed)}
            style={{marginBottom: rem(12)}}
          />
        </ModalBase.VerticalButtonsView>
      )}
    </ModalBase>
  );
};

const NestedExampleModal: FC<IContentProps> = props => {
  const popupContext = usePopups();
  const {onClose} = props;

  const onPress = useCallback(
    () => popupContext.openPopup({Content: ExampleModal}),
    [],
  );
  return (
    <ModalBase {...props}>
      <ModalBase.CloseIcon onPress={onClose} />
      <ModalBase.TextContent
        title={'Вложенная Модалка'}
        descriptionText={'Это просто пример'}
      />
      <ModalBase.VerticalButtonsView>
        <ModalBase.VerticalButton
          onPress={onPress}
          text={'Открыть ещё одну'}
          type={select(
            'type one vertical button',
            IButtonTypes,
            IButtonTypes.primary,
          )}
        />
      </ModalBase.VerticalButtonsView>
    </ModalBase>
  );
};

export default ExampleModal;
