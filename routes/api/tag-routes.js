const router = require('express').Router();
const { Tag, Product} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags and include its associated Product data
  try{
    const allTags = await Tag.findAll({
      order:['id'],
      include: [{ model: Product }]
    })
    res.status(200).json(allTags)
  }
  catch{
    res.status(500).json('Failed to retrieve tags')
  }
  

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` and include its associated Product data
  try{
    const tag = await Tag.findByPk(req.params.id,{
      include: [{ model: Product }]
    })
    //return a 404 status and a message if the tag id does not match one in the database
    if(!tag){
      res.status(404).json('Failed to find tag')
      return
    }
    res.status(200).json(tag)
  }
  catch{
    res.status(500).json('Failed to retrieve tag')
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      tag_name:req.body.tag_name
    })
    res.status(200).json(newTag)
  }
  catch{
    res.status(500).json('Failed to create tag')
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updatedTag = await Tag.update(req.body,{
      where:{
        id: req.params.id
      }
      
    })
    //return a 404 status and a message if the tag id does not match one in the database
    if(!updatedTag[0]){
      res.status(404).json('Failed to find tag')
    }
    res.status(200).json(updatedTag)
  }
  catch{
    res.status(500).json('Failed to update tag')
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTag = await Tag.destroy({
      where:{
        id:req.params.id
      }
    })
    //return a 404 status and a message if the tag id does not match one in the database
    if(!deletedTag){
      res.status(404).json('Failed to find tag')
    }
    res.status(200).json(deletedTag)
  }
  catch{
    res.status(500).json('Failed to delete tag')
  }
});

module.exports = router;
