# 📌 Smart Leave Management System

### 📝 Overview

Ye project ek **automated leave management system** hai jo **Google Apps Script**, **Google Sheets**, aur **vanilla JavaScript (frontend form)** ka use karta hai.  
System employees ke leave requests ko **Google Sheet mai store** karta hai, aur manager ko email ke through **Accept/Reject buttons** ke saath notify karta hai.

---

## 🚀 Features

- **Employee Leave Request Form**

  - Employee apna naam, leave type, start & end date, reason, phone number, aur email fill karta hai.
  - Proper **form validation** (dates, phone number format, minimum name length, etc.) implemented.

- **Google Sheets Integration**

  - Saare leave requests automatically ek connected Google Sheet mai store hote hain.
  - Har request ka ek unique row ID hota hai jo tracking aur action ke liye use hota hai.

- **Email Notifications with Action Buttons**

  - Manager ko email aata hai with full leave details.
  - Email mai hi **✅ Accept** aur **❌ Reject** buttons hote hain.
  - Button click karte hi status Sheet mai update ho jata hai.

- **Automated Status Update**

  - Manager ke action se Google Sheet ke 9th column mai status **Pending → Accepted/Rejected** ho jata hai.
  - Employee ko bhi automatic email send hota hai updated status ke saath.

- **Error Handling & Validation**
  - Invalid inputs ke liye **alerts** show hote hain.
  - Backend mai try–catch blocks ensure karte hain ki API error pe bhi JSON response mile.

---

## ⚡ Challenges Solved

- **Automated Workflow** – Manual tracking hata diya, pura process employee → manager → system automated ho gaya.
- **Secure Email Action Links** – Manager ke email se hi leave approve/reject kiya ja sakta hai without opening the sheet.
- **Real-Time Updates** – Sheet aur email dono sync rehte hain, koi manual refresh ki zarurat nahi.
- **Validation Issues** – Dates aur phone number format check karke galat requests prevent kiye gaye.
- **Scalability** – Multiple employees ek saath request bhej sakte hain aur system sab handle karega.

---

## 🔄 Automation Highlights

- **Google Apps Script Web App** backend ke tarah kaam karta hai.
- **POST request** se leave request sheet mai save hota hai aur manager ko email jata hai.
- **GET request (Accept/Reject link)** se directly status update hota hai aur employee notify hota hai.
- Pure process fully automated hai — **no manual intervention needed**.

---
