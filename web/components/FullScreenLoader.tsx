import { Spinner } from '@chakra-ui/react';
import React from 'react';

const FullScreenLoader = () => {
  return (
    <div>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal" size="xl" />
    </div>
  );
};

export default FullScreenLoader;
