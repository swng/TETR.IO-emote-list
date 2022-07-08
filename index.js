// this gets replaced automatically
document.querySelector("#updated-ts").innerText = new Date(1657281782953).toLocaleString();

const copybuffer = document.querySelector("#copybuffer");

function addEmotes(target, list) {
    const targetEl = document.querySelector(target);
    for (const emote in list) {
        if (list.hasOwnProperty(emote)) {
            const el = document.createElement("div");
            el.classList.add("emote");

            const imgContEl = document.createElement("div");
            const imgEl = document.createElement("img");
            imgEl.src = "https://tetr.io/res/" + list[emote];
            imgEl.height = 32;
            imgEl.onload = function () {
                if (imgEl.width > imgEl.height) {
                    imgEl.width = 32;
                    imgEl.removeAttribute("height");
                }
            }
            imgContEl.appendChild(imgEl);
            el.appendChild(imgContEl);

            const textEl = document.createElement("div");
            textEl.classList.add("text");
            textEl.innerText = ":" + emote + ":";


            el.addEventListener("click", e => {
                e.preventDefault();
                copybuffer.value = textEl.innerText;
                copybuffer.select();
                document.execCommand("copy");
                el.classList.add("copied");
                setTimeout(() => {
                   el.classList.remove("copied");
                }, 1000);
            });
            el.appendChild(textEl);

            targetEl.appendChild(el);
        }
    }
}

fetch("./emotes.json").then(res => res.json()).then(emotes => {
    addEmotes("#emotes-base", emotes.base);
    addEmotes("#emotes-supporter", emotes.supporter);
    addEmotes("#emotes-verified", emotes.verified);
    addEmotes("#emotes-staff", emotes.staff);
});
