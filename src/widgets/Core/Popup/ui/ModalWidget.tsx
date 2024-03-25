import {
  Button,
  createStyles,
  IButtonTypes,
  ModalBase,
  Typography,
  usePopups,
  useStyles,
  View,
} from 'shared/ui';

export const ModalWidget = () => {
  const [styles] = useStyles(styleFn);
  const {openPopup} = usePopups();

  return (
    <View style={styles.container}>
      <Typography font={'Regular-Primary-H5'}>Modal</Typography>
      <Button
        text={'ModalBase'}
        onPress={() =>
          openPopup({
            Content: props => (
              <ModalBase {...props}>
                <ModalBase.CloseIcon onPress={props.onClose} />
                <ModalBase.AlertContent />
                <ModalBase.TextContent
                  title={'ModalBase'}
                  descriptionText={'descriptionText'}
                />
                <ModalBase.VerticalButtonsView>
                  <ModalBase.VerticalButton text={'VerticalButton'} />
                </ModalBase.VerticalButtonsView>
                <ModalBase.HorizontalButtonsView
                  textLeft={'Left btn'}
                  textRight={'Right btn'}
                  typeLeft={IButtonTypes.primary}
                  typeRight={IButtonTypes.destructive}
                  onPressRight={props.onClose}
                  onPressLeft={props.onClose}
                />
              </ModalBase>
            ),
          })
        }
      />
    </View>
  );
};

const styleFn = createStyles(({spaces}) => ({
  container: {
    gap: spaces.Space8,
  },
}));
