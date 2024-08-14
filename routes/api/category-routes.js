const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories and include its associated Products  
  try{
    const allCategories = await Category.findAll({
      order:['id'],
      include:[{model:Product}]
    })
    res.status(200).json(allCategories)
  }
  catch{
    res.status(500).json('Failed to retrieve categories')
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value include its associated Products
  try{
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })

    //return a 404 status and a message if the category id does not match one in the database
    if (!category){
      res.status(404).json('Category not found')
      return
    }

    res.status(200).json(category)
  }
  catch{
    res.status(500).json('Failed to retrieve category')
  }
  
  
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const createdCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(createdCategory)
  }
  catch{
    res.status(500).json('Failed to create category')
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updateCategory = await Category.update(req.body,{
      where:{
        id: req.params.id
      } 
    })
    //return a 404 status and a message if the category id does not match one in the database
    if (!updateCategory[0]){
      res.status(404).json('Category not found')
    }
    res.status(200).json(updateCategory)
  }
  catch{
    res.status(500).json('Failed to update category')
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCategory = await Category.destroy({
      where:{
        id: req.params.id
      }
    })
    console.log(deleteCategory)
    //return a 404 status and a message if the category id does not match one in the database
    if (!deleteCategory){
      res.status(404).json('Category not found')
    }
    res.status(200).json(deleteCategory)
  }
  catch{
    res.status(500).json('Failed to delete category')
  }

});

module.exports = router;
