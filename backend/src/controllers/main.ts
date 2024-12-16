import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/validate';

type Validation = {
    name: string;
    email?: string;
};

const postHealthCheckValidation = Joi.object<Validation>({
    name: Joi.string().required(),
    email: Joi.string().email(),
});

@Controller()
class MainController {
    @Route('get', '/healthcheck')
    getHealthCheck(req: Request, res: Response, next: NextFunction) {
        try {
            console.info('GET /healthcheck called successfully!');
            res.status(200).json({
                message: 'Healthcheck called successfully!',
            });
        } catch (error) {
            next(error);
        }
    }

    @Route('post', '/healthcheck')
    @Validate(postHealthCheckValidation)
    postHealthCheck(req: Request, res: Response, next: NextFunction) {
        try {
            console.info('POST /healthcheck called successfully!');
            res.status(200).json({ ...req.body });
        } catch (error) {
            next(error);
        }
    }
}

export default MainController;
