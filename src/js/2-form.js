const KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};

console.log('formData: ', formData);

fillForm();

formEl.addEventListener('input', onChange);
formEl.addEventListener('submit', onSubmit);

function onChange(e) {
  const { target: fieldEl } = e;

  const fieldName = fieldEl.name;
  const fieldValue = fieldEl.value.trim();

  formData[fieldName] = fieldValue;

  localStorage.setItem(KEY, JSON.stringify(formData));
}

function onSubmit(e) {
  e.preventDefault();
  if (isEmptyFields()) {
    return alert('Please fill in all fields.');
  }
  console.log('formData: ', { ...formData });
  clearLS();
  formEl.reset();
}

function fillForm() {
  let dataFromLS = null;
  try {
    dataFromLS = localStorage.getItem(KEY);
    if (dataFromLS === null) {
      return;
    }

    formData = JSON.parse(dataFromLS);

    for (const key in formData) {
      formEl.elements[key].value = formData[key];
    }
  } catch (error) {
    console.log(error);
  }
}

function clearLS() {
  formData.email = '';
  formData.message = '';
  localStorage.setItem(KEY, JSON.stringify(formData));
  localStorage.removeItem(KEY);
}

function isEmptyFields() {
  const keys = Object.keys(formData);
  const formElsList = Array.from(formEl.elements);
  return formElsList.some(el => keys.includes(el.name) && !el.value);
}
