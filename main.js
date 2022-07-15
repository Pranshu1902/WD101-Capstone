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

// dob validator
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
function showEntries(event) {
  event.preventDefault();

  let entries = JSON.parse(localStorage.getItem("entries"));
  let output = document.getElementById("entries");
  if (entries) {
    let body = entries.map((entry, index) => {
      return `
      <div class="flex flex-col gap-4 justify-start items-start pt-6 pb-6">
      <p class="font-bold text-red-500 text-3xl">Entry ${index + 1}</p>
        <div class="flex">
            <p class="font-bold">Name:&nbsp;</p>
            <p>${entry.name}</p>
        </div>
        <div class="flex">
            <p class="font-bold">Email:&nbsp;</p>
            <p>${entry.email}</p>
        </div>
        <div class="flex">
            <p class="font-bold">Password:&nbsp;</p>
            <p>${entry.password}</p>
        </div>
        <div class="flex">
            <p class="font-bold">DOB:&nbsp;</p>
            <p>${entry.dob}</p>
        </div>
      </div>`;
    });
    output.innerHTML = body.join("\n");
  } else {
    output.innerHTML = "No entries";
  }
}

// button to show entries
const showEntriesBtn = document.getElementById("showEntries");
showEntriesBtn.addEventListener("click", showEntries, true);
