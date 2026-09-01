/*
 * ============================================================
 * RADIO FANAMBARANA — LAUNCHER GLOBAL
 * ============================================================
 *
 * Ouvre et réutilise la fenêtre Radio Fanambarana.
 *
 * - Une seule fenêtre Radio
 * - Réutilisation après navigation
 * - Focus automatique
 * - Positionnement amélioré
 * - Compatible desktop / mobile
 * ============================================================
 */

(function () {

    'use strict';


    /* =========================================================
       CONFIGURATION
    ========================================================= */

    const RADIO_WINDOW_NAME = 'radioFanambarana';

    const RADIO_URL =
        '/radio/radio.html';

    let radioWindow = null;


    /* =========================================================
       DETECTER MOBILE
    ========================================================= */

    function isMobile() {

        return (
            window.innerWidth <= 768 ||
            /Android|iPhone|iPad|iPod|Mobile/i.test(
                navigator.userAgent
            )
        );

    }


    /* =========================================================
       DIMENSIONS
    ========================================================= */

    function getWindowFeatures() {

        /*
         * Sur mobile, le navigateur décide souvent lui-même
         * de la taille d'une fenêtre ouverte par window.open().
         */

        if (isMobile()) {

            return [
                'width=390',
                'height=160',
                'resizable=yes',
                'scrollbars=no',
                'menubar=no',
                'toolbar=no',
                'location=no',
                'status=no'
            ].join(',');

        }


        /*
         * Desktop.
         */

        const width = 460;

        const height = 190;


        /*
         * Centrage approximatif.
         */

        const left =
            Math.max(
                0,
                Math.round(
                    (screen.width - width) / 2
                )
            );


        const top =
            Math.max(
                0,
                Math.round(
                    (screen.height - height) / 2
                )
            );


        return [
            `width=${width}`,
            `height=${height}`,
            `left=${left}`,
            `top=${top}`,
            'resizable=yes',
            'scrollbars=no',
            'menubar=no',
            'toolbar=no',
            'location=no',
            'status=no'
        ].join(',');

    }


    /* =========================================================
       FOCUS
    ========================================================= */

    function focusRadio() {

        if (
            !radioWindow ||
            radioWindow.closed
        ) {

            return;

        }


        try {

            radioWindow.focus();

        } catch (error) {

            console.warn(
                '[Radio] Impossible de remettre la fenêtre au premier plan.',
                error
            );

        }

    }


    /* =========================================================
       OUVRIR RADIO
    ========================================================= */

    function openRadio() {

        /*
         * -----------------------------------------------------
         * CAS 1 :
         * La fenêtre existe déjà.
         * -----------------------------------------------------
         */

        if (
            radioWindow &&
            !radioWindow.closed
        ) {

            console.log(
                '[Radio] Fenêtre existante réutilisée.'
            );


            focusRadio();


            /*
             * Petit deuxième focus.
             *
             * Certains navigateurs retardent le focus lorsque
             * plusieurs événements sont exécutés simultanément.
             */

            setTimeout(
                focusRadio,
                100
            );


            return radioWindow;

        }


        /*
         * -----------------------------------------------------
         * CAS 2 :
         * Nouvelle fenêtre.
         * -----------------------------------------------------
         */

        const features =
            getWindowFeatures();


        radioWindow =
            window.open(
                RADIO_URL,
                RADIO_WINDOW_NAME,
                features
            );


        /*
         * Popup bloquée.
         */

        if (!radioWindow) {

            console.warn(
                '[Radio] Le navigateur a bloqué la fenêtre Radio.'
            );


            /*
             * Solution de secours :
             * ouverture normale dans le même onglet.
             */

            const confirmed =
                window.confirm(
                    'La fenêtre Radio a été bloquée par votre navigateur. Ouvrir Radio Fanambarana dans cette page ?'
                );


            if (confirmed) {

                window.location.href =
                    RADIO_URL;

            }


            return null;

        }


        console.log(
            '[Radio] Ouverture de :',
            RADIO_URL
        );


        /*
         * Focus immédiat.
         */

        focusRadio();


        /*
         * Le document de la nouvelle fenêtre peut mettre
         * quelques centaines de millisecondes à être créé.
         *
         * On retente donc le focus.
         */

        setTimeout(
            focusRadio,
            150
        );


        setTimeout(
            focusRadio,
            500
        );


        /*
         * Vérification supplémentaire après chargement.
         */

        try {

            radioWindow.addEventListener(
                'load',
                function () {

                    focusRadio();

                }
            );

        } catch (error) {

            /*
             * Certains navigateurs peuvent empêcher
             * l'accès direct aux événements de la popup.
             */

        }


        return radioWindow;

    }


    /* =========================================================
       FERMER RADIO
    ========================================================= */

    function closeRadio() {

        if (
            radioWindow &&
            !radioWindow.closed
        ) {

            radioWindow.close();

        }


        radioWindow = null;

    }


    /* =========================================================
       VERIFIER LA FENETRE
    ========================================================= */

    function isOpen() {

        return (
            radioWindow !== null &&
            !radioWindow.closed
        );

    }


    /* =========================================================
       API PUBLIQUE
    ========================================================= */

    window.RadioLauncher = {

        open:
            openRadio,

        close:
            closeRadio,

        focus:
            focusRadio,

        isOpen:
            isOpen

    };


    /* =========================================================
       INITIALISATION
    ========================================================= */

    console.log(
        '[Radio] RadioLauncher initialisé.'
    );


})();

