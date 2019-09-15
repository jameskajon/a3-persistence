function submit(e, url, dataParser, handelResponse) {
    console.log(e, url, dataParser, handelResponse);
    e.preventDefault();  // prevent url form submission

    const data = JSON.stringify(dataParser());
    console.log("sending: ", data);

    let request = new Request(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(request);

    fetch(request)
        .then((resp) => resp.json())
        .then(function( data ) {
            // do something with the response
            console.log( data );
            handelResponse(data);
        })
        .catch(function (error) {
            console.log( error );
        });
    console.log('done submitting');
    return false;
}



// add model submit button events and model activation events
window.onload = function() {
    const submitUrl = '/submit/create';
    const submitAuthSignInUrl = '/auth/sign-in';
    const submitAuthSignUpUrl = '/auth/sign-up';
    // bind sign in and sign up events
    document.getElementById("signInSubmitBtn").onclick = ((e) => submit(e, submitAuthSignInUrl, parseSignInForm, handelSignInResponse));
    document.getElementById("signUpSubmitBtn").onclick = ((e) => submit(e, submitAuthSignUpUrl, parseSignUpForm, handelSignUpResponse));
    // bind page specific events
    if (document.getElementById("addThreadSubmitBtn")) {
        // if on index
        document.getElementById("addThreadSubmitBtn").onclick = ((e) => submit(e, submitUrl, parseAddThreadForm, handelAddThreadResponse));
    } else {
        // if on forum page
        document.getElementById("addSubmitBtn").onclick = ((e) => submit(e, submitUrl, parseAddForm, handelAddResponse));
        document.getElementById("deleteSubmitBtn").onclick = ((e) => submit(e, submitUrl, parseDeleteForm, handelDeleteResponse));
        document.getElementById("editSubmitBtn").onclick = ((e) => submit(e, submitUrl, parseEditForm, handelEditResponse));
        // transfer data from button press to forum
        for (let addBtn of document.getElementsByClassName('add-btn')) {
            addBtn.onclick = addClick;
        }
        for (let deleteBtn of document.getElementsByClassName('delete-btn')) {
            deleteBtn.onclick = deleteClick;
        }
        for (let editBtn of document.getElementsByClassName('edit-btn')) {
            editBtn.onclick = editClick;
        }
    }
};


// Track current message and forum id so that info can be sent to the backend on a post

let curMessageId;
let curForumId;
function addClick(btn) {
    curForumId = btn.target.dataset.forumid;
}
function deleteClick(btn) {
    let link = btn.target.parentElement;
    curMessageId = link.dataset.messageid;
    curForumId = document.querySelector('.add-btn').dataset.forumid;
}
function editClick(btn) {
    let link = btn.target.parentElement;
    curMessageId = link.dataset.messageid;
    curForumId = document.querySelector('.add-btn').dataset.forumid;
    let curText = link.parentElement.parentElement.parentElement.lastElementChild.textContent.trim();
    let editMotelMessage = document.querySelector("#editFormModal textarea#message");
    console.log(curText);
    console.log(editMotelMessage);
    editMotelMessage.value = curText;
}


// CLOSE MODAL //

// will remove all modal backdrops
function closeModal(modal) {
    modal.querySelector('button.close').click();
    modal.querySelector('form').reset();
    // change state like in hidden modal
    // modal.classList.remove('show');
    // modal.setAttribute('aria-hidden', 'true');
    // modal.setAttribute('style', 'display: none');
    // modal.removeAttribute('aria-modal');
    //
    // // get modal backdrops
    // const modalsBackdrops = document.getElementsByClassName('modal-backdrop');
    //
    // // remove every modal backdrop
    // for(let i=0; i<modalsBackdrops.length; i++) {
    //     document.body.removeChild(modalsBackdrops[i]);
    // }
    //
    // document.body.removeAttribute('style');
    // document.body.classList.remove('modal-open');
}


// PARSE FORM //

function parseAddThreadForm() {
    console.log("ran parse add");
    return {
        action: "ADDTHREAD",
        title: document.getElementById("title").value,
        message: document.getElementById("message").value,
    }
}

function parseAddForm() {
    console.log("ran parse add");
    return {
        action: "ADD",
        forumId: curForumId,
        message: document.querySelector("#addFormModal textarea#message").value,
    }
}

function parseDeleteForm() {
    return {
        action: "DELETE",
        messageId: curMessageId,
        forumId: curForumId,
    }
}

function parseEditForm() {
    return {
        action: "EDIT",
        messageId: curMessageId,
        forumId: curForumId,
        message: document.querySelector("#editFormModal textarea#message").value,
    }
}

function parseSignInForm() {
    return {
        email: document.getElementById("sign-in-email").value,
        password: document.getElementById("sign-in-password").value,
    }
}

function parseSignUpForm() {
    return {
        name: document.getElementById("sign-up-name").value,
        email: document.getElementById("sign-up-email").value,
        password: document.getElementById("sign-up-password").value,
    }
}

function parseSignOutForm() {
    return {
        // name: document.getElementById("sign-up-name").value,
        // email: document.getElementById("sign-up-email").value,
        // password: document.getElementById("sign-up-password").value,
    }
}


// HANDEL RESPONSE //

function handelAddThreadResponse(data) {
    // change page to the new forum page
    if (data.forumId) {
        location = "/forum/" + data.forumId;
    } else {
        location.reload();
    }
}

function handelAddResponse(data) {
    // refresh the page to show added message
    location.reload();
}

function handelDeleteResponse(data) {
    // refresh the page to show the message was deleted
    location.reload();
}

function handelEditResponse(data) {
    // refresh the page to show the edited message
    location.reload();
}

function handelSignInResponse(data) {
    const modal = document.getElementById('signInFormModal');
    closeModal(modal);
}

function handelSignUpResponse(data) {
    const modal = document.getElementById('signUpFormModal');
    closeModal(modal);
}

function handelSignOutResponse(data) {
    console.log("logged out");
}



// FIREBASE AUTH //

// firebase initialized with the auth app in layout.hbs
// if (firebase === null) {
//     firebase = {};
// }
//
// function firebaseSignIn(token) {
//     firebase.auth().signInWithCustomToken(token).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//     });
// }
