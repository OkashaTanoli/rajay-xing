import mongoose from 'mongoose';
import User from '@/models/user.model'
import Entry from '@/models/entry.model'

const tokenSchema = new mongoose.Schema({
    type: String,
    name: String,
    cnic: String,
    driverName: String,
    image: String,
    regnNo: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    entry: { type: mongoose.Schema.Types.ObjectId, ref: Entry, required: true }
}, { timestamps: true });

export default mongoose.models.Token || mongoose.model('Token', tokenSchema);
