import {Router} from 'express';
export let signinRouter:Router = Router();

signinRouter.get('/signin', (req, res) => {
    res.send('Hello from signin');
});

