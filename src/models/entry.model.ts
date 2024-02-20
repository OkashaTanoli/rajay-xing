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
    destination:String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

entrySchema.pre('save', function(next) {
    const offset = new Date().getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const localISOTime = (offset:any) => new Date(Date.now() - offset).toISOString();
  
    if (this.isNew) {
      this.createdAt = localISOTime(offset) as any;
    }
    this.updatedAt = localISOTime(offset) as any;
    next();
  });

export default mongoose.models.Entry || mongoose.model('Entry', entrySchema);
