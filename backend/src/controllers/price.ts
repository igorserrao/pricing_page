import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { PriceModel } from '../models/price';
import { MongoGet } from '../decorators/mongoose/get';
import { MongoCreate } from '../decorators/mongoose/create';
import { MongoQuery } from '../decorators/mongoose/query';
import { MongoUpdate } from '../decorators/mongoose/update';
import { MongoDelete } from '../decorators/mongoose/delete';

@Controller('/prices')
class PriceController {
    @Route('get', '/get/all')
    @MongoGetAll(PriceModel)
    getAll(req: Request, res: Response, next: NextFunction) {
        res.status(200).json(req.mongoGetAll);
    }

    @Route('get', '/get/:id')
    @MongoGet(PriceModel)
    get(req: Request, res: Response, next: NextFunction) {
        res.status(200).json(req.mongoGet);
    }

    @Route('post', '/create')
    @MongoCreate(PriceModel)
    create(req: Request, res: Response, next: NextFunction) {
        res.status(201).json(req.mongoCreate);
    }

    @Route('post', '/query')
    @MongoQuery(PriceModel)
    query(req: Request, res: Response, next: NextFunction) {
        res.status(200).json(req.mongoQuery);
    }

    @Route('patch', '/update/:id')
    @MongoUpdate(PriceModel)
    update(req: Request, res: Response, next: NextFunction) {
        res.status(201).json(req.mongoUpdate);
    }

    @Route('delete', '/delete/:id')
    @MongoDelete(PriceModel)
    delete(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ message: 'Deleted' });
    }
}

export default PriceController;
