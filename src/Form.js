import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[\W_]/.test(password)) strength++;

  if (strength <= 2) return "Weak";
  if (strength === 3 || strength === 4) return "Medium";
  if (strength === 5) return "Strong";
  return "";
}

const COUNTRY_OPTIONS = [
  { name: "India", code: "+91", phoneLength: 10 },
  { name: "USA", code: "+1", phoneLength: 10 },
  { name: "UK", code: "+44", phoneLength: 11 },
];

const CITY_OPTIONS = {
  India: ["Delhi", "Mumbai", "Bangalore", "Chennai"],
  USA: ["New York", "Los Angeles", "Chicago", "Houston"],
  UK: ["London", "Manchester", "Birmingham", "Liverpool"],
};

function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    countryCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const getSelectedCountry = (code = formData.countryCode) =>
    COUNTRY_OPTIONS.find((c) => c.code === code);

  const validate = (data = formData, touchedFields = touched) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const aadharDigits = data.aadharNo.replace(/\s/g, "");

    if (touchedFields.firstName) {
      if (!data.firstName.trim()) newErrors.firstName = "First Name is required";
    }

    if (touchedFields.lastName) {
      if (!data.lastName.trim()) newErrors.lastName = "Last Name is required";
    }

    if (touchedFields.username) {
      if (!data.username.trim()) newErrors.username = "Username is required";
    }

    if (touchedFields.email) {
      if (!data.email.trim()) newErrors.email = "Email is required";
      else if (!emailRegex.test(data.email)) newErrors.email = "Invalid email format";
    }

    if (touchedFields.password) {
      if (!data.password) newErrors.password = "Password is required";
      else if (data.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    }

    if (touchedFields.countryCode) {
      if (!data.countryCode) newErrors.countryCode = "Please select a country code";
    }

    if (touchedFields.phoneNumber) {
      const selected = COUNTRY_OPTIONS.find((c) => c.code === data.countryCode);
      if (!data.phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!/^\d+$/.test(data.phoneNumber)) {
        newErrors.phoneNumber = "Only digits are allowed";
      } else if (selected && data.phoneNumber.length !== selected.phoneLength) {
        newErrors.phoneNumber = `Must be exactly ${selected.phoneLength} digits for ${selected.name}`;
      }
    }

    if (touchedFields.country) {
      if (!data.country) newErrors.country = "Country required";
    }

    if (touchedFields.city) {
      if (!data.city) newErrors.city = "City required";
    }

    if (touchedFields.panNo) {
      if (!data.panNo.trim()) newErrors.panNo = "PAN is required";
      else if (!panRegex.test(data.panNo))
        newErrors.panNo = "Invalid PAN format (ABCDE1234F)";
    }

    if (touchedFields.aadharNo) {
      if (!data.aadharNo.trim()) {
        newErrors.aadharNo = "Aadhar is required";
      } else if (
        aadharDigits.length !== 12 ||
        !/^[1-9]\d{11}$/.test(aadharDigits)
      ) {
        newErrors.aadharNo = "Aadhar must be 12 digits and not start with 0";
      }
    }

    return newErrors;
  };

  useEffect(() => {
    setErrors(validate(formData, touched));
  }, [formData, touched]);

  const formValid = useMemo(
    () => Object.keys(validate(formData, touched)).length === 0,
    [formData, touched]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "countryCode") {
      setFormData((prev) => ({
        ...prev,
        countryCode: value,
        phoneNumber: "",
      }));
      return;
    }

    if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        country: value,
        city: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark all fields as touched on submit
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (formValid) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      {/* First Name */}
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
        />
        <small className="field-hint">Only alphabetic characters</small>
        {touched.firstName && errors.firstName && (
          <div className="error">{errors.firstName}</div>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
        />
        <small className="field-hint">Only alphabetic characters</small>
        {touched.lastName && errors.lastName && (
          <div className="error">{errors.lastName}</div>
        )}
      </div>

      {/* Username */}
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
        />
        <small className="field-hint">3-20 letters, digits or “_”</small>
        {touched.username && errors.username && (
          <div className="error">{errors.username}</div>
        )}
      </div>

      {/* Email */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
        />
        <small className="field-hint">example@domain.com</small>
        {touched.email && errors.email && (
          <div className="error">{errors.email}</div>
        )}
      </div>

      {/* Password */}
      <div>
        <label>Password:</label>
        <input
          type={formData.showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
        />
        <small className="field-hint">Minimum 6 characters</small>
        {touched.password && errors.password && (
          <div className="error">{errors.password}</div>
        )}
        {formData.password && (
          <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Password strength: {passwordStrength}
          </div>
        )}
      </div>

      {/* Show PW toggle */}
      <label className="checkbox-label">
        <input
          type="checkbox"
          name="showPassword"
          checked={formData.showPassword}
          onChange={handleChange}
        />{" "}
        Show Password
      </label>

      {/* Phone Section */}
      <div className="phone-group">
        {/* Country Code dropdown */}
        <div className="phone-code">
          <label>Country Code:</label>
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          >
            <option value="">--Select--</option>
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
          <small className="field-hint">Choose your dial code</small>
          {touched.countryCode && errors.countryCode && (
            <div className="error">{errors.countryCode}</div>
          )}
        </div>

        {/* Phone number */}
        <div className="phone-number">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={
              getSelectedCountry()
                ? "0".repeat(getSelectedCountry().phoneLength)
                : " "
            }
          />
          {getSelectedCountry() && (
            <small className="field-hint">
              {getSelectedCountry().phoneLength} digits, no spaces/dashes
            </small>
          )}
          {touched.phoneNumber && errors.phoneNumber && (
            <div className="error">{errors.phoneNumber}</div>
          )}
        </div>
      </div>

      {/* Country dropdown */}
      <div>
        <label>Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        >
          <option value="">--Select Country--</option>
          {COUNTRY_OPTIONS.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <small className="field-hint">Where you currently live</small>
        {touched.country && errors.country && (
          <div className="error">{errors.country}</div>
        )}
      </div>

      {/* City dropdown */}
      <div>
        <label>City:</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          disabled={!formData.country}
        >
          <option value="">--Select City--</option>
          {formData.country &&
            CITY_OPTIONS[formData.country]?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
        <small className="field-hint">Select a city</small>
        {touched.city && errors.city && (
          <div className="error">{errors.city}</div>
        )}
      </div>

      {/* PAN */}
      <div>
        <label>PAN No.:</label>
        <input
          type="text"
          name="panNo"
          value={formData.panNo}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
        />
        <small className="field-hint">Format: ABCDE1234F</small>
        {touched.panNo && errors.panNo && (
          <div className="error">{errors.panNo}</div>
        )}
      </div>

      {/* Aadhar */}
      <div>
        <label>Aadhar No.:</label>
        <input
          type="text"
          name="aadharNo"
          value={formData.aadharNo}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
        />
        <small className="field-hint">12 digits (spaces allowed)</small>
        {touched.aadharNo && errors.aadharNo && (
          <div className="error">{errors.aadharNo}</div>
        )}
      </div>

      <button type="submit" disabled={!formValid}>
        Register
      </button>
    </form>
  );
}

export default Form;
