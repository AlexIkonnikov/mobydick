import {render} from '@testing-library/react-native';

import ModalLoading from '../ModalLoading';

describe('@lad-tech/mobydick-core/modalLoading', () => {
  it('should renders correctly', () => {
    const {toJSON} = render(
      <ModalLoading
        title={'title'}
        descriptionText={'descriptionText'}
        id={'id'}
        onClose={() => null}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it('should renders correctly with optional', () => {
    const {toJSON} = render(
      <ModalLoading
        title={'title'}
        descriptionText={'descriptionText'}
        buttonText={'buttonText'}
        id={'id'}
        onClose={() => null}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
