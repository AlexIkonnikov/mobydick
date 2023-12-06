import React, {FC, useImperativeHandle, useReducer} from 'react';

import {IPopup, IPopupId} from '../types';
import {
  reducer,
  defaultState,
  closeAllPopupsAction,
  closePopupAction,
  openPopupAction,
} from '../reducer';
import {modalRef, IModalRef, isPopupWithProps} from '../MobyDickPopup';

import {IOpenPopupParams, IPopupsContext} from './types';
import PopupsContext from './PopupsContext';

interface IPopupsProviderProps {
  popups?: IPopup[];
  children: React.ReactNode;
}

let popupId = 1;

const PopupsProvider: FC<IPopupsProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const openPopupWithProps: IModalRef['openPopup'] = (modal, ownProps) => {
    const id = (popupId++).toString();
    dispatch(
      openPopupAction({
        Content: modal as FC,
        props: ownProps || {},
        id,
      }),
    );
    return id;
  };

  const openPopup = (popup: IOpenPopupParams) => {
    dispatch(
      openPopupAction({
        ...popup,
        id: popup.id || (popupId++).toString(),
      }),
    );
  };

  const closePopup = (id: IPopupId) => {
    dispatch(closePopupAction(id));
  };

  const closeAllPopups = () => {
    dispatch(closeAllPopupsAction());
  };

  const context: IPopupsContext = {
    popups: state.popups,
    openPopup,
    closePopup,
    closeAllPopups,
  };

  useImperativeHandle(modalRef, () => ({
    openPopup: openPopupWithProps,
    closePopup,
    closeAllPopups,
  }));

  return (
    <PopupsContext.Provider value={context}>
      {children}
      {state.popups.map(popup => {
        if (isPopupWithProps(popup)) {
          return (
            <popup.Content
              key={popup.id}
              id={popup.id}
              onClose={() => closePopup(popup.id)}
              {...popup.props}
            />
          );
        }

        return (
          <popup.Content
            key={popup.id}
            onClose={() => {
              closePopup(popup.id);
            }}
            {...popup}
          />
        );
      })}
    </PopupsContext.Provider>
  );
};

export default PopupsProvider;
