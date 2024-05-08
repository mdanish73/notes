import dbConnect from '@/config/dbConnect';
import NotesModel from '@/models/NotesModel';

export default async function handler(req, res) {
    await dbConnect();
    
    try {
        const notes = await NotesModel.find();
        res.status(200).json({
            success: true,
            data: notes 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}