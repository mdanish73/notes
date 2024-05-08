import dbConnect from "@/config/dbConnect";
import NotesModel from "@/models/NotesModel";

export default async function handler(req, res) {
    await dbConnect();
    
    try {
        const note = await NotesModel.findById(req.query.id);
        res.status(200).json({
            success: true,
            data: note 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}