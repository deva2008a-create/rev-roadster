import bikeClassic from "@/assets/bike-classic.jpg";
import bikeNaked from "@/assets/bike-naked.jpg";
import bikeSport from "@/assets/bike-sport.jpg";
import bikeAdventure from "@/assets/bike-adventure.jpg";
import bikeSuper from "@/assets/bike-super.jpg";
import heroBike from "@/assets/hero-bike.jpg";

export type Condition = "New" | "Used";

export type Bike = {
  id: string;
  name: string;
  brand: string;
  price: number;
  cc: number;
  mileage: number;
  power: string;
  weight: string;
  fuel: string;
  transmission: string;
  topSpeed: string;
  condition: Condition;
  year: number;
  kms?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  tagline: string;
  highlight?: string;
};

export const BRANDS = [
  "Royal Enfield",
  "Yamaha",
  "KTM",
  "Honda",
  "Kawasaki",
  "BMW",
  "Ducati",
] as const;

export const bikes: Bike[] = [
  {
    id: "royal-enfield-classic-350",
    name: "Classic 350 Chrome",
    brand: "Royal Enfield",
    price: 232000,
    cc: 349,
    mileage: 36,
    power: "20.2 bhp @ 6100 rpm",
    weight: "195 kg",
    fuel: "13 L",
    transmission: "5-speed",
    topSpeed: "120 km/h",
    condition: "New",
    year: 2026,
    rating: 4.6,
    reviews: 214,
    image: bikeClassic,
    gallery: [bikeClassic, heroBike, bikeAdventure],
    tagline: "Timeless thump with a modern J-platform heart.",
    highlight: "Best Seller",
  },
  {
    id: "ktm-duke-390",
    name: "390 Duke",
    brand: "KTM",
    price: 311000,
    cc: 399,
    mileage: 28,
    power: "45.3 bhp @ 8500 rpm",
    weight: "165 kg",
    fuel: "15 L",
    transmission: "6-speed",
    topSpeed: "167 km/h",
    condition: "New",
    year: 2026,
    rating: 4.7,
    reviews: 389,
    image: bikeNaked,
    gallery: [bikeNaked, heroBike, bikeSuper],
    tagline: "Street-shredding scalpel with ride-by-wire precision.",
    highlight: "Hot Deal",
  },
  {
    id: "yamaha-r7",
    name: "YZF-R7",
    brand: "Yamaha",
    price: 895000,
    cc: 689,
    mileage: 22,
    power: "72.4 bhp @ 8750 rpm",
    weight: "188 kg",
    fuel: "13 L",
    transmission: "6-speed",
    topSpeed: "225 km/h",
    condition: "New",
    year: 2026,
    rating: 4.8,
    reviews: 122,
    image: bikeSport,
    gallery: [bikeSport, heroBike, bikeSuper],
    tagline: "Track-bred CP2 twin wrapped in R-DNA aero.",
  },
  {
    id: "ducati-panigale-v2",
    name: "Panigale V2",
    brand: "Ducati",
    price: 2078000,
    cc: 955,
    mileage: 18,
    power: "153 bhp @ 10750 rpm",
    weight: "200 kg",
    fuel: "17 L",
    transmission: "6-speed",
    topSpeed: "270 km/h",
    condition: "New",
    year: 2026,
    rating: 4.9,
    reviews: 76,
    image: bikeSuper,
    gallery: [bikeSuper, heroBike, bikeSport],
    tagline: "Superquadro howl, Borgo Panigale soul.",
    highlight: "Premium",
  },
  {
    id: "bmw-s1000rr",
    name: "S 1000 RR",
    brand: "BMW",
    price: 2110000,
    cc: 999,
    mileage: 16,
    power: "206 bhp @ 13750 rpm",
    weight: "197 kg",
    fuel: "16.5 L",
    transmission: "6-speed",
    topSpeed: "299 km/h",
    condition: "New",
    year: 2026,
    rating: 4.9,
    reviews: 158,
    image: heroBike,
    gallery: [heroBike, bikeSuper, bikeSport],
    tagline: "ShiftCam fury engineered in Bavaria.",
  },
  {
    id: "honda-africa-twin",
    name: "Africa Twin CRF1100L",
    brand: "Honda",
    price: 1760000,
    cc: 1084,
    mileage: 20,
    power: "100 bhp @ 7500 rpm",
    weight: "226 kg",
    fuel: "18.8 L",
    transmission: "6-speed DCT",
    topSpeed: "215 km/h",
    condition: "New",
    year: 2026,
    rating: 4.7,
    reviews: 94,
    image: bikeAdventure,
    gallery: [bikeAdventure, heroBike, bikeClassic],
    tagline: "Continent-crushing adventure with DCT ease.",
  },
  {
    id: "kawasaki-ninja-650",
    name: "Ninja 650",
    brand: "Kawasaki",
    price: 733000,
    cc: 649,
    mileage: 23,
    power: "67 bhp @ 8000 rpm",
    weight: "196 kg",
    fuel: "15 L",
    transmission: "6-speed",
    topSpeed: "210 km/h",
    condition: "New",
    year: 2026,
    rating: 4.5,
    reviews: 187,
    image: bikeSport,
    gallery: [bikeSport, heroBike, bikeNaked],
    tagline: "Sharp sport-tourer with everyday manners.",
  },
  {
    id: "yamaha-mt-15-used",
    name: "MT-15 V2",
    brand: "Yamaha",
    price: 128000,
    cc: 155,
    mileage: 47,
    power: "18.1 bhp @ 10000 rpm",
    weight: "141 kg",
    fuel: "10 L",
    transmission: "6-speed",
    topSpeed: "134 km/h",
    condition: "Used",
    year: 2023,
    kms: 12400,
    rating: 4.4,
    reviews: 63,
    image: bikeNaked,
    gallery: [bikeNaked, bikeSport],
    tagline: "Single-owner hyper-naked, full service history.",
    highlight: "Certified",
  },
  {
    id: "royal-enfield-himalayan-used",
    name: "Himalayan 411",
    brand: "Royal Enfield",
    price: 168000,
    cc: 411,
    mileage: 30,
    power: "24.3 bhp @ 6500 rpm",
    weight: "199 kg",
    fuel: "15 L",
    transmission: "5-speed",
    topSpeed: "130 km/h",
    condition: "Used",
    year: 2022,
    kms: 24800,
    rating: 4.3,
    reviews: 88,
    image: bikeAdventure,
    gallery: [bikeAdventure, bikeClassic],
    tagline: "Ladakh-proven tourer with crash guards fitted.",
  },
  {
    id: "kawasaki-z900-used",
    name: "Z900",
    brand: "Kawasaki",
    price: 690000,
    cc: 948,
    mileage: 17,
    power: "123 bhp @ 9500 rpm",
    weight: "212 kg",
    fuel: "17 L",
    transmission: "6-speed",
    topSpeed: "240 km/h",
    condition: "Used",
    year: 2021,
    kms: 18900,
    rating: 4.6,
    reviews: 41,
    image: bikeNaked,
    gallery: [bikeNaked, heroBike],
    tagline: "Sugomi-styled inline-four, exhaust upgraded.",
  },
  {
    id: "honda-cb350-used",
    name: "CB350 H'ness",
    brand: "Honda",
    price: 158000,
    cc: 348,
    mileage: 38,
    power: "20.8 bhp @ 5500 rpm",
    weight: "181 kg",
    fuel: "15 L",
    transmission: "5-speed",
    topSpeed: "125 km/h",
    condition: "Used",
    year: 2023,
    kms: 9100,
    rating: 4.5,
    reviews: 57,
    image: bikeClassic,
    gallery: [bikeClassic, bikeAdventure],
    tagline: "Neo-retro cruiser, showroom condition.",
    highlight: "Low Kms",
  },
  {
    id: "ducati-monster-used",
    name: "Monster 821",
    brand: "Ducati",
    price: 895000,
    cc: 821,
    mileage: 19,
    power: "109 bhp @ 9250 rpm",
    weight: "206 kg",
    fuel: "16.5 L",
    transmission: "6-speed",
    topSpeed: "245 km/h",
    condition: "Used",
    year: 2020,
    kms: 21500,
    rating: 4.4,
    reviews: 34,
    image: bikeSuper,
    gallery: [bikeSuper, bikeNaked],
    tagline: "Testastretta naked with Termignoni can.",
  },
];

export const heroImage = heroBike;

export function getBike(id: string) {
  return bikes.find((b) => b.id === id);
}

export function formatPrice(value: number) {
  return "₹" + value.toLocaleString("en-IN");
}

export function emi(price: number, months = 36, rate = 0.095) {
  const p = price * 0.85;
  const r = rate / 12;
  return Math.round((p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
}

export type Review = {
  name: string;
  bike: string;
  rating: number;
  text: string;
  city: string;
};

export const reviews: Review[] = [
  {
    name: "Arjun Mehta",
    bike: "KTM 390 Duke",
    rating: 5,
    text: "Booked online, delivered in four days with paperwork done. The condition report was spot on.",
    city: "Pune",
  },
  {
    name: "Sneha Rao",
    bike: "Royal Enfield Classic 350",
    rating: 5,
    text: "The EMI breakdown was transparent — no hidden charges. Easily the smoothest bike purchase I've had.",
    city: "Bengaluru",
  },
  {
    name: "Imran Qureshi",
    bike: "Kawasaki Z900",
    rating: 4,
    text: "Certified used bike felt nearly new. Inspection photos matched exactly what arrived.",
    city: "Hyderabad",
  },
  {
    name: "Divya Nair",
    bike: "Yamaha YZF-R7",
    rating: 5,
    text: "Sold my old bike and upgraded in the same week. Their valuation beat two local dealers.",
    city: "Kochi",
  },
];
