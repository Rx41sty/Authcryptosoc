import {Router} from 'express';
export let router:Router = Router();

router.get('/signup', (req, res) => {
    res.send('Hello from signup');
});
