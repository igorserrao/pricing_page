import { Express, RequestHandler } from 'express';

export type RouteHandler = Map<string, Map<string, RequestHandler[]>>;
