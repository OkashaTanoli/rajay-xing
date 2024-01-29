import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
    type: String,
    name: { type: String, text: true },
    fName: { type: String, text: true },
    cnic: String,
    address: String,
    dateTimeOut: Date,
    dateTimeIn: Date,

    // Fields specific to 'local' type
    vehsType: String,
    accompanyingFamilyMembersName: String,
    cnicOfFamilyMembers: String,
    relation: String,
    guestName: String,
    cnicOfGuest: String,
    addressOfGuest: String,
    childrenNos: String,

    // Fields specific to 'fuelTrade' type
    driverName: String,
    secondSeater: String,
    chassisNumber: String,
    engineNumber: String,
    regnNo: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.models.Entry || mongoose.model('Entry', entrySchema);
