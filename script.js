function submitRegistration() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    referralCode = document.getElementById('referralCode').value;

    // Validate input fields
    if (firstName === '' || lastName === '' || email === '' || password === '') {
        alert('Please fill in all required fields.');
        return;
    }

    // Perform registration logic here, including sending data to the backend
    fetch('http://localhost:8082/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
            ReferralCode: referralCode,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('User registered:', data);
            // Clear input fields
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('referralCode').value = '';
            // After registration, show the donation form
            document.getElementById('user-registration').style.display = 'none';
            // document.getElementById('donation-form').style.display = 'block';
            document.getElementById('login-form').style.display = 'block';
        })
        .catch(error => {
            console.error('Error registering user:', error);
            alert('Registration failed. Please try again.');
        });
}

function submitLogin() {
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Validate input fields
    if (loginEmail === '' || loginPassword === '') {
        alert('Please fill in all required fields.');
        return;
    }

    // Perform login logic here, including sending data to the backend
    fetch('http://localhost:8082/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Email: loginEmail,
            Password: loginPassword,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('User logged in:', data);
            // Clear input fields
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
            // After login, show user information and donation form
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('donation-form').style.display = 'block';
            document.getElementById("advice").style.display="block";
            document.getElementById("refferal_Id").style.display="block";
            document.getElementById("advice").innerText=
            `Dear ${data.FirstName} Please make Payment First Through Scaning QR Code or given UPI ID Then Put the Transaction Id in below Form and Submit Donation`
            document.getElementById("refferal_Id").innerText=`
             YOUR REFFERAL CODE : ${data.FirstName}+${data.UserID}`
            alert(`Welcome, ${data.FirstName} (ID: ${data.UserID})`);
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Login failed. Please check your credentials and try again.');
        });
}

function submitDonation() {
    const donationAmount = document.getElementById('donationAmount').value;
    const transactionID = document.getElementById('TransactionID').value;

    // Validate input fields
    if (donationAmount === '' || transactionID === '') {
        alert('Please fill in all required fields.');
        return;
    }

    // Perform donation submission logic here, including sending data to the backend
    fetch('http://localhost:8082/donations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            UserID: 1, // Replace with the actual UserID from the registration response
            DonationAmount: donationAmount,
            TransactionID: transactionID,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Donation submitted:', data);
            // Clear input fields
            document.getElementById('donationAmount').value = '';
            document.getElementById('TransactionID').value = '';
            alert(`Donation of $${donationAmount} submitted successfully!`);
        })
        .catch(error => {
            console.error('Error submitting donation:', error);
            alert('Donation failed. Please try again.');
        });
}

const login_btn=document.querySelector("#login_btn");
login_btn.addEventListener("click",()=>{
    document.getElementById('user-registration').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

const sign_btn=document.querySelector("#sign_btn");
sign_btn.addEventListener("click",()=>{
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('user-registration').style.display = 'block';
    
});