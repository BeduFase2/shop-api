const sequelize = require('../config/db')
const { Op } = require('sequelize')

const productModel = sequelize.models.products;

const getAll = async (req, res) => {
    return await productModel.findAndCountAll()
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err }))
}

const getByFilter = async (req, res) => {
    const { query: { price, brand, search } } = req;
    return await productModel.findAndCountAll({
        where: {
            name: { [Op.like]: `%${search}%` },
            [Op.or]: [
                { price: price },
                { description: brand }
            ]
        }
    })
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err }))
}

const getPaginated = async (req, res) => {
    let { params: { offset, limit } } = req
    offset = parseInt(offset)
    limit = parseInt(limit)
    return await productModel.findAndCountAll({
        offset,
        limit
    })
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err }))
}

const create = async (req, res) => {
    const { body } = req;
    const product = await productModel.build({
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
    });
    await product.save();
    return res.status(201).json({ data: product })
}

const update = async (req, res) => {
    const { body, params: { id } } = req;
    const product = await productModel.findByPk(id);
    if (!product) {
        return res.status(404).json({ code: 404, message: 'No existe el producto' });
    }
    const updatedProduct = await product.update({
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
    });
    return res.json({ data: updatedProduct });
}

const drop = async (req, res) => {
    const { params: { id } } = req;
    const product = await productModel.findByPk(id);
    if (!product) {
        return res.status(404).json({ code: 404, message: 'No existe el producto' });
    }
    await product.destroy();
    return res.json();
}

module.exports = {
    getAll,
    getByFilter,
    getPaginated,
    create,
    update,
    drop
}