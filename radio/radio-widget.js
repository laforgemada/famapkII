/*
 * ============================================================
 * RADIO FANAMBARANA — WIDGET PERSISTANT
 * ============================================================
 *
 * A inclure sur CHAQUE page du site :
 *
 *   <script src="/chemin/radio-widget.js" defer></script>
 *
 * Le widget s'auto-injecte (HTML + CSS), sans dependance a
 * radio.html / radio-player.js / radio-player.css / radio-launcher.js
 * qui deviennent obsoletes (approche popup desktop, non adaptee
 * au mobile).
 *
 * Comportement :
 * - Barre mini-lecteur fixee en bas de l'ecran (comme Spotify).
 * - Reductible en pastille flottante deplacable (comme Messenger).
 * - Etat (lecture, volume, mode, position) persiste en localStorage.
 * - A chaque nouvelle page, si la radio jouait, elle se reconnecte
 *   automatiquement au flux en direct (radio live = pas de position
 *   de lecture a restaurer, la reconnexion est imperceptible).
 *
 * API publique :
 *
 *   window.RadioFanambarana.open()      -> affiche + lance la radio
 *   window.RadioFanambarana.close()     -> arrete + masque tout
 *   window.RadioFanambarana.play()
 *   window.RadioFanambarana.pause()
 *   window.RadioFanambarana.minimize()  -> passe en pastille
 *   window.RadioFanambarana.maximize()  -> repasse en barre
 * ============================================================
 */

(function () {

    'use strict';


    /*
     * Evite une double initialisation si le script
     * est inclus deux fois par erreur sur une page.
     */

    if (window.__radioFanambaranaWidgetLoaded) {

        return;

    }

    window.__radioFanambaranaWidgetLoaded = true;


    /* =========================================================
       CONFIGURATION
    ========================================================= */

    const API_BASE_URL = 'https://apokalypsy.com';

    const RADIO_STREAM = 'https://apokalypsy.com/radio-proxy';

    const SYNC_INTERVAL = 60 * 1000;

    const REWARD_INTERVAL = 30 * 60;


    const STORAGE = {

        playing: 'radioFanambaranaPlaying',

        volume: 'radioFanambaranaVolume',

        closed: 'radioFanambaranaClosed',

        mode: 'radioFanambaranaMode',

        bubbleSide: 'radioFanambaranaBubbleSide',

        bubbleTop: 'radioFanambaranaBubbleTop'

    };


    /* =========================================================
       ETAT
    ========================================================= */

    let isPlaying = false;

    let accumulatedSeconds = 0;

    let lastTick = null;

    let syncTimer = null;

    let clockTimer = null;

    let isSyncing = false;

    let autoplayBlocked = false;


    /* =========================================================
       ELEMENTS DOM (crees dynamiquement)
    ========================================================= */

    let root = null;

    let audio = null;

    let bar = null;

    let bubble = null;

    let barPlayButton = null;

    let barMinimizeButton = null;

    let barCloseButton = null;

    let barExpandToggle = null;

    let bubblePlayIcon = null;

    let volumeSlider = null;

    let panel = null;

    let listeningTimeElement = null;

    let nextRewardElement = null;

    let progressBarElement = null;

    let rewardMessageElement = null;


    /* =========================================================
       AUTHENTIFICATION
    ========================================================= */

    function getToken() {

        return localStorage.getItem('token');

    }


    function getUsername() {

        return localStorage.getItem('user_name');

    }


    function isAuthenticated() {

        return Boolean(getToken() && getUsername());

    }


    /* =========================================================
       FORMAT TEMPS
    ========================================================= */

    function formatTime(totalSeconds) {

        totalSeconds = Math.max(0, Math.floor(totalSeconds));

        const hours = Math.floor(totalSeconds / 3600);

        const minutes = Math.floor((totalSeconds % 3600) / 60);

        const seconds = totalSeconds % 60;

        return [hours, minutes, seconds]
            .map(value => String(value).padStart(2, '0'))
            .join(':');

    }


    /* =========================================================
       INJECTION DU CSS
    ========================================================= */

    function injectStyles() {

        if (document.getElementById('radio-fanambarana-widget-style')) {

            return;

        }

        const style = document.createElement('style');

        style.id = 'radio-fanambarana-widget-style';

        style.textContent = `
            #rfw-root {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 999999;
                font-family: Inter, "Segoe UI", Arial, sans-serif;
                pointer-events: none;
            }

            #rfw-root * {
                box-sizing: border-box;
            }

            #rfw-root.rfw-hidden {
                display: none;
            }

            /* -------- BARRE -------- */

            #rfw-bar {
                pointer-events: auto;
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0 8px calc(8px + env(safe-area-inset-bottom, 0px)) 8px;
                padding: 9px 10px;
                border-radius: 18px;
                background: linear-gradient(135deg, #1a263a, #121c2d);
                border: 1px solid rgba(255,255,255,0.12);
                box-shadow: 0 12px 30px rgba(0,0,0,0.45);
                transform: translateY(0);
                transition: transform 0.25s ease, opacity 0.25s ease;
            }

            #rfw-root.rfw-mode-bubble #rfw-bar,
            #rfw-root.rfw-hidden #rfw-bar {
                transform: translateY(140%);
                opacity: 0;
                pointer-events: none;
            }

            #rfw-bar-icon {
                position: relative;
                width: 38px;
                height: 38px;
                flex: 0 0 38px;
                border-radius: 12px;
                background: linear-gradient(135deg, #ef4444, #ff6b6b);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                font-weight: 900;
                color: #fff;
                cursor: pointer;
            }

            #rfw-bar-live-dot {
                position: absolute;
                top: -2px;
                right: -2px;
                width: 9px;
                height: 9px;
                border-radius: 50%;
                background: #3bff41;
                box-shadow: 0 0 0 3px #121c2d;
                animation: rfw-pulse 1.4s infinite;
            }

            @keyframes rfw-pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.4; transform: scale(0.7); }
            }

            #rfw-bar-info {
                flex: 1;
                min-width: 0;
                cursor: pointer;
            }

            #rfw-bar-info strong {
                display: block;
                color: #fff;
                font-size: 12.5px;
                font-weight: 800;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            #rfw-bar-info span {
                display: block;
                margin-top: 2px;
                color: #9eb0cc;
                font-size: 10px;
            }

            .rfw-btn {
                border: 0;
                background: rgba(255,255,255,0.08);
                color: #d9e2ef;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                flex: none;
            }

            .rfw-btn:active {
                transform: scale(0.92);
            }

            #rfw-bar-play {
                width: 42px;
                height: 42px;
                border-radius: 14px;
                background: linear-gradient(135deg, #ef4444, #ff6b6b);
                color: #fff;
                font-size: 15px;
            }

            #rfw-bar-minimize,
            #rfw-bar-close {
                width: 30px;
                height: 30px;
                border-radius: 9px;
                font-size: 12px;
                font-weight: 900;
            }

            #rfw-bar-close:active {
                background: rgba(239,68,68,0.25);
            }

            /* -------- PANNEAU (volume + recompense) -------- */

            #rfw-panel {
                pointer-events: auto;
                margin: 0 8px 4px 8px;
                max-height: 0;
                overflow: hidden;
                border-radius: 18px;
                background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
                border: 1px solid rgba(255,255,255,0.1);
                transition: max-height 0.25s ease, opacity 0.2s ease, margin 0.25s ease;
                opacity: 0;
            }

            #rfw-root.rfw-panel-open #rfw-panel {
                max-height: 220px;
                opacity: 1;
            }

            #rfw-root.rfw-mode-bubble #rfw-panel {
                max-height: 0 !important;
                opacity: 0 !important;
            }

            #rfw-panel-inner {
                padding: 14px;
            }

            .rfw-volume-row {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
            }

            .rfw-volume-row span {
                font-size: 9px;
                font-weight: 900;
                color: #aebbd0;
            }

            #rfw-volume {
                flex: 1;
                height: 4px;
                appearance: none;
                -webkit-appearance: none;
                border-radius: 20px;
                background: rgba(255,255,255,0.18);
            }

            #rfw-volume::-webkit-slider-thumb {
                appearance: none;
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid #fff;
                background: #ef4444;
            }

            #rfw-volume::-moz-range-thumb {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid #fff;
                background: #ef4444;
            }

            .rfw-reward-header {
                display: flex;
                justify-content: space-between;
                gap: 10px;
            }

            .rfw-reward-header > div {
                display: flex;
                flex-direction: column;
            }

            .rfw-reward-header > div:last-child {
                text-align: right;
            }

            .rfw-reward-label {
                font-size: 8px;
                font-weight: 900;
                letter-spacing: 0.5px;
                color: #9eabc0;
            }

            .rfw-reward-header strong {
                margin-top: 4px;
                font-size: 11px;
                color: #fff;
            }

            #rfw-next-reward {
                color: #4ade80 !important;
            }

            #rfw-progress-track {
                margin-top: 10px;
                width: 100%;
                height: 6px;
                border-radius: 20px;
                background: rgba(255,255,255,0.1);
                overflow: hidden;
            }

            #rfw-progress-bar {
                width: 0%;
                height: 100%;
                border-radius: inherit;
                background: linear-gradient(90deg, #ef4444, #ff8a65);
                transition: width 0.5s ease;
            }

            #rfw-reward-message {
                margin-top: 8px;
                font-size: 9.5px;
                line-height: 1.5;
                color: #aebbd0;
            }

            #rfw-reward-message strong {
                color: #fff;
            }

            /* -------- PASTILLE (mode reduit) -------- */

            #rfw-bubble {
                pointer-events: auto;
                position: fixed;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #ef4444, #ff6b6b);
                box-shadow: 0 10px 26px rgba(239,68,68,0.45);
                display: none;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 18px;
                cursor: grab;
                touch-action: none;
                z-index: 999999;
                transition: box-shadow 0.15s ease;
            }

            #rfw-root.rfw-mode-bubble #rfw-bubble {
                display: flex;
            }

            #rfw-bubble.rfw-dragging {
                cursor: grabbing;
                box-shadow: 0 16px 34px rgba(239,68,68,0.6);
            }

            #rfw-bubble-live-dot {
                position: absolute;
                top: 2px;
                right: 2px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #ffffff;
                box-shadow: 0 0 0 2px #ef4444;
                animation: rfw-pulse 1.4s infinite;
            }

            @media (min-width: 640px) {
                #rfw-bar {
                    max-width: 420px;
                    margin-left: auto;
                    margin-right: 14px;
                }
                #rfw-panel {
                    max-width: 420px;
                    margin-left: auto;
                    margin-right: 14px;
                }
            }
        `;

        document.head.appendChild(style);

    }


    /* =========================================================
       CONSTRUCTION DU DOM
    ========================================================= */

    function buildDom() {

        if (document.getElementById('rfw-root')) {

            root = document.getElementById('rfw-root');

            return;

        }

        root = document.createElement('div');

        root.id = 'rfw-root';

        root.innerHTML = `
            <div id="rfw-panel">
                <div id="rfw-panel-inner">

                    <div class="rfw-volume-row">
                        <span>VOL</span>
                        <input id="rfw-volume" type="range" min="0" max="1" step="0.01" value="1" aria-label="Volume">
                    </div>

                    <div class="rfw-reward-header">
                        <div>
                            <span class="rfw-reward-label">TEMPS D'ECOUTE</span>
                            <strong id="rfw-listening-time">00:00:00</strong>
                        </div>
                        <div>
                            <span class="rfw-reward-label">PROCHAIN GAIN</span>
                            <strong id="rfw-next-reward">30 min - +3 points</strong>
                        </div>
                    </div>

                    <div id="rfw-progress-track">
                        <div id="rfw-progress-bar"></div>
                    </div>

                    <div id="rfw-reward-message">
                        Ecoutez Radio Fanambarana pendant <strong>30 minutes</strong> pour gagner <strong>+3 points</strong>.
                    </div>

                </div>
            </div>

            <div id="rfw-bar">
                <div id="rfw-bar-icon">
                    RADIO
                    <span id="rfw-bar-live-dot"></span>
                </div>
                <div id="rfw-bar-info">
                    <strong>Radio Fanambarana</strong>
                    <span id="rfw-bar-subtitle">Appuyez pour ecouter</span>
                </div>
                <button type="button" id="rfw-bar-play" class="rfw-btn" aria-label="Ecouter">&#9654;</button>
                <button type="button" id="rfw-bar-minimize" class="rfw-btn" aria-label="Reduire en bulle">&#8212;</button>
                <button type="button" id="rfw-bar-close" class="rfw-btn" aria-label="Fermer">&#10005;</button>
            </div>

            <div id="rfw-bubble" aria-label="Ouvrir Radio Fanambarana">
                <span id="rfw-bubble-play">&#9654;</span>
                <span id="rfw-bubble-live-dot"></span>
            </div>
        `;

        document.body.appendChild(root);


        const audioHost = document.createElement('audio');

        audioHost.id = 'rfw-audio';

        audioHost.preload = 'none';

        document.body.appendChild(audioHost);

        audio = audioHost;


        bar = document.getElementById('rfw-bar');

        bubble = document.getElementById('rfw-bubble');

        panel = document.getElementById('rfw-panel');

        barPlayButton = document.getElementById('rfw-bar-play');

        barMinimizeButton = document.getElementById('rfw-bar-minimize');

        barCloseButton = document.getElementById('rfw-bar-close');

        barExpandToggle = document.getElementById('rfw-bar-info');

        bubblePlayIcon = document.getElementById('rfw-bubble-play');

        volumeSlider = document.getElementById('rfw-volume');

        listeningTimeElement = document.getElementById('rfw-listening-time');

        nextRewardElement = document.getElementById('rfw-next-reward');

        progressBarElement = document.getElementById('rfw-progress-bar');

        rewardMessageElement = document.getElementById('rfw-reward-message');

    }


    /* =========================================================
       INTERFACE
    ========================================================= */

    function updateUI() {

        const time = formatTime(accumulatedSeconds);


        if (listeningTimeElement) {

            listeningTimeElement.textContent = time;

        }


        const subtitle = document.getElementById('rfw-bar-subtitle');

        if (subtitle) {

            if (autoplayBlocked) {

                subtitle.textContent = 'Appuyez pour reprendre';

            } else if (isPlaying) {

                subtitle.textContent = 'En direct';

            } else {

                subtitle.textContent = 'En pause';

            }

        }


        if (barPlayButton) {

            barPlayButton.innerHTML = isPlaying ? '&#10074;&#10074;' : '&#9654;';

            barPlayButton.setAttribute(
                'aria-label',
                isPlaying ? 'Mettre en pause' : 'Ecouter'
            );

        }


        if (bubblePlayIcon) {

            bubblePlayIcon.innerHTML = isPlaying ? '&#10074;&#10074;' : '&#9654;';

        }


        const secondsIntoPeriod = accumulatedSeconds % REWARD_INTERVAL;

        const progress = (secondsIntoPeriod / REWARD_INTERVAL) * 100;

        if (progressBarElement) {

            progressBarElement.style.width = `${Math.min(100, progress)}%`;

        }


        const completedRewards = Math.floor(accumulatedSeconds / REWARD_INTERVAL);

        const nextRewardMinutes = (completedRewards + 1) * 30;

        if (nextRewardElement) {

            nextRewardElement.textContent = `${nextRewardMinutes} min → +3 points`;

        }


        if (rewardMessageElement && !rewardMessageElement.dataset.showingReward) {

            const remainingSeconds = REWARD_INTERVAL - secondsIntoPeriod;

            const remainingMinutes = Math.ceil(remainingSeconds / 60);

            if (remainingMinutes >= 30) {

                rewardMessageElement.innerHTML =
                    'Ecoutez Radio Fanambarana pendant <strong>30 minutes</strong> pour gagner <strong>+3 points</strong>.';

            } else {

                rewardMessageElement.innerHTML =
                    `Encore <strong>${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}</strong> pour gagner <strong>+3 points</strong>.`;

            }

        }

    }


    function showReward(points) {

        if (!rewardMessageElement) {

            return;

        }

        rewardMessageElement.dataset.showingReward = '1';

        rewardMessageElement.innerHTML =
            `🎉 <strong>Felicitations !</strong> Vous avez gagne <strong>+${points} points</strong>.`;

        setTimeout(() => {

            if (rewardMessageElement) {

                delete rewardMessageElement.dataset.showingReward;

            }

            updateUI();

        }, 5000);

    }


    /* =========================================================
       MODE (bar / bubble) + PANNEAU
    ========================================================= */

    function setMode(mode) {

        if (!root) {

            return;

        }

        root.classList.toggle('rfw-mode-bubble', mode === 'bubble');

        localStorage.setItem(STORAGE.mode, mode);


        if (mode === 'bubble') {

            root.classList.remove('rfw-panel-open');

        }

    }


    function togglePanel() {

        if (!root || root.classList.contains('rfw-mode-bubble')) {

            return;

        }

        root.classList.toggle('rfw-panel-open');

    }


    function show() {

        if (!root) {

            return;

        }

        root.classList.remove('rfw-hidden');

        localStorage.removeItem(STORAGE.closed);

    }


    function hide() {

        if (!root) {

            return;

        }

        root.classList.add('rfw-hidden');

    }


    /* =========================================================
       LECTURE
    ========================================================= */

    async function startRadio() {

        if (!audio) {

            return;

        }

        try {

            if (!audio.src) {

                audio.src = RADIO_STREAM;

                audio.load();

            }

            await audio.play();

            autoplayBlocked = false;

            isPlaying = true;

            lastTick = Date.now();

            localStorage.setItem(STORAGE.playing, '1');

            localStorage.removeItem(STORAGE.closed);

            startSyncTimer();

            updateUI();

        } catch (error) {

            isPlaying = false;

            lastTick = null;

            stopSyncTimer();

            /*
             * L'autoplay a ete bloque par le navigateur
             * (reconnexion automatique au chargement de page).
             * On laisse l'utilisateur reprendre en tapant
             * sur la barre.
             */

            autoplayBlocked = true;

            updateUI();

            console.warn('[Radio] Lecture bloquee par le navigateur :', error);

        }

    }


    async function stopRadio() {

        if (isPlaying) {

            tick();

            await syncListeningTime();

        }

        if (audio) {

            audio.pause();

        }

        isPlaying = false;

        autoplayBlocked = false;

        lastTick = null;

        stopSyncTimer();

        localStorage.setItem(STORAGE.playing, '0');

        updateUI();

    }


    async function closeWidget() {

        await stopRadio();

        localStorage.setItem(STORAGE.closed, '1');

        hide();

    }


    /* =========================================================
       COMPTEUR + SYNCHRO (identique a la version precedente)
    ========================================================= */

    function tick() {

        if (!isPlaying || !lastTick) {

            return;

        }

        const now = Date.now();

        const elapsed = Math.floor((now - lastTick) / 1000);

        if (elapsed <= 0) {

            return;

        }

        accumulatedSeconds += elapsed;

        lastTick = now;

        updateUI();

    }


    async function syncListeningTime() {

        if (!isAuthenticated()) {

            return;

        }

        if (isSyncing || !lastTick) {

            return;

        }

        const now = Date.now();

        const elapsedSeconds = Math.floor((now - lastTick) / 1000);

        if (elapsedSeconds <= 0) {

            return;

        }

        const secondsToSend = Math.min(elapsedSeconds, 120);

        lastTick = now;

        isSyncing = true;

        try {

            const response = await fetch(`${API_BASE_URL}/api/radio/listen`, {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },

                body: JSON.stringify({ seconds: secondsToSend })

            });

            let data = {};

            try {

                data = await response.json();

            } catch (jsonError) {

                console.warn('[Radio] Reponse serveur non JSON.');

            }

            if (!response.ok) {

                accumulatedSeconds += secondsToSend;

                updateUI();

                return;

            }

            if (typeof data.radioListenSeconds === 'number') {

                accumulatedSeconds = data.radioListenSeconds;

            }

            updateUI();

            if (data.pointsEarned && Number(data.pointsEarned) > 0) {

                showReward(Number(data.pointsEarned));

            }

        } catch (error) {

            accumulatedSeconds += secondsToSend;

            updateUI();

        } finally {

            isSyncing = false;

        }

    }


    function startSyncTimer() {

        stopSyncTimer();

        syncTimer = setInterval(async () => {

            if (!isPlaying) {

                return;

            }

            tick();

            await syncListeningTime();

        }, SYNC_INTERVAL);

    }


    function stopSyncTimer() {

        if (syncTimer) {

            clearInterval(syncTimer);

            syncTimer = null;

        }

    }


    function startClock() {

        if (clockTimer) {

            clearInterval(clockTimer);

        }

        clockTimer = setInterval(() => {

            if (isPlaying) {

                tick();

            }

        }, 1000);

    }


    /* =========================================================
       DEPLACEMENT DE LA PASTILLE (drag façon Messenger)
    ========================================================= */

    function initBubbleDrag() {

        if (!bubble) {

            return;

        }

        let dragging = false;

        let moved = false;

        let startX = 0;

        let startY = 0;

        let originLeft = 0;

        let originTop = 0;


        function applyPosition(left, top) {

            const margin = 8;

            const maxLeft = window.innerWidth - bubble.offsetWidth - margin;

            const maxTop = window.innerHeight - bubble.offsetHeight - margin;

            left = Math.min(Math.max(margin, left), Math.max(margin, maxLeft));

            top = Math.min(Math.max(margin, top), Math.max(margin, maxTop));

            bubble.style.left = `${left}px`;

            bubble.style.top = `${top}px`;

            bubble.style.right = 'auto';

            bubble.style.bottom = 'auto';

        }


        function restorePosition() {

            const savedSide = localStorage.getItem(STORAGE.bubbleSide) || 'right';

            const savedTop = parseFloat(localStorage.getItem(STORAGE.bubbleTop));

            const margin = 8;

            const top = Number.isNaN(savedTop)
                ? window.innerHeight - 160
                : Math.max(margin, Math.min(savedTop, window.innerHeight - bubble.offsetHeight - margin));

            const left = savedSide === 'left'
                ? margin
                : window.innerWidth - bubble.offsetWidth - margin;

            applyPosition(left, top);

        }


        function savePosition() {

            const rect = bubble.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;

            const side = centerX < window.innerWidth / 2 ? 'left' : 'right';

            localStorage.setItem(STORAGE.bubbleSide, side);

            localStorage.setItem(STORAGE.bubbleTop, String(rect.top));

        }


        function snapToEdge() {

            const rect = bubble.getBoundingClientRect();

            const margin = 8;

            const centerX = rect.left + rect.width / 2;

            const targetLeft = centerX < window.innerWidth / 2
                ? margin
                : window.innerWidth - bubble.offsetWidth - margin;

            bubble.style.transition = 'left 0.22s ease';

            applyPosition(targetLeft, rect.top);

            setTimeout(() => {

                bubble.style.transition = '';

            }, 230);

            savePosition();

        }


        bubble.addEventListener('pointerdown', event => {

            dragging = true;

            moved = false;

            bubble.classList.add('rfw-dragging');

            bubble.setPointerCapture(event.pointerId);

            const rect = bubble.getBoundingClientRect();

            startX = event.clientX;

            startY = event.clientY;

            originLeft = rect.left;

            originTop = rect.top;

        });


        bubble.addEventListener('pointermove', event => {

            if (!dragging) {

                return;

            }

            const dx = event.clientX - startX;

            const dy = event.clientY - startY;

            if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {

                moved = true;

            }

            applyPosition(originLeft + dx, originTop + dy);

        });


        function endDrag() {

            if (!dragging) {

                return;

            }

            dragging = false;

            bubble.classList.remove('rfw-dragging');

            if (moved) {

                snapToEdge();

            } else {

                /*
                 * Simple tap : reagrandir la barre.
                 */

                setMode('bar');

            }

        }


        bubble.addEventListener('pointerup', endDrag);

        bubble.addEventListener('pointercancel', endDrag);


        window.addEventListener('resize', restorePosition);


        restorePosition();

    }


    /* =========================================================
       EVENEMENTS
    ========================================================= */

    function bindEvents() {

        if (barPlayButton) {

            barPlayButton.addEventListener('click', async () => {

                if (isPlaying) {

                    await stopRadio();

                } else {

                    await startRadio();

                }

            });

        }


        if (barExpandToggle) {

            barExpandToggle.addEventListener('click', () => {

                if (autoplayBlocked) {

                    startRadio();

                    return;

                }

                togglePanel();

            });

        }


        if (barMinimizeButton) {

            barMinimizeButton.addEventListener('click', () => {

                setMode('bubble');

            });

        }


        if (barCloseButton) {

            barCloseButton.addEventListener('click', async () => {

                await closeWidget();

            });

        }


        if (volumeSlider) {

            const savedVolume = parseFloat(localStorage.getItem(STORAGE.volume));

            const volume = Number.isNaN(savedVolume)
                ? 1
                : Math.max(0, Math.min(1, savedVolume));

            volumeSlider.value = String(volume);

            if (audio) {

                audio.volume = volume;

            }

            volumeSlider.addEventListener('input', () => {

                const value = parseFloat(volumeSlider.value);

                if (audio) {

                    audio.volume = value;

                }

                localStorage.setItem(STORAGE.volume, String(value));

            });

        }


        if (audio) {

            audio.addEventListener('play', () => {

                isPlaying = true;

                autoplayBlocked = false;

                if (!lastTick) {

                    lastTick = Date.now();

                }

                localStorage.setItem(STORAGE.playing, '1');

                startSyncTimer();

                updateUI();

            });

            audio.addEventListener('pause', () => {

                if (isPlaying) {

                    tick();

                }

                isPlaying = false;

                lastTick = null;

                stopSyncTimer();

                localStorage.setItem(STORAGE.playing, '0');

                updateUI();

            });

            audio.addEventListener('error', event => {

                console.error('[Radio] Erreur audio :', event);

            });

        }

    }


    /* =========================================================
       RESTAURATION AU CHARGEMENT DE PAGE
    ========================================================= */

    function restoreState() {

        const wasClosed = localStorage.getItem(STORAGE.closed) === '1';

        if (wasClosed) {

            hide();

            updateUI();

            return;

        }

        show();

        const savedMode = localStorage.getItem(STORAGE.mode) === 'bubble'
            ? 'bubble'
            : 'bar';

        setMode(savedMode);

        const shouldResume = localStorage.getItem(STORAGE.playing) === '1';

        updateUI();

        if (shouldResume) {

            /*
             * Reconnexion automatique au flux live.
             *
             * Les navigateurs bloquent parfois la lecture
             * automatique de l'audio ; dans ce cas l'etat
             * "autoplayBlocked" invite l'utilisateur a
             * simplement retaper sur la barre.
             */

            startRadio();

        }

    }


    /* =========================================================
       INITIALISATION
    ========================================================= */

    function init() {

        injectStyles();

        buildDom();

        bindEvents();

        initBubbleDrag();

        restoreState();

        startClock();

    }


    /* =========================================================
       API PUBLIQUE
    ========================================================= */

    window.RadioFanambarana = {

        open: async () => {

            show();

            setMode('bar');

            await startRadio();

        },

        close: closeWidget,

        play: startRadio,

        pause: stopRadio,

        minimize: () => setMode('bubble'),

        maximize: () => setMode('bar')

    };


    /* =========================================================
       DOM READY
    ========================================================= */

    if (document.readyState === 'loading') {

        document.addEventListener('DOMContentLoaded', init);

    } else {

        init();

    }


})();
