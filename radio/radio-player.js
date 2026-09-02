/*
 * ============================================================
 * RADIO FANAMBARANA — LECTEUR GLOBAL
 * ============================================================
 *
 * Lecteur dans une fenêtre séparée.
 *
 * Fonctionnalités :
 * - lecture Radio Fanambarana
 * - volume mémorisé
 * - temps d'écoute local
 * - synchronisation serveur pour les utilisateurs connectés
 * - récompense +3 points toutes les 30 minutes
 * - fonctionnement invité
 * - restauration de l'état après actualisation
 *
 * ============================================================
 */

(function () {

    'use strict';


    /* =========================================================
       CONFIGURATION
    ========================================================= */

    const API_BASE_URL = 'https://apokalypsy.com';

    /*
     * Flux Radio Fanambarana
     */
    const RADIO_STREAM = 'https://apokalypsy.com/radio-proxy';

    /*
     * Synchronisation serveur :
     * toutes les 60 secondes.
     */
    const SYNC_INTERVAL = 60 * 1000;

    /*
     * Une récompense toutes les 30 minutes.
     */
    const REWARD_INTERVAL = 30 * 60;


    /* =========================================================
       STOCKAGE LOCAL
    ========================================================= */

    const STORAGE = {

        playing: 'radioFanambaranaPlaying',

        volume: 'radioFanambaranaVolume',

        closed: 'radioFanambaranaClosed'

    };


    /* =========================================================
       ELEMENTS DOM
    ========================================================= */

    let audio = null;

    let playButton = null;

    let timeElement = null;

    let listeningTimeElement = null;

    let nextRewardElement = null;

    let progressBar = null;

    let rewardMessageElement = null;

    let volumeElement = null;

    let closeButton = null;


    /* =========================================================
       ETAT
    ========================================================= */

    let isPlaying = false;

    let accumulatedSeconds = 0;

    let lastTick = null;

    let syncTimer = null;

    let clockTimer = null;

    let isSyncing = false;


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

        return Boolean(
            getToken() &&
            getUsername()
        );

    }


    /* =========================================================
       FORMAT TEMPS
    ========================================================= */

    function formatTime(totalSeconds) {

        totalSeconds =
            Math.max(
                0,
                Math.floor(totalSeconds)
            );

        const hours =
            Math.floor(
                totalSeconds / 3600
            );

        const minutes =
            Math.floor(
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


    /* =========================================================
       RECUPERATION DES ELEMENTS
    ========================================================= */

    function findElements() {

        audio =
            document.getElementById(
                'radio-global-audio'
            );

        playButton =
            document.getElementById(
                'radio-global-play'
            );

        timeElement =
            document.getElementById(
                'radio-global-time'
            );

        listeningTimeElement =
            document.getElementById(
                'radio-listening-time'
            );

        nextRewardElement =
            document.getElementById(
                'radio-next-reward'
            );

        progressBar =
            document.getElementById(
                'radio-progress-bar'
            );

        rewardMessageElement =
            document.getElementById(
                'radio-reward-message'
            );

        volumeElement =
            document.getElementById(
                'radio-global-volume'
            );

        closeButton =
            document.getElementById(
                'radio-global-close'
            );


        if (!audio) {

            console.error(
                '[Radio] #radio-global-audio introuvable.'
            );

            return false;

        }


        if (!playButton) {

            console.error(
                '[Radio] #radio-global-play introuvable.'
            );

            return false;

        }


        return true;

    }


    /* =========================================================
       INTERFACE
    ========================================================= */

    function updateUI() {

        const time =
            formatTime(
                accumulatedSeconds
            );


        /*
         * Temps global.
         */

        if (timeElement) {

            timeElement.textContent =
                time;

        }


        /*
         * Temps d'écoute.
         */

        if (listeningTimeElement) {

            listeningTimeElement.textContent =
                time;

        }


        /*
         * Bouton lecture / pause.
         */

        if (playButton) {

            playButton.textContent =
                isPlaying
                    ? '❚❚'
                    : '▶';

            playButton.setAttribute(
                'aria-label',
                isPlaying
                    ? 'Mettre la radio en pause'
                    : 'Écouter Radio Fanambarana'
            );

        }


        /*
         * Progression vers les 30 minutes.
         */

        const secondsIntoPeriod =
            accumulatedSeconds %
            REWARD_INTERVAL;


        const progress =
            (
                secondsIntoPeriod /
                REWARD_INTERVAL
            ) * 100;


        if (progressBar) {

            progressBar.style.width =
                `${Math.min(100, progress)}%`;

        }


        /*
         * Prochain palier.
         */

        const completedRewards =
            Math.floor(
                accumulatedSeconds /
                REWARD_INTERVAL
            );


        const nextRewardMinutes =
            (completedRewards + 1) * 30;


        if (nextRewardElement) {

            nextRewardElement.textContent =
                `${nextRewardMinutes} min → +3 points`;

        }


        /*
         * Message.
         */

        if (rewardMessageElement) {

            const remainingSeconds =
                REWARD_INTERVAL -
                secondsIntoPeriod;


            const remainingMinutes =
                Math.ceil(
                    remainingSeconds / 60
                );


            if (
                remainingMinutes >= 30
            ) {

                rewardMessageElement.innerHTML =
                    'Écoutez Radio Fanambarana pendant ' +
                    '<strong>30 minutes</strong> ' +
                    'pour gagner ' +
                    '<strong>+3 points</strong>.';

            } else {

                rewardMessageElement.innerHTML =
                    `Encore <strong>${remainingMinutes} ` +
                    `minute${remainingMinutes > 1 ? 's' : ''}</strong> ` +
                    `pour gagner <strong>+3 points</strong>.`;

            }

        }

    }


    /* =========================================================
       COMPTEUR LOCAL
    ========================================================= */

    function tick() {

        if (
            !isPlaying ||
            !lastTick
        ) {

            return;

        }


        const now =
            Date.now();


        const elapsed =
            Math.floor(
                (now - lastTick) / 1000
            );


        if (elapsed <= 0) {

            return;

        }


        accumulatedSeconds +=
            elapsed;


        lastTick =
            now;


        updateUI();

    }


    /* =========================================================
       SYNCHRONISATION SERVEUR
    ========================================================= */

    async function syncListeningTime() {

        /*
         * Invité :
         * rien n'est envoyé au serveur.
         */

        if (!isAuthenticated()) {

            return;

        }


        if (
            isSyncing ||
            !lastTick
        ) {

            return;

        }


        const now =
            Date.now();


        const elapsedSeconds =
            Math.floor(
                (now - lastTick) / 1000
            );


        if (elapsedSeconds <= 0) {

            return;

        }


        /*
         * Maximum de 120 secondes
         * envoyées par requête.
         */

        const secondsToSend =
            Math.min(
                elapsedSeconds,
                120
            );


        /*
         * On avance immédiatement le point
         * de référence afin d'éviter un double comptage.
         */

        lastTick =
            now;


        isSyncing = true;


        try {

            const token =
                getToken();


            const response =
                await fetch(
                    `${API_BASE_URL}/api/radio/listen`,
                    {

                        method: 'POST',

                        headers: {

                            'Content-Type':
                                'application/json',

                            'Authorization':
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify({

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


            console.log(
                '[Radio] Synchronisation :',
                data
            );


            /*
             * Serveur refuse la requête.
             */

            if (!response.ok) {

                console.warn(
                    '[Radio] Erreur serveur :',
                    response.status,
                    data
                );


                /*
                 * On restitue les secondes localement.
                 */

                accumulatedSeconds +=
                    secondsToSend;

                updateUI();

                return;

            }


            /*
             * Le serveur donne le compteur officiel.
             */

            if (
                typeof data.radioListenSeconds ===
                'number'
            ) {

                accumulatedSeconds =
                    data.radioListenSeconds;

            }


            updateUI();


            /*
             * Récompense.
             */

            if (
                data.pointsEarned &&
                Number(data.pointsEarned) > 0
            ) {

                showReward(
                    Number(data.pointsEarned)
                );

            }

        } catch (error) {

            console.error(
                '[Radio] Erreur réseau :',
                error
            );


            /*
             * En cas de panne réseau,
             * on conserve le temps local.
             */

            accumulatedSeconds +=
                secondsToSend;

            updateUI();

        } finally {

            isSyncing = false;

        }

    }


    /* =========================================================
       RECOMPENSE
    ========================================================= */

    function showReward(points) {

        if (!rewardMessageElement) {

            return;

        }


        rewardMessageElement.innerHTML =
            `🎉 <strong>Félicitations !</strong> ` +
            `Vous avez gagné ` +
            `<strong>+${points} points</strong> ` +
            `grâce à votre écoute de Radio Fanambarana.`;


        setTimeout(
            () => {

                updateUI();

            },
            5000
        );

    }


    /* =========================================================
       DEMARRER LA RADIO
    ========================================================= */

    async function startRadio() {

        if (!audio) {

            console.error(
                '[Radio] Élément audio absent.'
            );

            return;

        }


        try {

            /*
             * Définir le flux une seule fois.
             */

            if (!audio.src) {

                audio.src =
                    RADIO_STREAM;

                audio.load();

            }


            /*
             * Lancement.
             */

            await audio.play();


            isPlaying = true;


            lastTick =
                Date.now();


            localStorage.setItem(
                STORAGE.playing,
                '1'
            );


            localStorage.removeItem(
                STORAGE.closed
            );


            startSyncTimer();


            updateUI();


            console.log(
                '[Radio] Lecture démarrée.'
            );

        } catch (error) {

            isPlaying = false;

            lastTick = null;

            stopSyncTimer();

            updateUI();


            console.error(
                '[Radio] Impossible de démarrer la radio :',
                error
            );

        }

    }


    /* =========================================================
       ARRETER LA RADIO
    ========================================================= */

    async function stopRadio() {

        if (isPlaying) {

            /*
             * Ajouter les dernières secondes.
             */

            tick();


            /*
             * Envoyer immédiatement
             * les dernières secondes.
             */

            await syncListeningTime();

        }


        if (audio) {

            audio.pause();

        }


        isPlaying = false;

        lastTick = null;


        stopSyncTimer();


        localStorage.setItem(
            STORAGE.playing,
            '0'
        );


        updateUI();


        console.log(
            '[Radio] Lecture arrêtée.'
        );

    }


    /* =========================================================
       FERMER LA FENETRE
    ========================================================= */

    async function closePlayer() {

        await stopRadio();


        localStorage.setItem(
            STORAGE.closed,
            '1'
        );


        console.log(
            '[Radio] Lecteur fermé.'
        );


        /*
         * Fermer réellement la fenêtre popup.
         */

        try {

            window.close();

        } catch (error) {

            console.warn(
                '[Radio] Impossible de fermer la fenêtre.',
                error
            );

        }

    }


    /* =========================================================
       OUVRIR / RESTAURER
    ========================================================= */

    function openPlayer() {

        localStorage.removeItem(
            STORAGE.closed
        );


        updateUI();

    }


    /* =========================================================
       TIMER SYNCHRONISATION
    ========================================================= */

    function startSyncTimer() {

        stopSyncTimer();


        syncTimer =
            setInterval(
                async () => {

                    if (!isPlaying) {

                        return;

                    }


                    /*
                     * Mettre à jour le compteur local.
                     */

                    tick();


                    /*
                     * Envoyer au serveur.
                     */

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


    /* =========================================================
       HORLOGE LOCALE
    ========================================================= */

    function startClock() {

        if (clockTimer) {

            clearInterval(
                clockTimer
            );

        }


        clockTimer =
            setInterval(
                () => {

                    if (isPlaying) {

                        tick();

                    }

                },
                1000
            );

    }


    /* =========================================================
       EVENEMENTS
    ========================================================= */

    function bindEvents() {

        /*
         * PLAY / PAUSE
         */

        if (playButton) {

            playButton.addEventListener(
                'click',
                async () => {

                    if (isPlaying) {

                        await stopRadio();

                    } else {

                        await startRadio();

                    }

                }
            );

        }


        /*
         * FERMETURE
         */

        if (closeButton) {

            closeButton.addEventListener(
                'click',
                async () => {

                    await closePlayer();

                }
            );

        }


        /*
         * VOLUME
         */

        if (volumeElement) {

            const savedVolume =
                parseFloat(
                    localStorage.getItem(
                        STORAGE.volume
                    )
                );


            let volume = 1;


            if (
                !Number.isNaN(savedVolume)
            ) {

                volume =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            savedVolume
                        )
                    );

            }


            volumeElement.value =
                String(volume);


            if (audio) {

                audio.volume =
                    volume;

            }


            volumeElement.addEventListener(
                'input',
                () => {

                    const value =
                        parseFloat(
                            volumeElement.value
                        );


                    if (audio) {

                        audio.volume =
                            value;

                    }


                    localStorage.setItem(
                        STORAGE.volume,
                        String(value)
                    );

                }
            );

        }


        /*
         * EVENEMENT PLAY AUDIO
         */

        if (audio) {

            audio.addEventListener(
                'play',
                () => {

                    isPlaying = true;

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


            /*
             * EVENEMENT PAUSE AUDIO
             */

            audio.addEventListener(
                'pause',
                () => {

                    if (isPlaying) {

                        tick();

                    }


                    isPlaying = false;

                    lastTick = null;


                    stopSyncTimer();


                    localStorage.setItem(
                        STORAGE.playing,
                        '0'
                    );


                    updateUI();

                }
            );


            /*
             * ERREUR AUDIO
             */

            audio.addEventListener(
                'error',
                event => {

                    console.error(
                        '[Radio] Erreur audio :',
                        event
                    );

                }
            );

        }

    }


    /* =========================================================
       RESTAURATION
    ========================================================= */

    function restoreState() {

        /*
         * Volume.
         */

        const savedVolume =
            parseFloat(
                localStorage.getItem(
                    STORAGE.volume
                )
            );


        if (
            audio &&
            !Number.isNaN(savedVolume)
        ) {

            audio.volume =
                Math.max(
                    0,
                    Math.min(
                        1,
                        savedVolume
                    )
                );

        } else if (audio) {

            audio.volume = 1;

        }


        if (
            volumeElement &&
            audio
        ) {

            volumeElement.value =
                String(
                    audio.volume
                );

        }


        /*
         * Pour un utilisateur connecté,
         * le serveur sera la source officielle
         * dès la première synchronisation.
         */

        /*
         * Etat fermé.
         */

        if (
            localStorage.getItem(
                STORAGE.closed
            ) === '1'
        ) {

            updateUI();

            return;

        }


        /*
         * Etat précédent.
         */

        const shouldResume =
            localStorage.getItem(
                STORAGE.playing
            ) === '1';


        updateUI();


        /*
         * IMPORTANT :
         *
         * Les navigateurs bloquent souvent
         * la lecture automatique dans une nouvelle
         * fenêtre.
         *
         * On ne force donc pas le autoplay.
         */

        if (shouldResume) {

            console.log(
                '[Radio] Lecture précédente détectée.'
            );

        }

    }


    /* =========================================================
       INITIALISATION
    ========================================================= */

    function init() {

        console.log(
            '[Radio] Initialisation...'
        );


        if (!findElements()) {

            return;

        }


        bindEvents();

        restoreState();

        startClock();

        updateUI();


        console.log(
            '[Radio] Lecteur Fanambarana initialisé.'
        );

    }


    /* =========================================================
       API PUBLIQUE
    ========================================================= */

    window.RadioFanambarana = {

        play:
            startRadio,

        pause:
            stopRadio,

        close:
            closePlayer,

        open:
            openPlayer,

        sync:
            syncListeningTime

    };


    /* =========================================================
       DOM READY
    ========================================================= */

    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            init
        );

    } else {

        init();

    }


})();

