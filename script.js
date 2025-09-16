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
let liveUpdateIntervals = new Map();
let gamePlayHistories = new Map();
let scrollTimeout = null;
let isFullPageView = false;
let isFullscreenModal = false;

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

// Helper function to determine if a game is live
function isGameLive(game) {
    const status = game.status.main;
    // Live games have quarter and time (e.g., "1ST 14:32", "2ND 8:15", "3RD 11:22", "4TH 5:43")
    // or contain halftime/overtime indicators
    return /^\d+(ST|ND|RD|TH)\s+\d+:\d+$/.test(status) || 
           status.includes('HALFTIME') || 
           status.includes('OT ');
}

// Sort games with live games first
function getSortedGames() {
    return [...nflGames].sort((a, b) => {
        const aLive = isGameLive(a);
        const bLive = isGameLive(b);
        
        if (aLive && !bLive) return -1;
        if (!aLive && bLive) return 1;
        return 0; // Maintain original order within live/non-live groups
    });
}

// Generate live play data
function generateLivePlay(game) {
    const teams = [game.homeTeam.shortName, game.awayTeam.shortName];
    const team = teams[Math.floor(Math.random() * teams.length)];
    
    const playTypes = [
        `${Math.floor(Math.random() * 25) + 5} yard pass to ${getRandomPlayerName()}`,
        `${Math.floor(Math.random() * 15) + 1} yard rush by ${getRandomPlayerName()}`,
        `${Math.floor(Math.random() * 50) + 20} yard field goal - GOOD`,
        `${Math.floor(Math.random() * 40) + 15} yard touchdown pass to ${getRandomPlayerName()}`,
        `${Math.floor(Math.random() * 20) + 1} yard touchdown run by ${getRandomPlayerName()}`,
        `Incomplete pass intended for ${getRandomPlayerName()}`,
        `Punt for ${Math.floor(Math.random() * 30) + 35} yards`,
        `Sack for ${Math.floor(Math.random() * 8) + 3} yard loss`,
        `Penalty: False start on ${getRandomPlayerName()}`,
        `Fumble recovered by ${team}`
    ];
    
    const quarters = ['1st', '2nd', '3rd', '4th'];
    const quarter = quarters[Math.floor(Math.random() * quarters.length)];
    const minutes = Math.floor(Math.random() * 15);
    const seconds = Math.floor(Math.random() * 60);
    const time = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    return {
        quarter,
        time,
        team,
        description: playTypes[Math.floor(Math.random() * playTypes.length)],
        timestamp: Date.now(),
        isNew: true
    };
}

function getRandomPlayerName() {
    const names = ['Johnson', 'Williams', 'Davis', 'Thompson', 'Martinez', 'Anderson', 'Wilson', 'Brown', 'Smith', 'Jones', 'Miller', 'Garcia', 'Rodriguez', 'Lewis', 'Walker'];
    return names[Math.floor(Math.random() * names.length)];
}

// Generate sample detailed game data
function getGameDetails(game, gameIndex) {
    // Initialize play history if not exists
    if (!gamePlayHistories.has(gameIndex)) {
        const initialPlays = [
            { quarter: '1st', time: '12:34', team: game.awayTeam.shortName, description: `15 yard pass to Johnson`, timestamp: Date.now() - 1800000 },
            { quarter: '1st', time: '11:22', team: game.homeTeam.shortName, description: `3 yard rush by Williams`, timestamp: Date.now() - 1740000 },
            { quarter: '2nd', time: '8:45', team: game.awayTeam.shortName, description: `27 yard field goal - GOOD`, timestamp: Date.now() - 1620000 },
            { quarter: '2nd', time: '5:12', team: game.homeTeam.shortName, description: `42 yard touchdown pass to Davis`, timestamp: Date.now() - 1500000 },
            { quarter: '3rd', time: '14:30', team: game.awayTeam.shortName, description: `18 yard rush by Thompson`, timestamp: Date.now() - 1380000 },
            { quarter: '3rd', time: '9:15', team: game.homeTeam.shortName, description: `35 yard field goal - GOOD`, timestamp: Date.now() - 1260000 },
            { quarter: '4th', time: '6:42', team: game.awayTeam.shortName, description: `8 yard touchdown run by Martinez`, timestamp: Date.now() - 1140000 },
            { quarter: '4th', time: '2:18', team: game.homeTeam.shortName, description: `Interception returned 25 yards`, timestamp: Date.now() - 1020000 }
        ];
        gamePlayHistories.set(gameIndex, initialPlays);
    }
    
    const plays = gamePlayHistories.get(gameIndex);
    
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

// Start live updates for a game with random timing
function startLiveUpdates(gameIndex) {
    const sortedGames = getSortedGames();
    const originalIndex = nflGames.findIndex(g => g === sortedGames[gameIndex]);
    const game = sortedGames[gameIndex];
    
    if (!isGameLive(game) || liveUpdateIntervals.has(originalIndex)) {
        return;
    }
    
    // Create a function that schedules the next update with random timing
    function scheduleNextUpdate() {
        // Random interval between 3-7 seconds
        const randomInterval = Math.random() * 4000 + 3000;
        
        const timeout = setTimeout(() => {
            // Add new play to history
            const newPlay = generateLivePlay(game);
            const plays = gamePlayHistories.get(originalIndex) || [];
            plays.unshift(newPlay); // Add to beginning for most recent first
            
            // Keep only last 20 plays
            if (plays.length > 20) {
                plays.splice(20);
            }
            
            gamePlayHistories.set(originalIndex, plays);
            
            // Always update the layout to show new plays on cards
            // Only update layout if not in full page view to prevent modal interference
            if (!isFullPageView) {
                updateLayout();
            }
            
            // Update display if this game is currently selected
            if (selectedGameIndex === gameIndex) {
                updateDetailsPanel();
                
                // On mobile, only update the details section, not the entire modal
                if (isMobile() && !isFullPageView) {
                    updateMobileModalDetails();
                }
            }
            
            
            // Schedule the next update
            if (liveUpdateIntervals.has(originalIndex)) {
                scheduleNextUpdate();
            }
            
        }, randomInterval);
        
        // Store the timeout so we can clear it later
        liveUpdateIntervals.set(originalIndex, timeout);
    }
    
    // Start the first update with a small random delay to stagger initial loads
    setTimeout(() => {
        scheduleNextUpdate();
    }, Math.random() * 2000);
}

// Stop live updates for a game
function stopLiveUpdates(gameIndex) {
    const sortedGames = getSortedGames();
    const originalIndex = nflGames.findIndex(g => g === sortedGames[gameIndex]);
    
    if (liveUpdateIntervals.has(originalIndex)) {
        clearTimeout(liveUpdateIntervals.get(originalIndex));
        liveUpdateIntervals.delete(originalIndex);
    }
}

// Stop all live updates
function stopAllLiveUpdates() {
    liveUpdateIntervals.forEach(timeout => clearTimeout(timeout));
    liveUpdateIntervals.clear();
}

// Create details panel content
function createDetailsContent(game, gameIndex) {
    const sortedGames = getSortedGames();
    const originalIndex = nflGames.findIndex(g => g === sortedGames[gameIndex]);
    const details = getGameDetails(game, originalIndex);
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
    
    const weekSelect = document.getElementById('week-select');
    const selectedWeek = weekSelect ? weekSelect.value : '1';
    const isAlwaysOnMode = selectedWeek === '3' || selectedWeek === '4';
    
    return `
        <div class="details-header">
            ${!isAlwaysOnMode ? '<button class="close-btn" onclick="closeGameDetails()" aria-label="Close details">&times;</button>' : ''}
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
            <button class="expand-btn" onclick="toggleFullscreenModal()" aria-label="Toggle fullscreen view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="expand-icon">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="minimize-icon" style="display: none;">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                </svg>
            </button>
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
    console.log('toggleGameDetails called:', { gameIndex, currentSelected: selectedGameIndex, isFullPageView });
    
    // Check if we're on Week 3 or Week 4 - Always On mode
    const weekSelect = document.getElementById('week-select');
    const selectedWeek = weekSelect ? weekSelect.value : '1';
    const isAlwaysOnMode = selectedWeek === '3' || selectedWeek === '4';
    
    if (selectedGameIndex === gameIndex) {
        // On Week 3 and Week 4, don't allow deselecting the current game
        if (isAlwaysOnMode) {
            return; // Do nothing - keep the current game selected
        } else {
            closeGameDetails();
        }
    } else {
        selectedGameIndex = gameIndex;
        console.log('toggleGameDetails: set selectedGameIndex to', gameIndex);
        updateLayout();
        
        // Start live updates for the selected game if it's live
        const sortedGames = getSortedGames();
        const game = sortedGames[gameIndex];
        if (isGameLive(game)) {
            startLiveUpdates(gameIndex);
        }
    }
}

// Close game details
function closeGameDetails() {
    // Check if we're on Week 3 or Week 4 - Always On mode
    const weekSelect = document.getElementById('week-select');
    const selectedWeek = weekSelect ? weekSelect.value : '1';
    const isAlwaysOnMode = selectedWeek === '3' || selectedWeek === '4';
    
    // Prevent closing on Week 3 and Week 4 - Always On
    if (isAlwaysOnMode) {
        return;
    }
    
    const wasFullPageView = isFullPageView;
    selectedGameIndex = -1;
    isFullPageView = false;
    
    // Reset fullscreen modal state
    if (isFullscreenModal) {
        isFullscreenModal = false;
        const detailsPanel = document.getElementById('detailsPanel');
        const contentLayout = document.getElementById('contentLayout');
        const videoRail = document.getElementById('videoRail');
        
        if (detailsPanel) detailsPanel.classList.remove('fullscreen-modal');
        if (contentLayout) contentLayout.classList.remove('modal-fullscreen');
        if (videoRail) videoRail.style.display = 'block';
    }
    
    // Close modals appropriately
    if (isMobile()) {
        closeMobileModal();
    }
    closeFullPageModal();
    
    // Ensure main content is visible when returning from full page view
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.display = 'block';
    }
    
    // Only update layout if we weren't in full page view to prevent modal re-triggering
    if (!wasFullPageView) {
        updateLayout();
    }
}

// Toggle fullscreen modal view
function toggleFullscreenModal() {
    // On mobile, use the existing full page view
    if (isMobile()) {
        if (isFullPageView) {
            closeGameDetails();
        } else {
            expandGameDetails();
        }
        return;
    }
    
    const detailsPanel = document.getElementById('detailsPanel');
    const contentLayout = document.getElementById('contentLayout');
    const expandIcons = document.querySelectorAll('.expand-icon');
    const minimizeIcons = document.querySelectorAll('.minimize-icon');
    
    if (!detailsPanel) return;
    
    isFullscreenModal = !isFullscreenModal;
    
    if (isFullscreenModal) {
        // Expand to fullscreen
        detailsPanel.classList.add('fullscreen-modal');
        contentLayout.classList.add('modal-fullscreen');
        
        // Switch icons
        expandIcons.forEach(icon => icon.style.display = 'none');
        minimizeIcons.forEach(icon => icon.style.display = 'block');
        
        // Hide video rail when in fullscreen
        const videoRail = document.getElementById('videoRail');
        if (videoRail) {
            videoRail.style.display = 'none';
        }
    } else {
        // Return to normal view
        detailsPanel.classList.remove('fullscreen-modal');
        contentLayout.classList.remove('modal-fullscreen');
        
        // Switch icons back
        expandIcons.forEach(icon => icon.style.display = 'block');
        minimizeIcons.forEach(icon => icon.style.display = 'none');
        
        // Show video rail again
        const videoRail = document.getElementById('videoRail');
        if (videoRail) {
            videoRail.style.display = 'block';
        }
    }
}

// Expand game details to full page
function expandGameDetails(gameIndex = null) {
    console.log('expandGameDetails called, setting isFullPageView to true');
    // Set full page view flag immediately to prevent any modal interference
    isFullPageView = true;
    
    // Use the currently selected game if no specific index provided
    const actualGameIndex = gameIndex !== null ? gameIndex : selectedGameIndex;
    
    const sortedGames = getSortedGames();
    const game = sortedGames[actualGameIndex];
    
    if (!game || actualGameIndex < 0) return;
    
    selectedGameIndex = actualGameIndex;
    
    // Close any existing modals
    closeFullPageModal();
    
    // For mobile, ensure modal is properly closed before showing full page
    if (isMobile()) {
        // Force close mobile modal aggressively
        closeMobileModal();
        
        // Additional cleanup - remove any lingering modal elements
        const modal = document.getElementById('mobileModal');
        if (modal) {
            modal.classList.remove('visible');
            modal.style.display = 'none';
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }
    }
    
    // Hide main content and show full page view
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    // Create full page view container
    let fullPageContainer = document.getElementById('fullPageContainer');
    if (!fullPageContainer) {
        fullPageContainer = document.createElement('div');
        fullPageContainer.id = 'fullPageContainer';
        fullPageContainer.className = 'fullpage-container';
        document.body.appendChild(fullPageContainer);
    }
    
    // Populate full page content
    fullPageContainer.innerHTML = createFullPageLayout(game, actualGameIndex);
    fullPageContainer.style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Close full page modal
function closeFullPageModal() {
    const modal = document.getElementById('fullPageModal');
    if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 400);
    }
    
    // Hide full page container and show main content
    const fullPageContainer = document.getElementById('fullPageContainer');
    const mainContent = document.querySelector('.main-content');
    
    if (fullPageContainer) {
        fullPageContainer.style.display = 'none';
    }
    
    if (mainContent) {
        mainContent.style.display = 'block';
    }
    
    // Reset full page view state
    isFullPageView = false;
}

// Create full page layout (new page-like view)
function createFullPageLayout(game, gameIndex) {
    const sortedGames = getSortedGames();
    const originalIndex = nflGames.findIndex(g => g === sortedGames[gameIndex]);
    const details = getGameDetails(game, originalIndex);
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
        <div class="fullpage-content">
            <div class="fullpage-header">
                <button class="back-btn" onclick="closeGameDetails()" aria-label="Back to games">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H5"></path>
                        <path d="M12 19l-7-7 7-7"></path>
                    </svg>
                    Back to Games
                </button>
                
                <div class="fullpage-game-header">
                    <div class="team-logos-header">
                        <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/48x48/666/fff?text=' + game.awayTeam.shortName}" alt="${game.awayTeam.name} logo" class="fullpage-team-logo">
                        <div class="fullpage-scores">
                            <span class="fullpage-score away">${game.awayTeam.score}</span>
                            <span class="fullpage-vs">-</span>
                            <span class="fullpage-score home">${game.homeTeam.score}</span>
                        </div>
                        <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/48x48/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="fullpage-team-logo">
                    </div>
                    <h1 class="fullpage-title">${game.awayTeam.name} @ ${game.homeTeam.name}</h1>
                    <div class="fullpage-status">${game.status.main}</div>
                </div>
            </div>
            
            <div class="fullpage-body">
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
        </div>
    `;
}

// Create full page content (enhanced version of details content) - keeping for compatibility
function createFullPageContent(game, gameIndex) {
    const sortedGames = getSortedGames();
    const originalIndex = nflGames.findIndex(g => g === sortedGames[gameIndex]);
    const details = getGameDetails(game, originalIndex);
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
        <div style="max-width: 1200px; margin: 0 auto;">
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

// Update mobile layout with modal system
function updateMobileLayout() {
    populateGames(); // Use standard game population
    updateLayoutClasses();
    
    // Only show mobile modal if not in full page view
    if (!isFullPageView) {
        updateMobileModal(); // Handle modal display
    }
}

// Update layout classes for responsive design
function updateLayoutClasses() {
    const contentLayout = document.getElementById('contentLayout');
    const detailsPanel = document.getElementById('detailsPanel');
    const weekSelect = document.getElementById('week-select');
    
    if (selectedGameIndex >= 0 && !isMobile()) {
        contentLayout.classList.add('has-selection');
        contentLayout.classList.remove('week1-no-selection', 'week2-no-selection');
        detailsPanel.classList.add('visible');
    } else {
        contentLayout.classList.remove('has-selection');
        if (detailsPanel) detailsPanel.classList.remove('visible');
        
        // Add special class for Week 1 or Week 2 when no selection
        if (weekSelect) {
            if (weekSelect.value === '1') {
                contentLayout.classList.add('week1-no-selection');
                contentLayout.classList.remove('week2-no-selection');
            } else if (weekSelect.value === '2') {
                contentLayout.classList.add('week2-no-selection');
                contentLayout.classList.remove('week1-no-selection');
            } else {
                contentLayout.classList.remove('week1-no-selection', 'week2-no-selection');
            }
        }
    }
}

// Update details panel content (desktop only)
function updateDetailsPanel() {
    const detailsPanel = document.getElementById('detailsPanel');
    if (!detailsPanel || isMobile()) return;
    
    if (selectedGameIndex >= 0) {
        const sortedGames = getSortedGames();
        const game = sortedGames[selectedGameIndex]; // Use sorted games array, not original
        detailsPanel.innerHTML = createDetailsContent(game, selectedGameIndex);
    } else {
        detailsPanel.innerHTML = '';
    }
}

// Create mobile score card for horizontal scroll
function createMobileScoreCard(game, index, isActive) {
    const liveGame = isGameLive(game);
    const statusClass = liveGame ? 'live' : '';
    
    return `
        <div class="mobile-game-score-card ${isActive ? 'active' : ''}" onclick="switchToMobileGame(${index})">
            <div class="mobile-score-header">
                <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/40x40/666/fff?text=' + game.awayTeam.shortName}" alt="${game.awayTeam.name} logo" class="mobile-team-logo">
                <div class="mobile-score-display">
                    <span>${game.awayTeam.score}</span>
                    <span class="mobile-vs">-</span>
                    <span>${game.homeTeam.score}</span>
                </div>
                <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/40x40/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="mobile-team-logo">
            </div>
            <div class="mobile-game-title">${game.awayTeam.name} @ ${game.homeTeam.name}</div>
            <div class="mobile-game-status ${statusClass}">${game.status.main}</div>
        </div>
    `;
}

// Create mobile modal content
function createMobileModalContent(game, gameIndex) {
    const sortedGames = getSortedGames();
    const originalIndex = nflGames.findIndex(g => g === sortedGames[gameIndex]);
    const details = getGameDetails(game, originalIndex);
    const isGameFinished = game.status.main.includes('FINAL');
    const isLive = isGameLive(game);
    
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
    
    // Create horizontal scrollable score cards
    const scoreCards = sortedGames.map((g, i) => createMobileScoreCard(g, i, i === gameIndex)).join('');
    
    return `
        <div class="mobile-modal-header">
            <div class="mobile-modal-handle"></div>
            <div class="mobile-header-actions">
                <button class="expand-btn mobile-expand" onclick="toggleFullscreenModal()" aria-label="Toggle fullscreen view">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="expand-icon">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="minimize-icon" style="display: none;">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                    </svg>
                </button>
            </div>
            <div class="mobile-score-cards-container">
                <div class="mobile-score-cards-scroll" id="mobileScoreCardsScroll">
                    ${scoreCards}
                </div>
            </div>
        </div>
        
        <div class="mobile-modal-body">
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
    `;
}

// Update mobile modal display
function updateMobileModal() {
    console.log('updateMobileModal called:', { isMobile: isMobile(), selectedGameIndex, isFullPageView });
    
    if (!isMobile() || selectedGameIndex < 0 || isFullPageView) {
        console.log('updateMobileModal: closing modal due to conditions');
        closeMobileModal();
        return;
    }
    
    const sortedGames = getSortedGames();
    const game = sortedGames[selectedGameIndex];
    
    // Double-check: Don't create modal if in full page view
    if (isFullPageView) {
        closeMobileModal();
        return;
    }
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('mobileModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'mobileModal';
        modal.className = 'mobile-modal';
        modal.innerHTML = `
            <div class="mobile-modal-content" id="mobileModalContent">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                // Check if we're on Week 3 or Week 4 - Always On mode
                const weekSelect = document.getElementById('week-select');
                const selectedWeek = weekSelect ? weekSelect.value : '1';
                const isAlwaysOnMode = selectedWeek === '3' || selectedWeek === '4';
                
                // Don't allow click outside to close on Week 3 and Week 4
                if (isAlwaysOnMode) {
                    return;
                }
                
                // If we're in full page view, just close the modal without affecting the full page view
                if (isFullPageView) {
                    closeMobileModal();
                } else {
                    closeGameDetails();
                }
            }
        });
    }
    
    // Check if modal is already visible - if so, don't regenerate content
    if (modal.classList.contains('visible')) {
        return; // Modal already open, don't regenerate to prevent scroll reset
    }
    
    // Final check before showing modal content
    if (isFullPageView) {
        closeMobileModal();
        return;
    }
    
    // Update modal content only when opening
    const modalContent = document.getElementById('mobileModalContent');
    if (modalContent) {
        modalContent.innerHTML = createMobileModalContent(game, selectedGameIndex);
    }
    
    // Position selected game before showing modal to prevent visual glitch
    setTimeout(() => {
        console.log('setTimeout in updateMobileModal executing:', { isFullPageView, selectedGameIndex });
        // Check again if we're still not in full page view before showing modal
        if (!isFullPageView) {
            console.log('setTimeout: showing modal');
            positionSelectedGameInCenter();
            // Setup scroll auto-selection after modal is ready
            setupScrollAutoSelection();
            // Show modal after positioning
            modal.classList.add('visible');
        } else {
            console.log('setTimeout: NOT showing modal because isFullPageView is true');
        }
    }, 10);
}

// Close mobile modal
function closeMobileModal() {
    console.log('closeMobileModal called');
    const modal = document.getElementById('mobileModal');
    if (modal) {
        console.log('closeMobileModal: modal found, removing');
        modal.classList.remove('visible');
        // If in full page view, remove immediately without waiting for animation
        if (isFullPageView) {
            modal.style.display = 'none';
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        } else {
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 400);
        }
    }
}

// Switch to a different game in mobile modal
function switchToMobileGame(newIndex) {
    const sortedGames = getSortedGames();
    
    if (newIndex >= 0 && newIndex < sortedGames.length && newIndex !== selectedGameIndex) {
        const oldIndex = selectedGameIndex;
        selectedGameIndex = newIndex;
        
        // Just update the active states without regenerating content
        updateMobileModalActiveStates(oldIndex, newIndex);
        updateMobileModalDetails(); // Update only the details section
        
        // Only update layout if not in full page view
        if (!isFullPageView) {
            updateLayout(); // Update card selection state
        }
        
        // Smoothly center the newly selected game
        smoothCenterSelectedGame();
        
        // Start live updates if it's a live game
        const game = sortedGames[selectedGameIndex];
        if (isGameLive(game)) {
            startLiveUpdates(selectedGameIndex);
        }
    }
}

// Update only the active states of existing cards to avoid content regeneration
function updateMobileModalActiveStates(oldIndex, newIndex) {
    const scoreCardsContainer = document.getElementById('mobileScoreCardsScroll');
    if (!scoreCardsContainer) return;
    
    // Remove active class from old card
    if (oldIndex >= 0) {
        const oldCard = scoreCardsContainer.children[oldIndex];
        if (oldCard) {
            oldCard.classList.remove('active');
        }
    }
    
    // Add active class to new card
    const newCard = scoreCardsContainer.children[newIndex];
    if (newCard) {
        newCard.classList.add('active');
    }
}

// Position the selected game in center instantly (no animation)
function positionSelectedGameInCenter() {
    const scoreCardsContainer = document.getElementById('mobileScoreCardsScroll');
    const activeCard = scoreCardsContainer?.querySelector('.mobile-game-score-card.active');
    
    if (scoreCardsContainer && activeCard) {
        const containerWidth = scoreCardsContainer.offsetWidth;
        const cardWidth = activeCard.offsetWidth;
        const scrollLeft = activeCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
        // Set position instantly without animation
        scoreCardsContainer.scrollLeft = scrollLeft;
    }
}

// Smoothly center the selected game with animation
function smoothCenterSelectedGame() {
    const scoreCardsContainer = document.getElementById('mobileScoreCardsScroll');
    const activeCard = scoreCardsContainer?.querySelector('.mobile-game-score-card.active');
    
    if (scoreCardsContainer && activeCard) {
        const containerWidth = scoreCardsContainer.offsetWidth;
        const cardWidth = activeCard.offsetWidth;
        const targetScrollLeft = activeCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
        // Smooth scroll to center the selected game
        scoreCardsContainer.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });
    }
}

// Find which game card is closest to center
function findCenterCard() {
    const scoreCardsContainer = document.getElementById('mobileScoreCardsScroll');
    if (!scoreCardsContainer) return -1;
    
    const containerRect = scoreCardsContainer.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const cards = scoreCardsContainer.querySelectorAll('.mobile-game-score-card');
    
    let closestIndex = -1;
    let minDistance = Infinity;
    
    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        
        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });
    
    return closestIndex;
}

// Handle scroll events with debouncing
function handleScrollEnd() {
    const centerCardIndex = findCenterCard();
    
    if (centerCardIndex >= 0 && centerCardIndex !== selectedGameIndex) {
        // Auto-select the centered card
        switchToMobileGame(centerCardIndex);
    }
}

// Setup scroll listener for auto-selection
function setupScrollAutoSelection() {
    const scoreCardsContainer = document.getElementById('mobileScoreCardsScroll');
    if (!scoreCardsContainer) return;
    
    scoreCardsContainer.addEventListener('scroll', () => {
        // Clear existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Set new timeout to detect when scrolling stops
        scrollTimeout = setTimeout(handleScrollEnd, 150);
    }, { passive: true });
}

// Update only the details section content without affecting score cards
function updateMobileModalDetails() {
    // Don't update modal details if in full page view
    if (isFullPageView) return;
    
    const modalBody = document.querySelector('.mobile-modal-body');
    if (!modalBody) return;
    
    if (selectedGameIndex < 0) return; // Add safety check
    
    const sortedGames = getSortedGames();
    const game = sortedGames[selectedGameIndex];
    const originalIndex = nflGames.findIndex(g => g === sortedGames[selectedGameIndex]);
    const details = getGameDetails(game, originalIndex);
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
    
    modalBody.innerHTML = `
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
    `;
}


// Function to create a game card HTML
function createGameCard(game, gameIndex) {
    const isSelected = selectedGameIndex === gameIndex;
    const liveGame = isGameLive(game);
    
    // Check if we're in collapsed view with more than 3 columns (Week 1 only)
    const weekSelect = document.getElementById('week-select');
    const selectedWeek = weekSelect ? weekSelect.value : '1';
    const isCollapsed = selectedGameIndex >= 0 && !isMobile();
    const hasMoreThan3Columns = selectedWeek === '1'; // Week 1 has 4 columns
    const shouldUseAbbreviations = isCollapsed && hasMoreThan3Columns;
    
    const statusHtml = game.status.network 
        ? `<div class="status-main ${liveGame ? 'live' : ''}">${game.status.main}</div><div class="status-network">${game.status.network}</div>`
        : `<div class="status-main ${liveGame ? 'live' : ''}">${game.status.main}</div>`;
    
    
    const detailsHtml = game.details && !game.status.main.includes('FINAL')
        ? `<div class="game-details">
               <div class="detail-item">
                   <span class="detail-label">${game.details.spread.split(' ')[0]} ${game.details.spread.split(' ')[1]}</span>
                   <span class="detail-value">${game.details.total.split(' ')[0]} ${game.details.total.split(' ')[1]}</span>
               </div>
           </div>`
        : '';

    const hintText = isSelected ? 'Selected' : 'Tap to view details';

    // Use abbreviations only when collapsed AND there are more than 3 columns (Week 1)
    const awayTeamName = shouldUseAbbreviations ? game.awayTeam.shortName : game.awayTeam.name;
    const homeTeamName = shouldUseAbbreviations ? game.homeTeam.shortName : game.homeTeam.name;
    
    // Show records only when not using abbreviations
    const awayRecordHtml = (!shouldUseAbbreviations && game.awayTeam.record) ? `<span class="team-record">${game.awayTeam.record}</span>` : '';
    const homeRecordHtml = (!shouldUseAbbreviations && game.homeTeam.record) ? `<span class="team-record">${game.homeTeam.record}</span>` : '';

    return `
        <div class="game-card ${isSelected ? 'selected' : ''} ${liveGame ? 'live' : ''}" 
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
                            <span class="team-name">${awayTeamName}</span>
                            ${awayRecordHtml}
                        </div>
                    </div>
                    <div class="team-score">${game.awayTeam.score}</div>
                </div>
                
                <div class="team">
                    <div class="team-info">
                        <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/32x32/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="team-logo">
                        <div>
                            <span class="team-name">${homeTeamName}</span>
                            ${homeRecordHtml}
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
    
    const sortedGames = getSortedGames();
    const gameCardsHtml = sortedGames.map((game, index) => createGameCard(game, index)).join('');
    gamesContainer.innerHTML = gameCardsHtml;
}

// Initialize live updates for all live games
function initializeLiveUpdates() {
    const sortedGames = getSortedGames();
    sortedGames.forEach((game, index) => {
        if (isGameLive(game)) {
            startLiveUpdates(index);
        }
    });
}

// Update layout based on selected week
function updateWeekLayout() {
    const weekSelect = document.getElementById('week-select');
    const gamesContainer = document.getElementById('gamesContainer');
    const contentLayout = document.getElementById('contentLayout');
    
    if (weekSelect && gamesContainer && contentLayout) {
        const selectedWeek = weekSelect.value;
        
        // Remove all layout classes first
        gamesContainer.classList.remove('two-column-layout', 'three-column-layout', 'four-column-layout', 'vertical-tabs-layout');
        contentLayout.classList.remove('week4-vertical-tabs');
        
        // Apply appropriate layout for each week
        if (selectedWeek === '1') {
            gamesContainer.classList.add('four-column-layout');
        } else if (selectedWeek === '2') {
            gamesContainer.classList.add('three-column-layout');
        } else if (selectedWeek === '4') {
            gamesContainer.classList.add('vertical-tabs-layout');
            contentLayout.classList.add('week4-vertical-tabs');
        } else {
            gamesContainer.classList.add('two-column-layout');
        }
        
        // Special handling for Week 3 and Week 4 - Always On
        if (selectedWeek === '3' || selectedWeek === '4') {
            // Auto-select first game if none selected or if currently selected index is invalid
            if (selectedGameIndex < 0) {
                selectedGameIndex = 0;
                updateLayout();
                
                // Start live updates for the first game if it's live
                const sortedGames = getSortedGames();
                const game = sortedGames[0];
                if (isGameLive(game)) {
                    startLiveUpdates(0);
                }
            }
        } else {
            // For other weeks, if we were on Week 3/4 before, we might need to maintain selection
            // but allow normal closing behavior
        }
        
        // Update layout classes to handle week-specific styling
        updateLayoutClasses();
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...', { selectedGameIndex, isFullPageView });
    
    // Ensure clean state on page load
    selectedGameIndex = -1;
    isFullPageView = false;
    
    updateLayout();
    initializeLiveUpdates();
    
    // Set initial layout based on current week selection
    updateWeekLayout();
    
    // Listen for week dropdown changes
    const weekSelect = document.getElementById('week-select');
    if (weekSelect) {
        weekSelect.addEventListener('change', function() {
            // If switching away from Week 3, reset selection to allow normal behavior
            if (weekSelect.value !== '3' && selectedGameIndex >= 0) {
                // Keep current selection but allow normal closing behavior
            }
            updateWeekLayout();
        });
    }
    
    // Close details panel when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && (selectedGameIndex >= 0 || isFullPageView)) {
            // Check if we're on Week 3 or Week 4 - Always On mode
            const weekSelect = document.getElementById('week-select');
            const selectedWeek = weekSelect ? weekSelect.value : '1';
            const isAlwaysOnMode = selectedWeek === '3' || selectedWeek === '4';
            
            // Don't allow escape to close on Week 3 and Week 4
            if (isAlwaysOnMode) {
                return;
            }
            
            // If we're in full page view and mobile modal is open, just close the modal
            const mobileModal = document.getElementById('mobileModal');
            if (isFullPageView && isMobile() && mobileModal && mobileModal.classList.contains('visible')) {
                closeMobileModal();
            } else {
                closeGameDetails();
            }
        }
    });
    
    // Handle window resize to switch between mobile/desktop views
    window.addEventListener('resize', function() {
        // Only update layout if not in full page view to prevent modal interference
        if (!isFullPageView) {
            updateLayout();
        }
    });
    
    // Clean up intervals when page unloads
    window.addEventListener('beforeunload', function() {
        stopAllLiveUpdates();
    });
    
    // Initialize video rail
    initializeVideoRail();
});

// Video Rail Functionality
let videoRailCollapsed = false;

function initializeVideoRail() {
    const collapseButton = document.getElementById('videoRailCollapse');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const mainVideoPlayer = document.querySelector('.main-video-player');
    
    // Collapse/Expand functionality
    if (collapseButton) {
        collapseButton.addEventListener('click', toggleVideoRail);
    }
    
    // Playlist item selection
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            selectPlaylistItem(this);
        });
    });
    
    // Main video play button
    if (mainVideoPlayer) {
        mainVideoPlayer.addEventListener('click', playMainVideo);
    }
}

function toggleVideoRail() {
    const videoRail = document.getElementById('videoRail');
    videoRailCollapsed = !videoRailCollapsed;
    
    if (videoRailCollapsed) {
        videoRail.classList.add('collapsed');
    } else {
        videoRail.classList.remove('collapsed');
    }
}

function selectPlaylistItem(clickedItem) {
    // Remove active class from all items
    const allItems = document.querySelectorAll('.playlist-item');
    allItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    clickedItem.classList.add('active');
    
    // Update main video with selected item's content
    const videoTitle = clickedItem.querySelector('.playlist-title').textContent;
    const videoDuration = clickedItem.querySelector('.playlist-duration').textContent;
    const videoId = clickedItem.getAttribute('data-video-id');
    
    // Update main video thumbnail (using different random image based on video ID)
    const mainVideoImage = document.querySelector('.video-bg-image');
    const mainVideoTitle = document.querySelector('.video-title-main');
    const mainVideoDuration = document.querySelector('.video-duration-main');
    const railTitle = document.getElementById('videoRailTitle');
    
    if (mainVideoImage && mainVideoTitle && mainVideoDuration && railTitle) {
        mainVideoImage.src = `https://picsum.photos/320/180?random=${100 + parseInt(videoId)}`;
        mainVideoTitle.textContent = videoTitle;
        mainVideoDuration.textContent = videoDuration;
        // Update the rail title to match the currently playing video
        railTitle.textContent = videoTitle;
    }
    
    // Add a subtle animation to indicate the change
    const mainVideoContainer = document.querySelector('.main-video-player');
    if (mainVideoContainer) {
        mainVideoContainer.style.transform = 'scale(0.98)';
        setTimeout(() => {
            mainVideoContainer.style.transform = 'scale(1)';
        }, 150);
    }
}

function playMainVideo() {
    // This would integrate with a real video player
    // For now, just show a visual feedback
    const playButton = document.querySelector('.play-button-main');
    const railTitle = document.getElementById('videoRailTitle');
    const mainVideoTitle = document.querySelector('.video-title-main');
    
    if (playButton) {
        playButton.style.transform = 'translate(-50%, -50%) scale(1.2)';
        playButton.textContent = '⏸';
        
        setTimeout(() => {
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
            playButton.textContent = '▶';
        }, 1000);
    }
    
    // Ensure the rail title matches the main video title when playing
    if (railTitle && mainVideoTitle) {
        railTitle.textContent = mainVideoTitle.textContent;
    }
    
    console.log('Playing video:', mainVideoTitle.textContent);
}