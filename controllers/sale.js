const sequelize = require('../config/db')
const { Op } = require('sequelize')

const saleModel = sequelize.models.sales;

const getAll = async (req, res) => {
    return await saleModel.findAndCountAll()
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err }))
}

const create = async (req, res) => {
    const { body } = req;
    const sale = await saleModel.build({
        productID: body.productID,
        userID: body.userID,
    });
    await sale.save();
    return res.status(201).json({ data: sale })
}

const update = async (req, res) => {
    const { body, params: { id } } = req;
    const sale = await saleModel.findByPk(id);
    if (!sale) {
        return res.status(404).json({ code: 404, message: 'No existe la venta' });
    }
    const updatedSale = await sale.update({
        productID: body.productID,
        userID: body.userID,
    });
    return res.json({ data: updatedSale });
}

const drop = async (req, res) => {
    const { params: { id } } = req;
    const sale = await saleModel.findByPk(id);
    if (!sale) {
        return res.status(404).json({ code: 404, message: 'No existe la venta' });
    }
    await sale.destroy();
    return res.json({data: `La venta ${id} se elimino correctamente`});
}

const getByProduct = async (req, res) => {
    const { params: { id } }  = req;
    return await saleModel.findAndCountAll({
        where: {
            productID: { [Op.eq]: id }
        }
    })
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err }))
}

const getByUser = async (req, res) => {
    const { params: { id } }  = req;
    return await saleModel.findAndCountAll({
        where: {
            userID: { [Op.eq]: id }
        }
    })
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err }))
}

module.exports = {
    getAll,
    create,
    update,
    drop,
    getByProduct,
    getByUser
}