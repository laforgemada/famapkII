// Ce fichier contiendra le contenu complet de la Bible pour chaque langue.
// Vous devrez remplir les tableaux 'verses' avec le texte réel de chaque verset.
// Voici un exemple de structure pour quelques livres et chapitres :

export const fullBibleContent = {
    mg: {
        search: "Hikaroka boky...",
        at: "Testamenta Taloha",
        nt: "Testamenta Vaovao",
        chapterLabel: "Toko",
        books: [
            {
                name: "Genesisy",
                number: 1,
                chapters: [
                    {
                        chapter: 1,
                        verses: [
                            "Tamin'ny voalohany, Andriamanitra nahary ny lanitra sy ny tany.",
                            "Ary ny tany dia tsy nisy endrika sady foana; ary aizina no tambonin'ny lalina. Ary ny Fanahin'Andriamanitra nanosa tambonin'ny rano."
                        ]
                    },
                    {
                        chapter: 2,
                        verses: [
                            "Ary tamin'izany no nahavitan'ny lanitra sy ny tany sy izay rehetra ananany.",
                            "Ary tamin'ny andro fahafito dia vitan'Andriamanitra ny asany rehetra izay nataony; ary nitsahatra Izy tamin'ny andro fahafito tamin'ny asany rehetra izay nataony."
                        ]
                    }
                    // Ajoutez ici tous les autres chapitres et versets de Genesisy
                ]
            },
            {
                name: "Eksodosy",
                number: 2,
                chapters: [
                    {
                        chapter: 1,
                        verses: [
                            "Ary izao no anaran'ny zanak'Isiraely izay nankany Egypta, samy nentiny ny ankohonany avy: Robena, Simeona, Levy ary Joda."
                        ]
                    }
                    // Ajoutez ici tous les autres livres et leurs chapitres pour la version Malagasy
                ]
            }
            // ... (autres livres mg) ...
        ]
    },
    fr: {
        search: "Rechercher un livre...",
        at: "Ancien Testament",
        nt: "Nouveau Testament",
        chapterLabel: "Chapitre",
        books: [
            {
                name: "Genèse",
                number: 1,
                chapters: [
                    {
                        chapter: 1,
                        verses: [
                            "Au commencement, Dieu créa les cieux et la terre.",
                            "La terre était informe et vide, et il y avait des ténèbres à la surface de l'abîme, et l'Esprit de Dieu se mouvait au-dessus des eaux."
                        ]
                    },
                    {
                        chapter: 2,
                        verses: [
                            "Ainsi furent achevés les cieux et la terre, et toute leur armée.",
                            "Dieu acheva au septième jour son œuvre, qu'il avait faite: et il se reposa au septième jour de toute son œuvre, qu'il avait faite."
                        ]
                    }
                    // Ajoutez ici tous les autres chapitres et versets de Genèse
                ]
            },
            {
                name: "Exode",
                number: 2,
                chapters: [
                    {
                        chapter: 1,
                        verses: [
                            "Voici les noms des fils d'Israël, venus en Égypte avec Jacob, chacun avec sa famille : Ruben, Siméon, Lévi, Juda,"
                        ]
                    }
                    // Ajoutez ici tous les autres livres et leurs chapitres pour la version Française
                ]
            }
            // ... (autres livres fr) ...
        ]
    },
    en: {
        search: "Search a book...",
        at: "Old Testament",
        nt: "New Testament",
        chapterLabel: "Chapter",
        books: [
            {
                name: "Genesis",
                number: 1,
                chapters: [
                    {
                        chapter: 1,
                        verses: [
                            "In the beginning God created the heaven and the earth.",
                            "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters."
                        ]
                    },
                    {
                        chapter: 2,
                        verses: [
                            "Thus the heavens and the earth were finished, and all the host of them.",
                            "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made."
                        ]
                    }
                    // Ajoutez ici tous les autres chapitres et versets de Genesis
                ]
            },
            {
                name: "Exodus",
                number: 2,
                chapters: [
                    {
                        chapter: 1,
                        verses: [
                            "Now these are the names of the children of Israel, which came into Egypt; every man and his household came with Jacob: Reuben, Simeon, Levi, and Judah,"
                        ]
                    }
                    // Ajoutez ici tous les autres livres et leurs chapitres pour la version Anglaise
                ]
            }
            // ... (autres livres en) ...
        ]
    }
};
