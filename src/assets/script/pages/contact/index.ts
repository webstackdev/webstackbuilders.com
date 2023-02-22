/**
 * Script for the "Contact Us" form
 */

export const contactInit = () => {
  // `onkeydown` event listener:
  // @TODO: 1. need to give warning when close to text limit (listener on textarea element only)
  // @TODO: 2. need to set opacity to 0 on the input label when the types something in the input box so the label doesn't show while the user's typing, and set it back to 0.5 if they clear the input
  // @TODO: 3. need form submit XHR call to lambda

  // File download
  // @TODO: 4. need to do file download script
  // @TODO: 5. need to do lambda function (1) to handle to s-3 bucket

  // Submit
  // @TODO: 6. need form submit lambda (2)

  // Error handling
  // @TODO: 7.

  /**
   * #1: Event handler for the text area element to give a warning when close
   * to max limit but not at it when the error handling will take over.
   */
  function handleChange() {
    const textareaElement = document.getElementById('fname').value
    if (textareaElement.length > 1800 && textareaElement.length < 2000) {
      alert('value should less than 35')
    }
  }


  // There are many ways to pick a DOM node; here we get the form itself and the email
  // input box, as well as the span element into which we will place the error message.
  const form = document.querySelector('form')
  const email = document.getElementById('mail')
  const emailError = document.querySelector('#mail + span.error')

  email.addEventListener('input', event => {
    // Each time the user types something, we check if the
    // form fields are valid.

    if (email.validity.valid) {
      // In case there is an error message visible, if the field
      // is valid, we remove the error message.
      emailError.textContent = '' // Reset the content of the message
      emailError.className = 'error' // Reset the visual state of the message
    } else {
      // If there is still an error, show the correct error
      showError()
    }
  })

  form.addEventListener('submit', event => {
    // if the email field is valid, we let the form submit
    if (!email.validity.valid) {
      // If it isn't, we display an appropriate error message
      showError()
      // Then we prevent the form from being sent by canceling the event
      event.preventDefault()
    }
  })

  function showError() {
    if (email.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      emailError.textContent = 'You need to enter an email address.'
    } else if (email.validity.typeMismatch) {
      // If the field doesn't contain an email address,
      // display the following error message.
      emailError.textContent = 'Entered value needs to be an email address.'
    } else if (email.validity.tooShort) {
      // If the data is too short,
      // display the following error message.
      emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`
    }

    // Set the styling appropriately
    emailError.className = 'error active'
  }


  const form = document.getElementById('contactForm')
  const url = 'https://{id}.execute-api.{region}.amazonaws.com/{stage}/email/send'
  const toast = document.getElementById('toast')

  const submit = document.getElementById('submit')
  
  function post(url, body, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function () {
      if (req.status < 400) {
        callback(null, JSON.parse(req.responseText));
      } else {
        callback(new Error("Request failed: " + req.statusText));
      }
    })
    req.send(JSON.stringify(body));
  }

  function success () {
    toast.innerHTML = 'Thanks for sending me a message! I\'ll get in touch with you ASAP. :)'
    submit.disabled = false
    submit.blur()
    form.name.focus()
    form.name.value = ''
    form.email.value = ''
    form.content.value = ''
  }

  function error (err) {
    toast.innerHTML = 'There was an error with sending your message, hold up until I fix it. Thanks for waiting.'
    submit.disabled = false
    console.log(err)
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    toast.innerHTML = 'Sending'
    submit.disabled = true  const payload = {
      name: form.name.value,
      email: form.email.value,
      content: form.content.value
    }
    post(url, payload, function (err, res) {
      if (err) { return error(err) }
      success()
    })
  })
}
