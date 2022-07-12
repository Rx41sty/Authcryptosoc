import { Router } from 'express';
export let signinRouter = Router();
signinRouter.get('/signin', (req, res) => {
    res.send('Hello from signin');
});
