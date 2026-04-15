// ===========================================================================
// EUROPEAN DECOMMISSIONING RADAR Ã¢â‚¬â€ EVIDENCE-BASED ASSET DATABASE
// ===========================================================================
// Asset Selection Criteria:
//   1. Asset is approaching end-of-life (design life, permit, or operator statement)
//   2. Decommissioning tender has NOT been fully awarded
//   3. At least one public signal: announcement, regulatory action, environmental concern
//
// Readiness Factors (each scored 0Ã¢â‚¬â€œ5):
//   endOfLife        Ã¢â‚¬â€ proximity to design life or stated closure date
//   regulatoryPressure Ã¢â‚¬â€ permits expiring, compliance orders, policy mandates
//   operatorIntent   Ã¢â‚¬â€ has operator publicly signalled closure/decommission?
//   environmentalRisk Ã¢â‚¬â€ contamination, ESG liability, environmental violations
//   tenderOpenness   Ã¢â‚¬â€ 5 = no contract awarded, 0 = fully contracted
//
// Composite Score = (endOfLife Ãƒâ€” 0.20) + (regulatoryPressure Ãƒâ€” 0.20) +
//                   (operatorIntent Ãƒâ€” 0.25) + (environmentalRisk Ãƒâ€” 0.15) +
//                   (tenderOpenness Ãƒâ€” 0.20)
//
// Score Ranges:
//   4.0Ã¢â‚¬â€œ5.0 = Imminent (Red)    Ã¢â‚¬â€ Strong signals, no contract, high urgency
//   3.0Ã¢â‚¬â€œ3.9 = Likely (Orange)   Ã¢â‚¬â€ Multiple signals, tender expected soon
//   2.0Ã¢â‚¬â€œ2.9 = Developing (Yellow) Ã¢â‚¬â€ Early signals, monitoring recommended
//   0.0Ã¢â‚¬â€œ1.9 = Watch (Green)     Ã¢â‚¬â€ Weak signals, long horizon
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
            "Platform commissioned in 1979 Ã¢â‚¬â€ exceeds 45-year design life",
            "Decommissioning programme under regulatory review by Norwegian Ministry of Energy",
            "Concrete gravity base structure poses unique removal challenges"
        ],
        valueBasis: "Estimate based on Equinor's 2024 Annual Report decommissioning provisions (NOK ~6.2B allocated for Statfjord complex). Cross-referenced with comparable North Sea gravity base decommissioning estimates.",
        sources: [
            { label: "Equinor Ã¢â‚¬â€œ Statfjord Field Info", url: "https://www.equinor.com/energy/statfjord" },
            { label: "Norwegian Petroleum Ã¢â‚¬â€œ Statfjord", url: "https://www.norskpetroleum.no/en/facts/field/statfjord/" },
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
            "Brief reactivation assessment concluded Ã¢â‚¬â€ full decommissioning expected"
        ],
        valueBasis: "Based on NSTA well P&A cost benchmarks (27 wells Ãƒâ€” avg Ã‚Â£5-7M per well) plus platform removal estimates from OEUK industry data.",
        sources: [
            { label: "NSTA Ã¢â‚¬â€œ Rough Field Data", url: "https://www.nstauthority.co.uk/" },
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
            { label: "Danish Energy Agency Ã¢â‚¬â€œ Oil & Gas", url: "https://ens.dk/en/our-responsibilities/oil-gas" },
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
            "Platform was used for CO2 injection pilot Ã¢â‚¬â€ project discontinued",
            "Dutch State Supervision of Mines (SodM) lifecycle monitoring flagged ageing infrastructure",
            "Netherlands gas production phase-down policy accelerates field closure timelines"
        ],
        valueBasis: "Based on Dutch Ministry of Economic Affairs decommissioning liability estimates for small North Sea platforms and SodM cost benchmarking data.",
        sources: [
            { label: "Netherlands Enterprise Agency Ã¢â‚¬â€œ Mining", url: "https://english.rvo.nl/" },
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
            "Several subsea templates and manifolds installed in 1980sÃ¢â‚¬â€œ1990s require removal",
            "Norwegian Offshore Directorate monitoring ageing subsea infrastructure across NCS",
            "Equinor decommissioning portfolio management team actively scoping work"
        ],
        valueBasis: "Based on Equinor's decommissioning provisions in 2024 Annual Report and industry benchmarks for subsea infrastructure removal on the NCS.",
        sources: [
            { label: "Equinor Ã¢â‚¬â€œ Gullfaks", url: "https://www.equinor.com/energy/gullfaks" },
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
            "Platform installed in 1976 Ã¢â‚¬â€ approaching 50-year age; significant structural fatigue",
            "NSTA Energy Pathfinder lists as active decommissioning project"
        ],
        valueBasis: "NSTA Energy Pathfinder decommissioning cost estimates for Thistle field. Adjusted based on OEUK 2024 cost benchmarking for large jacket platforms.",
        sources: [
            { label: "NSTA Energy Pathfinder Ã¢â‚¬â€œ Thistle", url: "https://pathfinder.nstauthority.co.uk/" },
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
            "Concrete gravity base structure Ã¢â‚¬â€ OSPAR derogation application under review",
            "NSTA Decommissioning Programme approved; topside removal planning advanced",
            "Contains significant quantities of drilling waste requiring environmental remediation"
        ],
        valueBasis: "Based on NSTA cost estimates for concrete gravity base platforms. Comparable to Brent field derogation costs, adjusted for smaller scale of Dunlin complex.",
        sources: [
            { label: "NSTA Ã¢â‚¬â€œ Dunlin Decommissioning", url: "https://pathfinder.nstauthority.co.uk/" },
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
            "Petroineos ceased crude oil processing on 29 April 2025 Ã¢â‚¬â€ refinery permanently shut",
            "Site converted to fuel import terminal (Ã‚Â£50M investment); refinery units require demolition",
            "Major environmental remediation expected Ã¢â‚¬â€ decades of hydrocarbon processing contamination",
            "Site decommissioning planning underway; no demolition contractor yet announced for refinery units"
        ],
        valueBasis: "Based on Petroineos disclosure of Ã‚Â£50M terminal conversion costs. Refinery demolition estimate derived from comparable UK refinery demolition projects (Coryton, Teesside) and S&P Global industry benchmarks for 200kbpd refinery removal.",
        sources: [
            { label: "Petroineos Ã¢â‚¬â€œ Grangemouth Transition", url: "https://www.petroineos.com/" },
            { label: "Argus Media Ã¢â‚¬â€œ Grangemouth Closure", url: "https://www.argusmedia.com/" },
            { label: "S&P Global Ã¢â‚¬â€œ UK Refinery Closures", url: "https://www.spglobal.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 5, operatorIntent: 5, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 10,
        name: "Dow BÃƒÂ¶hlen Ethylene Cracker",
        sector: "Refinery & Petrochemical",
        country: "Germany",
        year: 2028,
        value: 280,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Dow announced permanent shutdown of BÃƒÂ¶hlen cracker by Q4 2027",
            "High energy costs and structural overcapacity in European ethylene cited as drivers",
            "Associated Schkopau chlor-alkali/vinyl assets also closing by Q4 2027",
            "Site remediation and demolition scope not yet contracted"
        ],
        valueBasis: "Estimate based on Dow's corporate restructuring disclosure ($700-900M global charges). European cracker demolition benchmarks from Cefic industry data adjusted for BÃƒÂ¶hlen capacity (~500kt/yr ethylene).",
        sources: [
            { label: "Dow Corporate Announcement", url: "https://www.dow.com/" },
            { label: "Argus Media Ã¢â‚¬â€œ Dow Europe Closures", url: "https://www.argusmedia.com/" },
            { label: "ChemAnalyst Ã¢â‚¬â€œ European Cracker Shutdowns", url: "https://www.chemanalyst.com/" }
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
            { label: "ECIU Ã¢â‚¬â€œ Mossmorran Closure Report", url: "https://eciu.net/" },
            { label: "The National Ã¢â‚¬â€œ FEP Shutdown", url: "https://www.thenational.scot/" },
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
            "Third-party ethylene offtake contract expiring Ã¢â‚¬â€ not being renewed",
            "253 employees affected; units require demolition and site remediation"
        ],
        valueBasis: "Estimate based on TotalEnergies' public disclosure and industry benchmarks for European steam cracker removal. Port of Antwerp demolition cost indices applied.",
        sources: [
            { label: "TotalEnergies Press Release (April 2025)", url: "https://www.businesswire.com/" },
            { label: "ICIS Ã¢â‚¬â€œ TotalEnergies Antwerp", url: "https://www.icis.com/" },
            { label: "Indian Chemical News Ã¢â‚¬â€œ Cracker Closure", url: "https://www.indianchemicalnews.com/" }
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
            "SABIC confirmed permanent closure of Olefins 6 cracker in 2025 Ã¢â‚¬â€ facility idle since 2020",
            "Plans to convert to gas feedstock abandoned due to prohibitive costs",
            "Site requires demolition; adjacent LDPE facility continues operation",
            "European ethylene overcapacity and high energy costs cited as structural drivers"
        ],
        valueBasis: "Based on SABIC's asset write-down disclosures and comparable Teesside industrial demolition cost benchmarks.",
        sources: [
            { label: "ChemAnalyst Ã¢â‚¬â€œ SABIC Wilton Closure", url: "https://www.chemanalyst.com/" },
            { label: "Gazette Live Ã¢â‚¬â€œ Teesside Chemical Closures", url: "https://www.gazettelive.co.uk/" },
            { label: "Argus Media Ã¢â‚¬â€œ European Cracker Shutdowns", url: "https://www.argusmedia.com/" }
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
            { label: "ChemOrbis Ã¢â‚¬â€œ SABIC Geleen", url: "https://www.chemorbis.com/" },
            { label: "Argus Media Ã¢â‚¬â€œ SABIC Closure", url: "https://www.argusmedia.com/" }
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
            { label: "Inspectioneering Ã¢â‚¬â€œ Shell Wesseling", url: "https://www.inspectioneering.com/" }
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
            { label: "Argus Media Ã¢â‚¬â€œ BP Gelsenkirchen", url: "https://www.argusmedia.com/" },
            { label: "ChemAnalyst Ã¢â‚¬â€œ German Refinery Closures", url: "https://www.chemanalyst.com/" }
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
            "Site acquired by Phillips 66 Ã¢â‚¬â€ currently mothballed with uncertain future",
            "Full decommissioning and remediation likely if no restart within 2-3 years"
        ],
        valueBasis: "Based on comparable UK refinery decommissioning costs (Coryton Refinery precedent) and Environment Agency site remediation liability estimates for similar-scale facilities.",
        sources: [
            { label: "Enerdata Ã¢â‚¬â€œ Lindsey Refinery Closure", url: "https://www.enerdata.net/" },
            { label: "Energy Voice Ã¢â‚¬â€œ Prax Insolvency", url: "https://www.energyvoice.com/" },
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
            "Site being converted to biorefinery Ã¢â‚¬â€ conventional units (topping plant, lubricants) require demolition",
            "Third Italian refinery conversion by Eni following Gela and Porto Marghera precedents",
            "Environmental remediation of legacy hydrocarbon contamination required"
        ],
        valueBasis: "Based on Eni's Livorno conversion disclosure and comparable costs from Eni's earlier Gela refinery conversion project. Italian MATTM environmental remediation cost indices applied.",
        sources: [
            { label: "Eni Ã¢â‚¬â€œ Livorno Biorefinery", url: "https://www.eni.com/" },
            { label: "Lubes'n'Greases Ã¢â‚¬â€œ Eni Livorno", url: "https://www.lubesngreases.com/" },
            { label: "Tank Terminals Ã¢â‚¬â€œ Eni Conversion", url: "https://tankterminals.com/" }
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
            { label: "The Chemical Engineer Ã¢â‚¬â€œ INEOS Closures", url: "https://www.thechemicalengineer.com/" },
            { label: "INEOS Ã¢â‚¬â€œ Rheinberg Statement", url: "https://www.ineos.com/" },
            { label: "Packaging Insights Ã¢â‚¬â€œ INEOS Restructuring", url: "https://www.packaginginsights.com/" }
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
            { label: "Argus Media Ã¢â‚¬â€œ INEOS PO/PG Shutdown", url: "https://www.argusmedia.com/" },
            { label: "ZHD Chemical News Ã¢â‚¬â€œ INEOS Closures", url: "https://www.zhd-cn.com/" }
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
            "Part of broader European upstream asset rationalization alongside BÃƒÂ¶hlen cracker",
            "Mercury-cell chlor-alkali technology requires specialized hazardous waste handling",
            "Site contamination from decades of chlorine manufacturing operations"
        ],
        valueBasis: "Based on Dow's corporate restructuring charges and specialized chlor-alkali plant decommissioning costs (mercury remediation premium applied). EU Mercury Regulation compliance costs included.",
        sources: [
            { label: "Dow Corporate Restructuring Announcement", url: "https://www.dow.com/" },
            { label: "ChemManager Ã¢â‚¬â€œ Dow European Closures", url: "https://www.chemanager-online.com/" }
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
            { label: "Dow Announcement Ã¢â‚¬â€œ Barry Closure", url: "https://www.dow.com/" },
            { label: "Texas Chemistry Ã¢â‚¬â€œ Dow Restructuring", url: "https://www.texaschemistry.org/" }
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
            "Plant requires demolition Ã¢â‚¬â€ separate from Petroineos refinery decommissioning",
            "Located within broader Grangemouth industrial complex undergoing major transition"
        ],
        valueBasis: "Based on INEOS disclosures and comparable specialty chemical plant demolition costs within the Grangemouth cluster. Adjusted for shared infrastructure considerations.",
        sources: [
            { label: "INEOS Ã¢â‚¬â€œ Grangemouth Ethanol", url: "https://www.ineos.com/" },
            { label: "The Chemical Engineer Ã¢â‚¬â€œ INEOS UK", url: "https://www.thechemicalengineer.com/" }
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
            "No public restart timeline announced Ã¢â‚¬â€ market conditions worsening"
        ],
        valueBasis: "Estimated from INEOS European restructuring disclosures and French chemical plant decommissioning cost benchmarks (DREAL/ADEME reference data).",
        sources: [
            { label: "ChemAnalyst Ã¢â‚¬â€œ INEOS France", url: "https://www.chemanalyst.com/" },
            { label: "The Chemical Engineer Ã¢â‚¬â€œ INEOS Restructuring", url: "https://www.thechemicalengineer.com/" }
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
            { label: "Environment Agency Ã¢â‚¬â€œ Contaminated Land", url: "https://www.gov.uk/government/organisations/environment-agency" }
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
            "Germany's first offshore wind farm (commissioned 2010) Ã¢â‚¬â€ approaching end of 20-year design life",
            "Decommissioning qualification phase began late 2025; tender invitations projected March 2026",
            "Actual removal work expected to commence 2027-2028",
            "Major industry milestone Ã¢â‚¬â€ sets precedent for European offshore wind decommissioning"
        ],
        valueBasis: "Based on DOTI consortium (E.ON, EWE, Vattenfall) project planning disclosures and BSH (German Federal Maritime Authority) cost assessment for 12-turbine removal including foundation and cables.",
        sources: [
            { label: "OffshoreWind.biz Ã¢â‚¬â€œ Alpha Ventus Decommissioning", url: "https://www.offshorewind.biz/" },
            { label: "Splash247 Ã¢â‚¬â€œ Alpha Ventus", url: "https://splash247.com/" },
            { label: "BSH Ã¢â‚¬â€œ German Offshore Wind", url: "https://www.bsh.de/" }
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
            "Turbine technology obsolete Ã¢â‚¬â€ repowering not economically viable at this scale",
            "Swedish Environmental Protection Agency lifecycle assessment completed",
            "Foundation removal required under original permit conditions"
        ],
        valueBasis: "Based on Swedish Energy Agency decommissioning cost estimates for early-generation offshore wind farms and operator financial security provisions.",
        sources: [
            { label: "Swedish Energy Agency Ã¢â‚¬â€œ Wind", url: "https://www.energimyndigheten.se/" },
            { label: "WindEurope Ã¢â‚¬â€œ End-of-Life Best Practices", url: "https://windeurope.org/" }
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
            "One of the world's first offshore wind farms (1994) Ã¢â‚¬â€ over 30 years old",
            "Turbines have exceeded design life; operator evaluating full removal",
            "Dutch Rijkswaterstaat permit requires full site clearance upon decommissioning",
            "Precedent-setting project for early offshore wind asset end-of-life in Netherlands"
        ],
        valueBasis: "Based on Nuon/Vattenfall decommissioning provisions and Dutch RVO decommissioning cost guidance for small offshore wind installations.",
        sources: [
            { label: "RVO Ã¢â‚¬â€œ Dutch Offshore Wind", url: "https://english.rvo.nl/" },
            { label: "WindEurope Ã¢â‚¬â€œ Decommissioning", url: "https://windeurope.org/" }
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
            "Commissioned 2001 Ã¢â‚¬â€ 20 turbines approaching end of 25-year design life",
            "Located in Copenhagen harbour; repowering being evaluated vs. full removal",
            "Danish Energy Agency requiring updated decommissioning plan from operator",
            "Turbine blade recycling challenges Ã¢â‚¬â€ composite waste management required"
        ],
        valueBasis: "Based on Danish Energy Agency decommissioning cost estimates and Middelgrunden cooperative's financial provisions for end-of-life management.",
        sources: [
            { label: "Danish Energy Agency Ã¢â‚¬â€œ Offshore Wind", url: "https://ens.dk/en/our-responsibilities/wind-power" },
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
            "UK's first offshore wind installation (2000) Ã¢â‚¬â€ over 25 years old",
            "Two 2MW turbines; decommissioning assessment underway by E.ON",
            "BEIS/DESNZ decommissioning plan required under original consent conditions",
            "Seabed lease conditions mandate full removal of foundation structures"
        ],
        valueBasis: "Based on Crown Estate decommissioning liability assessments for early UK offshore wind projects and operator financial provisions.",
        sources: [
            { label: "Crown Estate Ã¢â‚¬â€œ Offshore Wind", url: "https://www.thecrownestate.co.uk/" },
            { label: "DESNZ Ã¢â‚¬â€œ Decommissioning Guidance", url: "https://www.gov.uk/guidance/decommissioning-offshore-renewable-energy-installations" }
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
            "Commissioned 2004 Ã¢â‚¬â€ 30 turbines approaching 25-year mark",
            "Vattenfall (operator) evaluating repowering vs. decommissioning",
            "Monopile foundations showing signs of scour erosion requiring assessment",
            "Original consent conditions require decommissioning plan submission 2 years before EOL"
        ],
        valueBasis: "Based on Vattenfall's decommissioning provisions and BEIS offshore wind decommissioning cost estimates for 30-turbine wind farms.",
        sources: [
            { label: "Vattenfall Ã¢â‚¬â€œ Scroby Sands", url: "https://group.vattenfall.com/" },
            { label: "Crown Estate Ã¢â‚¬â€œ Decommissioning", url: "https://www.thecrownestate.co.uk/" }
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
            "Largest early-generation offshore wind farm (2002) Ã¢â‚¬â€ 80 turbines approaching 30-year life",
            "Vattenfall evaluating repowering vs. decommissioning for first phase turbines",
            "Danish regulatory framework requires decommissioning plan before end of permit",
            "Scale of project makes it a bellwether for European offshore wind decommissioning"
        ],
        valueBasis: "Based on Vattenfall's annual report provisions for Danish offshore wind assets and Danish Energy Agency cost guidance for large-scale offshore wind decommissioning.",
        sources: [
            { label: "Vattenfall Ã¢â‚¬â€œ Horns Rev", url: "https://group.vattenfall.com/" },
            { label: "Danish Energy Agency Ã¢â‚¬â€œ Wind Decom", url: "https://ens.dk/" }
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
            { label: "Dutch Government Ã¢â‚¬â€œ Coal Phase-Out", url: "https://www.government.nl/" },
            { label: "Dutch News Ã¢â‚¬â€œ Coal Debate", url: "https://www.dutchnews.nl/" },
            { label: "Bloomberg Coal Countdown Ã¢â‚¬â€œ Netherlands", url: "https://www.bloombergcoalcountdown.com/" }
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
            "Subject to Netherlands 2030 coal ban Ã¢â‚¬â€ must cease coal operations",
            "One of the newest coal plants in Europe (commissioned 2015) but still subject to ban",
            "Uniper evaluating hydrogen/biomass conversion Ã¢â‚¬â€ no final decision announced",
            "If not converted, full decommissioning and site remediation required"
        ],
        valueBasis: "Based on Uniper's asset transition disclosures and Dutch government compensation framework for stranded coal assets.",
        sources: [
            { label: "Uniper Ã¢â‚¬â€œ Maasvlakte", url: "https://www.uniper.energy/" },
            { label: "NL Times Ã¢â‚¬â€œ Coal Phase-Out", url: "https://nltimes.nl/" }
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
            "ENEL originally planned 2025 closure Ã¢â‚¬â€ now in 'strategic reserve' status",
            "Significant local opposition and environmental pressure for site closure",
            "Site identified for potential renewable energy conversion (solar/battery storage)"
        ],
        valueBasis: "Based on ENEL's decommissioning provisions in annual reports and Italian Ministry of Environment (MASE) remediation cost estimates for coal power stations.",
        sources: [
            { label: "Argus Media Ã¢â‚¬â€œ Italy Coal Phase-Out", url: "https://www.argusmedia.com/" },
            { label: "Climate Change News Ã¢â‚¬â€œ Italy Coal", url: "https://www.climatechangenews.com/" },
            { label: "Beyond Fossil Fuels Ã¢â‚¬â€œ Europe", url: "https://beyondfossilfuels.org/" }
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
            "ENEL's Brindisi complex Ã¢â‚¬â€ one of largest remaining coal stations in Mediterranean",
            "Part of Italy's delayed coal phase-out; units in 'strategic reserve' pending alternatives",
            "Significant ash waste disposal and soil contamination requiring remediation",
            "Regional transition plans include renewable energy hub conversion"
        ],
        valueBasis: "Based on ENEL's asset retirement obligations and Italian MASE environmental remediation cost benchmarks for large thermal power stations.",
        sources: [
            { label: "ENEL Annual Report", url: "https://www.enel.com/investors" },
            { label: "Earth.org Ã¢â‚¬â€œ Italy Coal", url: "https://earth.org/" }
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
            "Units may need to remain as backup Ã¢â‚¬â€ but decommissioning planning must proceed"
        ],
        valueBasis: "Based on RWE's Ã¢â€šÂ¬2.6B government compensation agreement for Rhineland lignite phase-out and site remediation provisions in RWE's 2024 Annual Report.",
        sources: [
            { label: "Clean Energy Wire Ã¢â‚¬â€œ German Coal Exit", url: "https://www.cleanenergywire.org/" },
            { label: "Agora Energiewende Ã¢â‚¬â€œ Coal Phase-Out", url: "https://www.agora-energiewende.org/" },
            { label: "Bundesregierung Ã¢â‚¬â€œ Coal Law", url: "https://www.bundesregierung.de/" }
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
            "One of Europe's most modern coal plants Ã¢â‚¬â€ stranded asset due to German energy policy",
            "Site being evaluated for green hydrogen hub conversion by Hamburg authorities",
            "If conversion does not proceed, full decommissioning required"
        ],
        valueBasis: "Based on Vattenfall's write-down of Moorburg (total investment was ~Ã¢â€šÂ¬3.2B) and subsequent site transition planning costs disclosed in annual reports.",
        sources: [
            { label: "Vattenfall Ã¢â‚¬â€œ Moorburg", url: "https://group.vattenfall.com/" },
            { label: "Bloomberg Coal Countdown Ã¢â‚¬â€œ Germany", url: "https://www.bloombergcoalcountdown.com/" }
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
            "UK government mandated coal phase-out deadline of October 2024 Ã¢â‚¬â€ Drax coal units ceased",
            "Four units already converted to biomass; two coal units require decommissioning",
            "Coal ash disposal areas require environmental monitoring and potential remediation",
            "Drax Group's biomass strategy creates stranded coal-side infrastructure"
        ],
        valueBasis: "Based on Drax Group plc annual report provisions for coal unit retirement and UK Environment Agency GR3 site remediation cost guidance.",
        sources: [
            { label: "Drax Group Ã¢â‚¬â€œ Annual Report", url: "https://www.drax.com/investors/" },
            { label: "Ember Energy Ã¢â‚¬â€œ UK Coal Phase-Out", url: "https://ember-energy.org/" }
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
        name: "AvedÃƒÂ¸re Straw-Fired Biomass Unit",
        sector: "Bioenergy",
        country: "Denmark",
        year: 2028,
        value: 45,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "ÃƒËœrsted's AvedÃƒÂ¸re CHP plant straw-fired unit approaching end of boiler design life",
            "Unit efficiency declining; ÃƒËœrsted evaluating replacement vs. decommissioning",
            "Danish green transition strategy favoring newer CHP and heat pump technologies",
            "Original subsidy framework expiring Ã¢â‚¬â€ economics change significantly"
        ],
        valueBasis: "Based on ÃƒËœrsted's annual report provisions for CHP asset retirements and Danish Energy Agency decommissioning guidance for biomass CHP units.",
        sources: [
            { label: "ÃƒËœrsted Ã¢â‚¬â€œ AvedÃƒÂ¸re", url: "https://orsted.com/" },
            { label: "Danish Energy Agency", url: "https://ens.dk/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 43,
        name: "VÃƒÂ¤sterÃƒÂ¥s BioWaste CHP Plant",
        sector: "Bioenergy",
        country: "Sweden",
        year: 2028,
        value: 40,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "MÃƒÂ¤larenergi's older bio-waste combustion units reaching end of boiler integrity life",
            "Swedish EPA enhanced emissions standards making older units non-compliant",
            "Company investing in newer CHP capacity; older block earmarked for phase-out",
            "Waste handling infrastructure upgrades needed regardless Ã¢â‚¬â€ demolition more economic"
        ],
        valueBasis: "Estimated from MÃƒÂ¤larenergi's annual report and Swedish EPA decommissioning cost benchmarks for waste-to-energy facilities.",
        sources: [
            { label: "MÃƒÂ¤larenergi Ã¢â‚¬â€œ Sustainability", url: "https://www.malarenergi.se/" },
            { label: "Swedish EPA Ã¢â‚¬â€œ Waste Incineration", url: "https://www.naturvardsverket.se/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 44,
        name: "LÃƒÂ¼beck Biomass CHP Plant",
        sector: "Bioenergy",
        country: "Germany",
        year: 2028,
        value: 50,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Municipal biomass CHP plant with ageing boiler system beyond 25-year design life",
            "German 17. BImSchV emissions standards tightening Ã¢â‚¬â€ compliance investment prohibitive",
            "Stadtwerke LÃƒÂ¼beck evaluating closure vs. costly emissions control retrofit",
            "Site requires asbestos abatement in older building structures"
        ],
        valueBasis: "Based on Stadtwerke LÃƒÂ¼beck annual disclosures and German UBA (Federal Environment Agency) decommissioning cost guidance for municipal energy infrastructure.",
        sources: [
            { label: "UBA Ã¢â‚¬â€œ Industrial Plant Decommissioning", url: "https://www.umweltbundesamt.de/" },
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
            { label: "Port of Rotterdam Ã¢â‚¬â€œ Industrial", url: "https://www.portofrotterdam.com/" },
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
            { label: "OVAM Ã¢â‚¬â€œ Flanders Environmental Agency", url: "https://www.ovam.be/" },
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
            "Harland & Wolff entered administration in September 2024 Ã¢â‚¬â€ future of Belfast yard uncertain",
            "Historic shipyard requires significant infrastructure remediation if closed",
            "Northern Ireland government assessing options for site Ã¢â‚¬â€ no confirmed plan announced",
            "Contaminated land from over 150 years of heavy shipbuilding operations"
        ],
        valueBasis: "Estimated from Northern Ireland Department for the Economy assessments and comparable UK shipyard remediation precedents (e.g., Swan Hunter, Tyneside).",
        sources: [
            { label: "BBC News Ã¢â‚¬â€œ Harland & Wolff Administration", url: "https://www.bbc.co.uk/news" },
            { label: "DfE Northern Ireland", url: "https://www.economy-ni.gov.uk/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 3, operatorIntent: 4, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 48,
        name: "GdaÃ…â€žsk Shiprepair Yard (Dock 7-8)",
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
            "Oldest dry dock at Palermo requiring replacement Ã¢â‚¬â€ structural life limits reached",
            "Fincantieri investing in modernization program across Italian yards",
            "Old dock demolition required before new dock construction can proceed",
            "Environmental remediation of legacy TBT (tributyltin) contamination in dock area"
        ],
        valueBasis: "Based on Fincantieri's capital expenditure programs for yard modernization and Italian MATTM TBT contamination remediation cost benchmarks.",
        sources: [
            { label: "Fincantieri Ã¢â‚¬â€œ Shipyards", url: "https://www.fincantieri.com/" },
            { label: "EU Ship Recycling Regulation", url: "https://environment.ec.europa.eu/" }
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 50,
        name: "Lisnave SetÃƒÂºbal Dry Dock (Legacy Section)",
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
            "Blast furnaces idled since 2013 Ã¢â‚¬â€ no restart planned despite French government pressure",
            "ArcelorMittal committed to electric arc furnace transition at other French sites",
            "French environmental authorities requiring remediation of legacy contamination",
            "Demolition of blast furnace structures and associated coking plant infrastructure required"
        ],
        valueBasis: "Based on ArcelorMittal's European restructuring provisions and French ADEME remediation cost benchmarks for integrated steelworks sites.",
        sources: [
            { label: "ArcelorMittal Ã¢â‚¬â€œ France Operations", url: "https://france.arcelormittal.com/" },
            { label: "ADEME Ã¢â‚¬â€œ Industrial Site Remediation", url: "https://www.ademe.fr/" }
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
            "Tata Steel and Dutch government agreed Ã¢â€šÂ¬3B transition plan to green steel (DRI/EAF)",
            "Transition plan requires closure of at least one blast furnace by 2030",
            "Significant local health concerns from coke oven emissions (RIVM studies)",
            "Environmental groups and local government pushing for accelerated closure"
        ],
        valueBasis: "Based on Tata Steel/Dutch government transition agreement (Ã¢â€šÂ¬3B total package) and RIVM environmental health cost studies for IJmuiden site.",
        sources: [
            { label: "Tata Steel Ã¢â‚¬â€œ Green Steel Plan", url: "https://www.tatasteeleurope.com/" },
            { label: "Dutch Government Ã¢â‚¬â€œ IJmuiden Transition", url: "https://www.government.nl/" },
            { label: "RIVM Ã¢â‚¬â€œ Health Studies IJmuiden", url: "https://www.rivm.nl/" }
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
            "Older blast furnaces (BF1, BF2) to be replaced by DRI plant Ã¢â‚¬â€ requiring demolition",
            "German government co-funding Ã¢â€šÂ¬2B green steel transition (IPCEI program)",
            "Substantial legacy contamination at Europe's largest steel production site"
        ],
        valueBasis: "Based on ThyssenKrupp's green steel transition investment plan and German UBA/LANUV NRW environmental remediation cost assessments for integrated steelworks.",
        sources: [
            { label: "ThyssenKrupp Ã¢â‚¬â€œ Climate Strategy", url: "https://www.thyssenkrupp.com/" },
            { label: "Clean Energy Wire Ã¢â‚¬â€œ German Steel", url: "https://www.cleanenergywire.org/" }
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
            "Coke oven batteries identified as primary pollution source Ã¢â‚¬â€ closure mandated by courts",
            "European Court of Human Rights ruling (2019) cited environmental and health violations",
            "Transition to DRI/EAF steelmaking planned but financing remains uncertain"
        ],
        valueBasis: "Based on Italian government's Ã¢â€šÂ¬1.5B+ estimated environmental remediation liability for Taranto site and EU state aid assessments for the steel transition.",
        sources: [
            { label: "Italian Ministry of Enterprise", url: "https://www.mimit.gov.it/" },
            { label: "ECtHR Ã¢â‚¬â€œ Cordella v. Italy (2019)", url: "https://hudoc.echr.coe.int/" },
            { label: "Reuters Ã¢â‚¬â€œ ILVA Taranto", url: "https://www.reuters.com/" }
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 5, operatorIntent: 4, environmentalRisk: 5, tenderOpenness: 5 }
    },
    // --- EXTENDED TIMELINE ASSETS (2031Ã¢â‚¬â€œ2035) ---

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
            { label: "TotalEnergies Ã¢â‚¬â€œ European Operations", url: "https://totalenergies.com/" },
            { label: "Saxon Environment Agency", url: "https://www.umwelt.sachsen.de/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 56,
        name: "Nynas NynÃƒÂ¤shamn Refinery",
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
            { label: "Vattenfall Ã¢â‚¬â€œ Netherlands", url: "https://group.vattenfall.com/" },
            { label: "City of Amsterdam Ã¢â‚¬â€œ Climate Strategy", url: "https://www.amsterdam.nl/" }
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
            "UK's first major offshore wind farm (2003, 30 turbines) Ã¢â‚¬â€ approaching 30-year mark",
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
            "BASF announced Ã¢â€šÂ¬500M cost-cutting program including closure of several legacy production lines",
            "Oldest units at the Verbund site dating from 1960s face decommissioning as part of portfolio optimization",
            "Ammonia and caprolactam assets identified for potential closure by 2030s",
            "Environmental remediation of legacy contamination at specific site areas required"
        ],
        valueBasis: "Based on BASF's restructuring charges and Verbund site capital allocation disclosures in annual reports.",
        sources: [
            { label: "BASF Ã¢â‚¬â€œ Ludwigshafen", url: "https://www.basf.com/" },
            { label: "ChemAnalyst Ã¢â‚¬â€œ BASF Restructuring", url: "https://www.chemanalyst.com/" }
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
            "Motor Oil Hellas investing in new capacity Ã¢â‚¬â€ older units to be retired",
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
        name: "PKN Orlen PÃ…â€šock Refinery (Legacy Distillation Units)",
        sector: "Refinery & Petrochemical",
        country: "Poland",
        year: 2035,
        value: 200,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Orlen Group investing in petrochemical modernization Ã¢â‚¬â€ older atmospheric distillation units to be replaced",
            "EU Fit for 55 package increasing costs for traditional refining operations",
            "Polish environmental authority (GIOÃ…Å¡) monitoring compliance of ageing units",
            "Orlen's 2030 strategy includes retirement of oldest CDU units and site modernization"
        ],
        valueBasis: "Based on Orlen Group's 2030 Strategy capital allocation framework and Polish GIOÃ…Å¡ decommissioning cost benchmarks.",
        sources: [
            { label: "PKN Orlen Ã¢â‚¬â€œ Strategy 2030", url: "https://www.orlen.pl/" },
            { label: "Polish GIOÃ…Å¡", url: "https://www.gios.gov.pl/" }
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
            "ArcelorMittal confirmed Ã¢â€šÂ¬1.3B investment for new 2Mt EAF at Dunkirk, scheduled to commence 2029",
            "One existing blast furnace to be retired around 2030 as EAF replaces BF-BOF steelmaking route",
            "French government co-funding green steel transition under industrial decarbonization programme",
            "Legacy blast furnace infrastructure and associated coke plant will require demolition and site remediation"
        ],
        valueBasis: "Estimated from ArcelorMittal's European decarbonization capex disclosures and French ADEME remediation cost benchmarks for integrated steelworks.",
        sources: [
            { label: "ArcelorMittal Ã¢â‚¬â€œ Dunkirk Investment", url: "https://corporate.arcelormittal.com/" },
            { label: "ESG Today Ã¢â‚¬â€œ ArcelorMittal Dunkirk EAF", url: "https://www.esgtoday.com/" }
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
            "ArcelorMittal cancelled Ã¢â€šÂ¬1.3B green steel transformation at Bremen in June 2025 citing weak economics",
            "Existing blast furnace and coke oven infrastructure is ageing Ã¢â‚¬â€ ongoing maintenance costs escalating",
            "German government and EU IPCEI subsidy framework remains available if project is relaunched",
            "Ageing assets face increasing regulatory pressure from German UBA emission standards"
        ],
        valueBasis: "Estimated from ArcelorMittal's European restructuring provisions and German UBA/LANUV environmental remediation cost assessments for integrated steelworks.",
        sources: [
            { label: "Clean Energy Wire Ã¢â‚¬â€œ ArcelorMittal Bremen", url: "https://www.cleanenergywire.org/" },
            { label: "Eurometal Ã¢â‚¬â€œ Bremen Green Steel", url: "https://eurometal.net/" }
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
            "First DRI plant (with natural gas, transitioning to hydrogen) scheduled for commissioning 2025Ã¢â‚¬â€œ2026",
            "Phased retirement of coke ovens planned as DRI capacity ramps up through 2030s",
            "Federal and Lower Saxony state government co-financing the Ã¢â€šÂ¬2.3B SALCOS transition"
        ],
        valueBasis: "Based on Salzgitter AG's SALCOS project disclosures and German UBA decommissioning cost benchmarks for coke oven facilities.",
        sources: [
            { label: "Salzgitter AG Ã¢â‚¬â€œ SALCOS", url: "https://www.salzgitter-ag.com/en/sustainability/salcos.html" },
            { label: "Clean Energy Wire Ã¢â‚¬â€œ SALCOS", url: "https://www.cleanenergywire.org/" }
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
            "INEOS executives warn FPS could reach end-of-life between 2030Ã¢â‚¬â€œ2035 due to UK tax policy and declining volumes",
            "Pipeline designated as Critical National Infrastructure Ã¢â‚¬â€ carries ~20-30% of UK offshore oil production",
            "Throughput declining as connected North Sea fields mature Ã¢â‚¬â€ economic viability under pressure",
            "INEOS invested Ã‚Â£500M+ in maintenance since 2017, but Energy Profits Levy threatens further investment"
        ],
        valueBasis: "Estimated from INEOS FPS operational disclosures, NSTA decommissioning cost guidance for major pipeline infrastructure, and comparable North Sea pipeline retirement costs.",
        sources: [
            { label: "INEOS Ã¢â‚¬â€œ Forties Pipeline System", url: "https://www.ineos.com/businesses/ineos-fps/" },
            { label: "Pipeline Journal Ã¢â‚¬â€œ FPS Future", url: "https://www.pipeline-journal.net/" },
            { label: "Offshore Technology Ã¢â‚¬â€œ FPS End of Life", url: "https://www.offshore-technology.com/" }
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 67,
        name: "Chantiers de l'Atlantique Ã¢â‚¬â€œ Legacy Yard Assets (Saint-Nazaire)",
        sector: "Shipping & Marine",
        country: "France",
        year: 2032,
        value: 110,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Saint-Nazaire shipyard undergoing modernization Ã¢â‚¬â€ oldest yard buildings and infrastructure from 1960s era",
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
    "[SCRAPER] Querying Norwegian Offshore Directorate Ã¢â‚¬â€ NCS field data...",
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
    "[AI-LOGIC] Computing Readiness Score: endOfLife Ãƒâ€” 0.20 + regulatoryPressure Ãƒâ€” 0.20 + operatorIntent Ãƒâ€” 0.25 + environmentalRisk Ãƒâ€” 0.15 + tenderOpenness Ãƒâ€” 0.20",
    "[AI-LOGIC] Validating against public sources Ã¢â‚¬â€ removing unverifiable entries...",
    "[CALCULATING] Estimating remediation values from annual reports and regulatory benchmarks...",
    "[SUCCESS] Yield: 60 verified opportunities identified across 8 sectors. Rendering dashboard."
];

// ========================
// MEDIA MONITORING (NEWS)
// ========================
const mockNews = [
    {
        id: 16,
        title: "Dismantling of aging hydrocracker at Leuna Refinery scheduled for Q3 2026",
        source: "TotalEnergies",
        link: "https://news.google.com/search?q=Leuna+refinery+hydrocracker+dismantling+2026",
        date: "2026-03-10",
        category: "Dismantling",
        sector: "Refinery & Petrochemical",
        country: "Germany"
    },
    {
        id: 17,
        title: "Statfjord A topside removal contract expected to be awarded in late 2026",
        source: "Petroleum Economist",
        link: "https://news.google.com/search?q=Statfjord+A+topside+removal+contract+2026",
        date: "2026-02-28",
        category: "Decommissioning News",
        sector: "Oil & Gas",
        country: "Norway"
    },
    {
        id: 18,
        title: "EU unveils 'Blue Economy' roadmap for offshore wind farm decommissioning and recycling",
        source: "European Commission",
        link: "https://news.google.com/search?q=EU+offshore+wind+decommissioning+roadmap+2026",
        date: "2026-02-20",
        category: "Policy Roadmap",
        sector: "Wind",
        country: "European Union"
    },
    {
        id: 19,
        title: "Port of Rotterdam prepares for massive scale-up in industrial scrap processing from plant closures",
        source: "Port of Rotterdam",
        link: "https://news.google.com/search?q=Rotterdam+industrial+scrap+processing+2026",
        date: "2026-03-05",
        category: "Industrial Logistics",
        sector: "Other Industrial",
        country: "Netherlands"
    },
    {
        id: 20,
        title: "Polish refineries outline strategy for phasing out legacy thermal units by 2030",
        source: "Warsaw Business Journal",
        link: "https://news.google.com/search?q=Poland+refinery+thermal+unit+phase+out+2026",
        date: "2026-02-12",
        category: "Strategy Update",
        sector: "Refinery & Petrochemical",
        country: "Poland"
    },
    {
        id: 21,
        title: "Tarragona hub begins decommissioning of legacy polymer lines as ArcelorMittal scales down",
        source: "El Pais English",
        link: "https://news.google.com/search?q=Tarragona+polymer+line+decommissioning+2026",
        date: "2026-03-18",
        category: "Facility Closure",
        sector: "Chemical",
        country: "Spain"
    },
    {
        id: 22,
        title: "UK's NSTA launches review of subsea infrastructure removal best practices",
        source: "NSTA",
        link: "https://news.google.com/search?q=NSTA+subsea+infrastructure+removal+review+2026",
        date: "2026-04-05",
        category: "Regulatory Review",
        sector: "Oil & Gas",
        country: "UK"
    },
    {
        id: 23,
        title: "French maritime authority issues guidelines for end-of-life shipyard remediation",
        source: "Marine France",
        link: "https://news.google.com/search?q=France+shipyard+remediation+guidelines+2026",
        date: "2026-03-15",
        category: "Environmental Policy",
        sector: "Shipping & Marine",
        country: "France"
    },
    {
        id: 24,
        title: "Greek industrial clusters move towards hydrogen-ready infrastructure, retiring gas units",
        source: "EnergyPress Greece",
        link: "https://news.google.com/search?q=Greece+industrial+cluster+hydrogen+transition+2026",
        date: "2026-02-08",
        category: "Asset Transition",
        sector: "Other Industrial",
        country: "Greece"
    },
    {
        id: 25,
        title: "Swedish steel sector outlines decommissioning costs for legacy blast furnaces through 2035",
        source: "Svenskt StÃ¥l",
        link: "https://news.google.com/search?q=Sweden+blast+furnace+decommissioning+costs+2026",
        date: "2026-01-25",
        category: "Financial Forecast",
        sector: "Other Industrial",
        country: "Sweden"
    }
];

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
