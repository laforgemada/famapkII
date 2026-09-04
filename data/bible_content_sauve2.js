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
            },


            /* =================================================
             * DEOTORONOMIA
             * ================================================= */

            {
                name: "Deotoronomia",
                number: 5,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Nitantara tamin'ny vahoaka i Mosesy ny dia lava izay nataon'izy ireo, ary nampahatsiahy azy ireo ny zavatra rehetra efa niainany niaraka tamin'Andriamanitra.",
                            "Nampianariny ny vahoaka mba hitandrina ny didy nomena azy ireo, satria izany no hitondra fiadanana sy fahombiazana amin'ny fiainany manaraka.",
                            "Nasongadin'i Mosesy fa tsy tokony hanadino ny zavatra niseho tamin'ny lalana, fa tokony hotehirizina ao am-po mandrakizay izany fahatsiarovana izany.",
                            "Nampiomana ny vahoaka izy mba ho vonona hiditra any amin'ny tany vaovao, ka nampirisika azy ireo mba hatoky sy hanam-pahasahiana.",
                            "Nolazainy fa tsy irery izy ireo amin'ny dia manaraka, fa hanaraka azy ireo hatrany Andriamanitra raha mbola mankatò ny toromarika nomena."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nasongadin'i Mosesy indray fa nisy fifanekena natao teo amin'Andriamanitra sy ny vahoaka, ary tokony hotanana amin'ny fo izany fifanekena izany.",
                            "Nampahatsiahy azy ireo izy fa tsy tokony hanaraka fomba hafa, fa hijanona tsy hivadika amin'izay nampianarina azy ireo.",
                            "Nolazainy fa ny fiainana ao amin'ny tany vaovao dia miankina amin'ny fankatoavana sy ny fifandraisana marina amin'Andriamanitra.",
                            "Nampirisihany ny vahoaka mba hampita ireo fahalalana ireo amin'ny taranany mifandimby, mba tsy ho very ilay fahatsiarovana.",
                            "Notapahiny ny lahateniny tamin'ny fanantenana fa ho tanteraka ny zavatra nampanantenaina, raha mbola mifikitra amin'ny marina ny vahoaka."
                        ]
                    }

                ]
            },


            /* =================================================
             * JOSOA
             * ================================================= */

            {
                name: "Josoa",
                number: 6,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Rehefa maty i Mosesy dia noraisin'i Josoa ny andraikitra hitarika ny vahoaka, ary nampahery azy Andriamanitra tamin'izany fiovana lehibe izany.",
                            "Nampirisihina i Josoa mba ho matanjaka sy hatoky, satria nisy asa lehibe niandry azy teo anoloany.",
                            "Nolazaina taminy fa tsy hanary azy Andriamanitra na oviana na oviana, ary tokony hitandrina ny toromarika rehetra nomena izy.",
                            "Nandray fahasahiana i Josoa ka nanomboka nikarakara ny fandaharana rehetra hitarihana ny vahoaka handroso.",
                            "Ny vahoaka kosa nanaiky hanaraka azy tamin'ny fahatokiana, satria hitany fa nofidin'Andriamanitra izy ho mpitarika vaovao."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Naniraka olona hisafo ny tany i Josoa, mba hahafantarana bebe kokoa izay tokony ho fantatra alohan'ny hidirana any.",
                            "Tonga tao amin'ny tanàna iray ireo mpisafo ka nifandray tamin'ny vehivavy iray izay nanampy azy ireo tamin'ny fomba tsy nampoizina.",
                            "Nafenin-drazazavavy tao an-tranony ireo mpisafo rehefa nisy loza nanodidina azy ireo, ary nampanantena ny hiaro azy amin'ny farany.",
                            "Rehefa afaka ilay loza dia niverina tany amin'i Josoa ireo mpisafo ka nitantara izay hitany sy nolazaina taminy.",
                            "Ny vaovao nentin'izy ireo dia nampahery an'i Josoa sy ny vahoaka, satria hitany fa afaka mandroso amim-pitokiana izy ireo."
                        ]
                    }

                ]
            },


            /* =================================================
             * SALAMO
             * ================================================= */

            {
                name: "Salamo",
                number: 19,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Sambatra ny olona izay tsy manaraka ny toro-hevitry ny ratsy fanahy, fa mifidy ny lalana marina sy ny fahamarinana kosa.",
                            "Ny fony dia mankasitraka ny toromarika sy ny fampianarana, ka mieritreritra amin'izany andro aman'alina izy.",
                            "Toy ny hazo ambony rano izy, izay mamoa amin'ny fotoana voatondro sady tsy malazo ny raviny na oviana na oviana.",
                            "Fa tsy toy izany kosa ny ratsy fanahy, satria toy ny mololo entin'ny rivotra izy no lasa tsy misy dikany.",
                            "Noho izany dia tsy maharitra amin'ny fitsarana ny ratsy fanahy, fa ny lalan'ny marina kosa no fantatr'Andriamanitra."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Andriamanitra no fiarovana sy tanjona ho an'izay mitady azy, ka azo itokiana amin'ny fotoan-tsarotra rehetra izy.",
                            "Na dia misy fahoriana aza manodidina, dia mahita fialan-tsiny ny fo izay mifikitra amin'ny fanantenana ao amin'Andriamanitra.",
                            "Ny fiarovana omen'Andriamanitra dia tsy miankina amin'ny toe-javatra ivelany, fa avy amin'ny fifandraisana lalina kokoa.",
                            "Izay manatona azy amin'ny fahatokiana dia mahazo hery sy fiadanana ao am-po, na dia eo aza ny fanamby.",
                            "Ny hira fiderana dia mifototra amin'ny fahatokiana fa tsy mandao ny olony Andriamanitra na amin'ny toe-javatra sarotra indrindra."
                        ]
                    }

                ]
            },


            /* =================================================
             * OHABOLANA
             * ================================================= */

            {
                name: "Ohabolana",
                number: 20,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Ny fahendrena dia miantso amin'ny feo avo eny an-dalambe, mba hahatratra izay rehetra vonona hihaino.",
                            "Ny olona kely saina dia asaina mianatra fahazavan-tsaina, fa ny fahaizana dia sarobidy kokoa noho ny harena.",
                            "Izay mandà ny fananarana dia mampidi-doza ny tenany, fa izay mihaino kosa no hahazo fahendrena marina.",
                            "Ny toro-hevitra dia natao hitarika ny olona ho amin'ny lalana mahitsy, fa tsy hanakorontana ny fiainany.",
                            "Ny fahendrena dia manome fiadanana ho an'izay mandray sy manaja izany amin'ny fony."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Raha mitady fahalalana amin'ny fo manontolo ny olona iray, dia hahazo valiny izy amin'ny fomba tsy nampoizina.",
                            "Ny fahendrena dia miaro amin'ny làlana ratsy sy ny fisainana mamitaka izay mety hahatonga fahasimbana.",
                            "Izay mandray fahendrena dia hahazo fahalalahan-tsaina hanavaka ny marina amin'ny diso.",
                            "Ny fahamarinana sy ny rariny dia miaraka amin'izay mizoto hitady fahendrena tamin-kitsim-po.",
                            "Amin'ny farany, izay mizotra amin'ny lalana marina no hahita fiadanana lalina ao am-piainany."
                        ]
                    }

                ]
            },


            /* =================================================
             * LIOKA
             * ================================================= */

            {
                name: "Lioka",
                number: 42,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Maro ny olona nikasa hanoratra ny tantara momba ireo zavatra niseho, ary Lioka koa naneho ny fikasany hanoratra amim-pahamarinana.",
                            "Nangataka taminy hanoratra araka ny filaharan'ny zavatra niseho, mba ho azon'ny mpamaky an-kitsiny izany.",
                            "Nisy anjely niseho tamin'ny fianakaviana iray ka nanambara fa hisy zaza hateraka ao aminy, izay hanana andraikitra manokana.",
                            "Gaga ilay fianakaviana ary tsy takany tanteraka izay nolazaina taminy, saingy nino ihany izy ireo.",
                            "Ny vaovao nentin'ilay anjely dia niely tamin'ny fianakaviana akaiky, ary samy niandry ny fahatanterahan'izany avy izy ireo."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Tonga ny fotoana ka niteraka ilay zaza nampanantenaina, ary nisy fifaliana lehibe niely tamin'izany fotoana izany.",
                            "Nisy mpiandry ondry tany an-tsaha nahita famantarana avy any an-danitra ka gaga fatratra izy ireo.",
                            "Nolazain'ny anjely tamin'ireo mpiandry ondry ny vaovao mahafaly momba ilay zaza vao teraka.",
                            "Nandeha faingana ireo mpiandry ondry hijery ilay zaza ary tafavory maro ny olona hankalaza izany hetsika izany.",
                            "Rehefa hitan'izy ireo ilay zaza dia niverina tamim-pifaliana izy ireo ka nizara tamin'ny olon-drehetra izay hitany sy henony."
                        ]
                    }

                ]
            },


            /* =================================================
             * ROMANINA
             * ================================================= */

            {
                name: "Romanina",
                number: 45,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Nanoratra taratasy ho an'ny vahoaka tao amin'ny tanàna lehibe iray i Paoly, mba hizarany hafatra momba ny finoana.",
                            "Nolazainy fa ny hafatra nentiny dia natokana ho an'ny olon-drehetra, na avy amin'ny fiaviana samihafa aza izy ireo.",
                            "Nasongadiny fa ny finoana no fototra iorenan'ny fifandraisana lalina kokoa amin'Andriamanitra.",
                            "Nohazavainy fa tsy misy avaka eo amin'ny olona rehetra raha ny amin'ny fahitàna izay marina sy tsara.",
                            "Nangataka izy mba hisian'ny firaisan-kina eo amin'ny vahoaka, na dia samy hafa aza ny fiaviany avy."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Nazavain'i Paoly fa ny fitsarana marina dia mifototra amin'ny asa sy ny fanapahan-kevitra nataon'ny tsirairay, fa tsy amin'ny fiaviana ihany.",
                            "Nampahatsiahy izy fa samy manana andraikitra amin'ny fiainany avy ny olona tsirairay, na inona na inona toerana misy azy.",
                            "Nasongadiny fa ny fahamarinana dia tokony hiseho amin'ny fihetsika andavanandro, fa tsy amin'ny teny ihany.",
                            "Nanome toky izy fa hisy valiny ho an'izay mizotra amin'ny lalana marina amim-paharetana.",
                            "Notapahiny ny hafatra tamin'ny fanantenana fa hitohy hifamatotra amin'ny fahamarinana ny vahoaka rehetra mpino."
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
            },


            {
                name: "Deutéronome",
                number: 5,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Moïse rappela au peuple le long voyage qu'ils avaient traversé, et il leur remémora tout ce qu'ils avaient vécu avec Dieu.",
                            "Il leur enseigna à observer les instructions qui leur avaient été données, car cela devait leur apporter paix et réussite dans les jours à venir.",
                            "Moïse insista sur le fait qu'ils ne devaient pas oublier ce qui s'était passé en chemin, mais garder ce souvenir gravé dans leur cœur.",
                            "Il prépara le peuple à entrer dans un territoire nouveau, en les encourageant à avancer avec confiance et courage.",
                            "Il leur affirma qu'ils ne seraient pas seuls dans cette nouvelle étape, car Dieu continuerait à les accompagner tant qu'ils suivraient ses instructions."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Moïse rappela encore qu'une alliance avait été établie entre Dieu et le peuple, et qu'il fallait la garder fidèlement dans le cœur.",
                            "Il les avertit de ne pas se tourner vers d'autres pratiques, mais de rester attachés à ce qui leur avait été enseigné.",
                            "Il expliqua que la vie dans ce nouveau territoire dépendrait de leur fidélité et d'une relation sincère avec Dieu.",
                            "Il les encouragea à transmettre ces enseignements à leurs descendants, afin que ce souvenir ne se perde jamais.",
                            "Il conclut son discours avec l'espérance que les promesses se réaliseraient, tant que le peuple resterait attaché à ce qui était juste."
                        ]
                    }

                ]
            },


            {
                name: "Josué",
                number: 6,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Après la mort de Moïse, Josué reçut la responsabilité de conduire le peuple, et Dieu l'encouragea face à ce grand changement.",
                            "Josué fut invité à être fort et confiant, car une tâche importante l'attendait.",
                            "On lui assura que Dieu ne l'abandonnerait jamais, à condition qu'il reste attentif à toutes les instructions reçues.",
                            "Josué prit courage et commença à organiser tout ce qui était nécessaire pour faire avancer le peuple.",
                            "Le peuple accepta de le suivre avec confiance, car il voyait en lui le nouveau chef choisi par Dieu."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Josué envoya des hommes explorer le territoire, afin de mieux comprendre ce qu'il fallait savoir avant d'y entrer.",
                            "Arrivés dans une ville, ces explorateurs rencontrèrent une femme qui les aida d'une manière inattendue.",
                            "Elle les cacha chez elle lorsqu'un danger survint, et leur promit de les protéger jusqu'au bout.",
                            "Une fois le danger passé, les explorateurs retournèrent auprès de Josué pour lui raconter ce qu'ils avaient vu.",
                            "Les nouvelles qu'ils rapportèrent encouragèrent Josué et le peuple, qui virent qu'ils pouvaient avancer avec confiance."
                        ]
                    }

                ]
            },


            {
                name: "Psaumes",
                number: 19,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Heureux celui qui ne suit pas les conseils de ceux qui font le mal, mais qui choisit le chemin juste et la vérité.",
                            "Son cœur trouve du plaisir dans les enseignements et l'instruction, qu'il médite jour et nuit.",
                            "Il ressemble à un arbre planté près de l'eau, qui porte du fruit en son temps et dont les feuilles ne se flétrissent jamais.",
                            "Il n'en va pas de même pour celui qui fait le mal, car il est comme la paille emportée par le vent, sans consistance.",
                            "C'est pourquoi celui qui agit mal ne résistera pas au jugement, tandis que le chemin du juste est connu de Dieu."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Dieu est un refuge et un but pour celui qui le cherche, et l'on peut compter sur lui dans tous les moments difficiles.",
                            "Même au milieu des épreuves, le cœur qui s'attache à l'espérance en Dieu trouve du réconfort.",
                            "La protection qu'offre Dieu ne dépend pas des circonstances extérieures, mais d'une relation plus profonde.",
                            "Celui qui s'approche de lui avec confiance reçoit force et paix intérieure, même face aux difficultés.",
                            "Le chant de louange repose sur la certitude que Dieu n'abandonne jamais les siens, même dans les situations les plus difficiles."
                        ]
                    }

                ]
            },


            {
                name: "Proverbes",
                number: 20,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "La sagesse élève la voix sur les places publiques, afin d'atteindre tous ceux qui sont prêts à écouter.",
                            "Celui qui manque de discernement est invité à apprendre le bon sens, car la connaissance vaut plus que la richesse.",
                            "Celui qui refuse la correction se met lui-même en danger, tandis que celui qui écoute obtient une véritable sagesse.",
                            "Les conseils sont donnés pour guider la personne vers un chemin droit, et non pour bouleverser sa vie.",
                            "La sagesse apporte la paix à celui qui l'accueille et la respecte de tout son cœur."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Celui qui recherche la connaissance de tout son cœur trouvera une réponse d'une manière inattendue.",
                            "La sagesse protège des chemins mauvais et des pensées trompeuses qui pourraient causer du tort.",
                            "Celui qui reçoit la sagesse obtient la clarté d'esprit nécessaire pour distinguer le vrai du faux.",
                            "La justice et l'équité accompagnent ceux qui cherchent la sagesse avec sincérité.",
                            "Finalement, celui qui suit le chemin juste connaîtra une paix profonde dans sa vie."
                        ]
                    }

                ]
            },


            {
                name: "Luc",
                number: 42,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Plusieurs avaient déjà entrepris de raconter les événements survenus, et Luc exprima lui aussi son intention d'écrire avec précision.",
                            "On lui demanda de rédiger le récit selon l'ordre des événements, afin que les lecteurs puissent le comprendre clairement.",
                            "Un ange apparut à une famille pour annoncer la naissance prochaine d'un enfant qui aurait un rôle particulier.",
                            "Cette famille fut surprise et ne comprit pas immédiatement ce qui leur était annoncé, mais ils crurent malgré tout.",
                            "La nouvelle apportée par l'ange se répandit parmi les proches, et chacun attendait de voir cette promesse se réaliser."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Le moment vint où l'enfant promis naquit, et une grande joie se répandit à cette occasion.",
                            "Des bergers qui gardaient leurs troupeaux dans les champs virent un signe venu du ciel et furent remplis d'étonnement.",
                            "Un ange annonça aux bergers la bonne nouvelle concernant la naissance de cet enfant.",
                            "Les bergers se hâtèrent d'aller voir l'enfant, et de nombreuses personnes se rassemblèrent pour célébrer cet événement.",
                            "Lorsqu'ils virent l'enfant, ils repartirent remplis de joie et racontèrent à tous ce qu'ils avaient vu et entendu."
                        ]
                    }

                ]
            },


            {
                name: "Romains",
                number: 45,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Paul écrivit une lettre au peuple d'une grande ville, afin de leur transmettre un message concernant la foi.",
                            "Il expliqua que ce message était destiné à tous, quelle que soit leur origine.",
                            "Il souligna que la foi était le fondement d'une relation plus profonde avec Dieu.",
                            "Il précisa qu'il n'y avait aucune différence entre les personnes en ce qui concerne ce qui est juste et bon.",
                            "Il souhaita que l'unité règne parmi le peuple, malgré la diversité de leurs origines."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Paul expliqua que le jugement juste repose sur les actes et les choix de chacun, et non uniquement sur l'origine.",
                            "Il rappela que chaque personne porte une responsabilité dans sa propre vie, quelle que soit sa position.",
                            "Il souligna que la droiture devait se manifester dans les actions quotidiennes, et non seulement dans les paroles.",
                            "Il assura qu'une récompense attendait ceux qui persévéraient sur le chemin juste.",
                            "Il conclut son message avec l'espérance que tout le peuple croyant resterait uni dans la vérité."
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
            },


            {
                name: "Deuteronomy",
                number: 5,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Moses reminded the people of the long journey they had traveled, recalling everything they had experienced together with God.",
                            "He taught them to observe the instructions they had received, since this would bring them peace and success in the days ahead.",
                            "Moses emphasized that they should not forget what had happened along the way, but keep that memory in their hearts forever.",
                            "He prepared the people to enter a new land, encouraging them to move forward with confidence and courage.",
                            "He assured them they would not be alone in this next stage, since God would continue to accompany them as long as they followed his instructions."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Moses reminded them again that a covenant had been established between God and the people, and that it should be kept faithfully in their hearts.",
                            "He warned them not to turn toward other practices, but to remain faithful to what they had been taught.",
                            "He explained that life in the new land would depend on their faithfulness and a sincere relationship with God.",
                            "He encouraged them to pass these teachings on to their descendants, so that the memory would never be lost.",
                            "He concluded his speech with the hope that the promises would be fulfilled, as long as the people remained faithful to what was right."
                        ]
                    }

                ]
            },


            {
                name: "Joshua",
                number: 6,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "After Moses died, Joshua received the responsibility of leading the people, and God encouraged him through this major change.",
                            "Joshua was told to be strong and confident, since an important task awaited him.",
                            "He was assured that God would never abandon him, as long as he remained attentive to all the instructions he received.",
                            "Joshua took courage and began organizing everything necessary to move the people forward.",
                            "The people agreed to follow him with confidence, since they saw in him the new leader chosen by God."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Joshua sent men to explore the land, so they could better understand what needed to be known before entering it.",
                            "Arriving in a city, these explorers met a woman who helped them in an unexpected way.",
                            "She hid them in her house when danger arose, and promised to protect them to the end.",
                            "Once the danger had passed, the explorers returned to Joshua to tell him what they had seen.",
                            "The news they brought encouraged Joshua and the people, who saw that they could move forward with confidence."
                        ]
                    }

                ]
            },


            {
                name: "Psalms",
                number: 19,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Blessed is the one who does not follow the advice of those who do wrong, but chooses the right path and the truth instead.",
                            "Their heart finds delight in instruction and teaching, meditating on it day and night.",
                            "They are like a tree planted near water, bearing fruit in its season, with leaves that never wither.",
                            "It is not the same for the one who does wrong, for they are like chaff carried away by the wind, without substance.",
                            "That is why the wrongdoer will not stand in the judgment, while the path of the righteous is known by God."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "God is a refuge and a goal for anyone who seeks him, and can be relied upon in every difficult moment.",
                            "Even amid hardship, a heart that holds on to hope in God finds comfort.",
                            "The protection God offers does not depend on outward circumstances, but on a deeper relationship.",
                            "Anyone who approaches him with confidence receives strength and inner peace, even in the face of difficulty.",
                            "The song of praise rests on the certainty that God never abandons his own, even in the hardest situations."
                        ]
                    }

                ]
            },


            {
                name: "Proverbs",
                number: 20,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Wisdom raises her voice in the public squares, so as to reach everyone who is ready to listen.",
                            "Those who lack discernment are invited to learn good sense, for knowledge is worth more than riches.",
                            "Whoever refuses correction puts themselves in danger, while whoever listens gains true wisdom.",
                            "Advice is given to guide a person onto a straight path, not to disrupt their life.",
                            "Wisdom brings peace to whoever welcomes and respects it with their whole heart."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Whoever seeks knowledge with their whole heart will find an answer in an unexpected way.",
                            "Wisdom protects against harmful paths and deceptive thoughts that could cause damage.",
                            "Whoever receives wisdom gains the clarity of mind needed to tell truth from falsehood.",
                            "Justice and fairness accompany those who seek wisdom sincerely.",
                            "In the end, whoever follows the right path will know a deep peace in their life."
                        ]
                    }

                ]
            },


            {
                name: "Luke",
                number: 42,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Many had already undertaken to tell the story of what had happened, and Luke also expressed his intention to write it accurately.",
                            "He was asked to set down the account in the order of events, so that readers could understand it clearly.",
                            "An angel appeared to a family to announce the coming birth of a child who would have a particular role.",
                            "The family was surprised and did not immediately understand what they were being told, but they believed anyway.",
                            "The news the angel brought spread among their relatives, and everyone waited to see this promise fulfilled."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "The time came when the promised child was born, and great joy spread on that occasion.",
                            "Shepherds watching their flocks in the fields saw a sign from the sky and were filled with amazement.",
                            "An angel announced to the shepherds the good news concerning the birth of this child.",
                            "The shepherds hurried to see the child, and many people gathered to celebrate the event.",
                            "When they saw the child, they went back filled with joy and told everyone what they had seen and heard."
                        ]
                    }

                ]
            },


            {
                name: "Romans",
                number: 45,

                chapters: [

                    {
                        chapter: 1,
                        verses: [
                            "Paul wrote a letter to the people of a great city, in order to pass on to them a message about faith.",
                            "He explained that this message was meant for everyone, regardless of their background.",
                            "He emphasized that faith was the foundation of a deeper relationship with God.",
                            "He stated that there was no difference among people when it came to what is right and good.",
                            "He hoped that unity would prevail among the people, despite the diversity of their backgrounds."
                        ]
                    },

                    {
                        chapter: 2,
                        verses: [
                            "Paul explained that fair judgment rests on each person's actions and choices, not only on their background.",
                            "He reminded them that every person carries responsibility for their own life, whatever position they hold.",
                            "He emphasized that righteousness should show itself in everyday actions, not only in words.",
                            "He assured them that a reward awaited those who persevered on the right path.",
                            "He concluded his message with the hope that all believing people would remain united in truth."
                        ]
                    }

                ]
            }

        ]
    }

};