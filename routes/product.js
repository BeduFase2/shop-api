const express = require('express');
const router = express.Router();

const permission = require('../middlewares/permission')
const {
    getAll, 
    getByFilter, 
    getPaginated,
    create,
    update,
    drop
} = require('../controllers/product');

router.route('/')
    .get(permission('admin', 'client'), getAll)
    .post(permission('admin'), create)
    .put(permission('admin'), update)
    .patch(permission('admin'), drop);

router.route('/filter')
    .get(permission('admin', 'client'), getByFilter);

router.route('/:offset/:limit')
    .get(permission('admin', 'client'), getPaginated);

module.exports = router