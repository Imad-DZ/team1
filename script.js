function fromUrl() {
function setSubtitle(text) {
const s = document.getElementById('sub');
if (s) s.textContent = text;
}


function highlightPlayer(nameRaw) {
if (!nameRaw) return false;
const name = nameRaw.trim().toLowerCase();
const rows = Array.from(document.querySelectorAll('#leaderboardBody tr'));
let found = false;
rows.forEach(r => {
r.classList.remove('highlight');
const el = r.querySelector('.name');
if (!el) return;
const n = el.textContent.trim().toLowerCase();
if (n === name) {
r.classList.add('highlight');
r.scrollIntoView({behavior:'smooth', block:'center'});
found = true;
}
});


const result = document.getElementById('result');
if (found) {
setSubtitle(`Highlighted: ${nameRaw}`);
if (result) result.textContent = '';
} else {
setSubtitle(`Player \"${nameRaw}\" not found`);
if (result) result.textContent = `Player \"${nameRaw}\" not found in the list.`;
}


return found;
}


// Main flow
const pUrl = fromUrl();
const pLocal = fromLocal();


if (pUrl) {
showBoard();
highlightPlayer(pUrl);
} else if (pLocal) {
showBoard();
highlightPlayer(pLocal);
// optionally clear localStorage so it won't persist on refresh
// localStorage.removeItem('selectedPlayer');
} else {
// remain empty until external page provides a name
setSubtitle('Waiting for participant...');
}