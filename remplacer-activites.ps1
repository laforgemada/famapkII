$p = 'utilisateur\espace_personnel.html'

$c = Get-Content $p -Raw

$start = $c.IndexOf('function renderActivities(allData)')
$end = $c.IndexOf('async function loadActivities()', $start)

if ($start -lt 0 -or $end -lt 0) {
    Write-Host 'BLOC INTROUVABLE'
    exit 1
}

$new = @'
function renderActivities(allData) {

    const activityDisplayArea =
        document.getElementById('activity-display-area');

    const activityListSkeleton =
        document.getElementById('activity-list-skeleton');

    const paginationBar =
        document.getElementById('activity-pagination');

    if (!activityDisplayArea || !activityListSkeleton) {
        return;
    }

    activityListSkeleton.style.display = 'none';

    if (!allData || allData.length === 0) {

        activityDisplayArea.innerHTML = `
            <div class="activity-empty-state">
                <div class="activity-empty-icon">
                    <i data-feather="book-open"></i>
                </div>

                <p>Aucune activité récente pour le moment.</p>

                <span>
                    Commencez à lire la Bible pour voir votre progression ici !
                </span>
            </div>
        `;

        if (paginationBar) {
            paginationBar.style.display = 'none';
            paginationBar.innerHTML = '';
        }

        feather.replace();
        return;
    }

    const groupedActivities = allData.reduce((acc, item) => {

        const dateKey =
            formatDateForDisplay(item.created_at);

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }

        acc[dateKey].push(item);

        return acc;

    }, {});

    const sortedDateKeys =
        Object.keys(groupedActivities).sort((a, b) => {

            const dateA =
                new Date(groupedActivities[a][0].created_at);

            const dateB =
                new Date(groupedActivities[b][0].created_at);

            return dateB.getTime() - dateA.getTime();
        });

    let htmlContent = '';

    activityColorIndex = 0;

    sortedDateKeys.forEach((dateKey, dayIndex) => {

        const dayActivities =
            groupedActivities[dateKey];

        const groupedBooks =
            dayActivities.reduce((acc, item) => {

                const book =
                    item.book || 'Bible';

                if (!acc[book]) {
                    acc[book] = [];
                }

                acc[book].push(item);

                return acc;

            }, {});

        const bookNames =
            Object.keys(groupedBooks);

        const totalChapters =
            dayActivities.length;

        const totalVerses =
            dayActivities.reduce((total, item) => {

                return total +
                    (
                        Array.isArray(item.verses)
                            ? item.verses.length
                            : 0
                    );

            }, 0);

        const groupId =
            `activity-details-${dayIndex}-${Date.now()}`;

        htmlContent += `
            <div class="activity-day-group compact">

                <div class="activity-date-header">

                    <span>
                        ${dateKey}
                    </span>

                    <span class="activity-day-count">
                        ${totalChapters}
                        ${totalChapters > 1
                            ? 'activités'
                            : 'activité'}
                    </span>

                </div>

                <div class="activity-summary-card">

                    <div class="activity-summary-icon">
                        <i data-feather="book-open"></i>
                    </div>

                    <div class="activity-summary-content">

                        <div class="activity-summary-title">
                            Lecture biblique
                        </div>

                        <div class="activity-summary-text">

                            <strong>
                                ${totalChapters}
                                ${totalChapters > 1
                                    ? 'chapitres lus'
                                    : 'chapitre lu'}
                            </strong>

                            <span>
                                dans ${bookNames.length}
                                ${bookNames.length > 1
                                    ? 'livres'
                                    : 'livre'}
                            </span>

                            ${
                                totalVerses > 0
                                    ? `
                                        <span>
                                            • ${totalVerses} versets
                                        </span>
                                      `
                                    : ''
                            }

                        </div>

                    </div>

                    <button
                        type="button"
                        class="activity-details-btn"
                        onclick="toggleActivityDetails('${groupId}', this)"
                        aria-expanded="false"
                    >
                        <span>Détails</span>
                        <i data-feather="chevron-down"></i>
                    </button>

                </div>

                <div
                    class="activity-details"
                    id="${groupId}"
                    style="display:none;"
                >
        `;

        bookNames.forEach(bookName => {

            const bookActivities =
                groupedBooks[bookName];

            htmlContent += `
                <div class="activity-book-group">

                    <div class="activity-book-header">

                        <div class="activity-book-icon">
                            <i data-feather="book"></i>
                        </div>

                        <div>
                            <strong>${bookName}</strong>

                            <span>
                                ${bookActivities.length}
                                ${
                                    bookActivities.length > 1
                                        ? 'chapitres'
                                        : 'chapitre'
                                }
                            </span>
                        </div>

                    </div>

                    <div class="activity-chapter-list">
            `;

            bookActivities.forEach(item => {

                const chapter =
                    item.chapter || '?';

                const verses =
                    Array.isArray(item.verses)
                        ? item.verses.join(', ')
                        : '';

                htmlContent += `
                    <div class="activity-chapter-item">

                        <div class="activity-chapter-icon">
                            <i data-feather="check"></i>
                        </div>

                        <div class="activity-chapter-content">

                            <div class="activity-title">
                                Chapitre ${chapter}
                            </div>

                            ${
                                verses
                                    ? `
                                        <div class="activity-text">
                                            Versets : ${verses}
                                        </div>
                                      `
                                    : ''
                            }

                        </div>

                    </div>
                `;
            });

            htmlContent += `
                    </div>
                </div>
            `;
        });

        htmlContent += `
                </div>
            </div>
        `;
    });

    activityDisplayArea.innerHTML = htmlContent;

    if (paginationBar) {
        paginationBar.style.display = 'none';
        paginationBar.innerHTML = '';
    }

    feather.replace();

    if (typeof observeActivityElements === 'function') {
        observeActivityElements();
    }
}

function toggleActivityDetails(id, button) {

    const details =
        document.getElementById(id);

    if (!details) {
        return;
    }

    const isHidden =
        details.style.display === 'none' ||
        details.style.display === '';

    if (isHidden) {

        details.style.display = 'block';

        button.setAttribute(
            'aria-expanded',
            'true'
        );

        const span =
            button.querySelector('span');

        if (span) {
            span.textContent = 'Masquer';
        }

        const icon =
            button.querySelector('i');

        if (icon) {
            icon.setAttribute(
                'data-feather',
                'chevron-up'
            );
        }

    } else {

        details.style.display = 'none';

        button.setAttribute(
            'aria-expanded',
            'false'
        );

        const span =
            button.querySelector('span');

        if (span) {
            span.textContent = 'Détails';
        }

        const icon =
            button.querySelector('i');

        if (icon) {
            icon.setAttribute(
                'data-feather',
                'chevron-down'
            );
        }
    }

    feather.replace();
}

'@

$c = $c.Substring(0, $start) + $new + $c.Substring($end)

Set-Content -Path $p -Value $c -Encoding UTF8

Write-Host 'REMPLACEMENT TERMINE'