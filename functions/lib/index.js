"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const corsHandler = cors({ origin: true });
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.countTotalelectors = functions.https.onRequest((request, response) => {
    const codesRef = admin.database().ref('codes');
    const countersRef = admin.database().ref('counters');
    codesRef.once('value', (electors) => {
        const total = electors.numChildren();
        countersRef.update({ 'total': total })
            .catch((err) => {
            console.log('err: ' + err);
        });
    })
        .catch((err) => {
        console.log('err: ' + err);
    });
});
exports.countPotentialElectors = functions.https.onRequest((request, response) => {
    const codesRef = admin.database().ref('codes').orderByChild('Potential').equalTo('כן');
    const countersRef = admin.database().ref('counters');
    let id = '';
    let voted = '';
    codesRef.once('value')
        .then((data) => {
        const count = data.numChildren();
        countersRef.update({ 'potential': count })
            .then(() => {
            response.send('count: ' + data.numChildren());
        })
            .catch(() => {
            response.send('failed to update potential count');
        });
        // response.send('id: ' + id + ' isVoted: ' + data[0].Vote);
        // response.send('id: ' + id + ' isVoted: ' + voted + ' <br>\n ' +JSON.stringify(data));
    }, (err) => {
        response.sendStatus(500);
    });
});
exports.countVotedElectors = functions.https.onRequest((request, response) => {
    console.log('started at: ' + new Date());
    const codesRef = admin.database().ref('codes').orderByChild('Vote').equalTo('כן');
    // orderByChild("Vote").equalTo('כן');
    const countersRef = admin.database().ref('counters');
    codesRef.once('value')
        .then((data) => {
        const count = data.numChildren();
        // console.log('data: ' + JSON.stringify(data));
        console.log('voted count: ' + count);
        countersRef.update({ 'voted': count })
            .then(() => {
            response.send('count: ' + data.numChildren());
        })
            .catch(() => {
            response.send('failed to update voted count');
        });
    })
        .catch((err) => {
        console.log('err: ' + err);
    });
});
//# sourceMappingURL=index.js.map