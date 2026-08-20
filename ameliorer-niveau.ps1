$p = "utilisateur\espace_personnel.html"

$c = Get-Content $p -Raw -Encoding UTF8

$start = $c.IndexOf("function renderUserStats()")
$end = $c.IndexOf("function generateTrophies(points)", $start)

if ($start -lt 0 -or $end -lt 0) {
    Write-Host "ERREUR : renderUserStats introuvable"
    exit 1
}

$new = @'
function renderUserStats() {
    const { total, bibleVerses, bibleChapters, prayerMinutes } = userPoints;

    const safeTotal = Math.max(0, Number(total) || 0);

    /*
     * =========================
     * NIVEAU + PROGRESSION XP
     * =========================
     */

    const level = calculateLevel(safeTotal);
    const progress = calculateProgress(safeTotal);

    const currentXP = Math.floor(safeTotal % 100);
    const nextLevelXP = 100;
    const remainingXP = nextLevelXP - currentXP;

    // Solde principal
    setText(
        'display-points',
        `${safeTotal.toFixed(2)} Points`
    );

    // Badge Niveau
    const levelBtn = document.querySelector('.progress-btn');

    if (levelBtn) {
        levelBtn.innerHTML = `
            <span class="level-badge-icon">⚡</span>
            <span>Niveau ${level}</span>
        `;

        levelBtn.setAttribute(
            'aria-label',
            `Niveau ${level}, ${currentXP} points sur 100`
        );
    }

    /*
     * =========================
     * CERCLE DE PROGRESSION
     * =========================
     */

    const circleText = document.querySelector('.circle-text');

    if (circleText) {
        circleText.innerHTML = `
            <strong>${currentXP}</strong>
            <small>/ 100 XP</small>
        `;
    }

    const circleSub = document.querySelector('.circle-sub');

    if (circleSub) {
        circleSub.textContent =
            remainingXP === 100
                ? 'Commencez votre progression'
                : `${remainingXP} XP avant le niveau ${level + 1}`;
    }

    const progressCircle =
        document.querySelector('.progress-circle');

    if (progressCircle) {

        const percentage =
            Math.min(100, Math.max(0, progress));

        progressCircle.style.background =
            `conic-gradient(
                #ef4444 0%,
                #f97316 ${percentage}%,
                #e2e8f0 ${percentage}%,
                #e2e8f0 100%
            )`;

        progressCircle.setAttribute(
            'aria-label',
            `Progression du niveau ${level} : ${currentXP} sur 100 XP`
        );
    }

    /*
     * =========================
     * STATISTIQUES
     * =========================
     */

    setText('stats-versets', bibleVerses);
    setText('stats-lecons', bibleChapters);

    setText(
        'stats-priere',
        `${Math.floor(safeTotal * 2)}m`
    );

    /*
     * =========================
     * TROPHÉES
     * =========================
     */

    generateTrophies(safeTotal);

    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

'@

$c = $c.Substring(0, $start) + $new + $c.Substring($end)

Set-Content $p $c -Encoding UTF8

Write-Host "NIVEAU ET PROGRESSION AMELIORES"