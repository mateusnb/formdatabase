const CLIENT_ID = 'https://console.cloud.google.com/apis/credentials/oauthclient/386170651254-0s4d8cdi1hojknjq3l2pfrpgf0n5hegv.apps.googleusercontent.com?project=getanalytica-3789d';
const API_KEY = 'AIzaSyA9q8sgsCkY5BlWc5-fbGgqi3fVtUwpYMk';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        // User is signed in
        document.getElementById('authorize-button').style.display = 'none';
        document.getElementById('send-button').style.display = 'block';
    } else {
        // User is not signed in
        document.getElementById('authorize-button').style.display = 'block';
        document.getElementById('send-button').style.display = 'none';
    }
}

function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

function sendEmail() {
    const body = document.getElementById('email-body').value;
    const raw = makeEmail('your_email@gmail.com', 'recipient@example.com', 'Test Subject', body);
    gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': btoa(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
        }
    }).then(response => {
        console.log('Email sent:', response);
        alert('Email sent successfully!');
    }).catch(error => {
        console.error('Error sending email:', error);
        alert('Error sending email. Please check the console for details.');
    });
}

function makeEmail(sender, to, subject, message) {
    const email = [
        `From: ${sender}\r\n`,
        `To: ${to}\r\n`,
        `Subject: ${subject}\r\n\r\n`,
        `${message}\r\n`
    ].join('');
    return email;
}
