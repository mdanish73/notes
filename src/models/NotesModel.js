import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const NotesModel = mongoose.models.Note || mongoose.model('Note', notesSchema);
export default NotesModel;