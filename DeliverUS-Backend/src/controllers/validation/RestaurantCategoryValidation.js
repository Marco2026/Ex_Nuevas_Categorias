import { check } from 'express-validator'
import { RestaurantCategory } from '../../models/models.js'

const checkRestaurantCategoryNotExists = async (value, { req }) => {
  try {
    const restaurantCategory = await RestaurantCategory.findOne({
      where: { name: value } // req.body.name
    })
    if (restaurantCategory !== null) {
      return Promise.reject(new Error('The restaurantCategory already exists.'))
    } else { return Promise.resolve() }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const create = [
  check('name').exists().isString().isLength({ min: 1, max: 50 }).trim().custom(checkRestaurantCategoryNotExists)
]

const update = [
  check('name').exists().isString().isLength({ min: 1, max: 50 })
]

export { create, update }
