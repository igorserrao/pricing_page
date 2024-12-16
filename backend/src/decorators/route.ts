import { RequestHandler } from 'express';
import { RouteHandler } from '../library/routes';

type HttpMethod =
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'options'
    | 'head';

export function Route(
    method: HttpMethod,
    path: string = '',
    ...middleware: RequestHandler[]
) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const routePath = `${path}`;
        const routeHandlers: RouteHandler =
            Reflect.getMetadata('routeHandlers', target) || new Map();

        if (!routeHandlers.has(method)) {
            routeHandlers.set(method, new Map());
        }

        routeHandlers
            .get(method)
            ?.set(routePath, [...middleware, descriptor.value]);

        Reflect.defineMetadata('routeHandlers', routeHandlers, target);
    };
}
