const GemModel = require('../models/gems')
const Random =require('meteor-random')
const { id } = require('meteor-random')
const   fs= require('fs')
const cloudinary=require('cloudinary').v2
cloudinary.config({
    cloud_name:'dixgronji',
    api_key:"526126586131486",
    api_secret:"K_06QOq5lqDk950G1HrK345M2SE"
}    
)
module.exports = {
    createGem,
    getAllGems,
    getGem,
    getGemPost,
    updateGem,
    deleteGem,
    addReview,
    addImage


}
 async function createGem(req,res){
     console.log("user entry",req.body)
    const { name,description,long_description,price,size,specs,reviews}= req.body
    const newGem = new GemModel({name,description,long_description,price,size,specs,reviews})
    newGem._id = Random.id()
    console.log(newGem._id)
     await newGem.save()
    res.status(201).send({_id:newGem._id,success_msg:'New gem created succesfull'})
}
async function getAllGems(req,res){
    let gems =await GemModel.find({})
    let total = gems.length
    res.status(200).send({gems:gems,total:total})
}
async function getGem(req,res){
    let gem = await GemModel.findOne({_id: req.params._id})
    res.status(200).send({gem:gem})
}
async function getGemPost(req,res){
    let gem = await GemModel.findOne({_id: req.body._id})
    res.status(200).send({gem:gem})
}
async function updateGem(req,res){
    const _id=req.body._id
    let update = req.body.gem
    await GemModel.update({_id:_id},{$set:update})
    res.status(202).send({'success_msg':'Gem updated succesfully'})
}
async function deleteGem(req,res){
    await GemModel.findByIdAndDelete(req.params._id)
    res.status(202).send({'success_msg': 'Gem removed'})
}
async function addReview(req,res){
    let _id=req.body._id
    let update= req.body.review
    await GemModel.findByIdAndUpdate(_id,{"$push":{"reviews":update}},{"new":false,"upsert":false})
    res.status(202).send({'success_msg': `Review added`})
}
async function addImage(req,res){
    let _id=req.body._id
    let file =  req.files.file
    let key = new Date().toISOString()
    cloudinary.uploader.upload(file.path,
        {public_id: `gems/${key}`,tag:'gems'},
        function(err,image){
            if(err) return res.send(err)
            console.log("File uploaded succesfully")
            fs.unlinkSync(file.path)
            updateImages(_id, image.url)
            res.json(image)

        })
}
 async function updateImages(_id,url){
    let conceptId=_id
    let update=url
    let conceptUpdated =await GemModel.findByIdAndUpdate(conceptId,{"$push":{"images":update}},{"new":false,"upsert":false})
   res.status(202).send({message: conceptUpdated})
}