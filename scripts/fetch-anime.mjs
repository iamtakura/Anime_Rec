import fs from 'fs';
import path from 'path';

const genresConfig = [
  {
    id: "action",
    label: "Action",
    emoji: "💥",
    tagline: "High-octane thrills, amazing animation, and fast-paced storytelling.",
    color: { primary: "#FF4500", secondary: "#1A0A00", accent: "#FF7A00", text: "#FFE8D6" },
    titles: [
      "Cyberpunk Edgerunners", "One Punch Man", "Chainsaw Man", "Mob Psycho 100", 
      "Vivy Fluorite Eye's Song", "Lycoris Recoil", "Hell's Paradise", "Akudama Drive", 
      "Solo Leveling", "Deca-Dence", "Fullmetal Alchemist Brotherhood", "Attack on Titan", 
      "Demon Slayer", "Jujutsu Kaisen", "Hunter x Hunter", "My Hero Academia", 
      "Assassination Classroom", "Dr. Stone", "Gurren Lagann", "Soul Eater"
    ]
  },
  {
    id: "romance",
    label: "Romance",
    emoji: "💖",
    tagline: "Sweet, funny, and emotional stories about love and connection.",
    color: { primary: "#FF6B9D", secondary: "#1A0010", accent: "#FFB3CC", text: "#FFE8F0" },
    titles: [
      "Horimiya", "My Dress-Up Darling", "Wotakoi", "Tomo-chan Is a Girl", 
      "A Sign of Affection", "Tsuki ga Kirei", "Recovery of an MMO Junkie", "The Dangers in My Heart", 
      "Shikimori's Not Just a Cutie", "Nagatoro", "Toradora", "Your Lie in April", 
      "Fruits Basket", "Rascal Does Not Dream of Bunny Girl Senpai", "Anohana", "Plastic Memories", 
      "Given", "Clannad", "Kimi ni Todoke", "Ao Haru Ride"
    ]
  },
  {
    id: "isekai",
    label: "Isekai",
    emoji: "🚪",
    tagline: "Transported to another world — fantasy, magic, and RPG mechanics await.",
    color: { primary: "#7B2FBE", secondary: "#0D0015", accent: "#C77DFF", text: "#EDE0FF" },
    titles: [
      "No Game No Life", "KonoSuba", "The Devil is a Part-Timer", "Grimgar of Fantasy and Ash", 
      "My Next Life as a Villainess", "Campfire Cooking in Another World", "Saga of Tanya the Evil", 
      "Uncle from Another World", "Cautious Hero", "Drifters", "Re Zero", 
      "That Time I Got Reincarnated as a Slime", "Overlord", "Mushoku Tensei", "Sword Art Online", 
      "The Rising of the Shield Hero", "Ascendance of a Bookworm", "Log Horizon", "Bofuri", 
      "Tsukimichi Moonlit Fantasy"
    ]
  },
  {
    id: "psychological",
    label: "Psychological",
    emoji: "🧠",
    tagline: "Mind-bending mysteries, dark twists, and deep human nature.",
    color: { primary: "#00B4D8", secondary: "#000A0F", accent: "#90E0EF", text: "#CAF0F8" },
    titles: [
      "Death Parade", "Erased", "The Promised Neverland", "Odd Taxi", "Terror in Resonance", 
      "Puella Magi Madoka Magica", "ID Invaded", "Tomodachi Game", "Kakegurui", 
      "Classroom of the Elite", "Death Note", "Steins Gate", "Monster", "Psycho-Pass", 
      "Parasyte the Maxim", "Code Geass", "Future Diary", "Neon Genesis Evangelion", 
      "Welcome to the NHK", "Kaiji Ultimate Survivor"
    ]
  },
  {
    id: "comedy",
    label: "Comedy",
    emoji: "😂",
    tagline: "Pure laughs, absurd situations, and unforgettable character dynamics.",
    color: { primary: "#F4A100", secondary: "#130D00", accent: "#FFD166", text: "#FFF8E7" },
    titles: [
      "Kaguya-sama Love is War", "Grand Blue Dreaming", "Asobi Asobase", "Hinamatsuri", 
      "Bocchi the Rock", "Mashle Magic and Muscles", "Daily Lives of High School Boys", 
      "Haven't You Heard I'm Sakamoto", "Sleepy Princess in the Demon Castle", "The Disastrous Life of Saiki K", 
      "Nichijou", "Spy x Family", "Gintama", "Monthly Girls Nozaki-kun", "Gabriel DropOut", 
      "Osomatsu-san", "Pop Team Epic", "Aho-Girl", "Wagnaria", "D-Frag"
    ]
  },
  {
    id: "slice-of-life",
    label: "Slice of Life",
    emoji: "☕",
    tagline: "Relaxing, slow-paced stories about everyday life, hobbies, and growth.",
    color: { primary: "#52B788", secondary: "#021A0D", accent: "#95D5B2", text: "#D8F3DC" },
    titles: [
      "Laid-Back Camp", "Barakamon", "A Place Further Than the Universe", "Violet Evergarden", 
      "Flying Witch", "Sweetness and Lightning", "Tanaka-kun is Always Listless", "Usagi Drop", 
      "Non Non Biyori", "My Roommate is a Cat", "K-On", "March Comes in Like a Lion", 
      "Natsume's Book of Friends", "Hyouka", "Shirobako", "Miss Kobayashi's Dragon Maid", 
      "Silver Spoon", "Aria the Animation", "Hanasaku Iroha", "Girls Last Tour"
    ]
  },
  {
    id: "horror",
    label: "Horror",
    emoji: "💀",
    tagline: "Chilling mysteries, psychological terror, and supernatural frights.",
    color: { primary: "#FF3333", secondary: "#1A0505", accent: "#FF8080", text: "#FFE5E5" },
    titles: [
      "Another", "Shiki", "Higurashi When They Cry", "Tokyo Ghoul", "Mieruko-chan", 
      "Ghost Hunt", "Junji Ito Collection", "Hell Girl", "Mononoke", "School-Live", 
      "Deadman Wonderland", "Devilman Crybaby", "Yamishibai Japanese Ghost Stories", "Angels of Death", 
      "Hellsing Ultimate", "Blood Plus", "Housing Complex C", "Boogiepop Phantom", 
      "Corpse Party Tortured Souls", "Dark Gathering"
    ]
  },
  {
    id: "sports",
    label: "Sports",
    emoji: "🏆",
    tagline: "High-stakes drama, intense rivalry, and the drive to win.",
    color: { primary: "#FF9F1C", secondary: "#0A1118", accent: "#FFB75E", text: "#FFF3E0" },
    titles: [
      "Haikyuu", "Kuroko's Basketball", "Slam Dunk", "Yuri on Ice", "Blue Lock", 
      "Ping Pong the Animation", "Run with the Wind", "Chihayafuru", "Hajime no Ippo", 
      "Free", "Yowamushi Pedal", "Ace of Diamond", "Eyeshield 21", "SK8 the Infinity", 
      "Megalo Box", "Ao Ashi", "Baby Steps", "Bamboo Blade", "Tsurune", "Major"
    ]
  },
  {
    id: "fantasy",
    label: "Fantasy",
    emoji: "🐉",
    tagline: "Ancient magic, legendary beasts, and epic world-spanning adventures.",
    color: { primary: "#00E5FF", secondary: "#07161C", accent: "#80F3FF", text: "#E0FCFF" },
    titles: [
      "Frieren Beyond Journey's End", "Made in Abyss", "The Ancient Magus Bride", "Yona of the Dawn", 
      "Mushishi", "Moribito Guardian of the Spirit", "Ranking of Kings", "To Your Eternity", 
      "Goblin Slayer", "DanMachi", "Somali and the Forest Spirit", "Wandering Witch the Journey of Elaina", 
      "Land of the Lustrous", "Dorohedoro", "Fate Zero", "Spice and Wolf", 
      "The Twelve Kingdoms", "Berserk 1997", "Claymore", "Katanagatari"
    ]
  }
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function fetchWithRetry(url, retries = 5, backoff = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.status === 429) {
        console.warn(`Rate limited (429). Retrying in ${backoff}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2;
        continue;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.warn(`Fetch error: ${error.message}. Retrying in ${backoff}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      backoff *= 2;
    }
  }
}

async function fetchAllAnime() {
  const resultGenres = [];
  let totalFetched = 0;
  const grandTotal = genresConfig.reduce((sum, g) => sum + g.titles.length, 0);

  for (const genre of genresConfig) {
    const animeList = [];
    console.log(`\nStarting fetch for genre: ${genre.label}`);

    for (const title of genre.titles) {
      totalFetched++;
      console.log(`Fetching (${totalFetched}/${grandTotal}): ${title}...`);

      const query = encodeURIComponent(title);
      const url = `https://api.jikan.moe/v4/anime?q=${query}&limit=1`;
      
      let animeData = null;
      try {
        const response = await fetchWithRetry(url);
        if (response.data && response.data.length > 0) {
          const raw = response.data[0];
          animeData = {
            id: slugify(raw.title_english || raw.title || title),
            title: raw.title_english || raw.title || title,
            year: raw.aired?.prop?.from?.year || raw.year || new Date().getFullYear(),
            episodes: raw.episodes || 12,
            studio: raw.studios?.[0]?.name || "Unknown",
            rating: raw.score || 7.5,
            image: raw.images?.jpg?.large_image_url || "",
            description: raw.synopsis || "No description available.",
            mal_id: raw.mal_id
          };
        }
      } catch (error) {
        console.error(`Error fetching "${title}":`, error.message);
      }

      if (!animeData) {
        console.warn(`Warning: Falling back to default data for "${title}"`);
        animeData = {
          id: slugify(title),
          title: title,
          year: new Date().getFullYear(),
          episodes: 12,
          studio: "Unknown",
          rating: 7.5,
          image: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg", // default Frieren large image URL
          description: "No description available.",
          mal_id: 0
        };
      }

      animeList.push(animeData);

      // 400ms delay to respect rate limit (3 requests per second)
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    resultGenres.push({
      id: genre.id,
      label: genre.label,
      emoji: genre.emoji,
      tagline: genre.tagline,
      color: genre.color,
      anime: animeList
    });
  }

  const outputFilePath = path.join(process.cwd(), 'src/data/anime-data.json');
  
  // Create src/data directory if it doesn't exist
  const dirPath = path.dirname(outputFilePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, JSON.stringify({ genres: resultGenres }, null, 2));
  console.log(`\nSuccessfully wrote ${grandTotal} anime entries to ${outputFilePath}`);
}

fetchAllAnime().catch(err => {
  console.error("Fatal error during fetching:", err);
  process.exit(1);
});
