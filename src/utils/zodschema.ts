import { z } from 'zod'

function camelCaseToWords(str:string) {
    return str
      // Insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // Make the first character uppercase
      .replace(/^./, function(str){ return str.toUpperCase(); })
  }

export const signUpSchema = z.object({
    name: z.string().min(1, "Name is required").max(20, "User name can not be more than 20 letters"),
    email: z.string().min(1, "Email is required").email({ message: "Must be a valid email" }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.string().min(1, "Role is required")
})

export const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email({ message: "Must be a valid email" }),
    password: z.string().min(1, "Password is required")
})


// export const formSchema = z.object({
//     type: z.string().default('local'),
//     name: z.string().min(1, 'required'),
//     fName: z.string().min(1, 'required'),
//     cnic: z.string().min(1, 'required'),
//     address: z.string().min(1, 'required'),
//     // dateTimeOut: z.string(),
//     // dateTimeIn: z.string(),

//     // Fields specific to 'local' type
//     vehsType: z.string().optional(),
//     accompanyingFamilyMembersName: z.string().optional(),
//     cnicOfFamilyMembers: z.string().optional(),
//     relation: z.string().optional(),
//     guestName: z.string().optional(),
//     cnicOfGuest: z.string().optional(),
//     addressOfGuest: z.string().optional(),
//     childrenNos: z.string().optional(),

//     // Fields specific to 'fuelTrade' type
//     driverName: z.string().optional(),
//     secondSeater: z.string().optional(),
//     chassisNumber: z.string().optional(),
//     engineNumber: z.string().optional(),
//     regnNo: z.string().optional(),
// })


export const formSchema = z.object({
    type: z.string(),
    name: z.string().min(1, 'Name is required'),
    fName: z.string().min(1, 'Father\'s name is required'),
    cnic: z.string().min(1, 'CNIC is required'),
    address: z.string().min(1, 'Address is required'),

    // Optional fields
    vehsType: z.string().optional(),
    accompanyingFamilyMembersName: z.string().optional(),
    cnicOfFamilyMembers: z.string().optional(),
    relation: z.string().optional(),
    guestName: z.string().optional(),
    cnicOfGuest: z.string().optional(),
    addressOfGuest: z.string().optional(),
    childrenNos: z.string().optional(),
    driverName: z.string().optional(),
    secondSeater: z.string().optional(),
    chassisNumber: z.string().optional(),
    engineNumber: z.string().optional(),
    regnNo: z.string().optional(),
    destination: z.string().optional(),
})
// .superRefine((data: any, ctx) => {
//     let isValid = true;

//     if (data.type === 'local') {
//         // List all fields that are required for 'local' type
//         const requiredFieldsForLocal = ['vehsType', 'accompanyingFamilyMembersName', 'cnicOfFamilyMembers', 'relation', 'guestName', 'cnicOfGuest', 'addressOfGuest', 'childrenNos'];
//         requiredFieldsForLocal.forEach(field => {
//             if (!data[field]) {
//                 ctx.addIssue({
//                     code: 'custom',
//                     path: [field],
//                     message: `${camelCaseToWords(field)} is required`,
//                 });
//                 isValid = false;
//             }
//         });
//     } else if (data.type === 'fuelTrade') {
//         // List all fields that are required for 'fuelTrade' type
//         const requiredFieldsForFuelTrade = ['driverName', 'secondSeater', 'chassisNumber', 'engineNumber', 'regnNo'];
//         requiredFieldsForFuelTrade.forEach(field => {
//             if (!data[field]) {
//                 ctx.addIssue({
//                     code: 'custom',
//                     path: [field],
//                     message: `${camelCaseToWords(field)} is required`,
//                 });
//                 isValid = false;
//             }
//         });
//     }

//     return isValid;
// });


export const tokenSchema = z.object({
    type: z.string(),
    name: z.string(),
    driverName: z.string(),
    cnic: z.string(),
    regnNo: z.string()
})



export type ISignUpSchema = z.infer<typeof signUpSchema>
export type ISignInSchema = z.infer<typeof signInSchema>
export type IFormSchema = z.infer<typeof formSchema>
export type ITokenSchema = z.infer<typeof tokenSchema>
