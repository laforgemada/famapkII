(() => {
'use strict';

// =========================================================
// RADIO FANAMBARANA - LECTEUR GLOBAL
// =========================================================

const API_BASE_URL = 'https://apokalypsy.com';

// Flux radio : proxy Symfony
const RADIO_STREAM = 'https://apokalypsy.com/radio-proxy';

// Synchronisation serveur toutes les 60 secondes
const SYNC_INTERVAL = 60 * 1000;

// Récompense toutes les 30 minutes
const REWARD_INTERVAL = 30 * 60;

const STORAGE = {
    playing: 'radioFanambaranaPlaying',
    volume: 'radioFanambaranaVolume',
    closed: 'radioFanambaranaClosed',
    mode: 'radioFanambaranaMode',
    bubbleSide: 'radioFanambaranaBubbleSide',
    bubbleTop: 'radioFanambaranaBubbleTop'
};

// =========================================================
// ÉTAT
// =========================================================

let root = null;
let audio = null;

let bar = null;
let bubble = null;

let barPlayButton = null;
let barMinimizeButton = null;
let barCloseButton = null;
let barBonusButton = null;

let bubblePlayIcon = null;

let volumeSlider = null;

let listeningTimeElement = null;
let nextRewardElement = null;
let progressBarElement = null;
let rewardMessageElement = null;
let loginBoxElement = null;

let isPlaying = false;

// Temps total d'écoute local
let accumulatedSeconds = 0;

// Dernier moment où le compteur a été calculé
let lastTick = null;

// Temps qui doit encore être envoyé au serveur
let pendingSyncSeconds = 0;

let syncTimer = null;
let clockTimer = null;

let isSyncing = false;
let autoplayBlocked = false;
let isStopping = false;

// =========================================================
// AUTHENTIFICATION
// =========================================================

function getToken() {
    return localStorage.getItem('token');
}

function getUsername() {
    return localStorage.getItem('user_name');
}

function isAuthenticated() {
    return Boolean(
        getToken() &&
        getUsername()
    );
}

// =========================================================
// URL DE CONNEXION
// =========================================================

function getLoginUrl() {
    const hostname =
        window.location.hostname;

    // GitHub Pages
    if (
        hostname.endsWith(
            'github.io'
        )
    ) {
        return '/login/connexion.html';
    }

    // Site principal + localhost
    return '/login/connexion.html';
}

// =========================================================
// UTILITAIRES
// =========================================================

function formatTime(totalSeconds) {
    totalSeconds = Math.max(
        0,
        Math.floor(totalSeconds)
    );

    const hours = Math.floor(
        totalSeconds / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds =
        totalSeconds % 60;

    return [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
    ].join(':');
}

// =========================================================
// MISE À JOUR DE L'INTERFACE
// =========================================================

function updateUI() {
    if (!root) {
        return;
    }

    const authenticated =
        isAuthenticated();

    // -----------------------------------------------------
    // Temps d'écoute
    // -----------------------------------------------------

    if (listeningTimeElement) {
        listeningTimeElement.textContent =
            formatTime(
                accumulatedSeconds
            );
    }

    // -----------------------------------------------------
    // Progression vers la prochaine récompense
    // -----------------------------------------------------

    const progressSeconds =
        accumulatedSeconds %
        REWARD_INTERVAL;

    const progressPercent =
        (
            progressSeconds /
            REWARD_INTERVAL
        ) * 100;

    if (progressBarElement) {
        progressBarElement.style.width =
            `${Math.min(
                100,
                progressPercent
            )}%`;
    }

    // -----------------------------------------------------
    // Prochaine récompense
    // -----------------------------------------------------

    const completedRewards =
        Math.floor(
            accumulatedSeconds /
            REWARD_INTERVAL
        );

    const nextRewardNumber =
        completedRewards + 1;

    if (nextRewardElement) {
        if (authenticated) {
            nextRewardElement.textContent =
                `${nextRewardNumber * 30} min → +3 points`;
        } else {
            nextRewardElement.textContent =
                'Connexion → +3 points';
        }
    }

    // -----------------------------------------------------
    // Message de récompense
    // -----------------------------------------------------

    if (rewardMessageElement) {
        const remainingSeconds =
            REWARD_INTERVAL -
            progressSeconds;

        const remainingMinutes =
            Math.ceil(
                remainingSeconds / 60
            );

        if (authenticated) {
            rewardMessageElement.innerHTML =
                `Encore <strong>${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}</strong> ` +
                `d'écoute pour gagner <strong>+3 points</strong>.`;
        } else {
            rewardMessageElement.innerHTML =
                `⏱️ Votre écoute continue d'être comptabilisée. ` +
                `<strong>Connectez-vous pour gagner des points.</strong>`;
        }
    }

    // -----------------------------------------------------
    // Bloc connexion
    // -----------------------------------------------------

    if (loginBoxElement) {
        loginBoxElement.style.display =
            authenticated
                ? 'none'
                : 'flex';
    }

    // -----------------------------------------------------
    // Sous-titre
    // -----------------------------------------------------

    const subtitle =
        document.getElementById(
            'rfw-bar-subtitle'
        );

    if (subtitle) {
        if (autoplayBlocked) {
            subtitle.textContent =
                'Cliquez pour lancer la radio';
        } else if (isPlaying) {
            subtitle.textContent =
                'En direct';
        } else {
            subtitle.textContent =
                authenticated
                    ? 'En pause'
                    : 'Écoute disponible • Bonus après connexion';
        }
    }

    // -----------------------------------------------------
    // Bouton lecture principal
    // -----------------------------------------------------

    if (barPlayButton) {
        barPlayButton.textContent =
            isPlaying ? '❚❚' : '▶';

        barPlayButton.setAttribute(
            'aria-label',
            isPlaying
                ? 'Mettre en pause'
                : 'Écouter'
        );
    }

    // -----------------------------------------------------
    // Bulle
    // -----------------------------------------------------

    if (bubblePlayIcon) {
        bubblePlayIcon.textContent =
            isPlaying ? '❚❚' : '▶';
    }

    // -----------------------------------------------------
    // Point LIVE
    // -----------------------------------------------------

    const liveDot =
        document.getElementById(
            'rfw-bar-live-dot'
        );

    const bubbleLiveDot =
        document.getElementById(
            'rfw-bubble-live-dot'
        );

    if (liveDot) {
        liveDot.style.opacity =
            isPlaying ? '1' : '0.45';
    }

    if (bubbleLiveDot) {
        bubbleLiveDot.style.opacity =
            isPlaying ? '1' : '0.45';
    }
}

// =========================================================
// NOTIFICATION DE RÉCOMPENSE
// =========================================================

function showReward(points) {
    if (!rewardMessageElement) {
        return;
    }

    const originalMessage =
        rewardMessageElement.innerHTML;

    rewardMessageElement.innerHTML =
        `🎉 <strong>Félicitations !</strong> ` +
        `Vous avez gagné <strong>+${points} points</strong>.`;

    rewardMessageElement.classList.add(
        'rfw-reward-success'
    );

    setTimeout(() => {
        if (!rewardMessageElement) {
            return;
        }

        rewardMessageElement.innerHTML =
            originalMessage;

        rewardMessageElement.classList.remove(
            'rfw-reward-success'
        );

        updateUI();
    }, 5000);
}

// =========================================================
// AFFICHER / CACHER
// =========================================================

function show() {
    if (!root) {
        return;
    }

    root.classList.remove(
        'rfw-hidden'
    );

    localStorage.removeItem(
        STORAGE.closed
    );
}

function hide() {
    if (!root) {
        return;
    }

    root.classList.add(
        'rfw-hidden'
    );
}

// =========================================================
// MODE BARRE / BULLE
// =========================================================

function setMode(mode) {
    if (!root) {
        return;
    }

    const isBubble =
        mode === 'bubble';

    root.classList.toggle(
        'rfw-mode-bubble',
        isBubble
    );

    localStorage.setItem(
        STORAGE.mode,
        isBubble
            ? 'bubble'
            : 'bar'
    );

    if (isBubble) {
        root.classList.remove(
            'rfw-panel-open'
        );
    }
}

function togglePanel() {
    if (!root) {
        return;
    }

    if (
        root.classList.contains(
            'rfw-mode-bubble'
        )
    ) {
        return;
    }

    root.classList.toggle(
        'rfw-panel-open'
    );
}

// =========================================================
// CAPTURE DU TEMPS ÉCOULÉ
// =========================================================

function captureElapsedTime() {
    if (
        !isPlaying ||
        !lastTick
    ) {
        return 0;
    }

    const now = Date.now();

    const elapsedSeconds =
        Math.floor(
            (now - lastTick) / 1000
        );

    if (elapsedSeconds <= 0) {
        return 0;
    }

    accumulatedSeconds +=
        elapsedSeconds;

    pendingSyncSeconds +=
        elapsedSeconds;

    lastTick = now;

    updateUI();

    return elapsedSeconds;
}

// =========================================================
// TICK
// =========================================================

function tick() {
    captureElapsedTime();
}

// =========================================================
// CHARGEMENT DU STATUT RADIO
// =========================================================

async function loadRadioStatus() {
    // Un invité n'a pas de temps serveur.
    // Son compteur local continue normalement.
    if (!isAuthenticated()) {
        updateUI();
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/radio/status`,
            {
                method: 'GET',

                headers: {
                    'Authorization':
                        `Bearer ${getToken()}`
                }
            }
        );

        let data = {};

        try {
            data =
                await response.json();
        } catch (jsonError) {
            console.warn(
                '[Radio] Réponse statut non JSON.'
            );
        }

        if (!response.ok) {
            console.warn(
                '[Radio] Impossible de charger le statut :',
                response.status
            );

            return;
        }

        if (
            data.success &&
            data.authenticated
        ) {
            if (
                typeof data.radioListenSeconds ===
                'number'
            ) {
                accumulatedSeconds =
                    data.radioListenSeconds;
            }

            pendingSyncSeconds = 0;

            updateUI();

            console.log(
                '[Radio] Statut chargé :',
                data.radioListenSeconds,
                'secondes'
            );
        }

    } catch (error) {
        console.warn(
            '[Radio] Erreur lors du chargement du statut :',
            error
        );
    }
}

// =========================================================
// SYNCHRONISATION SERVEUR
// =========================================================

async function syncListeningTime() {
    // Un invité ne peut pas recevoir les points.
    // Son compteur local continue malgré tout.
    if (!isAuthenticated()) {
        return;
    }

    if (isSyncing) {
        return;
    }

    captureElapsedTime();

    if (pendingSyncSeconds <= 0) {
        return;
    }

    const secondsToSend =
        Math.min(
            pendingSyncSeconds,
            120
        );

    isSyncing = true;

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/radio/listen`,
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json',

                    'Authorization':
                        `Bearer ${getToken()}`
                },

                body: JSON.stringify({
                    seconds:
                        secondsToSend
                })
            }
        );

        let data = {};

        try {
            data =
                await response.json();
        } catch (jsonError) {
            console.warn(
                '[Radio] Réponse serveur non JSON.'
            );
        }

        if (!response.ok) {
            console.warn(
                '[Radio] Synchronisation refusée :',
                response.status
            );

            updateUI();

            return;
        }

        pendingSyncSeconds =
            Math.max(
                0,
                pendingSyncSeconds -
                secondsToSend
            );

        if (
            typeof data.radioListenSeconds ===
            'number'
        ) {
            accumulatedSeconds =
                data.radioListenSeconds +
                pendingSyncSeconds;
        }

        updateUI();

        if (
            data.pointsEarned &&
            Number(data.pointsEarned) > 0
        ) {
            showReward(
                Number(
                    data.pointsEarned
                )
            );
        }

    } catch (error) {
        console.warn(
            '[Radio] Erreur de synchronisation :',
            error
        );

        updateUI();

    } finally {
        isSyncing = false;
    }
}

// =========================================================
// TIMER DE SYNCHRONISATION
// =========================================================

function startSyncTimer() {
    stopSyncTimer();

    syncTimer = setInterval(
        async () => {
            if (!isPlaying) {
                return;
            }

            await syncListeningTime();
        },
        SYNC_INTERVAL
    );
}

function stopSyncTimer() {
    if (syncTimer) {
        clearInterval(
            syncTimer
        );

        syncTimer = null;
    }
}

// =========================================================
// HORLOGE LOCALE
// =========================================================

function startClock() {
    if (clockTimer) {
        clearInterval(
            clockTimer
        );
    }

    clockTimer = setInterval(
        () => {
            if (isPlaying) {
                tick();
            }
        },
        1000
    );
}

// =========================================================
// LANCER LA RADIO
// =========================================================

async function startRadio() {
    if (!audio) {
        return;
    }

    try {
        if (!audio.src) {
            audio.src =
                RADIO_STREAM;

            audio.load();
        }

        await audio.play();

        autoplayBlocked = false;

        isPlaying = true;

        if (!lastTick) {
            lastTick =
                Date.now();
        }

        localStorage.setItem(
            STORAGE.playing,
            '1'
        );

        localStorage.removeItem(
            STORAGE.closed
        );

        startSyncTimer();

        updateUI();

    } catch (error) {
        isPlaying = false;

        lastTick = null;

        stopSyncTimer();

        autoplayBlocked = true;

        updateUI();

        console.warn(
            '[Radio] Lecture bloquée par le navigateur :',
            error
        );
    }
}

// =========================================================
// ARRÊTER LA RADIO
// =========================================================

async function stopRadio() {
    if (isStopping) {
        return;
    }

    isStopping = true;

    try {
        if (isPlaying) {
            captureElapsedTime();
        }

        await syncListeningTime();

        if (audio) {
            audio.pause();
        }

        isPlaying = false;

        autoplayBlocked = false;

        lastTick = null;

        stopSyncTimer();

        localStorage.setItem(
            STORAGE.playing,
            '0'
        );

        updateUI();

    } finally {
        isStopping = false;
    }
}

// =========================================================
// FERMER = RÉDUIRE EN BULLE
// =========================================================

async function closeWidget() {
    await stopRadio();

    // Le bouton ✕ est équivalent au bouton Réduire.
    localStorage.setItem(
        STORAGE.closed,
        '0'
    );

    show();

    setMode('bubble');
}

// =========================================================
// VOLUME
// =========================================================

function restoreVolume() {
    if (
        !volumeSlider ||
        !audio
    ) {
        return;
    }

    const savedVolume =
        localStorage.getItem(
            STORAGE.volume
        );

    let volume = 1;

    if (savedVolume !== null) {
        const parsed =
            parseFloat(
                savedVolume
            );

        if (
            !Number.isNaN(parsed) &&
            parsed >= 0 &&
            parsed <= 1
        ) {
            volume = parsed;
        }
    }

    audio.volume =
        volume;

    volumeSlider.value =
        String(volume);
}

function saveVolume(value) {
    const volume =
        parseFloat(value);

    if (
        Number.isNaN(volume) ||
        volume < 0 ||
        volume > 1
    ) {
        return;
    }

    localStorage.setItem(
        STORAGE.volume,
        String(volume)
    );
}

// =========================================================
// POSITION DE LA BULLE
// =========================================================

function restoreBubblePosition() {
    if (!bubble) {
        return;
    }

    const savedSide =
        localStorage.getItem(
            STORAGE.bubbleSide
        );

    const savedTop =
        localStorage.getItem(
            STORAGE.bubbleTop
        );

    if (
        savedSide === 'left' ||
        savedSide === 'right'
    ) {
        bubble.style.left =
            'auto';

        bubble.style.right =
            'auto';

        if (savedSide === 'left') {
            bubble.style.left =
                '20px';
        } else {
            bubble.style.right =
                '20px';
        }
    }

    if (savedTop !== null) {
        const top =
            parseFloat(
                savedTop
            );

        if (!Number.isNaN(top)) {
            const maxTop =
                Math.max(
                    10,
                    window.innerHeight -
                    bubble.offsetHeight -
                    10
                );

            bubble.style.top =
                `${Math.min(
                    Math.max(
                        top,
                        10
                    ),
                    maxTop
                )}px`;

            bubble.style.bottom =
                'auto';
        }
    }
}

// =========================================================
// DRAG DE LA BULLE
// =========================================================

function setupBubbleDrag() {
    if (!bubble) {
        return;
    }

    let dragging = false;
    let moved = false;

    let startX = 0;
    let startY = 0;

    let startLeft = 0;
    let startTop = 0;

    bubble.addEventListener(
        'pointerdown',
        (event) => {
            dragging = true;
            moved = false;

            startX =
                event.clientX;

            startY =
                event.clientY;

            const rect =
                bubble.getBoundingClientRect();

            startLeft =
                rect.left;

            startTop =
                rect.top;

            bubble.setPointerCapture(
                event.pointerId
            );
        }
    );

    bubble.addEventListener(
        'pointermove',
        (event) => {
            if (!dragging) {
                return;
            }

            const deltaX =
                event.clientX -
                startX;

            const deltaY =
                event.clientY -
                startY;

            if (
                Math.abs(deltaX) > 5 ||
                Math.abs(deltaY) > 5
            ) {
                moved = true;
            }

            if (!moved) {
                return;
            }

            let newLeft =
                startLeft +
                deltaX;

            let newTop =
                startTop +
                deltaY;

            const maxLeft =
                window.innerWidth -
                bubble.offsetWidth -
                10;

            const maxTop =
                window.innerHeight -
                bubble.offsetHeight -
                10;

            newLeft =
                Math.min(
                    Math.max(
                        newLeft,
                        10
                    ),
                    maxLeft
                );

            newTop =
                Math.min(
                    Math.max(
                        newTop,
                        10
                    ),
                    maxTop
                );

            bubble.style.left =
                `${newLeft}px`;

            bubble.style.right =
                'auto';

            bubble.style.top =
                `${newTop}px`;

            bubble.style.bottom =
                'auto';
        }
    );

    bubble.addEventListener(
        'pointerup',
        (event) => {
            if (!dragging) {
                return;
            }

            dragging = false;

            try {
                bubble.releasePointerCapture(
                    event.pointerId
                );
            } catch (error) {
                // Rien à faire
            }

            if (!moved) {
                setMode('bar');
                return;
            }

            const rect =
                bubble.getBoundingClientRect();

            const centerX =
                rect.left +
                rect.width / 2;

            const goLeft =
                centerX <
                window.innerWidth / 2;

            const side =
                goLeft
                    ? 'left'
                    : 'right';

            localStorage.setItem(
                STORAGE.bubbleSide,
                side
            );

            if (goLeft) {
                bubble.style.left =
                    '20px';

                bubble.style.right =
                    'auto';
            } else {
                bubble.style.right =
                    '20px';

                bubble.style.left =
                    'auto';
            }

            const finalRect =
                bubble.getBoundingClientRect();

            localStorage.setItem(
                STORAGE.bubbleTop,
                String(
                    finalRect.top
                )
            );
        }
    );

    bubble.addEventListener(
        'click',
        (event) => {
            if (moved) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    );
}

// =========================================================
// HTML DU LECTEUR
// =========================================================

function createWidget() {
    if (
        document.getElementById(
            'rfw-root'
        )
    ) {
        return;
    }

    root =
        document.createElement(
            'div'
        );

    root.id =
        'rfw-root';

    root.innerHTML = `


<style>

#rfw-root {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    pointer-events: none;
    font-family: Arial, Helvetica, sans-serif;
}

#rfw-root *,
#rfw-root *::before,
#rfw-root *::after {
    box-sizing: border-box;
}

#rfw-root.rfw-hidden {
    display: none;
}

/* =========================================================
   BARRE PRINCIPALE
========================================================= */

#rfw-bar {
    pointer-events: auto;
    position: fixed;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%);

    width: min(420px, calc(100vw - 24px));
    min-height: 64px;

    display: flex;
    align-items: center;
    gap: 10px;

    padding: 10px 12px;

    border-radius: 18px;

    background:
        linear-gradient(
            135deg,
            rgba(20, 25, 35, 0.98),
            rgba(10, 14, 22, 0.98)
        );

    color: #fff;

    box-shadow:
        0 10px 35px rgba(0, 0, 0, 0.35);

    border:
        1px solid rgba(255, 255, 255, 0.08);

    backdrop-filter: blur(12px);

    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

/* =========================================================
   ICÔNE RADIO
========================================================= */

#rfw-bar-icon {
    width: 42px;
    height: 42px;

    flex: 0 0 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 13px;

    background:
        rgba(255, 255, 255, 0.08);

    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.5px;

    position: relative;
}

#rfw-bar-live-dot {
    position: absolute;

    width: 8px;
    height: 8px;

    right: 5px;
    top: 5px;

    border-radius: 50%;

    background: #ff3b30;

    box-shadow:
        0 0 0 3px
        rgba(255, 59, 48, 0.12);
}

/* =========================================================
   INFORMATIONS
========================================================= */

#rfw-bar-info {
    min-width: 0;
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 3px;
}

#rfw-bar-info strong {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#rfw-bar-subtitle {
    font-size: 11px;
    opacity: 0.65;
}

/* =========================================================
   BOUTONS
========================================================= */

.rfw-btn {
    width: 38px;
    height: 38px;

    flex: 0 0 38px;

    border: 0;
    border-radius: 50%;

    background:
        rgba(255, 255, 255, 0.08);

    color: #fff;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;

    transition:
        background 0.2s ease,
        transform 0.15s ease;
}

.rfw-btn:hover {
    background:
        rgba(255, 255, 255, 0.16);
}

.rfw-btn:active {
    transform: scale(0.92);
}

/* Bouton Bonus légèrement mis en évidence */

#rfw-bar-bonus {
    font-size: 16px;
}

/* =========================================================
   PANNEAU BONUS
========================================================= */

#rfw-panel {
    pointer-events: auto;

    position: fixed;

    left: 50%;
    bottom: 92px;

    transform:
        translateX(-50%)
        translateY(10px);

    width: min(420px, calc(100vw - 24px));

    max-height: 0;

    overflow: hidden;

    opacity: 0;

    transition:
        max-height 0.25s ease,
        opacity 0.2s ease,
        transform 0.25s ease;
}

#rfw-root.rfw-panel-open #rfw-panel {
    max-height: 420px;

    opacity: 1;

    transform:
        translateX(-50%)
        translateY(0);
}

#rfw-panel-inner {
    padding: 16px;

    border-radius: 18px;

    background:
        rgba(15, 19, 28, 0.98);

    color: #fff;

    box-shadow:
        0 10px 35px
        rgba(0, 0, 0, 0.3);

    border:
        1px solid
        rgba(255, 255, 255, 0.08);
}

/* =========================================================
   VOLUME
========================================================= */

.rfw-volume-row {
    display: flex;
    align-items: center;
    gap: 12px;

    margin-bottom: 15px;
}

.rfw-volume-row span {
    font-size: 10px;
    font-weight: 700;
    opacity: 0.65;
}

#rfw-volume {
    flex: 1;
}

/* =========================================================
   RÉCOMPENSE
========================================================= */

.rfw-reward-header {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.rfw-reward-header > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.rfw-reward-label {
    font-size: 9px;
    opacity: 0.55;
    letter-spacing: 0.5px;
}

.rfw-reward-header strong {
    font-size: 12px;
}

#rfw-progress-track {
    width: 100%;
    height: 5px;

    margin-top: 14px;

    overflow: hidden;

    border-radius: 999px;

    background:
        rgba(255, 255, 255, 0.08);
}

#rfw-progress-bar {
    height: 100%;
    width: 0%;

    border-radius: inherit;

    background: currentColor;

    transition:
        width 0.5s linear;
}

#rfw-reward-message {
    margin-top: 12px;

    font-size: 11px;

    line-height: 1.45;

    opacity: 0.72;
}

#rfw-reward-message.rfw-reward-success {
    opacity: 1;
}

/* =========================================================
   CONNEXION
========================================================= */

#rfw-login-box {
    margin-top: 14px;

    padding-top: 12px;

    border-top:
        1px solid
        rgba(255, 255, 255, 0.08);

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 10px;
}

#rfw-login-text {
    flex: 1;

    font-size: 10px;

    line-height: 1.4;

    opacity: 0.7;
}

#rfw-login-button {
    flex: 0 0 auto;

    border: 0;

    border-radius: 999px;

    padding: 8px 13px;

    background:
        rgba(255, 255, 255, 0.12);

    color: #fff;

    font-size: 11px;

    font-weight: 700;

    cursor: pointer;

    white-space: nowrap;

    transition:
        background 0.2s ease,
        transform 0.15s ease;
}

#rfw-login-button:hover {
    background:
        rgba(255, 255, 255, 0.2);
}

#rfw-login-button:active {
    transform: scale(0.95);
}

/* =========================================================
   BULLE
========================================================= */

#rfw-bubble {
    pointer-events: auto;

    position: fixed;

    right: 20px;
    bottom: 20px;

    width: 56px;
    height: 56px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    user-select: none;
    touch-action: none;

    background:
        linear-gradient(
            135deg,
            rgba(20, 25, 35, 0.98),
            rgba(10, 14, 22, 0.98)
        );

    color: #fff;

    box-shadow:
        0 8px 28px
        rgba(0, 0, 0, 0.35);

    border:
        1px solid
        rgba(255, 255, 255, 0.1);
}

#rfw-bubble-play {
    font-size: 17px;
}

#rfw-bubble-live-dot {
    position: absolute;

    top: 5px;
    right: 5px;

    width: 9px;
    height: 9px;

    border-radius: 50%;

    background: #ff3b30;

    box-shadow:
        0 0 0 3px
        rgba(255, 59, 48, 0.12);
}

/* =========================================================
   MODES
========================================================= */

#rfw-root.rfw-mode-bubble #rfw-bar {
    display: none;
}

#rfw-root.rfw-mode-bubble #rfw-panel {
    display: none;
}

#rfw-root:not(.rfw-mode-bubble) #rfw-bubble {
    display: none;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 480px) {

    #rfw-bar {
        bottom: 10px;
        width: calc(100vw - 16px);
        gap: 6px;
        padding: 8px;
    }

    #rfw-panel {
        bottom: 82px;
        width: calc(100vw - 16px);
    }

    #rfw-bubble {
        right: 14px;
        bottom: 14px;
    }

    #rfw-bar-info strong {
        font-size: 12px;
    }

    #rfw-bar-subtitle {
        font-size: 10px;
    }

    .rfw-btn {
        width: 36px;
        height: 36px;
        flex-basis: 36px;
    }

    #rfw-login-box {
        flex-direction: column;
        align-items: stretch;
    }

    #rfw-login-button {
        width: 100%;
    }
}

</style>

<!-- =======================================================
     PANNEAU BONUS
======================================================= -->

<div id="rfw-panel">


<div id="rfw-panel-inner">

    <div class="rfw-volume-row">

        <span>VOL</span>

        <input
            id="rfw-volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value="1"
            aria-label="Volume"
        >

    </div>

    <div class="rfw-reward-header">

        <div>

            <span class="rfw-reward-label">
                TEMPS D'ECOUTE
            </span>

            <strong id="rfw-listening-time">
                00:00:00
            </strong>

        </div>

        <div>

            <span class="rfw-reward-label">
                PROCHAIN GAIN
            </span>

            <strong id="rfw-next-reward">
                30 min → +3 points
            </strong>

        </div>

    </div>

    <div id="rfw-progress-track">

        <div id="rfw-progress-bar"></div>

    </div>

    <div id="rfw-reward-message">

        Écoutez Radio Fanambarana pendant
        <strong>30 minutes</strong>
        pour gagner
        <strong>+3 points</strong>.

    </div>

    <!-- =================================================
         CONNEXION POUR LES INVITÉS
    ================================================== -->

    <div id="rfw-login-box">

        <div id="rfw-login-text">

            🔒 Connectez-vous pour transformer
            votre temps d'écoute en points.

        </div>

        <button
            type="button"
            id="rfw-login-button"
        >
            🔑 Se connecter
        </button>

    </div>

</div>


</div>

<!-- =======================================================
     BARRE PRINCIPALE
======================================================= -->

<div id="rfw-bar">


<div id="rfw-bar-icon">

    RADIO

    <span id="rfw-bar-live-dot"></span>

</div>

<div id="rfw-bar-info">

    <strong>
        Radio Fanambarana
    </strong>

    <span id="rfw-bar-subtitle">
        Appuyez pour écouter
    </span>

</div>

<button
    type="button"
    id="rfw-bar-play"
    class="rfw-btn"
    aria-label="Écouter"
>
    ▶
</button>

<!-- Bouton visible pour afficher le bonus -->

<button
    type="button"
    id="rfw-bar-bonus"
    class="rfw-btn"
    aria-label="Afficher les bonus"
    title="Voir les bonus"
>
    ⭐
</button>

<button
    type="button"
    id="rfw-bar-minimize"
    class="rfw-btn"
    aria-label="Réduire en bulle"
    title="Réduire"
>
    —
</button>

<button
    type="button"
    id="rfw-bar-close"
    class="rfw-btn"
    aria-label="Réduire"
    title="Réduire"
>
    ×
</button>


</div>

<!-- =======================================================
     BULLE
======================================================= -->

<div
    id="rfw-bubble"
    aria-label="Ouvrir Radio Fanambarana"
>


<span id="rfw-bubble-play">
    ▶
</span>

<span id="rfw-bubble-live-dot"></span>


</div>
`;

    document.body.appendChild(
        root
    );

    // =====================================================
    // RÉFÉRENCES DOM
    // =====================================================

    bar =
        document.getElementById(
            'rfw-bar'
        );

    bubble =
        document.getElementById(
            'rfw-bubble'
        );

    barPlayButton =
        document.getElementById(
            'rfw-bar-play'
        );

    barBonusButton =
        document.getElementById(
            'rfw-bar-bonus'
        );

    barMinimizeButton =
        document.getElementById(
            'rfw-bar-minimize'
        );

    barCloseButton =
        document.getElementById(
            'rfw-bar-close'
        );

    bubblePlayIcon =
        document.getElementById(
            'rfw-bubble-play'
        );

    volumeSlider =
        document.getElementById(
            'rfw-volume'
        );

    listeningTimeElement =
        document.getElementById(
            'rfw-listening-time'
        );

    nextRewardElement =
        document.getElementById(
            'rfw-next-reward'
        );

    progressBarElement =
        document.getElementById(
            'rfw-progress-bar'
        );

    rewardMessageElement =
        document.getElementById(
            'rfw-reward-message'
        );

    loginBoxElement =
        document.getElementById(
            'rfw-login-box'
        );

    // =====================================================
    // AUDIO
    // =====================================================

    const audioHost =
        document.createElement(
            'audio'
        );

    audioHost.id =
        'rfw-audio';

    audioHost.preload =
        'none';

    audioHost.setAttribute(
        'playsinline',
        ''
    );

    document.body.appendChild(
        audioHost
    );

    audio = audioHost;

    // =====================================================
    // VOLUME
    // =====================================================

    restoreVolume();

    // =====================================================
    // ÉVÉNEMENTS
    // =====================================================

    barPlayButton.addEventListener(
        'click',
        async (event) => {
            event.stopPropagation();

            if (isPlaying) {
                await stopRadio();
            } else {
                await startRadio();
            }
        }
    );

    // -----------------------------------------------------
    // BOUTON BONUS
    // -----------------------------------------------------

    barBonusButton.addEventListener(
        'click',
        (event) => {
            event.stopPropagation();

            togglePanel();
        }
    );

    // -----------------------------------------------------
    // CLIC SUR LA BARRE
    // -----------------------------------------------------

    bar.addEventListener(
        'click',
        (event) => {

            if (
                event.target.closest(
                    '#rfw-bar-play'
                )
            ) {
                return;
            }

            if (
                event.target.closest(
                    '#rfw-bar-bonus'
                )
            ) {
                return;
            }

            if (
                event.target.closest(
                    '#rfw-bar-minimize'
                )
            ) {
                return;
            }

            if (
                event.target.closest(
                    '#rfw-bar-close'
                )
            ) {
                return;
            }

            togglePanel();
        }
    );

    // -----------------------------------------------------
    // RÉDUIRE EN BULLE
    // -----------------------------------------------------

    barMinimizeButton.addEventListener(
        'click',
        (event) => {
            event.stopPropagation();

            setMode('bubble');
        }
    );

    // -----------------------------------------------------
    // FERMER = RÉDUIRE
    // -----------------------------------------------------

    barCloseButton.addEventListener(
        'click',
        async (event) => {
            event.stopPropagation();

            await closeWidget();
        }
    );

    // -----------------------------------------------------
    // CONNEXION
    // -----------------------------------------------------

    const loginButton =
        document.getElementById(
            'rfw-login-button'
        );

    if (loginButton) {
        loginButton.addEventListener(
            'click',
            (event) => {
                event.stopPropagation();

                window.location.href =
                    getLoginUrl();
            }
        );
    }

    // -----------------------------------------------------
    // BULLE
    // -----------------------------------------------------

    bubble.addEventListener(
        'click',
        async () => {

            setMode('bar');

            if (
                !isPlaying &&
                autoplayBlocked
            ) {
                await startRadio();
            }
        }
    );

    // -----------------------------------------------------
    // VOLUME
    // -----------------------------------------------------

    volumeSlider.addEventListener(
        'input',
        (event) => {

            const value =
                event.target.value;

            if (audio) {
                audio.volume =
                    parseFloat(value);
            }

            saveVolume(value);
        }
    );

    // -----------------------------------------------------
    // AUDIO PLAY
    // -----------------------------------------------------

    audio.addEventListener(
        'play',
        () => {

            autoplayBlocked = false;

            if (!isPlaying) {
                isPlaying = true;
            }

            if (!lastTick) {
                lastTick =
                    Date.now();
            }

            localStorage.setItem(
                STORAGE.playing,
                '1'
            );

            startSyncTimer();

            updateUI();
        }
    );

    // -----------------------------------------------------
    // AUDIO PAUSE
    // -----------------------------------------------------

    audio.addEventListener(
        'pause',
        () => {

            if (isStopping) {
                updateUI();
                return;
            }

            if (isPlaying) {
                captureElapsedTime();
            }

            isPlaying = false;

            lastTick = null;

            stopSyncTimer();

            localStorage.setItem(
                STORAGE.playing,
                '0'
            );

            syncListeningTime();

            updateUI();
        }
    );

    // -----------------------------------------------------
    // ERREUR AUDIO
    // -----------------------------------------------------

    audio.addEventListener(
        'error',
        () => {

            console.error(
                '[Radio] Erreur du flux audio.',
                audio.error
            );

            updateUI();
        }
    );

    // =====================================================
    // DRAG
    // =====================================================

    setupBubbleDrag();

    // =====================================================
    // POSITION BULLE
    // =====================================================

    restoreBubblePosition();

    // =====================================================
    // HORLOGE
    // =====================================================

    startClock();

    // =====================================================
    // ÉTAT INITIAL
    // =====================================================

    loadRadioStatus()
        .finally(() => {

            /*
             * Le statut serveur est chargé avant
             * la restauration de l'état du lecteur.
             */

            restoreState();

            updateUI();
        });
}

// =========================================================
// RESTAURATION
// =========================================================

function restoreState() {

    const wasClosed =
        localStorage.getItem(
            STORAGE.closed
        ) === '1';

    if (wasClosed) {
        /*
         * Ancien état "fermé".
         *
         * Pour le nouveau comportement,
         * on le convertit automatiquement
         * en mode bulle.
         */

        localStorage.setItem(
            STORAGE.closed,
            '0'
        );

        show();

        setMode('bubble');

        updateUI();

        return;
    }

    show();

    const savedMode =
        localStorage.getItem(
            STORAGE.mode
        ) === 'bubble'
            ? 'bubble'
            : 'bar';

    setMode(savedMode);

    const shouldResume =
        localStorage.getItem(
            STORAGE.playing
        ) === '1';

    updateUI();

    if (shouldResume) {
        startRadio();
    }
}

// =========================================================
// INITIALISATION
// =========================================================

function init() {

    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            createWidget,
            {
                once: true
            }
        );

    } else {

        createWidget();

    }
}

// =========================================================
// API PUBLIQUE
// =========================================================

window.RadioFanambarana = {

    open: async () => {

        show();

        setMode('bar');

        await startRadio();

    },

    close: closeWidget,

    play: startRadio,

    pause: stopRadio,

    minimize: () => {

        setMode('bubble');

    },

    maximize: () => {

        setMode('bar');

    }

};

// =========================================================
// LANCEMENT
// =========================================================

init();


})();
