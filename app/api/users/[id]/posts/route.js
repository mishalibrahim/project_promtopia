import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (request,{params}) =>{
    console.log('connect')
    try{
        console.log('connecting to db')
        await connectToDB();
        console.log('connected to db')
        const prompts = await Prompt.find({creator:params.id}).populate('creator');
        return new Response(JSON.stringify(prompts),{status:200});
    }catch(error){
        return new Response('Failed to fetch all products',{status :500})
    }  
}