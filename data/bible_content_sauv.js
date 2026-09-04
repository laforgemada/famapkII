// =========================================================
// BIBLE DE TEST ENRICHIE POUR LE QUIZ
// =========================================================
//
// IMPORTANT :
// Les textes ci-dessous sont des PARAPHRASES DE TEST.
// Ils servent uniquement à tester le générateur de quiz,
// l'affichage des passages et la sélection des livres.
//
// Ils ne constituent pas une traduction biblique destinée
// à la publication.
//
// Chaque chapitre contient plusieurs entrées afin de
// permettre au quiz de construire des passages de plusieurs
// versets consécutifs.
// =========================================================

export const fullBibleContent = {

    /* =====================================================
     * MALAGASY
     * ===================================================== */

    mg: {

        search: "Hikaroka boky...",
        at: "Testamenta Taloha",
        nt: "Testamenta Vaovao",
        chapterLabel: "Toko",

        books: [

            /* =================================================
             * GENESISY
             * ================================================= */

            {
                name: "Genesisy",
                number: 1,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Tamin'ny voalohany, Andriamanitra nahary ny lanitra sy ny tany, ary Izy no nametraka ny fototry ny zavatra rehetra izay mbola tsy nisy endrika.",
                            "Tsy mbola nisy filaminana teo amin'ny tany, ary ny aizina no nanarona ny lalina, fa ny Fanahin'Andriamanitra kosa nanatrika teo ambonin'ny rano.",
                            "Hoy Andriamanitra hoe hisy fahazavana, ary nisy fahazavana. Hitany fa tsara ny fahazavana ka nosarahiny tamin'ny aizina izany.",
                            "Nomeny anarana ny fahazavana hoe andro ary ny aizina nomeny anarana hoe alina. Dia nisy hariva ary nisy maraina, ka izany no fiandohan'ny andro vaovao.",
                            "Nandidy ny rano sy ny tany Andriamanitra mba hiseho araka ny filaharany, ary ny zavatra rehetra noforoniny dia napetrany tamin'ny toerany avy."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Ary vita ny lanitra sy ny tany ary izay rehetra ao aminy. Rehefa vita ny zavatra rehetra dia nijery ny asany Andriamanitra ka hitany fa tonga lafatra ny filaharany.",
                            "Rehefa vita ny asa rehetra izay nokasainy, dia nitsahatra Andriamanitra tamin'ny andro fahafito ka niala sasatra tamin'ny asa famoronana rehetra.",
                            "Nitso-drano ny andro fahafito Andriamanitra ary nanokana azy, satria tamin'izany andro izany Izy no nitsahatra tamin'ny asa rehetra izay efa vitany.",
                            "Izao no tantaran'ny niandohan'ny lanitra sy ny tany tamin'ny fotoana namoronana azy. Ny zavatra rehetra dia samy nomena ny toerany sy ny andraikiny avy.",
                            "Rehefa namorona ny olona Andriamanitra dia nametraka azy tao amin'ny saha iray tsara tarehy ary nanome azy andraikitra hikarakara sy hitandrina izay rehetra napetraka teo am-pelatanany."
                        ]
                    },

                    {
                        chapter: 3,
                        verses: [
                            "Nisy menarana izay fetsy noho ny biby rehetra tany an-tsaha, ka nanatona ilay vehivavy izy ary nanontany momba ny didy nomen'Andriamanitra.",
                            "Niresaka tamin'ilay vehivavy ny menarana ka nampisalasala azy momba izay nolazain'Andriamanitra. Nihaino ilay vehivavy ka nijery ilay zavatra voarara.",
                            "Rehefa hitany fa nahasarika ny masony ilay zavatra ary toa nahafinaritra, dia naka tamin'izany izy ka nihinana, ary nomeny koa ilay lehilahy niaraka taminy.",
                            "Rehefa nahatsapa ny zavatra nataony izy ireo dia niafina tao amin'ny saha rehefa nandre ny feon'Andriamanitra, satria natahotra ny hiatrika Azy.",
                            "Niantso ilay olona Andriamanitra ary nanontany azy ny amin'izay nitranga. Tamin'izany no nanomboka niseho mazava ny vokatry ny tsy fankatoavana sy ny fahadisoan'ny olona."
                        ]
                    }

                ]
            },


            /* =================================================
             * EKSODOSY
             * ================================================= */

            {
                name: "Eksodosy",
                number: 2,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Ary izao no anaran'ny zanak'Isiraely izay nankany Egypta niaraka tamin'ny fianakaviany. Rehefa nandeha ny taona dia nitombo ny isan'ny taranany.",
                            "Nihamaro ny zanak'Isiraely ka tonga maro be, ary nanjaka tamin'ny faritra maro tao amin'ilay tany ny taranany.",
                            "Nisy mpanjaka vaovao nitsangana tany Egypta izay tsy nahalala ny tantaran'i Josefa sy ny soa nataony ho an'ny firenena.",
                            "Natahotra ilay mpanjaka sao hitombo loatra ny isan'ny zanak'Isiraely, ka nanomboka nampitondra enta-mavesatra sy asa mafy azy ireo izy.",
                            "Na dia nampijaliana sy nampanaovina asa mafy aza ny vahoaka, dia mbola nitombo ihany ny isan'izy ireo ary tsy nihena ny taranany."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nisy zaza iray teraka tao amin'ny fianakaviana iray, ary rehefa hitan'ny reniny fa tsara tarehy ilay zaza dia niezaka niaro azy tamin'ny loza nanodidina azy.",
                            "Rehefa tsy afaka nanafina azy intsony izy dia nametraka ilay zaza tao anaty harona voaaro tsara ary napetrany teo amoron'ny ony.",
                            "Nisy olona nijery lavidavitra teo mba hahafantarana izay hitranga amin'ilay zaza, satria mbola nanantena ny hahita famonjena izy ireo.",
                            "Nisy vehivavy iray nahita ilay zaza ka nalahelo azy. Nandray azy izy ary nitady fomba hikarakara azy na dia tsy fantany aza ny tantarany.",
                            "Nisy fianakaviana nikarakara ilay zaza ka nitombo izy, ary tatỳ aoriana dia nanana andraikitra lehibe teo amin'ny vahoakany ilay olona."
                        ]
                    }

                ]
            },


            /* =================================================
             * LEVITIKOSY
             * ================================================= */

            {
                name: "Levitikosy",
                number: 3,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Nampianatra ny olona momba ny fanatitra sy ny fomba fanompoana Andriamanitra, mba hahafahan'ny olona manatona Azy amim-panajana.",
                            "Ny fanatitra tsirairay dia natao araka ny fitsipika voafaritra, ary ny olona dia nampahatsiahivina fa zava-dehibe ny fahadiovan'ny fo.",
                            "Nianatra ny olona fa tsy ny zavatra entiny ihany no zava-dehibe, fa ny toe-po sy ny fahavononana hanaja an'Andriamanitra koa.",
                            "Ny mpisorona dia nanana andraikitra nitandrina ny fanompoana sy nampianatra ny vahoaka momba ny fomba tokony hanatonana ny zavatra masina.",
                            "Tamin'izany fomba izany dia nampianarina ny vahoaka fa tokony hifandray amin'ny fanajana, fahadiovana ary fahatokiana ny fanompoana."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nentin'ny olona ny fanatitra ho fanehoana fankasitrahana sy fanajana. Ny zavatra natolotra dia nofidina tamim-pitandremana.",
                            "Nampahatsiahivina ny olona fa ny fanomezana dia tokony hatao amin'ny fo marina fa tsy noho ny fanerena na ny fireharehana.",
                            "Ny mpanompon'Andriamanitra dia nitandrina ny zavatra natokana ho amin'ny fanompoana ary nampianatra ny olona hanaja ny zavatra masina.",
                            "Ny fanompoana dia natao tamim-pahadiovana sy fanajana, ary samy nanana ny andraikiny tao amin'ny fiarahamonina ny olona.",
                            "Nampianarina ny vahoaka fa ny fahatokiana amin'ny zavatra kely sy ny fanajana ny didy dia zava-dehibe eo amin'ny fiainana andavanandro."
                        ]
                    }

                ]
            },


            /* =================================================
             * NOMERA
             * ================================================= */

            {
                name: "Nomera",
                number: 4,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Nandidy an'i Mosesy Andriamanitra mba hanisa ny vahoaka, mba hahafantarana ny isan'ny olona sy ny fandaminana ny firenena.",
                            "Nalamina araka ny fianakaviany sy ny fireneny ny olona, ary samy fantatra ny toerana sy ny andraikitra tokony hotanterahiny.",
                            "Nantsoina tsirairay ireo lehiben'ny foko mba hanampy amin'ny fanisana sy ny fandaminana ny vahoaka.",
                            "Ny fanisana dia natao tamim-pitandremana mba hahafahan'ny olona rehetra voalamina araka izay tokony ho izy.",
                            "Rehefa vita ny fanisana dia fantatry ny mpitarika ny isan'ny olona sy ny fandaminana ilaina amin'ny dia sy ny fiainana tao amin'ny toby."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nandamina ny tobiny manodidina ny toerana masina ny vahoaka, ary samy nomena toerana manokana ny foko tsirairay.",
                            "Ny foko sasany dia napetraka teo amin'ny ilany iray ary ny hafa kosa teo amin'ny ilany hafa, araka ny fandaminana nomena.",
                            "Ny fianakaviana tsirairay dia nahafantatra ny toerany sy ny toerana tokony halehany rehefa nifindra toerana ny vahoaka.",
                            "Nisy filaharana sy fandaminana mazava mba tsy hisy korontana rehefa nandeha ny vahoaka sy ny zavatra rehetra nentin'izy ireo.",
                            "Tamin'ny alalan'izany fandaminana izany dia afaka niara-nandeha ny vahoaka ary samy nahalala ny andraikiny sy ny toerana tokony hisy azy."
                        ]
                    }

                ]
            },


            /* =================================================
             * MATIO
             * ================================================= */

            {
                name: "Matio",
                number: 40,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Ny tantaran'i Jesosy Kristy dia natomboka tamin'ny taranaka maro izay nampifandray ny tantaran'ny razana sy ny taranaka vaovao.",
                            "Nisy olona maro nifandimby tao amin'ilay tantara, ary samy nanana ny toerany tao anatin'ny taranaka izy ireo.",
                            "Rehefa tonga ny fotoana dia teraka i Jesosy, ary ny fahaterahany dia nanana heviny lehibe ho an'ny olona niandry ny famonjena.",
                            "Nomen'ny fianakaviany anarana hoe Jesosy ilay zaza, ary nino izy ireo fa hanana andraikitra lehibe eo amin'ny tantaran'ny vahoaka.",
                            "Ny fiandohan'ny tantaran'i Jesosy dia mampifandray ny fampanantenana taloha sy ny zava-nitranga vaovao izay hanaraka azy."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nisy olona hendry avy any amin'ny tany lavitra tonga nitady an'i Jesosy rehefa nahita famantarana izay nampahafantatra azy ireo ny amin'ny fahaterahany.",
                            "Nandeha lavitra izy ireo ary nanontany izay toerana mety hahitana ilay zaza izay inoany fa manana anjara toerana lehibe.",
                            "Rehefa nahita ilay zaza izy ireo dia faly ary nanolotra fanomezana ho fanehoana fanajana sy fanomezam-boninahitra.",
                            "Nampitandrina azy ireo anefa fa tokony hitandrina amin'ny olona sasany izay mety hanana fikasana hafa momba ilay zaza izy ireo.",
                            "Nody tamin'ny lalana hafa ireo olona ireo rehefa nahazo fampitandremana, ary nitohy tamin'izany ny tantaran'ilay zaza sy ny fianakaviany."
                        ]
                    }

                ]
            },


            /* =================================================
             * JAONA
             * ================================================= */

            {
                name: "Jaona",
                number: 43,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Ny Teny dia teo am-piandohana ary niaraka tamin'Andriamanitra, ary ny zavatra rehetra dia nifandray tamin'izany fiandohana izany.",
                            "Ny Teny dia loharanon'aina ary nitondra fahazavana ho an'ny olona, na dia teo aza ny aizina nanodidina azy ireo.",
                            "Nisy olona tonga nanambara ny fahazavana mba hahafahan'ny olona maro mahafantatra sy mandray izany.",
                            "Tonga teo amin'izao tontolo izao ny fahazavana, saingy tsy ny olona rehetra no nanaiky izany na nahafantatra ny heviny.",
                            "Ary tonga nofo ny Teny ka nonina teo amin'ny olona, ka nahita ny voninahiny sy ny fahasoavana izay nentiny izy ireo."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nisy fanasana iray tao Kana any Galilia, ary tao koa ny renin'i Jesosy sy Jesosy ary ireo mpianany.",
                            "Rehefa nisy olana tamin'ny zava-pisotro nandritra ny fanasana dia nilaza tamin'i Jesosy ny reniny fa nisy zavatra tsy ampy.",
                            "Nilaza tamin'ireo mpanompo Jesosy mba hanomana izay zavatra nilaina, ary samy niandry izay zavatra hataony ny olona.",
                            "Tamin'izany fotoana izany dia naneho famantarana voalohany teo anatrehan'ny mpianany Jesosy, ka nitombo ny fahatokisan'izy ireo Azy.",
                            "Ny zavatra nitranga tao Kana dia nanampy ny mpianatra hahatakatra bebe kokoa ny maha-zava-dehibe ny asan'i Jesosy sy ny famantarana nasehony."
                        ]
                    }

                ]
            }

        ]
    },


    /* =====================================================
     * FRANÇAIS
     * ===================================================== */

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
                            "Au commencement, Dieu créa les cieux et la terre, établissant ainsi les fondements de tout ce qui allait ensuite prendre forme.",
                            "La terre était encore informe et vide, tandis que les ténèbres couvraient l'abîme, mais l'Esprit de Dieu était présent au-dessus des eaux.",
                            "Dieu ordonna que la lumière apparaisse, et la lumière fut. Il vit que la lumière était bonne et la sépara des ténèbres.",
                            "Il donna un nom à la lumière et un autre aux ténèbres. Ainsi commencèrent les temps du jour et de la nuit dans l'ordre qu'il avait établi.",
                            "Dieu continua à organiser les eaux, la terre et tout ce qui devait y prendre place, donnant à chaque élément sa fonction et sa position."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Ainsi furent achevés les cieux et la terre et tout ce qu'ils contenaient. Lorsque toute l'œuvre fut terminée, Dieu considéra l'ensemble de sa création et vit que son ordre était complet.",
                            "Après avoir achevé tout le travail qu'il avait entrepris, Dieu se reposa le septième jour de toute l'œuvre qu'il avait accomplie.",
                            "Dieu bénit le septième jour et le mit à part, parce qu'en ce jour il se reposa de toute l'œuvre qu'il avait réalisée dans la création.",
                            "Voici le récit des origines des cieux et de la terre lorsqu'ils furent créés. Chaque élément reçut progressivement sa place et sa fonction dans l'ordre établi.",
                            "Lorsque Dieu forma l'homme, il lui donna une place particulière dans le jardin et lui confia la responsabilité de prendre soin de ce qui lui avait été donné."
                        ]
                    },

                    {
                        chapter: 3,
                        verses: [
                            "Le serpent était plus rusé que tous les animaux des champs. Il s'approcha de la femme et commença à l'interroger au sujet de ce que Dieu avait ordonné.",
                            "Le serpent sema le doute dans l'esprit de la femme en remettant en question la parole qui avait été donnée. Elle regarda alors ce qui lui était interdit.",
                            "Lorsqu'elle vit que la chose semblait agréable et attirante, elle en prit et en mangea, puis elle en donna également à l'homme qui était avec elle.",
                            "Après avoir compris ce qu'ils avaient fait, ils cherchèrent à se cacher dans le jardin lorsqu'ils entendirent la voix de Dieu, car ils avaient peur de se présenter devant lui.",
                            "Dieu appela l'homme et lui demanda ce qui s'était passé. Les conséquences de la désobéissance commencèrent alors à apparaître clairement dans leur vie."
                        ]
                    }

                ]
            },


            {
                name: "Exode",
                number: 2,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Voici les noms des fils d'Israël venus en Égypte avec leurs familles. Au fil des années, leurs descendants devinrent de plus en plus nombreux.",
                            "Les enfants d'Israël se multiplièrent considérablement et leur population grandit dans le pays, malgré les difficultés qu'ils rencontrèrent.",
                            "Un nouveau roi se leva en Égypte, un roi qui ne connaissait plus l'histoire de Joseph ni le bien qu'il avait autrefois accompli pour le pays.",
                            "Le roi craignit que le peuple d'Israël ne devienne trop nombreux et commença à lui imposer des travaux pénibles et de lourdes charges.",
                            "Malgré les difficultés et les travaux forcés, le peuple continua à se multiplier, et son nombre ne cessa pas d'augmenter."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Un enfant naquit dans une famille qui chercha à le protéger. Lorsque sa mère vit qu'il était beau, elle fit tout ce qu'elle pouvait pour le préserver du danger.",
                            "Lorsqu'elle ne put plus le cacher, elle plaça l'enfant dans une corbeille soigneusement préparée et la déposa parmi les plantes au bord du fleuve.",
                            "Une personne observa la scène à distance afin de savoir ce qui arriverait à l'enfant et de découvrir s'il pourrait être sauvé.",
                            "Une femme aperçut l'enfant et fut touchée par sa situation. Elle le prit auprès d'elle et chercha quelqu'un capable de s'en occuper.",
                            "L'enfant grandit dans un environnement qui lui permit de survivre, et il devint plus tard une personne appelée à jouer un rôle important auprès de son peuple."
                        ]
                    }

                ]
            },


            {
                name: "Lévitique",
                number: 3,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Dieu enseigna au peuple les règles concernant les sacrifices et le service afin que chacun puisse comprendre comment s'approcher de lui avec respect.",
                            "Chaque offrande devait être présentée selon des règles précises, et le peuple apprit que l'attitude du cœur avait également une grande importance.",
                            "Les personnes comprirent que le geste extérieur ne suffisait pas et que la sincérité, la fidélité et le respect accompagnaient le véritable service.",
                            "Les prêtres avaient la responsabilité de veiller au service et d'enseigner au peuple comment respecter ce qui était consacré.",
                            "Ainsi, le peuple apprit que le service devait être associé à la pureté, à la fidélité et à une attitude respectueuse devant Dieu."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Le peuple apportait des offrandes pour exprimer sa reconnaissance et son respect. Ce qui était présenté devait être préparé avec soin.",
                            "Les personnes apprirent que donner devait venir d'un cœur sincère et non d'une volonté de paraître ou de recevoir des honneurs.",
                            "Les serviteurs chargés du culte veillaient aux choses consacrées et enseignaient au peuple à respecter ce qui avait été réservé au service.",
                            "Le service devait être accompli avec fidélité et respect, tandis que chaque personne recevait une responsabilité particulière dans la communauté.",
                            "Le peuple comprit que la fidélité dans les petites choses et le respect des instructions avaient une grande importance dans la vie quotidienne."
                        ]
                    }

                ]
            },


            {
                name: "Nombres",
                number: 4,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Dieu demanda à Moïse de compter le peuple afin de connaître le nombre des personnes et de préparer correctement l'organisation de la nation.",
                            "Les personnes furent recensées selon leurs familles et leurs tribus, et chacune fut associée à l'organisation nécessaire à la vie du peuple.",
                            "Les responsables des tribus furent appelés afin d'aider Moïse dans le recensement et dans la préparation de l'ensemble du peuple.",
                            "Le recensement fut effectué avec soin afin que chaque groupe soit correctement identifié et que l'organisation puisse se faire sans confusion.",
                            "Lorsque le recensement fut terminé, les responsables connaissaient le nombre des personnes et pouvaient préparer les déplacements et l'organisation du camp."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Le peuple installa son camp autour du lieu consacré, et chaque tribu reçut une position précise conformément à l'organisation établie.",
                            "Certaines tribus furent placées d'un côté et d'autres de l'autre, selon l'ordre qui leur avait été donné.",
                            "Chaque famille connaissait son emplacement et savait où se rendre lorsque le peuple devait lever le camp et reprendre sa route.",
                            "Un ordre précis fut établi afin d'éviter la confusion lorsque le peuple se déplaçait avec ses familles et tout ce qu'il possédait.",
                            "Grâce à cette organisation, l'ensemble du peuple pouvait avancer ensemble, chacun connaissant son rôle et la place qu'il devait occuper."
                        ]
                    }

                ]
            },


            {
                name: "Matthieu",
                number: 40,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "L'histoire de Jésus-Christ commence par une longue succession de générations qui relie l'histoire des ancêtres à celle d'une nouvelle génération.",
                            "De nombreuses personnes se succédèrent dans cette histoire, chacune occupant une place particulière dans la suite des générations.",
                            "Lorsque le moment arriva, Jésus naquit, et sa naissance prit une importance particulière pour ceux qui attendaient l'accomplissement de l'espérance.",
                            "L'enfant reçut le nom de Jésus, et sa famille croyait qu'il aurait une responsabilité importante dans l'histoire du peuple.",
                            "Le début de l'histoire de Jésus établit ainsi un lien entre les promesses anciennes et les événements nouveaux qui allaient suivre."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Des sages venus d'un pays lointain arrivèrent pour chercher Jésus après avoir observé un signe qui leur avait annoncé sa naissance.",
                            "Ils parcoururent une longue distance et demandèrent où ils pourraient trouver l'enfant dont ils pensaient qu'il aurait un rôle important.",
                            "Lorsqu'ils trouvèrent l'enfant, ils furent remplis de joie et lui offrirent des présents en signe de respect et d'honneur.",
                            "Ils reçurent cependant un avertissement leur demandant de faire attention à certaines personnes qui pouvaient avoir des intentions différentes à l'égard de l'enfant.",
                            "Après avoir reçu cet avertissement, ils retournèrent dans leur pays par un autre chemin, et l'histoire de l'enfant et de sa famille continua."
                        ]
                    }

                ]
            },


            {
                name: "Jean",
                number: 43,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "La Parole était au commencement avec Dieu, et toute l'histoire de la création était liée à cette origine.",
                            "La Parole représentait la vie et apportait une lumière destinée aux hommes, même lorsque les ténèbres semblaient dominer autour d'eux.",
                            "Un homme fut envoyé pour témoigner de cette lumière afin que beaucoup puissent la connaître et comprendre ce qu'elle représentait.",
                            "La lumière vint dans le monde, mais tous ne la reconnurent pas et certains refusèrent de comprendre ce qu'elle signifiait.",
                            "La Parole devint chair et habita parmi les hommes, qui purent alors découvrir la grâce et la gloire qu'elle apportait."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Il y eut une fête à Cana en Galilée, où se trouvaient la mère de Jésus, Jésus lui-même et ses disciples.",
                            "Lorsque les provisions vinrent à manquer pendant la fête, la mère de Jésus lui parla de la situation et attendit de voir ce qu'il ferait.",
                            "Jésus demanda aux serviteurs de préparer ce qui était nécessaire, tandis que les personnes présentes observaient les événements avec attention.",
                            "À ce moment-là, Jésus manifesta un premier signe devant ses disciples, et leur confiance en lui grandit à la suite de ce qu'ils avaient vu.",
                            "Ce qui se passa à Cana permit aux disciples de mieux comprendre la portée du ministère de Jésus et le sens des signes qu'il accomplissait."
                        ]
                    }

                ]
            }

        ]
    },


    /* =====================================================
     * ENGLISH
     * ===================================================== */

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
                            "In the beginning, God created the heavens and the earth, establishing the foundations of everything that would later take shape.",
                            "The earth was still without form and empty, while darkness covered the deep, but the Spirit of God was present above the waters.",
                            "God commanded the light to appear, and the light came. He saw that the light was good and separated it from the darkness.",
                            "He gave a name to the light and another name to the darkness. Thus the times of day and night began according to the order he established.",
                            "God continued to organize the waters, the land, and everything that would live upon it, giving each part its place and purpose."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "The heavens and the earth were completed with everything in them. When the work was finished, God looked upon the whole creation and saw that its order was complete.",
                            "After completing all the work he had undertaken, God rested on the seventh day from all the work he had accomplished.",
                            "God blessed the seventh day and set it apart, because on that day he rested from all the work he had completed in creation.",
                            "This is the account of the beginning of the heavens and the earth when they were created. Each part was gradually given its place and purpose within the established order.",
                            "When God formed the man, he placed him in a special garden and gave him responsibility to care for and protect what had been entrusted to him."
                        ]
                    },

                    {
                        chapter: 3,
                        verses: [
                            "The serpent was more cunning than all the animals of the field. It approached the woman and began asking questions about what God had commanded.",
                            "The serpent caused the woman to doubt by questioning the word that had been given. She then looked at the thing that had been forbidden.",
                            "When she saw that it appeared attractive and desirable, she took some of it and ate, and she also gave some to the man who was with her.",
                            "After realizing what they had done, they tried to hide in the garden when they heard God's voice because they were afraid to face him.",
                            "God called the man and asked what had happened. The consequences of disobedience then began to become clear in their lives."
                        ]
                    }

                ]
            },


            {
                name: "Exodus",
                number: 2,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "These were the names of the children of Israel who came to Egypt with their families. As the years passed, their descendants became increasingly numerous.",
                            "The children of Israel multiplied greatly and their population grew throughout the land, despite the difficulties they encountered.",
                            "A new king arose in Egypt who no longer remembered the history of Joseph or the good he had once done for the country.",
                            "The king feared that the people of Israel would become too numerous, so he began to place heavy burdens and difficult labor upon them.",
                            "Even under oppression and hard labor, the people continued to multiply, and their numbers did not stop increasing."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "A child was born into a family that sought to protect him. When his mother saw that he was beautiful, she did everything she could to keep him safe.",
                            "When she could no longer hide him, she placed the child in a carefully prepared basket and set it among the plants beside the river.",
                            "Someone watched from a distance to discover what would happen to the child and whether there would be a way for him to be rescued.",
                            "A woman noticed the child and was moved by his situation. She took him and looked for someone who could care for him.",
                            "The child grew in safety and later became a person who would have an important role among his people."
                        ]
                    }

                ]
            },


            {
                name: "Leviticus",
                number: 3,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "God taught the people about sacrifices and worship so that everyone could understand how to approach him with respect.",
                            "Each offering was to be presented according to specific rules, and the people learned that the attitude of the heart was also important.",
                            "The people understood that an outward action was not enough and that sincerity, faithfulness, and respect were part of true worship.",
                            "The priests were responsible for caring for the worship service and teaching the people how to respect what had been dedicated.",
                            "In this way, the people learned that worship should be connected with purity, faithfulness, and a respectful attitude before God."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "The people brought offerings as an expression of thanksgiving and respect. What they presented was prepared carefully.",
                            "They learned that giving should come from a sincere heart rather than from a desire to appear important or receive praise.",
                            "Those responsible for worship cared for the dedicated things and taught the people to respect what had been reserved for service.",
                            "The service was to be performed faithfully and respectfully, while each person had a particular responsibility within the community.",
                            "The people learned that faithfulness in small things and respect for instructions were important in everyday life."
                        ]
                    }

                ]
            },


            {
                name: "Numbers",
                number: 4,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "God commanded Moses to count the people so that their number would be known and the nation could be properly organized.",
                            "The people were counted according to their families and tribes, and each group was included in the organization required for the community.",
                            "The leaders of the tribes were called to assist Moses in counting and organizing the entire people.",
                            "The census was carried out carefully so that every group could be identified and the organization could take place without confusion.",
                            "When the census was completed, the leaders knew the number of people and could prepare the movement and organization of the camp."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "The people arranged their camp around the holy place, and each tribe received a specific position according to the established order.",
                            "Some tribes were placed on one side and others on another side according to the instructions they had received.",
                            "Each family knew its location and where it should go whenever the people had to leave the camp and continue their journey.",
                            "A clear order was established to prevent confusion when the people moved together with their families and possessions.",
                            "Through this organization, the whole community could move together, with everyone knowing their role and the place they were expected to occupy."
                        ]
                    }

                ]
            },


            {
                name: "Matthew",
                number: 40,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "The story of Jesus Christ begins with a long succession of generations connecting the history of the ancestors with that of a new generation.",
                            "Many people followed one another in this history, each occupying a particular place within the succession of generations.",
                            "When the time came, Jesus was born, and his birth became especially important to those who were waiting for the fulfillment of their hope.",
                            "The child was given the name Jesus, and his family believed that he would have an important responsibility in the history of the people.",
                            "The beginning of the story of Jesus therefore connects ancient promises with the new events that would follow."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Wise men from a distant country came looking for Jesus after observing a sign that had announced his birth.",
                            "They traveled a long distance and asked where they could find the child whom they believed would have an important role.",
                            "When they found the child, they were filled with joy and offered gifts as a sign of respect and honor.",
                            "They were then warned to be careful about certain people who might have different intentions toward the child.",
                            "After receiving the warning, they returned to their country by another road, and the story of the child and his family continued."
                        ]
                    }

                ]
            },


            {
                name: "John",
                number: 43,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "The Word was in the beginning with God, and the whole story of creation was connected with that beginning.",
                            "The Word represented life and brought light to humanity, even when darkness seemed to surround the people.",
                            "A man was sent to testify about the light so that many people could recognize it and understand what it represented.",
                            "The light came into the world, but not everyone recognized it, and some refused to understand what it meant.",
                            "The Word became flesh and lived among people, allowing them to discover the grace and glory that he brought."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "There was a celebration at Cana in Galilee, where the mother of Jesus, Jesus himself, and his disciples were present.",
                            "When the provisions ran out during the celebration, the mother of Jesus told him about the situation and waited to see what he would do.",
                            "Jesus asked the servants to prepare what was necessary while the people present watched the events carefully.",
                            "At that moment, Jesus showed a first sign before his disciples, and their confidence in him increased because of what they had seen.",
                            "What happened at Cana helped the disciples understand more deeply the importance of Jesus' ministry and the meaning of the signs he performed."
                        ]
                    }

                ]
            }

        ]
    }

};