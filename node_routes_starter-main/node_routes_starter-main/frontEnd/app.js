const API_URL = "http://localhost:3000";

const colorForm = document.getElementById("colorForm");

const colorList = document.getElementById("colorList");

const refreshButton = document.getElementById("refreshButton");

const colorCount = document.getElementById("colorCount");

const colorName = document.getElementById("colorName");

const hexCode = document.getElementById("hexCode");

const colorPreview = document.getElementById("colorPreview");

async function getColors() {
	try {
		const response = await fetch(`${API_URL}/colors`);

		if (!response.ok) {
			throw new Error("Failed to get colors");
		}

		const colors = await response.json();

		displayColors(colors);
	} catch (error) {
		console.error(error);

		colorList.innerHTML = `
            <p>
                Unable to load colors.
                Make sure your API is running.
            </p>
        `;
	}
}

function displayColors(colors) {
	colorList.innerHTML = "";

	colorCount.textContent = `${colors.length} ${
		colors.length === 1 ? "color" : "colors"
	}`;

	if (colors.length === 0) {
		colorList.innerHTML = `
            <p>
                Your palette is empty.
                Add your first color above!
            </p>
        `;

		return;
	}

	colors.forEach((color) => {
		const colorCard = document.createElement("article");

		colorCard.classList.add("color-card");

		colorCard.innerHTML = `

            <div
                class="color-display"
                style="background-color: ${color.hexCode};"
            >
                ${color.hexCode}
            </div>


            <div class="color-info">

                <h3 class="color-name">
                    ${color.name}
                </h3>

                <p class="hex-code">
                    ${color.hexCode}
                </p>


                <div class="color-actions">

                    <button
                        type="button"
                        class="edit-button"
                        onclick="editColor('${color._id}')"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="delete-button"
                        onclick="deleteColor('${color._id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;

		colorList.appendChild(colorCard);
	});
}

colorForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const name = colorName.value.trim();

	const hex = hexCode.value.trim();

	if (!isValidHex(hex)) {
		alert("Please enter a valid hex code. Example: #FF5733");

		return;
	}

	const color = {
		name: name,

		hexCode: hex.toUpperCase(),
	};

	try {
		const response = await fetch(`${API_URL}/colors`, {
			method: "POST",

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(color),
		});

		if (!response.ok) {
			throw new Error("Failed to create color");
		}

		colorForm.reset();

		colorPreview.style.backgroundColor = "#FF5733";

		await getColors();
	} catch (error) {
		console.error(error);

		alert("Unable to add color.");
	}
});

function isValidHex(hex) {
	return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

hexCode.addEventListener("input", () => {
	let value = hexCode.value.trim();
	if (!value.startsWith("#")) {
		value = "#" + value;
	}
	if (isValidHex(value)) {
		colorPreview.style.backgroundColor = value;
	}
});

async function editColor(id) {
	const newName = prompt("Enter the new color name:");

	if (newName === null) {
		return;
	}

	const newHex = prompt("Enter the new hex code:", "#FF5733");

	if (newHex === null) {
		return;
	}

	const cleanedHex = newHex.trim();

	if (!isValidHex(cleanedHex)) {
		alert("Please enter a valid hex code. Example: #FF5733");

		return;
	}

	try {
		const response = await fetch(`${API_URL}/colors/${id}`, {
			method: "PATCH",

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				name: newName.trim(),

				hexCode: cleanedHex.toUpperCase(),
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to update color");
		}

		await getColors();
	} catch (error) {
		console.error(error);

		alert("Unable to update color.");
	}
}

async function deleteColor(id) {
	const confirmed = confirm("Are you sure you want to delete this color?");

	if (!confirmed) {
		return;
	}

	try {
		const response = await fetch(`${API_URL}/colors/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Failed to delete color");
		}

		await getColors();
	} catch (error) {
		console.error(error);

		alert("Unable to delete color.");
	}
}

refreshButton.addEventListener("click", getColors);

getColors();
