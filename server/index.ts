import express from 'express';
import start from './start';

start(express()).then(() => {
  // eslint-disable-next-line no-console
  console.log('Server up and running...');
});
