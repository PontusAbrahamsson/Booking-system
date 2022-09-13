const { getAuth } = require('firebase-admin/auth');
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { app } = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.addBusinessAccount = functions.https.onCall(async (data, context) => {
  //Get user and add custom claim (businessAccount = true)
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      businessAccount: true
    });
  }).then(() => {
    return {
      message: `Lyckades! ${data.email}`
    }
  }).catch((error) => {
    return error
  })
});

exports.addDefaultUser = functions.https.onCall(async (data, context) => {
  //Get user and add custom claim (businessAccount = true)
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      defaultUser: true
    });
  }).then(() => {
    return {
      message: `Lyckades! ${data.email}`
    }
  }).catch((error) => {
    return error
  })
});

// exports.addDefaultUser = functions.auth.user().onCreate(async (user) => {
//   if (user.email) {
//     const customClaims = {
//       defaultUser: true
//     };
//     try {
//       await getAuth().setCustomUserClaims(user.uid, customClaims);

//     } catch (error) {
//       console.log(error)
//     }
//   }
// });
