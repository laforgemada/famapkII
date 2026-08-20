$p = "css\espace_personnel.css"

$c = Get-Content $p -Raw -Encoding UTF8

$marker = "/* =========================`r`nPROGRESS UI PREMIUM"

if ($c.Contains($marker)) {
    Write-Host "PROGRESS UI PREMIUM existe deja"
    exit 0
}

$css = @'

/* =========================
PROGRESS UI PREMIUM
========================= */

/*
 * Cercle XP façon HUD de jeu
 */
.progress-circle {
    min-width: 128px;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    background:
        conic-gradient(
            #ef4444 0%,
            #f97316 0%,
            #e2e8f0 0%,
            #e2e8f0 100%
        );

    box-shadow:
        0 10px 28px rgba(239, 68, 68, 0.22),
        0 0 0 4px rgba(239, 68, 68, 0.06);

    transition:
        background 1s cubic-bezier(.22,1,.36,1),
        transform .35s ease,
        box-shadow .35s ease;

    animation: progressCircleFloat 4s ease-in-out infinite;
}

/*
 * Anneau intérieur
 */
.progress-circle::before {
    width: 94px;
    height: 94px;
    border-radius: 50%;
    background: var(--surface, #ffffff);

    box-shadow:
        inset 0 2px 8px rgba(15, 23, 42, 0.08);

    transition:
        background .3s ease,
        box-shadow .3s ease;
}

/*
 * Contenu central
 */
.progress-content {
    position: relative;
    z-index: 3;
    text-align: center;
    min-width: 70px;
}

/*
 * XP : nombre principal
 */
.circle-text {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 3px;

    color: #ef4444;

    font-size: 1.35rem;
    line-height: 1;
    font-weight: 950;
    letter-spacing: -0.5px;

    text-shadow:
        0 2px 8px rgba(239, 68, 68, 0.18);
}

.circle-text strong {
    font-size: 1.45rem;
    font-weight: 950;
}

.circle-text small {
    font-size: 0.58rem;
    font-weight: 900;
    color: var(--muted);
    letter-spacing: 0;
}

/*
 * Texte sous le compteur
 */
.circle-sub {
    display: block;

    margin-top: 7px;

    max-width: 88px;

    font-size: 0.58rem;
    line-height: 1.25;
    font-weight: 800;

    color: var(--muted);

    text-transform: none;
    letter-spacing: 0.1px;
}

/*
 * Badge Niveau premium
 */
.progress-btn {
    position: absolute;
    right: 0;
    top: -7px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;

    min-height: 36px;

    padding: 8px 13px;

    border-radius: 13px;

    background:
        linear-gradient(
            135deg,
            #111827 0%,
            #1f2937 55%,
            #111827 100%
        );

    color: #fbbf24;

    font-size: 0.72rem;
    font-weight: 950;

    letter-spacing: 0.2px;

    border: 1px solid rgba(251, 191, 36, 0.45);

    box-shadow:
        0 8px 18px rgba(15, 23, 42, 0.28),
        inset 0 1px 1px rgba(255,255,255,0.16);

    transition:
        transform .25s ease,
        box-shadow .25s ease,
        border-color .25s ease;
}

/*
 * On désactive l'ancien losange CSS
 * car le JavaScript ajoute maintenant
 * sa propre icône ⚡.
 */
.progress-btn::before {
    content: none;
}

/*
 * Icône du niveau
 */
.level-badge-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 21px;
    height: 21px;

    border-radius: 7px;

    background:
        linear-gradient(
            135deg,
            #fbbf24,
            #f59e0b
        );

    color: #111827;

    font-size: 0.75rem;

    box-shadow:
        0 3px 8px rgba(245, 158, 11, 0.35);

    animation: levelIconPulse 2.4s ease-in-out infinite;
}

.progress-btn:hover {
    transform: translateY(-2px);

    border-color: rgba(251, 191, 36, 0.8);

    box-shadow:
        0 12px 24px rgba(15, 23, 42, 0.35),
        0 0 18px rgba(251, 191, 36, 0.12),
        inset 0 1px 1px rgba(255,255,255,0.18);
}

/*
 * Petit effet de lumière autour du cercle
 */
.progress-circle::after {
    content: "";

    position: absolute;

    inset: -5px;

    border-radius: 50%;

    border: 1px solid rgba(239, 68, 68, 0.12);

    pointer-events: none;

    animation: progressRingPulse 2.8s ease-in-out infinite;
}

/*
 * Animation flottante très légère
 */
@keyframes progressCircleFloat {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-2px);
    }
}

/*
 * Pulsation de l'anneau extérieur
 */
@keyframes progressRingPulse {
    0%, 100% {
        opacity: .35;
        transform: scale(1);
    }

    50% {
        opacity: .75;
        transform: scale(1.025);
    }
}

/*
 * Pulsation de l'icône Niveau
 */
@keyframes levelIconPulse {
    0%, 100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.08);
    }
}

/*
 * Mode sombre
 */
html[data-theme="dark"] .progress-circle::before {
    background: var(--surface, #111827);

    box-shadow:
        inset 0 2px 10px rgba(0,0,0,0.35);
}

html[data-theme="dark"] .progress-circle {
    box-shadow:
        0 10px 30px rgba(239, 68, 68, 0.16),
        0 0 0 4px rgba(239, 68, 68, 0.05);
}

html[data-theme="dark"] .circle-text {
    color: #fb7185;

    text-shadow:
        0 0 12px rgba(251, 113, 133, 0.22);
}

html[data-theme="dark"] .progress-btn {
    background:
        linear-gradient(
            135deg,
            #111827,
            #0f172a
        );

    border-color: rgba(251, 191, 36, 0.38);
}

/*
 * Mobile
 */
@media (max-width: 480px) {

    .progress-circle {
        min-width: 112px;
        width: 112px;
        height: 112px;
    }

    .progress-circle::before {
        width: 82px;
        height: 82px;
    }

    .circle-text strong {
        font-size: 1.25rem;
    }

    .circle-text {
        font-size: 1.15rem;
    }

    .circle-sub {
        max-width: 78px;
        font-size: 0.52rem;
    }

    .progress-btn {
        top: -5px;
        right: -2px;

        min-height: 33px;

        padding: 7px 10px;

        font-size: 0.66rem;
    }

    .level-badge-icon {
        width: 19px;
        height: 19px;
        font-size: 0.68rem;
    }
}

'@

# Ajouter les nouveaux styles à la fin du fichier
$c = $c.TrimEnd() + "`r`n`r`n" + $css + "`r`n"

Set-Content $p $c -Encoding UTF8

Write-Host "PROGRESS UI PREMIUM AJOUTEE"