import { IconType } from 'react-icons';
import { 
  FaEye, FaSitemap, FaNetworkWired, FaServer, FaShieldAlt, 
  FaSearch, FaTerminal, FaEnvelope, FaGoogle 
} from 'react-icons/fa';

export interface Tool {
  name: string;
  type: string;
  description: string;
  command?: string;
  link?: string;
}

export interface ToolCategory {
  id: string;
  icon: IconType;
  title: string;
  description: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'osint',
    icon: FaEye,
    title: 'OSINT & General Intelligence',
    description: 'Open Source Intelligence gathering platforms and frameworks',
    tools: [
      // Frameworks & Platforms
      { name: 'OSINT Framework', type: 'Platform', description: 'Comprehensive collection of OSINT tools and resources', link: 'https://osintframework.com/' },
      { name: 'Recon-ng', type: 'Framework', description: 'Full-featured reconnaissance framework', command: 'recon-ng', link: 'https://github.com/lanmaster53/recon-ng' },
      { name: 'DataSploit', type: 'Automation', description: 'Performs automated OSINT on a domain/email/username/phone and finds relevant information from different sources', link: 'https://github.com/DataSploit/datasploit' },
      { name: 'OSINT Curious', type: 'Training', description: 'OSINT training and educational resources', link: 'https://osintcurio.us/' },
      { name: 'Bellingcat', type: 'Investigation', description: 'Investigative journalism and OSINT training', link: 'https://www.bellingcat.com/' },
      
      // Search Engines & Archives
      { name: 'Censys', type: 'Search Engine', description: 'Internet-wide scanning and certificate transparency', link: 'https://search.censys.io/' },
      { name: 'VirusTotal', type: 'Analysis', description: 'File and URL analysis platform', link: 'https://www.virustotal.com/' },
      { name: 'URLVoid', type: 'Reputation', description: 'Website reputation and safety checker', link: 'https://www.urlvoid.com/' },
      { name: 'DuckDuckGo', type: 'Search Engine', description: 'Privacy-focused search engine', link: 'https://duckduckgo.com/' },
      { name: 'Yandex', type: 'Search Engine', description: 'Russian search engine with unique image search', link: 'https://yandex.com/' },
      { name: 'Baidu', type: 'Search Engine', description: 'Chinese search engine', link: 'https://www.baidu.com/' },
      { name: 'Wayback Machine', type: 'Archive', description: 'Internet archive for historical website data', link: 'https://archive.org/' },
      { name: 'Archive.today', type: 'Archive', description: 'Website archiving service', link: 'https://archive.today/' },
      { name: 'Zone-H', type: 'Archive', description: 'Website defacement archive and security incidents', link: 'https://www.zone-h.org/archive/special=1' },
      
      // Social Media & People Search
      { name: 'WhatsMyName', type: 'Username Search', description: 'Username enumeration across platforms', link: 'https://whatsmyname.app/' },
      { name: 'Namechk', type: 'Username Search', description: 'Check username availability across platforms', link: 'https://namechk.com/' },
      { name: 'Pipl', type: 'People Search', description: 'Deep web people search engine', link: 'https://pipl.com/' },
      { name: 'TruePeopleSearch', type: 'People Search', description: 'Free people search engine', link: 'https://www.truepeoplesearch.com/' },
      { name: 'That\'s Them', type: 'People Search', description: 'Free people search and reverse lookups', link: 'https://thatsthem.com/' },
      { name: 'Social Searcher', type: 'Social Media', description: 'Social media search engine', link: 'https://www.social-searcher.com/' },
      { name: 'TweetDeck', type: 'Social Media', description: 'Advanced Twitter search and monitoring', link: 'https://tweetdeck.twitter.com/' },
      { name: 'IntelTechniques', type: 'Social Media', description: 'Social media investigation tools', link: 'https://inteltechniques.com/' },
      
      // Email & Breach Data
      { name: 'H8mail', type: 'Email Intel', description: 'Email OSINT and breach hunting', command: 'h8mail -t target@domain.com', link: 'https://github.com/khast3x/h8mail' },
      { name: 'Have I Been Pwned', type: 'Breach Data', description: 'Check if email addresses have been compromised', link: 'https://haveibeenpwned.com/' },
      { name: 'DeHashed', type: 'Breach Data', description: 'Database breach search engine', link: 'https://dehashed.com/' },
      { name: 'Breach Directory', type: 'Breach Data', description: 'Data breach search and analysis', link: 'https://breachdirectory.org/' },
      { name: 'Hunter.io', type: 'Email Intel', description: 'Find email addresses associated with domains', link: 'https://hunter.io/' },
      { name: 'VoilaNorbert', type: 'Email Intel', description: 'Email finder and verification tool', link: 'https://www.voilanorbert.com/' },
      { name: 'EmailHippo', type: 'Email Intel', description: 'Email verification and validation', link: 'https://tools.emailhippo.com/' },
      
      // Business & Financial Intelligence
      { name: 'Crunchbase', type: 'Business Intel', description: 'Company information and business intelligence', link: 'https://crunchbase.com' },
      { name: 'OpenCorporates', type: 'Business Intel', description: 'Global database of companies', link: 'https://opencorporates.com/' },
      { name: 'Company House (UK)', type: 'Business Intel', description: 'UK company information database', link: 'https://find-and-update.company-information.service.gov.uk/' },
      { name: 'SEC EDGAR', type: 'Financial Intel', description: 'US SEC filings database', link: 'https://www.sec.gov/edgar.shtml' },
      { name: 'Orbis', type: 'Business Intel', description: 'Global company and financial information', link: 'https://orbis.bvdinfo.com/' },
      { name: 'Dun & Bradstreet', type: 'Business Intel', description: 'Business information and analytics', link: 'https://www.dnb.com/' },
      
      // Geolocation & Maps
      { name: 'Google Earth', type: 'Geolocation', description: 'Satellite imagery and mapping', link: 'https://earth.google.com/' },
      { name: 'Bing Maps', type: 'Geolocation', description: 'Microsoft mapping service', link: 'https://www.bing.com/maps' },
      { name: 'Wikimapia', type: 'Geolocation', description: 'Collaborative mapping project', link: 'http://wikimapia.org/' },
      { name: 'GeoSpy', type: 'Geolocation', description: 'Image geolocation tool', link: 'https://geospy.web.app/' },
      { name: 'SunCalc', type: 'Geolocation', description: 'Sun position calculator for photos', link: 'https://www.suncalc.org/' },
      
      // Investigative & Legal
      { name: 'Aleph OCCRP', type: 'Investigation', description: 'Global archive of research material for investigative reporting', link: 'https://aleph.occrp.org' },
      { name: 'ICIJ Offshore Leaks', type: 'Investigation', description: 'Offshore companies and entities database', link: 'https://offshoreleaks.icij.org/' },
      { name: 'Court Records', type: 'Legal Intel', description: 'PACER federal court records', link: 'https://pacer.uscourts.gov/' },
      { name: 'Justia', type: 'Legal Intel', description: 'Legal information and case law', link: 'https://www.justia.com/' },
      
      // Technical Intelligence
      { name: 'BuiltWith', type: 'Tech Intel', description: 'Website technology profiler', link: 'https://builtwith.com/' },
      { name: 'Wappalyzer', type: 'Tech Intel', description: 'Technology profiler and website analyzer', link: 'https://wappalyzer.com' },
      { name: 'WhatRuns', type: 'Tech Intel', description: 'Discover what runs a website', link: 'https://www.whatruns.com/' },
      { name: 'Netcraft', type: 'Tech Intel', description: 'Internet security and data mining', link: 'https://www.netcraft.com/' },
      { name: 'Similarweb', type: 'Web Analytics', description: 'Website traffic and analytics', link: 'https://www.similarweb.com/' },
      
      // Image & Media Analysis
      { name: 'TinEye', type: 'Image Search', description: 'Reverse image search engine', link: 'https://tineye.com/' },
      { name: 'Google Images', type: 'Image Search', description: 'Google reverse image search', link: 'https://images.google.com/' },
      { name: 'Yandex Images', type: 'Image Search', description: 'Yandex reverse image search', link: 'https://yandex.com/images/' },
      { name: 'FotoForensics', type: 'Image Analysis', description: 'Image authenticity analysis', link: 'https://fotoforensics.com/' },
      { name: 'Jeffrey\'s Image Metadata Viewer', type: 'Image Analysis', description: 'EXIF data extraction tool', link: 'http://exif.regex.info/exif.cgi' },
      
      // Specialized Tools
      { name: 'Wigle', type: 'WiFi Intel', description: 'Wireless network mapping database', link: 'https://www.wigle.net/' },
      { name: 'RadioLabs', type: 'Radio Intel', description: 'Radio frequency database', link: 'https://www.radiodb.com/' },
      { name: 'FlightRadar24', type: 'Aviation Intel', description: 'Real-time flight tracking', link: 'https://www.flightradar24.com/' },
      { name: 'MarineTraffic', type: 'Maritime Intel', description: 'Real-time ship tracking', link: 'https://www.marinetraffic.com/' },
      { name: 'OSINT Tools', type: 'Collection', description: 'Curated collection of OSINT tools', link: 'https://osinttools.com/' },
      
      // Additional OSINT Frameworks & Platforms
      { name: 'OSINT Team', type: 'Platform', description: 'Online OSINT tool aggregator', link: 'https://osint.team/' },
      { name: 'IntelOwl', type: 'Platform', description: 'Open source intelligence platform for threat intelligence', link: 'https://github.com/intelowlproject/IntelOwl' },
      { name: 'Axiom', type: 'Framework', description: 'Dynamic infrastructure framework for OSINT', link: 'https://github.com/pry0cc/axiom' },
      { name: 'BuscaVB', type: 'Platform', description: 'Venezuelan OSINT tool', link: 'https://buscavb.com/' },
      { name: 'iKy', type: 'Platform', description: 'OSINT project for gathering information from emails', link: 'https://github.com/kennbroorg/iKy' },
      { name: 'sn0int', type: 'Framework', description: 'Semi-automatic OSINT framework and package manager', link: 'https://github.com/kpcyrd/sn0int' },
      { name: 'Raccoon', type: 'Scanner', description: 'High performance offensive security tool', link: 'https://github.com/evyatarmeged/Raccoon' },
      { name: 'Photon', type: 'Crawler', description: 'Fast crawler designed for OSINT', link: 'https://github.com/s0md3v/Photon' },
      { name: 'BlackBird', type: 'Username Search', description: 'Search username across over 500 websites', link: 'https://github.com/p1ngul1n0/blackbird' },
      { name: 'Mosint', type: 'Email OSINT', description: 'OSINT tool for emails', link: 'https://github.com/alpkeskin/mosint' },
      
      // Enhanced Search Engines & Discovery
      { name: 'Startpage', type: 'Search Engine', description: 'Private search engine', link: 'https://www.startpage.com/' },
      { name: 'Searx', type: 'Search Engine', description: 'Open source metasearch engine', link: 'https://searx.space/' },
      { name: 'Swisscows', type: 'Search Engine', description: 'Privacy-focused search engine', link: 'https://swisscows.com/' },
      { name: 'Gibiru', type: 'Search Engine', description: 'Uncensored private search', link: 'https://gibiru.com/' },
      { name: 'Common Crawl', type: 'Web Archive', description: 'Open repository of web crawl data', link: 'https://commoncrawl.org/' },
      { name: 'UK Web Archive', type: 'Archive', description: 'UK Government web archive', link: 'https://www.webarchive.org.uk/' },
      { name: 'Library of Congress', type: 'Archive', description: 'Digital collections and archives', link: 'https://www.loc.gov/collections/' },
      { name: 'Cached Pages', type: 'Archive', description: 'View cached versions of websites', link: 'https://cachedpages.com/' },
      { name: 'CachedView', type: 'Archive', description: 'View cached pages from Google and Bing', link: 'https://cachedview.com/' },
      
      // Enhanced People & Identity Search
      { name: 'Spokeo', type: 'People Search', description: 'People search engine and background checks', link: 'https://www.spokeo.com/' },
      { name: 'Whitepages', type: 'People Search', description: 'Find people, addresses, and phone numbers', link: 'https://www.whitepages.com/' },
      { name: 'Intelius', type: 'People Search', description: 'Background checks and people search', link: 'https://www.intelius.com/' },
      { name: 'PeopleFinder', type: 'People Search', description: 'Find people and contact information', link: 'https://www.peoplefinder.com/' },
      { name: 'FamilyTreeNow', type: 'Genealogy', description: 'Free genealogy and family history', link: 'https://www.familytreenow.com/' },
      { name: 'MyLife', type: 'People Search', description: 'People search and reputation management', link: 'https://www.mylife.com/' },
      { name: 'People by Name', type: 'People Search', description: 'International people search', link: 'https://www.peoplebyname.com/' },
      { name: 'Social Catfish', type: 'Identity Verification', description: 'Reverse search for online dating profiles', link: 'https://socialcatfish.com/' },
      { name: 'Been Verified', type: 'Background Check', description: 'Comprehensive background check service', link: 'https://www.beenverified.com/' },
      { name: 'PeekYou', type: 'People Search', description: 'Find people across social networks', link: 'https://www.peekyou.com/' },
      
      // Enhanced Investigative Resources
      { name: 'WorldCat', type: 'Library Database', description: 'Global library catalog', link: 'https://www.worldcat.org/' },
      { name: 'Internet Archive Scholar', type: 'Academic Search', description: 'Academic paper archive', link: 'https://scholar.archive.org/' },
      { name: 'CORE', type: 'Academic Search', description: 'Open access research papers', link: 'https://core.ac.uk/' },
      { name: 'BASE', type: 'Academic Search', description: 'Academic search engine', link: 'https://www.base-search.net/' },
      { name: 'RefSeek', type: 'Academic Search', description: 'Academic search engine', link: 'https://www.refseek.com/' },
      { name: 'Academic Index', type: 'Academic Search', description: 'Academic and research resources', link: 'https://www.academicindex.net/' },
      { name: 'Virtual Library', type: 'Academic Search', description: 'Academic resource directory', link: 'https://vlib.org/' },
      { name: 'Investigative Dashboard', type: 'Investigation', description: 'OCCRP investigative tools and resources', link: 'https://id.occrp.org/' },
      { name: 'Transparency International', type: 'Corruption Intel', description: 'Global corruption and transparency data', link: 'https://www.transparency.org/' },
      { name: 'Panama Papers', type: 'Investigation', description: 'ICIJ Panama Papers database', link: 'https://offshoreleaks.icij.org/' },
      { name: 'Paradise Papers', type: 'Investigation', description: 'ICIJ Paradise Papers investigation', link: 'https://www.icij.org/investigations/paradise-papers/' },
      
      // Advanced OSINT Investigation & Analysis Tools
      { name: 'IntelTechniques', type: 'OSINT Resources', description: 'Michael Bazzell\'s OSINT tools and techniques', link: 'https://inteltechniques.com/' },
      { name: 'Bellingcat Toolkit', type: 'Investigation Tools', description: 'Open source investigation toolkit', link: 'https://github.com/bellingcat/auto-archiver' },
      { name: 'Hunchly', type: 'Case Management', description: 'Digital investigation case management platform', link: 'https://www.hunch.ly/' },
      { name: 'Palantir Gotham', type: 'Data Integration', description: 'Big data analytics and integration platform', link: 'https://www.palantir.com/platforms/gotham/' },
      { name: 'i2 Analyst Notebook', type: 'Link Analysis', description: 'Visual investigative analysis software', link: 'https://www.ibm.com/products/i2-analysts-notebook' },
      { name: 'Gephi', type: 'Network Analysis', description: 'Open-source network analysis and visualization', link: 'https://gephi.org/' },
      { name: 'Cytoscape', type: 'Network Visualization', description: 'Open source software platform for visualizing networks', link: 'https://cytoscape.org/' },
      { name: 'YARA', type: 'Pattern Matching', description: 'Pattern matching engine for malware research', command: 'yara rules.yar sample.exe', link: 'https://virustotal.github.io/yara/' },
      { name: 'Volatility', type: 'Memory Analysis', description: 'Advanced memory forensics framework', command: 'volatility -f memory.dmp imageinfo', link: 'https://www.volatilityfoundation.org/' },
      { name: 'Autopsy', type: 'Digital Forensics', description: 'Digital forensics platform and graphical interface', link: 'https://www.autopsy.com/' },
      { name: 'SANS SIFT', type: 'Forensics Workstation', description: 'SANS Investigative Forensic Toolkit', link: 'https://www.sans.org/tools/sift-workstation/' },
      { name: 'Sleuth Kit', type: 'File System Analysis', description: 'Command line tools for digital forensics', command: 'fls -r disk.img', link: 'https://www.sleuthkit.org/' },
      { name: 'Wireshark OSINT', type: 'Network Forensics', description: 'Network protocol analyzer for traffic analysis', command: 'wireshark -r capture.pcap', link: 'https://www.wireshark.org/' },
    ]
  },

  {
    id: 'subdomain',
    icon: FaSitemap,
    title: 'Subdomain Enumeration',
    description: 'Comprehensive subdomain discovery and enumeration techniques',
    tools: [
      // Command-Line Tools (Active Enumeration)
      { name: 'AssetFinder', type: 'CLI Tool', description: 'Fast subdomain enumeration tool', command: 'echo "mars.com" | assetfinder --subs-only', link: 'https://github.com/tomnomnom/assetfinder' },
      { name: 'Sublist3r', type: 'CLI Tool', description: 'Fast subdomain enumeration tool', command: 'python sublist3r.py -d example.com', link: 'https://github.com/aboul3la/Sublist3r' },
      { name: 'Knockpy', type: 'CLI Tool', description: 'Python tool designed to enumerate subdomains', command: 'knockpy example.com', link: 'https://github.com/guelfoweb/knock' },
      { name: 'Gobuster', type: 'CLI Tool', description: 'Directory/subdomain brute forcer', command: 'gobuster dns -d example.com -w wordlist.txt', link: 'https://github.com/OJ/gobuster' },
      { name: 'FFuf', type: 'CLI Tool', description: 'Fast web fuzzer for subdomain discovery', command: 'ffuf -w wordlist.txt -u https://FUZZ.example.com/', link: 'https://github.com/ffuf/ffuf' },
      { name: 'Subbrute', type: 'CLI Tool', description: 'Subdomain enumeration tool', command: 'python subbrute.py example.com', link: 'https://github.com/TheRook/subbrute' },
      { name: 'Fierce', type: 'CLI Tool', description: 'DNS reconnaissance tool for locating subdomains', command: 'fierce --domain example.com', link: 'https://github.com/mschwager/fierce' },
      { name: 'Dnscan', type: 'CLI Tool', description: 'Python wordlist-based DNS subdomain scanner', command: 'python dnscan.py -d example.com -w subdomains.txt', link: 'https://github.com/rbsec/dnscan' },
      { name: 'Massdns', type: 'CLI Tool', description: 'High-performance DNS stub resolver', command: 'massdns -r resolvers.txt -t A -o S subdomains.txt', link: 'https://github.com/blechschmidt/massdns' },
      { name: 'Puredns', type: 'CLI Tool', description: 'Fast domain resolver and subdomain bruteforcing', command: 'puredns bruteforce all.txt example.com', link: 'https://github.com/d3mondev/puredns' },
      { name: 'Shuffledns', type: 'CLI Tool', description: 'Wrapper around massdns for subdomain enumeration', command: 'shuffledns -d example.com -list subdomains.txt -r resolvers.txt', link: 'https://github.com/projectdiscovery/shuffledns' },
      { name: 'Aiodnsbrute', type: 'CLI Tool', description: 'Python3 async DNS brute force utility', command: 'aiodnsbrute -w wordlist.txt example.com', link: 'https://github.com/blark/aiodnsbrute' },
      
      // Passive Discovery Tools
      { name: 'Findomain', type: 'CLI Tool', description: 'Fast and cross-platform subdomain enumerator', command: 'findomain -t example.com', link: 'https://github.com/Findomain/Findomain' },
      { name: 'Chaos', type: 'CLI Tool', description: 'ProjectDiscovery\'s subdomain wordlist and API', command: 'chaos -d example.com', link: 'https://github.com/projectdiscovery/chaos-client' },
      { name: 'Subdomainizer', type: 'CLI Tool', description: 'Extract subdomains from JavaScript files', command: 'python subdomainizer.py -u https://example.com', link: 'https://github.com/nsonaniya2010/SubDomainizer' },
      { name: 'SubJS', type: 'CLI Tool', description: 'Fetch subdomains from JavaScript files', command: 'subjs -i example.com', link: 'https://github.com/lc/subjs' },
      { name: 'Gau', type: 'CLI Tool', description: 'Fetch known URLs from AlienVault\'s OTX, Wayback Machine', command: 'gau example.com', link: 'https://github.com/lc/gau' },
      { name: 'Waybackurls', type: 'CLI Tool', description: 'Fetch all URLs from Wayback Machine', command: 'waybackurls example.com', link: 'https://github.com/tomnomnom/waybackurls' },
      { name: 'hakrevdns', type: 'CLI Tool', description: 'Reverse DNS lookups on CIDR ranges', command: 'prips 173.0.84.0/24 | hakrevdns', link: 'https://github.com/hakluke/hakrevdns' },
      
      // Online Platforms & Search Engines
      { name: 'SecurityTrails', type: 'Platform', description: 'Historical DNS data and subdomain discovery', link: 'https://securitytrails.com/' },
      { name: 'RapidDNS', type: 'Online Tool', description: 'DNS lookup tool with subdomain enumeration', link: 'https://rapiddns.io/' },
      { name: 'DNSDumpster', type: 'Online Tool', description: 'DNS recon and research tool', link: 'https://dnsdumpster.com/' },
      { name: 'Pentest-Tools', type: 'Online Tool', description: 'Subdomain finder online tool', link: 'https://pentest-tools.com/information-gathering/find-subdomains-of-domain' },
      { name: 'Subdomains.whoisxmlapi', type: 'Online Tool', description: 'Subdomain lookup API service', link: 'https://subdomains.whoisxmlapi.com/' },
      { name: 'Spyse', type: 'Platform', description: 'Internet assets search engine', link: 'https://spyse.com/' },
      { name: 'FindSubDomains', type: 'Online Tool', description: 'From Spyse. Awesome tool to find subdomains', link: 'https://spyse.com/tools/subdomain-finder' },
      { name: 'Netlas', type: 'Search Engine', description: 'Internet intelligence platform', link: 'https://app.netlas.io/' },
      
      // Certificate Transparency & SSL
      { name: 'crt.sh', type: 'CT Search', description: 'Certificate transparency log search', link: 'https://crt.sh/' },
      { name: 'Certspotter', type: 'CT Monitor', description: 'Certificate transparency monitoring', link: 'https://sslmate.com/certspotter/' },
      { name: 'Certificate Search', type: 'CT Search', description: 'Facebook\'s certificate transparency search', link: 'https://developers.facebook.com/tools/ct/' },
      { name: 'Google CT', type: 'CT Search', description: 'Google certificate transparency search', link: 'https://transparencyreport.google.com/https/certificates' },
      { name: 'Entrust CT Search', type: 'CT Search', description: 'Entrust certificate transparency search', link: 'https://www.entrust.com/ct-search/' },
      
      // DNS & Network Discovery
      { name: 'ViewDNS', type: 'Online Tool', description: 'Reverse IP lookup and DNS analysis', link: 'https://viewdns.info/reverseip' },
      { name: 'DNSlytics', type: 'DNS Intel', description: 'DNS intelligence and research platform', link: 'https://dnslytics.com/' },
      { name: 'HackerTarget', type: 'Online Tool', description: 'Free online security tools', link: 'https://hackertarget.com/' },
      { name: 'YouGetSignal', type: 'Online Tool', description: 'Reverse IP domain check', link: 'https://www.yougetsignal.com/tools/web-sites-on-web-server/' },
      { name: 'DomainTools', type: 'Platform', description: 'Domain research and monitoring platform', link: 'https://www.domaintools.com/' },
      { name: 'Robtex', type: 'DNS Tool', description: 'DNS lookup and network analysis', link: 'https://www.robtex.com/' },
      { name: 'WhoisXML API', type: 'API Service', description: 'Domain and IP intelligence data', link: 'https://www.whoisxmlapi.com/' },
      { name: 'ThreatCrowd', type: 'Threat Intel', description: 'Open source threat intelligence', link: 'https://www.threatcrowd.org/' },
      
      // Google Dorking & Search Engine Discovery
      { name: 'Google Dorking', type: 'Search Technique', description: 'Use Google search operators for subdomain discovery', command: 'site:*.example.com' },
      { name: 'Bing Dorking', type: 'Search Technique', description: 'Use Bing search operators for subdomain discovery', command: 'site:example.com' },
      { name: 'DuckDuckGo', type: 'Search Engine', description: 'Privacy-focused search for subdomain discovery', command: 'site:*.example.com' },
      { name: 'Baidu', type: 'Search Engine', description: 'Chinese search engine for subdomain discovery', command: 'site:example.com' },
      
      // Wordlists & Dictionaries
      { name: 'SecLists', type: 'Wordlist', description: 'Security tester\'s companion with subdomain wordlists', link: 'https://github.com/danielmiessler/SecLists' },
      { name: 'All.txt', type: 'Wordlist', description: 'Comprehensive subdomain wordlist', link: 'https://gist.github.com/jhaddix/86a06c5dc309d08580a018c66354a056' },
      { name: 'CommonSpeak2', type: 'Wordlist', description: 'Subdomain wordlist from common words', link: 'https://github.com/assetnote/commonspeak2-wordlists' },
      { name: 'Best-DNS-Wordlist', type: 'Wordlist', description: 'DNS subdomain wordlist collection', link: 'https://github.com/digger-yu/best-dns-wordlist' },
      { name: 'Subdomains-Top1million', type: 'Wordlist', description: 'Top 1 million subdomain wordlist', link: 'https://github.com/rbsec/dnscan/blob/master/subdomains-top1mil.txt' },
      
      // Specialized & Advanced Tools
      { name: 'SubDomainRadar', type: 'CLI Tool', description: 'Subdomain enumeration and takeover detection', command: 'python SubDomainRadar.py -d example.com', link: 'https://github.com/YasserGersy/SubDomainRadar' },
      { name: 'SubOver', type: 'CLI Tool', description: 'Subdomain takeover vulnerability scanner', command: 'subover -l subdomains.txt', link: 'https://github.com/Ice3man543/SubOver' },
      { name: 'Subjack', type: 'CLI Tool', description: 'Subdomain takeover tool', command: 'subjack -w subdomains.txt -t 100 -timeout 30 -o results.txt', link: 'https://github.com/haccer/subjack' },
      { name: 'Can-I-take-over-XYZ', type: 'Reference', description: 'Subdomain takeover reference guide', link: 'https://github.com/EdOverflow/can-i-take-over-xyz' },
      { name: 'SubDomainEnum', type: 'CLI Tool', description: 'Multi-threaded subdomain enumeration', command: 'python SubDomainEnum.py -d example.com', link: 'https://github.com/0xbharath/subdomain-enumeration' },
      { name: 'Domain Hunter', type: 'Burp Extension', description: 'Burp Suite extension for subdomain discovery', link: 'https://github.com/bit4woo/domain_hunter' },
      
      // API-Based Services
      { name: 'Subdomainfinder', type: 'API Service', description: 'Subdomain discovery API', link: 'https://subdomainfinder.c99.nl/' },
      { name: 'BinaryEdge', type: 'API Service', description: 'Internet scanning and subdomain data', link: 'https://www.binaryedge.io/' },
      { name: 'IntelX', type: 'API Service', description: 'Search engine for threat intelligence', link: 'https://intelx.io/' },
      { name: 'FullHunt', type: 'API Service', description: 'Attack surface discovery platform', link: 'https://fullhunt.io/' },
      { name: 'LeakIX', type: 'API Service', description: 'Search engine for exposed servers and data', link: 'https://leakix.net/' },
      
      // Browser Extensions & GUI Tools
      { name: 'BuiltWith', type: 'Tech Profiler', description: 'Website technology profiler with subdomain discovery', link: 'https://builtwith.com/' },
      { name: 'Wappalyzer', type: 'Browser Extension', description: 'Technology profiler and website analyzer', link: 'https://wappalyzer.com' },
      { name: 'WhatRuns', type: 'Browser Extension', description: 'Discover what runs a website', link: 'https://www.whatruns.com/' },
      { name: 'Netcraft Site Report', type: 'Online Tool', description: 'Website analysis and subdomain discovery', link: 'https://www.netcraft.com/' },
      
      // Mobile & Social Discovery
      { name: 'Social Mapper', type: 'CLI Tool', description: 'Social media enumeration and correlation', command: 'python socialmapper.py -f names.txt -m fast', link: 'https://github.com/Greenwolf/social_mapper' },
      { name: 'FOCA', type: 'Windows Tool', description: 'Metadata analysis and subdomain discovery', link: 'https://github.com/ElevenPaths/FOCA' },
      
      // Reputation & Analysis
      { name: 'URLVoid', type: 'Reputation', description: 'Website reputation and safety checker', link: 'https://www.urlvoid.com/' },
      { name: 'Sucuri SiteCheck', type: 'Security Scan', description: 'Website security and malware scanner', link: 'https://sitecheck.sucuri.net/' },
      { name: 'Observatory', type: 'Security Scan', description: 'Mozilla\'s website security scanner', link: 'https://observatory.mozilla.org/' },
      
      // Additional Resources
      { name: 'OWASP Subdomain Enumeration', type: 'Guide', description: 'OWASP guide to subdomain enumeration', link: 'https://owasp.org/www-community/attacks/Subdomain_Enumeration' },
      { name: 'Bug Bounty Methodology', type: 'Methodology', description: 'Subdomain enumeration methodology for bug bounty', link: 'https://github.com/jhaddix/tbhm' },
      
      // Advanced CLI Tools & Scripts
      { name: 'SubEnum', type: 'CLI Tool', description: 'Fast subdomain enumeration tool', command: 'subenum -d example.com', link: 'https://github.com/bing0o/SubEnum' },
      { name: 'SubDomainsBigData', type: 'CLI Tool', description: 'Subdomain enumeration using big data sources', command: 'python subdomainsbigdata.py -d example.com', link: 'https://github.com/Josue87/SubdomainsBigData' },
      { name: 'OneForAll', type: 'CLI Tool', description: 'Powerful subdomain enumeration tool', command: 'python oneforall.py --target example.com', link: 'https://github.com/shmilylty/OneForAll' },
      { name: 'Sub404', type: 'CLI Tool', description: 'Subdomain takeover vulnerability scanner', command: 'python sub404.py -f subdomains.txt', link: 'https://github.com/r3curs1v3-pr0xy/sub404' },
      { name: 'Sublert', type: 'CLI Tool', description: 'Security and reconnaissance tool to automatically monitor new subdomains', command: 'python sublert.py -u example.com', link: 'https://github.com/yassineaboukir/sublert' },
      { name: 'Subzy', type: 'CLI Tool', description: 'Subdomain takeover vulnerability checker', command: 'subzy run --targets subdomains.txt', link: 'https://github.com/LukaSikic/subzy' },
      { name: 'Takeover', type: 'CLI Tool', description: 'Sub-domain takeover vulnerability scanner', command: 'takeover -l subdomains.txt', link: 'https://github.com/m4ll0k/takeover' },
      { name: 'Sudomy', type: 'CLI Tool', description: 'Subdomain enumeration tool using bash script', command: 'bash sudomy -d example.com', link: 'https://github.com/screetsec/Sudomy' },
      { name: 'Subover', type: 'CLI Tool', description: 'Powerful subdomain takeover tool', command: 'subover -l subdomains.txt', link: 'https://github.com/Ice3man543/SubOver' },
      { name: 'DnsValidatorPy', type: 'CLI Tool', description: 'Maintain a list of valid domains/subdomains', command: 'python dnsvalidatorpy.py -tL subdomains.txt', link: 'https://github.com/vortexau/dnsvalidator' },
      { name: 'SubRecon', type: 'CLI Tool', description: 'Subdomain reconnaissance tool', command: 'python subrecon.py -d example.com', link: 'https://github.com/vipulchaskar/SubRecon' },
      { name: 'Sublist3r-bruteforcer', type: 'CLI Tool', description: 'Enhanced version of Sublist3r with bruteforcing', command: 'python sublist3r.py -d example.com -b', link: 'https://github.com/TheRook/subbrute' },
      { name: 'SubDomz', type: 'CLI Tool', description: 'Subdomain enumeration tool written in Python', command: 'python subdomz.py -d example.com', link: 'https://github.com/0xPugazh/SubDomz' },
      { name: 'Subquest', type: 'CLI Tool', description: 'Fast subdomain enumeration tool', command: 'subquest -d example.com', link: 'https://github.com/skepticfx/subquest' },
      { name: 'Altdns', type: 'CLI Tool', description: 'Subdomain discovery through alterations and permutations', command: 'altdns -i subdomains.txt -o permuted.txt', link: 'https://github.com/infosec-au/altdns' },
      { name: 'Subgen', type: 'CLI Tool', description: 'Subdomain generator', command: 'subgen -d example.com -w wordlist.txt', link: 'https://github.com/SecretSquirrel-Tools/subgen' },
      { name: 'VHostScan', type: 'CLI Tool', description: 'Virtual host scanner', command: 'python VHostScan.py -t example.com', link: 'https://github.com/codingo/VHostScan' },
      { name: 'DnsReaper', type: 'CLI Tool', description: 'Subdomain takeover tool', command: 'python dnsreaper.py file --filename subdomains.txt', link: 'https://github.com/punk-security/dnsReaper' },
      { name: 'Knock', type: 'CLI Tool', description: 'Subdomain scanner', command: 'knockpy example.com', link: 'https://github.com/guelfoweb/knock' },
      { name: 'Subdomains Bruteforcer', type: 'CLI Tool', description: 'Fast subdomain bruteforcer', command: 'python bruteforcer.py -d example.com', link: 'https://github.com/aboul3la/subdomains-bruteforcer' },
      { name: 'SubHunter', type: 'CLI Tool', description: 'Subdomain takeover hunter', command: 'python subhunter.py -l subdomains.txt', link: 'https://github.com/eslam3kl/SubHunter' },
      { name: 'SubFind3r', type: 'CLI Tool', description: 'Subdomain discovery tool', command: 'python subfind3r.py -d example.com', link: 'https://github.com/aboul3la/SubFind3r' },
      { name: 'DnsX', type: 'CLI Tool', description: 'Fast and multi-purpose DNS toolkit', command: 'dnsx -l subdomains.txt', link: 'https://github.com/projectdiscovery/dnsx' },
      { name: 'Httpx', type: 'CLI Tool', description: 'Fast and multi-purpose HTTP toolkit', command: 'httpx -l subdomains.txt', link: 'https://github.com/projectdiscovery/httpx' },
      { name: 'Nuclei-templates', type: 'Template Collection', description: 'Community-curated nuclei templates for subdomain takeover', link: 'https://github.com/projectdiscovery/nuclei-templates' },
    ]
  },

  {
    id: 'asn',
    icon: FaNetworkWired,
    title: 'ASN & Network Intelligence',
    description: 'Autonomous System Numbers and network infrastructure analysis',
    tools: [
      // BGP & Routing Information
      { name: 'BGP.HE.NET', type: 'BGP Info', description: 'BGP routing table analysis and ASN lookup', link: 'https://bgp.he.net/search' },
      { name: 'BGPView', type: 'BGP Info', description: 'BGP routing information and analytics', link: 'https://bgpview.io/' },
      { name: 'RouteViews', type: 'BGP Info', description: 'BGP routing table archive and analysis', link: 'http://www.routeviews.org/' },
      { name: 'RIPE RIS', type: 'BGP Info', description: 'RIPE Routing Information Service', link: 'https://www.ripe.net/analyse/internet-measurements/routing-information-service-ris' },
      { name: 'Looking Glass', type: 'BGP Info', description: 'Network looking glass servers worldwide', link: 'https://www.bgp4.as/looking-glasses' },
      { name: 'Team Cymru', type: 'BGP Info', description: 'IP to ASN mapping service', link: 'https://www.team-cymru.org/asn-lookup.html' },
      { name: 'Hurricane Electric BGP Toolkit', type: 'BGP Info', description: 'Comprehensive BGP analysis tools', link: 'https://bgp.he.net/' },
      
      // Regional Internet Registries (RIRs)
      { name: 'ARIN Whois/RDAP', type: 'Registry', description: 'A public resource that allows a user to retrieve information about IP number resources, organizations, and Points of Contact registered with ARIN', link: 'https://www.arin.net/resources/registry/whois/' },
      { name: 'RIPE NCC', type: 'Registry', description: 'RIPE Network Coordination Centre (Europe/Middle East/Central Asia)', link: 'https://www.ripe.net/' },
      { name: 'ARIN', type: 'Registry', description: 'American Registry for Internet Numbers (North America)', link: 'https://www.arin.net/' },
      { name: 'APNIC', type: 'Registry', description: 'Asia Pacific Network Information Centre', link: 'https://www.apnic.net/' },
      { name: 'LACNIC', type: 'Registry', description: 'Latin America and Caribbean Network Information Centre', link: 'https://www.lacnic.net/' },
      { name: 'AFRINIC', type: 'Registry', description: 'African Network Information Centre', link: 'https://www.afrinic.net/' },
      { name: 'RIPE Database', type: 'Registry', description: 'RIPE network database search', link: 'https://apps.db.ripe.net/db-web-ui/query' },
      { name: 'ARIN WHOIS', type: 'Registry', description: 'ARIN WHOIS database search', link: 'https://whois.arin.net/' },
      
      // IP Intelligence & Geolocation
      { name: 'IPinfo.io', type: 'IP Intel', description: 'IP geolocation, ASN, and network information', link: 'https://ipinfo.io/' },
      { name: 'IP2Location', type: 'Geolocation', description: 'IP geolocation and network information database', link: 'https://www.ip2location.com/' },
      { name: 'MaxMind', type: 'Geolocation', description: 'IP intelligence, geolocation, and fraud detection', link: 'https://www.maxmind.com/' },
      { name: 'DB-IP', type: 'Geolocation', description: 'IP geolocation and network intelligence database', link: 'https://db-ip.com/' },
      { name: 'IPstack', type: 'Geolocation', description: 'Real-time IP geolocation API', link: 'https://ipstack.com/' },
      { name: 'IPapi', type: 'Geolocation', description: 'IP geolocation and network data API', link: 'https://ipapi.com/' },
      { name: 'Geo IP Tool', type: 'Geolocation', description: 'Free IP geolocation lookup', link: 'https://geoiptool.com/' },
      { name: 'What Is My IP Address', type: 'IP Intel', description: 'IP address information and tools', link: 'https://whatismyipaddress.com/' },
      
      // IP Reputation & Security
      { name: 'AbuseIPDB', type: 'Reputation', description: 'IP reputation and abuse reporting database', link: 'https://www.abuseipdb.com/' },
      { name: 'IPVoid', type: 'Reputation', description: 'IP address reputation and blacklist checker', link: 'https://www.ipvoid.com/' },
      { name: 'IPQualityScore', type: 'Reputation', description: 'IP reputation, fraud detection, and threat intelligence', link: 'https://www.ipqualityscore.com/' },
      { name: 'Alien Vault OTX', type: 'Threat Intel', description: 'Open threat intelligence for IP addresses', link: 'https://otx.alienvault.com/' },
      { name: 'IBM X-Force', type: 'Threat Intel', description: 'IP reputation and threat intelligence', link: 'https://exchange.xforce.ibmcloud.com/' },
      { name: 'Cisco Talos', type: 'Threat Intel', description: 'IP reputation and security intelligence', link: 'https://talosintelligence.com/' },
      { name: 'Spamhaus', type: 'Reputation', description: 'IP blacklist and reputation database', link: 'https://www.spamhaus.org/lookup/' },
      { name: 'SURBL', type: 'Reputation', description: 'URI reputation database', link: 'http://www.surbl.org/surbl-analysis' },
      
      // Network Scanning & Discovery
      { name: 'ZoomEye', type: 'Network Scan', description: 'Cyberspace search engine', link: 'https://www.zoomeye.org/' },
      { name: 'Fofa', type: 'Network Scan', description: 'Cyberspace assets search engine', link: 'https://fofa.so/' },
      { name: 'BinaryEdge', type: 'Network Scan', description: 'Internet scanning and data collection', link: 'https://www.binaryedge.io/' },
      { name: 'Onyphe', type: 'Network Scan', description: 'Cyber defense search engine', link: 'https://www.onyphe.io/' },
      { name: 'LeakIX', type: 'Network Scan', description: 'Search engine for exposed databases and services', link: 'https://leakix.net/' },
      
      // Network Tools & Utilities
      { name: 'IPCalculator', type: 'Network Tool', description: 'IP subnet calculator and network tools', link: 'http://jodies.de/ipcalc' },
      { name: 'Batch IP Converter', type: 'Network Tool', description: 'An award-winning network tool to work with IP addresses. Domain-to-IP Converter, Batch Ping, Tracert, Whois, and more', link: 'https://www.sabsoft.com/' },
      { name: 'Subnet Calculator', type: 'Network Tool', description: 'Advanced subnet and CIDR calculator', link: 'https://www.subnet-calculator.com/' },
      { name: 'MXToolbox', type: 'Network Tool', description: 'Network diagnostic and lookup tools', link: 'https://mxtoolbox.com/' },
      { name: 'DNSstuff', type: 'Network Tool', description: 'Network tools and utilities', link: 'https://www.dnsstuff.com/' },
      { name: 'NetworkTools', type: 'Network Tool', description: 'Network diagnostic tools collection', link: 'https://network-tools.com/' },
      { name: 'Professional Toolset', type: 'Network Tool', description: 'Ping, Tracert, HTTP Headers, and more!', link: 'https://www.professional-toolset.com/' },
      { name: 'You Get Signal', type: 'Network Tool', description: 'Port forwarding, network location, visual trace route, reverse IP domain check, and more!', link: 'https://www.yougetsignal.com/' },
      
      // Additional Advanced Network Analysis Tools
      { name: 'RIPE Stat', type: 'Analytics', description: 'Network statistics and analysis platform', link: 'https://stat.ripe.net/' },
      { name: 'BGP Ranking', type: 'Analytics', description: 'ASN security ranking based on malicious activities', link: 'https://bgpranking.circl.lu/' },
      { name: 'Spamhaus ASN Drop', type: 'Security', description: 'ASN-based spam and malware tracking', link: 'https://www.spamhaus.org/drop/asndrop.txt' },
      { name: 'Cloudflare Radar', type: 'Analytics', description: 'Internet traffic and security insights', link: 'https://radar.cloudflare.com/' },
      { name: 'Internet Health Report', type: 'Infrastructure', description: 'Global internet infrastructure monitoring', link: 'https://ihr.iijlab.net/' },
      { name: 'CAIDA', type: 'Infrastructure', description: 'Internet infrastructure analysis and visualization', link: 'https://www.caida.org/' },
      { name: 'PeeringDB', type: 'Infrastructure', description: 'Internet peering information database', link: 'https://www.peeringdb.com/' },
      { name: 'Internet Exchange Map', type: 'Infrastructure', description: 'Global internet exchange points map', link: 'https://www.internetexchangemap.com/' },
      { name: 'ASN Lookup', type: 'ASN Tool', description: 'ASN information lookup and analysis', link: 'https://www.ultratools.com/tools/asnInfo' },
      { name: 'ASN Info', type: 'ASN Tool', description: 'Detailed ASN information and statistics', link: 'https://asn.cymru.com/' },
      { name: 'BGP Stream', type: 'ASN Tool', description: 'Real-time BGP update stream', link: 'https://bgpstream.com/' },
      { name: 'RIPE Atlas', type: 'ASN Tool', description: 'Global internet measurement network', link: 'https://atlas.ripe.net/' },
      { name: 'ThousandEyes', type: 'Network Monitor', description: 'Network path visualization and monitoring', link: 'https://www.thousandeyes.com/' },
      { name: 'masscan', type: 'Port Scanner', description: 'Mass IP port scanner', command: 'masscan -p1-65535 10.0.0.0/8', link: 'https://github.com/robertdavidgraham/masscan' },
      { name: 'Zmap', type: 'Internet Scanner', description: 'Fast Internet-wide network scanner', command: 'zmap -p 80 -N 1000', link: 'https://github.com/zmap/zmap' },
      { name: 'Rustscan', type: 'Port Scanner', description: 'Modern port scanner', command: 'rustscan -a 192.168.1.1', link: 'https://github.com/RustScan/RustScan' },
      { name: 'nmap', type: 'Network Scanner', description: 'Network discovery and security auditing', command: 'nmap -sV -sC target', link: 'https://nmap.org/' },
    ]
  },

  {
    id: 'dns',
    icon: FaServer,
    title: 'DNS Intelligence',
    description: 'DNS enumeration, analysis, and technology fingerprinting',
    tools: [
      // Command-Line DNS Tools
      { name: 'dig', type: 'CLI Tool', description: 'DNS lookup utility for various record types', command: 'dig google.com CNAME' },
      { name: 'nslookup', type: 'CLI Tool', description: 'Interactive DNS lookup tool', command: 'nslookup domain.com' },
      { name: 'host', type: 'CLI Tool', description: 'DNS lookup utility', command: 'host -t MX domain.com' },
      { name: 'dnsrecon', type: 'CLI Tool', description: 'DNS enumeration and reconnaissance tool', command: 'dnsrecon -d domain.com -a', link: 'https://github.com/darkoperator/dnsrecon' },
      { name: 'fierce', type: 'CLI Tool', description: 'DNS reconnaissance tool', command: 'fierce --domain domain.com', link: 'https://github.com/mschwager/fierce' },
      { name: 'dnsmap', type: 'CLI Tool', description: 'Passive DNS network mapper', command: 'dnsmap domain.com', link: 'https://github.com/makefu/dnsmap' },
      { name: 'dnsenum', type: 'CLI Tool', description: 'DNS enumeration tool', command: 'dnsenum domain.com', link: 'https://github.com/fwaeytens/dnsenum' },
      { name: 'dnsutils', type: 'CLI Tool', description: 'Collection of DNS utilities', command: 'dig +trace domain.com' },
      { name: 'whatweb', type: 'CLI Tool', description: 'Website fingerprinting tool', command: 'whatweb local.ch', link: 'https://github.com/urbanadventurer/WhatWeb' },
      
      // Online DNS Lookup & Analysis Tools
      { name: 'DNSQueries', type: 'Online Tool', description: 'Online DNS lookup and analysis tool', link: 'https://www.dnsqueries.com/en/' },
      { name: 'MXToolbox', type: 'Online Tool', description: 'DNS and email diagnostic tools', link: 'https://mxtoolbox.com/' },
      { name: 'IntoDNS', type: 'DNS Check', description: 'DNS and mail server health checker', link: 'https://intodns.com/' },
      { name: 'DNS Checker', type: 'Online Tool', description: 'DNS propagation checker', link: 'https://dnschecker.org/' },
      { name: 'WhatsMyDNS', type: 'Propagation', description: 'DNS propagation checker', link: 'https://www.whatsmydns.net/' },
      { name: 'DNS Lookup', type: 'Online Tool', description: 'Simple DNS record lookup tool', link: 'https://www.nslookup.io/' },
      { name: 'ViewDNS', type: 'Online Tool', description: 'DNS and network tools collection', link: 'https://viewdns.info/' },
      { name: 'DNSstuff', type: 'Online Tool', description: 'DNS analysis and testing tools', link: 'https://www.dnsstuff.com/' },
      { name: 'Network-Tools', type: 'Online Tool', description: 'Network diagnostic tools including DNS', link: 'https://network-tools.com/' },
      { name: 'DNS Watch', type: 'Online Tool', description: 'DNS server performance monitoring', link: 'https://www.dnswatch.info/' },
      
      // DNS Intelligence & Research Platforms
      { name: 'DNSlytics', type: 'DNS Intel', description: 'DNS intelligence and research platform', link: 'https://dnslytics.com/' },
      { name: 'SecurityTrails', type: 'Historical DNS', description: 'Historical DNS data and research', link: 'https://securitytrails.com/' },
      { name: 'PassiveDNS', type: 'Historical', description: 'Historical DNS data collection', link: 'https://passivedns.cn/' },
      { name: 'CIRCL PassiveDNS', type: 'Historical', description: 'CIRCL passive DNS database', link: 'https://www.circl.lu/services/passive-dns/' },
      { name: 'Farsight DNSDB', type: 'Historical', description: 'Farsight Security DNS database', link: 'https://www.farsightsecurity.com/solutions/dnsdb/' },
      { name: 'WhoisXML API DNS', type: 'API Service', description: 'DNS intelligence and historical data', link: 'https://www.whoisxmlapi.com/dns-lookup-api' },
      { name: 'DNS History', type: 'Historical', description: 'Complete DNS record history', link: 'https://completedns.com/dns-history/' },
      { name: 'DomainTools DNS', type: 'Intel Platform', description: 'DNS research and monitoring', link: 'https://www.domaintools.com/' },
      
      // DNS Visualization & Analysis
      { name: 'DNSViz', type: 'Visualization', description: 'DNS visualization and analysis', link: 'https://dnsviz.net/' },
      { name: 'DNS Trace', type: 'Visualization', description: 'Visual DNS trace and analysis', link: 'https://www.dns-trace.com/' },
      { name: 'Robtex', type: 'Visualization', description: 'DNS and IP analysis with visualization', link: 'https://www.robtex.com/' },
      { name: 'DNSMap', type: 'Visualization', description: 'DNS infrastructure mapping', link: 'https://dnsmap.io/' },
      { name: 'DNS Graph', type: 'Visualization', description: 'DNS relationship visualization', link: 'https://dnsgraph.com/' },
      
      // DNS Security & Monitoring
      { name: 'DNS Security Scanner', type: 'Security Tool', description: 'DNS security configuration scanner', link: 'https://www.immuniweb.com/ssl/' },
      { name: 'DNS CAA Checker', type: 'Security Tool', description: 'Certificate Authority Authorization checker', link: 'https://sslmate.com/caa/' },
      { name: 'DNS Flag Day', type: 'Compliance', description: 'DNS implementation compliance checker', link: 'https://dnsflagday.net/' },
      { name: 'DNS OARC', type: 'Research', description: 'DNS Operations, Analysis, and Research Center', link: 'https://www.dns-oarc.net/' },
      { name: 'ISC BIND', type: 'DNS Server', description: 'Internet Systems Consortium BIND DNS', link: 'https://www.isc.org/bind/' },
      { name: 'Quad9 DNS', type: 'DNS Service', description: 'Security-focused DNS resolver', link: 'https://www.quad9.net/' },
      { name: 'Cloudflare DNS', type: 'DNS Service', description: 'Cloudflare public DNS resolver', link: 'https://1.1.1.1/' },
      { name: 'Google Public DNS', type: 'DNS Service', description: 'Google public DNS service', link: 'https://developers.google.com/speed/public-dns' },
      
      // DNS Performance & Testing
      { name: 'DNS Benchmark', type: 'Performance', description: 'DNS server performance testing', link: 'https://www.grc.com/dns/benchmark.htm' },
      { name: 'DNS Speed Test', type: 'Performance', description: 'DNS resolver speed testing', link: 'https://www.dnsperf.com/' },
      { name: 'DNS Leak Test', type: 'Privacy Test', description: 'DNS privacy and leak testing', link: 'https://dnsleaktest.com/' },
      { name: 'DNS Performance', type: 'Monitoring', description: 'Global DNS performance monitoring', link: 'https://www.dnsperf.com/' },
      { name: 'Pingdom DNS', type: 'Monitoring', description: 'DNS uptime and performance monitoring', link: 'https://www.pingdom.com/' },
      
      // Enhanced DNS CLI Tools
      { name: 'Dnstwist', type: 'CLI Tool', description: 'Domain name permutation engine for detecting typo squatting', command: 'dnstwist example.com', link: 'https://github.com/elceef/dnstwist' },
      { name: 'Dnsvalidator', type: 'CLI Tool', description: 'Maintains a list of IPv4 DNS servers', command: 'dnsvalidator -tL resolvers.txt', link: 'https://github.com/vortexau/dnsvalidator' },
      { name: 'Dnstrace', type: 'CLI Tool', description: 'Trace DNS queries and responses', command: 'dnstrace example.com', link: 'https://github.com/rs/dnstrace' },
      { name: 'DNSdumpster API', type: 'API Tool', description: 'Python API for DNSdumpster', command: 'python dnsdumpster_api.py example.com', link: 'https://github.com/PaulSec/API-dnsdumpster.com' },
      { name: 'DNS-Shell', type: 'CLI Tool', description: 'Interactive DNS lookup shell', command: 'dns-shell', link: 'https://github.com/rthalley/dnspython' },
      { name: 'Kdig', type: 'CLI Tool', description: 'Advanced DNS lookup tool from Knot DNS', command: 'kdig @8.8.8.8 example.com', link: 'https://www.knot-dns.cz/' },
      
      // Enhanced DNS Security Tools
      { name: 'DNSCrypt', type: 'DNS Privacy', description: 'Protocol for securing communications between DNS client and resolver', link: 'https://dnscrypt.info/' },
      { name: 'DNS over HTTPS', type: 'Privacy Protocol', description: 'DNS over HTTPS implementation', link: 'https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/' },
      { name: 'DNS over TLS', type: 'Privacy Protocol', description: 'DNS over TLS implementation', link: 'https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-tls/' },
      { name: 'Unbound', type: 'DNS Resolver', description: 'Validating, recursive, caching DNS resolver', link: 'https://nlnetlabs.nl/projects/unbound/' },
      { name: 'Knot Resolver', type: 'DNS Resolver', description: 'Caching full resolver implementation', link: 'https://www.knot-resolver.cz/' },
      { name: 'CoreDNS', type: 'DNS Server', description: 'DNS server that chains plugins', link: 'https://coredns.io/' },
      { name: 'Technitium DNS', type: 'DNS Server', description: 'Open source authoritative and recursive DNS server', link: 'https://technitium.com/dns/' },
      { name: 'NSD', type: 'DNS Server', description: 'Name Server Daemon authoritative DNS server', link: 'https://nlnetlabs.nl/projects/nsd/' },
      
      // DNS Intelligence & Research Tools
      { name: 'DNS Census', type: 'DNS Research', description: 'DNS research and statistics', link: 'https://dnscensus2013.neocities.org/' },
      { name: 'OpenINTEL', type: 'DNS Research', description: 'Active DNS measurement platform', link: 'https://www.openintel.nl/' },
      { name: 'DNS Coffee', type: 'DNS Analysis', description: 'DNS analysis and research tool', link: 'https://dns.coffee/' },
      { name: 'DNS Checker Tools', type: 'DNS Validation', description: 'Collection of DNS checking tools', link: 'https://dnschecker.org/all-tools.php' },
      { name: 'Global DNS Checker', type: 'DNS Propagation', description: 'Check DNS records globally', link: 'https://globaldnschecker.com/' },
      { name: 'DNS Propagation Checker', type: 'Propagation Tool', description: 'Worldwide DNS propagation checker', link: 'https://dnschecker.org/' },
      { name: 'DNS Speed Benchmark', type: 'Performance Tool', description: 'DNS resolver speed testing', link: 'https://www.grc.com/dns/benchmark.htm' },
      
      // Additional DNS Security & Analysis Tools
      { name: 'Pi-hole', type: 'DNS Filtering', description: 'Network-wide ad blocking via DNS sinkholing', link: 'https://pi-hole.net/' },
      { name: 'AdGuard Home', type: 'DNS Filtering', description: 'Network-wide software for blocking ads and tracking', link: 'https://github.com/AdguardTeam/AdGuardHome' },
      { name: 'Blocky', type: 'DNS Proxy', description: 'Fast and lightweight DNS proxy and ad-blocker', link: 'https://github.com/0xERR0R/blocky' },
      { name: 'Cloudflared', type: 'DNS Tunnel', description: 'Cloudflare Tunnel client (formerly Argo Tunnel)', command: 'cloudflared tunnel --url localhost:8080', link: 'https://github.com/cloudflare/cloudflared' },
      { name: 'DNSCrypt-Proxy', type: 'DNS Privacy', description: 'Flexible DNS proxy with encrypted DNS protocols support', command: 'dnscrypt-proxy', link: 'https://github.com/DNSCrypt/dnscrypt-proxy' },
      { name: 'Stubby', type: 'DNS Privacy', description: 'Application that acts as a local DNS Privacy stub resolver', command: 'stubby', link: 'https://getdnsapi.net/blog/dns-privacy-daemon-stubby/' },
    ]
  },

  {
    id: 'company',
    icon: FaShieldAlt,
    title: 'Company Intelligence',
    description: 'Business intelligence and corporate research tools',
    tools: [
      // Business Information & Registration
      { name: 'Crunchbase', type: 'Business Intel', description: 'Company information, funding, and business intelligence', link: 'https://crunchbase.com' },
      { name: 'OpenCorporates', type: 'Business Registry', description: 'Global database of companies and corporate structures', link: 'https://opencorporates.com/' },
      { name: 'Company House (UK)', type: 'Business Registry', description: 'UK company information and filings', link: 'https://find-and-update.company-information.service.gov.uk/' },
      { name: 'SEC EDGAR', type: 'Financial Filings', description: 'US Securities and Exchange Commission filings database', link: 'https://www.sec.gov/edgar.shtml' },
      { name: 'Dun & Bradstreet', type: 'Business Intel', description: 'Global business information and credit reports', link: 'https://www.dnb.com/' },
      { name: 'Hoovers', type: 'Business Intel', description: 'Company profiles and business intelligence', link: 'https://www.hoovers.com/' },
      { name: 'ZoomInfo', type: 'Business Intel', description: 'B2B contact and company information database', link: 'https://www.zoominfo.com/' },
      { name: 'Orbis', type: 'Business Database', description: 'Global company and financial information', link: 'https://orbis.bvdinfo.com/' },
      { name: 'Bloomberg Terminal', type: 'Financial Intel', description: 'Professional financial data and analytics', link: 'https://www.bloomberg.com/professional/solution/bloomberg-terminal/' },
      
      // Professional Networks & Employee Intelligence
      { name: 'LinkedIn', type: 'Professional Network', description: 'Professional networking and company research', link: 'https://www.linkedin.com/' },
      { name: 'LinkedIn Sales Navigator', type: 'Professional Intel', description: 'Advanced LinkedIn search and intelligence', link: 'https://business.linkedin.com/sales-solutions/sales-navigator' },
      { name: 'Apollo', type: 'Contact Database', description: 'Sales intelligence and contact database', link: 'https://www.apollo.io/' },
      { name: 'Clearbit', type: 'Contact Intel', description: 'Company and contact enrichment platform', link: 'https://clearbit.com/' },
      { name: 'FullContact', type: 'Contact Intel', description: 'Contact management and enrichment', link: 'https://www.fullcontact.com/' },
      { name: 'Leadfeeder', type: 'Visitor Intel', description: 'Website visitor identification and intelligence', link: 'https://www.leadfeeder.com/' },
      { name: 'DiscoverOrg', type: 'Sales Intel', description: 'Sales and marketing intelligence platform', link: 'https://discoverorg.com/' },
      
      // Company Reviews & Culture Intelligence
      { name: 'Glassdoor', type: 'Company Reviews', description: 'Company reviews, salaries, and employee insights', link: 'https://www.glassdoor.com/' },
      { name: 'Indeed Company Reviews', type: 'Company Reviews', description: 'Employee reviews and company ratings', link: 'https://www.indeed.com/companies' },
      { name: 'Comparably', type: 'Company Culture', description: 'Company culture and compensation data', link: 'https://www.comparably.com/' },
      { name: 'Kununu', type: 'Company Reviews', description: 'European company reviews and ratings', link: 'https://www.kununu.com/' },
      { name: 'Vault', type: 'Company Rankings', description: 'Company rankings and career intelligence', link: 'https://www.vault.com/' },
      { name: 'Great Place to Work', type: 'Company Culture', description: 'Best workplace certifications and rankings', link: 'https://www.greatplacetowork.com/' },
      
      // Startup & Investment Intelligence
      { name: 'AngelList', type: 'Startup Intel', description: 'Startup information, jobs, and investment data', link: 'https://angel.co/' },
      { name: 'PitchBook', type: 'Investment Intel', description: 'Private market data and investment research', link: 'https://pitchbook.com/' },
      { name: 'CB Insights', type: 'Market Intel', description: 'Market intelligence, startup tracking, and trend analysis', link: 'https://www.cbinsights.com/' },
      { name: 'Tracxn', type: 'Startup Intel', description: 'Startup and emerging company research', link: 'https://tracxn.com/' },
      { name: 'Dealroom', type: 'Startup Intel', description: 'European startup and investment intelligence', link: 'https://dealroom.co/' },
      { name: 'PreSeed Now', type: 'Early Stage Intel', description: 'Early-stage startup intelligence', link: 'https://www.preseednow.com/' },
      { name: 'F6S', type: 'Startup Platform', description: 'Startup programs and founder network', link: 'https://www.f6s.com/' },
      { name: 'Product Hunt', type: 'Product Intel', description: 'New product launches and startup discovery', link: 'https://www.producthunt.com/' },
      
      // Competitive Intelligence & Market Analysis
      { name: 'Owler', type: 'Competitive Intel', description: 'Competitive intelligence and company insights', link: 'https://www.owler.com/' },
      { name: 'Kompyte', type: 'Competitive Intel', description: 'Competitive intelligence automation', link: 'https://www.kompyte.com/' },
      { name: 'Rival IQ', type: 'Competitive Analysis', description: 'Social media and content competitive analysis', link: 'https://www.rivaliq.com/' },
      { name: 'iSpionage', type: 'Competitive Intel', description: 'Competitor PPC and SEO intelligence', link: 'https://www.ispionage.com/' },
      { name: 'SpyFu', type: 'Competitive SEO', description: 'Competitor keyword and ad intelligence', link: 'https://www.spyfu.com/' },
      { name: 'SEMrush', type: 'SEO Intel', description: 'SEO and competitive research platform', link: 'https://www.semrush.com/' },
      { name: 'Ahrefs', type: 'SEO Intel', description: 'SEO tools and backlink analysis', link: 'https://ahrefs.com/' },
      { name: 'Moz', type: 'SEO Intel', description: 'SEO software and competitive analysis', link: 'https://moz.com/' },
      
      // Web Analytics & Digital Intelligence
      { name: 'SimilarWeb', type: 'Web Analytics', description: 'Website traffic analysis and digital intelligence', link: 'https://www.similarweb.com/' },
      { name: 'Alexa (Archive)', type: 'Web Analytics', description: 'Historical website traffic and ranking data', link: 'https://web.archive.org/web/*/alexa.com' },
      { name: 'SEMrush Traffic Analytics', type: 'Traffic Intel', description: 'Website traffic and audience insights', link: 'https://www.semrush.com/analytics/traffic/' },
      { name: 'Quantcast', type: 'Audience Intel', description: 'Website audience measurement and insights', link: 'https://www.quantcast.com/' },
      { name: 'Compete', type: 'Web Analytics', description: 'Website competitive analytics', link: 'https://www.compete.com/' },
      { name: 'StatCounter', type: 'Web Stats', description: 'Website statistics and analytics', link: 'https://statcounter.com/' },
      { name: 'Website Informer', type: 'Website Intel', description: 'Website information and statistics', link: 'https://website.informer.com/' },
      
      // Financial Intelligence & Analysis
      { name: 'Yahoo Finance', type: 'Financial Data', description: 'Stock quotes, financial news, and company data', link: 'https://finance.yahoo.com/' },
      { name: 'Google Finance', type: 'Financial Data', description: 'Financial information and stock data', link: 'https://www.google.com/finance' },
      { name: 'MarketWatch', type: 'Financial News', description: 'Financial news and market data', link: 'https://www.marketwatch.com/' },
      { name: 'Morningstar', type: 'Investment Research', description: 'Investment research and analysis', link: 'https://www.morningstar.com/' },
      { name: 'Edgar Online', type: 'SEC Filings', description: 'SEC filing search and analysis', link: 'https://www.edgaronline.com/' },
      { name: 'Annual Reports', type: 'Financial Reports', description: 'Company annual reports database', link: 'https://www.annualreports.com/' },
      { name: 'Investor Relations', type: 'IR Intelligence', description: 'Company investor relations pages', link: 'https://www.investorrelations.com/' },
      
      // Technology & Infrastructure Intelligence
      { name: 'BuiltWith', type: 'Tech Intel', description: 'Website technology profiler and intelligence', link: 'https://builtwith.com/' },
      { name: 'Wappalyzer', type: 'Tech Stack', description: 'Technology stack identification', link: 'https://wappalyzer.com' },
      { name: 'Netcraft', type: 'Web Intel', description: 'Internet security and web technology intelligence', link: 'https://www.netcraft.com/' },
      { name: 'StackShare', type: 'Tech Stack', description: 'Developer tools and technology stack sharing', link: 'https://stackshare.io/' },
      { name: 'AngelList Tech', type: 'Startup Tech', description: 'Startup technology stack information', link: 'https://angel.co/' },
      { name: 'TechCrunch', type: 'Tech News', description: 'Technology news and startup coverage', link: 'https://techcrunch.com/' },
      
      // Job Market & Hiring Intelligence
      { name: 'Indeed', type: 'Job Intelligence', description: 'Job listings and company hiring patterns', link: 'https://www.indeed.com/' },
      { name: 'Jobs.com', type: 'Job Market', description: 'Job market intelligence and hiring trends', link: 'https://www.jobs.com/' },
      { name: 'Monster', type: 'Job Platform', description: 'Job search and company career pages', link: 'https://www.monster.com/' },
      { name: 'CareerBuilder', type: 'Career Intel', description: 'Career information and job market data', link: 'https://www.careerbuilder.com/' },
      { name: 'ZipRecruiter', type: 'Hiring Intel', description: 'Job posting and hiring intelligence', link: 'https://www.ziprecruiter.com/' },
      { name: 'Stack Overflow Jobs', type: 'Tech Jobs', description: 'Technology job market and developer hiring', link: 'https://stackoverflow.com/jobs' },
      { name: 'AngelList Talent', type: 'Startup Jobs', description: 'Startup job market and hiring intelligence', link: 'https://angel.co/talent' },
      
      // International & Regional Intelligence
      { name: 'Europages', type: 'European B2B', description: 'European business directory and company information', link: 'https://www.europages.com/' },
      { name: 'Alibaba', type: 'Chinese B2B', description: 'Chinese business directory and company profiles', link: 'https://www.alibaba.com/' },
      { name: 'IndiaMART', type: 'Indian B2B', description: 'Indian business directory and company information', link: 'https://www.indiamart.com/' },
      { name: 'Kompass', type: 'Global B2B', description: 'Global business directory and company database', link: 'https://www.kompass.com/' },
      { name: 'Export.gov', type: 'Trade Intel', description: 'US government trade and export intelligence', link: 'https://www.export.gov/' },
      { name: 'Trade.gov', type: 'Trade Data', description: 'International trade data and company information', link: 'https://www.trade.gov/' },
      
      // Legal & Compliance Intelligence
      { name: 'Justia', type: 'Legal Database', description: 'Legal information and case law research', link: 'https://www.justia.com/' },
      { name: 'PACER', type: 'Federal Courts', description: 'Federal court records and legal filings', link: 'https://pacer.uscourts.gov/' },
      { name: 'CourtListener', type: 'Legal Search', description: 'Legal document search and analysis', link: 'https://www.courtlistener.com/' },
      { name: 'LexisNexis', type: 'Legal Research', description: 'Legal and business research platform', link: 'https://www.lexisnexis.com/' },
      { name: 'Westlaw', type: 'Legal Research', description: 'Legal research and business intelligence', link: 'https://1.next.westlaw.com/' },
      
      // Enhanced Business Intelligence Platforms
      { name: 'Salesforce', type: 'CRM Intelligence', description: 'Customer relationship management and business intelligence', link: 'https://www.salesforce.com/' },
      { name: 'HubSpot', type: 'Marketing Intel', description: 'Marketing and sales intelligence platform', link: 'https://www.hubspot.com/' },
      { name: 'Pipedrive', type: 'Sales Intel', description: 'Sales pipeline and customer intelligence', link: 'https://www.pipedrive.com/' },
      { name: 'Outreach', type: 'Sales Intel', description: 'Sales engagement and intelligence platform', link: 'https://www.outreach.io/' },
      { name: 'SalesLoft', type: 'Sales Intel', description: 'Sales development platform with intelligence', link: 'https://salesloft.com/' },
      { name: 'Gong', type: 'Revenue Intel', description: 'Revenue intelligence platform', link: 'https://www.gong.io/' },
      { name: 'Chorus', type: 'Conversation Intel', description: 'Conversation intelligence platform', link: 'https://www.chorus.ai/' },
      { name: 'People.ai', type: 'Revenue Intel', description: 'Revenue operations and intelligence', link: 'https://people.ai/' },
      { name: 'Outbound Works', type: 'Lead Generation', description: 'B2B lead generation and intelligence', link: 'https://www.outboundworks.com/' },
      { name: 'Seamless.AI', type: 'Sales Intel', description: 'Real-time search engine for B2B sales', link: 'https://seamless.ai/' },
      
      // Market Research & Analytics
      { name: 'Statista', type: 'Market Research', description: 'Market and consumer data platform', link: 'https://www.statista.com/' },
      { name: 'IBISWorld', type: 'Industry Research', description: 'Industry market research reports', link: 'https://www.ibisworld.com/' },
      { name: 'Euromonitor', type: 'Market Research', description: 'Global market intelligence provider', link: 'https://www.euromonitor.com/' },
      { name: 'Mintel', type: 'Market Research', description: 'Market intelligence and consumer insights', link: 'https://www.mintel.com/' },
      { name: 'Frost & Sullivan', type: 'Market Research', description: 'Growth partnership company with market research', link: 'https://www.frost.com/' },
      { name: 'Research and Markets', type: 'Market Research', description: 'International market research reports', link: 'https://www.researchandmarkets.com/' },
      { name: 'Grand View Research', type: 'Market Research', description: 'Market research and consulting services', link: 'https://www.grandviewresearch.com/' },
      { name: 'Fortune Business Insights', type: 'Market Research', description: 'Market research and business intelligence', link: 'https://www.fortunebusinessinsights.com/' },
      { name: 'Allied Market Research', type: 'Market Research', description: 'Market research and business consulting', link: 'https://www.alliedmarketresearch.com/' },
      { name: 'Transparency Market Research', type: 'Market Research', description: 'Global market intelligence company', link: 'https://www.transparencymarketresearch.com/' },
      
      // Advanced OSINT Platforms & Frameworks
      { name: 'Maltego', type: 'Link Analysis', description: 'Link analysis and data mining application for OSINT investigations', link: 'https://www.maltego.com/' },
      { name: 'SpiderFoot', type: 'OSINT Automation', description: 'Automated OSINT collection and analysis framework', link: 'https://www.spiderfoot.net/' },
      { name: 'Recon-ng', type: 'Reconnaissance Framework', description: 'Full-featured reconnaissance framework for OSINT gathering', link: 'https://github.com/lanmaster53/recon-ng' },
      { name: 'TheHarvester', type: 'Information Gathering', description: 'Gather emails, subdomains, hosts, employee names from different sources', link: 'https://github.com/laramies/theHarvester' },
      { name: 'FOCA', type: 'Metadata Analysis', description: 'Tool to find metadata and hidden information in documents', link: 'https://github.com/ElevenPaths/FOCA' },
      { name: 'IntelTechniques', type: 'OSINT Resources', description: 'Comprehensive OSINT tools and training resources', link: 'https://inteltechniques.com/' },
    ]
  },

  {
    id: 'cli',
    icon: FaTerminal,
    title: 'CLI Tools & Commands',
    description: 'Command-line tools for Windows, Linux, and Kali Linux reconnaissance',
    tools: [
      // Windows CLI Tools
      { name: 'nslookup', type: 'Windows CLI', description: 'Command-line tool for querying the Domain Name System to obtain name or IP address mapping and other DNS records', command: 'nslookup domain.com' },
      { name: 'tracert', type: 'Windows CLI', description: 'Command-line tool for displaying a route and measuring transit delays of packets across an IP network', command: 'tracert domain.com' },
      
      // Linux CLI / Kali Tools  
      { name: 'dig', type: 'Linux CLI', description: 'Domain Information Groper - Queries the DNS of a given server', command: 'dig domain.com' },
      { name: 'dnsrecon', type: 'Kali Linux', description: 'Check NS Records for Zone Transfers, enumerate general DNS records, check cached DNS records, and more', command: 'dnsrecon -d domain.com', link: 'https://github.com/darkoperator/dnsrecon' },
      { name: 'dnstracer', type: 'Linux CLI', description: 'Determines where a given Domain Name Server gets its information from for a given hostname', command: 'dnstracer domain.com', link: 'http://www.mavetju.org/unix/dnstracer.php' },
      { name: 'Fierce', type: 'Kali Linux', description: 'DNS reconnaissance tool for locating non-contiguous IP space', command: 'fierce --domain domain.com', link: 'https://github.com/mschwager/fierce' },
      { name: 'Ghost Eye', type: 'Kali Linux', description: 'Information gathering tool for Whois, DNS, EtherApe, Nmap, and more', command: 'ghost-eye', link: 'https://github.com/BullsEye0/ghost_eye' },
      { name: 'recon-ng', type: 'Kali Linux', description: 'Provides a powerful environment to conduct open source web-based reconnaissance quickly and thoroughly', command: 'recon-ng', link: 'https://github.com/lanmaster53/recon-ng' },
      { name: 'ronin-recon', type: 'Linux CLI', description: 'Recursive recon engine and framework that can enumerate subdomains, DNS records, port scan, grab TLS certs, spider websites, and collect email addresses', command: 'ronin-recon run --domain example.com', link: 'https://github.com/ronin-rb/ronin-recon' },
      { name: 'traceroute', type: 'Linux CLI', description: 'Print the route packets trace to network host', command: 'traceroute domain.com' },
      { name: 'unicornscan', type: 'Linux CLI', description: 'Provides a superior interface for introducing a stimulus into and measuring a response from a TCP/IP enabled device or network', command: 'unicornscan -mT domain.com:1-1000', link: 'https://github.com/dneufeld/unicornscan' },
      { name: 'whois', type: 'Linux CLI', description: 'Quick and easy client for the whois directory service', command: 'whois domain.com' },
      
      // Advanced Network Tools
      { name: 'nmap', type: 'Network Scanner', description: 'Network discovery and security auditing', command: 'nmap -sV -sC target', link: 'https://nmap.org/' },
      { name: 'masscan', type: 'Port Scanner', description: 'Mass IP port scanner', command: 'masscan -p1-65535 10.0.0.0/8 --rate=1000', link: 'https://github.com/robertdavidgraham/masscan' },
      { name: 'zmap', type: 'Internet Scanner', description: 'Fast Internet-wide network scanner', command: 'zmap -p 80 -N 1000', link: 'https://github.com/zmap/zmap' },
      { name: 'rustscan', type: 'Port Scanner', description: 'Modern port scanner written in Rust', command: 'rustscan -a 192.168.1.1', link: 'https://github.com/RustScan/RustScan' },
      { name: 'netcat', type: 'Network Tool', description: 'Networking utility for reading/writing network connections', command: 'nc -nv target 80' },
      { name: 'socat', type: 'Network Tool', description: 'Multipurpose relay tool', command: 'socat TCP4:target:port -', link: 'http://www.dest-unreach.org/socat/' },
      { name: 'hping3', type: 'Packet Crafting', description: 'Network tool for packet crafting and analysis', command: 'hping3 -S -p 80 target', link: 'http://www.hping.org/' },
      { name: 'tcpdump', type: 'Packet Capture', description: 'Command-line packet analyzer', command: 'tcpdump -i eth0 host target' },
      { name: 'tshark', type: 'Packet Analysis', description: 'Terminal-based Wireshark', command: 'tshark -i eth0 -f "host target"', link: 'https://www.wireshark.org/' },
      { name: 'ngrep', type: 'Network Grep', description: 'Network packet analyzer', command: 'ngrep -d eth0 "GET" host target' },
      
      // Web Security CLI Tools
      { name: 'curl', type: 'Web Client', description: 'Command line tool for transferring data', command: 'curl -I https://example.com' },
      { name: 'wget', type: 'Web Downloader', description: 'Network downloader', command: 'wget --spider https://example.com' },
      { name: 'httpie', type: 'HTTP Client', description: 'Modern command line HTTP client', command: 'http GET example.com', link: 'https://httpie.io/' },
      { name: 'gobuster', type: 'Directory Brute', description: 'Directory/subdomain brute forcer', command: 'gobuster dir -u https://example.com -w wordlist.txt', link: 'https://github.com/OJ/gobuster' },
      { name: 'dirb', type: 'Directory Scanner', description: 'Web content scanner', command: 'dirb https://example.com', link: 'https://github.com/v0re/dirb' },
      { name: 'dirsearch', type: 'Directory Search', description: 'Web path scanner', command: 'python3 dirsearch.py -u https://example.com', link: 'https://github.com/maurosoria/dirsearch' },
      { name: 'ffuf', type: 'Web Fuzzer', description: 'Fast web fuzzer written in Go', command: 'ffuf -w wordlist.txt -u https://example.com/FUZZ', link: 'https://github.com/ffuf/ffuf' },
      { name: 'wfuzz', type: 'Web Fuzzer', description: 'Web application fuzzer', command: 'wfuzz -w wordlist.txt https://example.com/FUZZ', link: 'https://github.com/xmendez/wfuzz' },
      { name: 'feroxbuster', type: 'Content Discovery', description: 'Fast, simple, recursive content discovery tool', command: 'feroxbuster -u https://example.com', link: 'https://github.com/epi052/feroxbuster' },
      { name: 'hakrawler', type: 'Web Crawler', description: 'Fast web crawler designed for easy, quick discovery of endpoints', command: 'echo "https://example.com" | hakrawler', link: 'https://github.com/hakluke/hakrawler' },
      { name: 'waybackurls', type: 'URL Discovery', description: 'Fetch all URLs from Wayback Machine for a domain', command: 'waybackurls example.com', link: 'https://github.com/tomnomnom/waybackurls' },
      
      // Vulnerability Scanners CLI
      { name: 'testssl.sh', type: 'SSL Scanner', description: 'Testing TLS/SSL encryption', command: 'testssl.sh https://example.com', link: 'https://github.com/drwetter/testssl.sh' },
      { name: 'sslyze', type: 'SSL Analyzer', description: 'SSL configuration scanner', command: 'sslyze example.com', link: 'https://github.com/nabla-c0d3/sslyze' },
      { name: 'sslscan', type: 'SSL Scanner', description: 'SSL/TLS server testing tool', command: 'sslscan example.com' },
      { name: 'wpscan', type: 'WordPress Scanner', description: 'WordPress security scanner', command: 'wpscan --url https://example.com', link: 'https://wpscan.com/' },
      { name: 'droopescan', type: 'CMS Scanner', description: 'Plugin-based scanner for Drupal, WordPress, Joomla', command: 'droopescan scan drupal -u https://example.com', link: 'https://github.com/droope/droopescan' },
      { name: 'joomscan', type: 'Joomla Scanner', description: 'Joomla vulnerability scanner', command: 'joomscan -u https://example.com', link: 'https://github.com/rezasp/joomscan' },
      
      // OSINT CLI Tools
      { name: 'amass', type: 'Subdomain Enum', description: 'In-depth attack surface mapping and asset discovery', command: 'amass enum -d example.com', link: 'https://github.com/owasp-amass/amass' },
      { name: 'subfinder', type: 'Subdomain Enum', description: 'Subdomain discovery tool', command: 'subfinder -d example.com', link: 'https://github.com/projectdiscovery/subfinder' },
      { name: 'assetfinder', type: 'Asset Discovery', description: 'Find domains and subdomains', command: 'assetfinder example.com', link: 'https://github.com/tomnomnom/assetfinder' },
      { name: 'findomain', type: 'Subdomain Finder', description: 'Fast and cross-platform subdomain enumerator', command: 'findomain -t example.com', link: 'https://github.com/Findomain/Findomain' },
      { name: 'sublist3r', type: 'Subdomain Enum', description: 'Fast subdomains enumeration tool', command: 'python sublist3r.py -d example.com', link: 'https://github.com/aboul3la/Sublist3r' },
      { name: 'knockpy', type: 'Subdomain Scanner', description: 'Python tool to enumerate subdomains', command: 'knockpy example.com', link: 'https://github.com/guelfoweb/knock' },
      { name: 'subbrute', type: 'Subdomain Brute', description: 'Subdomain enumeration tool', command: 'python subbrute.py example.com', link: 'https://github.com/TheRook/subbrute' },
      { name: 'massdns', type: 'DNS Resolver', description: 'High-performance DNS stub resolver', command: 'massdns -r resolvers.txt -t A -o S subdomains.txt', link: 'https://github.com/blechschmidt/massdns' },
      { name: 'puredns', type: 'DNS Resolver', description: 'Fast domain resolver and subdomain bruteforcing', command: 'puredns bruteforce all.txt example.com', link: 'https://github.com/d3mondev/puredns' },
      { name: 'shuffledns', type: 'DNS Wrapper', description: 'Wrapper around massdns for subdomain enumeration', command: 'shuffledns -d example.com -list subdomains.txt', link: 'https://github.com/projectdiscovery/shuffledns' },
      
      // Social Media & Email OSINT
      { name: 'maigret', type: 'Username Search', description: 'Collect a dossier on a person by username', command: 'maigret username', link: 'https://github.com/soxoj/maigret' },
      { name: 'holehe', type: 'Email OSINT', description: 'Check if email is used on different sites', command: 'holehe email@domain.com', link: 'https://github.com/megadose/holehe' },
      { name: 'socialscan', type: 'Username Check', description: 'Check email address and username usage on online platforms', command: 'socialscan username email@domain.com', link: 'https://github.com/iojw/socialscan' },
      { name: 'phoneinfoga', type: 'Phone OSINT', description: 'Information gathering framework for phone numbers', command: 'phoneinfoga scan -n "+1234567890"', link: 'https://github.com/sundowndev/phoneinfoga' },
      { name: 'blackbird', type: 'Username Search', description: 'Search username across 500+ websites', command: 'python blackbird.py -u username', link: 'https://github.com/p1ngul1n0/blackbird' },
      { name: 'nexfil', type: 'Social Media', description: 'Find social media profiles across multiple platforms', command: 'python nexfil.py -u username', link: 'https://github.com/thewhiteh4t/nexfil' },
      { name: 'toutatis', type: 'Instagram OSINT', description: 'Instagram OSINT tool', command: 'python toutatis.py username', link: 'https://github.com/megadose/toutatis' },
      { name: 'twint', type: 'Twitter OSINT', description: 'Twitter intelligence tool', command: 'twint -u username', link: 'https://github.com/twintproject/twint' },
      
      // Geolocation & Image Analysis
      { name: 'exiftool', type: 'Metadata Analysis', description: 'Read and write meta information in files', command: 'exiftool image.jpg', link: 'https://exiftool.org/' },
      { name: 'metagoofil', type: 'Metadata Extractor', description: 'Extract metadata from public documents', command: 'python metagoofil.py -d example.com -t pdf', link: 'https://github.com/laramies/metagoofil' },
      { name: 'photon', type: 'Web Crawler', description: 'Fast crawler designed for OSINT', command: 'python photon.py -u https://example.com', link: 'https://github.com/s0md3v/Photon' },
      { name: 'instaloctrack', type: 'Instagram Location', description: 'Track Instagram accounts and their locations', command: 'python instaloctrack.py username', link: 'https://github.com/bernsteining/instaloctrack' },
      { name: 'geospy', type: 'Geolocation', description: 'AI-powered image geolocation tool using Google Gemini API', link: 'https://github.com/atiilla/geospy' },
      
      // WiFi & Wireless Tools
      { name: 'aircrack-ng', type: 'WiFi Security', description: 'Complete suite of tools to assess WiFi network security', command: 'aircrack-ng capture.cap', link: 'https://www.aircrack-ng.org/' },
      { name: 'airodump-ng', type: 'WiFi Monitor', description: 'WiFi packet capture program', command: 'airodump-ng wlan0mon' },
      { name: 'aireplay-ng', type: 'WiFi Injection', description: 'WiFi packet injection tool', command: 'aireplay-ng -0 1 -a BSSID wlan0mon' },
      { name: 'wash', type: 'WPS Scanner', description: 'Utility to identify WPS enabled access points', command: 'wash -i wlan0mon' },
      { name: 'reaver', type: 'WPS Attack', description: 'Brute force attack against WiFi Protected Setup', command: 'reaver -i wlan0mon -b BSSID', link: 'https://github.com/t6x/reaver-wps-fork-t6x' },
      { name: 'bully', type: 'WPS Attack', description: 'WiFi Protected Setup brute force tool', command: 'bully -b BSSID wlan0mon' },
      { name: 'kismet', type: 'WiFi Detector', description: 'Wireless network and device detector', command: 'kismet', link: 'https://www.kismetwireless.net/' },
      
      // Password & Hash Tools
      { name: 'hashcat', type: 'Password Cracking', description: 'Advanced password recovery utility', command: 'hashcat -m 0 hashes.txt wordlist.txt', link: 'https://hashcat.net/hashcat/' },
      { name: 'john', type: 'Password Cracking', description: 'John the Ripper password cracker', command: 'john --wordlist=wordlist.txt hashes.txt', link: 'https://www.openwall.com/john/' },
      { name: 'hydra', type: 'Login Cracker', description: 'Network login cracker', command: 'hydra -l admin -P passwords.txt ssh://target', link: 'https://github.com/vanhauser-thc/thc-hydra' },
      { name: 'medusa', type: 'Login Cracker', description: 'Speedy, parallel, and modular login brute-forcer', command: 'medusa -h target -u admin -P passwords.txt -M ssh' },
      { name: 'crunch', type: 'Wordlist Generator', description: 'Wordlist generator', command: 'crunch 8 8 -t @@@@@@@@' },
      { name: 'cewl', type: 'Wordlist Generator', description: 'Custom wordlist generator', command: 'cewl -d 2 -m 5 https://example.com', link: 'https://github.com/digininja/CeWL' },
      { name: 'hashid', type: 'Hash Identifier', description: 'Identify the different types of hashes', command: 'hashid hash.txt', link: 'https://github.com/psypanda/hashID' },
      
      // Exploitation & Post-Exploitation
      { name: 'metasploit', type: 'Exploitation Framework', description: 'Exploitation framework', command: 'msfconsole', link: 'https://www.metasploit.com/' },
      { name: 'searchsploit', type: 'Exploit Database', description: 'Exploit database search tool', command: 'searchsploit apache' },
      { name: 'msfvenom', type: 'Payload Generator', description: 'Payload generator and encoder', command: 'msfvenom -p linux/x86/shell_reverse_tcp LHOST=attacker LPORT=4444 -f elf' },
      { name: 'empire', type: 'Post-Exploitation', description: 'PowerShell and Python post-exploitation framework', link: 'https://github.com/EmpireProject/Empire' },
      { name: 'covenant', type: 'C2 Framework', description: '.NET command and control framework', link: 'https://github.com/cobbr/Covenant' },
      { name: 'cobalt-strike', type: 'C2 Framework', description: 'Commercial penetration testing tool', link: 'https://www.cobaltstrike.com/' },
      
      // Forensics & Analysis
      { name: 'volatility', type: 'Memory Analysis', description: 'Advanced memory forensics framework', command: 'volatility -f memory.raw imageinfo', link: 'https://www.volatilityfoundation.org/' },
      { name: 'autopsy', type: 'Digital Forensics', description: 'Digital forensics platform', link: 'https://www.autopsy.com/' },
      { name: 'sleuthkit', type: 'Digital Investigation', description: 'Collection of command line tools for digital investigation', link: 'https://www.sleuthkit.org/' },
      { name: 'binwalk', type: 'Firmware Analysis', description: 'Firmware analysis tool', command: 'binwalk firmware.bin', link: 'https://github.com/ReFirmLabs/binwalk' },
      { name: 'strings', type: 'String Extraction', description: 'Print strings of printable characters in files', command: 'strings binary' },
      { name: 'file', type: 'File Type', description: 'Determine file type', command: 'file unknown_file' },
      { name: 'hexdump', type: 'Hex Analysis', description: 'Display file contents in hexadecimal', command: 'hexdump -C file.bin' },
      
      // Database Tools
      { name: 'mysql', type: 'Database Client', description: 'MySQL command-line client', command: 'mysql -h host -u user -p database' },
      { name: 'psql', type: 'PostgreSQL Client', description: 'PostgreSQL command-line client', command: 'psql -h host -U user database' },
      { name: 'mongo', type: 'MongoDB Client', description: 'MongoDB command-line client', command: 'mongo host:port/database' },
      { name: 'redis-cli', type: 'Redis Client', description: 'Redis command-line client', command: 'redis-cli -h host -p port' },
      
      // System Monitoring & Analysis
      { name: 'htop', type: 'Process Monitor', description: 'Interactive process viewer', command: 'htop' },
      { name: 'iftop', type: 'Network Monitor', description: 'Display bandwidth usage on network interface', command: 'iftop' },
      { name: 'iotop', type: 'I/O Monitor', description: 'Monitor I/O usage by processes', command: 'iotop' },
      { name: 'nethogs', type: 'Network Usage', description: 'Monitor per-process network usage', command: 'nethogs' },
      { name: 'ss', type: 'Socket Statistics', description: 'Display socket statistics', command: 'ss -tuln' },
      { name: 'netstat', type: 'Network Statistics', description: 'Display network connections', command: 'netstat -tuln' },
      { name: 'lsof', type: 'Open Files', description: 'List open files and processes', command: 'lsof -i :80' },
      { name: 'ps', type: 'Process List', description: 'Display running processes', command: 'ps aux' },
      { name: 'top', type: 'Process Monitor', description: 'Display and update sorted information about running processes', command: 'top' },
      
      // Text Processing & Analysis
      { name: 'grep', type: 'Text Search', description: 'Search text patterns in files', command: 'grep -r "pattern" /path/' },
      { name: 'sed', type: 'Stream Editor', description: 'Stream editor for filtering and transforming text', command: 'sed "s/old/new/g" file.txt' },
      { name: 'awk', type: 'Text Processing', description: 'Pattern scanning and processing language', command: 'awk "{print $1}" file.txt' },
      { name: 'sort', type: 'Text Sorting', description: 'Sort lines in text files', command: 'sort file.txt' },
      { name: 'uniq', type: 'Duplicate Filter', description: 'Report or omit repeated lines', command: 'uniq file.txt' },
      { name: 'cut', type: 'Field Extractor', description: 'Extract sections from each line of files', command: 'cut -d"," -f1 file.csv' },
      { name: 'jq', type: 'JSON Processor', description: 'Command-line JSON processor', command: 'cat file.json | jq ".key"', link: 'https://jqlang.github.io/jq/' },
      
      // Additional Advanced CLI Security Tools
      { name: 'bat', type: 'File Viewer', description: 'A cat clone with syntax highlighting and Git integration', command: 'bat file.txt', link: 'https://github.com/sharkdp/bat' },
      { name: 'fd', type: 'File Search', description: 'Simple, fast and user-friendly alternative to find', command: 'fd pattern /path/to/search', link: 'https://github.com/sharkdp/fd' },
      { name: 'ripgrep', type: 'Text Search', description: 'Line-oriented search tool that recursively searches directories', command: 'rg "pattern" /path/to/search', link: 'https://github.com/BurntSushi/ripgrep' },
      { name: 'httpx', type: 'HTTP Toolkit', description: 'Fast and multi-purpose HTTP toolkit', command: 'echo "https://example.com" | httpx', link: 'https://github.com/projectdiscovery/httpx' },
      { name: 'dnsx', type: 'DNS Toolkit', description: 'Fast and multi-purpose DNS toolkit', command: 'echo "example.com" | dnsx', link: 'https://github.com/projectdiscovery/dnsx' },
      { name: 'proxify', type: 'HTTP Proxy', description: 'Swiss Army Knife Proxy for rapid deployments', command: 'proxify', link: 'https://github.com/projectdiscovery/proxify' },
      { name: 'notify', type: 'Notification Tool', description: 'Stream the output of several tools and send notifications', command: 'subfinder -d example.com | notify', link: 'https://github.com/projectdiscovery/notify' },
    ]
  },

  {
    id: 'email',
    icon: FaEnvelope,
    title: 'Email & Social Intelligence',
    description: 'Tools for gathering personal information, social networks, and email footprinting',
    tools: [
      // Personal Information & Background Checks
      { name: 'BeenVerified', type: 'Background Check', description: 'Background checks with loads of information', link: 'https://www.beenverified.com/' },
      { name: 'PeekYou', type: 'People Search', description: 'Locate personal information from family members to social media accounts', link: 'https://www.peekyou.com/' },
      
      // Email Intelligence & Tracking
      { name: 'eMailTrackerPro', type: 'Email Analysis', description: 'Pull detailed information from an email header. Also includes spam filtering', link: 'https://www.emailtrackerpro.com/' },
      { name: 'Infoga', type: 'Email OSINT', description: 'Gather email OSINT. Domains, sources, breaches, and more', command: 'python infoga.py --domain example.com --source all', link: 'https://github.com/m4ll0k/Infoga' },
      
      // Social Media Intelligence
      { name: 'Followerwonk', type: 'Twitter Intel', description: 'Information scraped from Twitter', link: 'https://followerwonk.com/' },
      { name: 'Jigsaw', type: 'OSINT Collection', description: 'OSINT-X Intelligence Collection Tool from Jigsaw allows for the collection of data from RSS feeds, the dark web, Twitter, Facebook, and other sources', link: 'https://jigsaw.google.com/' },
      
      // Social Media Hunting Tools
      { name: 'Sherlock', type: 'Social Hunt', description: 'Hunt down social media accounts by username across social networks', command: 'python3 sherlock.py username', link: 'https://github.com/sherlock-project/sherlock' },
      { name: 'Social Mapper', type: 'Social Correlation', description: 'Social media enumeration and correlation', command: 'python socialmapper.py -f names.txt -m fast', link: 'https://github.com/Greenwolf/social_mapper' },
      
      // Email Verification & Validation
      { name: 'EmailHippo', type: 'Email Verification', description: 'Email verification and validation', link: 'https://tools.emailhippo.com/' },
      
      // Breach Data & Credential Intelligence
      
      // Enhanced People Search & Background Checks
      { name: 'InstantCheckmate', type: 'Background Check', description: 'Public records search and background checks', link: 'https://www.instantcheckmate.com/' },
      { name: 'TruthFinder', type: 'Background Check', description: 'Background check and public records search', link: 'https://www.truthfinder.com/' },
      { name: 'CheckPeople', type: 'People Search', description: 'People search and background verification', link: 'https://www.checkpeople.com/' },
      
      // Advanced Email Intelligence Tools
      { name: 'RocketReach', type: 'Email Discovery', description: 'Find email addresses and contact information', link: 'https://rocketreach.co/' },
      { name: 'Clearbit Connect', type: 'Email Discovery', description: 'Find email addresses directly in Gmail', link: 'https://connect.clearbit.com/' },
      { name: 'FindThatLead', type: 'Email Discovery', description: 'Email finder and lead generation tool', link: 'https://findthatlead.com/' },
      { name: 'MailTester', type: 'Email Verification', description: 'Email deliverability and spam testing', link: 'https://www.mail-tester.com/' },
      { name: 'ZeroBounce', type: 'Email Verification', description: 'Email validation and deliverability service', link: 'https://www.zerobounce.net/' },
      { name: 'NeverBounce', type: 'Email Verification', description: 'Real-time email verification service', link: 'https://neverbounce.com/' },
      { name: 'BriteVerify', type: 'Email Verification', description: 'Real-time email and address verification', link: 'https://www.briteverify.com/' },
      { name: 'Email Checker', type: 'Email Verification', description: 'Free email verification tool', link: 'https://email-checker.net/' },
      { name: 'Verify Email', type: 'Email Verification', description: 'Free email address verification', link: 'https://verify-email.org/' },
      { name: 'EmailListVerify', type: 'Email Verification', description: 'Bulk email verification service', link: 'https://www.emaillistverify.com/' },
      
      // Social Media Intelligence Platforms
      { name: 'Brandwatch', type: 'Social Monitoring', description: 'Social media analytics and consumer insights', link: 'https://www.brandwatch.com/' },
      { name: 'Sprout Social', type: 'Social Analytics', description: 'Social media management and analytics platform', link: 'https://sproutsocial.com/' },
      { name: 'Hootsuite Insights', type: 'Social Analytics', description: 'Social media analytics and monitoring', link: 'https://hootsuite.com/products/insights' },
      { name: 'Socialbakers', type: 'Social Intelligence', description: 'Social media marketing intelligence platform', link: 'https://www.socialbakers.com/' },
      { name: 'Mention', type: 'Social Monitoring', description: 'Social media and web mention monitoring', link: 'https://mention.com/' },
      { name: 'Brand24', type: 'Social Monitoring', description: 'Social media monitoring and brand intelligence', link: 'https://brand24.com/' },
      { name: 'Social Studio', type: 'Social Management', description: 'Salesforce social media management platform', link: 'https://www.salesforce.com/products/marketing-cloud/social-media-marketing/' },
      { name: 'Awario', type: 'Social Monitoring', description: 'Social media and web monitoring tool', link: 'https://awario.com/' },
      { name: 'Keyhole', type: 'Social Analytics', description: 'Real-time hashtag and keyword tracking', link: 'https://keyhole.co/' },
      { name: 'Quintly', type: 'Social Analytics', description: 'Social media analytics and competitive benchmarking', link: 'https://www.quintly.com/' },
      
      // Username & Social Media Search Tools
      { name: 'Namecheckr', type: 'Username Search', description: 'Check username availability across platforms', link: 'https://www.namecheckr.com/' },
      { name: 'NameCheckup', type: 'Username Search', description: 'Check username and domain availability', link: 'https://namecheckup.com/' },
      { name: 'UserSearch', type: 'Username Search', description: 'Search for usernames across social networks', link: 'https://usersearch.org/' },
      { name: 'CheckUsernames', type: 'Username Search', description: 'Check username availability on 160+ social networks', link: 'https://checkusernames.com/' },
      { name: 'Knowem', type: 'Username Search', description: 'Search for your brand on over 500 social networks', link: 'https://knowem.com/' },
      { name: 'Social Bearing', type: 'Twitter Analytics', description: 'Twitter analytics and search tool', link: 'https://socialbearing.com/' },
      { name: 'Twitonomy', type: 'Twitter Analytics', description: 'Twitter analytics and user insights', link: 'https://www.twitonomy.com/' },
      { name: 'TweetReach', type: 'Twitter Analytics', description: 'Twitter reach and engagement analytics', link: 'https://tweetreach.com/' },
      { name: 'Hashtagify', type: 'Hashtag Analytics', description: 'Hashtag analytics and influencer marketing', link: 'https://hashtagify.me/' },
      { name: 'RiteTag', type: 'Hashtag Analytics', description: 'Hashtag suggestions and analytics', link: 'https://ritetag.com/' },
      
      // LinkedIn Intelligence Tools
      { name: 'Sales Navigator', type: 'LinkedIn Tool', description: 'Advanced LinkedIn search and sales intelligence', link: 'https://business.linkedin.com/sales-solutions/sales-navigator' },
      { name: 'LinkedIn Helper', type: 'LinkedIn Tool', description: 'LinkedIn automation and lead generation', link: 'https://linkedinhelper.com/' },
      { name: 'Dux-Soup', type: 'LinkedIn Tool', description: 'LinkedIn lead generation and automation', link: 'https://www.dux-soup.com/' },
      { name: 'Meet Leonard', type: 'LinkedIn Tool', description: 'LinkedIn prospecting and outreach tool', link: 'https://meetleonard.com/' },
      { name: 'Phantombuster', type: 'Social Automation', description: 'Social media data extraction and automation', link: 'https://phantombuster.com/' },
      { name: 'Lemlist', type: 'Outreach Tool', description: 'Personalized email outreach and LinkedIn automation', link: 'https://lemlist.com/' },
      { name: 'Expandi', type: 'LinkedIn Tool', description: 'LinkedIn outreach and lead generation', link: 'https://expandi.io/' },
      { name: 'WeConnect', type: 'LinkedIn Tool', description: 'LinkedIn automation and lead generation', link: 'https://weconnect.co/' },
      
      // Phone Number Intelligence
      { name: 'TrueCaller', type: 'Phone Intel', description: 'Caller ID and spam protection', link: 'https://www.truecaller.com/' },
      { name: 'WhitePages Reverse Phone', type: 'Phone Intel', description: 'Reverse phone number lookup', link: 'https://www.whitepages.com/reverse-phone' },
      
      // Advanced Email Intelligence & Deliverability
      { name: 'Mailfloss', type: 'Email Verification', description: 'Email list hygiene and verification service', link: 'https://mailfloss.com/' },
      { name: 'EmailListValidation', type: 'Email Verification', description: 'Real-time email validation service', link: 'https://www.emaillistvalidation.com/' },
      { name: 'QuickEmailVerification', type: 'Email Verification', description: 'Fast email verification API', link: 'https://quickemailverification.com/' },
      { name: 'Emailable', type: 'Email Verification', description: 'Email verification and list cleaning', link: 'https://emailable.com/' },
      { name: 'MailboxValidator', type: 'Email Verification', description: 'Email verification and validation service', link: 'https://www.mailboxvalidator.com/' },
      { name: 'Kickbox', type: 'Email Verification', description: 'Email verification platform', link: 'https://kickbox.com/' },
      { name: 'Bounceless', type: 'Email Verification', description: 'Email bounce detection and verification', link: 'https://bounceless.io/' },
      { name: 'EmailMarker', type: 'Email Verification', description: 'Email validation and deliverability tools', link: 'https://emailmarker.com/' },
      { name: 'DataValidation', type: 'Email Verification', description: 'Email and phone validation service', link: 'https://www.datavalidation.com/' },
      { name: 'Proofy', type: 'Email Verification', description: 'Email verification and list cleaning', link: 'https://proofy.io/' },
      
      // Email Discovery & Lead Generation
      { name: 'Snov.io', type: 'Email Discovery', description: 'Email finder and lead generation platform', link: 'https://snov.io/' },
      { name: 'Snovio Email Finder', type: 'Email Discovery', description: 'Find emails from LinkedIn and websites', link: 'https://snov.io/email-finder' },
      { name: 'Email Finder by Name', type: 'Email Discovery', description: 'Find email addresses by person name', link: 'https://tools.emailhippo.com/email-finder' },
      { name: 'Anymail Finder', type: 'Email Discovery', description: 'Find anyone\'s email address', link: 'https://anymailfinder.com/' },
      { name: 'Lusha', type: 'Contact Discovery', description: 'B2B contact and email discovery', link: 'https://www.lusha.com/' },
      { name: 'ContactOut', type: 'Email Discovery', description: 'Email finder for recruiters and sales', link: 'https://contactout.com/' },
      { name: 'Prospect.io', type: 'Email Discovery', description: 'Email outreach and discovery platform', link: 'https://prospect.io/' },
      { name: 'Skrapp', type: 'Email Discovery', description: 'Email finder and verification tool', link: 'https://skrapp.io/' },
      { name: 'FindEmails', type: 'Email Discovery', description: 'Bulk email finder and verifier', link: 'https://findemails.com/' },
      { name: 'Email Extractor', type: 'Email Discovery', description: 'Extract emails from websites and social media', link: 'https://www.emailextractor.com/' },
      
      // Social Media Analytics & Intelligence
      { name: 'Hootsuite Analytics', type: 'Social Analytics', description: 'Comprehensive social media analytics', link: 'https://www.hootsuite.com/products/analytics' },
      { name: 'Buffer Analyze', type: 'Social Analytics', description: 'Social media performance analytics', link: 'https://buffer.com/analyze' },
      { name: 'Later Analytics', type: 'Social Analytics', description: 'Visual social media analytics', link: 'https://later.com/analytics/' },
      { name: 'Iconosquare', type: 'Social Analytics', description: 'Instagram and Facebook analytics', link: 'https://pro.iconosquare.com/' },
      { name: 'Union Metrics', type: 'Social Analytics', description: 'Social media analytics and insights', link: 'https://unionmetrics.com/' },
      { name: 'Talkwalker', type: 'Social Monitoring', description: 'Social media monitoring and analytics', link: 'https://www.talkwalker.com/' },
      { name: 'Mention.com', type: 'Social Monitoring', description: 'Real-time media monitoring', link: 'https://mention.com/' },
      { name: 'NetBase Quid', type: 'Social Intelligence', description: 'Consumer and market intelligence platform', link: 'https://netbasequid.com/' },
      { name: 'Crimson Hexagon', type: 'Social Analytics', description: 'Social media analytics and insights', link: 'https://www.crimsonhexagon.com/' },
      { name: 'Synthesio', type: 'Social Listening', description: 'Social media listening and analytics', link: 'https://www.synthesio.com/' },
      
      // Instagram Intelligence Tools
      { name: 'Instagram Insights', type: 'Instagram Analytics', description: 'Native Instagram analytics', link: 'https://business.instagram.com/getting-started/measure-and-promote' },
      { name: 'Picodash', type: 'Instagram Analytics', description: 'Instagram analytics and reporting', link: 'https://www.picodash.com/' },
      { name: 'Squarelovin', type: 'Instagram Analytics', description: 'Instagram analytics for businesses', link: 'https://www.squarelovin.com/' },
      { name: 'Simply Measured', type: 'Instagram Analytics', description: 'Instagram performance analytics', link: 'https://simplymeasured.com/' },
      { name: 'Keyhole Instagram', type: 'Instagram Tracking', description: 'Instagram hashtag and account tracking', link: 'https://keyhole.co/instagram-analytics/' },
      { name: 'Instagram User Search', type: 'Instagram OSINT', description: 'Search Instagram users and content', link: 'https://www.instagram.com/directory/profiles/' },
      { name: 'Mulpix', type: 'Instagram Search', description: 'Instagram photo search engine', link: 'https://mulpix.com/' },
      { name: 'Bibliogram', type: 'Instagram Viewer', description: 'Privacy-friendly Instagram viewer', link: 'https://bibliogram.art/' },
      
      // Twitter/X Intelligence Tools
      { name: 'Twitter Analytics', type: 'Twitter Analytics', description: 'Native Twitter analytics platform', link: 'https://analytics.twitter.com/' },
      { name: 'Followerwonk Analytics', type: 'Twitter Analytics', description: 'Advanced Twitter analytics and insights', link: 'https://followerwonk.com/analyze' },
      { name: 'Trendsmap', type: 'Twitter Trends', description: 'Real-time Twitter trends by location', link: 'https://www.trendsmap.com/' },
      { name: 'TweetMap', type: 'Twitter Geolocation', description: 'Geolocated tweets on a map', link: 'https://www.omnisci.com/demos/tweetmap' },
      { name: 'Foller.me', type: 'Twitter Analytics', description: 'Twitter account analytics and insights', link: 'https://foller.me/' },
      { name: 'TweetStats', type: 'Twitter Analytics', description: 'Personal Twitter statistics', link: 'http://www.tweetstats.com/' },
      { name: 'Twitter Advanced Search', type: 'Twitter Search', description: 'Advanced Twitter search operators', link: 'https://twitter.com/search-advanced' },
      { name: 'All My Tweets', type: 'Twitter Archive', description: 'View all tweets from any user', link: 'https://www.allmytweets.net/' },
      
      // LinkedIn Intelligence & Automation
      { name: 'LinkedIn Sales Insights', type: 'LinkedIn Analytics', description: 'LinkedIn sales analytics and insights', link: 'https://business.linkedin.com/sales-solutions/sales-insights' },
      { name: 'LinkedIn Company Insights', type: 'LinkedIn Analytics', description: 'Company page analytics on LinkedIn', link: 'https://business.linkedin.com/marketing-solutions/company-pages/insights' },
      { name: 'Crystal', type: 'LinkedIn Intelligence', description: 'Personality insights for LinkedIn profiles', link: 'https://www.crystalknows.com/' },
      { name: 'Recruiter Lite', type: 'LinkedIn Tool', description: 'LinkedIn recruiting and search tool', link: 'https://business.linkedin.com/talent-solutions/recruiter-lite' },
      { name: 'LinkedIn Learning Insights', type: 'LinkedIn Analytics', description: 'Learning and development analytics', link: 'https://learning.linkedin.com/insights' },
      { name: 'Kendo Email Finder', type: 'LinkedIn Email', description: 'Find emails from LinkedIn profiles', link: 'https://kendoemailfinder.com/' },
      { name: 'LinkedHelper', type: 'LinkedIn Automation', description: 'LinkedIn automation and outreach', link: 'https://linkedhelper.com/' },
      { name: 'Octopus CRM', type: 'LinkedIn CRM', description: 'LinkedIn automation and CRM', link: 'https://octopuscrm.io/' },
      
      // Facebook Intelligence Tools
      { name: 'Facebook Analytics', type: 'Facebook Analytics', description: 'Native Facebook analytics platform', link: 'https://www.facebook.com/analytics/' },
      { name: 'Facebook Audience Insights', type: 'Facebook Analytics', description: 'Audience research and insights', link: 'https://www.facebook.com/business/insights/tools/audience-insights' },
      { name: 'Facebook Page Insights', type: 'Facebook Analytics', description: 'Page performance analytics', link: 'https://www.facebook.com/business/help/794890670645072' },
      { name: 'Who Posted What', type: 'Facebook Search', description: 'Facebook keyword search tool', link: 'https://whopostedwhat.com/' },
      { name: 'Facebook People Search', type: 'Facebook OSINT', description: 'Search for people on Facebook', link: 'https://www.facebook.com/public' },
      { name: 'Social Fixer', type: 'Facebook Tool', description: 'Enhanced Facebook browsing and filtering', link: 'https://socialfixer.com/' },
      { name: 'Facebook Graph Search', type: 'Facebook Search', description: 'Advanced Facebook search techniques', link: 'https://www.facebook.com/help/267937149956280' },
      
      // Professional Email Marketing Intelligence
      { name: 'Litmus', type: 'Email Testing', description: 'Email testing and analytics platform', link: 'https://www.litmus.com/' },
      { name: 'Email on Acid', type: 'Email Testing', description: 'Email testing and preview platform', link: 'https://www.emailonacid.com/' },
      
      // Additional Email Intelligence Tools
      { name: 'MailTester', type: 'Email Testing', description: 'Test email deliverability and spam score', link: 'https://www.mail-tester.com/' },
      { name: 'GlockApps', type: 'Email Deliverability', description: 'Email deliverability testing and monitoring', link: 'https://glockapps.com/' },
      { name: 'Return Path', type: 'Email Intelligence', description: 'Email deliverability and reputation management', link: 'https://returnpath.com/' },
      { name: 'SendForensics', type: 'Email Analysis', description: 'Email authentication and deliverability analysis', link: 'https://sendforensics.com/' },
      { name: 'MXToolbox Email Health', type: 'Email Infrastructure', description: 'Email server and deliverability diagnostics', link: 'https://mxtoolbox.com/EmailHealth.aspx' },
      
      // Advanced Social Intelligence
      { name: 'Brandwatch', type: 'Social Listening', description: 'Consumer intelligence and social listening platform', link: 'https://www.brandwatch.com/' },
      { name: 'Socialmention', type: 'Social Monitoring', description: 'Real-time social media search and analysis', link: 'https://socialmention.com/' },
      { name: 'Social Searcher', type: 'Social Search', description: 'Free social media monitoring and analytics', link: 'https://www.social-searcher.com/' },
      { name: 'Awario', type: 'Brand Monitoring', description: 'Social media and web monitoring tool', link: 'https://awario.com/' },
      { name: 'Brand24', type: 'Social Listening', description: 'Social media monitoring and analytics tool', link: 'https://brand24.com/' },
      { name: 'Keyhole', type: 'Social Analytics', description: 'Hashtag tracking and social media analytics', link: 'https://keyhole.co/' },
      { name: 'Falcon.io', type: 'Social Management', description: 'Social media marketing platform with analytics', link: 'https://www.falcon.io/' },
      { name: 'Digimind', type: 'Social Intelligence', description: 'Social listening and competitive intelligence', link: 'https://www.digimind.com/' },
    ]
  },

  {
    id: 'websec',
    icon: FaShieldAlt,
    title: 'Web Security & Testing',
    description: 'Web application security tools, vulnerability scanners, and testing frameworks',
    tools: [
      // Visual Reconnaissance
      { name: 'Aquatone', type: 'Visual Recon', description: 'A tool for visual inspection of websites across a large amount of hosts. Very convenient for quickly gaining an overview of HTTP-based attack surfaces', command: 'aquatone-discover --domain example.com', link: 'https://github.com/michenriksen/aquatone' },
      
      // Web Application Testing
      { name: 'URL Fuzzer', type: 'Directory Fuzzing', description: 'Free light scan for hidden files and directories', link: 'https://pentest-tools.com/website-vulnerability-scanning/discover-hidden-directories-and-files' },
      { name: 'WebShag', type: 'Web Audit', description: 'Multi-threaded, multi-platform web server audit tool. Gathers useful functionalities for web server auditing like website crawling, URL scanning, or file fuzzing', link: 'https://github.com/receptron/webshag' },
      
      // Network Analysis
      { name: 'Wireshark', type: 'Network Analyzer', description: 'The world\'s foremost and widely-used network protocol analyzer', link: 'https://www.wireshark.org/' },
      
      // Domain Intelligence
      { name: 'Whois.net', type: 'Domain Lookup', description: 'Quick and easy Whois lookup. Domain name search, registration and availability, and more', link: 'https://www.whois.net/' },
      { name: 'FireCompass', type: 'Attack Surface', description: 'Discovers an organization\'s digital attack surface', link: 'https://firecompass.com/' },
      
      // Vulnerability Assessment
      { name: 'Nuclei', type: 'Vuln Scanner', description: 'Fast and customizable vulnerability scanner based on simple YAML templates', command: 'nuclei -u https://example.com', link: 'https://github.com/projectdiscovery/nuclei' },
      { name: 'Nikto', type: 'Web Scanner', description: 'Web server scanner which performs comprehensive tests against web servers', command: 'nikto -h https://example.com', link: 'https://github.com/sullo/nikto' },
      { name: 'OWASP ZAP', type: 'Security Testing', description: 'Zed Attack Proxy - web application security scanner', link: 'https://www.zaproxy.org/' },
      
      // SSL/TLS Testing
      { name: 'SSL Labs', type: 'SSL Test', description: 'SSL server test and configuration analyzer', link: 'https://www.ssllabs.com/ssltest/' },
      { name: 'testssl.sh', type: 'SSL Scanner', description: 'Testing TLS/SSL encryption anywhere on any port', command: 'testssl.sh https://example.com', link: 'https://github.com/drwetter/testssl.sh' },
      
      // Content Discovery
      { name: 'Gobuster', type: 'Directory Brute', description: 'Directory/subdomain brute forcer', command: 'gobuster dir -u https://example.com -w wordlist.txt', link: 'https://github.com/OJ/gobuster' },
      { name: 'Dirb', type: 'Directory Scanner', description: 'Web content scanner and directory brute forcer', command: 'dirb https://example.com', link: 'https://github.com/v0re/dirb' },
      { name: 'Dirsearch', type: 'Directory Search', description: 'Web path scanner and directory brute forcer', command: 'python3 dirsearch.py -u https://example.com', link: 'https://github.com/maurosoria/dirsearch' },
      
      // Advanced Web Vulnerability Scanners
      { name: 'Burp Suite', type: 'Web Proxy', description: 'Comprehensive web application security testing platform', link: 'https://portswigger.net/burp' },
      { name: 'SQLmap', type: 'SQL Injection', description: 'Automatic SQL injection and database takeover tool', command: 'sqlmap -u "https://example.com/page?id=1"', link: 'https://sqlmap.org/' },
      { name: 'XSSer', type: 'XSS Scanner', description: 'Cross Site Scripter automatic framework', command: 'xsser --url "https://example.com/search?q=XSS"', link: 'https://github.com/epsylon/xsser' },
      { name: 'Commix', type: 'Command Injection', description: 'Automated command injection tool', command: 'python commix.py --url="https://example.com/page.php?id=1"', link: 'https://github.com/commixproject/commix' },
      { name: 'W3af', type: 'Web App Scanner', description: 'Web application attack and audit framework', command: 'w3af_console', link: 'https://github.com/andresriancho/w3af' },
      { name: 'Arachni', type: 'Web Scanner', description: 'Web application security scanner framework', command: 'arachni https://example.com', link: 'https://www.arachni-scanner.com/' },
      { name: 'Wapiti', type: 'Web Vulnerability', description: 'Web application vulnerability scanner', command: 'wapiti -u https://example.com', link: 'https://github.com/wapiti-scanner/wapiti' },
      { name: 'Skipfish', type: 'Web Recon', description: 'Active web application security reconnaissance tool', command: 'skipfish -o output https://example.com', link: 'https://github.com/spinkham/skipfish' },
      { name: 'Vega', type: 'Web Scanner', description: 'Web security scanner and testing platform', link: 'https://github.com/subgraph/Vega' },
      { name: 'Ratproxy', type: 'Web Proxy', description: 'Passive web application security audit tool', command: 'ratproxy -w output.log -v https://example.com', link: 'https://github.com/wallin/ratproxy' },
      
      // Web Crawlers & Spiders
      { name: 'Hakrawler', type: 'Web Crawler', description: 'Fast web crawler for gathering URLs and JavaScript', command: 'echo "https://example.com" | hakrawler', link: 'https://github.com/hakluke/hakrawler' },
      { name: 'Katana', type: 'Web Crawler', description: 'Next-generation crawling and spidering framework', command: 'katana -u https://example.com', link: 'https://github.com/projectdiscovery/katana' },
      { name: 'Photon', type: 'Web Crawler', description: 'Incredibly fast crawler designed for OSINT', command: 'python photon.py -u https://example.com', link: 'https://github.com/s0md3v/Photon' },
      { name: 'ParamSpider', type: 'Parameter Discovery', description: 'Mining parameters from dark corners of Web Archives', command: 'python paramspider.py --domain example.com', link: 'https://github.com/devanshbatham/ParamSpider' },
      { name: 'LinkFinder', type: 'Endpoint Discovery', description: 'Discover endpoints and parameters in JavaScript files', command: 'python linkfinder.py -i https://example.com -o cli', link: 'https://github.com/GerbenJavado/LinkFinder' },
      { name: 'GAU', type: 'URL Gatherer', description: 'Fetch known URLs from multiple sources', command: 'gau example.com', link: 'https://github.com/lc/gau' },
      { name: 'Waybackurls', type: 'Archive Crawler', description: 'Fetch all URLs from Wayback Machine', command: 'waybackurls example.com', link: 'https://github.com/tomnomnom/waybackurls' },
      { name: 'Gospider', type: 'Web Spider', description: 'Fast web spider written in Go', command: 'gospider -s https://example.com', link: 'https://github.com/jaeles-project/gospider' },
      
      // Web Fuzzing Tools
      { name: 'FFuf', type: 'Web Fuzzer', description: 'Fast web fuzzer written in Go', command: 'ffuf -w wordlist.txt -u https://example.com/FUZZ', link: 'https://github.com/ffuf/ffuf' },
      { name: 'Wfuzz', type: 'Web Fuzzer', description: 'Web application fuzzer', command: 'wfuzz -w wordlist.txt https://example.com/FUZZ', link: 'https://github.com/xmendez/wfuzz' },
      { name: 'Feroxbuster', type: 'Content Discovery', description: 'Fast, simple, recursive content discovery tool', command: 'feroxbuster -u https://example.com', link: 'https://github.com/epi052/feroxbuster' },
      { name: 'DirBuster', type: 'Directory Fuzzer', description: 'Multi threaded directory and file brute forcer', link: 'https://sourceforge.net/projects/dirbuster/' },
      { name: 'Intruder', type: 'Payload Fuzzer', description: 'Burp Suite Intruder for automated attacks', link: 'https://portswigger.net/burp/documentation/desktop/tools/intruder' },
      { name: 'Turbo Intruder', type: 'High Speed Fuzzer', description: 'Burp Suite extension for high-speed attacks', link: 'https://github.com/PortSwigger/turbo-intruder' },
      
      // API Security Testing
      { name: 'Postman', type: 'API Testing', description: 'API development and testing platform', link: 'https://www.postman.com/' },
      { name: 'Insomnia', type: 'API Client', description: 'API design and testing tool', link: 'https://insomnia.rest/' },
      { name: 'OpenAPI Generator', type: 'API Tool', description: 'Generate API client libraries and documentation', link: 'https://openapi-generator.tech/' },
      { name: 'Swagger UI', type: 'API Documentation', description: 'Interactive API documentation', link: 'https://swagger.io/tools/swagger-ui/' },
      { name: 'REST Assured', type: 'API Testing', description: 'Java DSL for testing REST services', link: 'https://rest-assured.io/' },
      { name: 'Newman', type: 'API Testing', description: 'Command-line companion for Postman', command: 'newman run collection.json', link: 'https://www.npmjs.com/package/newman' },
      { name: 'Dredd', type: 'API Testing', description: 'HTTP API testing framework', command: 'dredd apiary.apib http://localhost:3000', link: 'https://dredd.org/' },
      { name: 'Tavern', type: 'API Testing', description: 'Command-line tool and Python library for testing APIs', link: 'https://tavern.readthedocs.io/' },
      
      // Web Application Firewalls & Protection Testing
      { name: 'wafw00f', type: 'WAF Detection', description: 'Web Application Firewall fingerprinting tool', command: 'wafw00f https://example.com', link: 'https://github.com/EnableSecurity/wafw00f' },
      { name: 'FTW', type: 'WAF Testing', description: 'Framework for Testing WAFs', command: 'ftw --include-tags=fast tests/', link: 'https://github.com/CRS-support/ftw' },
      { name: 'SecLists', type: 'Security Wordlists', description: 'Collection of multiple types of lists for security assessments', link: 'https://github.com/danielmiessler/SecLists' },
      { name: 'PayloadsAllTheThings', type: 'Security Payloads', description: 'A list of useful payloads and bypass for Web Application Security', link: 'https://github.com/swisskyrepo/PayloadsAllTheThings' },
      
      // Web Technology Analysis
      { name: 'Retire.js', type: 'JavaScript Scanner', description: 'Scanner detecting the use of JavaScript libraries with known vulnerabilities', command: 'retire --js --outputpath report.json', link: 'https://github.com/RetireJS/retire.js' },
      { name: 'Safety', type: 'Python Dependency', description: 'Check Python dependencies for known security vulnerabilities', command: 'safety check', link: 'https://github.com/pyupio/safety' },
      { name: 'Node Security Platform', type: 'Node.js Security', description: 'Continuous security monitoring for Node.js applications', link: 'https://nodesecurity.io/' },
      { name: 'Snyk', type: 'Dependency Scanner', description: 'Find and fix vulnerabilities in dependencies', command: 'snyk test', link: 'https://snyk.io/' },
      { name: 'Yarn Audit', type: 'Dependency Audit', description: 'Audit JavaScript dependencies for vulnerabilities', command: 'yarn audit' },
      { name: 'npm audit', type: 'Dependency Audit', description: 'Audit npm dependencies for vulnerabilities', command: 'npm audit' },
      
      // Browser Security Testing
      { name: 'BeEF', type: 'Browser Exploitation', description: 'Browser Exploitation Framework', link: 'https://beefproject.com/' },
      { name: 'XSSHunter', type: 'XSS Detection', description: 'Platform for finding blind XSS vulnerabilities', link: 'https://xsshunter.com/' },
      { name: 'DOMinator', type: 'DOM Analysis', description: 'DOM XSS vulnerability scanner', link: 'https://github.com/securecodewarrior/dominator' },
      { name: 'XSStrike', type: 'XSS Scanner', description: 'Advanced XSS detection suite', command: 'python xsstrike.py -u "https://example.com/search?q=test"', link: 'https://github.com/s0md3v/XSStrike' },
      { name: 'BruteXSS', type: 'XSS Brute Forcer', description: 'Tool to find XSS vulnerabilities in web applications', command: 'python brutexss.py -u https://example.com', link: 'https://github.com/rajeshmajumdar/BruteXSS' },
      { name: 'XSRFProbe', type: 'CSRF Scanner', description: 'Cross Site Request Forgery audit toolkit', command: 'xsrfprobe -u https://example.com', link: 'https://github.com/0xinfection/xsrfprobe' },
      
      // Mobile Web Security
      { name: 'MobSF', type: 'Mobile Security', description: 'Mobile Security Framework for security testing', link: 'https://github.com/MobSF/Mobile-Security-Framework-MobSF' },
      { name: 'Appium', type: 'Mobile Testing', description: 'Automation framework for mobile app testing', link: 'https://appium.io/' },
      { name: 'Charles Proxy', type: 'HTTP Proxy', description: 'HTTP proxy for mobile and web debugging', link: 'https://www.charlesproxy.com/' },
      { name: 'OWASP Mobile Top 10', type: 'Mobile Security', description: 'Top 10 mobile application security risks', link: 'https://owasp.org/www-project-mobile-top-10/' },
      
      // Cloud Security Testing
      { name: 'ScoutSuite', type: 'Cloud Security', description: 'Multi-cloud security auditing tool', command: 'scout aws', link: 'https://github.com/nccgroup/ScoutSuite' },
      { name: 'Prowler', type: 'AWS Security', description: 'AWS security best practices assessment tool', command: 'prowler', link: 'https://github.com/prowler-cloud/prowler' },
      { name: 'CloudMapper', type: 'AWS Visualization', description: 'Visualize AWS environments', link: 'https://github.com/duo-labs/cloudmapper' },
      { name: 'Pacu', type: 'AWS Exploitation', description: 'AWS exploitation framework', command: 'pacu', link: 'https://github.com/RhinoSecurityLabs/pacu' },
      
      // Container Security
      { name: 'Docker Bench', type: 'Container Security', description: 'Docker security benchmark script', command: 'docker-bench-security', link: 'https://github.com/docker/docker-bench-security' },
      { name: 'Clair', type: 'Container Scanner', description: 'Vulnerability static analysis for containers', link: 'https://github.com/quay/clair' },
      { name: 'Trivy', type: 'Container Scanner', description: 'Vulnerability scanner for containers', command: 'trivy image nginx', link: 'https://github.com/aquasecurity/trivy' },
      { name: 'Anchore', type: 'Container Analysis', description: 'Container image inspection and policy evaluation', link: 'https://anchore.com/' },
      
      // Database Security Testing
      { name: 'NoSQLMap', type: 'NoSQL Injection', description: 'Automated NoSQL database enumeration and web application exploitation tool', command: 'python nosqlmap.py', link: 'https://github.com/codingo/NoSQLMap' },
      { name: 'Mongoaudit', type: 'MongoDB Security', description: 'MongoDB security audit tool', command: 'mongoaudit', link: 'https://github.com/stampery/mongoaudit' },
      { name: 'DBShield', type: 'Database Firewall', description: 'Database firewall written in Go', link: 'https://github.com/nim4/DBShield' },
      
      // WordPress Security
      { name: 'WPSeku', type: 'WordPress Scanner', description: 'WordPress security scanner', command: 'python wpseku.py -t https://example.com', link: 'https://github.com/m4ll0k/WPSeku' },
      { name: 'CMSmap', type: 'CMS Scanner', description: 'CMS security scanner (WordPress, Joomla, Drupal)', command: 'python cmsmap.py https://example.com', link: 'https://github.com/Dionach/CMSmap' },
      { name: 'Plecost', type: 'WordPress Scanner', description: 'WordPress fingerprinting and vulnerability scanner', command: 'plecost -i 127.0.0.1', link: 'https://github.com/iniqua/plecost' },
      
      // Network Security Testing
      { name: 'Responder', type: 'Network Responder', description: 'IPv6/IPv4 LLMNR/NBT-NS/mDNS Poisoner and NTLMv1/2 Relay', command: 'python Responder.py -I eth0', link: 'https://github.com/lgandx/Responder' },
      { name: 'Ettercap', type: 'Network Sniffer', description: 'Comprehensive suite for man in the middle attacks', command: 'ettercap -G', link: 'https://www.ettercap-project.org/' },
      { name: 'Bettercap', type: 'Network Attack', description: 'Complete, modular, portable and easily extensible MITM tool', command: 'bettercap', link: 'https://www.bettercap.org/' },
      { name: 'MITMProxy', type: 'HTTP Proxy', description: 'Interactive TLS-capable intercepting HTTP proxy', command: 'mitmproxy', link: 'https://mitmproxy.org/' },
      
      // Reporting & Documentation
      { name: 'Faraday', type: 'Security Reporting', description: 'Collaborative penetration test and vulnerability management platform', link: 'https://github.com/infobyte/faraday' },
      { name: 'DefectDojo', type: 'Vulnerability Management', description: 'Application vulnerability management tool', link: 'https://github.com/DefectDojo/django-DefectDojo' },
      { name: 'Serpico', type: 'Report Generation', description: 'Penetration testing report generation and collaboration tool', link: 'https://github.com/SerpicoProject/Serpico' },
      { name: 'PlexTrac', type: 'Security Reporting', description: 'Security testing and vulnerability management platform', link: 'https://plextrac.com/' },
      
      // Automation & Orchestration
      { name: 'Metasploit', type: 'Exploitation Framework', description: 'Advanced open-source penetration testing framework', command: 'msfconsole', link: 'https://www.metasploit.com/' },
      { name: 'Cobalt Strike', type: 'C2 Framework', description: 'Commercial penetration testing tool', link: 'https://www.cobaltstrike.com/' },
      { name: 'Empire', type: 'Post-Exploitation', description: 'PowerShell and Python post-exploitation framework', link: 'https://github.com/EmpireProject/Empire' },
      { name: 'Covenant', type: 'C2 Framework', description: '.NET command and control framework', link: 'https://github.com/cobbr/Covenant' },
      
      // Online Security Testing Services
      { name: 'Pentest-Tools.com', type: 'Online Scanner', description: 'Online penetration testing tools', link: 'https://pentest-tools.com/' },
      { name: 'Hacker Target', type: 'Online Tools', description: 'Free online security tools', link: 'https://hackertarget.com/' },
      { name: 'Security Headers', type: 'Header Scanner', description: 'Scan HTTP response headers for security', link: 'https://securityheaders.com/' },
      { name: 'SSL Server Test', type: 'SSL Scanner', description: 'Free online SSL/TLS configuration checker', link: 'https://www.ssllabs.com/ssltest/' },
      { name: 'ImmuniWeb', type: 'Web Security', description: 'Free online website security test', link: 'https://www.immuniweb.com/websec/' },
      
      // Additional Penetration Testing Tools
      { name: 'Kali Linux', type: 'Security OS', description: 'Debian-based Linux distribution for penetration testing', link: 'https://www.kali.org/' },
      { name: 'Parrot Security OS', type: 'Security OS', description: 'GNU/Linux distribution for security experts and privacy-aware people', link: 'https://www.parrotsec.org/' },
      { name: 'BlackArch Linux', type: 'Security OS', description: 'Arch Linux-based penetration testing distribution', link: 'https://blackarch.org/' },
      { name: 'Pentoo', type: 'Security OS', description: 'Gentoo-based security-focused Linux distribution', link: 'https://www.pentoo.ch/' },
      { name: 'BackBox', type: 'Security OS', description: 'Ubuntu-based distribution for penetration testing and security assessment', link: 'https://www.backbox.org/' },
      { name: 'NodeZero', type: 'Automated Pentesting', description: 'Autonomous penetration testing platform', link: 'https://www.horizon3.ai/nodezero/' },
      { name: 'Core Impact', type: 'Commercial Framework', description: 'Comprehensive penetration testing framework', link: 'https://www.coresecurity.com/core-impact' },
      
      // Advanced Security Testing & Exploitation Tools
      { name: 'Nessus', type: 'Vulnerability Scanner', description: 'Comprehensive vulnerability assessment solution', link: 'https://www.tenable.com/products/nessus' },
      { name: 'OpenVAS', type: 'Vulnerability Scanner', description: 'Open-source vulnerability assessment tool', command: 'openvas-start', link: 'https://www.openvas.org/' },
      { name: 'Nexpose', type: 'Vulnerability Management', description: 'Rapid7 vulnerability management and penetration testing', link: 'https://www.rapid7.com/products/nexpose/' },
      { name: 'Qualys VMDR', type: 'Vulnerability Management', description: 'Cloud-based vulnerability management platform', link: 'https://www.qualys.com/apps/vulnerability-management/' },
      { name: 'Acunetix', type: 'Web App Scanner', description: 'Web application security scanner', link: 'https://www.acunetix.com/' },
      { name: 'NetSparker', type: 'Web App Scanner', description: 'Automated web application security scanner', link: 'https://www.netsparker.com/' },
      { name: 'AppScan', type: 'Web App Scanner', description: 'IBM application security testing platform', link: 'https://www.ibm.com/products/app-scan' },
      { name: 'Checkmarx', type: 'SAST Tool', description: 'Static application security testing platform', link: 'https://checkmarx.com/' },
      { name: 'Veracode', type: 'Application Security', description: 'Application security testing platform', link: 'https://www.veracode.com/' },
      { name: 'SonarQube', type: 'Code Quality', description: 'Continuous code quality and security analysis', command: 'sonar-scanner', link: 'https://www.sonarqube.org/' },
      { name: 'OWASP Dependency Check', type: 'Dependency Scanner', description: 'Identify project dependencies with known vulnerabilities', command: 'dependency-check --project myapp --scan .', link: 'https://owasp.org/www-project-dependency-check/' },
      { name: 'Bandit', type: 'Python Security', description: 'Security linter for Python code', command: 'bandit -r /path/to/code/', link: 'https://github.com/PyCQA/bandit' },
    ]
  },

  {
    id: 'google',
    icon: FaGoogle,
    title: 'Google Dorking & Search',
    description: 'Google search operators, dorking techniques, and specialized search engines',
    tools: [
      // Google Search Operators & Basic Techniques
      { name: 'site:', type: 'Search Operator', description: 'Search specific sites or domains', command: 'site:example.com', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'inurl:', type: 'Search Operator', description: 'Search for specific words in URLs', command: 'inurl:admin', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'intitle:', type: 'Search Operator', description: 'Search for specific words in page titles', command: 'intitle:"admin panel"', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'intext:', type: 'Search Operator', description: 'Search for specific words in page content', command: 'intext:"password"', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'filetype:', type: 'Search Operator', description: 'Search for specific file types', command: 'filetype:pdf site:example.com', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'ext:', type: 'Search Operator', description: 'Alternative for filetype search', command: 'ext:docx confidential', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'cache:', type: 'Search Operator', description: 'View Google\'s cached version of a page', command: 'cache:example.com', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'link:', type: 'Search Operator', description: 'Find pages linking to a specific URL', command: 'link:example.com', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'related:', type: 'Search Operator', description: 'Find sites related to a specific URL', command: 'related:example.com', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'info:', type: 'Search Operator', description: 'Get information about a specific URL', command: 'info:example.com', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'define:', type: 'Search Operator', description: 'Get definitions of words or phrases', command: 'define:reconnaissance', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'stocks:', type: 'Search Operator', description: 'Get stock information', command: 'stocks:AAPL', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'weather:', type: 'Search Operator', description: 'Get weather information', command: 'weather:New York', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'map:', type: 'Search Operator', description: 'Show map results', command: 'map:Silicon Valley', link: 'https://support.google.com/websearch/answer/2466433' },
      { name: 'movie:', type: 'Search Operator', description: 'Get movie information and showtimes', command: 'movie:Inception', link: 'https://support.google.com/websearch/answer/2466433' },
      
      // Advanced Google Dorking Techniques
      { name: 'Wildcard Search', type: 'Advanced Operator', description: 'Use asterisk as wildcard', command: '"admin * login"' },
      { name: 'Phrase Search', type: 'Advanced Operator', description: 'Search for exact phrases', command: '"error message"' },
      { name: 'Boolean OR', type: 'Advanced Operator', description: 'Search for either term', command: 'admin OR administrator' },
      { name: 'Boolean AND', type: 'Advanced Operator', description: 'Search for both terms', command: 'admin AND login' },
      { name: 'Exclude Terms', type: 'Advanced Operator', description: 'Exclude specific terms', command: 'admin -wordpress' },
      { name: 'Number Ranges', type: 'Advanced Operator', description: 'Search within number ranges', command: 'price $100..$500' },
      { name: 'Date Ranges', type: 'Advanced Operator', description: 'Search within date ranges', command: 'after:2020-01-01 before:2021-01-01' },
      { name: 'Location Search', type: 'Advanced Operator', description: 'Search by location', command: 'restaurant location:NYC' },
      { name: 'Around Operator', type: 'Advanced Operator', description: 'Words within proximity', command: '"John Smith" AROUND(5) "CEO"' },
      
      // Security-Focused Google Dorks
      { name: 'Admin Panels', type: 'Security Dork', description: 'Find admin login pages', command: 'intitle:"admin" inurl:login' },
      { name: 'Login Pages', type: 'Security Dork', description: 'Find various login interfaces', command: 'inurl:login.php OR inurl:admin.php' },
      { name: 'Directory Listings', type: 'Security Dork', description: 'Find exposed directory listings', command: 'intitle:"Index of /" "Parent Directory"' },
      { name: 'Config Files', type: 'Security Dork', description: 'Find configuration files', command: 'filetype:conf inurl:conf' },
      { name: 'Database Files', type: 'Security Dork', description: 'Find database backup files', command: 'filetype:sql "insert into"' },
      { name: 'Log Files', type: 'Security Dork', description: 'Find exposed log files', command: 'filetype:log "error" OR "warning"' },
      { name: 'Backup Files', type: 'Security Dork', description: 'Find backup files', command: 'filetype:bak OR filetype:backup' },
      { name: 'Error Pages', type: 'Security Dork', description: 'Find error pages with information disclosure', command: 'intext:"sql syntax near" OR intext:"syntax error"' },
      { name: 'phpMyAdmin', type: 'Security Dork', description: 'Find phpMyAdmin installations', command: 'inurl:phpmyadmin' },
      { name: 'FTP Servers', type: 'Security Dork', description: 'Find FTP login pages', command: 'intitle:"ftpd" OR "ftp login"' },
      { name: 'Webcams', type: 'Security Dork', description: 'Find unsecured webcams', command: 'inurl:"view.shtml" OR inurl:"ViewerFrame"' },
      { name: 'VPN Files', type: 'Security Dork', description: 'Find VPN configuration files', command: 'filetype:pcf "cisco" OR "GroupPwd"' },
      
      // Document & File Discovery
      { name: 'PDF Documents', type: 'Document Search', description: 'Find PDF documents', command: 'site:example.com filetype:pdf' },
      { name: 'Excel Files', type: 'Document Search', description: 'Find Excel spreadsheets', command: 'filetype:xls OR filetype:xlsx' },
      { name: 'Word Documents', type: 'Document Search', description: 'Find Word documents', command: 'filetype:doc OR filetype:docx' },
      { name: 'PowerPoint Files', type: 'Document Search', description: 'Find PowerPoint presentations', command: 'filetype:ppt OR filetype:pptx' },
      { name: 'Text Files', type: 'Document Search', description: 'Find text files', command: 'filetype:txt' },
      { name: 'CSV Files', type: 'Document Search', description: 'Find CSV data files', command: 'filetype:csv' },
      { name: 'XML Files', type: 'Document Search', description: 'Find XML files', command: 'filetype:xml' },
      { name: 'JSON Files', type: 'Document Search', description: 'Find JSON data files', command: 'filetype:json' },
      
      // Google Dorking Tools & Resources
      { name: 'Google Hacking Database', type: 'Dork Database', description: 'Exploit-DB Google Hacking Database with hundreds of search queries', link: 'https://www.exploit-db.com/google-hacking-database' },
      { name: 'DorkSearch', type: 'Dork Tool', description: 'Google dorking tool and database', link: 'https://dorksearch.com/' },
      { name: 'Google Dork Generator', type: 'Dork Tool', description: 'Automated Google dork generation', link: 'https://pentest-tools.com/information-gathering/google-hacking' },
      { name: 'SANS Google Dorking Cheat Sheet', type: 'Reference', description: 'Comprehensive Google operators reference guide', link: 'https://www.sans.org/posters/google-hacking-and-defense-cheat-sheet/' },
      
      // Specialized Search Engines
      { name: 'Shodan', type: 'IoT Search Engine', description: 'Search engine for Internet-connected devices', link: 'https://www.shodan.io/' },
      { name: 'Censys', type: 'Internet Scanner', description: 'Internet-wide scanning and certificate transparency', link: 'https://search.censys.io/' },
      { name: 'ZoomEye', type: 'Cyberspace Search', description: 'Cyberspace search engine', link: 'https://www.zoomeye.org/' },
      { name: 'Fofa', type: 'Network Search', description: 'Cyberspace assets search engine', link: 'https://fofa.so/' },
      { name: 'BinaryEdge', type: 'Internet Intelligence', description: 'Internet scanning and threat intelligence', link: 'https://www.binaryedge.io/' },
      { name: 'GreyNoise', type: 'Internet Noise', description: 'Internet background noise and scanning activity', link: 'https://www.greynoise.io/' },
      { name: 'ONYPHE', type: 'Cyber Defense Search', description: 'Cyber defense search engine', link: 'https://www.onyphe.io/' },
      { name: 'Netlas', type: 'Internet Scanner', description: 'Internet intelligence platform', link: 'https://app.netlas.io/' },
      { name: 'LeakIX', type: 'Leak Search Engine', description: 'Search engine for exposed data and services', link: 'https://leakix.net/' },
      
      // Alternative Search Engines
      { name: 'Bing', type: 'Search Engine', description: 'Microsoft search engine with unique indexing', link: 'https://www.bing.com/' },
      { name: 'DuckDuckGo', type: 'Privacy Search', description: 'Privacy-focused search engine', link: 'https://duckduckgo.com/' },
      { name: 'Startpage', type: 'Privacy Search', description: 'Private search using Google results', link: 'https://www.startpage.com/' },
      { name: 'Yandex', type: 'Russian Search', description: 'Russian search engine with unique features', link: 'https://yandex.com/' },
      { name: 'Baidu', type: 'Chinese Search', description: 'Chinese search engine', link: 'https://www.baidu.com/' },
      
      // Image & Visual Search
      { name: 'Google Images', type: 'Image Search', description: 'Google reverse image search', link: 'https://images.google.com/' },
      { name: 'TinEye', type: 'Reverse Image Search', description: 'Reverse image search engine', link: 'https://tineye.com/' },
      { name: 'Yandex Images', type: 'Image Search', description: 'Yandex reverse image search', link: 'https://yandex.com/images/' },
      
      // Academic & Research Search Engines
      { name: 'Google Scholar', type: 'Academic Search', description: 'Academic papers and citations', link: 'https://scholar.google.com/' },
      { name: 'Microsoft Academic', type: 'Academic Search', description: 'Academic search and analytics', link: 'https://academic.microsoft.com/' },
      { name: 'Semantic Scholar', type: 'Academic Search', description: 'AI-powered academic search', link: 'https://www.semanticscholar.org/' },
      { name: 'CORE', type: 'Academic Search', description: 'Open access research papers', link: 'https://core.ac.uk/' },
      { name: 'arXiv', type: 'Preprint Search', description: 'Preprint repository for academic papers', link: 'https://arxiv.org/' },
      
      // Code & Development Search Engines
      { name: 'GitHub Search', type: 'Code Search', description: 'Search GitHub repositories and code', link: 'https://github.com/search' },
      { name: 'GitLab Search', type: 'Code Search', description: 'Search GitLab repositories', link: 'https://gitlab.com/search' },
      { name: 'SearchCode', type: 'Code Search', description: 'Search across multiple code repositories', link: 'https://searchcode.com/' },
      { name: 'Sourcegraph', type: 'Code Search', description: 'Universal code search and intelligence', link: 'https://sourcegraph.com/' },
      
      // Business & Financial Search
      { name: 'SEC EDGAR', type: 'Financial Search', description: 'Search SEC filings and documents', link: 'https://www.sec.gov/edgar/search/' },
      { name: 'Crunchbase', type: 'Business Search', description: 'Search company information and funding data', link: 'https://www.crunchbase.com/' },
      { name: 'OpenCorporates', type: 'Corporate Search', description: 'Search global company database', link: 'https://opencorporates.com/' },
      
      // Advanced Google Search Tools
      { name: 'Advanced Search Interface', type: 'Google Tool', description: 'Google advanced search form with filters and operators', link: 'https://www.google.com/advanced_search' },
      { name: 'Google Alerts', type: 'Monitoring Tool', description: 'Email alerts for new search results matching your queries', link: 'https://www.google.com/alerts' },
      { name: 'Google Trends', type: 'Google Tool', description: 'Search trend analysis and data', link: 'https://trends.google.com/' },
      { name: 'Google Dataset Search', type: 'Google Tool', description: 'Search for publicly available datasets', link: 'https://datasetsearch.research.google.com/' },
      { name: 'Google Patents', type: 'Google Tool', description: 'Search patents and patent applications', link: 'https://patents.google.com/' },
      { name: 'Google Books', type: 'Google Tool', description: 'Search books and publications', link: 'https://books.google.com/' },
      
      // API and Programmatic Search
      { name: 'Google Custom Search API', type: 'API', description: 'Programmatic access to Google search', link: 'https://developers.google.com/custom-search/v1/introduction' },
      { name: 'Bing Search API', type: 'API', description: 'Microsoft Bing search API', link: 'https://azure.microsoft.com/en-us/services/cognitive-services/bing-web-search-api/' },
      { name: 'DuckDuckGo Instant Answer API', type: 'API', description: 'DuckDuckGo search API', link: 'https://duckduckgo.com/api' },
      { name: 'Shodan API', type: 'API', description: 'Programmatic access to Shodan search', link: 'https://developer.shodan.io/' },
      { name: 'Censys API', type: 'API', description: 'Programmatic access to Censys data', link: 'https://censys.io/api' }
    ]
  },
]

// Subdomain wordlists for verification
export const subdomainWordlists = [
  'www', 'mail', 'ftp', 'localhost', 'webmail', 'smtp', 'pop', 'ns1', 'webdisk', 'ns2',
  'cpanel', 'whm', 'autodiscover', 'autoconfig', 'autoconfig2', 'm', 'imap', 'test', 'ns',
  'blog', 'pop3', 'dev', 'www2', 'admin', 'forum', 'news', 'vpn', 'ns3', 'mail2',
  'new', 'mysql', 'old', 'www1', 'email', 'img', 'www3', 'help', 'shop', 'mail1',
  'secure', 'support', 'web', 'static', 'i', 'survey', 'api', 'beta', 'mobile', 'apps',
  'server', 'cdn', 'media', 'demo', 'staging', 'portal', 'docs', 'downloads', 'files',
  'assets', 'images', 'videos', 'data', 'backup', 'archive', 'store', 'app', 'forum',
]; 