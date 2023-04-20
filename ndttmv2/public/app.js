

const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const userDetails = document.getElementById('userDetails');
const inputData = document.getElementById('inputData');
const dataTable = document.getElementById('dataTable');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const inputDataBt = document.getElementById('inputDataBt');
const dataTableBt = document.getElementById('dataTableBt');
const homeBt = document.getElementById('homeBt');
const provider = new firebase.auth.GoogleAuthProvider();

///// Firestore /////
const db = firebase.firestore();
const saveBt = document.getElementById('saveBt');
const userlist = document.getElementById('userlist');

let thingsRef;
let unsubscribe;

/// Sign in event handlers

signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();
inputDataBt.onclick = () => showInput();

dataTableBt.onclick = () => showData();

homeBt.onclick = () => showHome();

function showInput(){
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = true;
    inputData.hidden=false;
    homeBt.hidden=false;

}

function showData(){
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = true;
    dataTable.hidden=false;
    homeBt.hidden=false;
    
}

function showHome(){
    whenSignedIn.hidden = false;
    inputData.hidden=true;
    dataTable.hidden=true;
    homeBt.hidden=true;
}

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        signOutBtn.hidden=false;
        homeBt.hidden=true;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
        homeBt.hidden=true;
        signOutBtn.hidden=true;
        
    }
});

auth.onAuthStateChanged(user => {
    if (user) {
    // Database Reference
    thingsRef = db.collection('usersdata')

    saveBt.onclick = () => {
        const name = String(document.getElementById("name").value);
        const surname = String(document.getElementById("surname").value);
        const age = String(document.getElementById("age").value);
        const height = String(document.getElementById("height").value);
        const weight = String(document.getElementById("weight").value);
        const { serverTimestamp } = firebase.firestore.FieldValue;

        thingsRef.add({
            uid: user.uid,
            name: name,
            surname: surname,
            age: age,
            height: height,
            weight: weight,
            createdAt: serverTimestamp()
        });
        alert("Save Successfully!");
    }    
        
        // Query
            unsubscribe = thingsRef
                .where('uid', '==', user.uid)
                .orderBy('createdAt') // Requires a query
                .onSnapshot(querySnapshot => {
                    
                    // Map results to an array of li elements
                    let index=0;
                    const items = querySnapshot.docs.map(doc => {
                        index++;
                        return `<li><pre>No.${index}    Name: ${doc.data().name}    Surname: ${doc.data().surname}  Age: ${doc.data().age}  Height: ${doc.data().height}  Weight: ${doc.data().weight}</pre></li>`
                        
                    });
                    
                    userlist.innerHTML = items.join('');
                    
                });
    } else {
        unsubscribe && unsubscribe();
    }
});



