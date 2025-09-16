# NFL Scores Tracker MVP

A responsive NFL scores website built with vanilla HTML, CSS, and JavaScript. Features a professional CBS Sports-inspired design with expandable game details and mobile-optimized experience.

## 🏈 Features

### Core Functionality
- **Real-time NFL Scores Display**: Clean, condensed view of 12 NFL games
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices  
- **Interactive Game Details**: Click any game to view expanded statistics and information
- **Professional UI**: CBS Sports-inspired design with official team logos

### Game Details Include:
- **Team Logos**: Official NFL team logos from ESPN
- **Box Scores**: Quarter-by-quarter scoring breakdown
- **Game Highlights**: Video thumbnails for finished games
- **Play-by-Play**: Recent plays and game progression
- **Team Statistics**: Comprehensive stats comparison
- **Betting Information**: Point spreads and over/under totals

### Responsive Experience
- **Desktop (>1024px)**: Side-by-side layout with condensed scores and detailed panel
- **Mobile (≤1024px)**: Inline expansion with smooth card transitions
- **Touch-Friendly**: Optimized for mobile interaction patterns

## 🚀 Live Demo

Simply open `index.html` in your browser to view the website locally.

## 📱 User Experience

### Desktop
- **2-column condensed game cards** (48% width)
- **Expandable details panel** (52% width)
- **Sticky positioning** with smooth transitions
- **Click any game** → Details slide in from right

### Mobile
- **Single-column game list**
- **Inline expansion** directly under selected game
- **Other cards shift down** to accommodate details
- **Touch-optimized scrolling** and interactions

## 🛠️ Technical Stack

- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Flexbox/Grid layouts with smooth animations
- **Vanilla JavaScript**: Dynamic content generation and state management
- **Google Fonts**: Professional Inter font family
- **ESPN Logos**: Official team logos via CDN

## 📂 Project Structure

```
gametracker-mvp-concept/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design  
├── script.js           # Game data, interactions, and state management
└── README.md           # Project documentation
```

## 🎨 Design Features

### Visual Elements
- **Team Branding**: Official NFL team logos throughout
- **Professional Typography**: Inter font with proper hierarchy
- **Smooth Animations**: CSS transitions for all interactions
- **Video Thumbnails**: CSS-based highlight previews for finished games

### Color Scheme
- **CBS Sports Navy**: `#002856` for navigation
- **Clean Backgrounds**: White cards with subtle shadows
- **Smart Contrast**: Accessible text and interactive elements

## 🔧 Customization

### Adding New Games
Edit the `nflGames` array in `script.js`:

```javascript
const nflGames = [
    {
        homeTeam: { name: 'Team Name', shortName: 'ABC', score: 21, logo: 'team-key' },
        awayTeam: { name: 'Team Name', shortName: 'XYZ', score: 14, logo: 'team-key' },
        status: { main: 'FINAL', network: 'NBC' },
        details: { spread: 'ABC -3.5', total: 'OVER 45' }
    }
];
```

### Team Logos
Add new team logos to the `teamLogos` object in `script.js`:

```javascript
const teamLogos = {
    'team-key': 'https://a.espncdn.com/i/teamlogos/nfl/500/abc.png'
};
```

## 📋 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Responsive Breakpoints**: 1200px, 1024px, 768px, 480px

## 🚀 Future Enhancements

- Real-time score updates via sports API
- Live game streaming integration  
- Push notifications for score changes
- Social sharing functionality
- Favorite teams customization
- Historical game data

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for NFL fans everywhere!
