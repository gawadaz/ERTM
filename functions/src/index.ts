import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { user } from 'firebase-functions/lib/providers/auth';
const corsHandler = cors({origin: true});

admin.initializeApp();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const createUserProfile = functions.auth.user().onCreate((_user) => {
    const memberRef = admin.database().ref('users');
    memberRef.child(_user.uid).set({
        displayName: _user.email.split('@')[0],
        email: _user.email,
        phoneNumber: _user.phoneNumber || '',
        role: 'new'
    })
    .catch( error => {
        console.log('oncreate user profile error: ' + error);
    });
});


export const deleteUserProfile = functions.auth.user().onDelete( _user => {
    const memberRef = admin.database().ref('users');
    memberRef.child(_user.uid).remove()
    .catch( error => {
        console.log('onDelete user profile error: ' + error);
    });
});


export const countTotalelectors = functions.https.onRequest((request, response) => {

    const codesRef = admin.database().ref('codes');
    const countersRef = admin.database().ref('counters');

    codesRef.once('value', (electors) => {
        const total = electors.numChildren();
        countersRef.update({ 'total': total })
        .catch( (err) => {
            console.log('err: ' + err);
        });
    })
    .catch( (err) => {
        console.log('err: ' + err);
    });
    
});

export const countPotentialElectors = functions.https.onRequest((request, response) => {

    const codesRef = admin.database().ref('codes').orderByChild('Potential').equalTo('כן');    
    const countersRef = admin.database().ref('counters');
    let id = '';
    let voted = '';

    codesRef.once('value')
    .then( (data) => {
        const count = data.numChildren();
        countersRef.update({ 'potential': count })
        .then( () => {
            response.send('count: ' + data.numChildren());
        })
        .catch( () => {
            response.send('failed to update potential count');
        });
        
       // response.send('id: ' + id + ' isVoted: ' + data[0].Vote);
        // response.send('id: ' + id + ' isVoted: ' + voted + ' <br>\n ' +JSON.stringify(data));
    },
        (err) => {
            response.sendStatus(500);
        });
});

export const countVotedElectors = functions.https.onRequest((request, response) => {

    console.log('started at: ' + new Date());
    const codesRef = admin.database().ref('codes').orderByChild('Vote').equalTo('כן');
    // orderByChild("Vote").equalTo('כן');
    const countersRef = admin.database().ref('counters');

    codesRef.once('value')
    .then( (data) => {
        const count = data.numChildren();
        // console.log('data: ' + JSON.stringify(data));
        console.log('voted count: ' + count);
        countersRef.update({ 'voted': count })
        .then( () => {
            response.send('count: ' + data.numChildren());
        })
        .catch( () => {
            response.send('failed to update voted count');
        });
    })
    .catch( (err) => {
        console.log('err: ' + err);
    });
    
});


