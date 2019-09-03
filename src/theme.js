export default {
  fontFamily: {
    default: "'Arvo', serif"
  },
  fontSize: {
    hero: '3rem',
    big: '1.3rem',
    default: '1rem',
    small: '0.75rem',
  },
  color: {
    background: '#191919',
    backgroundGradient: 'linear-gradient(#333333, #191919)',
    textPrimary: 'rgba(255, 255, 255, 0.89)',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textDisabled: 'rgba(255, 255, 255, 0.3)',
    primary: '#27AE60',
    divider: 'rgba(255, 255, 255, 0.6)',
  },
  spacing: multiplier => 8 * multiplier,
  borderRadius: 4,
  duration: {
    default: 500,
    short: 250,
    shortest: 175,
  }
}