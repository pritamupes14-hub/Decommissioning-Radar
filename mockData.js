
const mockNews = [
    {
        id: 1,
        title: "Italy delays coal phase out by over a decade",
        source: "NBC",
        link: "https://www.nbcrightnow.com/national/italy-delays-coal-phase-out-by-over-a-decade/article_d0d98728-1d93-5881-a988-3700b9dbf012.html",
        date: "2026-04-01",
        category: "Regulatory Update",
        sector: "Power",
        country: "Italy"
    },
    {
        id: 2,
        title: "Germany’s industry makes unexpectedly weak start to 2026",
        source: "Reuters",
        link: "https://money.usnews.com/investing/news/articles/2026-03-09/german-industrial-orders-fall-more-than-expected-in-january",
        date: "2026-03-09",
        category: "Market Intelligence",
        sector: "Other Industrial",
        country: "Germany"
    },
    {
        id: 3,
        title: "EU Commission adopts EU Ports Strategy and Industrial Maritime Strategy",
        source: "European Commission (DG MOVE)",
        link: "https://transport.ec.europa.eu/transport-modes/maritime/eu-ports-and-industrial-maritime-strategies_en",
        date: "2026-03-04",
        category: "Strategy",
        sector: "Shipping & Marine",
        country: "European Union"
    },
    {
        id: 4,
        title: "ArcelorMittal invests €1.3bn in electric arc furnace at Dunkirk",
        source: "Euronews",
        link: "https://www.euronews.com/my-europe/2026/02/11/arcelormittal-invests-13-billion-to-produce-green-steel-at-its-dunkirk-plant",
        date: "2026-02-11",
        category: "Asset Transition",
        sector: "Other Industrial",
        country: "France"
    },
    {
        id: 5,
        title: "Europe's chemical industry moves into crisis mode",
        source: "ICIS",
        link: "https://www.icis.com/chemicals-and-the-economy/2026/02/europes-chemical-industry-moves-into-crisis-mode/",
        date: "2026-02-01",
        category: "Market Intelligence",
        sector: "Chemical",
        country: "European Union"
    },
    {
        id: 6,
        title: "ArcelorMittal files €1.8bn claim against Italy over troubled steel plants",
        source: "Reuters",
        link: "https://money.usnews.com/investing/news/articles/2026-01-29/arcelormittal-makes-2-billion-claim-against-italy-in-steel-plant-row",
        date: "2026-01-29",
        category: "Legal News",
        sector: "Other Industrial",
        country: "Italy"
    },
    {
        id: 7,
        title: "Chemical plant closures surge six fold in Europe since 2022, new report finds",
        source: "Cefic",
        link: "https://cefic.org/news/chemical-plant-closures-surge-six-fold-in-europe-since-2022-reaching-37mt-new-report-finds/",
        date: "2026-01-28",
        category: "Industry Report",
        sector: "Chemical",
        country: "European Union"
    },
    {
        id: 8,
        title: "Chemical plant closures surge in Europe as investment collapses",
        source: "Society of Chemical Industry (SCI)",
        link: "https://www.soci.org/news/2026/1/chemical-plant-closures-surge-in-europe-investment-drops",
        date: "2026-01-28",
        category: "Industry News",
        sector: "Chemical",
        country: "European Union"
    },
    {
        id: 9,
        title: "ExxonMobil to close Scotland ethylene plant in 2026 as Europe exit deepens",
        source: "Bloomin Global Media",
        link: "https://www.bloominglobal.com/media/detail/exxonmobil-to-close-scotland-ethylene-plant-in-2026-as-europe-exit-deepens",
        date: "2026-01-06",
        category: "Closure Announcement",
        sector: "Refinery & Petrochemical",
        country: "UK"
    }
];
const mockTenders = [     {         id: 1,         title: "FEED Study for North Sea Legacy Platform Decommissioning",         source: "Equinor Procurement",         link: "https://news.google.com/search?q=Equinor+FEED+study+decommissioning+tender+2026",         date: "2026-04-10",         category: "FEED Study",         sector: "Oil & Gas",         country: "Norway"     },     {         id: 2,         title: "RFP for Environmental Remediation of Taranto Steelworks Site",         source: "Italian Ministry of Environment",         link: "https://news.google.com/search?q=Taranto+steelworks+remediation+RFP+2026",         date: "2026-03-25",         category: "Environmental Assessment",         sector: "Other Industrial",         country: "Italy"     },     {         id: 3,         title: "ITB for Dismantling and Site Clearance of Fife Ethylene Plant Units",         source: "ExxonMobil UK",         link: "https://news.google.com/search?q=ExxonMobil+Fife+decommissioning+tender+2026",         date: "2026-03-12",         category: "Demolition Scope",         sector: "Refinery & Petrochemical",         country: "UK"     },     {         id: 4,         title: "Tender for Hazardous Waste Management — Belgium Industrial Sites",         source: "OVAM",         link: "https://news.google.com/search?q=Belgium+hazardous+waste+management+tender+2026",         date: "2026-03-05",         category: "Waste Management",         sector: "Chemical",         country: "Belgium"     },     {         id: 5,         title: "Pre-qualification for EAF Infrastructure Construction @ Dunkirk",         source: "ArcelorMittal Europe",         link: "https://news.google.com/search?q=ArcelorMittal+Dunkirk+EAF+construction+tender",         date: "2026-02-28",         category: "EPC Appointment",         sector: "Other Industrial",         country: "France"     },     {         id: 6,         title: "Demolition Scope Definition for Older Units @ Corinth Refinery",         source: "Motor Oil Hellas",         link: "https://news.google.com/search?q=Corinth+refinery+demolition+tender+2026",         date: "2026-02-15",         category: "Demolition Scope",         sector: "Refinery & Petrochemical",         country: "Greece"     },     {         id: 7,         title: "RFI for Marine Scour Protection Removal — North Sea Wind Sites",         source: "Vattenfall",         link: "https://news.google.com/search?q=Vattenfall+scour+protection+removal+RFI+2026",         date: "2026-02-05",         category: "Demolition Scope",         sector: "Wind",         country: "Germany"     },     {         id: 8,         title: "Environmental Impact Assessment for Shell's Brent Field Decommissioning 2026",         source: "Shell Procurement",         link: "https://news.google.com/search?q=Shell+Brent+EIA+tender+2026",         date: "2026-01-28",         category: "Environmental Assessment",         sector: "Oil & Gas",         country: "UK"     },     {         id: 9,         title: "Demolition and Remediation RFP — Ludwigshafen Non-Core Units",         source: "BASF",         link: "https://news.google.com/search?q=BASF+Ludwigshafen+demolition+RFP+2026",         date: "2026-01-18",         category: "Demolition Scope",         sector: "Chemical",         country: "Germany"     },     {         id: 10,         title: "EPC Tender for Carbon Capture Integration at Legacy Industrial Hubs",         source: "European Commission (Innovation Fund)",         link: "https://news.google.com/search?q=EU+Innovation+Fund+EPC+tender+2026",         date: "2026-01-10",         category: "EPC Appointment",         sector: "Other Industrial",         country: "European Union"     },     {         id: 11,         title: "Marine Engineering FEED for Yttre Stengrund Wind Turbine Removals",         source: "Vattenfall Procurement",         link: "https://news.google.com/search?q=Yttre+Stengrund+turbine+removal+FEED+tender+2026",         date: "2026-03-22",         category: "FEED Study",         sector: "Wind",         country: "Sweden"     },     {         id: 12,         title: "Environmental Compliance Audit for Rotterdam Harbor Site Clearance",         source: "Port of Rotterdam",         link: "https://news.google.com/search?q=Rotterdam+site+clearance+compliance+tender+2026",         date: "2026-03-10",         category: "Environmental Assessment",         sector: "Other Industrial",         country: "Netherlands"     },     {         id: 13,         title: "RFP for Structural Disposal of Aging Tank Farms in Marseille",         source: "GPMM",         link: "https://news.google.com/search?q=Marseille+tank+farm+disposal+tender+2026",         date: "2026-02-28",         category: "Demolition Scope",         sector: "Refinery & Petrochemical",         country: "France"     },     {         id: 14,         title: "Pre-tender RFI for Subsea Well Plugging and Abandonment — North Sea 2026-27",         source: "Centrica Energy",         link: "https://news.google.com/search?q=Centrica+well+plugging+abandonment+tender+2026",         date: "2026-03-05",         category: "Demolition Scope",         sector: "Oil & Gas",         country: "UK"     },     {         id: 15,         title: "Tender for Soil Decontamination and Land Preparation — Gdynia Docklands",         source: "Polish Port Authority",         link: "https://news.google.com/search?q=Gdynia+dockland+remediation+tender+2026",         date: "2026-03-15",         category: "Environmental Assessment",         sector: "Shipping & Marine",         country: "Poland"     },     {         id: 16,         title: "FEED for Hydrometallurgical Recycling Facility at Retired Chemical Site",         source: "Umicore / EU Circular Fund",         link: "https://news.google.com/search?q=Umicore+recycling+facility+FEED+tender+2026",         date: "2026-02-18",         category: "FEED Study",         sector: "Chemical",         country: "European Union"     },     {         id: 17,         title: "EPC for Thermal Remediation Units at Former Petrochemical Platform",         source: "Eni S.p.A.",         link: "https://news.google.com/search?q=Eni+thermal+remediation+EPC+tender+2026",         date: "2026-03-20",         category: "EPC Appointment",         sector: "Refinery & Petrochemical",         country: "Italy"     },     {         id: 18,         title: "Audit of North Sea Pipelines for Future Decommissioning Liability",         source: "NSTA Energy Pathfinder",         link: "https://news.google.com/search?q=NSTA+pipeline+decommissioning+audit+tender+2026",         date: "2026-04-01",         category: "Environmental Assessment",         sector: "Oil & Gas",         country: "UK"     },     {         id: 19,         title: "RFP for Dismantling of Legacy Conveyor Systems at Ruhr Coal Hub",         source: "RAG AG",         link: "https://news.google.com/search?q=Ruhr+coal+hub+conveyor+dismantling+tender+2026",         date: "2026-02-22",         category: "Demolition Scope",         sector: "Power",         country: "Germany"     },     {         id: 20,         title: "Call for Expressions of Interest: Shipbreaking Yard Modernization and Remediation",         source: "DG MARE / EMSA",         link: "https://news.google.com/search?q=EU+shipbreaking+yard+remediation+tender+2026",         date: "2026-01-30",         category: "Environmental Assessment",         sector: "Shipping & Marine",         country: "European Union"     } ];
