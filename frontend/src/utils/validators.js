// filename: frontend/src/utils/validators.js

export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const validateRegisterForm = ({ name, email, password, confirmPassword }) => {
  const errors = {};
  if (!name || !name.trim()) errors.name = "Name is required";
  if (!email || !isValidEmail(email)) errors.email = "Enter a valid email address";
  if (!password || password.length < 6) errors.password = "Password must be at least 6 characters";
  if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
  return errors;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (!email || !isValidEmail(email)) errors.email = "Enter a valid email address";
  if (!password) errors.password = "Password is required";
  return errors;
};

export const validatePersonalInfo = ({ fullName, email }) => {
  const errors = {};
  if (!fullName || !fullName.trim()) errors.fullName = "Full name is required";
  if (email && !isValidEmail(email)) errors.email = "Enter a valid email address";
  return errors;
};
