import express from 'express';
import expressLoader from './express';

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await expressLoader({ app: expressApp });
};
