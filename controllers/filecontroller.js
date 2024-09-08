
const { response } = require('express');
const File = require('../models/File');

const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log('File details', file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: 'File uploaded successfully'
        });
    } catch {
        console.log("File upload failed");
        console.log(err);
    }
}

function isSupportedFormats(format, supportedFormats) {
    return supportedFormats.includes(format);
}

async function UploadToCloudaniry(file, folder,quality) {
    console.log('Uploading to cloudinary');
    const options = { folder };
    options.resource_type = 'auto';
    if(quality){
        options.quality=quality;
    }
    console.log(file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, email, tag } = req.body;
        console.log(name, email, tag);
        const file = req.files.imageFile;
        console.log('File details', file);
        const format = file.name.split('.').pop().toLowerCase();

        const supportedFormats = ['jpg', 'png', 'jpeg', 'gif'];

        if (!isSupportedFormats(format, supportedFormats)) {
            console.log('Unsupported file format');
            return res.status(400).json({
                success: false,
                message: 'Unsupported file format'
            });
        }

        const response = await UploadToCloudaniry(file, 'Fileupload');

        const fileData = await File.create({
            name,
            email,
            tag,
            imageUrl: response.secure_url
        });

        res.send({
            success: true,
            message: 'File uploaded successfully',
            file: fileData
        });

    } catch (err) {
        console.log("come to error section");
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'File upload failed'
        });
    }
};

exports.videoupload = async (req, res) => {
    try{
        const {name,email,tag}=req.body;
        const video=req.files.videoFile;

        const format=video.name.split('.').pop().toLowerCase();
        const supportedFormats=['mp4','avi','mkv','mov'];

        if(!isSupportedFormats(format,supportedFormats)){
            return res.status(400).json({
                success:false,
                message:'Unsupported file format'
            });
        }

        const response=await UploadToCloudaniry(video,'Fileupload');

        const fileData=await File.create({
            name,
            email,
            tag,
            imageUrl:response.secure_url
        });

        res.send({
            success:true,
            message:'File uploaded successfully',
            file:fileData
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'File upload failed'
        })
    }
}

exports.imagereducerupload =async (req,res)=>{
    try{
        const {name,email,tag}=req.body;
        const image=req.files.imageFile;

        const format=image.name.split('.').pop().toLowerCase();
        const supportedFormats=['jpg','jpeg','png','gif'];

        if(!isSupportedFormats(format,supportedFormats)){
            return res.status(400).json({
                success:false,
                message:'Unsupported file format'
            });
        }

        const response=await UploadToCloudaniry(image,'Fileupload',50);

        const fileData=await File.create({
            name,
            email,
            tag,
            imageUrl:response.secure_url
        });

        res.send({
            success:true,
            message:'File uploaded successfully',
            file:fileData
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'File upload failed'
        })
    }
}