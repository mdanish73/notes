import dbConnect from "@/config/dbConnect";
import NotesModel from "@/models/NotesModel";

export default async function handler (req, res) {
    await dbConnect();

    try {
        const { id } = req.query;
        const updateNote = await NotesModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ 
            success: true, 
            message: updateNote 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}