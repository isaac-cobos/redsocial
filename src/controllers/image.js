const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');


const { Image, Comment } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) =>  {
   const image = await Image.findOne({filename:{$regex: req.params.image_id}});
   console.log(image)
    res.render('image',{image});
};

ctrl.create = (req, res) => { 
    const saveImage =  async () => {
        const imgURL = randomNumber(); 
        const images = await Image.find({ filename: imgURL });
        if (images.length > 0) {
            saveImage();
        } else {
            console.log(imgURL);
            const ImageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const TargetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);
            
            if (ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(ImageTempPath, TargetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgURL + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save();
                res.redirect('/images/' +  imgURL);
            } else { 
                await fs.unlink(ImageTempPath);
                res.status(500).json({ error:'Only Images are allowed' });
            }
          }                        
        };
        saveImage();
    };

ctrl.like = (req, res) => {

} ; 

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
     if(image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
     }   
}; 

ctrl.remove = (req, res) => {

} ; 



module.exports = ctrl;