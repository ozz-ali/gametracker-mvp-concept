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
    'ravens': 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png',
    'titans': 'https://a.espncdn.com/i/teamlogos/nfl/500/ten.png',
    'colts': 'https://a.espncdn.com/i/teamlogos/nfl/500/ind.png',
    'texans': 'https://a.espncdn.com/i/teamlogos/nfl/500/hou.png',
    'jaguars': 'https://a.espncdn.com/i/teamlogos/nfl/500/jax.png',
    'bengals': 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png',
    'browns': 'https://a.espncdn.com/i/teamlogos/nfl/500/cle.png',
    'panthers': 'https://a.espncdn.com/i/teamlogos/nfl/500/car.png',
    'buccaneers': 'https://a.espncdn.com/i/teamlogos/nfl/500/tb.png'
};

// Game state management
let selectedGameIndex = -1;
let previousGameIndex = -1; // Track previous game for scroll reset logic
let liveUpdateIntervals = new Map();
let gamePlayHistories = new Map();
let scrollTimeout = null;
let isFullPageView = false;
let isFullscreenModal = false;
let expandedPlaysContainers = new Set(); // Track which plays containers are expanded

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
    },
    // Additional Row 3 - Fourth row of final games
    {
        homeTeam: {
            name: 'Colts',
            shortName: 'IND',
            record: '1-1',
            score: 24,
            logo: 'colts'
        },
        awayTeam: {
            name: 'Titans',
            shortName: 'TEN',
            record: '0-2',
            score: 17,
            logo: 'titans'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'IND -3.0',
            total: 'UNDER 44'
        }
    },
    {
        homeTeam: {
            name: 'Jaguars',
            shortName: 'JAX',
            record: '1-1',
            score: 31,
            logo: 'jaguars'
        },
        awayTeam: {
            name: 'Texans',
            shortName: 'HOU',
            record: '1-1',
            score: 28,
            logo: 'texans'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'JAX -1.0',
            total: 'OVER 42.5'
        }
    },
    {
        homeTeam: {
            name: 'Browns',
            shortName: 'CLE',
            record: '0-2',
            score: 13,
            logo: 'browns'
        },
        awayTeam: {
            name: 'Bengals',
            shortName: 'CIN',
            record: '2-0',
            score: 27,
            logo: 'bengals'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'CIN -7.5',
            total: 'UNDER 41'
        }
    },
    {
        homeTeam: {
            name: 'Buccaneers',
            shortName: 'TB',
            record: '1-1',
            score: 34,
            logo: 'buccaneers'
        },
        awayTeam: {
            name: 'Panthers',
            shortName: 'CAR',
            record: '0-2',
            score: 14,
            logo: 'panthers'
        },
        status: {
            main: 'FINAL',
            network: ''
        },
        details: {
            spread: 'TB -6.0',
            total: 'OVER 45.5'
        }
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

// Generate expandable plays HTML with first 5 plays visible
function generateExpandablePlays(plays, containerId) {
    const isExpanded = expandedPlaysContainers.has(containerId);
    
    const playsHtml = plays.map((play, index) => `
        <div class="play-item ${(index >= 5 && !isExpanded) ? 'hidden' : ''}" data-play-index="${index}">
            <div class="play-time">${play.quarter} ${play.time}</div>
            <div class="play-team">${play.team}</div>
            <div class="play-description">${play.description}</div>
        </div>
    `).join('');
    
    const expandButtonHtml = plays.length > 5 ? `
        <button class="plays-expand-btn" onclick="togglePlaysExpansion('${containerId}')" id="${containerId}-btn">
            ${isExpanded ? 'Show Less' : 'Show More'}
        </button>
    ` : '';
    
    return `
        <div class="plays-container" id="${containerId}">
            ${playsHtml}
            ${expandButtonHtml}
        </div>
    `;
}

// Toggle plays expansion
function togglePlaysExpansion(containerId) {
    const container = document.getElementById(containerId);
    const button = document.getElementById(`${containerId}-btn`);
    
    if (!container || !button) return;
    
    // Only use the stored state - don't sync with DOM during live updates
    const isCurrentlyExpanded = expandedPlaysContainers.has(containerId);
    
    if (isCurrentlyExpanded) {
        // Collapse - hide plays after index 4
        expandedPlaysContainers.delete(containerId);
        const allPlays = container.querySelectorAll('.play-item');
        allPlays.forEach((play, index) => {
            if (index >= 5) {
                play.classList.add('hidden');
            }
        });
        button.textContent = 'Show More';
    } else {
        // Expand - show all plays
        expandedPlaysContainers.add(containerId);
        const hiddenPlays = container.querySelectorAll('.play-item.hidden');
        hiddenPlays.forEach(play => {
            play.classList.remove('hidden');
        });
        button.textContent = 'Show Less';
    }
}

// Generate team-associated thumbnail for highlights
function getGameThumbnail(game) {
    // Use the same NFL stadium action image that BUF @ NYJ uses for all games
    return 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=225&fit=crop&q=80';
}

// Generate clean team statistics with center categories and team color highlights
function generateTeamStatistics(game) {
    // Define team colors for highlighting (using common NFL team colors)
    const teamColors = {
        'falcons': '#A71930', 'vikings': '#4F2683', 'bears': '#0B162A', 'lions': '#0076B6',
        'giants': '#0F4D92', 'cowboys': '#041E42', 'niners': '#AA0000', 'saints': '#D3BC8D',
        'seahawks': '#002244', 'steelers': '#FFB612', 'bills': '#00338D', 'jets': '#125740',
        'chiefs': '#E31837', 'raiders': '#000000', 'broncos': '#FB4F14', 'chargers': '#0080C6',
        'patriots': '#002244', 'dolphins': '#008E97', 'rams': '#003594', 'cardinals': '#97233F',
        'packers': '#203731', 'ravens': '#241773', 'titans': '#0C2340', 'colts': '#002C5F',
        'texans': '#03202F', 'jaguars': '#101820', 'bengals': '#FB4F14', 'browns': '#311D00',
        'panthers': '#0085CA', 'buccaneers': '#D50A0A'
    };

    const awayColor = teamColors[game.awayTeam.logo] || '#6B7280';
    const homeColor = teamColors[game.homeTeam.logo] || '#6B7280';

    const stats = [
        {
            category: 'Time of possession',
            awayValue: '27:34',
            homeValue: '32:26',
            awayNumeric: 27.34,
            homeNumeric: 32.26,
            higherIsBetter: true
        },
        {
            category: 'Total yards',
            awayValue: '230',
            homeValue: '404',
            awayNumeric: 230,
            homeNumeric: 404,
            higherIsBetter: true
        },
        {
            category: 'Total plays',
            awayValue: '65',
            homeValue: '63',
            awayNumeric: 65,
            homeNumeric: 63,
            higherIsBetter: true
        },
        {
            category: 'Yards per play',
            awayValue: '3.5',
            homeValue: '6.4',
            awayNumeric: 3.5,
            homeNumeric: 6.4,
            higherIsBetter: true
        },
        {
            category: 'Pass yards',
            awayValue: '179',
            homeValue: '269',
            awayNumeric: 179,
            homeNumeric: 269,
            higherIsBetter: true
        },
        {
            category: 'Yards per pass',
            awayValue: '4.3',
            homeValue: '8.7',
            awayNumeric: 4.3,
            homeNumeric: 8.7,
            higherIsBetter: true
        },
        {
            category: 'Rushing yards',
            awayValue: '51',
            homeValue: '135',
            awayNumeric: 51,
            homeNumeric: 135,
            higherIsBetter: true
        },
        {
            category: 'Rush average',
            awayValue: '2.7',
            homeValue: '4.5',
            awayNumeric: 2.7,
            homeNumeric: 4.5,
            higherIsBetter: true
        },
        {
            category: 'Turnovers',
            awayValue: '0',
            homeValue: '0',
            awayNumeric: 0,
            homeNumeric: 0,
            higherIsBetter: false
        },
        {
            category: 'First downs',
            awayValue: '18',
            homeValue: '24',
            awayNumeric: 18,
            homeNumeric: 24,
            higherIsBetter: true
        }
    ];

    const statsHtml = stats.map(stat => {
        let awayLeading = false;
        let homeLeading = false;
        
        if (stat.awayNumeric !== stat.homeNumeric) {
            if (stat.higherIsBetter) {
                awayLeading = stat.awayNumeric > stat.homeNumeric;
                homeLeading = stat.homeNumeric > stat.awayNumeric;
            } else {
                awayLeading = stat.awayNumeric < stat.homeNumeric;
                homeLeading = stat.homeNumeric < stat.awayNumeric;
            }
        }
        
        return `
            <div class="clean-stat-row">
                <div class="stat-value-clean ${awayLeading ? 'leading' : ''}" 
                     ${awayLeading ? `style="background-color: ${awayColor}; color: white;"` : ''}>
                    ${stat.awayValue}
                </div>
                <div class="stat-category-clean">${stat.category}</div>
                <div class="stat-value-clean ${homeLeading ? 'leading' : ''}"
                     ${homeLeading ? `style="background-color: ${homeColor}; color: white;"` : ''}>
                    ${stat.homeValue}
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="clean-stats-container">
            <div class="stats-teams-header-clean">
                <div class="stats-team-left-clean">
                    <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/24x24/666/fff?text=' + game.awayTeam.shortName}" 
                         alt="${game.awayTeam.name} logo" class="stats-team-logo-clean">
                    <span class="stats-team-name-clean">${game.awayTeam.shortName}</span>
                </div>
                <div class="stats-title-clean">vs</div>
                <div class="stats-team-right-clean">
                    <span class="stats-team-name-clean">${game.homeTeam.shortName}</span>
                    <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/24x24/666/fff?text=' + game.homeTeam.shortName}" 
                         alt="${game.homeTeam.name} logo" class="stats-team-logo-clean">
                </div>
            </div>
            <div class="clean-stats-grid">
                ${statsHtml}
            </div>
        </div>
    `;
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
            <div class="highlights-container">
                <div class="video-placeholder">
                    <div class="video-thumbnail" style="background-image: url('${getGameThumbnail(game)}'); background-size: cover; background-position: center;">
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
    const isLive = isGameLive(game);
    
    // Create navigation anchors
    const navigationAnchors = `
        <div class="details-navigation">
            <div class="nav-anchor" onclick="scrollToSection('boxscore-section')">
                <span class="nav-icon">📊</span>
                <span class="nav-label">Box Score</span>
            </div>
            <div class="nav-anchor" onclick="scrollToSection('plays-section')">
                <span class="nav-icon">⚡</span>
                <span class="nav-label">Plays</span>
            </div>
            <div class="nav-anchor" onclick="scrollToSection('stats-section')">
                <span class="nav-icon">📈</span>
                <span class="nav-label">Team Stats</span>
            </div>
        </div>
    `;
    
    // Create condensed score cards for desktop fullscreen modal
    const condensedCards = sortedGames.map((g, i) => {
        const isActive = i === gameIndex;
        const liveGame = isGameLive(g);
        const statusClass = liveGame ? 'live' : '';
        
        return `
            <div class="desktop-condensed-card ${isActive ? 'active' : ''}" onclick="switchDesktopGame(${i})">
                <div class="desktop-condensed-logos">
                    <img src="${teamLogos[g.awayTeam.logo] || 'https://via.placeholder.com/24x24/666/fff?text=' + g.awayTeam.shortName}" alt="${g.awayTeam.name} logo" class="desktop-condensed-logo">
                    <img src="${teamLogos[g.homeTeam.logo] || 'https://via.placeholder.com/24x24/666/fff?text=' + g.homeTeam.shortName}" alt="${g.homeTeam.name} logo" class="desktop-condensed-logo">
                </div>
                <div class="desktop-condensed-score">
                    <span>${g.awayTeam.score}</span>-<span>${g.homeTeam.score}</span>
                </div>
                <div class="desktop-condensed-status ${statusClass}">${g.status.main}</div>
            </div>
        `;
    }).join('');
    
    // Add condensed cards row only when in fullscreen modal (will be hidden in normal view via CSS)
    const condensedCardsRow = `
        <div class="desktop-condensed-scroll-container">
            <div class="desktop-condensed-cards-scroll" id="desktopCondensedScroll">
                ${condensedCards}
            </div>
        </div>
    `;
    
    return `
        ${condensedCardsRow}
        
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
                <h3>${game.awayTeam.shortName} @ ${game.homeTeam.shortName}</h3>
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
            ${isLive ? navigationAnchors : ''}
            ${highlightsSection}
            ${isGameFinished ? navigationAnchors : ''}
            
            <div class="details-section" id="boxscore-section">
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
            
            <div class="details-section" id="plays-section">
                <h4>Recent Plays</h4>
                ${generateExpandablePlays(details.plays, `consistent-plays-container-${gameIndex}`)}
            </div>
            
            <div class="details-section" id="stats-section">
                <h4>Team Statistics</h4>
                ${generateTeamStatistics(game)}
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
        // Track previous game index for scroll reset logic
        previousGameIndex = selectedGameIndex;
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
    previousGameIndex = -1; // Reset tracking when closing details
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
        // Also close mobile full page view if it exists
        const mobileFullPageContainer = document.getElementById('mobileFullPageContainer');
        if (mobileFullPageContainer) {
            mobileFullPageContainer.style.display = 'none';
        }
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
    // On mobile, use the mobile full page view
    if (isMobile()) {
        if (isFullPageView) {
            closeMobileFullPageView();
        } else {
            showMobileFullPageView();
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
        
        // For Week 4, temporarily remove the vertical tabs layout
        const isWeek4 = contentLayout.classList.contains('week4-vertical-tabs');
        if (isWeek4) {
            contentLayout.classList.remove('week4-vertical-tabs');
            contentLayout.setAttribute('data-was-week4', 'true');
        }
        
        // Switch icons
        expandIcons.forEach(icon => icon.style.display = 'none');
        minimizeIcons.forEach(icon => icon.style.display = 'block');
        
        // Hide video rail when in fullscreen
        const videoRail = document.getElementById('videoRail');
        if (videoRail) {
            videoRail.style.display = 'none';
        }
        
        // Center the selected desktop condensed card after a brief delay
        setTimeout(() => {
            centerSelectedDesktopCard();
        }, 100);
    } else {
        // Return to normal view
        detailsPanel.classList.remove('fullscreen-modal');
        contentLayout.classList.remove('modal-fullscreen');
        
        // Restore Week 4 layout if it was previously Week 4
        if (contentLayout.getAttribute('data-was-week4') === 'true') {
            contentLayout.classList.add('week4-vertical-tabs');
            contentLayout.removeAttribute('data-was-week4');
        }
        
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

// Switch to a different game in mobile full page view
function switchMobileGame(newIndex) {
    const sortedGames = getSortedGames();
    
    if (newIndex >= 0 && newIndex < sortedGames.length && newIndex !== selectedGameIndex) {
        selectedGameIndex = newIndex;
        
        // Update the full page view content
        const game = sortedGames[newIndex];
        const mobileFullPageContainer = document.getElementById('mobileFullPageContainer');
        if (mobileFullPageContainer) {
            mobileFullPageContainer.innerHTML = createMobileFullPageLayout(game, selectedGameIndex);
            
            // Reset scroll state when switching games
            lastScrollY = 0;
            isScrolling = false;
            if (mobileScrollTimeout) {
                clearTimeout(mobileScrollTimeout);
                mobileScrollTimeout = null;
            }
            mobileFullPageContainer.classList.remove('scrolled-down');
            
            // Clean scroll listener attachment
            mobileFullPageContainer.removeEventListener('scroll', handleMobileScroll);
            
            // Set scroll position without triggering events
            mobileFullPageContainer.scrollTop = 0;
            
            // Re-attach scroll listener after content is ready
            setTimeout(() => {
                mobileFullPageContainer.addEventListener('scroll', handleMobileScroll, { passive: true });
            }, 50);
            
            // Center the selected card
            setTimeout(() => {
                centerSelectedCondensedCard();
            }, 100);
        }
        
        // Start live updates if it's a live game
        if (isGameLive(game)) {
            startLiveUpdates(selectedGameIndex);
        }
    }
}

// Switch to a different game in desktop fullscreen modal
function switchDesktopGame(newIndex) {
    const sortedGames = getSortedGames();
    
    if (newIndex >= 0 && newIndex < sortedGames.length && newIndex !== selectedGameIndex) {
        selectedGameIndex = newIndex;
        
        // Update the details panel content if in fullscreen modal
        const detailsPanel = document.getElementById('detailsPanel');
        if (detailsPanel && detailsPanel.classList.contains('fullscreen-modal')) {
            // Store current condensed cards scroll position to preserve it
            const condensedScroll = detailsPanel.querySelector('.desktop-condensed-cards-scroll');
            const condensedScrollLeft = condensedScroll ? condensedScroll.scrollLeft : 0;
            
            const game = sortedGames[newIndex];
            detailsPanel.innerHTML = createDetailsContent(game, selectedGameIndex);
            
            // Restore the scroll position - don't auto-center when browsing condensed cards
            const newCondensedScroll = detailsPanel.querySelector('.desktop-condensed-cards-scroll');
            if (newCondensedScroll && condensedScrollLeft > 0) {
                newCondensedScroll.scrollLeft = condensedScrollLeft;
            }
            
            // Scroll details body to top when switching games
            const detailsBody = detailsPanel.querySelector('.details-body');
            if (detailsBody) {
                detailsBody.scrollTop = 0;
            }
        }
        
        // Start live updates if it's a live game
        const game = sortedGames[newIndex];
        if (isGameLive(game)) {
            startLiveUpdates(selectedGameIndex);
        }
    }
}

// Center the selected condensed card
function centerSelectedCondensedCard() {
    const scrollContainer = document.getElementById('mobileCondensedScroll');
    const activeCard = scrollContainer?.querySelector('.mobile-condensed-card.active');
    
    if (scrollContainer && activeCard) {
        const containerWidth = scrollContainer.offsetWidth;
        const cardWidth = activeCard.offsetWidth;
        const scrollLeft = activeCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
        scrollContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
}

// Center the selected desktop condensed card
function centerSelectedDesktopCard() {
    const scrollContainer = document.getElementById('desktopCondensedScroll');
    const activeCard = scrollContainer?.querySelector('.desktop-condensed-card.active');
    
    if (scrollContainer && activeCard) {
        const containerWidth = scrollContainer.offsetWidth;
        const cardWidth = activeCard.offsetWidth;
        const scrollLeft = activeCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
        scrollContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
}

// Close mobile full page view
function closeMobileFullPageView() {
    // Reset flags
    isFullPageView = false;
    selectedGameIndex = -1;
    
    // Hide mobile full page container and show main content
    const mobileFullPageContainer = document.getElementById('mobileFullPageContainer');
    const mainContent = document.querySelector('.main-content');
    
    if (mobileFullPageContainer) {
        mobileFullPageContainer.style.display = 'none';
        // Clean up scroll event listener and state
        mobileFullPageContainer.removeEventListener('scroll', handleMobileScroll);
        mobileFullPageContainer.classList.remove('scrolled-down');
        
        // Clear all mobile scroll-related state
        lastScrollY = 0;
        isScrolling = false;
        if (mobileScrollTimeout) {
            clearTimeout(mobileScrollTimeout);
            mobileScrollTimeout = null;
        }
    }
    
    if (mainContent) {
        mainContent.style.display = 'block';
    }
    
    // Update layout to reflect no selection
    updateLayout();
}

// Handle mobile scroll events for collapsing interface
let lastScrollY = 0;
let mobileScrollTimeout = null;
let isScrolling = false;

function handleMobileScroll() {
    const container = document.getElementById('mobileFullPageContainer');
    if (!container) return;
    
    const currentScrollY = container.scrollTop;
    
    // Prevent recursive calls
    if (isScrolling) return;
    
    // Clear existing timeout
    if (mobileScrollTimeout) {
        clearTimeout(mobileScrollTimeout);
    }
    
    // Set scrolling flag
    isScrolling = true;
    
    // Immediate response for better UX
    if (currentScrollY > 100) {
        container.classList.add('scrolled-down');
    } else if (currentScrollY <= 30) {
        container.classList.remove('scrolled-down');
    }
    
    // Debounce for final state
    mobileScrollTimeout = setTimeout(() => {
        isScrolling = false;
        lastScrollY = currentScrollY;
    }, 100);
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

// Create mobile full page layout
function createMobileFullPageLayout(game, gameIndex) {
    const sortedGames = getSortedGames();
    const originalIndex = nflGames.findIndex(g => g === sortedGames[gameIndex]);
    const details = getGameDetails(game, originalIndex);
    const isGameFinished = game.status.main.includes('FINAL');
    const isLive = isGameLive(game);
    
    // Create navigation anchors
    const navigationAnchors = `
        <div class="details-navigation">
            <div class="nav-anchor" onclick="scrollToSection('boxscore-section')">
                <span class="nav-icon">📊</span>
                <span class="nav-label">Box Score</span>
            </div>
            <div class="nav-anchor" onclick="scrollToSection('plays-section')">
                <span class="nav-icon">⚡</span>
                <span class="nav-label">Plays</span>
            </div>
            <div class="nav-anchor" onclick="scrollToSection('stats-section')">
                <span class="nav-icon">📈</span>
                <span class="nav-label">Team Stats</span>
            </div>
        </div>
    `;
    
    // Create condensed score cards for top row
    const condensedCards = sortedGames.map((g, i) => {
        const isActive = i === gameIndex;
        const liveGame = isGameLive(g);
        const statusClass = liveGame ? 'live' : '';
        
        return `
            <div class="mobile-condensed-card ${isActive ? 'active' : ''}" onclick="switchMobileGame(${i})">
                <div class="mobile-condensed-logos">
                    <img src="${teamLogos[g.awayTeam.logo] || 'https://via.placeholder.com/24x24/666/fff?text=' + g.awayTeam.shortName}" alt="${g.awayTeam.name} logo" class="mobile-condensed-logo">
                    <img src="${teamLogos[g.homeTeam.logo] || 'https://via.placeholder.com/24x24/666/fff?text=' + g.homeTeam.shortName}" alt="${g.homeTeam.name} logo" class="mobile-condensed-logo">
                </div>
                <div class="mobile-condensed-score">
                    <span>${g.awayTeam.score}</span>-<span>${g.homeTeam.score}</span>
                </div>
                <div class="mobile-condensed-status ${statusClass}">${g.status.main}</div>
            </div>
        `;
    }).join('');
    
    const highlightsSection = isGameFinished ? `
        <div class="mobile-details-section">
            <div class="highlights-container">
                <div class="video-placeholder">
                    <div class="video-thumbnail" style="background-image: url('${getGameThumbnail(game)}'); background-size: cover; background-position: center;">
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
        <div class="mobile-fullpage-header">
            <button class="mobile-back-btn" onclick="closeMobileFullPageView()" aria-label="Back to games">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5"></path>
                    <path d="M12 19l-7-7 7-7"></path>
                </svg>
                Back
            </button>
        </div>
        
        <div class="mobile-condensed-scroll-container">
            <div class="mobile-condensed-cards-scroll" id="mobileCondensedScroll">
                ${condensedCards}
            </div>
        </div>
        
        <div class="mobile-main-game-header">
            <!-- Inline score line for collapsed state (hidden initially) -->
            <div class="mobile-main-score-line">
                <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/36x36/666/fff?text=' + game.awayTeam.shortName}" alt="${game.awayTeam.name} logo" class="mobile-main-logo">
                <div class="mobile-main-score">
                    <span class="mobile-main-score-away">${game.awayTeam.score}</span>
                    <span class="mobile-main-score-vs">-</span>
                    <span class="mobile-main-score-home">${game.homeTeam.score}</span>
                </div>
                <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/36x36/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="mobile-main-logo">
            </div>
            
            <!-- Main expanded layout (visible initially) -->
            <div class="mobile-main-logos">
                <img src="${teamLogos[game.awayTeam.logo] || 'https://via.placeholder.com/80x80/666/fff?text=' + game.awayTeam.shortName}" alt="${game.awayTeam.name} logo" class="mobile-main-logo">
                <img src="${teamLogos[game.homeTeam.logo] || 'https://via.placeholder.com/80x80/666/fff?text=' + game.homeTeam.shortName}" alt="${game.homeTeam.name} logo" class="mobile-main-logo">
            </div>
            
            <div class="mobile-main-score">
                <span class="mobile-main-score-away">${game.awayTeam.score}</span>
                <span class="mobile-main-score-vs">-</span>
                <span class="mobile-main-score-home">${game.homeTeam.score}</span>
            </div>
            
            <div class="mobile-main-teams">
                <span class="mobile-main-team-name">${game.awayTeam.shortName}</span>
                <span class="mobile-main-vs">@</span>
                <span class="mobile-main-team-name">${game.homeTeam.shortName}</span>
            </div>
            
            <div class="mobile-main-status">${game.status.main}</div>
        </div>
        
        <div class="mobile-details-content">
            ${isLive ? navigationAnchors : ''}
            ${highlightsSection}
            ${isGameFinished ? navigationAnchors : ''}
            
            <div class="mobile-details-section" id="boxscore-section">
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
            
            <div class="mobile-details-section" id="plays-section">
                <h4>Recent Plays</h4>
                ${generateExpandablePlays(details.plays, `mobile-plays-container-${gameIndex}`)}
            </div>
            
            <div class="mobile-details-section" id="stats-section">
                <h4>Team Statistics</h4>
                ${generateTeamStatistics(game)}
            </div>
        </div>
    `;
}

// Create full page layout (new page-like view)
function createFullPageLayout(game, gameIndex) {
    const sortedGames = getSortedGames();
    const originalIndex = nflGames.findIndex(g => g === sortedGames[gameIndex]);
    const details = getGameDetails(game, originalIndex);
    const isGameFinished = game.status.main.includes('FINAL');
    const isLive = isGameLive(game);
    
    // Create navigation anchors
    const navigationAnchors = `
        <div class="details-navigation">
            <div class="nav-anchor" onclick="scrollToSection('boxscore-section')">
                <span class="nav-icon">📊</span>
                <span class="nav-label">Box Score</span>
            </div>
            <div class="nav-anchor" onclick="scrollToSection('plays-section')">
                <span class="nav-icon">⚡</span>
                <span class="nav-label">Plays</span>
            </div>
            <div class="nav-anchor" onclick="scrollToSection('stats-section')">
                <span class="nav-icon">📈</span>
                <span class="nav-label">Team Stats</span>
            </div>
        </div>
    `;
    
    const highlightsSection = isGameFinished ? `
        <div class="details-section">
            <div class="highlights-container">
                <div class="video-placeholder">
                    <div class="video-thumbnail" style="background-image: url('${getGameThumbnail(game)}'); background-size: cover; background-position: center;">
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
                    <h1 class="fullpage-title">${game.awayTeam.shortName} @ ${game.homeTeam.shortName}</h1>
                    <div class="fullpage-status">${game.status.main}</div>
                </div>
            </div>
            
            <div class="fullpage-body">
                ${isLive ? navigationAnchors : ''}
                ${highlightsSection}
                ${isGameFinished ? navigationAnchors : ''}
                
                <div class="details-section" id="boxscore-section">
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
                    ${generateExpandablePlays(details.plays, `fullpage-plays-container-${actualGameIndex}`)}
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
            <div class="highlights-container">
                <div class="video-placeholder">
                    <div class="video-thumbnail" style="background-image: url('${getGameThumbnail(game)}'); background-size: cover; background-position: center;">
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
            
            <div class="details-section" id="plays-section">
                <h4>Recent Plays</h4>
                ${generateExpandablePlays(details.plays, `consistent-plays-container-${gameIndex}`)}
            </div>
            
            <div class="details-section" id="stats-section">
                <h4>Team Statistics</h4>
                ${generateTeamStatistics(game)}
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

// Update mobile layout with full page system
function updateMobileLayout() {
    populateGames(); // Use standard game population
    updateLayoutClasses();
    
    // For mobile, automatically show full page view when a game is selected
    if (selectedGameIndex >= 0 && !isFullPageView) {
        showMobileFullPageView();
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
        
        // Add special class for Week 1, Week 2, or Week 7 when no selection
        if (weekSelect) {
            if (weekSelect.value === '1' || weekSelect.value === '7') {
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
        // Check if we're switching to a different game
        const isSwitchingGame = previousGameIndex !== selectedGameIndex && previousGameIndex !== -1;
        
        // Store current scroll position before updating content (only if not switching games)
        const detailsBody = detailsPanel.querySelector('.details-body');
        const currentScrollTop = !isSwitchingGame && detailsBody ? detailsBody.scrollTop : 0;
        
        // Store current condensed cards scroll position to preserve it during updates
        const condensedScroll = detailsPanel.querySelector('.desktop-condensed-cards-scroll');
        const condensedScrollLeft = condensedScroll ? condensedScroll.scrollLeft : 0;
        
        // Hide content during update to prevent flash
        if (detailsBody && currentScrollTop > 0) {
            detailsBody.style.opacity = '0';
        }
        
        const sortedGames = getSortedGames();
        const game = sortedGames[selectedGameIndex]; // Use sorted games array, not original
        detailsPanel.innerHTML = createDetailsContent(game, selectedGameIndex);
        
        // Restore scroll positions immediately
        const newDetailsBody = detailsPanel.querySelector('.details-body');
        const newCondensedScroll = detailsPanel.querySelector('.desktop-condensed-cards-scroll');
        
        // Restore details body scroll position (only if not switching games)
        if (newDetailsBody && currentScrollTop > 0 && !isSwitchingGame) {
            newDetailsBody.scrollTop = currentScrollTop;
            // Use requestAnimationFrame for smoother transition
            requestAnimationFrame(() => {
                newDetailsBody.style.opacity = '1';
            });
        }
        
        // Restore condensed cards scroll position (preserve user's scroll state)
        if (newCondensedScroll && condensedScrollLeft > 0) {
            newCondensedScroll.scrollLeft = condensedScrollLeft;
        } else if (newCondensedScroll && isSwitchingGame) {
            // Only auto-center when switching games, not during live updates
            setTimeout(() => {
                centerSelectedDesktopCard();
            }, 100);
        }
        
        // Reset the previous game index after handling the switch
        if (isSwitchingGame) {
            previousGameIndex = selectedGameIndex;
        }
    } else {
        detailsPanel.innerHTML = '';
        previousGameIndex = -1; // Reset when closing details
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
            <div class="mobile-game-title">${game.awayTeam.shortName} @ ${game.homeTeam.shortName}</div>
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
    
    // Create navigation anchors
    const navigationAnchors = `
        <div class="details-navigation">
            <div class="nav-anchor" onclick="scrollToSection('boxscore-section')">
                <span class="nav-icon">📊</span>
                <span class="nav-label">Box Score</span>
            </div>
            <div class="nav-anchor" onclick="scrollToSection('plays-section')">
                <span class="nav-icon">⚡</span>
                <span class="nav-label">Plays</span>
            </div>
            <div class="nav-anchor" onclick="scrollToSection('stats-section')">
                <span class="nav-icon">📈</span>
                <span class="nav-label">Team Stats</span>
            </div>
        </div>
    `;
    
    const highlightsSection = isGameFinished ? `
        <div class="details-section">
            <div class="highlights-container">
                <div class="video-placeholder">
                    <div class="video-thumbnail" style="background-image: url('${getGameThumbnail(game)}'); background-size: cover; background-position: center;">
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
            ${isLive ? navigationAnchors : ''}
            ${highlightsSection}
            ${isGameFinished ? navigationAnchors : ''}
            
            <div class="details-section" id="boxscore-section">
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
            
            <div class="details-section" id="plays-section">
                <h4>Recent Plays</h4>
                ${generateExpandablePlays(details.plays, `consistent-plays-container-${gameIndex}`)}
            </div>
            
            <div class="details-section" id="stats-section">
                <h4>Team Statistics</h4>
                ${generateTeamStatistics(game)}
            </div>
        </div>
    `;
}

// Show mobile full page view
function showMobileFullPageView() {
    console.log('showMobileFullPageView called:', { selectedGameIndex, isFullPageView });
    
    if (selectedGameIndex < 0) return;
    
    // Set full page view flag
    isFullPageView = true;
    
    const sortedGames = getSortedGames();
    const game = sortedGames[selectedGameIndex];
    
    // Hide main content and show mobile full page view
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    // Create mobile full page container
    let mobileFullPageContainer = document.getElementById('mobileFullPageContainer');
    if (!mobileFullPageContainer) {
        mobileFullPageContainer = document.createElement('div');
        mobileFullPageContainer.id = 'mobileFullPageContainer';
        mobileFullPageContainer.className = 'mobile-fullpage-container';
        document.body.appendChild(mobileFullPageContainer);
    }
    
    // Populate mobile full page content
    mobileFullPageContainer.innerHTML = createMobileFullPageLayout(game, selectedGameIndex);
    mobileFullPageContainer.style.display = 'block';
    
    // Center the selected card after a brief delay
    setTimeout(() => {
        centerSelectedCondensedCard();
    }, 100);
    
    // Clean up any existing scroll listeners first
    mobileFullPageContainer.removeEventListener('scroll', handleMobileScroll);
    
    // Add fresh scroll event listener for mobile interactions
    mobileFullPageContainer.addEventListener('scroll', handleMobileScroll, { passive: true });
    
    // Reset scroll state
    lastScrollY = 0;
    isScrolling = false;
    if (mobileScrollTimeout) {
        clearTimeout(mobileScrollTimeout);
        mobileScrollTimeout = null;
    }
    mobileFullPageContainer.classList.remove('scrolled-down');
    
    // Scroll to top
    window.scrollTo(0, 0);
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
    
    // Store current scroll position before updating content
    const currentScrollTop = modalBody.scrollTop || 0;
    
    // Hide content during update to prevent flash
    if (currentScrollTop > 0) {
        modalBody.style.opacity = '0';
    }
    
    const sortedGames = getSortedGames();
    const game = sortedGames[selectedGameIndex];
    const originalIndex = nflGames.findIndex(g => g === sortedGames[selectedGameIndex]);
    const details = getGameDetails(game, originalIndex);
    const isGameFinished = game.status.main.includes('FINAL');
    
    const highlightsSection = isGameFinished ? `
        <div class="details-section">
            <div class="highlights-container">
                <div class="video-placeholder">
                    <div class="video-thumbnail" style="background-image: url('${getGameThumbnail(game)}'); background-size: cover; background-position: center;">
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
            ${generateExpandablePlays(details.plays, `newpage-plays-container-${gameIndex}`)}
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
    
    // Restore scroll position immediately and show content
    if (modalBody && currentScrollTop > 0) {
        modalBody.scrollTop = currentScrollTop;
        // Use requestAnimationFrame for smoother transition
        requestAnimationFrame(() => {
            modalBody.style.opacity = '1';
        });
    }
}


// Function to create a game card HTML
function createGameCard(game, gameIndex) {
    const isSelected = selectedGameIndex === gameIndex;
    const liveGame = isGameLive(game);
    
    // Check if we should use abbreviations
    const weekSelect = document.getElementById('week-select');
    const selectedWeek = weekSelect ? weekSelect.value : '1';
    const isCollapsed = selectedGameIndex >= 0 && !isMobile();
    const hasMoreThan3Columns = selectedWeek === '1' || selectedWeek === '7'; // Week 1 and Week 7 have 4 columns
    const isWeek4 = selectedWeek === '4'; // Week 4 vertical tabs
    const shouldUseAbbreviations = (isCollapsed && hasMoreThan3Columns) || isWeek4;
    
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


    // Use abbreviations for Week 4 or when collapsed with more than 3 columns (Week 1 and Week 7)
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
        </div>
    `;
}

// Function to create a video card for Week 7
function createVideoCard(gameIndex) {
    const isSelected = selectedGameIndex === gameIndex;
    
    return `
        <div class="game-card video-card ${isSelected ? 'selected' : ''}" 
             data-game-index="${gameIndex}" 
             onclick="toggleGameDetails(${gameIndex})">
            
            <div class="video-container">
                <video autoplay muted loop playsinline class="game-video">
                    <source src="https://picsum.photos/320/180.mp4" type="video/mp4">
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                    <!-- Fallback image if video fails to load -->
                    <img src="https://picsum.photos/320/180?random=99" alt="Video fallback" style="width: 100%; height: 100%; object-fit: cover;">
                </video>
                
                <div class="video-overlay">
                    <div class="video-title">Advertisement</div>
                </div>
            </div>
        </div>
    `;
}

// Function to populate games
function populateGames() {
    const gamesContainer = document.getElementById('gamesContainer');
    if (!gamesContainer) return;
    
    const weekSelect = document.getElementById('week-select');
    const selectedWeek = weekSelect ? weekSelect.value : '1';
    
    const sortedGames = getSortedGames();
    
    if (selectedWeek === '7') {
        // For Week 7, replace the game at index 3 (top of furthest column) with video
        const gameCardsHtml = sortedGames.map((game, index) => {
            if (index === 3) {
                return createVideoCard(index);
            }
            return createGameCard(game, index);
        }).join('');
        gamesContainer.innerHTML = gameCardsHtml;
    } else {
        const gameCardsHtml = sortedGames.map((game, index) => createGameCard(game, index)).join('');
        gamesContainer.innerHTML = gameCardsHtml;
    }
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
        gamesContainer.classList.remove('two-column-layout', 'three-column-layout', 'four-column-layout', 'vertical-tabs-layout', 'week5-with-video');
        contentLayout.classList.remove('week4-vertical-tabs', 'week5-layout', 'week6-header-video');
        
        // Apply appropriate layout for each week
        if (selectedWeek === '1' || selectedWeek === '7') {
            gamesContainer.classList.add('four-column-layout');
        } else if (selectedWeek === '2') {
            gamesContainer.classList.add('three-column-layout');
        } else if (selectedWeek === '4') {
            gamesContainer.classList.add('vertical-tabs-layout');
            contentLayout.classList.add('week4-vertical-tabs');
        } else if (selectedWeek === '5') {
            gamesContainer.classList.add('week5-with-video');
            contentLayout.classList.add('week5-layout');
            addWeek5VideoColumn();
        } else if (selectedWeek === '6') {
            gamesContainer.classList.add('two-column-layout');
            contentLayout.classList.add('week6-header-video');
            addWeek6HeaderVideo();
        } else {
            gamesContainer.classList.add('two-column-layout');
        }
        
        // Remove Week 5 video column if not Week 5
        if (selectedWeek !== '5') {
            removeWeek5VideoColumn();
        }
        
        // Remove Week 6 header video if not Week 6
        if (selectedWeek !== '6') {
            removeWeek6HeaderVideo();
        }
        
        // Hide video rail for Week 7 to avoid duplicates
        const videoRail = document.getElementById('videoRail');
        if (videoRail) {
            if (selectedWeek === '7') {
                videoRail.style.display = 'none';
                videoRail.classList.add('week7-hidden');
            } else {
                videoRail.style.display = 'block';
                videoRail.classList.remove('week7-hidden');
            }
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

// Scroll to section functionality for navigation anchors
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Get the details body container for smooth scrolling
        const detailsBody = document.querySelector('.details-body');
        if (detailsBody) {
            const sectionTop = section.offsetTop - detailsBody.offsetTop - 20; // Add some offset
            detailsBody.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }
}

// Week 5 Video Column Management
function addWeek5VideoColumn() {
    const contentLayout = document.getElementById('contentLayout');
    if (!contentLayout) return;
    
    // Remove existing video column if present
    removeWeek5VideoColumn();
    
    // Reset scroll state for fresh start
    week5HasScrolled = false;
    
    // Hide the floating video rail completely for Week 5
    const existingVideoRail = document.getElementById('videoRail');
    if (existingVideoRail) {
        existingVideoRail.style.display = 'none';
    }
    
    // Create video column
    const videoColumn = document.createElement('div');
    videoColumn.id = 'week5VideoColumn';
    videoColumn.className = 'week5-video-column'; // Start without 'scrolled' class = expanded state
    
    // Get video rail content from existing rail
    if (existingVideoRail) {
        const videoRailContent = existingVideoRail.querySelector('.video-rail-content');
        if (videoRailContent) {
            videoColumn.innerHTML = videoRailContent.outerHTML;
        }
    }
    
    // Add to content layout
    contentLayout.appendChild(videoColumn);
    
    // Initialize scroll behavior for Week 5 video column
    initializeWeek5ScrollBehavior();
}

function removeWeek5VideoColumn() {
    const existingVideoColumn = document.getElementById('week5VideoColumn');
    if (existingVideoColumn) {
        existingVideoColumn.remove();
    }
    
    // Restore the floating video rail when leaving Week 5
    const existingVideoRail = document.getElementById('videoRail');
    if (existingVideoRail) {
        existingVideoRail.style.display = 'block';
    }
    
    // Reset scroll state
    week5HasScrolled = false;
    
    // Clean up scroll listener
    if (week5ScrollTimeout) {
        clearTimeout(week5ScrollTimeout);
        week5ScrollTimeout = null;
    }
    window.removeEventListener('scroll', handleWeek5Scroll);
}

// Week 5 scroll behavior for video column collapse
let week5ScrollTimeout;
let week5HasScrolled = false; // Track if user has scrolled at all

function handleWeek5Scroll() {
    const weekSelect = document.getElementById('week-select');
    const selectedWeek = weekSelect ? weekSelect.value : '1';
    
    // Only apply scroll behavior for Week 5
    if (selectedWeek !== '5') return;
    
    const videoColumn = document.getElementById('week5VideoColumn');
    if (!videoColumn) return;
    
    const scrollY = window.scrollY;
    
    // Once user scrolls for the first time, collapse and keep collapsed
    if (scrollY > 50 && !week5HasScrolled) {
        week5HasScrolled = true;
        videoColumn.classList.add('scrolled');
    }
    
    // If user has scrolled before, keep it collapsed
    if (week5HasScrolled) {
        videoColumn.classList.add('scrolled');
    }
}

// Initialize Week 5 scroll behavior
function initializeWeek5ScrollBehavior() {
    // Remove existing listener if any
    window.removeEventListener('scroll', handleWeek5Scroll);
    
    // Add scroll listener
    window.addEventListener('scroll', handleWeek5Scroll, { passive: true });
}

// Week 6 Header Video Management
function addWeek6HeaderVideo() {
    const pageHeader = document.querySelector('.page-header');
    if (!pageHeader) return;
    
    // Remove existing video if present
    removeWeek6HeaderVideo();
    
    // Create header video container
    const headerVideoContainer = document.createElement('div');
    headerVideoContainer.id = 'week6HeaderVideo';
    headerVideoContainer.className = 'week6-header-video-container';
    
    // Get video content from existing video rail
    const existingVideoRail = document.getElementById('videoRail');
    if (existingVideoRail) {
        const videoRailContent = existingVideoRail.querySelector('.video-rail-content');
        if (videoRailContent) {
            // Clone the video content for the header
            const headerVideoContent = videoRailContent.cloneNode(true);
            headerVideoContent.className = 'week6-header-video-content';
            headerVideoContainer.appendChild(headerVideoContent);
        }
        
        // Hide the original video rail for Week 6
        existingVideoRail.style.display = 'none';
        existingVideoRail.classList.add('week6-hidden');
    }
    
    // Add to header
    pageHeader.appendChild(headerVideoContainer);
}

function removeWeek6HeaderVideo() {
    const existingHeaderVideo = document.getElementById('week6HeaderVideo');
    if (existingHeaderVideo) {
        existingHeaderVideo.remove();
    }
    
    // Restore the original video rail when leaving Week 6
    const existingVideoRail = document.getElementById('videoRail');
    if (existingVideoRail) {
        existingVideoRail.style.display = 'block';
        existingVideoRail.classList.remove('week6-hidden');
    }
}

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