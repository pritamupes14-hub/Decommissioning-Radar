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
// Composite Score = (endOfLife x 0.20) + (regulatoryPressure x 0.20) +
//                   (operatorIntent x 0.25) + (environmentalRisk x 0.15) +
//                   (tenderOpenness x 0.20)
//
// Score Ranges:
//   4.0–5.0 = Imminent (Red)    — Strong signals, no contract, high urgency
//   3.0–3.9 = Likely (Orange)   — Multiple signals, tender expected soon
//   2.0–2.9 = Developing (Yellow) — Early signals, monitoring recommended
//   0.0–1.9 = Watch (Green)     — Weak signals, long horizon
// ===========================================================================

const mockData = [
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
            "Platform commissioned in 1979 - exceeds 45-year design life",
            "Decommissioning programme under regulatory review by Norwegian Ministry of Energy"
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
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
            "Centrica ceased gas storage operations; facility in extended shutdown",
            "27 wells require plug & abandonment; platform infrastructure ageing"
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
            "TotalEnergies DK operations approaching end of economic life",
            "Danish Energy Agency lifecycle review underway"
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
            "Operated by Harbour Energy; field in late-life phase",
            "Dutch State Supervision of Mines monitoring ageing infrastructure"
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
            "Templates and manifolds installed in 1980s require removal"
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 9,
        name: "Grangemouth Refinery Complex",
        sector: "Refinery & Petrochemical",
        country: "UK",
        year: 2027,
        value: 500,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Petroineos ceased crude oil processing; units require demolition",
            "Major environmental remediation expected for legacy contamination"
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
            "High energy costs and structural overcapacity drivers"
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
            "Closure accelerated due to ageing infrastructure"
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
            "Oldest Antwerp cracker closing by end-2027",
            "Units require demolition and site remediation"
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
            "SABIC confirmed permanent closure; facility idle since 2020",
            "Site requires demolition; adjacent facilities continue"
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
            "SABIC permanently closed the 575kt/yr Olefins 3 cracker",
            "Site requires demolition within Chemelot park"
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 3, operatorIntent: 5, environmentalRisk: 3, tenderOpenness: 5 }
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
            "BP announced ~one-third capacity reduction",
            "Surplus refining units to be permanently shut and decommissioned"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
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
            "Conventional refining shut; site being converted to biorefinery",
            "Conventional units require demolition"
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 4, operatorIntent: 5, environmentalRisk: 4, tenderOpenness: 4 }
    },
    {
        id: 19,
        name: "INEOS Rheinberg Allylics & Electro-Chemical",
        sector: "Chemical",
        country: "Germany",
        year: 2027,
        value: 120,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "INEOS confirmed closure of epichlorohydrin and chlorine units",
            "Plant demolition and remediation scope being defined"
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
            "Indefinite shutdown of PO/PG units following fire",
            "Fire damage compounds case for demolition"
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
            "Dow announced permanent closure by Q4 2027",
            "Mercury-cell technology requires specialized handling"
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
            "Dow announced closure by mid-2026",
            "European operations uncompetitive due to energy costs"
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
            "INEOS closed synthetic ethanol plant in early 2025",
            "Plant requires demolition separate from refinery"
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
            "Suspended production due to high energy costs",
            "Extended mothballing increases closure likelihood"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
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
            "Ageing facility facing high EU REACH compliance costs",
            "EU IED conclusions require significant upgrades or closure"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 4, operatorIntent: 3, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 27,
        name: "Alpha Ventus Offshore Wind Farm",
        sector: "Wind",
        country: "Germany",
        year: 2028,
        value: 85,
        tenderStatus: "Qualification phase",
        selectionDrivers: [
            "First German offshore wind farm approaching end of life",
            "Decommissioning qualification phase began late 2025"
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
            "Early Swedish installation; turbines past 20-year life",
            "Technology obsolete; repowering unviable at this scale"
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
            "World's first offshore installation (1994) over 30 years old",
            "Permit requires full site clearance upon decommissioning"
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
            "Commissioned 2001; approaching end of 25-year design life",
            "Copenhagen harbour location poses removal visibility"
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
            "UK's first offshore installation (2000) over 25 years old",
            "Seabed lease conditions mandate full removal"
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
            "Commissioned 2004; nearing 25-year project life",
            "Monopile foundations showing erosion requiring assessment"
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
            "80 turbines approaching 30-year operational horizon",
            "Scale of project makes it a key decommissioning milestone"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 34,
        name: "Eemshaven Coal Power Plant (RWE Units)",
        sector: "Power",
        country: "Netherlands",
        year: 2030,
        value: 200,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Netherlands legally mandated coal phase-out by 2030",
            "RWE coal units must cease operation by deadline"
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
            "Subject to Netherlands 2030 coal ban",
            "If not converted, full decommissioning required"
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
            "Italy prioritizing closure of Civitavecchia complex",
            "Significant environmental pressure for site remediation"
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
            "One of largest coal stations in Mediterranean",
            "Significant soil contamination requiring remediation"
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
            "Germany coal exit mandates closure target by 2030-2038",
            "Accelerated phase-out in Rhineland lignite region"
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
            "Stranded coal asset due to German energy policy",
            "Vattenfall planning hydrogen hub conversion or removal"
        ],
        readinessFactors: { endOfLife: 2, regulatoryPressure: 5, operatorIntent: 4, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 41,
        name: "Porvoo Bio Gen 1 Units (Neste)",
        sector: "Bioenergy",
        country: "Finland",
        year: 2029,
        value: 70,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Neste's first-generation biodiesel units reaching end of life",
            "Company replacing with newer technology at Porvoo site"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 42,
        name: "Avedöre Straw-Fired Biomass Unit",
        sector: "Bioenergy",
        country: "Denmark",
        year: 2028,
        value: 45,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Approaching end of boiler design life",
            "Ørsted evaluating replacement vs. decommissioning"
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
            "Older bio-waste units reaching end of integrity life",
            "Enhanced emission standards making units non-compliant"
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
            "Municipal system beyond 25-year design life",
            "Compliance investment in older units prohibitive"
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
            "First-gen FAME facility approaching design life in port",
            "Optimization program encourages land turnover"
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
            "First-generation bio-ethanol facility nearing retirement",
            "Permit renewal requires major emissions upgrades"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 47,
        name: "Harland & Wolff Belfast Heavy Industries Dock",
        sector: "Shipping & Marine",
        country: "UK",
        year: 2027,
        value: 140,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Historic shipyard requires infrastructure remediation",
            "Contaminated land from 150 years of operations"
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
            "Ageing dry dock infrastructure requires major overhaul",
            "Audit flagged structural concerns and sediment contamination"
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
            "Oldest dock requiring replacement for modernization",
            "Remediation of legacy TBT contamination required"
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
            "Internal modernized plan calls for removal of 1960s docks",
            "Heavy metal contamination monitoring ongoing"
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 4, tenderOpenness: 5 }
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
            "Transition plan to green steel requires BF closure",
            "Significant local health concerns from emissions source"
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
            "Transition to hydrogen-based DRI steelmaking",
            "Demolition of legacy furnaces co-funded by govt"
        ],
        readinessFactors: { endOfLife: 4, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 54,
        name: "ILVA/Acciaierie d'Italia Taranto Cologne Ovens",
        sector: "Other Industrial",
        country: "Italy",
        year: 2030,
        value: 400,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Plant transition to EAF/DRI requires coking plant closure",
            "Court-mandated remediation due to health violations"
        ],
        readinessFactors: { endOfLife: 5, regulatoryPressure: 5, operatorIntent: 4, environmentalRisk: 5, tenderOpenness: 5 }
    },
    {
        id: 55,
        name: "Leuna Refinery Legacy Units (TotalEnergies)",
        sector: "Refinery & Petrochemical",
        country: "Germany",
        year: 2032,
        value: 220,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Units approaching 40-year structural life limits",
            "TotalEnergies evaluating long-term portfolio rationalization"
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
            "Refinery infrastructure ageing; core units dating from legacy builds",
            "Carbon tax increases making production less competitive"
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
            "Environment Agency enforcement on ageing emissions source",
            "Significant soil contamination from century of use"
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
            "Amsterdam municipality pushing for fossil-free energy 2040",
            "Site identified for potential hydrogen conversion"
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
            "UK's first major offshore farm approaching 30-year mark",
            "Lease renewal determining site decommissioning horizon"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 60,
        name: "BASF Ludwigshafen (Legacy Units)",
        sector: "Chemical",
        country: "Germany",
        year: 2034,
        value: 350,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Legacy production lines facing phase-out for cost-cutting",
            "Units dating from 1960s require portfolio optimization"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 3, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 61,
        name: "Corinth Refinery Auxiliary Units",
        sector: "Refinery & Petrochemical",
        country: "Greece",
        year: 2035,
        value: 130,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Auxiliary processing units nearing 40-year structural age",
            "EU IED conclusions require upgrades or unit closure"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 62,
        name: "PKN Orlen Płock Refinery (Legacy Units)",
        sector: "Refinery & Petrochemical",
        country: "Poland",
        year: 2035,
        value: 200,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Strategy 2030 includes retirement of oldest distillation units",
            "EU Fit for 55 package increasing costs for legacy refining"
        ],
        readinessFactors: { endOfLife: 2, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 2, tenderOpenness: 5 }
    },
    {
        id: 63,
        name: "ArcelorMittal Dunkirk Blast Furnace",
        sector: "Other Industrial",
        country: "France",
        year: 2030,
        value: 320,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "ArcelorMittal committed to EAF transition by 2030",
            "Legacy BF infrastructure will require demolition and remediation"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 4, operatorIntent: 4, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 64,
        name: "ArcelorMittal Bremen Blast Furnace",
        sector: "Other Industrial",
        country: "Germany",
        year: 2032,
        value: 280,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Existing blast furnace and coke infrastructure is ageing",
            "Assets face regulatory pressure from German UBA standards"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 4, tenderOpenness: 5 }
    },
    {
        id: 65,
        name: "Salzgitter AG Coke Ovens",
        sector: "Other Industrial",
        country: "Germany",
        year: 2033,
        value: 250,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "SALCOS programme phased retirement of coke ovens through 2030s",
            "State co-financing for hydrogen-based steel transition"
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
            "Executives warn FPS could reach EOL mid-2030s due to tax and policy",
            "Throughput declining as connected North Sea fields mature"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 3, operatorIntent: 2, environmentalRisk: 3, tenderOpenness: 5 }
    },
    {
        id: 67,
        name: "Chantiers de l'Atlantique - Legacy Yard",
        sector: "Shipping & Marine",
        country: "France",
        year: 2032,
        value: 110,
        tenderStatus: "Not yet awarded",
        selectionDrivers: [
            "Saint-Nazaire shipyard modernization removing obsolete infrastructure",
            "Decommissioning as part of major site renewal programme"
        ],
        readinessFactors: { endOfLife: 3, regulatoryPressure: 2, operatorIntent: 3, environmentalRisk: 2, tenderOpenness: 5 }
    }
];

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
