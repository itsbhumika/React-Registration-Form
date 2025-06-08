# 📝 React Form Validation Application

## 📌 Project Summary

This React application implements a user registration form featuring comprehensive **client-side validation**. It ensures that all required fields meet their validation criteria **without relying on external libraries**.

### ✅ Key Functionalities
- Real-time validation feedback displayed upon user interaction.
- Submit button activation **only when all inputs are valid**.
- Redirects to a confirmation page displaying submitted information after successful submission.

## 🌟 Key Features

### 🧾 Form Fields
- First Name
- Last Name
- Username
- Email Address
- Password (includes show/hide toggle and strength meter)
- Phone Number (with country code selector)
- Country (dropdown menu)
- City (dropdown filtered based on selected country)
- PAN Number (with format validation)
- Aadhar Number (12-digit format with optional spaces)

### 🛡️ Validation Details
- Validation triggers after user interaction with each field.
- Mandatory fields enforce non-empty values.
- Format checks for:
  - **Email**
  - **PAN**
  - **Aadhar**
  - **Phone number length**
- Password strength is evaluated and communicated to the user.
- Submit button remains disabled until the entire form is valid.

### 🔁 Navigation Flow
- Upon form submission, user data is presented on a dedicated confirmation page (e.g., `/success`).

## ⚙️ Technologies Employed
- **React** (functional components leveraging hooks)
- **React Router** for client-side routing
- **CSS** for styling (without using third-party style libraries)

## 🛠️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm start
   ```

4. Open your browser and navigate to:  
   👉 [http://localhost:3000](http://localhost:3000)

## 📁 Codebase Structure

```
src/
│
├── App.js            # Routing configuration
├── Form.js           # Main form component
├── Form.css          # Styles for form and validation
├── Submitted.js      # Displays submitted data
├── Success.css       # Styles for the success page
└── index.js          # React app entry point
```

## 🔮 Potential Enhancements

- Integrate backend services for data submission and persistence.
- Add asynchronous validation (e.g., check if username is already taken).
- Improve UI with advanced styling and interactive animations.
- Add multi-language support via localization.

## ✍️ Author

**Bhumika**
