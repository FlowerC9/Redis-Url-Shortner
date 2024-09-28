import express,{Request,Response} from 'express';
import { urlModel } from '../models/shortUrl';
import redisClient from '../config/redisConfig';
export const createUrl = async(req:Request,res:Response)=>{
    try {
        const {fullUrl}=req.body;
        const urlFound=await urlModel.find({fullUrl});
        if(urlFound.length>0){
            res.status(409).send(urlFound);
        }
        else{
            const shortUrl=await urlModel.create({fullUrl});
            await redisClient.setEx(shortUrl.shortUrl,3600,fullUrl);
            res.status(201).send(shortUrl);
        }
    } catch (error) {
        res.status(500).send({message:"Something went wrong"});
    }
}
export const getAllUrl = async(req:Request,res:Response)=>{
    try {
        const shortUrls = await urlModel.find().sort({createdAt:-1});
        if(shortUrls.length<0){
            res.status(404).send({
                message:"Short Urls not found!"
            })
        }
        else{
            res.status(200).send(shortUrls);
        }
    } catch (error) {
        res.status(500).send({message:"Something went wrong"});
    }
}
export const getUrl = async(req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const cachedUrl=await redisClient.get(id);
        if(cachedUrl){
            const clickCountKey = `clicks:${id}`;
            await redisClient.incr(clickCountKey);
            return res.redirect(cachedUrl);
        }
        const shortUrl= await urlModel.findOne({shortUrl:id});
        if(!shortUrl){
            res.status(404).send({message:"Full Url Not found"})
        }
        else{
            const clickCountKey = `clicks:${id}`;
            await redisClient.incr(clickCountKey);
            await redisClient.setEx(id, 3600, shortUrl.fullUrl);
            res.redirect(`${shortUrl.fullUrl}`)
        }
    } catch (error) {
        res.status(500).send({message:"Something went wrong"});
    }
}
export const deleteUrl = async(req:Request,res:Response)=>{
    try {
        const shortUrl= await urlModel.findByIdAndDelete({_id:req.params.id});
        if(shortUrl){
            await redisClient.del(shortUrl.shortUrl);
            res.status(200).send({message:"Requested Url Successfully deleted"})
        }
    } catch (error) {
        res.status(500).send({message:"Something went wrong"});
    }
}