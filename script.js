const calendar = document.getElementById("calendar");
const today = new Date();
const currentDay = today.getMonth() === 11 ? today.getDate() : 0; // Nur im Dezember aktiv - sonst Tueren gesperrt

// Bereits geoeffnete Tueren aus localStorage holen
const opened = JSON.parse(localStorage.getItem("openedDoors") || "[]");

// Positionen und Groessen der 25 Tueren relativ zum Hintergrundbild (in Prozent)
const doorLayout = [
    { left: 10, top: 5, width: 17, height: 27 },   // 1
    { left: 30, top: 5, width: 11, height: 16},  // 2
    { left: 43, top: 5, width: 12, height: 21},  // 3
    { left: 57, top: 5, width: 11, height: 30 },  // 4
    { left: 71, top: 5, width: 19, height: 18},  // 5
    { left: 10, top: 36, width: 8, height: 26},  // 6
    { left: 20, top: 36, width: 8, height: 10}, // 7
    { left: 30, top: 25, width: 11, height: 21}, // 8
    { left: 43, top: 29, width: 11, height: 27}, // 9
    { left: 57, top: 38, width: 14, height: 13}, // 10
    { left: 71, top: 26, width: 7, height: 8},  // 11
    { left: 80, top: 26, width: 10, height: 19}, // 12
    { left: 21, top: 50, width: 20, height: 18}, // 13
    { left: 44, top: 59, width: 11, height: 10}, // 14
    { left: 57, top: 54, width: 14, height: 21}, // 15
    { left: 73, top: 38 , width: 5, height: 37 },  // 16
    { left: 80, top: 49, width: 10, height: 12}, // 17
    { left: 10, top: 65, width: 8, height: 13 },  // 18
    { left: 21, top: 72, width: 24, height: 6}, // 19
    { left: 10, top: 85, width: 18, height: 12 },  // 20
    { left: 23, top: 86, width: 12, height: 11 }, // 21
    { left: 37, top: 81, width: 14, height: 16 }, // 22
    { left: 55, top: 79, width: 12, height: 18 }, // 23
    { left: 72, top: 78, width: 20, height: 18 }, // 24
    { left: 80, top: 73, width: 10, height: 23 }, // 25
];

// 25 Tueren erzeugen und positionieren
doorLayout.forEach((layout, index) => {
    const dayNumber = index + 1;
    const door = document.createElement("div");
    door.className = "door";
    door.textContent = dayNumber;

    Object.assign(door.style, {
        left: `${layout.left}%`,
        top: `${layout.top}%`,
        width: `${layout.width}%`,
        height: `${layout.height}%`,
    });

    let isOpen = opened.includes(dayNumber);
    const isUnlocked = dayNumber <= currentDay;

    if (isOpen) door.classList.add("open");
    if (!isUnlocked) door.classList.add("locked");

    door.addEventListener("click", () => {
        if (!isOpen && !isUnlocked) {
            alert("Diese Tuer kann heute noch nicht geoeffnet werden!");
            return;
        }

        door.classList.add("open");

        if (!isOpen) {
            opened.push(dayNumber);
            localStorage.setItem("openedDoors", JSON.stringify(opened));
            isOpen = true;
        }

        if (dayNumber === 1) {
            window.location.href = "tag1.html";
            return;
        }
        if (dayNumber === 2) {
            window.location.href = "tag2.html";
            return;
        }

        alert(`Tuer ${dayNumber} - Geschenk!`);
    });

    calendar.appendChild(door);
});
