import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingSpinner = ({ visible, textContent }) => {
  return (
    <Spinner visible={visible} textContent={textContent} textStyle={{ color: '#FFF' }} />
  );
};

export default LoadingSpinner;
