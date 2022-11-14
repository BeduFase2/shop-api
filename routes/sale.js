const express = require('express');
const router = express.Router();

const permission = require('../middlewares/permission')
const {
    getAll, 
    create,
    update,
    drop,
    getByProduct,
    getByUser
} = require('../controllers/sale');

router.route('/')
    .get(permission('admin', 'client'), getAll)
    .post(permission('admin','client'), create)
    .put(permission('admin'), update)
    .patch(permission('admin'), drop);

router.route('/product/:id')
    .get(permission('admin', 'client'), getByProduct);

router.route('/user/:id')
    .get(permission('admin', 'client'), getByUser);

module.exports = router