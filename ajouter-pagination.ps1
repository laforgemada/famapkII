$p = "utilisateur\espace_personnel.html"

# Lecture explicite en UTF-8
$c = [System.IO.File]::ReadAllText(
    (Resolve-Path $p).Path,
    [System.Text.Encoding]::UTF8
)

if ($c.Contains("function renderActivityPagination(")) {
    Write-Host "renderActivityPagination existe deja"
    exit 0
}

$marker = "async function loadActivities()"

$pagination = @'
function renderActivityPagination(totalPages, totalDays) {

    const paginationBar =
        document.getElementById('activity-pagination');

    if (!paginationBar) {
        return;
    }

    if (totalPages <= 1) {
        paginationBar.style.display = 'none';
        paginationBar.innerHTML = '';
        return;
    }

    paginationBar.style.display = 'flex';

    const pages = [];

    if (totalPages <= 6) {

        for (let p = 1; p <= totalPages; p++) {
            pages.push(p);
        }

    } else {

        pages.push(1);

        if (currentActivityPage > 3) {
            pages.push('...');
        }

        const start =
            Math.max(2, currentActivityPage - 1);

        const end =
            Math.min(totalPages - 1, currentActivityPage + 1);

        for (let p = start; p <= end; p++) {
            pages.push(p);
        }

        if (currentActivityPage < totalPages - 2) {
            pages.push('...');
        }

        pages.push(totalPages);
    }

    const numbersHtml =
        pages.map(function(p) {

            if (p === '...') {
                return `
                    <span class="activity-page-ellipsis">
                        ...
                    </span>
                `;
            }

            const active =
                p === currentActivityPage;

            return `
                <button
                    type="button"
                    class="activity-page-btn${active ? ' active' : ''}"
                    ${active ? 'aria-current="page"' : ''}
                    onclick="goToActivityPage(${p})"
                >
                    ${p}
                </button>
            `;

        }).join('');

    paginationBar.innerHTML = `

        <button
            type="button"
            class="activity-page-nav"
            onclick="goToActivityPage(currentActivityPage - 1)"
            aria-label="Page précédente"
            ${currentActivityPage === 1 ? 'disabled' : ''}
        >
            <i data-feather="chevron-left"></i>
        </button>

        <div class="activity-page-numbers">
            ${numbersHtml}
        </div>

        <button
            type="button"
            class="activity-page-nav"
            onclick="goToActivityPage(currentActivityPage + 1)"
            aria-label="Page suivante"
            ${currentActivityPage === totalPages ? 'disabled' : ''}
        >
            <i data-feather="chevron-right"></i>
        </button>

        <span class="activity-page-meta">
            ${totalDays}
            ${totalDays > 1 ? 'jours' : 'jour'}
        </span>
    `;

    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}


/*
 * Navigation entre les pages d'activités.
 */
function goToActivityPage(page) {

    const groupedDates =
        allRawActivities.reduce(function(acc, item) {

            const key =
                formatDateForDisplay(item.created_at);

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(item);

            return acc;

        }, {});

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                Object.keys(groupedDates).length /
                ACTIVITIES_DAYS_PER_PAGE
            )
        );

    if (page < 1 || page > totalPages) {
        return;
    }

    if (page === currentActivityPage) {
        return;
    }

    currentActivityPage = page;

    renderActivities(allRawActivities);

    const section =
        document.getElementById('recent-activities-card');

    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}


'@

$index = $c.IndexOf($marker)

if ($index -lt 0) {
    Write-Host "ERREUR : marker introuvable"
    exit 1
}

$c = $c.Insert($index, $pagination)

# Écriture UTF-8 explicite sans BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

[System.IO.File]::WriteAllText(
    (Resolve-Path $p).Path,
    $c,
    $utf8NoBom
)

Write-Host "PAGINATION AJOUTEE SANS MODIFIER L'ENCODAGE"