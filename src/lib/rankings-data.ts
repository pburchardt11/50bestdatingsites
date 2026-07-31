export interface ExternalRanking {
  label: string;
  source: string;
  type: 'award' | 'rating' | 'ranking' | 'milestone' | 'recognition';
}

export const siteRankings: Record<string, ExternalRanking[]> = {
  tinder: [
    { label: '#1 Most Downloaded Dating App Worldwide', source: 'AppTweak 2025', type: 'ranking' },
    { label: '530M+ Total Downloads', source: 'TechCrunch 2024', type: 'milestone' },
    { label: '4.2★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: '#1 Top Grossing Dating App', source: 'Sensor Tower 2024', type: 'ranking' },
    { label: 'Best Mobile Dating App', source: 'iDate Awards', type: 'award' },
    { label: 'Available in 190+ Countries', source: 'Tinder official', type: 'milestone' },
    { label: 'Most Innovative Company — Social Media', source: 'Fast Company 2022', type: 'award' },
    { label: '$1.94B Annual Revenue', source: 'Match Group / Business of Apps 2024', type: 'milestone' },
  ],
  bumble: [
    { label: '#2 Most Downloaded Dating App', source: 'AppTweak 2025', type: 'ranking' },
    { label: '4.3★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: "Apple 'Trend of the Year' Winner", source: 'App Store Awards 2021', type: 'award' },
    { label: 'Best Marketing Campaign', source: 'iDate Awards 2019', type: 'award' },
    { label: 'NASDAQ Listed (BMBL) — $2.15B IPO', source: 'CNBC / Bloomberg 2021', type: 'milestone' },
    { label: 'Youngest Female Founder to Take US Company Public', source: 'Forbes 2021', type: 'recognition' },
    { label: 'Google Play Users Choice Award — Best for Fun', source: 'Google Play 2023', type: 'award' },
  ],
  hinge: [
    { label: '#3 Most Downloaded Dating App', source: 'AppTweak 2025', type: 'ranking' },
    { label: '4.4★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: 'Fastest-Growing Dating App by Revenue', source: 'Match Group 2022–2024', type: 'recognition' },
    { label: '#1 App for Marriages (35% of couples)', source: 'The Knot 2024', type: 'ranking' },
    { label: '#1 Dating App in UK, Australia, Canada & Nordics', source: 'Business of Apps / AppTweak 2024', type: 'ranking' },
    { label: 'Sets Up a Date Every 2 Seconds', source: 'Hinge / Fortune 2023', type: 'milestone' },
    { label: '$550M Revenue — 39% YoY Growth', source: 'Match Group 2024', type: 'milestone' },
  ],
  okcupid: [
    { label: '4.3★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: 'Top 10 Dating Sites', source: 'Time Magazine 2007', type: 'recognition' },
    { label: 'First App with 22 Gender Options', source: 'OkCupid/GLAAD 2014', type: 'recognition' },
    { label: '#1 Rated Dating Site', source: 'Consumer Reports 2016', type: 'ranking' },
    { label: 'GLAAD & HRC Partner for LGBTQ+ Inclusion', source: 'OkCupid / GLAAD', type: 'recognition' },
  ],
  'match-com': [
    { label: "World's First Commercial Dating Website 1995", source: 'Fox Business', type: 'recognition' },
    { label: 'Most Innovative Company', source: 'iDate Awards 2015', type: 'award' },
    { label: '21.5M Registered Users', source: 'Match Group 2024', type: 'milestone' },
  ],
  'plenty-of-fish': [
    { label: '4.3★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: '150M+ Registered Users', source: 'Match Group', type: 'milestone' },
    { label: '#1 Free Dating Site', source: 'Industry consensus', type: 'ranking' },
    { label: 'Most Popular Dating App in Canada', source: 'AppTweak', type: 'ranking' },
  ],
  badoo: [
    { label: '4.6★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: '460M+ Users in 190 Countries', source: 'Business of Apps 2024', type: 'milestone' },
    { label: 'Best Dating Site', source: 'iDate Awards 2019', type: 'award' },
    { label: '#1 in Latin America & Southern Europe', source: 'AppTweak', type: 'ranking' },
  ],
  zoosk: [
    { label: '4.2★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: 'Available in 80+ Countries & 25 Languages', source: 'Zoosk official', type: 'milestone' },
    { label: 'Best Dating Site', source: 'iDate Awards 2015', type: 'award' },
    { label: 'Featured on Sex and the City & And Just Like That', source: 'HBO / Zoosk', type: 'recognition' },
  ],
  'coffee-meets-bagel': [
    { label: 'Featured on Shark Tank', source: 'ABC 2015', type: 'recognition' },
    { label: '2.5B+ Introductions Made', source: 'CMB official', type: 'milestone' },
    { label: '#1 Among Asian American Communities', source: 'Industry surveys', type: 'ranking' },
  ],
  eharmony: [
    { label: '4.1★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: 'BBB A Rating', source: 'Better Business Bureau', type: 'recognition' },
    { label: '2M+ US Marriages Facilitated', source: 'Harris Interactive study', type: 'milestone' },
    { label: '4% of US Marriages — 438 Per Day', source: 'eHarmony / Harris Interactive 2012', type: 'milestone' },
  ],
  parship: [
    { label: '#1 Dating Site in Germany', source: 'Statista 2022', type: 'ranking' },
    { label: 'Market Leader in DACH Region', source: 'Parship official', type: 'ranking' },
  ],
  grindr: [
    { label: '4.5★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: "World's First Location-Based Dating App", source: 'HBS', type: 'recognition' },
    { label: '#1 Gay Dating App Worldwide', source: 'Business of Apps 2024', type: 'ranking' },
    { label: '#4 Highest-Grossing Dating App', source: 'Sensor Tower 2024', type: 'ranking' },
    { label: 'Best Dating App', source: 'Shorty Awards 2018', type: 'award' },
    { label: 'NYSE Listed (GRND) — First Major LGBTQ+ Public Company', source: 'NYSE / CNBC 2022', type: 'milestone' },
  ],
  her: [
    { label: '4.4★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: '#1 Dating App for Lesbian & Queer Women', source: 'Industry consensus', type: 'ranking' },
  ],
  muzz: [
    { label: '4.5★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: '#1 Muslim Dating App Worldwide', source: 'Muzz official', type: 'ranking' },
    { label: '600K+ Muslim Marriages Facilitated', source: 'Muzz 2024', type: 'milestone' },
    { label: 'Backed by Y Combinator', source: 'Y Combinator', type: 'recognition' },
  ],
  jdate: [
    { label: '52% of Jewish Online Marriages', source: 'ResearchNow 2011', type: 'milestone' },
    { label: '#1 Jewish Dating Site for 25+ Years', source: 'JDate official', type: 'ranking' },
  ],
  'christian-mingle': [
    { label: 'Largest Christian Dating Community 16M+', source: 'ChristianMingle official', type: 'milestone' },
    { label: 'Webby Awards Honoree', source: 'Webby Awards 2013', type: 'award' },
  ],
  feeld: [
    { label: '4.3★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: '#1 App for Ethical Non-Monogamy', source: 'Industry consensus', type: 'ranking' },
    { label: '30% Year-over-Year Growth', source: 'The Guardian 2024', type: 'recognition' },
    { label: 'Innovation by Design Award — Graphic Design', source: 'Fast Company 2024', type: 'award' },
    { label: 'Best Real-Time Response Campaign', source: 'Webby Awards 2024', type: 'award' },
  ],
  happn: [
    { label: '4.3★ App Store Rating', source: 'Apple', type: 'rating' },
    { label: '100M+ Users in 190 Countries', source: 'Happn 2024', type: 'milestone' },
    { label: '#2 Dating App in France', source: 'Sensor Tower 2023', type: 'ranking' },
  ],
  tantan: [
    { label: '#1 Swipe-Based Dating App in China', source: 'Daxue Consulting', type: 'ranking' },
    { label: 'Acquired for $735M', source: 'TechCrunch 2018', type: 'recognition' },
  ],
  pairs: [
    { label: '#1 Dating App in Japan by Revenue', source: 'Statista 2024', type: 'ranking' },
    { label: '20M+ Members', source: 'Pairs official', type: 'milestone' },
  ],
  blued: [
    { label: "World's Largest Gay App by Users", source: 'Forbes 2019', type: 'recognition' },
    { label: '49M+ Users', source: 'Blued official', type: 'milestone' },
    { label: 'NASDAQ Listed (BLCT)', source: 'NASDAQ', type: 'recognition' },
  ],
  'dil-mil': [
    { label: '#1 South Asian Diaspora Dating App', source: 'Dil Mil official', type: 'ranking' },
    { label: '30M+ Matches Made', source: 'Dil Mil official', type: 'milestone' },
  ],
  seeking: [
    { label: '40M+ Registered Users', source: 'Seeking official', type: 'milestone' },
  ],
  'elite-singles': [
    { label: '85%+ Members Hold a University Degree', source: 'EliteSingles official', type: 'milestone' },
  ],
  'silver-singles': [
    { label: 'Best for Over-50 Category', source: 'Nasdaq 2023', type: 'award' },
  ],
  scruff: [
    { label: 'Best Dating App', source: 'Digital Awards BR 2025', type: 'award' },
  ],
  'farmers-only': [
    { label: '#1 Rural Dating App in North America', source: 'FarmersOnly official', type: 'ranking' },
    { label: '10M+ Members', source: 'FarmersOnly official', type: 'milestone' },
  ],
  raya: [
    { label: '~8% Acceptance Rate', source: 'New York Times', type: 'recognition' },
  ],
  'the-league': [
    { label: '<8% Acceptance Rate', source: 'The League official', type: 'recognition' },
  ],
  'inner-circle': [
    { label: 'Deloitte Technology Fast 50 Winner', source: 'Deloitte', type: 'award' },
  ],
  azar: [
    { label: '290M+ Total Downloads', source: 'Azar official', type: 'milestone' },
    { label: 'Part of Match Group', source: 'Match Group', type: 'recognition' },
  ],
};
