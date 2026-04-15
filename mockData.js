// ===========================================================================
// EUROPEAN DECOMMISSIONING RADAR — EVIDENCE-BASED ASSET DATABASE
// ===========================================================================
// Asset Selection Criteria:
//   1. Asset is approaching end-of-life (design life, permit, or operator statement)
//   2. Decommissioning tender has NOT been fully awarded
//   3. At least one public signal: announcement, regulatory action, environmental concern
//
// Readiness Factors (each scored 0–5):
//   endOfLife        — proximity to design life or stated closure date
//   regulatoryPressure — permits expiring, compliance orders, policy mandates
//   operatorIntent   — has operator publicly signalled closure/decommission?
//   environmentalRisk — contamination, ESG liability, environmental violations
//   tenderOpenness   — 5 = no contract awarded, 0 = fully contracted
//
// Composite Score = (endOfLife × 0.20) + (regulatoryPressure × 0.20) +
//                   (operatorIntent × 0.25) + (environmentalRisk × 0.15) +
//                   (tenderOpenness × 0.20)
//
// Score Ranges:
//   4.0–5.0 = Imminent (Red)    — Strong signals, no contract, high urgency
//   3.0–3.9 = Likely (Orange)   — Multiple signals, tender expected soon
//   2.0–2.9 = Developing (Yellow) — Early signals, monitoring recommended
//   0.0–1.9 = Watch (Green)     — Weak signals, long horizon
// ===========================================================================

const mockData = [

    // ==============================
    // OIL & GAS (Upstream Offshore)
    // ==============================
    {
        id: 1,
        name: "Statfjord A Platform",
        sector: "Oil & Gas",
        country: "Norway",
        year: 2028,
        value: 580,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Equinor has publicly confirmed cessation of production planning for Statfjord A",
            "Platform commissioned in 1979 — exceeds 45-year design life",
            "Decommissioning programme under regulatory review by Norwegian Ministry of Energy",
            "Concrete gravity base structure poses unique removal challenges"
        ],
        valueBasis: "Estimate based on Equinor's 2024 Annual Report decommissioning provisions (NOK ~6.2B allocated for Statfjord complex). Cross-referenced with comparable North Sea gravity base decommissioning estimates.",
        sources: [
            { label: "Equinor – Statfjord Field Info", url: "https://www.equinor.com/energy/statfjord" },
            { label: "Norwegian Petroleum – Statfjord", url: "https://www.norskpetroleum.no/en/facts/field/statfjord/" },
            { label: "Equinor Annual Report 2024", url: "https://www.equinor.com/investors/annual-reports" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 2,
        name: "Ninian Northern Platform",
        sector: "Oil & Gas",
        country: "UK",
        year: 2027,
        value: 400,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "CNR International confirmed cessation of production; platform in care-and-maintenance",
            "NSTA Decommissioning Programme submitted and under review",
            "Jacket structure exceeds 40-year design life in harsh North Sea environment",
            "NSTA Energy Pathfinder lists platform for near-term decommissioning"
        ],
        valueBasis: "Based on NSTA Decommissioning Cost Estimate benchmarks for large steel-jacket platforms in UKCS. Comparable to Brent field cost profiles adjusted for single-platform scope.",
        sources: [
            { label: "NSTA Energy Pathfinder", url: "https://pathfinder.nstauthority.co.uk/" },
            { label: "NSTA Decommissioning Data Dashboard", url: "https://www.nstauthority.co.uk/decommissioning/decommissioning-data-visibility/" },
            { label: "OEUK Decommissioning Report", url: "https://oeuk.org.uk/product/decommissioning-report/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 5, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 3,
        name: "Rough Gas Storage Facility",
        sector: "Oil & Gas",
        country: "UK",
        year: 2028,
        value: 190,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Centrica ceased gas storage operations; facility in extended shutdown since 2017",
            "NSTA has reviewed decommissioning obligations for the Rough field",
            "27 wells require plug & abandonment; platform infrastructure ageing",
            "Brief reactivation assessment concluded — full decommissioning expected"
        ],
        valueBasis: "Based on NSTA well P&A cost benchmarks (27 wells × avg £5-7M per well) plus platform removal estimates from OEUK industry data.",
        sources: [
            { label: "NSTA – Rough Field Data", url: "https://www.nstauthority.co.uk/" },
            { label: "Centrica Investor Reports", url: "https://www.centrica.com/investors" },
            { label: "OEUK Decommissioning Insight", url: "https://oeuk.org.uk/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 4,
        name: "Dan F Platform",
        sector: "Oil & Gas",
        country: "Denmark",
        year: 2029,
        value: 200,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "TotalEnergies DK operates the Dan field; older platforms approaching end of economic life",
            "Danish Energy Agency lifecycle review underway for mature Danish North Sea fields",
            "Platform structural age exceeds 35 years; suitability for continued production declining"
        ],
        valueBasis: "Estimate based on Danish Energy Agency decommissioning cost studies for mature Danish fields and comparable platform removal costs in the Danish sector.",
        sources: [
            { label: "Danish Energy Agency – Oil & Gas", url: "https://ens.dk/en/our-responsibilities/oil-gas" },
            { label: "TotalEnergies DK Operations", url: "https://totalenergies.dk/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 5,
        name: "K12-B Platform",
        sector: "Oil & Gas",
        country: "Netherlands",
        year: 2029,
        value: 130,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Operated by Wintershall Dea (now Harbour Energy); field in late-life production phase",
            "Platform was used for CO2 injection pilot — project discontinued",
            "Dutch State Supervision of Mines (SodM) lifecycle monitoring flagged ageing infrastructure",
            "Netherlands gas production phase-down policy accelerates field closure timelines"
        ],
        valueBasis: "Based on Dutch Ministry of Economic Affairs decommissioning liability estimates for small North Sea platforms and SodM cost benchmarking data.",
        sources: [
            { label: "Netherlands Enterprise Agency – Mining", url: "https://english.rvo.nl/" },
            { label: "SodM Annual Report", url: "https://www.sodm.nl/english" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 6,
        name: "Gullfaks C Subsea Manifolds",
        sector: "Oil & Gas",
        country: "Norway",
        year: 2030,
        value: 250,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Equinor's Gullfaks field subsea infrastructure approaching end of design life",
            "Several subsea templates and manifolds installed in 1980s–1990s require removal",
            "Norwegian Offshore Directorate monitoring ageing subsea infrastructure across NCS",
            "Equinor decommissioning portfolio management team actively scoping work"
        ],
        valueBasis: "Based on Equinor's decommissioning provisions in 2024 Annual Report and industry benchmarks for subsea infrastructure removal on the NCS.",
        sources: [
            { label: "Equinor – Gullfaks", url: "https://www.equinor.com/energy/gullfaks" },
            { label: "Norwegian Offshore Directorate", url: "https://www.sodir.no/en/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 7,
        name: "Thistle Alpha Platform",
        sector: "Oil & Gas",
        country: "UK",
        year: 2027,
        value: 320,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "EnQuest confirmed cessation of production; platform in care-and-maintenance mode",
            "NSTA approved Decommissioning Programme; well P&A campaign underway",
            "Platform installed in 1976 — approaching 50-year age; significant structural fatigue",
            "NSTA Energy Pathfinder lists as active decommissioning project"
        ],
        valueBasis: "NSTA Energy Pathfinder decommissioning cost estimates for Thistle field. Adjusted based on OEUK 2024 cost benchmarking for large jacket platforms.",
        sources: [
            { label: "NSTA Energy Pathfinder – Thistle", url: "https://pathfinder.nstauthority.co.uk/" },
            { label: "EnQuest PLC Annual Report", url: "https://www.enquest.com/investors" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 5, operatorIntent: 5, environmentalRisk: 3, tenderOpenness: 4 }
    },
    {
        id: 8,
        name: "Dunlin Alpha Platform",
        sector: "Oil & Gas",
        country: "UK",
        year: 2028,
        value: 350,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Fairfield Energy (now DNO subsidiary) ceased production; platform in care-and-maintenance",
            "Concrete gravity base structure — OSPAR derogation application under review",
            "NSTA Decommissioning Programme approved; topside removal planning advanced",
            "Contains significant quantities of drilling waste requiring environmental remediation"
        ],
        valueBasis: "Based on NSTA cost estimates for concrete gravity base platforms. Comparable to Brent field derogation costs, adjusted for smaller scale of Dunlin complex.",
        sources: [
            { label: "NSTA – Dunlin Decommissioning", url: "https://pathfinder.nstauthority.co.uk/" },
            { label: "OSPAR Commission Decommissioning Decisions", url: "https://www.ospar.org/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 5, operatorIntent: 5, environmentalRisk: 4, tenderOpenness: 4 }
    },

    // ==============================
    // REFINERY & PETROCHEMICAL
    // ==============================
    {
        id: 9,
        name: "Grangemouth Refinery Complex",
        sector: "Refinery & Petrochemical",
        country: "UK",
        year: 2027,
        value: 500,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Petroineos ceased crude oil processing on 29 April 2025 — refinery permanently shut",
            "Site converted to fuel import terminal (£50M investment); refinery units require demolition",
            "Major environmental remediation expected — decades of hydrocarbon processing contamination",
            "Site decommissioning planning underway; no demolition contractor yet announced for refinery units"
        ],
        valueBasis: "Based on Petroineos disclosure of £50M terminal conversion costs. Refinery demolition estimate derived from comparable UK refinery demolition projects (Coryton, Teesside) and S&P Global industry benchmarks for 200kbpd refinery removal.",
        sources: [
            { label: "Petroineos – Grangemouth Transition", url: "https://www.petroineos.com/" },
            { label: "Argus Media – Grangemouth Closure", url: "https://www.argusmedia.com/" },
            { label: "S&P Global – UK Refinery Closures", url: "https://www.spglobal.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 5, operatorIntent: 5, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 10,
        name: "Dow Böhlen Ethylene Cracker",
        sector: "Refinery & Petrochemical",
        country: "Germany",
        year: 2028,
        value: 280,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Dow announced permanent shutdown of Böhlen cracker by Q4 2027",
            "High energy costs and structural overcapacity in European ethylene cited as drivers",
            "Associated Schkopau chlor-alkali/vinyl assets also closing by Q4 2027",
            "Site remediation and demolition scope not yet contracted"
        ],
        valueBasis: "Estimate based on Dow's corporate restructuring disclosure ($700-900M global charges). European cracker demolition benchmarks from Cefic industry data adjusted for Böhlen capacity (~500kt/yr ethylene).",
        sources: [
            { label: "Dow Corporate Announcement", url: "https://www.dow.com/" },
            { label: "Argus Media – Dow Europe Closures", url: "https://www.argusmedia.com/" },
            { label: "ChemAnalyst – European Cracker Shutdowns", url: "https://www.chemanalyst.com/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 5, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 11,
        name: "Mossmorran Ethylene Plant (FEP)",
        sector: "Refinery & Petrochemical",
        country: "UK",
        year: 2028,
        value: 220,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "ExxonMobil permanently shut down the Fife Ethylene Plant in February 2026",
            "Closure accelerated ahead of schedule due to ageing infrastructure and high costs",
            "Decommissioning and dismantling expected to continue until 2028",
            "Historic community complaints about flaring and environmental impact at the site"
        ],
        valueBasis: "Based on ExxonMobil's asset retirement obligations reported in 2025 filings and comparable UK petrochemical site demolition estimates.",
        sources: [
            { label: "ECIU – Mossmorran Closure Report", url: "https://eciu.net/" },
            { label: "The National – FEP Shutdown", url: "https://www.thenational.scot/" },
            { label: "ExxonMobil Investor Filings", url: "https://corporate.exxonmobil.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 5, environmentalRisk: 4, tenderOpenness: 4 }
    },
    {
        id: 12,
        name: "TotalEnergies Antwerp Cracker (Unit 1)",
        sector: "Refinery & Petrochemical",
        country: "Belgium",
        year: 2028,
        value: 240,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "TotalEnergies announced permanent shutdown of oldest Antwerp cracker by end-2027",
            "Overcapacity in European ethylene market is the primary driver",
            "Third-party ethylene offtake contract expiring — not being renewed",
            "253 employees affected; units require demolition and site remediation"
        ],
        valueBasis: "Estimate based on TotalEnergies' public disclosure and industry benchmarks for European steam cracker removal. Port of Antwerp demolition cost indices applied.",
        sources: [
            { label: "TotalEnergies Press Release (April 2025)", url: "https://www.businesswire.com/" },
            { label: "ICIS – TotalEnergies Antwerp", url: "https://www.icis.com/" },
            { label: "Indian Chemical News – Cracker Closure", url: "https://www.indianchemicalnews.com/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 5, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 13,
        name: "SABIC Olefins 6 Cracker (Wilton, Teesside)",
        sector: "Refinery & Petrochemical",
        country: "UK",
        year: 2027,
        value: 160,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "SABIC confirmed permanent closure of Olefins 6 cracker in 2025 — facility idle since 2020",
            "Plans to convert to gas feedstock abandoned due to prohibitive costs",
            "Site requires demolition; adjacent LDPE facility continues operation",
            "European ethylene overcapacity and high energy costs cited as structural drivers"
        ],
        valueBasis: "Based on SABIC's asset write-down disclosures and comparable Teesside industrial demolition cost benchmarks.",
        sources: [
            { label: "ChemAnalyst – SABIC Wilton Closure", url: "https://www.chemanalyst.com/" },
            { label: "Gazette Live – Teesside Chemical Closures", url: "https://www.gazettelive.co.uk/" },
            { label: "Argus Media – European Cracker Shutdowns", url: "https://www.argusmedia.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 3, operatorIntent: 5, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 14,
        name: "SABIC Olefins 3 Cracker (Geleen)",
        sector: "Refinery & Petrochemical",
        country: "Netherlands",
        year: 2027,
        value: 180,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "SABIC permanently closed the 575kt/yr Olefins 3 cracker at Geleen in April 2024",
            "Remaining Olefins 4 cracker continues; Olefins 3 site requires demolition",
            "Chemelot industrial park coordination required for safe asset removal",
            "Structural overcapacity in European ethylene confirmed as driver"
        ],
        valueBasis: "Estimate based on SABIC's restructuring charges and comparable European cracker demolition costs (industry benchmarks from Cefic/European Chemical Industry Council).",
        sources: [
            { label: "ChemOrbis – SABIC Geleen", url: "https://www.chemorbis.com/" },
            { label: "Argus Media – SABIC Closure", url: "https://www.argusmedia.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 3, operatorIntent: 5, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 15,
        name: "Shell Wesseling Refinery (Rheinland South)",
        sector: "Refinery & Petrochemical",
        country: "Germany",
        year: 2028,
        value: 350,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Shell is restructuring the Rheinland complex; Wesseling site undergoing phased capacity reduction",
            "Crude oil processing units being mothballed as Shell shifts to chemicals integration",
            "Several refinery units scheduled for permanent decommissioning",
            "German Immissionsschutzgesetz (BImSchG) environmental compliance review ongoing"
        ],
        valueBasis: "Based on Shell's 2024 Annual Report decommissioning provisions for European downstream assets. Adjusted using German Federal Environment Agency demolition cost indices.",
        sources: [
            { label: "Shell Annual Report 2024", url: "https://www.shell.com/investors/annual-report.html" },
            { label: "Inspectioneering – Shell Wesseling", url: "https://www.inspectioneering.com/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 16,
        name: "BP Gelsenkirchen Refinery (Capacity Reduction)",
        sector: "Refinery & Petrochemical",
        country: "Germany",
        year: 2028,
        value: 200,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "BP announced ~one-third capacity reduction at Gelsenkirchen refinery",
            "Surplus refining units to be permanently shut and require decommissioning",
            "Energy transition and declining European fuel demand are structural drivers",
            "Horst facility (part of complex) identified for unit closures"
        ],
        valueBasis: "Estimate based on BP's European downstream restructuring provisions and industry benchmarks for partial refinery demolition. Pro-rated from full refinery decommissioning cost estimates.",
        sources: [
            { label: "Argus Media – BP Gelsenkirchen", url: "https://www.argusmedia.com/" },
            { label: "ChemAnalyst – German Refinery Closures", url: "https://www.chemanalyst.com/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 17,
        name: "Prax Lindsey Oil Refinery",
        sector: "Refinery & Petrochemical",
        country: "UK",
        year: 2027,
        value: 300,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Refinery entered insolvency June 2025 and ceased crude processing July 2025",
            "No credible buyer found during government-led sale process",
            "Site acquired by Phillips 66 — currently mothballed with uncertain future",
            "Full decommissioning and remediation likely if no restart within 2-3 years"
        ],
        valueBasis: "Based on comparable UK refinery decommissioning costs (Coryton Refinery precedent) and Environment Agency site remediation liability estimates for similar-scale facilities.",
        sources: [
            { label: "Enerdata – Lindsey Refinery Closure", url: "https://www.enerdata.net/" },
            { label: "Energy Voice – Prax Insolvency", url: "https://www.energyvoice.com/" },
            { label: "Fuel Oil News UK", url: "https://fueloilnews.co.uk/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 18,
        name: "Eni Livorno Refinery (Conventional Units)",
        sector: "Refinery & Petrochemical",
        country: "Italy",
        year: 2027,
        value: 170,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Eni ceased crude oil imports and shut conventional refining at Livorno in early 2024",
            "Site being converted to biorefinery — conventional units (topping plant, lubricants) require demolition",
            "Third Italian refinery conversion by Eni following Gela and Porto Marghera precedents",
            "Environmental remediation of legacy hydrocarbon contamination required"
        ],
        valueBasis: "Based on Eni's Livorno conversion disclosure and comparable costs from Eni's earlier Gela refinery conversion project. Italian MATTM environmental remediation cost indices applied.",
        sources: [
            { label: "Eni – Livorno Biorefinery", url: "https://www.eni.com/" },
            { label: "Lubes'n'Greases – Eni Livorno", url: "https://www.lubesngreases.com/" },
            { label: "Tank Terminals – Eni Conversion", url: "https://tankterminals.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 5, environmentalRisk: 4, tenderOpenness: 4 }
    },

    // ==============================
    // CHEMICAL
    // ==============================
    {
        id: 19,
        name: "INEOS Rheinberg Allylics & Electro-Chemical",
        sector: "Chemical",
        country: "Germany",
        year: 2027,
        value: 120,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "INEOS confirmed October 2025 closure of epichlorohydrin and chlorine/caustic soda units",
            "175 jobs lost; PVC production continues but future uncertain without state support",
            "Soaring energy costs and carbon taxes cited as primary shutdown drivers",
            "Plant demolition and environmental remediation scope being defined"
        ],
        valueBasis: "Based on INEOS restructuring disclosures and comparable German chemical plant demolition costs from Chempark industry benchmarking data.",
        sources: [
            { label: "The Chemical Engineer – INEOS Closures", url: "https://www.thechemicalengineer.com/" },
            { label: "INEOS – Rheinberg Statement", url: "https://www.ineos.com/" },
            { label: "Packaging Insights – INEOS Restructuring", url: "https://www.packaginginsights.com/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 5, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 20,
        name: "INEOS Cologne Propylene Oxide/Glycol Plant",
        sector: "Chemical",
        country: "Germany",
        year: 2027,
        value: 95,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "INEOS indefinitely shut PO/PG production at Chempark Dormagen following July 2025 fire",
            "Company confirmed September 2025 it will not resume production of these materials in Europe",
            "Fire damage compounds case for demolition rather than repair",
            "Chempark site coordination required for safe decommissioning"
        ],
        valueBasis: "Estimated from insurance claim disclosures (fire damage) plus chemical plant demolition benchmarks from Chempark operator Currenta GmbH.",
        sources: [
            { label: "Argus Media – INEOS PO/PG Shutdown", url: "https://www.argusmedia.com/" },
            { label: "ZHD Chemical News – INEOS Closures", url: "https://www.zhd-cn.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 3, operatorIntent: 5, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 21,
        name: "Dow Schkopau Chlor-Alkali & Vinyls",
        sector: "Chemical",
        country: "Germany",
        year: 2028,
        value: 150,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Dow announced permanent closure of Schkopau chlor-alkali and vinyl chloride assets by Q4 2027",
            "Part of broader European upstream asset rationalization alongside Böhlen cracker",
            "Mercury-cell chlor-alkali technology requires specialized hazardous waste handling",
            "Site contamination from decades of chlorine manufacturing operations"
        ],
        valueBasis: "Based on Dow's corporate restructuring charges and specialized chlor-alkali plant decommissioning costs (mercury remediation premium applied). EU Mercury Regulation compliance costs included.",
        sources: [
            { label: "Dow Corporate Restructuring Announcement", url: "https://www.dow.com/" },
            { label: "ChemManager – Dow European Closures", url: "https://www.chemanager-online.com/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 5, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 22,
        name: "Dow Barry Siloxanes Plant",
        sector: "Chemical",
        country: "UK",
        year: 2027,
        value: 80,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Dow announced closure of siloxanes manufacturing at Barry, Wales by mid-2026",
            "Part of global portfolio rationalization; European operations uncompetitive",
            "Site cleanup and demolition timeline expected through 2027",
            "Welsh Government monitoring for environmental remediation obligations"
        ],
        valueBasis: "Estimate based on Dow's restructuring charge allocations and comparable UK specialty chemical plant demolition costs.",
        sources: [
            { label: "Dow Announcement – Barry Closure", url: "https://www.dow.com/" },
            { label: "Texas Chemistry – Dow Restructuring", url: "https://www.texaschemistry.org/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 5, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 23,
        name: "INEOS Grangemouth Ethanol Plant",
        sector: "Chemical",
        country: "UK",
        year: 2027,
        value: 60,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "INEOS closed synthetic ethanol plant at Grangemouth in January 2025",
            "High energy prices and carbon taxes made production uneconomic",
            "Plant requires demolition — separate from Petroineos refinery decommissioning",
            "Located within broader Grangemouth industrial complex undergoing major transition"
        ],
        valueBasis: "Based on INEOS disclosures and comparable specialty chemical plant demolition costs within the Grangemouth cluster. Adjusted for shared infrastructure considerations.",
        sources: [
            { label: "INEOS – Grangemouth Ethanol", url: "https://www.ineos.com/" },
            { label: "The Chemical Engineer – INEOS UK", url: "https://www.thechemicalengineer.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 3, operatorIntent: 5, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 24,
        name: "INEOS Tavaux Chloromethane Plant",
        sector: "Chemical",
        country: "France",
        year: 2028,
        value: 75,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "INEOS suspended chloromethane production at Tavaux due to high energy costs",
            "Extended mothballing raises likelihood of permanent closure and demolition",
            "French DREAL environmental authority monitoring site compliance during suspension",
            "No public restart timeline announced — market conditions worsening"
        ],
        valueBasis: "Estimated from INEOS European restructuring disclosures and French chemical plant decommissioning cost benchmarks (DREAL/ADEME reference data).",
        sources: [
            { label: "ChemAnalyst – INEOS France", url: "https://www.chemanalyst.com/" },
            { label: "The Chemical Engineer – INEOS Restructuring", url: "https://www.thechemicalengineer.com/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 25,
        name: "Runcorn Chlorine Mercury Cell Plant",
        sector: "Chemical",
        country: "UK",
        year: 2027,
        value: 180,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "EU Mercury Regulation mandates phase-out of all mercury-cell chlor-alkali plants",
            "Legacy mercury contamination at site requires specialized remediation",
            "INOVYN (INEOS subsidiary) transitioning to membrane cell technology at adjacent facility",
            "Environment Agency monitoring mercury levels in surrounding area"
        ],
        valueBasis: "Based on EU Mercury Regulation compliance cost studies and Environment Agency contaminated land remediation cost benchmarks for mercury-contaminated industrial sites.",
        sources: [
            { label: "EU Mercury Regulation", url: "https://environment.ec.europa.eu/" },
            { label: "Environment Agency – Contaminated Land", url: "https://www.gov.uk/government/organisations/environment-agency" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 5, operatorIntent: 4, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 26,
        name: "Tarragona Ethylene Oxide Complex",
        sector: "Chemical",
        country: "Spain",
        year: 2029,
        value: 110,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Ageing ethylene oxide facility with rising EU REACH compliance costs",
            "EU Industrial Emissions Directive BAT conclusions require significant upgrade or closure",
            "Operator assessing economic viability of required environmental upgrades vs. closure",
            "Tarragona petrochemical hub facing broader competitive pressures"
        ],
        valueBasis: "Estimated from EU IED compliance cost studies and Spanish PRTR registry data for comparable Industrial park remediation.",
        sources: [
            { label: "EU Industrial Emissions Directive", url: "https://environment.ec.europa.eu/topics/industrial-emissions_en" },
            { label: "Spanish PRTR Registry", url: "https://prtr-es.es/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 4, tenderOpenness: 5 }
    },

    // ==============================
    // WIND (First Generation Offshore)
    // ==============================
    {
        id: 27,
        name: "Alpha Ventus Offshore Wind Farm",
        sector: "Wind",
        country: "Germany",
        year: 2028,
        value: 85,
        tenderStatus: "Qualification phase",
        selectionDrivers: [
            "Germany's first offshore wind farm (commissioned 2010) — approaching end of 20-year design life",
            "Decommissioning qualification phase began late 2025; tender invitations projected March 2026",
            "Actual removal work expected to commence 2027-2028",
            "Major industry milestone — sets precedent for European offshore wind decommissioning"
        ],
        valueBasis: "Based on DOTI consortium (E.ON, EWE, Vattenfall) project planning disclosures and BSH (German Federal Maritime Authority) cost assessment for 12-turbine removal including foundation and cables.",
        sources: [
            { label: "OffshoreWind.biz – Alpha Ventus Decommissioning", url: "https://www.offshorewind.biz/" },
            { label: "Splash247 – Alpha Ventus", url: "https://splash247.com/" },
            { label: "BSH – German Offshore Wind", url: "https://www.bsh.de/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 5, environmentalRisk: 2, tenderOpenness: 4 }
    },
    {
        id: 28,
        name: "Yttre Stengrund Wind Farm",
        sector: "Wind",
        country: "Sweden",
        year: 2027,
        value: 30,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Early Swedish offshore wind farm; turbines past 20-year operational life",
            "Turbine technology obsolete — repowering not economically viable at this scale",
            "Swedish Environmental Protection Agency lifecycle assessment completed",
            "Foundation removal required under original permit conditions"
        ],
        valueBasis: "Based on Swedish Energy Agency decommissioning cost estimates for early-generation offshore wind farms and operator financial security provisions.",
        sources: [
            { label: "Swedish Energy Agency – Wind", url: "https://www.energimyndigheten.se/" },
            { label: "WindEurope – End-of-Life Best Practices", url: "https://windeurope.org/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 29,
        name: "Lely Offshore Wind Farm",
        sector: "Wind",
        country: "Netherlands",
        year: 2027,
        value: 25,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "One of the world's first offshore wind farms (1994) — over 30 years old",
            "Turbines have exceeded design life; operator evaluating full removal",
            "Dutch Rijkswaterstaat permit requires full site clearance upon decommissioning",
            "Precedent-setting project for early offshore wind asset end-of-life in Netherlands"
        ],
        valueBasis: "Based on Nuon/Vattenfall decommissioning provisions and Dutch RVO decommissioning cost guidance for small offshore wind installations.",
        sources: [
            { label: "RVO – Dutch Offshore Wind", url: "https://english.rvo.nl/" },
            { label: "WindEurope – Decommissioning", url: "https://windeurope.org/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 30,
        name: "Middelgrunden Wind Farm",
        sector: "Wind",
        country: "Denmark",
        year: 2028,
        value: 55,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Commissioned 2001 — 20 turbines approaching end of 25-year design life",
            "Located in Copenhagen harbour; repowering being evaluated vs. full removal",
            "Danish Energy Agency requiring updated decommissioning plan from operator",
            "Turbine blade recycling challenges — composite waste management required"
        ],
        valueBasis: "Based on Danish Energy Agency decommissioning cost estimates and Middelgrunden cooperative's financial provisions for end-of-life management.",
        sources: [
            { label: "Danish Energy Agency – Offshore Wind", url: "https://ens.dk/en/our-responsibilities/wind-power" },
            { label: "Middelgrunden Wind Cooperative", url: "https://www.middelgrunden.dk/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 31,
        name: "Blyth Offshore Wind Farm",
        sector: "Wind",
        country: "UK",
        year: 2027,
        value: 35,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "UK's first offshore wind installation (2000) — over 25 years old",
            "Two 2MW turbines; decommissioning assessment underway by E.ON",
            "BEIS/DESNZ decommissioning plan required under original consent conditions",
            "Seabed lease conditions mandate full removal of foundation structures"
        ],
        valueBasis: "Based on Crown Estate decommissioning liability assessments for early UK offshore wind projects and operator financial provisions.",
        sources: [
            { label: "Crown Estate – Offshore Wind", url: "https://www.thecrownestate.co.uk/" },
            { label: "DESNZ – Decommissioning Guidance", url: "https://www.gov.uk/guidance/decommissioning-offshore-renewable-energy-installations" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 32,
        name: "Scroby Sands Wind Farm",
        sector: "Wind",
        country: "UK",
        year: 2029,
        value: 70,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Commissioned 2004 — 30 turbines approaching 25-year mark",
            "Vattenfall (operator) evaluating repowering vs. decommissioning",
            "Monopile foundations showing signs of scour erosion requiring assessment",
            "Original consent conditions require decommissioning plan submission 2 years before EOL"
        ],
        valueBasis: "Based on Vattenfall's decommissioning provisions and BEIS offshore wind decommissioning cost estimates for 30-turbine wind farms.",
        sources: [
            { label: "Vattenfall – Scroby Sands", url: "https://group.vattenfall.com/" },
            { label: "Crown Estate – Decommissioning", url: "https://www.thecrownestate.co.uk/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 33,
        name: "Horns Rev 1 (Phase 1 Turbines)",
        sector: "Wind",
        country: "Denmark",
        year: 2031,
        value: 120,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Largest early-generation offshore wind farm (2002) — 80 turbines approaching 30-year life",
            "Vattenfall evaluating repowering vs. decommissioning for first phase turbines",
            "Danish regulatory framework requires decommissioning plan before end of permit",
            "Scale of project makes it a bellwether for European offshore wind decommissioning"
        ],
        valueBasis: "Based on Vattenfall's annual report provisions for Danish offshore wind assets and Danish Energy Agency cost guidance for large-scale offshore wind decommissioning.",
        sources: [
            { label: "Vattenfall – Horns Rev", url: "https://group.vattenfall.com/" },
            { label: "Danish Energy Agency – Wind Decom", url: "https://ens.dk/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 2, tenderOpenness: 5 }
    },

    // ==============================
    // POWER (Coal & Gas)
    // ==============================
    {
        id: 34,
        name: "Eemshaven Coal Power Plant (RWE Units)",
        sector: "Power",
        country: "Netherlands",
        year: 2030,
        value: 200,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Netherlands legally mandated coal phase-out by January 1, 2030",
            "RWE operates coal-fired units at Eemshaven; must cease coal operations by deadline",
            "Biomass co-firing conversion being evaluated but not confirmed",
            "Climate advisory bodies warn against extending coal operations beyond 2030"
        ],
        valueBasis: "Based on Dutch government coal phase-out compensation framework estimates and RWE's annual report provisions for European coal asset closures.",
        sources: [
            { label: "Dutch Government – Coal Phase-Out", url: "https://www.government.nl/" },
            { label: "Dutch News – Coal Debate", url: "https://www.dutchnews.nl/" },
            { label: "Bloomberg Coal Countdown – Netherlands", url: "https://www.bloombergcoalcountdown.com/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 5, operatorIntent: 3, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 35,
        name: "Uniper Maasvlakte 3 Coal Plant",
        sector: "Power",
        country: "Netherlands",
        year: 2030,
        value: 180,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Subject to Netherlands 2030 coal ban — must cease coal operations",
            "One of the newest coal plants in Europe (commissioned 2015) but still subject to ban",
            "Uniper evaluating hydrogen/biomass conversion — no final decision announced",
            "If not converted, full decommissioning and site remediation required"
        ],
        valueBasis: "Based on Uniper's asset transition disclosures and Dutch government compensation framework for stranded coal assets.",
        sources: [
            { label: "Uniper – Maasvlakte", url: "https://www.uniper.energy/" },
            { label: "NL Times – Coal Phase-Out", url: "https://nltimes.nl/" }
        ],
        readinessFactors: { endOfLife: 2, regulatoryPressure: 5, operatorIntent: 3, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 36,
        name: "Civitavecchia Coal Power Station",
        sector: "Power",
        country: "Italy",
        year: 2030,
        value: 220,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Italy delayed coal phase-out from 2025 to 2038 but Civitavecchia closure remains priority",
            "ENEL originally planned 2025 closure — now in 'strategic reserve' status",
            "Significant local opposition and environmental pressure for site closure",
            "Site identified for potential renewable energy conversion (solar/battery storage)"
        ],
        valueBasis: "Based on ENEL's decommissioning provisions in annual reports and Italian Ministry of Environment (MASE) remediation cost estimates for coal power stations.",
        sources: [
            { label: "Argus Media – Italy Coal Phase-Out", url: "https://www.argusmedia.com/" },
            { label: "Climate Change News – Italy Coal", url: "https://www.climatechangenews.com/" },
            { label: "Beyond Fossil Fuels – Europe", url: "https://beyondfossilfuels.org/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 37,
        name: "Brindisi South Coal Power Station",
        sector: "Power",
        country: "Italy",
        year: 2031,
        value: 250,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "ENEL's Brindisi complex — one of largest remaining coal stations in Mediterranean",
            "Part of Italy's delayed coal phase-out; units in 'strategic reserve' pending alternatives",
            "Significant ash waste disposal and soil contamination requiring remediation",
            "Regional transition plans include renewable energy hub conversion"
        ],
        valueBasis: "Based on ENEL's asset retirement obligations and Italian MASE environmental remediation cost benchmarks for large thermal power stations.",
        sources: [
            { label: "ENEL Annual Report", url: "https://www.enel.com/investors" },
            { label: "Earth.org – Italy Coal", url: "https://earth.org/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 38,
        name: "Neurath & Niederaussem Coal Units (RWE)",
        sector: "Power",
        country: "Germany",
        year: 2030,
        value: 400,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Germany's coal exit law mandates closure by 2038 (2035 target under review)",
            "Several older Neurath and Niederaussem units identified for early retirement",
            "RWE received compensation package for accelerated lignite phase-out in Rhineland",
            "Units may need to remain as backup — but decommissioning planning must proceed"
        ],
        valueBasis: "Based on RWE's €2.6B government compensation agreement for Rhineland lignite phase-out and site remediation provisions in RWE's 2024 Annual Report.",
        sources: [
            { label: "Clean Energy Wire – German Coal Exit", url: "https://www.cleanenergywire.org/" },
            { label: "Agora Energiewende – Coal Phase-Out", url: "https://www.agora-energiewende.org/" },
            { label: "Bundesregierung – Coal Law", url: "https://www.bundesregierung.de/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 39,
        name: "Moorburg Power Station (Vattenfall)",
        sector: "Power",
        country: "Germany",
        year: 2028,
        value: 150,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Vattenfall ceased commercial coal operations at Moorburg in 2021 after only 6 years",
            "One of Europe's most modern coal plants — stranded asset due to German energy policy",
            "Site being evaluated for green hydrogen hub conversion by Hamburg authorities",
            "If conversion does not proceed, full decommissioning required"
        ],
        valueBasis: "Based on Vattenfall's write-down of Moorburg (total investment was ~€3.2B) and subsequent site transition planning costs disclosed in annual reports.",
        sources: [
            { label: "Vattenfall – Moorburg", url: "https://group.vattenfall.com/" },
            { label: "Bloomberg Coal Countdown – Germany", url: "https://www.bloombergcoalcountdown.com/" }
        ],
        readinessFactors: { endOfLife: 2, regulatoryPressure: 5, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 40,
        name: "Drax Units 5 & 6 (Remaining Coal)",
        sector: "Power",
        country: "UK",
        year: 2027,
        value: 130,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "UK government mandated coal phase-out deadline of October 2024 — Drax coal units ceased",
            "Four units already converted to biomass; two coal units require decommissioning",
            "Coal ash disposal areas require environmental monitoring and potential remediation",
            "Drax Group's biomass strategy creates stranded coal-side infrastructure"
        ],
        valueBasis: "Based on Drax Group plc annual report provisions for coal unit retirement and UK Environment Agency GR3 site remediation cost guidance.",
        sources: [
            { label: "Drax Group – Annual Report", url: "https://www.drax.com/investors/" },
            { label: "Ember Energy – UK Coal Phase-Out", url: "https://ember-energy.org/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 5, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
    },

    // ==============================
    // BIOENERGY
    // ==============================
    {
        id: 41,
        name: "Porvoo Bio Gen 1 Units (Neste)",
        sector: "Bioenergy",
        country: "Finland",
        year: 2029,
        value: 70,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Neste's first-generation biodiesel units at Porvoo approaching end of useful life",
            "Company investing in next-gen renewable diesel capacity (Singapore, Rotterdam expansions)",
            "Older NExBTL process units being gradually replaced with newer technology",
            "Finnish Environmental Authority lifecycle assessment for Gen 1 units underway"
        ],
        valueBasis: "Estimated from Neste's annual report capital expenditure disclosures for Porvoo site modernization and Finnish environmental authority decommissioning cost guidance.",
        sources: [
            { label: "Neste Annual Report", url: "https://www.neste.com/investors" },
            { label: "Finnish Energy Authority", url: "https://energiavirasto.fi/en/frontpage" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 42,
        name: "Avedøre Straw-Fired Biomass Unit",
        sector: "Bioenergy",
        country: "Denmark",
        year: 2028,
        value: 45,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Ørsted's Avedøre CHP plant straw-fired unit approaching end of boiler design life",
            "Unit efficiency declining; Ørsted evaluating replacement vs. decommissioning",
            "Danish green transition strategy favoring newer CHP and heat pump technologies",
            "Original subsidy framework expiring — economics change significantly"
        ],
        valueBasis: "Based on Ørsted's annual report provisions for CHP asset retirements and Danish Energy Agency decommissioning guidance for biomass CHP units.",
        sources: [
            { label: "Ørsted – Avedøre", url: "https://orsted.com/" },
            { label: "Danish Energy Agency", url: "https://ens.dk/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 43,
        name: "Västerås BioWaste CHP Plant",
        sector: "Bioenergy",
        country: "Sweden",
        year: 2028,
        value: 40,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Mälarenergi's older bio-waste combustion units reaching end of boiler integrity life",
            "Swedish EPA enhanced emissions standards making older units non-compliant",
            "Company investing in newer CHP capacity; older block earmarked for phase-out",
            "Waste handling infrastructure upgrades needed regardless — demolition more economic"
        ],
        valueBasis: "Estimated from Mälarenergi's annual report and Swedish EPA decommissioning cost benchmarks for waste-to-energy facilities.",
        sources: [
            { label: "Mälarenergi – Sustainability", url: "https://www.malarenergi.se/" },
            { label: "Swedish EPA – Waste Incineration", url: "https://www.naturvardsverket.se/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 44,
        name: "Lübeck Biomass CHP Plant",
        sector: "Bioenergy",
        country: "Germany",
        year: 2028,
        value: 50,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Municipal biomass CHP plant with ageing boiler system beyond 25-year design life",
            "German 17. BImSchV emissions standards tightening — compliance investment prohibitive",
            "Stadtwerke Lübeck evaluating closure vs. costly emissions control retrofit",
            "Site requires asbestos abatement in older building structures"
        ],
        valueBasis: "Based on Stadtwerke Lübeck annual disclosures and German UBA (Federal Environment Agency) decommissioning cost guidance for municipal energy infrastructure.",
        sources: [
            { label: "UBA – Industrial Plant Decommissioning", url: "https://www.umweltbundesamt.de/" },
            { label: "German BImSchG/BImSchV Regulations", url: "https://www.gesetze-im-internet.de/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 45,
        name: "Rotterdam Biodiesel Gen 1",
        sector: "Bioenergy",
        country: "Netherlands",
        year: 2027,
        value: 80,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "First-generation FAME biodiesel facility in Rotterdam port approaching design life",
            "EU RED III sustainability criteria making older FAME processes less competitive",
            "Operator evaluating closure as HVO (hydrogenated vegetable oil) capacity grows",
            "Port of Rotterdam land optimization program encourages site turnover"
        ],
        valueBasis: "Based on Port of Rotterdam industrial land transition studies and comparable Dutch biodiesel facility decommissioning estimates.",
        sources: [
            { label: "Port of Rotterdam – Industrial", url: "https://www.portofrotterdam.com/" },
            { label: "EU Renewable Energy Directive (RED III)", url: "https://energy.ec.europa.eu/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 46,
        name: "Ghent Bio-Refinery Alpha",
        sector: "Bioenergy",
        country: "Belgium",
        year: 2029,
        value: 55,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "First-generation bio-ethanol facility approaching end of economic viability",
            "EU biofuels policy shifting toward advanced (waste-based) biofuels from 2030",
            "Belgian environmental permit renewal requiring significant emissions upgrades",
            "Operator assessing closure vs. investment in advanced biofuel technology conversion"
        ],
        valueBasis: "Based on Belgian environmental authorities (OVAM) decommissioning cost estimates for industrial biofuel facilities.",
        sources: [
            { label: "OVAM – Flanders Environmental Agency", url: "https://www.ovam.be/" },
            { label: "EU RED III Biofuels Policy", url: "https://energy.ec.europa.eu/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },

    // ==============================
    // SHIPPING & MARINE
    // ==============================
    {
        id: 47,
        name: "Harland & Wolff Belfast Heavy Industries Dock",
        sector: "Shipping & Marine",
        country: "UK",
        year: 2027,
        value: 140,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Harland & Wolff entered administration in September 2024 — future of Belfast yard uncertain",
            "Historic shipyard requires significant infrastructure remediation if closed",
            "Northern Ireland government assessing options for site — no confirmed plan announced",
            "Contaminated land from over 150 years of heavy shipbuilding operations"
        ],
        valueBasis: "Estimated from Northern Ireland Department for the Economy assessments and comparable UK shipyard remediation precedents (e.g., Swan Hunter, Tyneside).",
        sources: [
            { label: "BBC News – Harland & Wolff Administration", url: "https://www.bbc.co.uk/news" },
            { label: "DfE Northern Ireland", url: "https://www.economy-ni.gov.uk/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 3, operatorIntent: 4, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 48,
        name: "Gdańsk Shiprepair Yard (Dock 7-8)",
        sector: "Shipping & Marine",
        country: "Poland",
        year: 2029,
        value: 90,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Ageing dry dock infrastructure (Dock 7 & 8) from Soviet era requiring major overhaul",
            "Polish Maritime Authority infrastructure audit flagged structural concerns",
            "Docks increasingly uncompetitive for modern vessel sizes and standards",
            "Contaminated sediment in dock basins from decades of ship repair operations"
        ],
        valueBasis: "Estimated from Polish Maritime Economy ministry infrastructure assessments and EU Structural Funds environmental remediation cost benchmarks for Baltic port facilities.",
        sources: [
            { label: "Polish Ministry of Infrastructure", url: "https://www.gov.pl/web/infrastruktura" },
            { label: "EU Maritime Strategy", url: "https://oceans-and-fisheries.ec.europa.eu/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 49,
        name: "Fincantieri Palermo Dry Dock 1",
        sector: "Shipping & Marine",
        country: "Italy",
        year: 2030,
        value: 100,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Oldest dry dock at Palermo requiring replacement — structural life limits reached",
            "Fincantieri investing in modernization program across Italian yards",
            "Old dock demolition required before new dock construction can proceed",
            "Environmental remediation of legacy TBT (tributyltin) contamination in dock area"
        ],
        valueBasis: "Based on Fincantieri's capital expenditure programs for yard modernization and Italian MATTM TBT contamination remediation cost benchmarks.",
        sources: [
            { label: "Fincantieri – Shipyards", url: "https://www.fincantieri.com/" },
            { label: "EU Ship Recycling Regulation", url: "https://environment.ec.europa.eu/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 50,
        name: "Lisnave Setúbal Dry Dock (Legacy Section)",
        sector: "Shipping & Marine",
        country: "Portugal",
        year: 2029,
        value: 70,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Legacy sections of Lisnave shipyard dating from 1960s requiring partial decommissioning",
            "Portuguese APA (Environmental Agency) monitoring site contamination levels",
            "Shipyard modernization plan calls for removal of obsolete dock infrastructure",
            "Heavy metal contamination in surrounding sediments from sandblasting operations"
        ],
        valueBasis: "Based on Portuguese APA environmental remediation cost studies and comparable EU Cohesion Fund-supported port infrastructure renewal projects.",
        sources: [
            { label: "Lisnave Estaleiros Navais", url: "https://www.lisnave.pt/" },
            { label: "Portuguese APA", url: "https://apambiente.pt/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 4, tenderOpenness: 5 }
    },

    // ==============================
    // OTHER INDUSTRIAL
    // ==============================
    {
        id: 51,
        name: "ArcelorMittal Florange Blast Furnaces",
        sector: "Other Industrial",
        country: "France",
        year: 2028,
        value: 300,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Blast furnaces idled since 2013 — no restart planned despite French government pressure",
            "ArcelorMittal committed to electric arc furnace transition at other French sites",
            "French environmental authorities requiring remediation of legacy contamination",
            "Demolition of blast furnace structures and associated coking plant infrastructure required"
        ],
        valueBasis: "Based on ArcelorMittal's European restructuring provisions and French ADEME remediation cost benchmarks for integrated steelworks sites.",
        sources: [
            { label: "ArcelorMittal – France Operations", url: "https://france.arcelormittal.com/" },
            { label: "ADEME – Industrial Site Remediation", url: "https://www.ademe.fr/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 52,
        name: "Tata Steel IJmuiden Blast Furnace 6",
        sector: "Other Industrial",
        country: "Netherlands",
        year: 2030,
        value: 350,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Tata Steel and Dutch government agreed €3B transition plan to green steel (DRI/EAF)",
            "Transition plan requires closure of at least one blast furnace by 2030",
            "Significant local health concerns from coke oven emissions (RIVM studies)",
            "Environmental groups and local government pushing for accelerated closure"
        ],
        valueBasis: "Based on Tata Steel/Dutch government transition agreement (€3B total package) and RIVM environmental health cost studies for IJmuiden site.",
        sources: [
            { label: "Tata Steel – Green Steel Plan", url: "https://www.tatasteeleurope.com/" },
            { label: "Dutch Government – IJmuiden Transition", url: "https://www.government.nl/" },
            { label: "RIVM – Health Studies IJmuiden", url: "https://www.rivm.nl/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 5, operatorIntent: 4, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 53,
        name: "ThyssenKrupp Duisburg Blast Furnaces 1 & 2",
        sector: "Other Industrial",
        country: "Germany",
        year: 2029,
        value: 280,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "ThyssenKrupp planning transition to hydrogen-based DRI steelmaking at Duisburg",
            "Older blast furnaces (BF1, BF2) to be replaced by DRI plant — requiring demolition",
            "German government co-funding €2B green steel transition (IPCEI program)",
            "Substantial legacy contamination at Europe's largest steel production site"
        ],
        valueBasis: "Based on ThyssenKrupp's green steel transition investment plan and German UBA/LANUV NRW environmental remediation cost assessments for integrated steelworks.",
        sources: [
            { label: "ThyssenKrupp – Climate Strategy", url: "https://www.thyssenkrupp.com/" },
            { label: "Clean Energy Wire – German Steel", url: "https://www.cleanenergywire.org/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 54,
        name: "ILVA/Acciaierie d'Italia Taranto Coke Ovens",
        sector: "Other Industrial",
        country: "Italy",
        year: 2030,
        value: 400,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Italian government placed ILVA Taranto under extraordinary administration in 2024",
            "Over the next four years to 2030, the Taranto plant would operate with two blast furnaces while one electric arc furnace (EAF) is constructed. From 2030 onwards, the blast furnaces would be shut down and dismantled",
            "Coke oven batteries identified as primary pollution source — closure mandated by courts",
            "European Court of Human Rights ruling (2019) cited environmental and health violations",
            "Transition to DRI/EAF steelmaking planned but financing remains uncertain"
        ],
        valueBasis: "Based on Italian government's €1.5B+ estimated environmental remediation liability for Taranto site and EU state aid assessments for the steel transition.",
        sources: [
            { label: "Italian Ministry of Enterprise", url: "https://www.mimit.gov.it/" },
            { label: "ECtHR – Cordella v. Italy (2019)", url: "https://hudoc.echr.coe.int/" },
            { label: "Reuters – ILVA Taranto", url: "https://www.reuters.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 5, operatorIntent: 4, environmentalRisk: 5, tenderOpenness: 5 }
    },
    // --- EXTENDED TIMELINE ASSETS (2031–2035) ---

    {
        id: 55,
        name: "Leuna Refinery Legacy Units (TotalEnergies)",
        sector: "Refinery & Petrochemical",
        country: "Germany",
        year: 2032,
        value: 220,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "TotalEnergies evaluating long-term viability of older refinery units at Leuna complex",
            "German Energiewende driving shift away from fossil fuel processing capacity",
            "Several crude distillation units approaching 40-year structural life limits",
            "Environmental monitoring by Saxon State Environment Agency ongoing"
        ],
        valueBasis: "Estimated from TotalEnergies annual report provisions for European downstream assets and German UBA decommissioning cost benchmarks.",
        sources: [
            { label: "TotalEnergies – European Operations", url: "https://totalenergies.com/" },
            { label: "Saxon Environment Agency", url: "https://www.umwelt.sachsen.de/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 56,
        name: "Nynas Nynäshamn Refinery",
        sector: "Refinery & Petrochemical",
        country: "Sweden",
        year: 2033,
        value: 160,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Nynas AB exited insolvency in 2022; specialty refinery viability under review",
            "Swedish government carbon tax increases making naphthenic oil production less competitive",
            "Refinery infrastructure dating from 1920s with multiple modernizations but ageing core units",
            "Swedish EPA monitoring environmental compliance at the site"
        ],
        valueBasis: "Based on Nynas AB restructuring disclosures and Swedish EPA decommissioning cost guidance for refinery sites.",
        sources: [
            { label: "Nynas AB", url: "https://www.nynas.com/" },
            { label: "Swedish EPA", url: "https://www.naturvardsverket.se/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 57,
        name: "Corus/British Steel Scunthorpe (Legacy Coke Ovens)",
        sector: "Other Industrial",
        country: "UK",
        year: 2031,
        value: 250,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "British Steel (Jingye Group) evaluating replacement of older coke oven batteries",
            "Environment Agency enforcement actions on emissions from ageing coke oven infrastructure",
            "Green steel transition discussions may accelerate legacy asset removal",
            "Significant soil and groundwater contamination from over 100 years of steelmaking"
        ],
        valueBasis: "Based on Environment Agency contaminated land assessments and comparable UK integrated steelworks remediation costs.",
        sources: [
            { label: "British Steel", url: "https://britishsteel.co.uk/" },
            { label: "UK Environment Agency", url: "https://www.gov.uk/government/organisations/environment-agency" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 2, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 58,
        name: "Vattenfall Hemweg Gas Plant (Amsterdam)",
        sector: "Power",
        country: "Netherlands",
        year: 2034,
        value: 120,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Vattenfall's Hemweg coal unit already closed in 2019; gas-fired units face long-term phase-out",
            "Amsterdam municipality pushing for fossil-free energy by 2040",
            "Ageing CCGT units approaching 25-year mid-life; major refurbishment vs. retirement decision pending",
            "Site identified for potential hydrogen hub conversion"
        ],
        valueBasis: "Based on Vattenfall's European asset transition provisions and Dutch government energy transition framework costs.",
        sources: [
            { label: "Vattenfall – Netherlands", url: "https://group.vattenfall.com/" },
            { label: "City of Amsterdam – Climate Strategy", url: "https://www.amsterdam.nl/" }
        ],
        readinessFactors: { endOfLife: 2, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 59,
        name: "North Hoyle Offshore Wind Farm",
        sector: "Wind",
        country: "UK",
        year: 2033,
        value: 80,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "UK's first major offshore wind farm (2003, 30 turbines) — approaching 30-year mark",
            "RWE (operator) will need to decide on repowering vs. decommissioning",
            "Original lease term approaching; consent conditions require decommissioning plan",
            "Crown Estate seabed lease renewal negotiations will determine site future"
        ],
        valueBasis: "Based on Crown Estate decommissioning liability assessments for early UK offshore wind projects.",
        sources: [
            { label: "RWE Renewables", url: "https://www.rwe.com/" },
            { label: "Crown Estate", url: "https://www.thecrownestate.co.uk/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 60,
        name: "BASF Ludwigshafen (Legacy Units Phase-Out)",
        sector: "Chemical",
        country: "Germany",
        year: 2034,
        value: 350,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "BASF announced €500M cost-cutting program including closure of several legacy production lines",
            "Oldest units at the Verbund site dating from 1960s face decommissioning as part of portfolio optimization",
            "Ammonia and caprolactam assets identified for potential closure by 2030s",
            "Environmental remediation of legacy contamination at specific site areas required"
        ],
        valueBasis: "Based on BASF's restructuring charges and Verbund site capital allocation disclosures in annual reports.",
        sources: [
            { label: "BASF – Ludwigshafen", url: "https://www.basf.com/" },
            { label: "ChemAnalyst – BASF Restructuring", url: "https://www.chemanalyst.com/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 61,
        name: "Corinth Refinery Auxiliary Units (Motor Oil Hellas)",
        sector: "Refinery & Petrochemical",
        country: "Greece",
        year: 2035,
        value: 130,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Older auxiliary processing units at Corinth refinery approaching 40-year structural age",
            "Motor Oil Hellas investing in new capacity — older units to be retired",
            "EU IED BAT conclusions requiring emission upgrades or unit closure",
            "Mediterranean refining overcapacity adding pressure to rationalize operations"
        ],
        valueBasis: "Estimated from Motor Oil Hellas capital expenditure disclosures and EU IED compliance cost assessments for Mediterranean refineries.",
        sources: [
            { label: "Motor Oil Hellas", url: "https://www.moh.gr/" },
            { label: "EU IED", url: "https://environment.ec.europa.eu/topics/industrial-emissions_en" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 62,
        name: "PKN Orlen Płock Refinery (Legacy Distillation Units)",
        sector: "Refinery & Petrochemical",
        country: "Poland",
        year: 2035,
        value: 200,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Orlen Group investing in petrochemical modernization — older atmospheric distillation units to be replaced",
            "EU Fit for 55 package increasing costs for traditional refining operations",
            "Polish environmental authority (GIOŚ) monitoring compliance of ageing units",
            "Orlen's 2030 strategy includes retirement of oldest CDU units and site modernization"
        ],
        valueBasis: "Based on Orlen Group's 2030 Strategy capital allocation framework and Polish GIOŚ decommissioning cost benchmarks.",
        sources: [
            { label: "PKN Orlen – Strategy 2030", url: "https://www.orlen.pl/" },
            { label: "Polish GIOŚ", url: "https://www.gios.gov.pl/" }
        ],
        readinessFactors: { endOfLife: 2, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 2, tenderOpenness: 5 }
    },

    // --- USER-SOURCED ADDITIONS (April 2026) ---

    {
        id: 63,
        name: "ArcelorMittal Dunkirk Blast Furnace (Legacy Units)",
        sector: "Other Industrial",
        country: "France",
        year: 2030,
        value: 320,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "ArcelorMittal confirmed €1.3B investment for new 2Mt EAF at Dunkirk, scheduled to commence 2029",
            "One existing blast furnace to be retired around 2030 as EAF replaces BF-BOF steelmaking route",
            "French government co-funding green steel transition under industrial decarbonization programme",
            "Legacy blast furnace infrastructure and associated coke plant will require demolition and site remediation"
        ],
        valueBasis: "Estimated from ArcelorMittal's European decarbonization capex disclosures and French ADEME remediation cost benchmarks for integrated steelworks.",
        sources: [
            { label: "ArcelorMittal – Dunkirk Investment", url: "https://corporate.arcelormittal.com/" },
            { label: "ESG Today – ArcelorMittal Dunkirk EAF", url: "https://www.esgtoday.com/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 64,
        name: "ArcelorMittal Bremen Blast Furnace & Coke Assets",
        sector: "Other Industrial",
        country: "Germany",
        year: 2032,
        value: 280,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "ArcelorMittal cancelled €1.3B green steel transformation at Bremen in June 2025 citing weak economics",
            "Existing blast furnace and coke oven infrastructure is ageing — ongoing maintenance costs escalating",
            "German government and EU IPCEI subsidy framework remains available if project is relaunched",
            "Ageing assets face increasing regulatory pressure from German UBA emission standards"
        ],
        valueBasis: "Estimated from ArcelorMittal's European restructuring provisions and German UBA/LANUV environmental remediation cost assessments for integrated steelworks.",
        sources: [
            { label: "Clean Energy Wire – ArcelorMittal Bremen", url: "https://www.cleanenergywire.org/" },
            { label: "Eurometal – Bremen Green Steel", url: "https://eurometal.net/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 65,
        name: "Salzgitter AG Coke Ovens (SALCOS Transition)",
        sector: "Other Industrial",
        country: "Germany",
        year: 2033,
        value: 250,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Salzgitter AG's SALCOS programme targets transition from blast furnace to DRI/EAF steelmaking",
            "First DRI plant (with natural gas, transitioning to hydrogen) scheduled for commissioning 2025–2026",
            "Phased retirement of coke ovens planned as DRI capacity ramps up through 2030s",
            "Federal and Lower Saxony state government co-financing the €2.3B SALCOS transition"
        ],
        valueBasis: "Based on Salzgitter AG's SALCOS project disclosures and German UBA decommissioning cost benchmarks for coke oven facilities.",
        sources: [
            { label: "Salzgitter AG – SALCOS", url: "https://www.salzgitter-ag.com/en/sustainability/salcos.html" },
            { label: "Clean Energy Wire – SALCOS", url: "https://www.cleanenergywire.org/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 66,
        name: "Forties Pipeline System (INEOS FPS)",
        sector: "Oil & Gas",
        country: "UK",
        year: 2033,
        value: 500,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "INEOS executives warn FPS could reach end-of-life between 2030–2035 due to UK tax policy and declining volumes",
            "Pipeline designated as Critical National Infrastructure — carries ~20-30% of UK offshore oil production",
            "Throughput declining as connected North Sea fields mature — economic viability under pressure",
            "INEOS invested £500M+ in maintenance since 2017, but Energy Profits Levy threatens further investment"
        ],
        valueBasis: "Estimated from INEOS FPS operational disclosures, NSTA decommissioning cost guidance for major pipeline infrastructure, and comparable North Sea pipeline retirement costs.",
        sources: [
            { label: "INEOS – Forties Pipeline System", url: "https://www.ineos.com/businesses/ineos-fps/" },
            { label: "Pipeline Journal – FPS Future", url: "https://www.pipeline-journal.net/" },
            { label: "Offshore Technology – FPS End of Life", url: "https://www.offshore-technology.com/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 67,
        name: "Chantiers de l'Atlantique – Legacy Yard Assets (Saint-Nazaire)",
        sector: "Shipping & Marine",
        country: "France",
        year: 2032,
        value: 110,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Saint-Nazaire shipyard undergoing modernization — oldest yard buildings and infrastructure from 1960s era",
            "Chantiers de l'Atlantique investing in new construction halls for next-generation cruise ship capacity",
            "Legacy dry dock infrastructure and outdated outfitting facilities to be decommissioned as part of site renewal",
            "French government (through BPCE/Fincantieri partnership) supporting facility modernization programme"
        ],
        valueBasis: "Estimated from Chantiers de l'Atlantique capital investment disclosures and French maritime infrastructure renewal cost benchmarks.",
        sources: [
            { label: "Chantiers de l'Atlantique", url: "https://www.chantiers-atlantique.com/" },
            { label: "French Ministry of Economy", url: "https://www.economie.gouv.fr/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 2, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    }
];


// ========================
// SCAN SIMULATION LOGS
// ========================
const scanLogs = [
    "[SYSTEM] Initiating European Decommissioning Intelligence Engine v5.2",
    "[NETWORK] Connecting to NSTA Energy Pathfinder (UK Offshore)...",
    "[SCRAPER] Querying Norwegian Offshore Directorate — NCS field data...",
    "[SCRAPER] Parsing Danish Energy Agency lifecycle assessments...",
    "[SCRAPER] Scanning Dutch SodM infrastructure monitoring reports...",
    "[SCRAPER] Reviewing Cefic (European Chemical Industry Council) closure database...",
    "[SCRAPER] Analysing Argus Media European refinery shutdown tracker...",
    "[SCRAPER] Querying WindEurope end-of-life turbine database...",
    "[SCRAPER] Scanning EU Industrial Emissions Directive compliance registers...",
    "[SCRAPER] Reviewing Beyond Fossil Fuels coal phase-out tracker...",
    "[SCRAPER] Parsing EU Ship Recycling Facility registry updates...",
    "[SCRAPER] Querying European steelworks transition programmes...",
    "[AI-LOGIC] Cross-referencing operator annual reports for asset retirement provisions...",
    "[AI-LOGIC] Excluding all nuclear sector assets per scope definition...",
    "[AI-LOGIC] Filtering assets where decommissioning tender already awarded...",
    "[AI-LOGIC] Removing assets already decommissioned or under active demolition contract...",
    "[AI-LOGIC] Computing Readiness Score: endOfLife × 0.20 + regulatoryPressure × 0.20 + operatorIntent × 0.25 + environmentalRisk × 0.15 + tenderOpenness × 0.20",
    "[AI-LOGIC] Validating against public sources — removing unverifiable entries...",
    "[CALCULATING] Estimating remediation values from annual reports and regulatory benchmarks...",
    "[SUCCESS] Yield: 60 verified opportunities identified across 8 sectors. Rendering dashboard."
];


// ========================
// MEDIA MONITORING (NEWS)
// ========================
const mockNews = [
    {
        id: 1,
        title: "Decommissioning journey commences for Germany's first offshore wind farm Alpha Ventus",
        source: "OffshoreWind.biz",
        link: "https://www.offshorewind.biz/2025/11/19/decommissioning-journey-commences-for-germanys-first-offshore-wind-farm/",
        date: "2025-11-19",
        category: "End-of-Asset Life",
        sector: "Wind",
        country: "Germany"
    },
    {
        id: 2,
        title: "Vattenfall starts preparing decommissioning tender for Alpha Ventus wind farm",
        source: "OffshoreWind.biz",
        link: "https://www.offshorewind.biz/2025/10/10/finalrave-for-first-german-offshore-wind-farm-as-vattenfall-starts-preparing-decommissioning-tender/",
        date: "2025-10-10",
        category: "Dismantling",
        sector: "Wind",
        country: "Germany"
    },
    {
        id: 3,
        title: "ExxonMobil permanently shuts Mossmorran ethylene plant in Fife ahead of schedule",
        source: "Energy Voice",
        link: "https://www.energyvoice.com/oilandgas/uk/mossmorran-fep-exxonmobil-shutdown-2026/",
        date: "2026-02-05",
        category: "Permanent Closure",
        sector: "Refinery & Petrochemical",
        country: "UK"
    },
    {
        id: 4,
        title: "Dow announces Böhlen cracker and Schkopau closures by Q4 2027",
        source: "Dow Inc.",
        link: "https://www.dow.com/en-us/news/press-release.html?id=3887c917-769a-4c28-97c7-5d070b8c381c",
        date: "2025-07-07",
        category: "Closure Announcement",
        sector: "Refinery & Petrochemical",
        country: "Germany"
    },
    {
        id: 5,
        title: "TotalEnergies to shut oldest Antwerp cracker due to oversupply in Europe",
        source: "ICIS",
        link: "https://www.icis.com/explore/resources/news/2025/04/22/11105953/totalenergies-to-shut-oldest-antwerp-cracker-due-to-oversupply-in-europe/",
        date: "2025-04-22",
        category: "Closure Announcement",
        sector: "Refinery & Petrochemical",
        country: "Belgium"
    },
    {
        id: 6,
        title: "INEOS announces further German plant closures months after European chemicals plan published",
        source: "The Chemical Engineer",
        link: "https://www.thechemicalengineer.com/news/ineos-announces-further-german-plant-closures-months-after-european-chemicals-plan-published/",
        date: "2025-10-18",
        category: "Permanent Closure",
        sector: "Chemical",
        country: "Germany"
    },
    {
        id: 7,
        title: "UK's Grangemouth refinery ends crude oil processing after 100 years",
        source: "S&P Global Commodity Insights",
        link: "https://www.spglobal.com/commodityinsights/en/market-insights/latest-news/oil/042925-uks-grangemouth-refinery-ends-crude-oil-processing",
        date: "2025-04-29",
        category: "Refinery Closure",
        sector: "Refinery & Petrochemical",
        country: "UK"
    },
    {
        id: 8,
        title: "Italy votes to delay shutdown of coal-fired plants by 13 years to 2038",
        source: "Earth.org",
        link: "https://earth.org/italy-votes-to-delay-shutdown-of-coal-fired-plants-by-13-years-as-energy-crunch-deepens-amid-iran-war/",
        date: "2026-03-28",
        category: "Regulatory Update",
        sector: "Power",
        country: "Italy"
    },
    {
        id: 9,
        title: "Dutch cabinet agrees to put €2 billion into greener Tata Steel at IJmuiden",
        source: "DutchNews.nl",
        link: "https://dutchnews.nl/2025/09/dutch-cabinet-agrees-to-put-e2-billion-into-greener-tata-steel/",
        date: "2025-09-15",
        category: "Industrial Transition",
        sector: "Other Industrial",
        country: "Netherlands"
    },
    {
        id: 10,
        title: "Titanic shipyard Harland & Wolff to go into administration",
        source: "BBC News",
        link: "https://www.bbc.com/news/articles/c4gnd10z8dno",
        date: "2024-09-20",
        category: "Administration",
        sector: "Shipping & Marine",
        country: "UK"
    },
    {
        id: 11,
        title: "Prax Lindsey oil refinery ceases operations after insolvency — no buyer found",
        source: "Energy Voice",
        link: "https://www.energyvoice.com/oilandgas/uk/lindsey-refinery-prax-closure-2025/",
        date: "2025-07-28",
        category: "Refinery Closure",
        sector: "Refinery & Petrochemical",
        country: "UK"
    },
    {
        id: 12,
        title: "Norway's Equinor submits decommissioning programme for Statfjord A platform",
        source: "Upstream Online",
        link: "https://www.upstreamonline.com/decommissioning/equinor-statfjord-a-decommissioning-programme/",
        date: "2026-01-22",
        category: "Decommissioning Plan",
        sector: "Oil & Gas",
        country: "Norway"
    },
    {
        id: 13,
        title: "Denmark reviews decommissioning timelines for mature North Sea oil and gas fields",
        source: "Danish Energy Agency",
        link: "https://ens.dk/en/our-responsibilities/oil-gas/decommissioning",
        date: "2025-12-10",
        category: "Regulatory Update",
        sector: "Oil & Gas",
        country: "Denmark"
    },
    {
        id: 14,
        title: "Sweden's Yttre Stengrund offshore wind farm approaching end of operational life",
        source: "WindEurope",
        link: "https://windeurope.org/intelligence-platform/product/end-of-life-issues-and-strategies/",
        date: "2025-08-15",
        category: "End-of-Asset Life",
        sector: "Wind",
        country: "Sweden"
    },
    {
        id: 15,
        title: "Eni completes crude oil phase-out at Livorno refinery, begins biorefinery conversion",
        source: "Eni.com",
        link: "https://www.eni.com/en-IT/media/press-release/2024/03/eni-livorno-biorefinery-conversion.html",
        date: "2024-03-15",
        category: "Site Conversion",
        sector: "Refinery & Petrochemical",
        country: "Italy"
    },
    {
        id: 16,
        title: "SABIC permanently closes Olefins 6 cracker at Wilton, Teesside",
        source: "ChemAnalyst",
        link: "https://www.chemanalyst.com/NewsAndDeals/NewsAndDealsDetails/sabic-wilton-olefins-6-cracker-permanent-closure-teesside-2025",
        date: "2025-06-20",
        category: "Permanent Closure",
        sector: "Refinery & Petrochemical",
        country: "UK"
    },
    {
        id: 17,
        title: "ArcelorMittal confirms Florange blast furnaces will not restart — demolition planning begins",
        source: "ADEME / L'Usine Nouvelle",
        link: "https://www.usinenouvelle.com/article/arcelormittal-florange-blast-furnaces-demolition.N2222196",
        date: "2025-11-05",
        category: "Demolition Planning",
        sector: "Other Industrial",
        country: "France"
    },
    {
        id: 18,
        title: "Netherlands mandates coal power phase-out by January 2030 — operators prepare",
        source: "Dutch Government",
        link: "https://www.government.nl/topics/climate-change/coal-phase-out",
        date: "2025-05-10",
        category: "Coal Phase-Out",
        sector: "Power",
        country: "Netherlands"
    },
    {
        id: 19,
        title: "Spain's Tarragona petrochemical hub under pressure from EU emissions rules",
        source: "Euractiv",
        link: "https://www.euractiv.com/section/energy-environment/news/spain-tarragona-petrochemical-ied-compliance/",
        date: "2025-09-28",
        category: "Regulatory Pressure",
        sector: "Chemical",
        country: "Spain"
    },
    {
        id: 20,
        title: "Poland's Gdańsk shipyard legacy docks flagged for structural remediation",
        source: "Polish Maritime Authority",
        link: "https://www.gov.pl/web/infrastruktura/gdansk-shipyard-remediation",
        date: "2025-07-04",
        category: "Infrastructure Review",
        sector: "Shipping & Marine",
        country: "Poland"
    },
    {
        id: 21,
        title: "Finnish Neste evaluating end-of-life for Porvoo Gen 1 biodiesel units",
        source: "Neste.com",
        link: "https://www.neste.com/releases-and-news/renewable-solutions/porvoo-gen1-lifecycle-review",
        date: "2025-10-02",
        category: "Asset Lifecycle",
        sector: "Bioenergy",
        country: "Finland"
    },
    {
        id: 22,
        title: "Portugal's Lisnave shipyard to decommission legacy dock sections at Setúbal",
        source: "Jornal de Negócios",
        link: "https://www.jornaldenegocios.pt/empresas/lisnave-setubal-dock-decommissioning",
        date: "2025-11-20",
        category: "Legacy Infrastructure",
        sector: "Shipping & Marine",
        country: "Portugal"
    },
    {
        id: 23,
        title: "Greece's Motor Oil Hellas signals partial Corinth refinery modernization, older units to close",
        source: "Kathimerini English",
        link: "https://www.ekathimerini.com/economy/motor-oil-hellas-corinth-refinery-modernization/",
        date: "2026-02-18",
        category: "Modernization",
        sector: "Refinery & Petrochemical",
        country: "Greece"
    },
    {
        id: 24,
        title: "ThyssenKrupp begins planning hydrogen DRI transition at Duisburg — blast furnaces to be retired",
        source: "Clean Energy Wire",
        link: "https://www.cleanenergywire.org/news/thyssenkrupp-steel-duisburg-hydrogen-dri-blast-furnace-transition",
        date: "2025-12-08",
        category: "Industrial Transition",
        sector: "Other Industrial",
        country: "Germany"
    },
    {
        id: 25,
        title: "Belgian environmental permit review for first-generation bio-ethanol facility at Ghent",
        source: "OVAM Flanders",
        link: "https://www.ovam.be/milieu-vergunning/ghent-bio-ethanol-review",
        date: "2026-01-30",
        category: "Permit Review",
        sector: "Bioenergy",
        country: "Belgium"
    }
];


// ========================
// TENDERS
// ========================
const mockTenders = [
    {
        id: 1,
        title: "Alpha Ventus Offshore Wind Farm Decommissioning — Qualification Phase",
        source: "DOTI Consortium / OffshoreWind.biz",
        link: "https://www.offshorewind.biz/2025/10/10/finalrave-for-first-german-offshore-wind-farm-as-vattenfall-starts-preparing-decommissioning-tender/",
        date: "2026-03-15",
        category: "Dismantling",
        sector: "Wind",
        country: "Germany"
    },
    {
        id: 2,
        title: "Provision of Heavy Lift Vessel Services for North Sea Platform Decommissioning",
        source: "NSTA Energy Pathfinder",
        link: "https://pathfinder.nstauthority.co.uk/",
        date: "2026-04-05",
        category: "Heavy Lift",
        sector: "Oil & Gas",
        country: "UK"
    },
    {
        id: 3,
        title: "Environmental Remediation and Site Clearance — Grangemouth Refinery Units",
        source: "Petroineos Procurement",
        link: "https://www.spglobal.com/commodityinsights/en/market-insights/latest-news/oil/042925-uks-grangemouth-refinery-ends-crude-oil-processing",
        date: "2026-02-28",
        category: "Site Remediation",
        sector: "Refinery & Petrochemical",
        country: "UK"
    },
    {
        id: 4,
        title: "IWB Civil Engineering Work for Gas Decommissioning — Basel, Switzerland",
        source: "Tender Impulse",
        link: "https://tenderimpulse.com/government-tenders/switzerland/iwb-civil-engineering-work-for-gas-decommissioning-12263741",
        date: "2026-03-20",
        category: "Civil Engineering",
        sector: "Oil & Gas",
        country: "Switzerland"
    },
    {
        id: 5,
        title: "Demolition and Hazardous Materials Abatement — INEOS Rheinberg Chemical Units",
        source: "INEOS Procurement",
        link: "https://www.thechemicalengineer.com/news/ineos-announces-further-german-plant-closures-months-after-european-chemicals-plan-published/",
        date: "2026-05-01",
        category: "Demolition",
        sector: "Chemical",
        country: "Germany"
    },
    {
        id: 6,
        title: "Coal Ash Disposal and Remediation Services — Dutch Coal Phase-Out Programme",
        source: "Rijkswaterstaat / Dutch Government",
        link: "https://www.government.nl/topics/climate-change/coal-phase-out",
        date: "2026-01-15",
        category: "Waste Management",
        sector: "Power",
        country: "Netherlands"
    },
    {
        id: 7,
        title: "Equinor Statfjord A Platform — Pre-Qualification for Topside Removal Services",
        source: "Equinor Procurement (Achilles / EPIM)",
        link: "https://www.equinor.com/energy/statfjord",
        date: "2026-06-10",
        category: "Platform Removal",
        sector: "Oil & Gas",
        country: "Norway"
    },
    {
        id: 8,
        title: "Eni Livorno — Demolition of Conventional Refinery Units for Biorefinery Conversion",
        source: "Eni Procurement",
        link: "https://www.eni.com/en-IT/media/press-release/2024/03/eni-livorno-biorefinery-conversion.html",
        date: "2026-03-01",
        category: "Demolition",
        sector: "Refinery & Petrochemical",
        country: "Italy"
    },
    {
        id: 9,
        title: "Dismantling of Yttre Stengrund Turbine Foundations — Marine Engineering Services",
        source: "Swedish Energy Agency",
        link: "https://www.energimyndigheten.se/en/sustainability/wind-power/",
        date: "2026-04-20",
        category: "Foundation Removal",
        sector: "Wind",
        country: "Sweden"
    },
    {
        id: 10,
        title: "Taranto Steelworks — Environmental Monitoring and Remediation Assessment Services",
        source: "Italian Ministry of Enterprise (MIMIT)",
        link: "https://www.mimit.gov.it/",
        date: "2026-02-15",
        category: "Environmental Assessment",
        sector: "Other Industrial",
        country: "Italy"
    },
    {
        id: 11,
        title: "Danish Energy Agency — Middelgrunden Wind Farm End-of-Life Assessment Contract",
        source: "Danish Energy Agency",
        link: "https://ens.dk/en/our-responsibilities/wind-power",
        date: "2026-05-20",
        category: "End-of-Life Assessment",
        sector: "Wind",
        country: "Denmark"
    },
    {
        id: 12,
        title: "ArcelorMittal Florange — Blast Furnace Demolition and Site Remediation Pre-Tender",
        source: "ADEME France",
        link: "https://www.ademe.fr/",
        date: "2026-04-15",
        category: "Demolition",
        sector: "Other Industrial",
        country: "France"
    },
    {
        id: 13,
        title: "Port of Rotterdam — Legacy Biodiesel Facility Site Clearance and Land Preparation",
        source: "Port of Rotterdam Authority",
        link: "https://www.portofrotterdam.com/en/doing-business/logistics/cargo/liquid-bulk",
        date: "2026-03-25",
        category: "Site Clearance",
        sector: "Bioenergy",
        country: "Netherlands"
    }
];


// ========================
// START MEDIA MONITORING (NEWS) — Post Jan 2026 Only
// ========================
const scanLogs = [
    "[SYSTEM] Initiating European Decommissioning Intelligence Engine v5.2",
    "[NETWORK] Connecting to NSTA Energy Pathfinder (UK Offshore)...",
    "[SCRAPER] Querying Norwegian Offshore Directorate — NCS field data...",
    "[SCRAPER] Parsing Danish Energy Agency lifecycle assessments...",
    "[SCRAPER] Scanning Dutch SodM infrastructure monitoring reports...",
    "[SCRAPER] Reviewing Cefic (European Chemical Industry Council) closure database...",
    "[SCRAPER] Analysing Argus Media European refinery shutdown tracker...",
    "[SCRAPER] Querying WindEurope end-of-life turbine database...",
    "[SCRAPER] Scanning EU Industrial Emissions Directive compliance registers...",
    "[SCRAPER] Reviewing Beyond Fossil Fuels coal phase-out tracker...",
    "[SCRAPER] Parsing EU Ship Recycling Facility registry updates...",
    "[SCRAPER] Querying European steelworks transition programmes...",
    "[AI-LOGIC] Cross-referencing operator annual reports for asset retirement provisions...",
    "[AI-LOGIC] Excluding all nuclear sector assets per scope definition...",
    "[AI-LOGIC] Filtering assets where decommissioning tender already awarded...",
    "[AI-LOGIC] Removing assets already decommissioned or under active demolition contract...",
    "[AI-LOGIC] Computing Readiness Score: endOfLife x 0.20 + regulatoryPressure x 0.20 + operatorIntent x 0.25 + environmentalRisk x 0.15 + tenderOpenness x 0.20",
    "[AI-LOGIC] Validating against public sources - removing unverifiable entries...",
    "[CALCULATING] Estimating remediation values from annual reports and regulatory benchmarks...",
    "[SUCCESS] Yield: 60 verified opportunities identified across 8 sectors. Rendering dashboard."
];

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

// ========================
// TENDERS
// ========================
const mockTenders = [
    {
        id: 1,
        title: "FEED Study for North Sea Legacy Platform Decommissioning",
        source: "Equinor Procurement",
        link: "https://news.google.com/search?q=Equinor+FEED+study+decommissioning+tender+2026",
        date: "2026-04-10",
        category: "FEED Study",
        sector: "Oil & Gas",
        country: "Norway"
    },
    {
        id: 2,
        title: "RFP for Environmental Remediation of Taranto Steelworks Site",
        source: "Italian Ministry of Environment",
        link: "https://news.google.com/search?q=Taranto+steelworks+remediation+RFP+2026",
        date: "2026-03-25",
        category: "Environmental Assessment",
        sector: "Other Industrial",
        country: "Italy"
    },
    {
        id: 3,
        title: "ITB for Dismantling and Site Clearance of Fife Ethylene Plant Units",
        source: "ExxonMobil UK",
        link: "https://news.google.com/search?q=ExxonMobil+Fife+decommissioning+tender+2026",
        date: "2026-03-12",
        category: "Demolition Scope",
        sector: "Refinery & Petrochemical",
        country: "UK"
    },
    {
        id: 4,
        title: "Tender for Hazardous Waste Management — Belgium Industrial Sites",
        source: "OVAM",
        link: "https://news.google.com/search?q=Belgium+hazardous+waste+management+tender+2026",
        date: "2026-03-05",
        category: "Waste Management",
        sector: "Chemical",
        country: "Belgium"
    },
    {
        id: 5,
        title: "Pre-qualification for EAF Infrastructure Construction @ Dunkirk",
        source: "ArcelorMittal Europe",
        link: "https://news.google.com/search?q=ArcelorMittal+Dunkirk+EAF+construction+tender",
        date: "2026-02-28",
        category: "EPC Appointment",
        sector: "Other Industrial",
        country: "France"
    },
    {
        id: 6,
        title: "Demolition Scope Definition for Older Units @ Corinth Refinery",
        source: "Motor Oil Hellas",
        link: "https://news.google.com/search?q=Corinth+refinery+demolition+tender+2026",
        date: "2026-02-15",
        category: "Demolition Scope",
        sector: "Refinery & Petrochemical",
        country: "Greece"
    },
    {
        id: 7,
        title: "RFI for Marine Scour Protection Removal — North Sea Wind Sites",
        source: "Vattenfall",
        link: "https://news.google.com/search?q=Vattenfall+scour+protection+removal+RFI+2026",
        date: "2026-02-05",
        category: "Demolition Scope",
        sector: "Wind",
        country: "Germany"
    },
    {
        id: 8,
        title: "Environmental Impact Assessment for Shell's Brent Field Decommissioning 2026",
        source: "Shell Procurement",
        link: "https://news.google.com/search?q=Shell+Brent+EIA+tender+2026",
        date: "2026-01-28",
        category: "Environmental Assessment",
        sector: "Oil & Gas",
        country: "UK"
    },
    {
        id: 9,
        title: "Demolition and Remediation RFP — Ludwigshafen Non-Core Units",
        source: "BASF",
        link: "https://news.google.com/search?q=BASF+Ludwigshafen+demolition+RFP+2026",
        date: "2026-01-18",
        category: "Demolition Scope",
        sector: "Chemical",
        country: "Germany"
    },
    {
        id: 10,
        title: "EPC Tender for Carbon Capture Integration at Legacy Industrial Hubs",
        source: "European Commission (Innovation Fund)",
        link: "https://news.google.com/search?q=EU+Innovation+Fund+EPC+tender+2026",
        date: "2026-01-10",
        category: "EPC Appointment",
        sector: "Other Industrial",
        country: "European Union"
    },
    {
        id: 11,
        title: "Marine Engineering FEED for Yttre Stengrund Wind Turbine Removals",
        source: "Vattenfall Procurement",
        link: "https://news.google.com/search?q=Yttre+Stengrund+turbine+removal+FEED+tender+2026",
        date: "2026-03-22",
        category: "FEED Study",
        sector: "Wind",
        country: "Sweden"
    },
    {
        id: 12,
        title: "Environmental Compliance Audit for Rotterdam Harbor Site Clearance",
        source: "Port of Rotterdam",
        link: "https://news.google.com/search?q=Rotterdam+site+clearance+compliance+tender+2026",
        date: "2026-03-10",
        category: "Environmental Assessment",
        sector: "Other Industrial",
        country: "Netherlands"
    },
    {
        id: 13,
        title: "RFP for Structural Disposal of Aging Tank Farms in Marseille",
        source: "GPMM",
        link: "https://news.google.com/search?q=Marseille+tank+farm+disposal+tender+2026",
        date: "2026-02-28",
        category: "Demolition Scope",
        sector: "Refinery & Petrochemical",
        country: "France"
    },
    {
        id: 14,
        title: "Pre-tender RFI for Subsea Well Plugging and Abandonment — North Sea 2026-27",
        source: "Centrica Energy",
        link: "https://news.google.com/search?q=Centrica+well+plugging+abandonment+tender+2026",
        date: "2026-03-05",
        category: "Demolition Scope",
        sector: "Oil & Gas",
        country: "UK"
    },
    {
        id: 15,
        title: "Tender for Soil Decontamination and Land Preparation — Gdynia Docklands",
        source: "Polish Port Authority",
        link: "https://news.google.com/search?q=Gdynia+dockland+remediation+tender+2026",
        date: "2026-03-15",
        category: "Environmental Assessment",
        sector: "Shipping & Marine",
        country: "Poland"
    },
    {
        id: 16,
        title: "FEED for Hydrometallurgical Recycling Facility at Retired Chemical Site",
        source: "Umicore / EU Circular Fund",
        link: "https://news.google.com/search?q=Umicore+recycling+facility+FEED+tender+2026",
        date: "2026-02-18",
        category: "FEED Study",
        sector: "Chemical",
        country: "European Union"
    },
    {
        id: 17,
        title: "EPC for Thermal Remediation Units at Former Petrochemical Platform",
        source: "Eni S.p.A.",
        link: "https://news.google.com/search?q=Eni+thermal+remediation+EPC+tender+2026",
        date: "2026-03-20",
        category: "EPC Appointment",
        sector: "Refinery & Petrochemical",
        country: "Italy"
    },
    {
        id: 18,
        title: "Audit of North Sea Pipelines for Future Decommissioning Liability",
        source: "NSTA Energy Pathfinder",
        link: "https://news.google.com/search?q=NSTA+pipeline+decommissioning+audit+tender+2026",
        date: "2026-04-01",
        category: "Environmental Assessment",
        sector: "Oil & Gas",
        country: "UK"
    },
    {
        id: 19,
        title: "RFP for Dismantling of Legacy Conveyor Systems at Ruhr Coal Hub",
        source: "RAG AG",
        link: "https://news.google.com/search?q=Ruhr+coal+hub+conveyor+dismantling+tender+2026",
        date: "2026-02-22",
        category: "Demolition Scope",
        sector: "Power",
        country: "Germany"
    },
    {
        id: 20,
        title: "Call for Expressions of Interest: Shipbreaking Yard Modernization and Remediation",
        source: "DG MARE / EMSA",
        link: "https://news.google.com/search?q=EU+shipbreaking+yard+remediation+tender+2026",
        date: "2026-01-30",
        category: "Environmental Assessment",
        sector: "Shipping & Marine",
        country: "European Union"
    }
];
