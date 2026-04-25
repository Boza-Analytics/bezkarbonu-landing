export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  body: string;
}

export const posts: BlogPost[] = [
  {
    slug: "jak-poznat-ze-motor-potrebuje-dekarbonizaci",
    title: "Jak poznat, že motor potřebuje dekarbonizaci: 7 jasných příznaků",
    metaTitle: "7 příznaků zauhleného motoru | CisteniVodikem.cz",
    metaDescription: "Zvýšená spotřeba, ztráta výkonu nebo tmavý výfuk? Naučte se rozeznat 7 příznaků zauhleného motoru a zjistěte, kdy je čas na vodíkovou dekarbonizaci.",
    excerpt: "Uhlíkové nánosy se budují roky, než se projeví naplno. Naučte se rozeznat 7 příznaků, které napovídají, že váš motor volá o pomoc.",
    date: "2026-04-10",
    readTime: 6,
    category: "Rady & tipy",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Detail motorového prostoru automobilu",
    keywords: ["příznaky zauhleného motoru", "motor potřebuje dekarbonizaci", "ztráta výkonu motoru", "zvýšená spotřeba paliva", "vodíková dekarbonizace"],
    body: `
<p>Moderní motor toho vydrží hodně — ale uhlíkové nánosy, které se pomalu usazují na vstřikovačích, ventilech a spalovacích prostorách, dokáží i ten nejspolehlivější agregát připravit o výkon a efektivitu. Problém je, že je nevidíte. Víte ale, jak je <em>ucítit</em>?</p>

<h2>Co jsou uhlíkové nánosy a kde vznikají?</h2>
<p>Při spalování paliva vznikají zbytky nespáleného uhlíku. Část těchto sazí se odvede výfukem, část se ale usazuje uvnitř motoru — na vstřikovačích, sacích ventilech, DPF filtru, turbodmychadle nebo v EGR okruhu. Čím déle motor jezdí bez čistění, tím silnější vrstva nanosu vzniká. A tím více trpí výkon, spotřeba i životnost komponent.</p>

<h2>7 příznaků, že váš motor potřebuje dekarbonizaci</h2>

<h3>1. Zvýšená spotřeba paliva</h3>
<p>Ucpané vstřikovače nedokáží palivo rozprášit tak efektivně. Motor musí spálit více paliva, aby dosáhl stejného výkonu. Pokud jezdíte více, než byste měli, nebo si všimnete, že nádrž padá rychleji než dříve, je to jeden z prvních signálů zauhleného motoru.</p>

<h3>2. Ztráta výkonu a slabší akcelerace</h3>
<p>Uhlíkové nánosy na sacích ventilech snižují průtok vzduchu do válců. Výsledkem je slabší plnění, horší spalování a znatelná ztráta výkonu — zejména při vyšších otáčkách a přetáčení.</p>

<h3>3. Obtížné studené startování</h3>
<p>Motor, který nechce nastartovat za chladného rána, může mít zanesené vstřikovače. Ucpané trysky nedodají do válce správné množství paliva, starty jsou těžší a motor musí déle chodit na chod naprázdno, než se zahřeje.</p>

<h3>4. Tmavý nebo černý výfuk</h3>
<p>Zvýšené emise sazí jsou jedním z nejviditelnějších příznaků. Pokud za vaším autem vidíte tmavý dým — zvláště při akceleraci — je to jasný signál, že spalování není čisté a motor potřebuje pozornost.</p>

<h3>5. Zvýšené vibrace a nepravidelný chod motoru</h3>
<p>Zanesené vstřikovače mohou způsobovat nerovnoměrné dávkování paliva. Výsledkem jsou vibrace při volnoběhu, nepravidelný chod nebo pocit, že motor „škube". Tento příznak je typický u dieselů se silnou vrstvou sazí.</p>

<h3>6. Problémy s DPF filtrem nebo varování na palubní desce</h3>
<p>Kontrolka motoru nebo varování o DPF filtru je přímý důsledek nadměrného množství sazí. Vodíková dekarbonizace pomáhá DPF filtr průběžně čistit a prodlužuje jeho životnost — viz náš článek <a href="/blog/dpf-filtr-co-to-je-jak-chranit">Co je DPF filtr a jak ho chránit</a>.</p>

<h3>7. Zápach výfuku a nepříjemný odér v kabině</h3>
<p>Nespálené zbytky paliva a uhlíkových usazenin mohou produkovat charakteristický zápach — ostrý nebo chemický. Pokud ucítíte silný výfukový odér i v kabině vozu, motor pravděpodobně nespaluje čistě.</p>

<h2>Kdy přijít na dekarbonizaci?</h2>
<p>Doporučujeme vodíkovou dekarbonizaci preventivně každých <strong>15 000–25 000 km</strong>, nebo kdykoli zaznamenáte více než dva ze zmíněných příznaků. U dieselů s DPF filtrem, turbem nebo EGR okruhem je pravidelná péče ještě důležitější.</p>
<p>Před každou STK je dekarbonizace ideální přípravou — reálné výsledky emisních testů ukazují snížení pevných částic o desítky procent. Více v článku <a href="/blog/jak-projit-stk-snizit-emise">Jak projít STK bez problémů</a>.</p>

<h2>Jak vypadá vodíková dekarbonizace?</h2>
<p>Celý proces trvá 50–80 minut a nepotřebuje demontáž motoru ani výměnu oleje. Vodíko-kyslíková směs (HHO) vstupuje do sání motoru, kde při spalování uvolňuje a vypuzuje uhlíkové nánosy. Jedinou vedlejší složkou je vodní pára a CO₂. Žádná chemie, žádné zbytky.</p>
<p>Výsledek: čistší spalování, nižší spotřeba, obnovený výkon a prodloužená životnost klíčových komponent.</p>
    `,
  },
  {
    slug: "vodikova-vs-chemicka-dekarbonizace",
    title: "Vodíková vs. chemická dekarbonizace: kompletní srovnání",
    metaTitle: "Vodíková vs. chemická dekarbonizace: co je lepší? | CisteniVodikem.cz",
    metaDescription: "Porovnání dvou nejrozšířenějších metod čistění motoru. Zjistěte, proč vodíková dekarbonizace HHO vychází lépe než chemická — a proč na tom záleží.",
    excerpt: "Existují dva hlavní způsoby čistění motoru od uhlíkových nanosu. Porovnáváme vodíkovou a chemickou dekarbonizaci — přístup, výsledky i rizika.",
    date: "2026-04-07",
    readTime: 5,
    category: "Srovnání",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Pohled do motorového prostoru — srovnání metod čistění",
    keywords: ["vodíková dekarbonizace", "chemická dekarbonizace", "HHO dekarbonizace", "srovnání metod čistění motoru"],
    body: `
<p>Pokud jste začali hledat dekarbonizaci, pravděpodobně jste narazili na dva hlavní způsoby: vodíkovou a chemickou. Liší se přístupem, výsledky i rizikem pro motor. Porovnali jsme obě metody, abyste mohli vybrat informovaně.</p>

<h2>Co je chemická dekarbonizace?</h2>
<p>Chemická dekarbonizace využívá speciální rozpouštěcí přípravky, které se aplikují přímo do sání motoru nebo palivového systému. Chemikálie pak reagují s uhlíkovými nánosy a mají je rozpustit nebo uvolnit.</p>
<p>Metoda funguje na principu chemické reakce — a to je zároveň její slabina. Agresivnější prostředky mohou při nevhodném dávkování poškodit gumy, těsnění nebo katalyzátor. Výsledek závisí silně na kvalitě přípravku a zkušenostech technika.</p>

<h2>Co je vodíková dekarbonizace?</h2>
<p>Vodíková dekarbonizace (HHO dekarbonizace) funguje jinak: elektrolýzou vody se vyrábí směs vodíku a kyslíku, která se přivádí do sání motoru. Při spalování tato směs dosahuje teplot, při nichž se uhlíkové nánosy uvolní a vyhoří — přirozeně, bez chemie.</p>
<p>Vedlejším produktem je pouze vodní pára. Metoda je šetrná k těsněním, katalyzátoru i DPF filtru.</p>

<h2>Klíčové rozdíly na první pohled</h2>
<ul>
  <li><strong>Bezpečnost pro motor:</strong> Vodíková metoda nepoužívá agresivní chemikálie, riziko poškození těsnění nebo katalyzátoru je minimální. Chemická metoda nese vyšší riziko při nesprávném použití.</li>
  <li><strong>Rozsah čistění:</strong> HHO čistí celý spalovací okruh — od sacích ventilů přes vstřikovače, spalovací prostory, DPF filtr až po výfuk. Chemická metoda účinkuje primárně na palivový systém.</li>
  <li><strong>Délka procesu:</strong> Vodíková dekarbonizace trvá 50–80 minut za plného chodu. Chemická metoda může vyžadovat delší odstávku nebo následnou jízdu.</li>
  <li><strong>Ekologie:</strong> Vodíková metoda produkuje pouze vodní páru. Chemická metoda zanechává zbytky ve výfukovém systému.</li>
  <li><strong>Měřitelný výsledek:</strong> Po vodíkové dekarbonizaci lze okamžitě změřit emise a potvrdit účinnost. U chemické metody je výsledek hůře ověřitelný.</li>
</ul>

<h2>Proč volíme výhradně vodíkovou metodu?</h2>
<p>Vodíková dekarbonizace nám dává kontrolu nad procesem a jistotu výsledku — bez rizika poškození motoru. Zákazníci vidí měřitelné výsledky: nižší emise, lepší výkon, klidnější chod motoru. A to hned po ošetření.</p>
<p>Reálné výsledky emisních testů DEKRA před a po ošetření potvrzují snížení pevných částic o desítky procent. Chcete vědět, co to udělá pro váš motor? Přečtěte si <a href="/blog/jak-poznat-ze-motor-potrebuje-dekarbonizaci">7 příznaků, že motor potřebuje dekarbonizaci</a>, nebo rovnou <a href="/#contact">objednejte termín</a>.</p>
    `,
  },
  {
    slug: "jak-projit-stk-snizit-emise",
    title: "Jak projít STK bez problémů: snižte emise bez nákladné opravy",
    metaTitle: "Jak projít STK a snížit emise bez opravy motoru | CisteniVodikem.cz",
    metaDescription: "Propadli jste emisní zkouškou na STK? Nebo ji teprve máte? Zjistěte, jak vodíková dekarbonizace pomáhá snížit emise a projít STK bez nákladné opravy.",
    excerpt: "Neúspěch u emisní zkoušky STK je jednou z nejčastějších příčin odmítnutí vozidla. Přitom ho lze v mnoha případech vyřešit bez nákladné opravy.",
    date: "2026-04-03",
    readTime: 5,
    category: "STK & Emise",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Emisní zkouška automobilu na STK",
    keywords: ["STK emise", "jak projít STK", "emise STK motor", "příprava na STK", "snížit emise auto"],
    body: `
<p>STK zkoušku zvládne naprostá většina aut bez problémů — dokud se neobjeví červená na emisní zkoušce. Neúspěch u emisí je jednou z nejčastějších příčin odmítnutí vozidla. A přitom ho lze v mnoha případech vyřešit bez nákladné opravy.</p>

<h2>Co STK při emisní zkoušce měří?</h2>
<p>V závislosti na typu motoru se testuje:</p>
<ul>
  <li><strong>Benzínové motory:</strong> Lambda hodnota (poměr vzduch/palivo), obsah CO a HC ve výfukových plynech</li>
  <li><strong>Dieselové motory:</strong> Kouřivost výfuku — množství pevných částic (sazí) v m⁻¹</li>
</ul>
<p>Překročení povolených limitů znamená odmítnutí vozidla. Auto musí na opravu a pak zpět na přezkouška — s dalšími náklady a ztrátou času.</p>

<h2>Nejčastější příčiny neprůjezdné emisní zkoušky</h2>
<p>Emise rostou postupně s tím, jak se motor zanáší uhlíkovými nánosy. Hlavní příčiny:</p>
<ul>
  <li>Zanesené vstřikovače — nedokonalé rozprašování paliva</li>
  <li>Zanesené sací ventily — horší plnění válců, horší spalování</li>
  <li>Ucpaný DPF filtr u dieselů — přetížený filtr saze nevypustí</li>
  <li>Zanesený EGR ventil — recirkulace výfukových plynů přidává saze do sání</li>
  <li>Přetížený katalyzátor — neplní svou funkci čistění výfuku</li>
</ul>

<h2>Jak vodíková dekarbonizace pomáhá před STK?</h2>
<p>Vodíko-kyslíková směs čistí motor komplexně — od sacích ventilů přes vstřikovače, spalovací prostory, DPF filtr až po výfuk. Po ošetření motor spaluje čistěji, emise klesají a průchod emisní zkouškou je reálný i pro auta, která by jinak propadla.</p>

<h2>Reálné výsledky emisních testů</h2>
<p>Náš zákazník přijel s VW Touareg 3.0 TDI před STK. Kouřivost byla 2,4 m⁻¹ — limit je 1,5 m⁻¹. Po 80minutové dekarbonizaci výsledek klesl na <strong>0,8 m⁻¹</strong>. STK prošel bez námitek.</p>
<p>Podobné výsledky vidíme pravidelně — snížení kouřivosti o 40–60 % je při dekarbonizaci standard, nikoli výjimka. Protokoly z měření jsou k dispozici k nahlédnutí přímo v provozovně.</p>

<h2>Kdy přijít před STK?</h2>
<p>Ideálně <strong>1–2 týdny před plánovanou STK</strong>. Motor by si měl stihnout „ojet" pár set kilometrů po čistění, aby se zbytky uhlíku plně odvětraly. Přicházet den před STK je možné, ale výsledek bude ještě lepší s malým časovým odstupem.</p>
<p>Pokud víte, že váš diesel dělá tmavý kouř nebo jste zaznamenali <a href="/blog/jak-poznat-ze-motor-potrebuje-dekarbonizaci">příznaky zauhleného motoru</a>, nenechávejte to na poslední chvíli. <a href="/#contact">Objednejte se předem</a> — termíny obsazujeme rychle.</p>
    `,
  },
  {
    slug: "dpf-filtr-co-to-je-jak-chranit",
    title: "DPF filtr: co to je, jak funguje a proč ho neignorovat",
    metaTitle: "DPF filtr: co to je, příznaky ucpání a jak ho chránit | CisteniVodikem.cz",
    metaDescription: "DPF filtr patří k nejdražším komponentám dieselového motoru. Zjistěte, jak funguje, jak poznáte ucpaný DPF a jak ho chránit před předčasnou výměnou za desítky tisíc.",
    excerpt: "DPF filtr stojí na výměnu 15 000–50 000 Kč. Přitom stačí minimum péče, aby vydržel roky bez problémů. Vše, co potřebujete vědět.",
    date: "2026-03-28",
    readTime: 6,
    category: "Technologie",
    image: "https://images.unsplash.com/photo-1502637098811-fa9526d2b659?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Servis dieselového motoru s DPF filtrem",
    keywords: ["DPF filtr", "co je DPF", "ucpaný DPF", "čistění DPF filtru diesel", "DPF regenerace"],
    body: `
<p>DPF filtr patří mezi nejdůležitější — a nejčastěji přehlížené — komponenty moderního dieselového motoru. Stojí tisíce korun na opravu a přitom stačí minimum péče, aby vydržel roky bez problémů.</p>

<h2>Co je DPF filtr?</h2>
<p>DPF (Diesel Particulate Filter — filtr pevných částic) je zařízení ve výfukovém potrubí, které zachytává saze vznikající při spalování nafty. Bez DPF by diesel produkoval znatelně více emisí pevných částic — tedy toho nejškolivějšího, co vychází z výfuku.</p>
<p>V EU je DPF filtr povinnou výbavou u všech dieselů homologovaných od roku 2009 (norma Euro 5).</p>

<h2>Jak DPF funguje?</h2>
<p>DPF funguje ve dvou fázích:</p>
<ol>
  <li><strong>Zachycování:</strong> Saze z výfuku se zachytávají v keramické vložce filtru, dokud nepřesáhne určitá prahová hodnota.</li>
  <li><strong>Regenerace:</strong> Při dostatečně vysoké teplotě (typicky za jízdy po dálnici nebo při aktivní regeneraci) se saze vypalují — filtr se „čistí". Tento proces probíhá automaticky a řidič ho zpravidla nepozoruje.</li>
</ol>
<p>Problém nastává, když auto jezdí výhradně na krátké trasy ve městě. Teplota výfukových plynů nikdy nestoupne natolik, aby regenerace proběhla přirozeně. Filtr se pak postupně přeplňuje sazemi.</p>

<h2>Příznaky ucpaného DPF filtru</h2>
<ul>
  <li>Rozsvícení kontrolky DPF na palubní desce</li>
  <li>Výrazně vyšší spotřeba paliva</li>
  <li>Ztráta výkonu, motor přestane táhnout</li>
  <li>Motor přejde do nouzového režimu (limp mode)</li>
  <li>Hustý černý kouř z výfuku</li>
</ul>
<p>Ignorování ucpaného DPF filtru vede k jeho nevratnému poškození — výměna nového filtru stojí <strong>15 000–50 000 Kč</strong> podle vozu.</p>

<h2>Jak vodíková dekarbonizace chrání DPF?</h2>
<p>Vodíko-kyslíková směs při dekarbonizaci prochází celým spalovacím okruhem — včetně DPF filtru. Pomáhá uvolnit a vypálit usazené saze, zvyšuje efektivitu regeneračních cyklů a prodlužuje celkovou životnost filtru.</p>
<p>Pravidelná dekarbonizace každých 15 000–25 000 km je nejlevnější ochrana DPF, jakou pro svůj diesel můžete udělat. Srovnejte to s cenou výměny — a rozhodnutí je jasné.</p>
<p>Chcete vědět víc o tom, jak zauhlenost motoru ovlivňuje diesel obecně? Přečtěte si <a href="/blog/diesel-dekarbonizace-proc-zauhliCuje-vice">Proč diesel zauhličuje více než benzín</a>.</p>
    `,
  },
  {
    slug: "jak-snizit-spotrrebu-paliva",
    title: "8 ověřených způsobů, jak snížit spotřebu paliva o 10–20 %",
    metaTitle: "Jak snížit spotřebu paliva: 8 tipů co fungují | CisteniVodikem.cz",
    metaDescription: "Průměrný řidič ročně ušetří tisíce korun jen správnými návyky a péčí o motor. 8 ověřených tipů, jak snížit spotřebu paliva o 10–20 % bez drahého servisu.",
    excerpt: "Průměrný řidič v ČR spotřebuje za rok palivo za přes 30 000 Kč. Snížit spotřebu o 10–20 % přitom není žádná věda — tady je 8 ověřených způsobů.",
    date: "2026-03-22",
    readTime: 6,
    category: "Rady & tipy",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Tankování auta — snížení spotřeby paliva",
    keywords: ["snížit spotřebu paliva", "úspora paliva", "nižší spotřeba auta", "jak ušetřit na palivu", "spotřeba benzín diesel"],
    body: `
<p>Průměrný řidič v ČR spotřebuje za rok palivo v hodnotě přes 30 000 Kč. Přitom snížit spotřebu o 10–20 % není žádná věda — stačí kombinovat správné návyky s technickou péčí o motor. Tady jsou 8 ověřených způsobů.</p>

<h2>1. Udržujte správný tlak v pneumatikách</h2>
<p>Podhuštěné pneu zvyšuje valivý odpor. Při tlaku nižším o 0,3 bar stoupne spotřeba o 1–2 %. Kontrolujte tlak každý měsíc, zejména na začátku zimní a letní sezóny.</p>

<h2>2. Jeďte plynule, vyhněte se prudkému brzdění</h2>
<p>Každé zbytečné brzdění je zbytečně spálené palivo. Anticipujte provoz — nechte auto plout, kde to situace dovolí, a zvolněte s předstihem před světelnými křižovatkami. Motorová brzda šetří brzdy i palivo.</p>

<h2>3. Hlídejte otáčky — řaďte dřív</h2>
<p>Optimální pásmo pro minimální spotřebu je 1 500–2 000 otáček/min (benzín) a 1 200–1 800 ot./min (diesel). Řaďte vyšší rychlostní stupeň, jakmile to otáčky dovolí.</p>

<h2>4. Vypínejte motor při delším stání</h2>
<p>Motor v klidu spaluje 0,5–0,8 l/hod. Při čekání delším než 60 sekund se vyplatí vypnout — pokud to systém start-stop nedělá automaticky.</p>

<h2>5. Snižte aerodynamický odpor</h2>
<p>Střešní nosiče, přídavné antény a otevřená okna při vyšší rychlosti výrazně zvyšují spotřebu. Sundejte, co nepotřebujete — prázdný střešní box přidá klidně 0,5–1 l/100 km.</p>

<h2>6. Vyhněte se zbytečné zátěži</h2>
<p>Každých 100 kg navíc zvedne spotřebu o zhruba 0,3–0,5 l/100 km. Vykliďte kufr od věcí, které nepotřebujete vozit denně.</p>

<h2>7. Servisujte motor pravidelně</h2>
<p>Čistý vzduchový filtr, čerstvý olej se správnou viskozitou a funkční zapalovací svíčky jsou základ. Zanesený vzduchový filtr omezuje průtok vzduchu a motor kompenzuje zbytečně vyšší spotřebou.</p>

<h2>8. Proveďte vodíkovou dekarbonizaci motoru</h2>
<p>Zanesené vstřikovače a uhlíkové nánosy na sacích ventilech jsou jednou z hlavních příčin nárůstu spotřeby. Vodíková dekarbonizace obnovuje účinnost spalování — zákazníci průměrně hlásí úsporu 0,4–0,8 l/100 km po ošetření.</p>
<p>Při průměrném ročním nájezdu 15 000 km a ceně paliva 40 Kč/l to může znamenat úsporu <strong>2 400–4 800 Kč ročně</strong> — při ceně dekarbonizace od 2 390 Kč se investice vrátí do roka.</p>
<p>Chcete vidět, jak dekarbonizace vypadá v praxi? Přečtěte si <a href="/blog/realne-pribehy-zakazniku-dekarbonizace">3 reálné příběhy zákazníků</a> nebo <a href="/blog/dekarbonizace-vs-oprava-motoru-naklady">srovnání nákladů dekarbonizace vs. oprava</a>.</p>
    `,
  },
  {
    slug: "turbodmychadlo-zivotnost-dekarbonizace",
    title: "Turbodmychadlo a uhlík: jak prodloužit životnost turba",
    metaTitle: "Turbodmychadlo: jak prodloužit životnost a chránit turbo | CisteniVodikem.cz",
    metaDescription: "Výměna turbodmychadla stojí 20 000–80 000 Kč. Zjistěte, jak uhlíkové nánosy poškozují turbo a jak ho chránit pravidelnou vodíkovou dekarbonizací.",
    excerpt: "Turbodmychadlo je jedno z nejpreciznějších — a nejcitlivějších — zařízení v autě. Jeho výměna stojí desítky tisíc. Přitom ho lze snadno chránit.",
    date: "2026-03-15",
    readTime: 5,
    category: "Péče o motor",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Mechanik při práci na motoru s turbodmychadlem",
    keywords: ["turbodmychadlo životnost", "péče o turbo", "turbo uhlíkové nánosy", "turbo servis", "turbodmychadlo porucha"],
    body: `
<p>Turbodmychadlo je dnes standardem u dieselů a čím dál běžnější i u benzínových motorů. Je to jedna z nejprecizněji vyrobených součástí auta — a zároveň jedna z nejcitlivějších na znečistění. Přitom jeho ochrana je jednodušší, než si myslíte.</p>

<h2>Jak turbodmychadlo funguje?</h2>
<p>Turbo využívá energii výfukových plynů k pohonu kompresoru, který stlačuje vzduch vstupující do motoru. Díky tomu motor dostane více vzduchu — a může spálit více paliva — aniž by musel být fyzicky větší. Výsledkem je vyšší výkon při nižším objemu.</p>
<p>Turbína pracuje při teplotách 600–900 °C a otáčkách 100 000–250 000 ot./min. Při takových podmínkách jsou požadavky na čistotu oleje a mazání extrémně vysoké.</p>

<h2>Proč uhlík poškozuje turbodmychadlo?</h2>
<p>Uhlíkové nánosy v sacím traktu a výfukovém potrubí omezují průtok plynů — a tím i efektivitu turbodmychadla. Motor musí pracovat na vyšší výkon, aby dosáhl stejného výsledku. Turbo pracuje pod větší zátěží. Ložiska se více opotřebovávají. Životnost klesá.</p>
<p>Druhý problém: zanesené olejové vedení do turba způsobuje nedostatečné mazání. Turbo pracuje za sucha — a to je přímá cesta k poruše.</p>

<h2>Příznaky poškozeného nebo zanášeného turba</h2>
<ul>
  <li>Výrazná ztráta výkonu při akceleraci</li>
  <li>Pískání nebo hvízdání z oblasti turbodmychadla</li>
  <li>Modrý kouř z výfuku (hoří olej) nebo černý kouř (přebytek paliva)</li>
  <li>Zvýšená spotřeba oleje</li>
  <li>Varování na palubní desce — tlak paliva, teplota</li>
</ul>
<p>Výměna turbodmychadla stojí <strong>20 000–80 000 Kč</strong> včetně práce. Prevence stojí zlomek toho.</p>

<h2>Jak vodíková dekarbonizace chrání turbo?</h2>
<p>Vodíko-kyslíková směs čistí nejen spalovací prostory a ventily, ale také průchozí části turbodmychadla — lopatky turbíny a kompresoru. Odstraňuje nánosy, které zhoršují průtok a přidávají zbytečnou zátěž na ložiska.</p>
<p>Pravidelná dekarbonizace každých 15 000–25 000 km je nejlevnější pojistka pro vaše turbo. Přečtěte si také, <a href="/blog/dpf-filtr-co-to-je-jak-chranit">jak pečovat o DPF filtr</a> — obě komponenty jsou vzájemně provázány a profitují ze stejné péče.</p>
    `,
  },
  {
    slug: "diesel-dekarbonizace-proc-zauhliCuje-vice",
    title: "Proč diesel zauhličuje více než benzín — a jak s tím bojovat",
    metaTitle: "Diesel a zauhličení motoru: proč diesel zauhličuje více | CisteniVodikem.cz",
    metaDescription: "Dieselové motory se zauhličují rychleji a intenzivněji než benzíny. Zjistěte proč — a jak vodíková dekarbonizace pomáhá dieselům s EGR, DPF a turbem.",
    excerpt: "Každý servisní technik vám potvrdí: diesel se zauhličuje rychleji než benzín. Proč? A co s tím dělat bez drahých oprav?",
    date: "2026-03-08",
    readTime: 6,
    category: "Technologie",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Dieselový automobil — zauhličení a emise motoru",
    keywords: ["dekarbonizace diesel", "diesel motor saze", "diesel EGR", "DPF diesel", "zauhličení dieselový motor"],
    body: `
<p>Každý, kdo servisuje dieselové motory, vám potvrdí: diesel se zauhličuje rychleji a intenzivněji než benzínový motor. Proč? A jak s tím bojovat bez drahých oprav?</p>

<h2>Proč diesel produkuje více sazí?</h2>
<p>Nafta je těžší uhlovodík než benzín — má vyšší obsah uhlíku na litr. Diesel navíc spaluje bohatší směs (více paliva na jednotku vzduchu), což přirozeně produkuje více pevných částic.</p>
<p>Druhý důvod: přímé vstřikování paliva pod vysokým tlakem vytváří velmi heterogenní směs — v části válce je palivo extrémně bohaté, jinde chybí. V místech s přebytkem paliva spalování nikdy neprobíhá ideálně a vznikají saze.</p>

<h2>EGR ventil: recirkulace výfukových plynů</h2>
<p>EGR (Exhaust Gas Recirculation) recirkuluje část výfukových plynů zpět do sání — snižuje teplotu hoření a tím emise oxidů dusíku (NOx). Problém: recirkulovaný plyn obsahuje saze, které se pak usazují v sacím potrubí, na ventilech a v EGR ventilu samotném.</p>
<p>Zanesený EGR ventil pak buď neuzavírá správně (recirkuluje příliš mnoho), nebo se zasekne v uzavřené poloze. Obojí vede k problémům se spalováním a vyšším emisím — i k odmítnutí na STK.</p>

<h2>DPF filtr — přirozený nepřítel krátkých tras</h2>
<p>Diesel s DPF filtrem potřebuje pravidelně regenerovat — vypalovat nahromaděné saze. K tomu je potřeba teplota nad 550–600 °C. Tu auto dosáhne jen při delší jízdě po dálnici nebo silnici.</p>
<p>Pokud diesel jezdí výhradně na krátké trasy ve městě, regenerace neprobíhá a filtr se postupně ucpává. U mnoha zákazníků je ucpaný DPF přímý důsledek toho, že auto „nikdy nejede dál než do práce".</p>
<p>Více o DPF filtru v článku <a href="/blog/dpf-filtr-co-to-je-jak-chranit">DPF filtr: co to je a jak ho chránit</a>.</p>

<h2>Vodíková dekarbonizace pro diesel: proč je klíčová</h2>
<p>U dieselů doporučujeme dekarbonizaci každých <strong>15 000 km</strong> — kratší interval než u benzínů. HHO směs efektivně čistí EGR okruh, sací ventily, vstřikovače i DPF filtr. Zákazníci po ošetření reportují snížení kouřivosti, klidnější chod motoru a výrazně nižší spotřebu.</p>
<p>Kombinace pravidelné dekarbonizace a občasné dálniční jízdy pro přirozenou regeneraci DPF je nejlepší recept na dlouhý a zdravý život dieselového motoru. <a href="/#contact">Objednejte se</a> — diagnostika je vždy zdarma.</p>
    `,
  },
  {
    slug: "dekarbonizace-vs-oprava-motoru-naklady",
    title: "Dekarbonizace nebo oprava motoru? Srovnání nákladů",
    metaTitle: "Cena dekarbonizace vs. oprava motoru: srovnání nákladů | CisteniVodikem.cz",
    metaDescription: "Kolik stojí vodíková dekarbonizace vs. výměna vstřikovačů, DPF filtru nebo turba? Porovnání nákladů ukazuje jasnou odpověď — prevence se vyplácí.",
    excerpt: "Otázka, kterou slýcháme nejčastěji: vyplatí se to? Odpověď je jednoznačná — a čísla mluví za vše.",
    date: "2026-03-01",
    readTime: 5,
    category: "Ekonomika",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Kalkulačka a výpočet nákladů na servis motoru",
    keywords: ["cena dekarbonizace", "kolik stojí dekarbonizace", "náklady servis motoru", "oprava vs prevence motor"],
    body: `
<p>Otázka, kterou slýcháme od zákazníků nejčastěji: „Vyplatí se to?" Odpověď je jednoznačná — a čísla mluví za vše.</p>

<h2>Průměrné náklady na opravu zanesených komponent</h2>
<p>Pokud motor přestane dostávat správnou péči, uhlíkové nánosy postupně způsobí poruchy, které jsou výrazně dražší než preventivní čistění:</p>
<ul>
  <li><strong>Výměna vstřikovačů:</strong> 8 000–25 000 Kč (1 ks), celý set může přijít na 40 000–100 000 Kč</li>
  <li><strong>Výměna DPF filtru:</strong> 15 000–50 000 Kč včetně práce</li>
  <li><strong>Výměna turbodmychadla:</strong> 20 000–80 000 Kč</li>
  <li><strong>Čistění nebo výměna EGR ventilu:</strong> 3 000–12 000 Kč</li>
  <li><strong>Čistění sacích ventilů demontáží:</strong> 5 000–15 000 Kč u přímovstřikovacích motorů</li>
</ul>

<h2>Kolik stojí vodíková dekarbonizace?</h2>
<p>U nás platíte za kompletní ošetření včetně vstupní diagnostiky:</p>
<ul>
  <li>Benzín / LPG / CNG do 1,9 l — <strong>2 390 Kč</strong></li>
  <li>Benzín / LPG / CNG nad 2,0 l — <strong>2 890 Kč</strong></li>
  <li>Diesel do 1,9 l — <strong>2 690 Kč</strong></li>
  <li>Diesel nad 2,0 l — <strong>3 190 Kč</strong></li>
</ul>
<p>A k tomu <strong>diagnostika zdarma</strong> (hodnota 300 Kč) a odjezd s měřitelným výsledkem.</p>

<h2>Úspory po dekarbonizaci</h2>
<p>Zákazníci průměrně hlásí snížení spotřeby o 0,4–0,8 l/100 km. Při ceně nafty nebo benzínu 40 Kč/l a ročním nájezdu 15 000 km to znamená úsporu <strong>2 400–4 800 Kč ročně</strong>.</p>
<p>Prodloužená životnost vstřikovačů, turbodmychadla a DPF filtru přináší další úspory v řádu desítek tisíc korun — jen tím, že se porouchaná komponenta prostě neporouche.</p>

<h2>Návratnost investice</h2>
<p>Při úspoře 3 500 Kč ročně na palivu se dekarbonizace za 2 390–3 190 Kč vrátí přibližně za <strong>8–11 měsíců</strong>. A to nezahrnujeme ušetřenou opravu.</p>
<p>Chcete spočítat konkrétní čísla pro vaše auto? <a href="/#contact">Zavolejte nám</a> — diagnostika je zdarma a rádi poradíme bez závazků.</p>
    `,
  },
  {
    slug: "lpg-cng-auta-dekarbonizace",
    title: "LPG a CNG auta: proč také potřebují pravidelnou dekarbonizaci",
    metaTitle: "LPG a CNG auta: potřebují dekarbonizaci? | CisteniVodikem.cz",
    metaDescription: "LPG a CNG spalují čistěji — ale to neznamená, že motor nepotřebuje čistit. Zjistěte specifika LPG bi-fuel motorů a proč vodíková dekarbonizace pomáhá.",
    excerpt: "Majitelé LPG a CNG vozů si někdy myslí, že dekarbonizaci nepotřebují. Pravda je trochu složitější — a záleží na tom, jaký motor pod kapotou máte.",
    date: "2026-02-22",
    readTime: 5,
    category: "Péče o motor",
    image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Interiér automobilu na LPG nebo CNG — palubní deska",
    keywords: ["LPG dekarbonizace", "CNG motor čistění", "LPG auto servis", "bi-fuel motor problémy", "LPG sací ventily"],
    body: `
<p>Majitelé vozů na alternativní paliva — LPG nebo CNG — se nás občas ptají, zda jejich auto dekarbonizaci vůbec potřebuje. LPG a CNG přece „spalují čistěji", ne? Pravda je trochu složitější.</p>

<h2>Proč LPG a CNG „nespalují samy o sobě"</h2>
<p>LPG (zkapalněný propan-butan) a CNG (stlačený zemní plyn) skutečně produkují při spalování méně pevných částic než benzín nebo nafta. To je jejich velká výhoda z emisního hlediska.</p>
<p>Jenže — v České republice jezdí naprostá většina vozů na LPG jako bi-fuel. To znamená, že startují na benzín, přepnou se na plyn až po zahřátí a při nízkých teplotách nebo nedostatku plynu jedou zase na benzín. A benzínová část zanáší sací ventily, vstřikovače a spalovací prostory stejně jako čistě benzínový motor.</p>

<h2>Specifická slabina LPG motorů: sací ventily</h2>
<p>LPG bi-fuel systémy vstřikují plyn zpravidla před sacím ventilem (port injection). Moderní benzínové přímovstřikovací motory (GDI, TFSI, TSI) přidávají palivo přímo do válce — a sací ventily tak nejsou „oplachované" palivem, které by jinak odstraňovalo drobné nánosy.</p>
<p>Výsledkem je, že sací ventily u moderních přímovstřikovacích bi-fuel motorů se zauhličují rychleji než u starších nepřímovstřikovacích. Vodíková dekarbonizace je pro tyto motory mimořádně účinná — čistí sací ventily bez demontáže, přesně tam, kde je to potřeba.</p>

<h2>CNG a vodíkové čistění — ideální kombinace?</h2>
<p>CNG motory spalují čistěji, ale ani zde není zauhličení nulové — zejména v EGR okruhu a na sacích ventilech. Vodíková dekarbonizace funguje s CNG motory bez omezení a výsledky jsou srovnatelné s benzínovými motory.</p>

<h2>Doporučené intervaly pro LPG a CNG</h2>
<ul>
  <li><strong>LPG bi-fuel s přímým vstřikováním (GDI/TSI/TFSI):</strong> každých 15 000 km</li>
  <li><strong>LPG bi-fuel s nepřímým vstřikováním:</strong> každých 20 000–25 000 km</li>
  <li><strong>CNG monofuel nebo bi-fuel:</strong> každých 20 000–30 000 km</li>
</ul>
<p>Máte otázky ohledně vašeho konkrétního vozu? <a href="/#contact">Napište nebo zavolejte</a> — poradíme zdarma. A pokud chcete vidět, co dekarbonizace přinesla jiným zákazníkům, přečtěte si <a href="/blog/realne-pribehy-zakazniku-dekarbonizace">3 reálné příběhy zákazníků</a>.</p>
    `,
  },
  {
    slug: "realne-pribehy-zakazniku-dekarbonizace",
    title: "3 reálné příběhy zákazníků: co vodíková dekarbonizace dokázala",
    metaTitle: "Zkušenosti zákazníků s vodíkovou dekarbonizací | CisteniVodikem.cz",
    metaDescription: "Tři reálné příběhy zákazníků — Touareg 3.0 TDI před STK, Octavia TDI se zvýšenou spotřebou, firemní flotila Transit. Co vodíková dekarbonizace skutečně dokázala.",
    excerpt: "Čísla a grafy jsou jedno — nejlepší důkaz je reálný příběh zákazníka, který přijel se stejným problémem jako vy. Tady jsou tři z nich.",
    date: "2026-02-15",
    readTime: 6,
    category: "Příběhy zákazníků",
    image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Spokojený zákazník po vodíkové dekarbonizaci",
    keywords: ["zkušenosti s dekarbonizací", "výsledky vodíkové dekarbonizace", "recenze dekarbonizace", "vodíkové čistění výsledky"],
    body: `
<p>Čísla a grafy jsou jedno — ale nejlepší důkaz je reálný příběh zákazníka, který přijel se stejným problémem jako vy. Tady jsou tři z nich.</p>

<h2>Pavel: VW Touareg 3.0 TDI — „Před STK o vlásek"</h2>
<p>Pavel přijel tři týdny před STK. Jeho Touareg 3.0 TDI s nájezdem 180 000 km jezdil normálně, ale Pavel věděl, že kouřivost bude na hraně — kontrolka DPF se mu rozsvítila třikrát za poslední rok.</p>
<p>Změřili jsme kouřivost před ošetřením: 2,4 m⁻¹. Limit pro STK je 1,5 m⁻¹. Po 80minutové dekarbonizaci: <strong>0,8 m⁻¹</strong>. Pavel odjel s úlevou a STK prošel bez poznámky.</p>
<p>„Čekal jsem výměnu DPF za 40 000 Kč, místo toho jsem zaplatil 3 190 Kč. To se počítá," napsal nám po STK. Přečtěte si více o tom, <a href="/blog/jak-projit-stk-snizit-emise">jak se připravit na STK</a>.</p>

<h2>Markéta: Škoda Octavia 1.6 TDI — „Spotřeba nešla dolů"</h2>
<p>Markéta jezdí každý den 30 km do práce a zpět — krátké trasy ve městě. Spotřeba se za poslední rok zvedla z 5,8 l/100 km na 7,2 l/100 km, motor občas zaváhal při přidání plynu. Autorizovaný servis nenašel žádnou závadu.</p>
<p>Diagnóza: klasický případ zanesení z krátkých tras. DPF filtr se nestíhal přirozeně regenerovat, EGR okruh byl plný sazí. Po dekarbonizaci trvající 55 minut spotřeba klesla na <strong>5,9 l/100 km</strong> — téměř na původní hodnoty.</p>
<p>„Konečně se mi vrátilo auto, které jsem koupila. A ušetřím asi 400 Kč měsíčně na palivu," napsala Markéta.</p>

<h2>Tomáš: Firemní flotila — „5 Transitů najednou"</h2>
<p>Tomáš provozuje firmu s pěti firemními dodávkami Ford Transit 2.0 EcoBlue. Každé auto najede ročně kolem 50 000 km. DPF filtry měnil průměrně po 200 000 km — vždy za 20 000–30 000 Kč kus.</p>
<p>Zavedl pravidelnou dekarbonizaci každých 25 000 km — jednou za půl roku pro každé auto. Cena ošetření: 3 190 Kč/kus. Za rok pro celou flotilu: 31 900 Kč.</p>
<p>Výsledek po dvou letech: žádný DPF filtr nevyměněn. Průměrná spotřeba klesla o 0,5 l/100 km. Úspora na palivu za celou flotilu: přes <strong>60 000 Kč ročně</strong>. „Nejlepší rozhodnutí ohledně flotily za posledních pět let."</p>

<h2>Co mají tyto příběhy společného</h2>
<p>Ve všech třech případech šlo o preventivní nebo záchranné čistění, které stálo zlomek toho, co by přišla oprava nebo výměna komponent. Výsledky nejsou výjimka — jsou standard.</p>
<p>Chcete přidat svůj příběh? <a href="/#contact">Objednejte se</a> — diagnostika je zdarma a termín máme zpravidla do týdne.</p>
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}
