import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(handleFormInput, 500));
form.addEventListener('submit', handleFormSubmit);

const STORAGE_KEY = "feedback-form-state"

initForm();

function handleFormInput(e) {
    let inputData = localStorage.getItem(STORAGE_KEY);
    inputData = inputData ? JSON.parse(inputData) : {};
    inputData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputData));
}

function initForm() {
    try {
        let savedInput = localStorage.getItem(STORAGE_KEY);
        if(savedInput) {
            savedInput = JSON.parse(savedInput);
            Object.entries(savedInput).forEach(([name, value]) => {
                form.elements[name].value = value;
            });
        } 
    } catch (error) {
        console.log(error);
    }
}
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    formData.forEach((name, value) => console.log(name, value));
    localStorage.removeItem(STORAGE_KEY);
    e.currentTarget.reset();
}