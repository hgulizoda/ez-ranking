/**
 * Mock worker data with departments.
 * Structured so it can be replaced with an API call later:
 *   export async function fetchWorkers() { return fetch('/api/workers').then(r => r.json()); }
 */

const mockWorkers = [
  {
    id: 1,
    name: "Aysel Mammadova",
    avatar: "AM",
    photo: "https://i.pravatar.cc/300?img=5",
    department: "Engineering",
    clockIn: "08:00",
    clockOut: "17:00",
    workedHours: 160,
    billedHours: 172,
  },
  {
    id: 2,
    name: "Rashad Aliyev",
    avatar: "RA",
    photo: "https://i.pravatar.cc/300?img=12",
    department: "Engineering",
    clockIn: "09:00",
    clockOut: "18:00",
    workedHours: 160,
    billedHours: 155,
  },
  {
    id: 3,
    name: "Leyla Huseynova",
    avatar: "LH",
    photo: "https://i.pravatar.cc/300?img=9",
    department: "Design",
    clockIn: "08:30",
    clockOut: "17:00",
    workedHours: 150,
    billedHours: 128,
  },
  {
    id: 4,
    name: "Farid Karimov",
    avatar: "FK",
    photo: "https://i.pravatar.cc/300?img=11",
    department: "Marketing",
    clockIn: "07:30",
    clockOut: "17:30",
    workedHours: 170,
    billedHours: 170,
  },
  {
    id: 5,
    name: "Nigar Hasanova",
    avatar: "NH",
    photo: "https://i.pravatar.cc/300?img=32",
    department: "Design",
    clockIn: "09:00",
    clockOut: "17:30",
    workedHours: 145,
    billedHours: 110,
  },
  {
    id: 6,
    name: "Orkhan Guliyev",
    avatar: "OG",
    photo: "https://i.pravatar.cc/300?img=53",
    department: "Engineering",
    clockIn: "08:00",
    clockOut: "17:30",
    workedHours: 155,
    billedHours: 162,
  },
  {
    id: 7,
    name: "Sabina Rahimli",
    avatar: "SR",
    photo: "https://i.pravatar.cc/300?img=23",
    department: "Marketing",
    clockIn: "08:30",
    clockOut: "18:00",
    workedHours: 165,
    billedHours: 148,
  },
  {
    id: 8,
    name: "Tural Gasimov",
    avatar: "TG",
    photo: "https://i.pravatar.cc/300?img=59",
    department: "Engineering",
    clockIn: "07:00",
    clockOut: "17:00",
    workedHours: 160,
    billedHours: 180,
  },
  {
    id: 9,
    name: "Gunel Ismayilova",
    avatar: "GI",
    photo: "https://i.pravatar.cc/300?img=25",
    department: "Design",
    clockIn: "09:00",
    clockOut: "17:00",
    workedHours: 140,
    billedHours: 133,
  },
  {
    id: 10,
    name: "Elvin Nasirov",
    avatar: "EN",
    photo: "https://i.pravatar.cc/300?img=60",
    department: "Marketing",
    clockIn: "08:00",
    clockOut: "17:00",
    workedHours: 155,
    billedHours: 140,
  },
];

export function fetchWorkers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockWorkers), 300);
  });
}

export function getDepartments(workers) {
  return [...new Set(workers.map((w) => w.department))];
}

export default mockWorkers;
