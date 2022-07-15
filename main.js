const saveData = (data) => {
  if (localStorage.getItem("entries")) {
    let entries = JSON.parse(localStorage.getItem("entries"));
    entries.push(data);
    localStorage.setItem("entries", JSON.stringify(entries));
  } else {
    let entries = [];
    entries.push(data);
    localStorage.setItem("entries", JSON.stringify(entries));
  }
};

// validator
function validator(event) {
  event.preventDefault();

  // form fields
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const accept = document.getElementById("acceptTerms");

  const year = Number(dob.substring(0, 4));

  // validation and error handling
  let errorMessage = [];

  if (2022 - year < 18) {
    errorMessage.push("You must be 18 years or older to register.");
  }
  if (2022 - year > 55) {
    errorMessage.push("You must be 55 years or younger to register.");
  }
  if (accept.checked === false) {
    errorMessage.push("You must accept the terms and conditions.");
  }
  if (password.length < 8) {
    errorMessage.push("Password must be at least 8 characters long.");
  }
  if (name.length === 0) {
    errorMessage.push("Name cannot be empty.");
  }

  let error = "";

  if (errorMessage.length === 0) {
    saveData({
      name: name,
      email: email,
      password: password,
      dob: dob,
      accept: accept,
    });
    error = "";
    alert("Data saved successfully");
  } else {
    error = errorMessage.join("<br>");
  }
  document.getElementById("error").innerHTML = error;
}

// form
let form = document.getElementById("form");
form.addEventListener("submit", validator, true);

//show entries
function showEntriesInTable(event) {
  event.preventDefault();

  let entries = JSON.parse(localStorage.getItem("entries"));
  let output = document.getElementById("table");

  // clearing the table
  var rowCount = output.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    output.deleteRow(i);
  }

  // add entries to table
  if (entries) {
    entries.forEach((entry, index) => {
      let row = output.insertRow(index + 1);
      let t1 = row.insertCell(0);
      t1.innerHTML = `<td>${index + 1}</td>`;
      let t2 = row.insertCell(1);
      t2.innerHTML = `<td>${entry.name}</td>`;
      let t3 = row.insertCell(2);
      t3.innerHTML = `<td>${entry.email}</td>`;
      let t4 = row.insertCell(3);
      t4.innerHTML = `<td>${entry.password}</td>`;
      let t5 = row.insertCell(4);
      t5.innerHTML = `<td>${entry.dob}</td>`;
    });
  } else {
    let row = output.insertRow(1);
    let t1 = row.insertCell(0);
    t1.innerHTML = `<td>No entries</td>`;
    t1.classList.add("text-red-500");
  }
}

// button to show entries
const showEntriesBtn = document.getElementById("showEntries");
showEntriesBtn.addEventListener("click", showEntriesInTable, true);
