/*
REQUIRED IMAGE FILES — place in /public/images/rooms/

TOWER-I:
  tower1-auditorium-cover.jpg, tower1-auditorium-1.jpg, tower1-auditorium-2.jpg, tower1-auditorium-3.jpg
  
  tower1-media-cover.jpg, tower1-media-1.jpg, tower1-media-2.jpg, tower1-media-3.jpg
  
  tower1-hrd-cover.jpg, tower1-hrd-1.jpg, tower1-hrd-2.jpg, tower1-hrd-3.jpg
  
  tower1-vimaarsh-cover.jpg, tower1-vimaarsh-1.jpg, tower1-vimaarsh-2.jpg, tower1-vimaarsh-3.jpg
  
  tower1-traffic-cover.jpg, tower1-traffic-1.jpg, tower1-traffic-2.jpg, tower1-traffic-3.jpg
  
  tower1-itcenter-cover.jpg, tower1-itcenter-1.jpg, tower1-itcenter-2.jpg, tower1-itcenter-3.jpg
  
  tower1-7th-cover.jpg, tower1-7th-1.jpg, tower1-7th-2.jpg
  
  tower1-pro-cover.jpg, tower1-pro-1.jpg, tower1-pro-2.jpg, tower1-pro-3.jpg
  
  tower1-cp-cover.jpg, tower1-cp-1.jpg, tower1-cp-2.jpg, tower1-cp-3.jpg
  
  tower1-17th-cover.jpg, tower1-17th-1.jpg, tower1-17th-2.jpg

BRIDGE TOWER:
  bridge-1429-cover.jpg, bridge-1429-1.jpg, bridge-1429-2.jpg, bridge-1429-3.jpg

TOWER-II:
  tower2-124-cover.jpg, tower2-124-1.jpg, tower2-124-2.jpg, tower2-124-3.jpg
  
  tower2-216-cover.jpg, tower2-216-1.jpg, tower2-216-2.jpg, tower2-216-3.jpg
  
  tower2-326-cover.jpg, tower2-326-1.jpg, tower2-326-2.jpg, tower2-326-3.jpg
  
  tower2-727-cover.jpg, tower2-727-1.jpg, tower2-727-2.jpg, tower2-727-3.jpg
*/

export const rooms = [
  {
    id: 1,
    roomNo: "13",
    name: "Aadarsh Auditorium",
    building: "Tower-I",
    floor: "Ground Floor",
    managedBy: "Reception",
    capacity: { min: 430, max: 430 },
    capacityDisplay: "430",
    coverImage: "/images/rooms/tower1-auditorium-cover.jpg",
    image: "/images/rooms/tower1-auditorium-cover.jpg",
    gallery: [
      "/images/rooms/tower1-auditorium-1.jpg",
      "/images/rooms/tower1-auditorium-2.jpg",
      "/images/rooms/tower1-auditorium-3.jpg"
    ],
    facilities: ["Projector", "AC", "Mic System", "Podium", "Recording System", "Large Screen"],
    description: "The Aadarsh Auditorium is the largest venue at Delhi Police PHQ, managed by the Reception desk. Suitable for large-scale events, seminars, press conferences and ceremonial gatherings.",
    color: "from-slate-900 to-slate-700",
    tag: "Large Venue",
    status: 'available'
  },
  {
    id: 2,
    roomNo: "13",
    name: "Media Conference Hall",
    building: "Tower-I",
    floor: "Ground Floor",
    managedBy: "Media Cell",
    capacity: { min: 70, max: 90 },
    capacityDisplay: "70–90",
    coverImage: "/images/rooms/tower1-media-cover.jpg",
    image: "/images/rooms/tower1-media-cover.jpg",
    gallery: [
      "/images/rooms/tower1-media-1.jpg",
      "/images/rooms/tower1-media-2.jpg",
      "/images/rooms/tower1-media-3.jpg"
    ],
    facilities: ["Projector", "AC", "Mic System", "Video Conferencing", "Press Seating"],
    description: "Primary media briefing and press conference hall managed by the Delhi Police Media Cell. Equipped for live broadcasts and media interactions.",
    color: "from-blue-900 to-blue-700",
    tag: "Media",
    status: 'available'
  },
  {
    id: 3,
    roomNo: "107",
    name: "HRD Conference Hall",
    building: "Tower-I",
    floor: "1st Floor",
    managedBy: "HRD",
    capacity: { min: 20, max: 30 },
    capacityDisplay: "20–30",
    coverImage: "/images/rooms/tower1-hrd-cover.jpg",
    image: "/images/rooms/tower1-hrd-cover.jpg",
    gallery: [
      "/images/rooms/tower1-hrd-1.jpg",
      "/images/rooms/tower1-hrd-2.jpg",
      "/images/rooms/tower1-hrd-3.jpg"
    ],
    facilities: ["Projector", "AC", "Whiteboard", "TV Screen"],
    description: "Human Resources Department conference hall on the 1st floor of Tower-I. Used for HR meetings, training coordination and departmental briefings.",
    color: "from-indigo-900 to-indigo-700",
    tag: "Mid-Size",
    status: 'available'
  },
  {
    id: 4,
    roomNo: "203",
    name: "Vimaarsh Auditorium",
    building: "Tower-I",
    floor: "2nd Floor",
    managedBy: "DCP/GA",
    capacity: { min: 50, max: 80 },
    capacityDisplay: "50–80",
    coverImage: "/images/rooms/tower1-vimaarsh-cover.jpg",
    image: "/images/rooms/tower1-vimaarsh-cover.jpg",
    gallery: [
      "/images/rooms/tower1-vimaarsh-1.jpg",
      "/images/rooms/tower1-vimaarsh-2.jpg",
      "/images/rooms/tower1-vimaarsh-3.jpg"
    ],
    facilities: ["Projector", "AC", "Mic System", "Whiteboard", "Podium"],
    description: "Vimaarsh Auditorium managed by DCP/GA on the 2nd floor of Tower-I. A versatile mid-to-large auditorium suitable for departmental seminars and training programs.",
    color: "from-navy-900 to-blue-800",
    tag: "Auditorium",
    status: 'available'
  },
  {
    id: 5,
    roomNo: "307",
    name: "Traffic Conference Hall",
    building: "Tower-I",
    floor: "3rd Floor",
    managedBy: "Traffic",
    capacity: { min: 25, max: 40 },
    capacityDisplay: "25–40",
    coverImage: "/images/rooms/tower1-traffic-cover.jpg",
    image: "/images/rooms/tower1-traffic-cover.jpg",
    gallery: [
      "/images/rooms/tower1-traffic-1.jpg",
      "/images/rooms/tower1-traffic-2.jpg",
      "/images/rooms/tower1-traffic-3.jpg"
    ],
    facilities: ["Projector", "AC", "Whiteboard", "TV Screen"],
    description: "Conference hall on the 3rd floor of Tower-I, managed by the Traffic department. Used for traffic coordination meetings and inter-division briefings.",
    color: "from-teal-900 to-teal-700",
    tag: "Mid-Size",
    status: 'available'
  },
  {
    id: 6,
    roomNo: "420",
    name: "IT Center Conference Hall",
    building: "Tower-I",
    floor: "4th Floor",
    managedBy: "IT Center",
    capacity: { min: 15, max: 45 },
    capacityDisplay: "15–45",
    coverImage: "/images/rooms/tower1-itcenter-cover.jpg",
    image: "/images/rooms/tower1-itcenter-cover.jpg",
    gallery: [
      "/images/rooms/tower1-itcenter-1.jpg",
      "/images/rooms/tower1-itcenter-2.jpg",
      "/images/rooms/tower1-itcenter-3.jpg"
    ],
    facilities: ["Projector", "AC", "Whiteboard", "High-Speed Internet", "Video Conferencing"],
    description: "IT Center conference hall on the 4th floor of Tower-I. Equipped with advanced tech facilities. Ideal for technical meetings, cyber briefings and IT training.",
    color: "from-cyan-900 to-cyan-700",
    tag: "Tech-Equipped",
    status: 'available'
  },
  {
    id: 7,
    roomNo: "1305",
    name: "DPHCL Conference Hall",
    building: "Tower-I",
    floor: "13th Floor",
    managedBy: "-",
    capacity: { min: 0, max: 0 },
    capacityDisplay: "TBD",
    coverImage: "/images/rooms/tower1-13th-cover.jpg",
    image: "/images/rooms/tower1-13th-cover.jpg",
    gallery: [
      "/images/rooms/tower1-13th-1.jpg",
      "/images/rooms/tower1-13th-2.jpg"
    ],
    facilities: ["AC"],
    description: "Conference hall on the 13th floor of Tower-I. Details to be updated. Contact administration for capacity and facilities information.",
    color: "from-gray-800 to-gray-600",
    tag: "Details TBD",
    status: 'available'
  },
  {
    id: 8,
    roomNo: "1400",
    name: "PRO Conference Hall",
    building: "Tower-I",
    floor: "13th Floor",
    managedBy: "PRO",
    capacity: { min: 14, max: 25 },
    capacityDisplay: "14–25",
    coverImage: "/images/rooms/tower1-pro-cover.jpg",
    image: "/images/rooms/tower1-pro-cover.jpg",
    gallery: [
      "/images/rooms/tower1-pro-1.jpg",
      "/images/rooms/tower1-pro-2.jpg",
      "/images/rooms/tower1-pro-3.jpg"
    ],
    facilities: ["Projector", "AC", "Whiteboard", "Video Conferencing"],
    description: "Public Relations Office conference hall on the 13th floor of Tower-I. Used for media coordination, public communication meetings and PR briefings.",
    color: "from-violet-900 to-violet-700",
    tag: "Small",
    status: 'available'
  },
  {
    id: 9,
    roomNo: "-",
    name: "CP Secretariats Conference Hall",
    building: "Tower-I",
    floor: "14th Floor",
    managedBy: "CP Secretariats",
    capacity: { min: 30, max: 45 },
    capacityDisplay: "30–45",
    coverImage: "/images/rooms/tower1-cp-cover.jpg",
    image: "/images/rooms/tower1-cp-cover.jpg",
    gallery: [
      "/images/rooms/tower1-cp-1.jpg",
      "/images/rooms/tower1-cp-2.jpg",
      "/images/rooms/tower1-cp-3.jpg"
    ],
    facilities: ["Projector", "AC", "Whiteboard", "Video Conferencing", "Secure Line", "Mic System"],
    description: "The Commissioner of Police Secretariat conference hall on the 14th floor of Tower-I. High-security, premium facility for top-level command meetings.",
    color: "from-[#0A1628] to-[#003087]",
    tag: "High Security",
    status: 'available'
  },
  
  {
    id: 10,
    roomNo: "1429",
    name: "Bridge Tower Conference Hall",
    building: "Bridge Tower",
    floor: "14th Floor",
    managedBy: "Traffic",
    capacity: { min: 18, max: 30 },
    capacityDisplay: "18–30",
    coverImage: "/images/rooms/bridge-1429-cover.jpg",
    image: "/images/rooms/bridge-1429-cover.jpg",
    gallery: [
      "/images/rooms/bridge-1429-1.jpg",
      "/images/rooms/bridge-1429-2.jpg",
      "/images/rooms/bridge-1429-3.jpg"
    ],
    facilities: ["AC", "Whiteboard", "TV Screen", "Projector"],
    description: "Conference hall in the Bridge Tower connecting Tower-I and Tower-II, on the 14th floor. Managed by Traffic department for coordination meetings.",
    color: "from-emerald-900 to-emerald-700",
    tag: "Bridge Tower",
    status: 'available'
  },
  {
    id: 11,
    roomNo: "124",
    name: "Reception Conference Hall",
    building: "Tower-II",
    floor: "1st Floor",
    managedBy: "Reception",
    capacity: { min: 25, max: 40 },
    capacityDisplay: "25–40",
    coverImage: "/images/rooms/tower2-124-cover.jpg",
    image: "/images/rooms/tower2-124-cover.jpg",
    gallery: [
      "/images/rooms/tower2-124-1.jpg",
      "/images/rooms/tower2-124-2.jpg",
      "/images/rooms/tower2-124-3.jpg"
    ],
    facilities: ["Projector", "AC", "Whiteboard"],
    description: "Conference hall on the 1st floor of Tower-II, managed by Reception. Suitable for welcome meetings, visitor briefings and coordination sessions.",
    color: "from-blue-800 to-blue-600",
    tag: "Mid-Size",
    status: 'available'
  },
  {
    id: 12,
    roomNo: "216",
    name: "L&O Conference Hall",
    building: "Tower-II",
    floor: "2nd Floor",
    managedBy: "L&O Zone-1",
    capacity: { min: 25, max: 40 },
    capacityDisplay: "25–40",
    coverImage: "/images/rooms/tower2-216-cover.jpg",
    image: "/images/rooms/tower2-216-cover.jpg",
    gallery: [
      "/images/rooms/tower2-216-1.jpg",
      "/images/rooms/tower2-216-2.jpg",
      "/images/rooms/tower2-216-3.jpg"
    ],
    facilities: ["Projector", "AC", "Whiteboard", "TV Screen"],
    description: "Law & Order Zone-1 conference hall on the 2nd floor of Tower-II. Used for law and order coordination, zone-level briefings and operational planning.",
    color: "from-indigo-800 to-indigo-600",
    tag: "Mid-Size",
    status: 'available'
  },
  {
    id: 13,
    roomNo: "326",
    name: "Reception Conference Hall",
    building: "Tower-II",
    floor: "3rd Floor",
    managedBy: "Reception",
    capacity: { min: 30, max: 50 },
    capacityDisplay: "30–50",
    coverImage: "/images/rooms/tower2-326-cover.jpg",
    image: "/images/rooms/tower2-326-cover.jpg",
    gallery: [
      "/images/rooms/tower2-326-1.jpg",
      "/images/rooms/tower2-326-2.jpg",
      "/images/rooms/tower2-326-3.jpg"
    ],
    facilities: ["Projector", "AC", "Whiteboard", "Video Conferencing"],
    description: "Conference hall on the 3rd floor of Tower-II managed by Reception. Mid-to-large room for departmental meetings and briefings.",
    color: "from-sky-900 to-sky-700",
    tag: "Mid-Size",
    status: 'available'
  },
  {
    id: 14,
    roomNo: "727",
    name: "Spl. Cell Conference Hall",
    building: "Tower-II",
    floor: "7th Floor",
    managedBy: "Spl. Cell",
    capacity: { min: 30, max: 60 },
    capacityDisplay: "30–60",
    coverImage: "/images/rooms/tower2-727-cover.jpg",
    image: "/images/rooms/tower2-727-cover.jpg",
    gallery: [
      "/images/rooms/tower2-727-1.jpg",
      "/images/rooms/tower2-727-2.jpg",
      "/images/rooms/tower2-727-3.jpg"
    ],
    facilities: ["AC", "Secure Line", "Whiteboard", "Video Conferencing", "Restricted Access"],
    description: "Special Cell conference hall on the 7th floor of Tower-II. Restricted access facility for sensitive operations, intelligence briefings and special unit coordination.",
    color: "from-gray-900 to-gray-700",
    tag: "Restricted",
    status: 'available'
  }
]

export const users = [
  {
    id: 1,
    name: "Rajesh Kumar Singh",
    rank: "Inspector",
    badgeNumber: "DP-4521",
    department: "Crime Branch",
    phone: "9810001234",
    role: "user",
    initials: "RK"
  },
  {
    id: 2,
    name: "Priya Sharma",
    rank: "Sub-Inspector",
    badgeNumber: "DP-3312",
    department: "Traffic Division",
    phone: "9810005678",
    role: "user",
    initials: "PS"
  },
  {
    id: 3,
    name: "Amit Verma",
    rank: "Deputy Commissioner of Police",
    badgeNumber: "DP-0021",
    department: "Operations",
    phone: "9810009999",
    role: "user",
    initials: "AV"
  },
  {
    id: 4,
    name: "HQ Admin",
    rank: "Superintendent (Admin)",
    badgeNumber: "DP-ADMIN",
    department: "Headquarters Administration",
    phone: "9810000001",
    role: "superadmin",
    initials: "HA"
  }
]

export const rankPriority = {
  "Commissioner of Police": 1,
  "Special Commissioner": 2,
  "Joint Commissioner": 3,
  "Deputy Commissioner of Police": 4,
  "Additional DCP": 5,
  "Assistant Commissioner of Police": 6,
  "Inspector": 7,
  "Sub-Inspector": 8,
  "Assistant Sub-Inspector": 9,
  "Head Constable": 10,
  "Constable": 11
}

export const bookings = [
  {
    id: "BK001",
    roomId: 1,
    userId: 1,
    date: "2026-06-18",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "Crime Branch Monthly Review Meeting",
    attendees: 30,
    status: "approved",
    requestedOn: "2026-06-15",
    adminNote: "Approved. Please ensure room is vacated by 12:00 sharp."
  },
  {
    id: "BK002",
    roomId: 2,
    userId: 2,
    date: "2026-06-18",
    startTime: "14:00",
    endTime: "15:30",
    purpose: "Traffic Signal Coordination Discussion",
    attendees: 10,
    status: "pending",
    requestedOn: "2026-06-16",
    adminNote: ""
  },
  {
    id: "BK003",
    roomId: 3,
    userId: 3,
    date: "2026-06-19",
    startTime: "09:00",
    endTime: "11:00",
    purpose: "Inter-department Operations Planning",
    attendees: 8,
    status: "rejected",
    requestedOn: "2026-06-14",
    adminNote: "Rejected due to senior officer visit. Please rebook for 20th June."
  },
  {
    id: "BK004",
    roomId: 4,
    userId: 1,
    date: "2026-06-20",
    startTime: "08:00",
    endTime: "17:00",
    purpose: "Annual Training Session — Constable Batch 2026",
    attendees: 75,
    status: "pending",
    requestedOn: "2026-06-16",
    adminNote: ""
  },
  {
    id: "BK005",
    roomId: 1,
    userId: 3,
    date: "2026-06-21",
    startTime: "11:00",
    endTime: "13:00",
    purpose: "DCP Level Strategy Meeting",
    attendees: 15,
    status: "alternate_suggested",
    requestedOn: "2026-06-15",
    adminNote: "Room 1 unavailable. Suggesting Room 2 on same date and time. Please confirm."
  }
]
