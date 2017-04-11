"use strict";
const express = require('express');
const validator = require('validator');

const router = new express.Router();


/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  console.log("payload is " + JSON.stringify(payload));
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    console.log("check to see it's hitting the validation error on server");
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 10) {
    isFormValid = false;
    errors.password = 'Password must have at least 10 characters.';
  }

if (!payload || typeof payload.passwordConfirmation !== 'string' || payload.passwordConfirmation.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please confirm your password.';
  }

 if (payload.passwordConfirmation.trim().length > 0 && payload.password != payload.passwordConfirmation) {
    isFormValid = false;
    errors.password = 'Passwords do not match.';
  }
  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res) => {
   const validationResult = validateSignupForm(req.body);
   if (!validationResult.success) {
     return res.status(400).json({
       success: false,
       message: validationResult.message,
       errors: validationResult.errors
     });
   }

  return res.status(200).end();
});

router.post('/login', (req, res) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return res.status(200).end();
});


module.exports = router;