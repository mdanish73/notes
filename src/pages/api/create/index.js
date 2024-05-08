// createNote.js
import dbConnect from "@/config/dbConnect";

async function createNote (req, res) {
    await dbConnect();

    delete require.cache[require.resolve("@/models/NotesModel")];
    const notesModel = require("@/models/NotesModel").default;

    try {
        const note = await notesModel.create(req.body);
        res.json({
            success: true,
            message: "Note created successfully",
            data: note
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

export default createNote;
