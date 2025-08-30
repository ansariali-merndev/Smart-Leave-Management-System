var app = SpreadsheetApp;
var mySpreadSheet = app.openById(
  "1sNxV6iHN3CAVy2RZNKfCx2ST5MdQHFbA6NnkGMu6tcQ"
);
var mySheet = mySpreadSheet.getSheetByName("Sheet1");

function myfunc() {
  console.log(mySheet.getLastRow());
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    const id = parseInt(e.parameter.id);

    if (!id || !action) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    let status = "Pending";
    if (action === "accept") status = "Accepted";
    if (action === "reject") status = "Rejected";

    mySheet.getRange(id, 9).setValue(status);

    const employeeMail = mySheet.getRange(id, 7).getValue();

    const subject = "Employee Leave Request Updated";
    const body = `
      Dear ${mySheet.getRange(id, 1).getValue()}

      Your Leave Request has been updated


      status: ${status}

      Regards,  
      Leave Management System
    `;

    MailApp.sendEmail(employeeMail, subject, body);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, msg: "Status Updated Successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, msg: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const {
      fullname,
      leaveType,
      startDate,
      endDate,
      reason,
      phone,
      employeeEmail,
      managerEmail,
    } = data;

    mySheet.appendRow([
      fullname,
      leaveType,
      startDate,
      endDate,
      reason,
      phone,
      employeeEmail,
      managerEmail,
      "Pending",
    ]);

    const requestId = mySheet.getLastRow();

    let webUrl =
      "https://script.google.com/macros/s/AKfycbyfjHzLgtDCmL1pI8LLZLHAd6QQ8QUnB6mpyGvrNsonLTtWmYfKPMMmogAZEMFPZB0x/exec";

    const subject = `Leave Request: ${fullname} (${leaveType})`;

    const body = `
      <p>Dear Manager,</p>
      <p>You have received a new leave request from <b>${fullname}</b>. Below are the details:</p>

      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <tr><td><b>Employee</b></td><td>${fullname}</td></tr>
        <tr><td><b>Leave Type</b></td><td>${leaveType}</td></tr>
        <tr><td><b>Start Date</b></td><td>${startDate}</td></tr>
        <tr><td><b>End Date</b></td><td>${endDate}</td></tr>
        <tr><td><b>Reason</b></td><td>${reason}</td></tr>
        <tr><td><b>Phone</b></td><td>${phone}</td></tr>
        <tr><td><b>Employee Email</b></td><td>${employeeEmail}</td></tr>
      </table>

      <p>Please take action on this request:</p>

      <a href="${webUrl}?action=accept&id=${requestId}"
         style="display:inline-block;padding:10px 20px;margin:5px;
                background-color:#28a745;color:#fff;text-decoration:none;
                border-radius:5px;">✅ Accept</a>

      <a href="${webUrl}?action=reject&id=${requestId}"
         style="display:inline-block;padding:10px 20px;margin:5px;
                background-color:#dc3545;color:#fff;text-decoration:none;
                border-radius:5px;">❌ Reject</a>

      <p>Regards,<br>Leave Management System</p>
    `;

    MailApp.sendEmail({
      to: managerEmail,
      subject: subject,
      htmlBody: body,
    });

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, msg: "Your Request send successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, msg: err.message, stack: err })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
