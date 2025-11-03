// js/contact.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');
  const submitBtn = document.getElementById('submitBtn');

  // Bootstrap modal instance
  const thanksModalEl = document.getElementById('thanksModal');
  const thanksModal = new bootstrap.Modal(thanksModalEl, { keyboard: true });

  const setInvalid = (input, message) => {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.textContent = message;
  };

  const setValid = (input) => {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.removeAttribute('aria-invalid');
  };

  const resetValidation = () => {
    formAlert.classList.add('d-none');
    const inputs = form.querySelectorAll('.form-control, .form-check-input');
    inputs.forEach(i => {
      i.classList.remove('is-invalid', 'is-valid');
      i.removeAttribute('aria-invalid');
    });
  };

  const validateEmail = (value) => {
    // Patron sencillo pero efectivo
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    resetValidation();

    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');
    const consent = form.querySelector('#consent');

    // Nombre
    if (!name.value.trim() || name.value.trim().length < 2) {
      setInvalid(name, 'Por favor ingresa tu nombre (mín. 2 caracteres).');
      valid = false;
    } else setValid(name);

    // Email
    if (!email.value.trim() || !validateEmail(email.value.trim())) {
      setInvalid(email, 'Por favor ingresa un correo válido.');
      valid = false;
    } else setValid(email);

    // Mensaje
    const msgLen = message.value.trim().length;
    if (msgLen < 10) {
      setInvalid(message, 'Por favor escribe un mensaje de al menos 10 caracteres.');
      valid = false;
    } else setValid(message);

    // Consentimiento
    if (!consent.checked) {
      setInvalid(consent, 'Debes autorizar el uso de tus datos para continuar.');
      valid = false;
    } else {
      // Si el checkbox se marca, mostrarlo visualmente validado
      consent.classList.remove('is-invalid');
      consent.classList.add('is-valid');
    }

    if (!valid) {
      formAlert.className = 'alert alert-danger';
      formAlert.textContent = 'Hay errores en el formulario. Revisa los campos marcados.';
      formAlert.classList.remove('d-none');
      formAlert.focus();
      return;
    }

    // Si llegamos aquí, todo es válido.
    // Simular envío: mostrar modal de gracias con resumen opcional
    submitBtn.setAttribute('disabled', 'true');
    submitBtn.textContent = 'Enviando...';

    // Simulación asincrónica breve (no real): muestra modal con datos resumidos
    setTimeout(() => {
      const thanksMessage = document.getElementById('thanksMessage');
      const safeSubject = subject.value.trim() ? subject.value.trim() : '(Sin asunto)';
      thanksMessage.innerHTML = `
        Gracias <strong>${escapeHtml(name.value.trim())}</strong>.<br>
        Hemos recibido tu mensaje (asunto: <em>${escapeHtml(safeSubject)}</em>). 
        Te responderemos al correo <strong>${escapeHtml(email.value.trim())}</strong>.
      `;
      thanksModal.show();

      // Reset formulario tras cierre del modal
      thanksModalEl.addEventListener('hidden.bs.modal', () => {
        form.reset();
        resetValidation();
        submitBtn.removeAttribute('disabled');
        submitBtn.textContent = 'Enviar mensaje';
      }, { once: true });
    }, 700);
  });

  // Escape básico para evitar inyección en el contenido del modal
  function escapeHtml(str) {
    return str.replace(/[&<>"'`=\/]/g, s => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    }[s]));
  }

  // Mejora UX: limpiar mensajes al escribir
  form.addEventListener('input', (e) => {
    const target = e.target;
    if (target.classList.contains('is-invalid')) {
      target.classList.remove('is-invalid');
      target.removeAttribute('aria-invalid');
    }
    if (target.classList.contains('is-valid')) {
      target.classList.remove('is-valid');
    }
  });
});
