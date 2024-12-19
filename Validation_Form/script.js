// Regular expressions for validation
const patterns = {
    name: /^[a-zA-Z\s]{2,}$/,
    email: /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
    ,
    phone: /^[6789]\d{9}$/,
};

// validate fields based on input ID
function validateField(inputId) {
    let input = document.getElementById(inputId);
    let errorElement = document.getElementById(`${inputId}-error`);
    errorElement.textContent = "";

    if (inputId === "name" && !patterns.name.test(input.value.trim())) {
        errorElement.textContent =
            "Name must be at least 2 characters and contain only letters and spaces";
    } else if (inputId === "email" && !patterns.email.test(input.value)) {
        errorElement.textContent = "Please enter a valid email address";
    } else if (inputId === "phone" && !patterns.phone.test(input.value)) {
        errorElement.textContent =
            "Phone number must be 10 digits, starting with 6-9";
    } else if (
        inputId === "password" &&
        !patterns.password.test(input.value)
    ) {
        errorElement.textContent =
            "Password must be at least 8 characters, contain at least one letter, one number, and one special character";
    } else if (inputId === "dob" && !isValidDob(input.value)) {
        errorElement.textContent = "Date of Birth is required and cannot be in the future";
    } else if (inputId === "dob" && isValidDob(input.value)) {
        setAge(input.value);
    }
}

// velidate dob
function isValidDob(dobValue) {
    const dobInput = new Date(dobValue);
    const today = new Date();

    // Check if DOB is a valid date
    if (isNaN(dobInput.getTime())) {
        return false;
    }

    // Check if DOB is in the future
    if (dobInput > today) {
        return false;
    }

    return true;
}

// set the age based on the provided DOB
function setAge(dobValue) {
    const dob = new Date(dobValue);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // Adjust age if the birthdate hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    const ageInput = document.getElementById("age");
    ageInput.value = age >= 0 ? age : 0; // Ensure the age is not negative
}

// populate districts based on the selected state
function populateDistricts() {
    const stateDropdown = document.getElementById("state");
    const districtDropdown = document.getElementById("district");
    const districts = {
        madhya_pradesh: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
        uttar_pradesh: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
        maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
        gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
        rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
        punjab: [
            "Chandigarh",
            "Ludhiana",
            "Amritsar",
            "Jalandhar",
            "Patiala",
        ],
    };

    const selectedState = stateDropdown.value;
    const districtOptions = districts[selectedState] || [];

    let districtTomSelect = districtDropdown.tomselect;

    if (districtTomSelect) {
        districtTomSelect.clearOptions();
        districtTomSelect.addOption({ value: "", text: "Select District" });
        districtOptions.forEach((district) => {
            districtTomSelect.addOption({ value: district, text: district });
        });
        districtTomSelect.refreshOptions(false);
    }
}

// Attach event listeners to the form fields select( use TomSelect library)
document.addEventListener("DOMContentLoaded", function () {
    new TomSelect("#state", {
        create: false,
        sortField: { field: "text", direction: "asc" },
    });

    let districtTomSelect = new TomSelect("#district", {
        create: false,
        sortField: { field: "text", direction: "asc" },
    });
    districtTomSelect.addOption({ value: "", text: "Select District" });
    districtTomSelect.refreshOptions(false);

    populateDistricts();

    document
        .getElementById("state")
        .addEventListener("change", populateDistricts);
});
