const form = document.getElementById("form");
const fullnameInput = document.getElementById("fullname");
const leaveTypeInput = document.getElementById("leaveType");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const reasonInput = document.getElementById("reason");
const phoneInput = document.getElementById("phone");
const yourEmailInput = document.getElementById("yourEmail");
const managerEmailInput = document.getElementById("managerEmail");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    fullname: fullnameInput.value,
    leaveType: leaveTypeInput.value,
    startDate: startDateInput.value,
    endDate: endDateInput.value,
    reason: reasonInput.value,
    phone: phoneInput.value,
    employeeEmail: yourEmailInput.value,
    managerEmail: managerEmailInput.value,
  };

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const today = new Date();
  const phoneRegex = /^(\+91[\-\s]?)?[0]?[6-9]\d{9}$/;

  if (data.fullname.length < 3)
    alertBox("Full name must be at least 3 characters long.");
  else if (!data.leaveType) alertBox("Please select a leave type.");
  else if (startDate < today) alertBox("Start Date cannot be before today.");
  else if (startDate > endDate)
    alertBox("Start Date cannot be after End Date.");
  else if (!data.reason || data.reason.trim() === "")
    alertBox("Please provide a valid reason for your leave request.");
  else if (!phoneRegex.test(data.phone))
    alertBox("Please enter a valid phone number (e.g. +91 9876543210).");
  else {
    console.log("Data: ", data);
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbyfjHzLgtDCmL1pI8LLZLHAd6QQ8QUnB6mpyGvrNsonLTtWmYfKPMMmogAZEMFPZB0x/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      }
    );
    const resData = await res.json();
    console.log("Res: ", resData);
  }
});

function alertBox(msg) {
  alert(msg);
  return;
}
