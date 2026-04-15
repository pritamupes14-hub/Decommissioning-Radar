document.addEventListener('DOMContentLoaded', () => {
    // ===================================================
    // 0. READINESS SCORE ENGINE
    // ===================================================
    const WEIGHTS = {
        endOfLife: 0.20,
        regulatoryPressure: 0.20,
        operatorIntent: 0.25,
        environmentalRisk: 0.15,
        tenderOpenness: 0.20
    };

    const FACTOR_LABELS = {
        endOfLife: "End-of-Life Proximity",
        regulatoryPressure: "Regulatory Pressure",
        operatorIntent: "Operator Intent to Close",
        environmentalRisk: "Environmental Risk",
        tenderOpenness: "Tender Openness"
    };

    function computeReadinessScore(asset) {
        const f = asset.readinessFactors;
        return (f.endOfLife * WEIGHTS.endOfLife) +
               (f.regulatoryPressure * WEIGHTS.regulatoryPressure) +
               (f.operatorIntent * WEIGHTS.operatorIntent) +
               (f.environmentalRisk * WEIGHTS.environmentalRisk) +
               (f.tenderOpenness * WEIGHTS.tenderOpenness);
    }

    function getScoreLabel(score) {
        if (score >= 4.0) return { label: "Imminent", cssClass: "score-imminent", colorHex: "#e0044e" };
        if (score >= 3.0) return { label: "Likely", cssClass: "score-likely", colorHex: "#ff9800" };
        if (score >= 2.0) return { label: "Developing", cssClass: "score-developing", colorHex: "#ffc107" };
        return { label: "Watch", cssClass: "score-watch", colorHex: "#4caf50" };
    }

    // Filter out nuclear assets globally
    // IDs of assets already fully decommissioned (verified April 2026)
    const EXCLUDED_IDS = new Set([
        25,  // Runcorn Chlorine Mercury Cell Plant — fully decommissioned in 2016
    ]);

    const filteredMockData = mockData.filter(d => {
        if (EXCLUDED_IDS.has(d.id)) return false;
        const name = d.name.toLowerCase();
        const sector = d.sector.toLowerCase();
        return !name.includes('nuclear') && !name.includes('magnox') && !name.includes('wylfa') && !sector.includes('nuclear');
    });

    // ===================================================
    // 1. SIMULATION LOGIC
    // ===================================================
    const overlay = document.getElementById('simulation-overlay');
    const dashboard = document.getElementById('dashboard');
    const terminal = document.getElementById('terminal');
    const progressBar = document.getElementById('progress-bar');
    const refreshBtn = document.getElementById('refresh-scan-btn');

    function runSimulation() {
        overlay.classList.remove('hidden');
        overlay.classList.remove('fade-out');
        dashboard.classList.add('hidden');
        terminal.innerHTML = '';
        progressBar.style.width = '0%';

        let delay = 0;
        scanLogs.forEach((log, index) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.className = 'terminal-line';
                if (log.includes('[SUCCESS]')) p.classList.add('success');
                p.textContent = log;
                terminal.appendChild(p);
                terminal.scrollTop = terminal.scrollHeight;
                const progress = ((index + 1) / scanLogs.length) * 100;
                progressBar.style.width = `${progress}%`;
            }, delay);
            delay += 450 + Math.random() * 350;
        });

        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.classList.add('hidden');
                dashboard.classList.remove('hidden');
                initDashboard();
            }, 900);
        }, delay + 400);
    }

    refreshBtn.addEventListener('click', runSimulation);
    runSimulation();

    // ===================================================
    // 2. DASHBOARD LOGIC
    // ===================================================
    let charts = {};

    function initDashboard() {
        const yearFilter = document.getElementById('filter-year').value;
        const countryFilter = document.getElementById('filter-country').value;
        const sectorFilter = document.getElementById('filter-sector').value;

        let data = filteredMockData;
        if (yearFilter !== 'all') data = data.filter(d => d.year.toString() === yearFilter);
        if (countryFilter !== 'all') data = data.filter(d => d.country === countryFilter);
        if (sectorFilter !== 'all') data = data.filter(d => d.sector === sectorFilter);

        data.sort((a, b) => computeReadinessScore(b) - computeReadinessScore(a));

        updateKPIs(data);
        renderCharts(data);
        renderTable(data);
        populateFiltersFromData();
    }

    function populateFiltersFromData() {
        const yearSet = new Set(filteredMockData.map(d => d.year));
        const yearFilter = document.getElementById('filter-year');
        const currentYear = yearFilter.value;
        yearFilter.innerHTML = '<option value="all">All Years</option>';
        [...yearSet].sort().forEach(y => {
            yearFilter.innerHTML += `<option value="${y}" ${y.toString() === currentYear ? 'selected' : ''}>${y}</option>`;
        });

        const countrySet = new Set(filteredMockData.map(d => d.country));
        const countryFilter = document.getElementById('filter-country');
        const currentCountry = countryFilter.value;
        countryFilter.innerHTML = '<option value="all">All Countries</option>';
        [...countrySet].sort().forEach(c => {
            countryFilter.innerHTML += `<option value="${c}" ${c === currentCountry ? 'selected' : ''}>${c}</option>`;
        });

        const sectorSet = new Set(filteredMockData.map(d => d.sector));
        const sectorFilter = document.getElementById('filter-sector');
        const currentSector = sectorFilter.value;
        sectorFilter.innerHTML = '<option value="all">All Sectors</option>';
        [...sectorSet].sort().forEach(s => {
            sectorFilter.innerHTML += `<option value="${s}" ${s === currentSector ? 'selected' : ''}>${s}</option>`;
        });
    }

    function updateKPIs(data) {
        document.getElementById('kpi-total-assets').textContent = data.length;

        const totalValue = data.reduce((sum, item) => sum + item.value, 0);
        document.getElementById('kpi-total-value').textContent = `€${totalValue.toLocaleString()}M`;

        // Top Sector
        const counts = data.reduce((acc, curr) => {
            acc[curr.sector] = (acc[curr.sector] || 0) + 1;
            return acc;
        }, {});
        const topSector = Object.keys(counts).length > 0
            ? Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
            : "--";
        document.getElementById('kpi-top-sector').textContent = topSector;

        // Opportunities in Next 2 Years (dynamic from current year)
        const currentYear = new Date().getFullYear();
        const next2YearsData = data.filter(d => d.year === currentYear + 1 || d.year === currentYear + 2);
        document.getElementById('kpi-critical').textContent = next2YearsData.length;

        // Update label dynamically
        const labelEl = document.getElementById('kpi-critical-label');
        if (labelEl) {
            labelEl.textContent = `Opportunities in Next 2 Years (${currentYear + 1}–${currentYear + 2})`;
        }
    }

    // ===================================================
    // CHART DEFAULTS
    // ===================================================
    Chart.defaults.color = '#888';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 11;

    const sectorColors = {
        'Oil & Gas': { bg: 'rgba(50, 101, 170, 0.75)', border: '#3265aa' },
        'Wind': { bg: 'rgba(76, 180, 230, 0.75)', border: '#4cb4e6' },
        'Refinery & Petrochemical': { bg: 'rgba(153, 53, 132, 0.75)', border: '#993584' },
        'Chemical': { bg: 'rgba(119, 110, 169, 0.75)', border: '#776ea9' },
        'Bioenergy': { bg: 'rgba(224, 4, 78, 0.75)', border: '#e0044e' },
        'Power': { bg: 'rgba(255, 152, 0, 0.75)', border: '#ff9800' },
        'Shipping & Marine': { bg: 'rgba(0, 150, 136, 0.75)', border: '#009688' },
        'Other Industrial': { bg: 'rgba(121, 85, 72, 0.75)', border: '#795548' }
    };

    function renderCharts(data) {
        if (charts.timeline) charts.timeline.destroy();
        if (charts.sector) charts.sector.destroy();
        if (charts.country) charts.country.destroy();

        // 1. Timeline Chart
        const yearCounts = data.reduce((acc, curr) => {
            acc[curr.year] = (acc[curr.year] || 0) + 1;
            return acc;
        }, {});
        const years = Object.keys(yearCounts).sort();
        const yCounts = years.map(y => yearCounts[y]);

        const ctxTime = document.getElementById('timelineChart').getContext('2d');
        charts.timeline = new Chart(ctxTime, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Opportunities',
                    data: yCounts,
                    borderColor: '#e0044e',
                    backgroundColor: 'rgba(224, 4, 78, 0.08)',
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#e0044e',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { stepSize: 5, font: { size: 11 } } },
                    x: { grid: { display: false }, ticks: { font: { size: 11 } } }
                },
                plugins: { legend: { display: false } }
            }
        });

        // 2. Sector Chart (Doughnut)
        const sectorCounts = data.reduce((acc, curr) => {
            acc[curr.sector] = (acc[curr.sector] || 0) + 1;
            return acc;
        }, {});

        const ctxSector = document.getElementById('sectorChart').getContext('2d');
        charts.sector = new Chart(ctxSector, {
            type: 'doughnut',
            data: {
                labels: Object.keys(sectorCounts),
                datasets: [{
                    data: Object.values(sectorCounts),
                    backgroundColor: Object.keys(sectorCounts).map(s => (sectorColors[s] || { bg: '#888' }).bg),
                    borderColor: '#fff',
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#666',
                            font: { size: 10 },
                            boxWidth: 12,
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                }
            }
        });

        // 3. Country Chart (Horizontal Bar for better label visibility)
        const countryCounts = data.reduce((acc, curr) => {
            acc[curr.country] = (acc[curr.country] || 0) + 1;
            return acc;
        }, {});
        const countries = Object.keys(countryCounts).sort((a, b) => countryCounts[b] - countryCounts[a]);
        const cCounts = countries.map(c => countryCounts[c]);

        const ctxCountry = document.getElementById('countryChart').getContext('2d');
        charts.country = new Chart(ctxCountry, {
            type: 'bar',
            data: {
                labels: countries,
                datasets: [{
                    label: 'Opportunities',
                    data: cCounts,
                    backgroundColor: countries.map((_, i) => {
                        const colors = ['#3265aa', '#993584', '#e0044e', '#4cb4e6', '#776ea9', '#ff9800', '#009688', '#795548', '#607d8b', '#9c27b0', '#ff5722', '#3f51b5', '#00bcd4', '#cddc39'];
                        return colors[i % colors.length] + 'cc';
                    }),
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 6,
                    maxBarThickness: 50
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.04)' },
                        ticks: { stepSize: 2, font: { size: 11 } }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { font: { size: 11, weight: '600' }, color: '#444' }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // ===================================================
    // 3. TABLE RENDERING
    // ===================================================
    function getSectorBadgeClass(sector) {
        const map = {
            'Oil & Gas': 'oil', 'Wind': 'wind',
            'Refinery & Petrochemical': 'petrochemical', 'Chemical': 'chemical',
            'Bioenergy': 'bioenergy', 'Power': 'power',
            'Shipping & Marine': 'shipping', 'Other Industrial': 'other-industrial'
        };
        return map[sector] || 'other-industrial';
    }

    function renderTable(data) {
        const tbody = document.getElementById('asset-table-body');
        tbody.innerHTML = '';

        data.forEach(item => {
            const score = computeReadinessScore(item);
            const scoreInfo = getScoreLabel(score);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="asset-name-cell"><strong class="asset-name-hover" data-id="${item.id}">${item.name}</strong></td>
                <td><span class="sector-badge ${getSectorBadgeClass(item.sector)}">${item.sector}</span></td>
                <td>${item.country}</td>
                <td>${item.year}</td>
                <td>€${item.value}M <span class="estimate-tag">est.</span></td>
                <td><span class="readiness-badge ${scoreInfo.cssClass}"><span class="readiness-dot ${scoreInfo.cssClass}"></span>${scoreInfo.label} (${score.toFixed(1)})</span></td>
                <td><button class="action-btn" data-id="${item.id}">Analyze</button></td>
            `;
            tbody.appendChild(tr);
        });
        setupHoverPopups();
    }

    // ===================================================
    // HOVER POPUP
    // ===================================================
    let activePopup = null;

    function setupHoverPopups() {
        document.querySelectorAll('.asset-name-hover').forEach(el => {
            el.addEventListener('mouseenter', () => {
                const itemId = parseInt(el.getAttribute('data-id'));
                const item = filteredMockData.find(d => d.id === itemId);
                if (!item) return;
                removePopup();

                const score = computeReadinessScore(item);
                const scoreInfo = getScoreLabel(score);
                const popup = document.createElement('div');
                popup.className = 'hover-popup';
                popup.innerHTML = `
                    <div class="hover-popup-header">
                        <span class="readiness-dot ${scoreInfo.cssClass}"></span>
                        <strong>${scoreInfo.label} (${score.toFixed(1)}/5.0)</strong>
                    </div>
                    <h4>Why This Asset?</h4>
                    <ul>${item.selectionDrivers.map(d => `<li>${d}</li>`).join('')}</ul>
                    <div class="hover-popup-factors">
                        ${Object.entries(item.readinessFactors).map(([key, val]) => `
                            <div class="factor-row">
                                <span class="factor-label">${FACTOR_LABELS[key]}</span>
                                <div class="factor-bar-track"><div class="factor-bar-fill" style="width: ${(val / 5) * 100}%;"></div></div>
                                <span class="factor-val">${val}/5</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                document.body.appendChild(popup);
                activePopup = popup;

                const rect = el.getBoundingClientRect();
                let top = rect.bottom + window.scrollY + 6;
                let left = rect.left + window.scrollX;
                const popupRect = popup.getBoundingClientRect();
                if (left + popupRect.width > window.innerWidth) left = window.innerWidth - popupRect.width - 12;
                if (top + popupRect.height > window.innerHeight + window.scrollY) top = rect.top + window.scrollY - popupRect.height - 6;
                popup.style.top = `${top}px`;
                popup.style.left = `${left}px`;
                popup.style.opacity = '1';
            });
            el.addEventListener('mouseleave', removePopup);
        });
    }

    function removePopup() {
        if (activePopup) { activePopup.remove(); activePopup = null; }
    }

    // ===================================================
    // 4. FILTER LOGIC
    // ===================================================
    ['filter-year', 'filter-country', 'filter-sector'].forEach(id => {
        document.getElementById(id).addEventListener('change', initDashboard);
    });

    // ===================================================
    // 5. MODAL — ENRICHED ANALYSIS
    // ===================================================
    const modal = document.getElementById('analysis-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

    document.getElementById('asset-table-body').addEventListener('click', (e) => {
        if (e.target.classList.contains('action-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const item = filteredMockData.find(d => d.id === itemId);
            if (item) openAnalysisModal(item);
        }
    });

    function openAnalysisModal(item) {
        const score = computeReadinessScore(item);
        const scoreInfo = getScoreLabel(score);
        document.getElementById('modal-asset-name').textContent = item.name + " — Intelligence Brief";
        document.getElementById('modal-analysis-text').innerHTML = buildAnalysisHTML(item, score, scoreInfo);
        modal.classList.remove('hidden');
    }

    function buildAnalysisHTML(item, score, scoreInfo) {
        let html = `
            <div class="analysis-section">
                <h4>🔍 Why This Asset Was Selected</h4>
                <ul class="driver-list">${item.selectionDrivers.map(d => `<li>${d}</li>`).join('')}</ul>
            </div>
            <div class="analysis-section">
                <h4>📊 Readiness Score Breakdown</h4>
                <div class="score-summary">
                    <span class="readiness-dot large ${scoreInfo.cssClass}"></span>
                    <span class="score-value">${score.toFixed(2)} / 5.00</span>
                    <span class="readiness-badge ${scoreInfo.cssClass}">${scoreInfo.label}</span>
                </div>
                <div class="score-breakdown">
                    ${Object.entries(item.readinessFactors).map(([key, val]) => `
                        <div class="score-factor">
                            <div class="score-factor-header">
                                <span>${FACTOR_LABELS[key]}</span>
                                <span class="score-factor-weight">(Weight: ${(WEIGHTS[key] * 100).toFixed(0)}%)</span>
                                <span class="score-factor-val">${val}/5</span>
                            </div>
                            <div class="score-bar-track"><div class="score-bar-fill ${scoreInfo.cssClass}" style="width: ${(val / 5) * 100}%;"></div></div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="analysis-section">
                <h4>💰 Estimated Remediation Value — €${item.value}M <span class="estimate-tag">estimate</span></h4>
                <p class="value-rationale">${item.valueBasis}</p>
            </div>
            <div class="analysis-section">
                <h4>📄 Public Sources & Evidence</h4>
                <ul class="source-list">${item.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer" class="source-link">${s.label} ↗</a></li>`).join('')}</ul>
            </div>
            <div class="analysis-section">
                <h4>📋 Tender Status</h4>
                <p><span class="tender-status-badge">${item.tenderStatus}</span></p>
            </div>
        `;
        return html;
    }

    // ===================================================
    // 6. SIDEBAR NAVIGATION
    // ===================================================
    const navAssets = document.getElementById('nav-assets');
    const navNews = document.getElementById('nav-news');
    const navTenders = document.getElementById('nav-tenders');
    const navExport = document.getElementById('nav-export');
    const navBtns = [navAssets, navNews, navTenders, navExport];

    const dashboardCore = document.getElementById('dashboard-core-views');
    const sectionNews = document.getElementById('section-news');
    const sectionTenders = document.getElementById('section-tenders');

    function setActiveNav(btn) {
        navBtns.forEach(b => { if (b) b.parentElement.classList.remove('active'); });
        if (btn && btn !== navExport) btn.parentElement.classList.add('active');
    }

    function toggleView(view) {
        dashboardCore.classList.add('hidden');
        sectionNews.classList.add('hidden');
        if (sectionTenders) sectionTenders.classList.add('hidden');

        if (view === 'dashboard') dashboardCore.classList.remove('hidden');
        else if (view === 'news') {
            sectionNews.classList.remove('hidden');
            renderFeed(mockNews, 'news-feed');
            drawMapSafe(mockNews, 'news-map', '#993584');
        } else if (view === 'tenders') {
            sectionTenders.classList.remove('hidden');
            renderFeed(mockTenders, 'tenders-feed');
            drawMapSafe(mockTenders, 'tenders-map', '#3265aa');
        }
    }

    if (navAssets) navAssets.addEventListener('click', () => { setActiveNav(navAssets); toggleView('dashboard'); });
    if (navNews) navNews.addEventListener('click', () => { setActiveNav(navNews); toggleView('news'); });
    if (navTenders) navTenders.addEventListener('click', () => { setActiveNav(navTenders); toggleView('tenders'); });

    // ===================================================
    // 7. FEED RENDERING & DATE FILTERS
    // ===================================================
    function renderFeed(data, containerId) {
        const feed = document.getElementById(containerId);
        if (!feed) return;
        feed.innerHTML = '';
        if (data.length === 0) {
            feed.innerHTML = '<p style="color:var(--text-muted); grid-column: 1/-1;">No data found.</p>';
            return;
        }
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        sorted.forEach(item => {
            const badgeClass = getSectorBadgeClass(item.sector);
            feed.innerHTML += `
                <div class="news-card">
                    <div class="news-meta"><span class="sector-badge ${badgeClass}">${item.category}</span><span>${item.date}</span></div>
                    <h3 class="news-title">${item.title}</h3>
                    <div class="news-source">${item.source} ${item.country ? '– ' + item.country : ''}</div>
                    <a href="${item.link}" target="_blank" class="news-link">Read More →</a>
                </div>
            `;
        });
    }

    function hookDateFilter(btnId, startId, endId, sourceData, renderTarget, mapId, mapColor) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        btn.addEventListener('click', () => {
            const start = document.getElementById(startId).value;
            const end = document.getElementById(endId).value;
            let filtered = sourceData;
            if (start) filtered = filtered.filter(n => new Date(n.date) >= new Date(start));
            if (end) filtered = filtered.filter(n => new Date(n.date) <= new Date(end));
            renderFeed(filtered, renderTarget);
            drawMapSafe(filtered, mapId, mapColor);
        });
    }

    hookDateFilter('btn-filter-news', 'news-date-start', 'news-date-end', mockNews, 'news-feed', 'news-map', '#993584');
    hookDateFilter('btn-filter-tenders', 'tenders-date-start', 'tenders-date-end', mockTenders, 'tenders-feed', 'tenders-map', '#3265aa');

    // ===================================================
    // 8. GOOGLE GEOCHARTS
    // ===================================================
    let googleChartsLoaded = false;
    let pendingMapCalls = []; // queue map draws until Google Charts is ready

    function drawMapSafe(data, containerId, heatColor) {
        if (googleChartsLoaded) {
            drawMap(data, containerId, heatColor);
        } else {
            pendingMapCalls.push({ data, containerId, heatColor });
        }
    }

    if (typeof google !== 'undefined') {
        google.charts.load('current', { 'packages': ['geochart'] });
        google.charts.setOnLoadCallback(() => {
            googleChartsLoaded = true;
            // Flush any queued map draws
            pendingMapCalls.forEach(call => drawMap(call.data, call.containerId, call.heatColor));
            pendingMapCalls = [];
        });
    }

    function drawMap(data, containerId, heatColor) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Google GeoCharts requires full country names for proper region coloring
        const COUNTRY_MAP = {
            'UK': 'United Kingdom',
            'Netherlands': 'Netherlands',
            'Germany': 'Germany',
            'Norway': 'Norway',
            'Denmark': 'Denmark',
            'Sweden': 'Sweden',
            'Italy': 'Italy',
            'Belgium': 'Belgium',
            'France': 'France',
            'Spain': 'Spain',
            'Switzerland': 'Switzerland',
            'Poland': 'Poland',
            'Finland': 'Finland',
            'Portugal': 'Portugal',
            'Greece': 'Greece',
            'Ireland': 'Ireland'
        };

        const counts = {};
        data.forEach(d => {
            if (d.country) {
                const mapped = COUNTRY_MAP[d.country] || d.country;
                counts[mapped] = (counts[mapped] || 0) + 1;
            }
        });
        const arrData = [['Country', 'Items']];
        Object.entries(counts).forEach(([c, v]) => arrData.push([c, v]));
        const dt = google.visualization.arrayToDataTable(arrData);
        const options = {
            region: '150',
            displayMode: 'regions',
            resolution: 'countries',
            colorAxis: { colors: ['#e2e8f0', heatColor] },
            backgroundColor: 'transparent',
            datalessRegionColor: '#f8f9fa',
            legend: { position: 'bottom', textStyle: { color: '#666', fontSize: 11 } },
            tooltip: { textStyle: { fontName: 'Inter' } }
        };
        new google.visualization.GeoChart(container).draw(dt, options);
    }

    // ===================================================
    // 9. EXPORT LOGIC
    // ===================================================
    if (navExport) {
        navExport.addEventListener('click', () => {
            setActiveNav(navAssets);
            toggleView('dashboard');
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Asset Name,Sector,Country,Year,Est Value (EUR M),Readiness Score,Label,Tender Status,Selection Drivers\n";
            filteredMockData.forEach(row => {
                const score = computeReadinessScore(row);
                const label = getScoreLabel(score).label;
                const drivers = row.selectionDrivers.join(' | ').replace(/"/g, "'");
                csvContent += `"${row.name}","${row.sector}","${row.country}",${row.year},${row.value},${score.toFixed(2)},"${label}","${row.tenderStatus}","${drivers}"\n`;
            });
            const link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", "Decommissioning_Radar_Intelligence.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // ===================================================
    // 10. INFO TOOLTIP SYSTEM (ⓘ buttons)
    // ===================================================
    const infoTooltip = document.getElementById('info-tooltip');

    document.addEventListener('mouseenter', (e) => {
        if (e.target.classList && e.target.classList.contains('info-btn')) {
            const text = e.target.getAttribute('data-tooltip');
            if (!text) return;
            infoTooltip.textContent = text;
            infoTooltip.classList.remove('hidden');

            const rect = e.target.getBoundingClientRect();
            let top = rect.bottom + 8;
            let left = rect.left - 100;

            // Keep in viewport
            if (left < 8) left = 8;
            if (left + 340 > window.innerWidth) left = window.innerWidth - 350;
            if (top + 200 > window.innerHeight) top = rect.top - 8 - infoTooltip.offsetHeight;

            infoTooltip.style.top = `${top}px`;
            infoTooltip.style.left = `${left}px`;
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        if (e.target.classList && e.target.classList.contains('info-btn')) {
            infoTooltip.classList.add('hidden');
        }
    }, true);

});
