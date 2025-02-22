var firebaseConfig = {
    apiKey: "AIzaSyB-MtbsHu9_dEGQkEo3Y46rxgIeg5vhfR8",
    authDomain: "fir-a5ed4.firebaseapp.com",
    databaseURL: "https://fir-a5ed4-default-rtdb.firebaseio.com",
    projectId: "fir-a5ed4",
    storageBucket: "fir-a5ed4.firebasestorage.app",
    messagingSenderId: "30349602179",
    appId: "1:30349602179:web:6f2ea8b2efaf20a74a9ab6"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', validateLogin);
  });
  
  function validateLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Successfully signed in
        var user = userCredential.user;
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        window.location.href = '../overview/overview.html'; // If you want to redirect
      })
      .catch(() => {
        alert('Invalid Email or Password. Please try again.');
      });
  }
  
  const reset = document.getElementById("resetpass");
  reset.addEventListener("click", passwordset);
  
  function passwordset(event) {
    event.preventDefault()
    const email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("The email has been sent. Please check your inbox")
      })
      .catch(() => {
        alert('Invalid Email. Please try again.');
      });
  }