import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import backreg from "../assets/backreg.png";
import "../Styles/Loginstyling.css";
import axios from "axios";

const Register = () => {
  const [role, setRole] = useState("student");
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    stream: "",
    branch: "",

    companyname: "",
    companyWebsite: "",
    industry: "",
    location: "",
    phone: "",
    gstNumber: "",
    linkedin: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",

      stream: "",
      branch: "",
      joiningyear: "",
      graduatedyear: "",

      companyname: "",
      companyWebsite: "",
      industry: "",
      location: "",
      phone: "",
      gstNumber: "",
      linkedin: ""
    });

    setStep(1);
    setStrength("");
    setPasswordError("");
    setUserCaptcha("");
    setIsCaptchaValid(false);
  };

  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [strength, setStrength] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const generateCaptcha = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(random.toString());
    setUserCaptcha("");
    setIsCaptchaValid(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const checkPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    return "Strong";
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!isCaptchaValid) {
      alert("Invalid captcha!");
      return;
    }
    if (role === "admin") {
      navigate("/admin-dashboard", { state: { role: "admin" } });
    } else {
      navigate("/student-dashboard");
    }

    /*const dataToSend = {
      ...formData,
      role: role
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/register", // change if deployed
        dataToSend
      );

      alert("Registration successful!");

      if (role === "admin") {
        navigate("/login", { state: { role: "admin" } });
      } else {
        navigate("/student-dashboard", { state: { role: "student" } });
      }

    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }*/
  };


  return (
    <div className="login-bg" style={{ backgroundImage: `url(${backreg})` }}>
      <div className="login-card">

        <div className="role-switch">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => {
              setRole("student");
              resetForm();
            }}
          >
            Student
          </button>

          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => {
              setRole("admin");
              resetForm();
            }}
          >
            Admin
          </button>
        </div>

        <h2>Register As {role}</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input name="name" value={formData.name} placeholder="Full Name" onChange={handleChange} />
            <div><input name="email" value={formData.email} type="email" placeholder="Email" onChange={handleChange} />
            </div>
            {role === "admin" && (
              <input name="phone" value={formData.phone} placeholder="Phone Number" onChange={handleChange} />
            )}
            <button onClick={nextStep} className="login-btn">Next</button>
            <div className="link-row">
              <a href="/login" className="registerbut">Already have an account? Login</a>
              <a href="/" className="registerbut">Back to Home</a>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            {role === "student" && (
              <>
                <input name="stream" value={formData.stream} placeholder="Stream" onChange={handleChange} />
                <input name="branch" value={formData.branch} placeholder="Branch" onChange={handleChange} />
                {/* JOINING DATE */}
                <input
                  name="joiningyear"
                  type="text"
                  placeholder="Joining Date"
                  value={formData.joiningyear}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.max = new Date().toISOString().split("T")[0];
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  onChange={handleChange}
                />

                {/* GRADUATION DATE */}
                <input
                  name="graduatedyear"
                  type="text"
                  placeholder="Graduation Date"
                  value={formData.graduatedyear}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.min = formData.joiningyear;
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  onChange={handleChange}
                />
              </>

            )}

            {role === "admin" && (
              <>
                <input name="companyname" value={formData.companyname} placeholder="Company Name" onChange={handleChange} />
                <input name="companyWebsite" value={formData.companyWebsite} placeholder="Company Website" onChange={handleChange} />
                <input name="industry" value={formData.industry} placeholder="Industry" onChange={handleChange} />
                <input name="location" value={formData.location} placeholder="Location" onChange={handleChange} />
              </>
            )}
            <div className="link-row">
              <a onClick={prevStep} className="login-btn" >Back</a>
              <button onClick={nextStep} className="login-btn">Next</button>
            </div>

            <div className="link-row">
              <a href="/login" className="registerbut">Already have an account? Login</a>
              <a href="/" className="registerbut">Back to Home</a>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            {role === "admin" && (
              <>
                <input name="linkedin" value={formData.linkedin} placeholder="LinkedIn" onChange={handleChange} />
              </>
            )}

            <div className="password-wrapper">
              <input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                  setStrength(checkPasswordStrength(e.target.value));
                }}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formData.password && (
              <>
                <div className="strength-bar">
                  <div className={`strength ${strength.toLowerCase()}`}></div>
                </div>
                <p>{strength}</p>
              </>
            )}

            <div className="password-wrapper">
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, confirmPassword: value });

                  if (formData.password !== value) {
                    setPasswordError("Passwords do not match");
                    setIsCaptchaValid(false);
                  } else {
                    setPasswordError("");
                  }
                }}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

            <div>
              Captcha: {captcha}
              <button onClick={generateCaptcha}>Refresh</button>
            </div>

            <input
              placeholder="Enter Captcha"
              value={userCaptcha}
              onChange={(e) => {
                const val = e.target.value;
                setUserCaptcha(val);
                if (val === captcha && formData.password === formData.confirmPassword) {
                  setIsCaptchaValid(true);
                } else {
                  setIsCaptchaValid(false);
                }
              }}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
            />
            <div className="link-row">
              <a onClick={prevStep} className="login-btn" >Back</a>
              <button disabled={!isCaptchaValid} onClick={handleRegister} className="login-btn">
                Register
              </button>
            </div>


            <div className="link-row">
              <a href="/login" className="registerbut">Already have an account? Login</a>
              <a href="/" className="registerbut">Back to Home</a>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Register;