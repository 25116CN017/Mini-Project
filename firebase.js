// =====================================================
// FIREBASE HELPER (Auth + Firestore)
// Users ka data Firestore mein "users/{uid}" document mein save hota hai.
// =====================================================
const Cloud = (function () {

    const configured =
        typeof firebase !== "undefined" &&
        typeof firebaseConfig !== "undefined" &&
        firebaseConfig.apiKey &&
        firebaseConfig.apiKey.indexOf("YOUR_") !== 0;

    if (!configured) {
        console.warn("Firebase not configured. Fill in firebase-config.js");
        return { enabled: false };
    }

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    let saveTimer = null;
    let pending = null;

    function userDoc(uid) {
        return db.collection("users").doc(uid);
    }

    async function signUp(name, email, password) {
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        await cred.user.updateProfile({ displayName: name });
        await userDoc(cred.user.uid).set({
            name: name,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        return cred.user;
    }

    async function logIn(email, password) {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        return cred.user;
    }

    async function resetPassword(email) {
        await auth.sendPasswordResetEmail(email);
    }

    async function logOut() {
        await flush();
        await auth.signOut();
    }

    // Calls cb(user, profile) on login / logout / page reload
    function onAuth(cb) {
        auth.onAuthStateChanged(async function (user) {
            if (!user) { cb(null, null); return; }
            let profile = null;
            try {
                const snap = await userDoc(user.uid).get();
                profile = snap.exists ? snap.data() : null;
            } catch (err) {
                console.error("Could not load profile:", err);
            }
            cb(user, profile);
        });
    }

    // Debounced save so rapid clicks make only one write
    function save(data) {
        pending = data;
        clearTimeout(saveTimer);
        saveTimer = setTimeout(flush, 800);
    }

    async function flush() {
        clearTimeout(saveTimer);
        const user = auth.currentUser;
        if (!pending || !user) return;
        const data = pending;
        pending = null;
        try {
            await userDoc(user.uid).set(Object.assign({}, data, {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }), { merge: true });
        } catch (err) {
            console.error("Save failed:", err);
        }
    }

    return {
        enabled: true,
        signUp: signUp,
        logIn: logIn,
        logOut: logOut,
        resetPassword: resetPassword,
        onAuth: onAuth,
        save: save
    };

})();
