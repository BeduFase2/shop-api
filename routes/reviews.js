const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');


router.get('/', async (req, res) => {
  const reviews = await sequelize.models.reviews.findAndCountAll();
  return res.status(200).json({ data: reviews });
});


router.post('/', async (req, res) => {
  const { body } = req;
  const review = await sequelize.models.reviews.create({
    content: body.content,
    productId: body.productId,
    userId: body.userId
  });
  await review.save();
  return res.status(201).json({ data: review });
});


router.put('/:id', async (req, res) => {
  const { body, params: { id } } = req;
  const review = await sequelize.models.reviews.findByPk(id);
  if (!review) {
    return res.status(404).json({ code: 404, message: 'Product not found' });
  }
  const updatedReview = await review.update({
    content: body.content,
    productId: body.productId,
    userId: body.userId
  });

  return res.json({ data: updatedReview });
});


router.delete('/:id', async (req, res) => {
  const { params: { id } } = req;
  const review = await sequelize.models.reviews.findByPk(id);
  if (!review) {
    return res.status(404).json({ code: 404, message: 'Review not found' });
  }
  await review.destroy();
  return res.json();
});

module.exports = router;