import GalleryItem from "../models/galleryItem.js"


export function createGalleryItem(req,res){

    const user = req.body.user

    if(user == null){
        res.status(403).json({
            message:"Please login to create gallery item"
        })
        return
    }

    const galleryItem = req.body

    const newGalleryItem = new GalleryItem(galleryItem)
    newGalleryItem.save().then(
        ()=>{
            res.status(200).json({
                message:"Gallery item created successfully"
            })
        }
    ).catch(()=>{
        res.status(500).json({
            message:"Gallery item creation failed"
        })
    })
}

export function getGalleryItem(req,res){
    GalleryItem.find().then(
        (list)=>(
            res.json({
                list:list
            })
        )
    ).catch(
        ()=>(
            res.json({
                message:"couldn't find.."
            })
        )
    )
}