import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BunnyImage, BunnyCardImage } from "@/components/ui/bunny-image";
import { Play, Star, Clock, TrendingUp, Film } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

// Import movie posters
import supermanPoster from "@/assets/posters/superman-2025.jpg";
import missionImpossiblePoster from "@/assets/posters/mission-impossible-2025.jpg";
import fantasticFourPoster from "@/assets/posters/fantastic-four-2025.jpg";
import avatarPoster from "@/assets/posters/avatar-2025.jpg";
import captainAmericaPoster from "@/assets/posters/captain-america-2025.jpg";
import thunderboltsPoster from "@/assets/posters/thunderbolts-2025.jpg";
import wickedPoster from "@/assets/posters/wicked-2025.jpg";
import httydPoster from "@/assets/posters/httyd-2025.jpg";
import batmanPoster from "@/assets/posters/batman-2025.jpg";
import jurassicPoster from "@/assets/posters/jurassic-2025.jpg";
import minecraftPoster from "@/assets/posters/minecraft-2025.jpg";
import shrekPoster from "@/assets/posters/shrek-2025.jpg";

// Import series posters
import lastOfUsS2Poster from "@/assets/posters/last-of-us-s2.jpg";
import strangerThingsS5Poster from "@/assets/posters/stranger-things-s5.jpg";
import theBearS4Poster from "@/assets/posters/the-bear-s4.jpg";
import wednesdayS2Poster from "@/assets/posters/wednesday-s2.jpg";
import severanceS2Poster from "@/assets/posters/severance-s2.jpg";
import houseDragonS3Poster from "@/assets/posters/house-dragon-s3.jpg";
import whiteLotusS3Poster from "@/assets/posters/white-lotus-s3.jpg";
import onlyMurdersS5Poster from "@/assets/posters/only-murders-s5.jpg";
import theBoysS5Poster from "@/assets/posters/the-boys-s5.jpg";
import yellowstonePoster from "@/assets/posters/yellowstone.jpg";
import squidGameS3Poster from "@/assets/posters/squid-game-s3.jpg";
import penguinPoster from "@/assets/posters/penguin.jpg";

// Import sports images
import nhlHockey from "@/assets/sports/nhl-hockey.jpg";
import cflFootball from "@/assets/sports/cfl-football.jpg";
import nbaBasketball from "@/assets/sports/nba-basketball.jpg";
import mlsSoccer from "@/assets/sports/mls-soccer.jpg";
import curling from "@/assets/sports/curling.jpg";
import rogersCupTennis from "@/assets/sports/rogers-cup-tennis.jpg";
import eliteFootball from "@/assets/sports/elite-football.jpg";

// Import channel logos
import tsnLogo from "@/assets/channels/tsn-logo.png";
import sportsnetLogo from "@/assets/channels/sportsnet-logo.png";
import rdsLogo from "@/assets/channels/rds-logo.png";
import hollywoodLogo from "@/assets/channels/hollywood-logo.png";
import superchannelLogo from "@/assets/channels/superchannel-logo.png";
import starzLogo from "@/assets/channels/starz-logo.png";
import superecranLogo from "@/assets/channels/superecran-logo.png";
import hboCanadaLogo from "@/assets/channels/hbo-canada-logo.png";
import cinepopLogo from "@/assets/channels/cinepop-logo.png";
import bbcEarthLogo from "@/assets/channels/bbc-earth-logo.png";
import craveLogo from "@/assets/channels/crave-logo.png";
import amcLogo from "@/assets/channels/amc-logo.png";
import tv5Logo from "@/assets/channels/tv5-logo.png";
import iciLogo from "@/assets/channels/ici-logo.png";
import noovoLogo from "@/assets/channels/noovo-logo.png";
import teleQuebecLogo from "@/assets/channels/tele-quebec-logo.png";
import cbcLogo from "@/assets/channels/cbc-logo.png";
import globalLogo from "@/assets/channels/global-logo.png";
import citytvLogo from "@/assets/channels/citytv-logo.png";
import netflixLogo from "@/assets/channels/netflix-logo.png";
import huluLogo from "@/assets/channels/hulu-logo.png";
const ContentShowcase = () => {
  const movies = [{
    title: "Superman",
    genre: "Action Superhero",
    rating: 9.2,
    year: "2025",
    duration: "2h 30m",
    image: supermanPoster,
    isNew: true,
    rank: 1,
    reel: "DC Universe Begins"
  }, {
    title: "Mission: Impossible - The Final Reckoning",
    genre: "Action Thriller",
    rating: 8.9,
    year: "2025",
    duration: "2h 43m",
    image: missionImpossiblePoster,
    isNew: true,
    rank: 2,
    reel: "Epic Conclusion"
  }, {
    title: "The Fantastic Four: First Steps",
    genre: "Superhero Adventure",
    rating: 8.7,
    year: "2025",
    duration: "2h 15m",
    image: fantasticFourPoster,
    isNew: true,
    rank: 3,
    reel: "Marvel's First Family"
  }, {
    title: "Avatar: Fire and Ash",
    genre: "Sci-Fi Adventure",
    rating: 9.0,
    year: "2025",
    duration: "3h 10m",
    image: avatarPoster,
    isNew: true,
    rank: 4,
    reel: "Pandora Returns"
  }, {
    title: "Captain America: Brave New World",
    genre: "Action Superhero",
    rating: 8.5,
    year: "2025",
    duration: "2h 08m",
    image: captainAmericaPoster,
    isNew: true,
    rank: 5,
    reel: "New Shield Bearer"
  }, {
    title: "Thunderbolts",
    genre: "Action Superhero",
    rating: 8.4,
    year: "2025",
    duration: "2h 12m",
    image: thunderboltsPoster,
    isNew: true,
    rank: 6,
    reel: "Marvel's Antiheroes"
  }, {
    title: "Wicked: Part Two",
    genre: "Musical Fantasy",
    rating: 8.8,
    year: "2025",
    duration: "2h 40m",
    image: wickedPoster,
    isNew: true,
    rank: 7,
    reel: "Oz Conclusion"
  }, {
    title: "How to Train Your Dragon",
    genre: "Fantasy Adventure",
    rating: 8.6,
    year: "2025",
    duration: "2h 05m",
    image: httydPoster,
    isNew: true,
    rank: 8,
    reel: "Live-Action Epic"
  }, {
    title: "Snow White",
    genre: "Fantasy Musical",
    rating: 8.2,
    year: "2025",
    duration: "1h 58m",
    image: "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?w=400&h=600&fit=crop",
    isNew: true,
    rank: 9,
    reel: "Disney Reimagined"
  }, {
    title: "The Accountant 2",
    genre: "Action Thriller",
    rating: 8.3,
    year: "2025",
    duration: "2h 10m",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    isNew: true,
    rank: 10,
    reel: "Numbers & Action"
  }, {
    title: "Jurassic World: Rebirth",
    genre: "Action Adventure",
    rating: 8.1,
    year: "2025",
    duration: "2h 25m",
    image: jurassicPoster,
    isNew: true,
    rank: 11,
    reel: "Dinosaurs Return"
  }, {
    title: "The Batman Part II",
    genre: "Crime Thriller",
    rating: 9.1,
    year: "2025",
    duration: "2h 55m",
    image: batmanPoster,
    isNew: true,
    rank: 12,
    reel: "Dark Knight Continues"
  }];
  const series = [{
    title: "The Last of Us: Season 2",
    genre: "Post-Apocalyptic Drama",
    rating: 9.5,
    season: "Season 2",
    episodes: "10 Episodes",
    image: lastOfUsS2Poster,
    isNew: true,
    rank: 1,
    reel: "HBO Epic"
  }, {
    title: "Stranger Things: Season 5",
    genre: "Sci-Fi Horror",
    rating: 9.3,
    season: "Season 5 - Final",
    episodes: "8 Episodes",
    image: strangerThingsS5Poster,
    isNew: true,
    rank: 2,
    reel: "Netflix Original"
  }, {
    title: "The Bear: Season 4",
    genre: "Comedy Drama",
    rating: 9.2,
    season: "Season 4",
    episodes: "10 Episodes",
    image: theBearS4Poster,
    isNew: true,
    rank: 3,
    reel: "Culinary Excellence"
  }, {
    title: "Wednesday: Season 2",
    genre: "Dark Comedy",
    rating: 8.9,
    season: "Season 2",
    episodes: "8 Episodes",
    image: wednesdayS2Poster,
    isNew: true,
    rank: 4,
    reel: "Addams Family"
  }, {
    title: "Severance: Season 2",
    genre: "Sci-Fi Thriller",
    rating: 9.4,
    season: "Season 2",
    episodes: "10 Episodes",
    image: severanceS2Poster,
    isNew: true,
    rank: 5,
    reel: "Apple TV+ Hit"
  }, {
    title: "House of the Dragon: Season 3",
    genre: "Fantasy Drama",
    rating: 9.1,
    season: "Season 3",
    episodes: "10 Episodes",
    image: houseDragonS3Poster,
    isNew: true,
    rank: 6,
    reel: "Targaryen Saga"
  }, {
    title: "The White Lotus: Season 3",
    genre: "Dark Comedy",
    rating: 8.8,
    season: "Season 3",
    episodes: "6 Episodes",
    image: whiteLotusS3Poster,
    isNew: true,
    rank: 7,
    reel: "HBO Prestige"
  }, {
    title: "Only Murders in the Building: Season 5",
    genre: "Mystery Comedy",
    rating: 8.7,
    season: "Season 5",
    episodes: "10 Episodes",
    image: onlyMurdersS5Poster,
    isNew: true,
    rank: 8,
    reel: "Hulu Original"
  }, {
    title: "The Boys: Season 5",
    genre: "Superhero Satire",
    rating: 9.0,
    season: "Season 5 - Final",
    episodes: "8 Episodes",
    image: theBoysS5Poster,
    isNew: true,
    rank: 9,
    reel: "Prime Video"
  }, {
    title: "Yellowstone: The Madison",
    genre: "Western Drama",
    rating: 8.6,
    season: "New Series",
    episodes: "10 Episodes",
    image: yellowstonePoster,
    isNew: true,
    rank: 10,
    reel: "Dutton Legacy"
  }, {
    title: "Squid Game: Season 3",
    genre: "Survival Thriller",
    rating: 9.2,
    season: "Season 3 - Final",
    episodes: "7 Episodes",
    image: squidGameS3Poster,
    isNew: true,
    rank: 11,
    reel: "Korean Thriller"
  }, {
    title: "The Penguin",
    genre: "Crime Drama",
    rating: 8.9,
    season: "Limited Series",
    episodes: "8 Episodes",
    image: penguinPoster,
    isNew: true,
    rank: 12,
    reel: "Batman Universe"
  }];
  const sports = [{
    title: "World's Premier Hockey Championships",
    type: "NHL, International Tournaments & Olympic Games",
    date: "Live Now",
    venue: "Scotiabank Arena, Toronto",
    image: nhlHockey,
    isLive: false,
    rank: 1,
    rating: 9.8,
    leagues: ["NHL", "KHL", "SHL"],
    description: "Watch every NHL game live featuring all 7 Canadian teams."
  }, {
    title: "Premier Canadian Football Championships",
    type: "CFL, Grey Cup, International Football & College",
    date: "Sunday 6:00 PM EST",
    venue: "Tim Hortons Field, Hamilton",
    image: cflFootball,
    isLive: false,
    rank: 2,
    rating: 9.5,
    leagues: ["CFL", "NFL", "NCAA"],
    description: "Watch all the excitement of Canadian football."
  }, {
    title: "Global Basketball Championships & Leagues",
    type: "NBA, EuroLeague, FIBA, Olympics & NCAA",
    date: "Tonight 8:00 PM EST",
    venue: "Scotiabank Arena, Toronto",
    image: nbaBasketball,
    isLive: false,
    rank: 3,
    rating: 9.3,
    leagues: ["NBA", "WNBA", "FIBA"],
    description: "Stream all major basketball events from around the globe."
  }, {
    title: "Elite Football Leagues",
    type: "EPL, La Liga, Serie A, Bundesliga, Champions League & World Cup",
    date: "Live Daily - All Major Leagues",
    venue: "Watch Messi, Ronaldo, Mbappé, Haaland & Top Stars",
    image: eliteFootball,
    isLive: false,
    rank: 4,
    rating: 9.7,
    leagues: ["EPL", "UEFA", "FIFA"],
    description: "Stream live football from the world's top leagues."
  }, {
    title: "World's Premier Curling Championships",
    type: "Brier, Scotties, World Championships & Olympics",
    date: "Friday 2:00 PM EST",
    venue: "Canadian Tire Centre, Ottawa",
    image: curling,
    isLive: false,
    rank: 5,
    rating: 8.8,
    leagues: ["WCF", "Brier"],
    description: "Experience the excitement of elite curling."
  }, {
    title: "World's Premier Tennis Tournaments",
    type: "Grand Slams, ATP/WTA Masters & Olympics",
    date: "August - Toronto/Montreal",
    venue: "National Bank Stadium",
    image: rogersCupTennis,
    isLive: false,
    rank: 6,
    rating: 9.2,
    leagues: ["ATP", "WTA", "ITF"],
    description: "Experience the world's greatest tennis action."
  }];
  const premiumChannels = [{
    name: "TSN",
    category: "Sports",
    logo: tsnLogo
  }, {
    name: "Sportsnet",
    category: "Sports",
    logo: sportsnetLogo
  }, {
    name: "RDS",
    category: "Sports",
    logo: rdsLogo
  }, {
    name: "Hollywood Suite",
    category: "Movies",
    logo: hollywoodLogo
  }, {
    name: "Super Channel",
    category: "Movies",
    logo: superchannelLogo
  }, {
    name: "Starz",
    category: "Movies",
    logo: starzLogo
  }, {
    name: "Super Écran",
    category: "Movies",
    logo: superecranLogo
  }, {
    name: "HBO Canada",
    category: "Movies",
    logo: hboCanadaLogo
  }, {
    name: "Ciné Pop",
    category: "Movies",
    logo: cinepopLogo
  }, {
    name: "BBC Earth",
    category: "Documentary",
    logo: bbcEarthLogo
  }, {
    name: "Crave",
    category: "Movies",
    logo: craveLogo
  }, {
    name: "AMC",
    category: "Entertainment",
    logo: amcLogo
  }, {
    name: "TV5",
    category: "French",
    logo: tv5Logo
  }, {
    name: "ICI Radio-Canada",
    category: "French",
    logo: iciLogo
  }, {
    name: "Noovo",
    category: "French",
    logo: noovoLogo
  }, {
    name: "Télé-Québec",
    category: "French",
    logo: teleQuebecLogo
  }, {
    name: "CBC",
    category: "News",
    logo: cbcLogo
  }, {
    name: "Global",
    category: "Entertainment",
    logo: globalLogo
  }, {
    name: "Citytv",
    category: "Entertainment",
    logo: citytvLogo
  }, {
    name: "Netflix",
    category: "Streaming",
    logo: netflixLogo
  }, {
    name: "Hulu",
    category: "Streaming",
    logo: huluLogo
  }];
  // Modern Channel Card with glassmorphism
  const ChannelCard = ({
    channel,
    index
  }: {
    channel: any;
    index: number;
  }) => {
    const categoryColors: Record<string, string> = {
      'Sports': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      'Movies': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
      'News': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      'Entertainment': 'from-orange-500/20 to-yellow-500/20 border-orange-500/30',
      'Streaming': 'from-red-500/20 to-rose-500/20 border-red-500/30',
      'Francophone': 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30'
    };
    const bgClass = categoryColors[channel.category] || 'from-primary/20 to-primary/10 border-primary/30';
    return <div className="group relative flex flex-col items-center gap-3 p-4 cursor-pointer" style={{
      animationDelay: `${index * 0.05}s`
    }}>
        {/* Logo Container with glow effect */}
        <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${bgClass} backdrop-blur-sm border transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg overflow-hidden`}>
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          {/* Logo */}
          <div className="absolute inset-2 bg-background/80 rounded-xl flex items-center justify-center overflow-hidden">
            <img src={channel.logo} alt={`Logo de la chaîne ${channel.name} - diffusion en direct disponible`} width={64} height={64} loading="lazy" decoding="async" className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-110" />
          </div>
          
          {/* Glow ring on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
          boxShadow: 'inset 0 0 20px hsl(var(--primary)/0.3)'
        }} />
        </div>
        
        {/* Channel Name */}
        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center line-clamp-1 max-w-[80px]">
          {channel.name}
        </span>
      </div>;
  };
  // Netflix-style Movie Card
  const MovieCard = ({
    item,
    index
  }: {
    item: any;
    index: number;
  }) => {
    return <div className="group relative cursor-pointer">
        {/* Large Rank Number */}
        <div className="absolute -left-2 bottom-0 z-10 text-[120px] md:text-[160px] font-black text-transparent leading-none pointer-events-none select-none" style={{
        WebkitTextStroke: '2px hsl(var(--primary)/0.5)'
      }}>
          {item.rank}
        </div>
        
        {/* Poster Card */}
        <div className="relative ml-8 md:ml-12 overflow-hidden rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:z-20 group-hover:shadow-2xl">
          <div className="aspect-[2/3] w-full">
            <BunnyImage src={item.image} alt={`Affiche du film ${item.title} - disponible en streaming 4K`} width={200} height={300} responsiveWidths={[200, 300, 400]} className="w-full h-full object-cover" />
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-foreground text-sm md:text-base mb-1 line-clamp-2">{item.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-semibold text-foreground">{item.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.year}</span>
              </div>
              <p className="text-xs text-primary font-medium">{item.genre}</p>
              <div className="flex items-center gap-2 mt-3">
                
                <span className="text-xs text-muted-foreground">{item.duration}</span>
              </div>
            </div>
          </div>

          {/* NEW Badge */}
          {item.isNew && <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-orange text-primary-foreground text-[10px] font-bold px-2 py-0.5">
                NEW
              </Badge>
            </div>}
        </div>
      </div>;
  };

  // Sports Card - Broadcast TV Style Design
  const SportsCard = ({
    item,
    index
  }: {
    item: any;
    index: number;
  }) => {
    // Sport-specific accent colors
    const sportColors: Record<number, {
      accent: string;
      gradient: string;
    }> = {
      1: {
        accent: 'from-blue-600 to-blue-800',
        gradient: 'via-blue-600/20'
      },
      // Hockey
      2: {
        accent: 'from-green-600 to-green-800',
        gradient: 'via-green-600/20'
      },
      // Football
      3: {
        accent: 'from-orange-500 to-red-600',
        gradient: 'via-orange-500/20'
      },
      // Basketball
      4: {
        accent: 'from-emerald-500 to-teal-600',
        gradient: 'via-emerald-500/20'
      },
      // Soccer
      5: {
        accent: 'from-cyan-500 to-blue-600',
        gradient: 'via-cyan-500/20'
      },
      // Curling
      6: {
        accent: 'from-lime-500 to-green-600',
        gradient: 'via-lime-500/20'
      } // Tennis
    };
    const colors = sportColors[item.rank] || {
      accent: 'from-primary to-primary/80',
      gradient: 'via-primary/20'
    };
    return <div className="group relative overflow-hidden rounded-xl cursor-pointer bg-card border border-border/50 hover:border-primary/50 transition-all duration-500">
        {/* Top Ticker Bar */}
        <div className={`relative h-10 bg-gradient-to-r ${colors.accent} flex items-center justify-between px-4 overflow-hidden`}>
          {/* Animated ticker background */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-shimmer" />
          
          <div className="flex items-center gap-2 z-10">
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
              <span className="text-xs font-black text-white">#{item.rank}</span>
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-wider truncate">
              {item.type.split(',')[0]}
            </span>
          </div>
          
          {item.isLive ? <div className="flex items-center gap-1.5 bg-red-500 px-2 py-0.5 rounded z-10">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-white uppercase">Live</span>
            </div> : <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded z-10">
              <Clock className="w-3 h-3 text-white" />
              <span className="text-[10px] font-medium text-white">{item.date}</span>
            </div>}
        </div>
        
        {/* Main Image Area */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <BunnyCardImage src={item.image} alt={`${item.title} - match en direct disponible sur IPTV Quebec`} width={640} height={360} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-background ${colors.gradient} to-transparent opacity-90`} />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
          
          {/* League Badges - Top Left with staggered animation */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            {item.leagues?.map((league: string, i: number) => <div key={i} className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-black text-white uppercase tracking-wider border border-white/20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{
            transitionDelay: `${i * 100}ms`
          }}>
                {league}
              </div>)}
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-bold text-white">{item.rating}</span>
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            
          </div>
          
          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1 flex items-center gap-1.5">
              <Film className="w-3 h-3" />
              {item.venue}
            </p>
          </div>
        </div>
        
        {/* Bottom Stats Bar */}
        
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
        boxShadow: 'inset 0 0 30px hsl(var(--primary)/0.1)'
      }} />
      </div>;
  };
  const ContentCard = ({
    item,
    type,
    index
  }: {
    item: any;
    type: 'movie' | 'series';
    index: number;
  }) => {
    return <Card className="group relative overflow-hidden bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer hover:scale-105 min-w-[280px]">
        <div className="relative overflow-hidden aspect-[3/4]">
          <BunnyImage src={item.image} alt={`Affiche ${type === 'movie' ? 'du film' : 'de la série'} ${item.title} - streaming HD disponible`} width={280} height={373} responsiveWidths={[280, 400, 560]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Reel Name */}
          {item.reel && <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-xs font-medium text-primary">🎬 {item.reel}</span>
            </div>}

          {/* Ranking Badge */}
          {item.rank && <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
              <TrendingUp className="w-3 h-3 text-primary-foreground" />
              <span className="text-xs font-bold text-primary-foreground">#{item.rank}</span>
            </div>}

          {/* Status Badges */}
          <div className="absolute bottom-16 right-3 flex gap-2">
            {item.isNew && <Badge variant="default" className="bg-gradient-orange text-primary-foreground font-semibold animate-pulse">
                NEW
              </Badge>}
          </div>

          {/* Rating */}
          {item.rating && <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-bold text-foreground">{item.rating}</span>
            </div>}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{item.genre || item.type}</p>
          </div>
        </CardContent>
      </Card>;
  };
  const SectionHeader = ({
    title,
    subtitle
  }: {
    title: string;
    subtitle: string;
  }) => <div className="mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 px-4">{title}</h2>
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">{subtitle}</p>
    </div>;
  return <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Premium Canadian Channels */}
        <div className="mb-16">
          <SectionHeader title="📺 Top 30 Premium Channels in Canada" subtitle="Most watched premium channels for sports, local Canadian content, and movies" />
          
          {/* Category Legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 px-4">
            {[{
            label: 'Sports',
            color: 'bg-green-500/20 border-green-500/50'
          }, {
            label: 'Movies',
            color: 'bg-purple-500/20 border-purple-500/50'
          }, {
            label: 'News',
            color: 'bg-blue-500/20 border-blue-500/50'
          }, {
            label: 'Streaming',
            color: 'bg-red-500/20 border-red-500/50'
          }, {
            label: 'Francophone',
            color: 'bg-indigo-500/20 border-indigo-500/50'
          }].map(cat => <div key={cat.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${cat.color} backdrop-blur-sm`}>
                <div className={`w-2 h-2 rounded-full ${cat.color.replace('/20', '').replace('/50', '')}`} />
                <span className="text-xs font-medium text-foreground">{cat.label}</span>
              </div>)}
          </div>
          
          <Carousel opts={{
          align: "start",
          loop: true
        }} plugins={[Autoplay({
          delay: 2500,
          stopOnInteraction: false
        })]} className="w-full">
            <CarouselContent className="-ml-1">
              {premiumChannels.map((channel, index) => <CarouselItem key={channel.name} className="pl-1 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-[12.5%]">
                  <ChannelCard channel={channel} index={index} />
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>
          
          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 px-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">30,000+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Chaînes Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">4K</div>
              <div className="text-xs md:text-sm text-muted-foreground">Ultra HD Quality</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
              <div className="text-xs md:text-sm text-muted-foreground">Streaming Continu</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">99.9%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Uptime Garanti</div>
            </div>
          </div>
        </div>

        {/* Top Canadian Movies */}
        <div className="mb-16">
          <SectionHeader title="🍁 Top Movies in Canada" subtitle="Most watched Canadian films and fan favorites across the nation" />
          <Carousel plugins={[Autoplay({
          delay: 4000,
          stopOnInteraction: true
        })]} className="w-full" opts={{
          align: "start",
          loop: true
        }}>
            <CarouselContent className="-ml-4">
              {movies.map((movie, index) => <CarouselItem key={index} className="pl-4 basis-[45%] sm:basis-[35%] md:basis-[28%] lg:basis-[22%] xl:basis-[18%]">
                  <MovieCard item={movie} index={index} />
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Top Canadian Series */}
        <div className="mb-16">
          <SectionHeader title="🎬 Top Series in Canada" subtitle="Most popular Canadian TV shows and binge-worthy series" />
          <Carousel plugins={[Autoplay({
          delay: 4500,
          stopOnInteraction: true
        })]} className="w-full" opts={{
          align: "start",
          loop: true
        }}>
            <CarouselContent className="-ml-4">
              {series.map((show, index) => <CarouselItem key={index} className="pl-4 basis-[45%] sm:basis-[35%] md:basis-[28%] lg:basis-[22%] xl:basis-[18%]">
                  <MovieCard item={show} index={index} />
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Top Canadian Sports */}
        <div>
          <SectionHeader title="🏒 Top Sports Watched in Canada" subtitle="Most popular live sports and championships across the nation" />
          <Carousel plugins={[Autoplay({
          delay: 5000,
          stopOnInteraction: true
        })]} className="w-full" opts={{
          align: "start",
          loop: true
        }}>
            <CarouselContent className="-ml-4">
              {sports.map((sport, index) => <CarouselItem key={index} className="pl-4 basis-[85%] sm:basis-[70%] md:basis-[45%] lg:basis-[35%] xl:basis-[30%]">
                  <SportsCard item={sport} index={index} />
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>;
};
export default ContentShowcase;