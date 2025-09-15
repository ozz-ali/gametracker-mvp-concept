// NFL Team Logo URLs from ESPN
const teamLogos = {
    'falcons': 'https://a.espncdn.com/i/teamlogos/nfl/500/atl.png',
    'vikings': 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png',
    'bears': 'https://a.espncdn.com/i/teamlogos/nfl/500/chi.png',
    'lions': 'https://a.espncdn.com/i/teamlogos/nfl/500/det.png',
    'giants': 'https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png',
    'cowboys': 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png',
    'niners': 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png',
    'saints': 'https://a.espncdn.com/i/teamlogos/nfl/500/no.png',
    'seahawks': 'https://a.espncdn.com/i/teamlogos/nfl/500/sea.png',
    'steelers': 'https://a.espncdn.com/i/teamlogos/nfl/500/pit.png',
    'bills': 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png',
    'jets': 'https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png',
    'chiefs': 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
    'raiders': 'https://a.espncdn.com/i/teamlogos/nfl/500/lv.png',
    'broncos': 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png',
    'chargers': 'https://a.espncdn.com/i/teamlogos/nfl/500/lac.png',
    'patriots': 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png',
    'dolphins': 'https://a.espncdn.com/i/teamlogos/nfl/500/mia.png',
    'rams': 'https://a.espncdn.com/i/teamlogos/nfl/500/lar.png',
    'cardinals': 'https://a.espncdn.com/i/teamlogos/nfl/500/ari.png',
    'packers': 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png',
    'ravens': 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png'
};

// Game state management
let selectedGameIndex = -1;

// NFL Game Data with additional games
const nflGames = [
    {
        homeTeam: {
            name: 'Vikings',
            shortName: 'MIN',
            record: '',
            score: 6,
            logo: 'vikings'
        },
        awayTeam: {
            name: 'Falcons',
            shortName: 'ATL',
            record: '',
            score: 15,
            logo: 'falcons'
        },
        status: {
            main: '4TH 11:16',
            network: 'NBC'
        },
        details: null
    },
    {
        homeTeam: {
            name: 'Lions',
            shortName: 'DET',
            record: '1-1',
            score: 52,
            logo: 'lions'
        },
        awayTeam: {
            name: 'Bears',
            shortName: 'CHI',
            record: '0-2',
            score: 21,
            logo: 'bears'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'DET -6.0',
            total: 'OVER 46'
        }
    },
    {
        homeTeam: {
            name: 'Cowboys',
            shortName: 'DAL',
            record: '1-1',
            score: 40,
            logo: 'cowboys'
        },
        awayTeam: {
            name: 'Giants',
            shortName: 'NYG',
            record: '0-2',
            score: 37,
            logo: 'giants'
        },
        status: {
            main: 'FINAL / OT',
            network: ''
        },
        details: {
            spread: 'NYG +5.5',
            total: 'OVER 44.5'
        }
    },
    {
        homeTeam: {
            name: 'Saints',
            shortName: 'NO',
            record: '0-2',
            score: 21,
            logo: 'saints'
        },
        awayTeam: {
            name: '49ers',
            shortName: 'SF',
            record: '2-0',
            score: 26,
            logo: 'niners'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'SF -3.0',
            total: 'OVER 40.5'
        }
    },
    {
        homeTeam: {
            name: 'Steelers',
            shortName: 'PIT',
            record: '1-1',
            score: 17,
            logo: 'steelers'
        },
        awayTeam: {
            name: 'Seahawks',
            shortName: 'SEA',
            record: '1-1',
            score: 31,
            logo: 'seahawks'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'SEA +3.5',
            total: 'OVER 40.5'
        }
    },
    {
        homeTeam: {
            name: 'Jets',
            shortName: 'NYJ',
            record: '0-2',
            score: 10,
            logo: 'jets'
        },
        awayTeam: {
            name: 'Bills',
            shortName: 'BUF',
            record: '2-0',
            score: 30,
            logo: 'bills'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'BUF -6.0',
            total: 'UNDER 47.5'
        }
    },
    // Additional Row 1
    {
        homeTeam: {
            name: 'Raiders',
            shortName: 'LV',
            record: '1-1',
            score: 14,
            logo: 'raiders'
        },
        awayTeam: {
            name: 'Chiefs',
            shortName: 'KC',
            record: '2-0',
            score: 31,
            logo: 'chiefs'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'KC -7.5',
            total: 'UNDER 52'
        }
    },
    {
        homeTeam: {
            name: 'Chargers',
            shortName: 'LAC',
            record: '1-1',
            score: 28,
            logo: 'chargers'
        },
        awayTeam: {
            name: 'Broncos',
            shortName: 'DEN',
            record: '0-2',
            score: 24,
            logo: 'broncos'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'LAC -3.5',
            total: 'OVER 45'
        }
    },
    {
        homeTeam: {
            name: 'Dolphins',
            shortName: 'MIA',
            record: '1-1',
            score: 17,
            logo: 'dolphins'
        },
        awayTeam: {
            name: 'Patriots',
            shortName: 'NE',
            record: '1-1',
            score: 20,
            logo: 'patriots'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'NE -2.5',
            total: 'UNDER 42'
        }
    },
    // Additional Row 2
    {
        homeTeam: {
            name: 'Cardinals',
            shortName: 'ARI',
            record: '0-2',
            score: 21,
            logo: 'cardinals'
        },
        awayTeam: {
            name: 'Rams',
            shortName: 'LAR',
            record: '1-1',
            score: 28,
            logo: 'rams'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'LAR -4.0',
            total: 'OVER 48'
        }
    },
    {
        homeTeam: {
            name: 'Ravens',
            shortName: 'BAL',
            record: '2-0',
            score: 35,
            logo: 'ravens'
        },
        awayTeam: {
            name: 'Packers',
            shortName: 'GB',
            record: '1-1',
            score: 21,
            logo: 'packers'
        },
        status: {
            main: '3RD 8:42',
            network: 'CBS'
        },
        details: null
    },
    {
        homeTeam: {
            name: 'Bears',
            shortName: 'CHI',
            record: '0-3',
            score: 7,
            logo: 'bears'
        },
        awayTeam: {
            name: 'Vikings',
            shortName: 'MIN',
            record: '1-2',
            score: 14,
            logo: 'vikings'
        },
        status: {
            main: '2ND 3:15',
            network: 'FOX'
        },
        details: null
    }
];

// Generate sample detailed game data
function getGameDetails(game, gameIndex) {
    const plays = [
        { quarter: '1st', time: '12:34', team: game.awayTeam.shortName, description: `15 yard pass to Johnson` },
        { quarter: '1st', time: '11:22', team: game.homeTeam.shortName, description: `3 yard rush by Williams` },
        { quarter: '2nd', time: '8:45', team: game.awayTeam.shortName, description: `27 yard field goal - GOOD` },
        { quarter: '2nd', time: '5:12', team: game.homeTeam.shortName, description: `42 yard touchdown pass to Davis` },
        { quarter: '3rd', time: '14:30', team: game.awayTeam.shortName, description: `18 yard rush by Thompson` },
        { quarter: '3rd', time: '9:15', team: game.homeTeam.shortName, description: `35 yard field goal - GOOD` },
        { quarter: '4th', time: '6:42', team: game.awayTeam.shortName, description: `8 yard touchdown run by Martinez` },
        { quarter: '4th', time: '2:18', team: game.homeTeam.shortName, description: `Interception returned 25 yards` }
    ];
    
    const boxScore = {
        [game.awayTeam.shortName]: { 
            q1: Math.floor(game.awayTeam.score * 0.2), 
            q2: Math.floor(game.awayTeam.score * 0.3), 
            q3: Math.floor(game.awayTeam.score * 0.3), 
            q4: game.awayTeam.score - Math.floor(game.awayTeam.score * 0.8), 
            total: game.awayTeam.score 
        },
        [game.homeTeam.shortName]: { 
            q1: Math.floor(game.homeTeam.score * 0.1), 
            q2: Math.floor(game.homeTeam.score * 0.4), 
            q3: Math.floor(game.homeTeam.score * 0.2), 
            q4: game.homeTeam.score - Math.floor(game.homeTeam.score * 0.7), 
            total: game.homeTeam.score 
        }
    };
    
    return { plays, boxScore };
}

// Create details panel content
function createDetailsContent(game, gameIndex) {
    const details = getGameDetails(game, gameIndex);
    const isGameFinished = game.status.main.includes('FINAL');
    
    const highlightsSection = isGameFinished ? `
        <div class="details-section">
            <h4>Game Highlights</h4>
            <div class="highlights-container">
                <div class="video-placeholder">
                    <div class="video-thumbnail">
                        <div class="video-bg">
                            <div class="video-title">Game Highlights</div>
                            <div class="video-duration">4:32</div>
                        </div>
                        <div class="play-button">▶</div>
                    </div>
                    <div class="video-info">
                        <h5>${game.awayTeam.name} @ ${game.homeTeam.name} Highlights</h5>
                        <p>Watch the best moments from this exciting matchup</p>
                    </div>
                </div>
            </div>
        </div>
    ` : '';
    
    return `
        <div class="details-header">
            <div class="details-title">
                <div class="team-logos-header">
                    <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/32x32/666/fff?text=' + game.awayTeam.shortName}" alt="${game.awayTeam.name} logo" class="header-team-logo">
                    <div class="header-scores">
                        <span class="header-score away">${game.awayTeam.score}</span>
                        <span class="vs">-</span>
                        <span class="header-score home">${game.homeTeam.score}</span>
                    </div>
                    <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/32x32/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="header-team-logo">
                </div>
                <h3>${game.awayTeam.name} @ ${game.homeTeam.name}</h3>
                <div class="header-status">${game.status.main}</div>
            </div>
            <button class="close-btn" onclick="closeGameDetails()" aria-label="Close details">&times;</button>
        </div>
        
        <div class="details-body">
            ${highlightsSection}
            
            <div class="details-section">
                <h4>Box Score</h4>
                <table class="score-table">
                    <thead>
                        <tr><th>Team</th><th>1st</th><th>2nd</th><th>3rd</th><th>4th</th><th>Total</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="team-with-logo">
                                    <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/24x24/666/fff?text=' + game.awayTeam.shortName}" alt="${game.awayTeam.name} logo" class="table-team-logo">
                                    <strong>${game.awayTeam.name}</strong>
                                </div>
                            </td>
                            <td>${details.boxScore[game.awayTeam.shortName].q1}</td>
                            <td>${details.boxScore[game.awayTeam.shortName].q2}</td>
                            <td>${details.boxScore[game.awayTeam.shortName].q3}</td>
                            <td>${details.boxScore[game.awayTeam.shortName].q4}</td>
                            <td>${details.boxScore[game.awayTeam.shortName].total}</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="team-with-logo">
                                    <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/24x24/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="table-team-logo">
                                    <strong>${game.homeTeam.name}</strong>
                                </div>
                            </td>
                            <td>${details.boxScore[game.homeTeam.shortName].q1}</td>
                            <td>${details.boxScore[game.homeTeam.shortName].q2}</td>
                            <td>${details.boxScore[game.homeTeam.shortName].q3}</td>
                            <td>${details.boxScore[game.homeTeam.shortName].q4}</td>
                            <td>${details.boxScore[game.homeTeam.shortName].total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="details-section">
                <h4>Recent Plays</h4>
                <div class="plays-container">
                    ${details.plays.map(play => `
                        <div class="play-item">
                            <div class="play-time">${play.quarter} ${play.time}</div>
                            <div class="play-team">${play.team}</div>
                            <div class="play-description">${play.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="details-section">
                <h4>Team Statistics</h4>
                <div class="stats-grid">
                    <div class="stats-header">
                        <span class="stat-category">Category</span>
                        <span class="stat-team">${game.awayTeam.shortName}</span>
                        <span class="stat-team">${game.homeTeam.shortName}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-category">Total Yards</span>
                        <span class="stat-value">342</span>
                        <span class="stat-value">289</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-category">Passing Yards</span>
                        <span class="stat-value">245</span>
                        <span class="stat-value">198</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-category">Rushing Yards</span>
                        <span class="stat-value">97</span>
                        <span class="stat-value">91</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-category">Turnovers</span>
                        <span class="stat-value">1</span>
                        <span class="stat-value">2</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-category">Time of Possession</span>
                        <span class="stat-value">32:15</span>
                        <span class="stat-value">27:45</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Check if mobile viewport
function isMobile() {
    return window.innerWidth <= 1024;
}

// Toggle game selection
function toggleGameDetails(gameIndex) {
    if (selectedGameIndex === gameIndex) {
        closeGameDetails();
    } else {
        selectedGameIndex = gameIndex;
        updateLayout();
    }
}

// Close game details
function closeGameDetails() {
    selectedGameIndex = -1;
    updateLayout();
}

// Update the entire layout
function updateLayout() {
    if (isMobile()) {
        updateMobileLayout();
    } else {
        updateDesktopLayout();
    }
}

// Update desktop layout
function updateDesktopLayout() {
    populateGames();
    updateDetailsPanel();
    updateLayoutClasses();
}

// Update mobile layout with inline expansion
function updateMobileLayout() {
    populateGamesWithMobileDetails();
    updateLayoutClasses();
}

// Update layout classes for responsive design
function updateLayoutClasses() {
    const contentLayout = document.getElementById('contentLayout');
    const detailsPanel = document.getElementById('detailsPanel');
    
    if (selectedGameIndex >= 0 && !isMobile()) {
        contentLayout.classList.add('has-selection');
        detailsPanel.classList.add('visible');
    } else {
        contentLayout.classList.remove('has-selection');
        if (detailsPanel) detailsPanel.classList.remove('visible');
    }
}

// Update details panel content (desktop only)
function updateDetailsPanel() {
    const detailsPanel = document.getElementById('detailsPanel');
    if (!detailsPanel || isMobile()) return;
    
    if (selectedGameIndex >= 0) {
        const game = nflGames[selectedGameIndex];
        detailsPanel.innerHTML = createDetailsContent(game, selectedGameIndex);
    } else {
        detailsPanel.innerHTML = '';
    }
}

// Create mobile details content
function createMobileDetailsContent(game, gameIndex) {
    const details = getGameDetails(game, gameIndex);
    const isGameFinished = game.status.main.includes('FINAL');
    
    const highlightsSection = isGameFinished ? `
        <div class="details-section">
            <h4>Game Highlights</h4>
            <div class="highlights-container">
                <div class="video-placeholder">
                    <div class="video-thumbnail">
                        <div class="video-bg">
                            <div class="video-title">Game Highlights</div>
                            <div class="video-duration">4:32</div>
                        </div>
                        <div class="play-button">▶</div>
                    </div>
                    <div class="video-info">
                        <h5>${game.awayTeam.name} @ ${game.homeTeam.name} Highlights</h5>
                        <p>Watch the best moments from this exciting matchup</p>
                    </div>
                </div>
            </div>
        </div>
    ` : '';
    
    return `
        <div class="mobile-details" id="mobileDetails-${gameIndex}">
            <div class="details-header">
                <div class="details-title">
                    <div class="team-logos-header">
                        <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/32x32/666/fff?text=' + game.awayTeam.shortName}" alt="${game.awayTeam.name} logo" class="header-team-logo">
                        <div class="header-scores">
                            <span class="header-score away">${game.awayTeam.score}</span>
                            <span class="vs">-</span>
                            <span class="header-score home">${game.homeTeam.score}</span>
                        </div>
                        <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/32x32/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="header-team-logo">
                    </div>
                    <h3>${game.awayTeam.name} @ ${game.homeTeam.name}</h3>
                    <div class="header-status">${game.status.main}</div>
                </div>
                <button class="close-btn" onclick="closeGameDetails()" aria-label="Close details">&times;</button>
            </div>
            
            <div class="mobile-details-body">
                ${highlightsSection}
                
                <div class="details-section">
                    <h4>Box Score</h4>
                    <table class="score-table">
                        <thead>
                            <tr><th>Team</th><th>1st</th><th>2nd</th><th>3rd</th><th>4th</th><th>Total</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="team-with-logo">
                                        <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/20x20/666/fff?text=' + game.awayTeam.shortName}" alt="${game.awayTeam.name} logo" class="table-team-logo mobile">
                                        <strong>${game.awayTeam.name}</strong>
                                    </div>
                                </td>
                                <td>${details.boxScore[game.awayTeam.shortName].q1}</td>
                                <td>${details.boxScore[game.awayTeam.shortName].q2}</td>
                                <td>${details.boxScore[game.awayTeam.shortName].q3}</td>
                                <td>${details.boxScore[game.awayTeam.shortName].q4}</td>
                                <td>${details.boxScore[game.awayTeam.shortName].total}</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="team-with-logo">
                                        <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/20x20/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="table-team-logo mobile">
                                        <strong>${game.homeTeam.name}</strong>
                                    </div>
                                </td>
                                <td>${details.boxScore[game.homeTeam.shortName].q1}</td>
                                <td>${details.boxScore[game.homeTeam.shortName].q2}</td>
                                <td>${details.boxScore[game.homeTeam.shortName].q3}</td>
                                <td>${details.boxScore[game.homeTeam.shortName].q4}</td>
                                <td>${details.boxScore[game.homeTeam.shortName].total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="details-section">
                    <h4>Recent Plays</h4>
                    <div class="plays-container">
                        ${details.plays.map(play => `
                            <div class="play-item">
                                <div class="play-time">${play.quarter} ${play.time}</div>
                                <div class="play-team">${play.team}</div>
                                <div class="play-description">${play.description}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="details-section">
                    <h4>Team Statistics</h4>
                    <div class="stats-grid">
                        <div class="stats-header">
                            <span class="stat-category">Category</span>
                            <span class="stat-team">${game.awayTeam.shortName}</span>
                            <span class="stat-team">${game.homeTeam.shortName}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-category">Total Yards</span>
                            <span class="stat-value">342</span>
                            <span class="stat-value">289</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-category">Passing Yards</span>
                            <span class="stat-value">245</span>
                            <span class="stat-value">198</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-category">Rushing Yards</span>
                            <span class="stat-value">97</span>
                            <span class="stat-value">91</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-category">Turnovers</span>
                            <span class="stat-value">1</span>
                            <span class="stat-value">2</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-category">Time of Possession</span>
                            <span class="stat-value">32:15</span>
                            <span class="stat-value">27:45</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Populate games with mobile inline details
function populateGamesWithMobileDetails() {
    const gamesContainer = document.getElementById('gamesContainer');
    if (!gamesContainer) return;
    
    let gameCardsHtml = '';
    
    nflGames.forEach((game, index) => {
        // Add the game card
        gameCardsHtml += createGameCard(game, index);
        
        // Add mobile details if this game is selected
        if (selectedGameIndex === index) {
            gameCardsHtml += createMobileDetailsContent(game, index);
        }
    });
    
    gamesContainer.innerHTML = gameCardsHtml;
    
    // Animate the mobile details in
    if (selectedGameIndex >= 0) {
        setTimeout(() => {
            const mobileDetails = document.getElementById(`mobileDetails-${selectedGameIndex}`);
            if (mobileDetails) {
                mobileDetails.classList.add('visible');
                // Scroll the selected card into view
                const selectedCard = document.querySelector(`[data-game-index="${selectedGameIndex}"]`);
                if (selectedCard) {
                    selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }, 50);
    }
}

// Function to create a game card HTML
function createGameCard(game, gameIndex) {
    const isSelected = selectedGameIndex === gameIndex;
    
    const statusHtml = game.status.network 
        ? `<div class="status-main">${game.status.main}</div><div class="status-network">${game.status.network}</div>`
        : `<div class="status-main">${game.status.main}</div>`;
    
    const detailsHtml = game.details 
        ? `<div class="game-details">
               <div class="detail-item">
                   <span class="detail-label">${game.details.spread.split(' ')[0]} ${game.details.spread.split(' ')[1]}</span>
                   <span class="detail-value">${game.details.total.split(' ')[0]} ${game.details.total.split(' ')[1]}</span>
               </div>
           </div>`
        : '';

    const hintText = isSelected ? 'Selected' : 'Click to view details';

    return `
        <div class="game-card ${isSelected ? 'selected' : ''}" 
             data-game-index="${gameIndex}" 
             onclick="toggleGameDetails(${gameIndex})">
            
            <div class="game-status">
                ${statusHtml}
            </div>
            
            <div class="teams-container">
                <div class="team">
                    <div class="team-info">
                        <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/32x32/666/fff?text=' + game.awayTeam.shortName}" alt="${game.awayTeam.name} logo" class="team-logo">
                        <div>
                            <span class="team-name">${game.awayTeam.name}</span>
                            ${game.awayTeam.record ? `<span class="team-record">${game.awayTeam.record}</span>` : ''}
                        </div>
                    </div>
                    <div class="team-score">${game.awayTeam.score}</div>
                </div>
                
                <div class="team">
                    <div class="team-info">
                        <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/32x32/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="team-logo">
                        <div>
                            <span class="team-name">${game.homeTeam.name}</span>
                            ${game.homeTeam.record ? `<span class="team-record">${game.homeTeam.record}</span>` : ''}
                        </div>
                    </div>
                    <div class="team-score">${game.homeTeam.score}</div>
                </div>
            </div>
            
            ${detailsHtml}
            
            <div class="select-hint">${hintText}</div>
        </div>
    `;
}

// Function to populate games
function populateGames() {
    const gamesContainer = document.getElementById('gamesContainer');
    if (!gamesContainer) return;
    
    const gameCardsHtml = nflGames.map((game, index) => createGameCard(game, index)).join('');
    gamesContainer.innerHTML = gameCardsHtml;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateLayout();
    
    // Close details panel when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && selectedGameIndex >= 0) {
            closeGameDetails();
        }
    });
    
    // Handle window resize to switch between mobile/desktop views
    window.addEventListener('resize', function() {
        updateLayout();
    });
});