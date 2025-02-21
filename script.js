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
      window.location.href = 'overview.html'; // If you want to redirect
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

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', event => {
    const section = event.target.getAttribute('data-section');
    document.querySelectorAll('.metric-card').forEach(card => {
      card.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';
    if (section === 'logout') {
      sessionStorage.clear();
    }
  });
});

function showSection(sectionId) {
  document.querySelectorAll('.metric-card').forEach(card => {
    card.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';

  // Update active state for navigation items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === sectionId) {
      item.classList.add('active');
    }
  });
}

// Initialize default view
showSection('overview');

const paypalCreateOrder = window.firebase.functions().httpsCallable("paypalCreateOrder");
const paypalHandleOrder = window.firebase.functions().httpsCallable("paypalHandleOrder");

window.paypal.Buttons({
  createOrder: (data, actions) => paypalCreateOrder().then(response => response.data.id),

  onApprove: (data, actions) => {
    paypalHandleOrder({ orderId: data.orderID })
    alert("THANKS FOR ORDERING!")
  }

}).render('#paypal-button')