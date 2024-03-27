function runSimulation() {
    var groupSize = parseInt(document.getElementById('group-size').value);
    if (groupSize >= 1 && groupSize <= 100) {
        var matches = simulateBirthdays(groupSize, 100000);
        displayResults(groupSize, matches);
    } else {
        alert("Please enter a valid group size (1-100).");
    }
}

function simulateBirthdays(groupSize, numSimulations) {
    var matches = 0;
    for (var i = 0; i < numSimulations; i++) {
        var birthdays = getBirthdays(groupSize);
        if (getMatch(birthdays)) {
            matches++;
        }
    }
    return matches;
}

function getBirthdays(groupSize) {
    var birthdays = [];
    var startDate = new Date(2000, 0, 1); // January 1, 2000
    for (var i = 0; i < groupSize; i++) {
        var randomOffset = Math.floor(Math.random() * 366); // Random number between 0 and 365 (inclusive)
        var birthday = new Date(startDate);
        birthday.setDate(startDate.getDate() + randomOffset);
        birthdays.push(birthday);
    }
    return birthdays;
}

function getMatch(birthdays) {
    var seen = new Set();
    for (var i = 0; i < birthdays.length; i++) {
        if (seen.has(birthdays[i].getTime())) {
            return true;
        }
        seen.add(birthdays[i].getTime());
    }
    return false;
}

function displayResults(groupSize, matches) {
    var output = document.getElementById('output');
    var percentage = (matches / 100000) * 100;
    output.innerHTML = `<p>Out of ${groupSize} people, there was a matching birthday in the group ${matches} times.</p>`;
    output.innerHTML += `<p>This means that ${groupSize} people have a ${percentage.toFixed(2)}% chance of having a matching birthday in their group.</p>`;
}

