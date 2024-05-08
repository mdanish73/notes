import dbConnect from "@/config/dbConnect";
import NotesModel from "@/models/NotesModel";

export default async function handler(req, res) {
    await dbConnect();

    try {
        const deleteNote = await NotesModel.findByIdAndDelete(req.query.id);
        res.status(200).json({
            success: true,
            message: "Note deleted successfully..."
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}