// Version de TEST du contenu biblique.
// Plusieurs livres et chapitres sont présents afin de tester
// le générateur automatique de questions du quiz.
//
// Les textes ajoutés ici sont des paraphrases de test,
// et non une traduction biblique destinée à la publication.

export const fullBibleContent = {

    /* =========================================================
     * MALAGASY
     * ========================================================= */

    mg: {

        search: "Hikaroka boky...",
        at: "Testamenta Taloha",
        nt: "Testamenta Vaovao",
        chapterLabel: "Toko",

        books: [

            /* =========================
             * GENESISY
             * ========================= */

            {
                name: "Genesisy",
                number: 1,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Tamin'ny voalohany, Andriamanitra nahary ny lanitra sy ny tany.",
                            "Ary ny tany dia tsy nisy endrika sady foana; ary aizina no tambonin'ny rano."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Ary vita ny lanitra sy ny tany ary izay rehetra ao aminy.",
                            "Ary nitsahatra Andriamanitra tamin'ny andro fahafito."
                        ]
                    },

                    {
                        chapter: 3,
                        verses: [
                            "Nisy menarana izay fetsy noho ny biby rehetra.",
                            "Ary nandre ny feon'Andriamanitra tao amin'ny saha ilay olona."
                        ]
                    }

                ]
            },


            /* =========================
             * EKSODOSY
             * ========================= */

            {
                name: "Eksodosy",
                number: 2,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Ary izao no anaran'ny zanak'Isiraely izay nankany Egypta.",
                            "Nihamaro ny zanak'Isiraely ka tonga maro be."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nisy zaza iray napetraka tao anaty harona teo amoron'ny ony.",
                            "Nisy vehivavy iray nahita ilay zaza ka nikarakara azy."
                        ]
                    }

                ]
            },


            /* =========================
             * LEVITIKOSY
             * ========================= */

            {
                name: "Levitikosy",
                number: 3,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Nampianatra ny olona momba ny fanatitra sy ny fanompoana Andriamanitra.",
                            "Nampahatsiahy ny olona ny fomba fanatonana Azy."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nentin'ny olona ny fanatitra ho fanehoana fankasitrahana.",
                            "Ny fanompoana dia natao tamim-pahadiovana sy fanajana."
                        ]
                    }

                ]
            },


            /* =========================
             * NOMERA
             * ========================= */

            {
                name: "Nomera",
                number: 4,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Nandidy an'i Mosesy Andriamanitra mba hanisa ny vahoaka.",
                            "Nalamina araka ny fianakaviany sy ny fireneny ny olona."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nandamina ny tobiny manodidina ny toerana masina ny vahoaka.",
                            "Samy nanana ny toerana voatendry ho azy ny foko."
                        ]
                    }

                ]
            },


            /* =========================
             * MATIO
             * ========================= */

            {
                name: "Matio",
                number: 40,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Ny tantaran'i Jesosy Kristy dia nanomboka tamin'ny taranaka maro.",
                            "Jesosy no anarana nomena ilay zaza."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nisy olona hendry tonga nitady an'i Jesosy.",
                            "Nankany amin'ny toerana nahaterahan'ilay zaza izy ireo."
                        ]
                    }

                ]
            },


            /* =========================
             * JAONA
             * ========================= */

            {
                name: "Jaona",
                number: 43,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Ny Teny dia teo am-piandohana ary niaraka tamin'Andriamanitra.",
                            "Ary tonga nofo ny Teny ka nonina teo amin'ny olona."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nisy fanasana iray tao Kana any Galilia.",
                            "Naneho famantarana voalohany teo amin'ny mpianany Jesosy."
                        ]
                    }

                ]
            }

        ]
    },


    /* =========================================================
     * FRANÇAIS
     * ========================================================= */

    fr: {

        search: "Rechercher un livre...",
        at: "Ancien Testament",
        nt: "Nouveau Testament",
        chapterLabel: "Chapitre",

        books: [

            /* =========================
             * GENÈSE
             * ========================= */

            {
                name: "Genèse",
                number: 1,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Au commencement, Dieu créa les cieux et la terre.",
                            "La terre était informe et vide, et les ténèbres couvraient l'abîme."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Ainsi furent achevés les cieux et la terre et toute leur armée.",
                            "Dieu acheva son œuvre et se reposa le septième jour."
                        ]
                    },

                    {
                        chapter: 3,
                        verses: [
                            "Le serpent était plus rusé que tous les animaux des champs.",
                            "L'homme entendit la voix de Dieu dans le jardin."
                        ]
                    }

                ]
            },


            /* =========================
             * EXODE
             * ========================= */

            {
                name: "Exode",
                number: 2,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Voici les noms des fils d'Israël venus en Égypte.",
                            "Les enfants d'Israël devinrent nombreux dans le pays."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Un enfant fut placé dans une corbeille au bord du fleuve.",
                            "Une femme trouva l'enfant et prit soin de lui."
                        ]
                    }

                ]
            },


            /* =========================
             * LÉVITIQUE
             * ========================= */

            {
                name: "Lévitique",
                number: 3,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Dieu enseigna au peuple les règles concernant les sacrifices.",
                            "Le peuple apprit comment s'approcher de Dieu avec respect."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Le peuple apportait des offrandes pour exprimer sa reconnaissance.",
                            "Le service devait être accompli avec respect et fidélité."
                        ]
                    }

                ]
            },


            /* =========================
             * NOMBRES
             * ========================= */

            {
                name: "Nombres",
                number: 4,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Dieu demanda à Moïse de compter le peuple.",
                            "Le peuple fut organisé selon ses familles et ses tribus."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Le peuple installa son camp autour du lieu consacré.",
                            "Chaque tribu reçut une place déterminée."
                        ]
                    }

                ]
            },


            /* =========================
             * MATTHIEU
             * ========================= */

            {
                name: "Matthieu",
                number: 40,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "L'histoire de Jésus-Christ commence avec une longue succession de générations.",
                            "L'enfant reçut le nom de Jésus."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Des sages vinrent chercher Jésus.",
                            "Ils se rendirent à l'endroit où l'enfant était né."
                        ]
                    }

                ]
            },


            /* =========================
             * JEAN
             * ========================= */

            {
                name: "Jean",
                number: 43,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "La Parole était au commencement avec Dieu.",
                            "La Parole devint chair et habita parmi les hommes."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Il y eut une fête à Cana en Galilée.",
                            "Jésus manifesta un premier signe devant ses disciples."
                        ]
                    }

                ]
            }

        ]
    },


    /* =========================================================
     * ENGLISH
     * ========================================================= */

    en: {

        search: "Search a book...",
        at: "Old Testament",
        nt: "New Testament",
        chapterLabel: "Chapter",

        books: [

            /* =========================
             * GENESIS
             * ========================= */

            {
                name: "Genesis",
                number: 1,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "In the beginning, God created the heavens and the earth.",
                            "The earth was without form and empty, and darkness covered the deep."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "The heavens and the earth were completed with everything in them.",
                            "God finished his work and rested on the seventh day."
                        ]
                    },

                    {
                        chapter: 3,
                        verses: [
                            "The serpent was more cunning than the other animals of the field.",
                            "The man heard the voice of God in the garden."
                        ]
                    }

                ]
            },


            /* =========================
             * EXODUS
             * ========================= */

            {
                name: "Exodus",
                number: 2,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "These were the names of the children of Israel who came to Egypt.",
                            "The children of Israel became numerous in the land."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "A child was placed in a basket beside the river.",
                            "A woman found the child and cared for him."
                        ]
                    }

                ]
            },


            /* =========================
             * LEVITICUS
             * ========================= */

            {
                name: "Leviticus",
                number: 3,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "God taught the people about sacrifices and worship.",
                            "The people learned how to approach God with respect."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "The people brought offerings as an expression of thanksgiving.",
                            "The service was to be performed with faithfulness and respect."
                        ]
                    }

                ]
            },


            /* =========================
             * NUMBERS
             * ========================= */

            {
                name: "Numbers",
                number: 4,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "God commanded Moses to count the people.",
                            "The people were organized according to their families and tribes."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "The people arranged their camp around the holy place.",
                            "Each tribe received its appointed position."
                        ]
                    }

                ]
            },


            /* =========================
             * MATTHEW
             * ========================= */

            {
                name: "Matthew",
                number: 40,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "The story of Jesus Christ begins with a long line of generations.",
                            "The child was given the name Jesus."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Wise men came looking for Jesus.",
                            "They went to the place where the child had been born."
                        ]
                    }

                ]
            },


            /* =========================
             * JOHN
             * ========================= */

            {
                name: "John",
                number: 43,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "The Word was in the beginning with God.",
                            "The Word became flesh and lived among people."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "There was a celebration at Cana in Galilee.",
                            "Jesus showed a first sign before his disciples."
                        ]
                    }

                ]
            }

        ]
    }

};

