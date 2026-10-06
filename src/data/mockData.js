// All data here stands in for a real backend. Every page reads from / writes to
// this module (via AppContext) so the whole app works with `npm run dev` today
// and can be pointed at real API calls later without touching component code.

export const CATEGORIES = [
  { slug: 'electronics', name: 'Electronics', icon: 'Laptop' },
  { slug: 'books-notes', name: 'Books & Notes', icon: 'BookOpen' },
  { slug: 'furniture', name: 'Furniture', icon: 'Armchair' },
  { slug: 'cycles-transport', name: 'Cycles & Transport', icon: 'Bike' },
  { slug: 'hostel-essentials', name: 'Hostel Essentials', icon: 'Lamp' },
  { slug: 'sports-fitness', name: 'Sports & Fitness', icon: 'Dumbbell' },
  { slug: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { slug: 'instruments', name: 'Instruments', icon: 'Guitar' },
]

export const CONDITIONS = ['New', 'Like New', 'Good', 'Fair']

export const DEPARTMENTS = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'IT', 'Biotech', 'MBA']

export const LOCATIONS = [
  'Hostel A Block',
  'Hostel B Block',
  'Hostel C Block',
  'Hostel D Block',
  'Main Gate',
  'Library',
  'Canteen',
  'Department Block',
]

export const TINTS = ['#E7ECD9', '#DCE3F1', '#F0E7D2', '#EAD9DC', '#D9E7E3', '#EFE3EF', '#E3E9D6', '#EDE6DA']

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export let PRODUCTS = [
  { id: 'p1', name: 'TI-84 Plus Graphing Calculator', price: 1400, category: 'electronics', icon: 'Calculator', condition: 'Good', department: 'CSE', location: 'Library', sellerId: 'u-rohan-mehta', sellerName: 'Rohan Mehta', sellerDept: 'CSE', sellerYear: '2nd Year', postedAt: daysAgo(1), status: 'active', description: 'Barely used, bought for a course that switched to software tools halfway through. Comes with the original case and a spare set of batteries.', tint: TINTS[0] },
  { id: 'p2', name: 'Data Structures & Algorithms (Cormen) + handwritten notes', price: 650, category: 'books-notes', icon: 'BookOpen', condition: 'Good', department: 'CSE', location: 'Hostel A Block', sellerId: 'u-priya-nair', sellerName: 'Priya Nair', sellerDept: 'CSE', sellerYear: '3rd Year', postedAt: daysAgo(2), status: 'active', description: 'Full CLRS textbook plus my own annotated notes from the DSA course — highlighted proofs, worked examples, and a summary sheet for finals.', tint: TINTS[1] },
  { id: 'p3', name: 'Study Table with Chair', price: 2200, category: 'furniture', icon: 'Armchair', condition: 'Fair', department: 'ECE', location: 'Hostel B Block', sellerId: 'u-arjun-iyer', sellerName: 'Arjun Iyer', sellerDept: 'ECE', sellerYear: '4th Year', postedAt: daysAgo(4), status: 'active', description: 'Sturdy wooden study table with a matching chair. A few scratches on the surface but no structural issues. Perfect for a hostel room.', tint: TINTS[2] },
  { id: 'p4', name: 'Hero Sprint Single Speed Cycle', price: 3200, category: 'cycles-transport', icon: 'Bike', condition: 'Good', department: 'Mechanical', location: 'Main Gate', sellerId: 'u-sanya-kapoor', sellerName: 'Sanya Kapoor', sellerDept: 'Mechanical', sellerYear: '2nd Year', postedAt: daysAgo(0), status: 'active', description: 'Well-maintained single-speed cycle, serviced last month. Great for getting around campus quickly. Lock included.', tint: TINTS[3] },
  { id: 'p5', name: 'Study Lamp with USB Port', price: 450, category: 'hostel-essentials', icon: 'Lamp', condition: 'Like New', department: 'IT', location: 'Hostel C Block', sellerId: 'u-kabir-singh', sellerName: 'Kabir Singh', sellerDept: 'IT', sellerYear: '1st Year', postedAt: daysAgo(1), status: 'active', description: 'Adjustable brightness, folds flat, has a USB charging port on the base. Used for one semester only.', tint: TINTS[4] },
  { id: 'p6', name: 'Badminton Racket Set (2 rackets + shuttles)', price: 800, category: 'sports-fitness', icon: 'Dumbbell', condition: 'Good', department: 'Civil', location: 'Canteen', sellerId: 'u-meera-pillai', sellerName: 'Meera Pillai', sellerDept: 'Civil', sellerYear: '3rd Year', postedAt: daysAgo(3), status: 'active', description: 'Two rackets in decent condition, comes with a tube of shuttlecocks. Grips are slightly worn but still usable.', tint: TINTS[5] },
  { id: 'p7', name: 'Denim Jacket (Size M)', price: 550, category: 'fashion', icon: 'Shirt', condition: 'Like New', department: 'EEE', location: 'Hostel A Block', sellerId: 'u-divya-rao', sellerName: 'Divya Rao', sellerDept: 'EEE', sellerYear: '2nd Year', postedAt: daysAgo(5), status: 'active', description: 'Worn only a handful of times, no stains or tears. Great for the winter months on campus.', tint: TINTS[6] },
  { id: 'p8', name: 'Acoustic Guitar (Yamaha F310)', price: 4500, category: 'instruments', icon: 'Guitar', condition: 'Good', department: 'CSE', location: 'Department Block', sellerId: 'u-aditya-verma', sellerName: 'Aditya Verma', sellerDept: 'CSE', sellerYear: '4th Year', postedAt: daysAgo(6), status: 'active', description: 'Great beginner-to-intermediate acoustic guitar. New strings put on two months ago. Selling because I\u2019m switching to electric.', tint: TINTS[7] },
  { id: 'p9', name: 'Dell Wired Keyboard & Mouse Combo', price: 500, category: 'electronics', icon: 'Keyboard', condition: 'Good', department: 'IT', location: 'Hostel D Block', sellerId: 'u-neha-joshi', sellerName: 'Neha Joshi', sellerDept: 'IT', sellerYear: '2nd Year', postedAt: daysAgo(2), status: 'active', description: 'Simple, reliable combo. No issues, just upgrading to a mechanical keyboard.', tint: TINTS[0] },
  { id: 'p10', name: 'Engineering Drawing Kit', price: 300, category: 'books-notes', icon: 'Ruler', condition: 'Fair', department: 'Mechanical', location: 'Library', sellerId: 'u-rohan-mehta', sellerName: 'Rohan Mehta', sellerDept: 'CSE', sellerYear: '2nd Year', postedAt: daysAgo(9), status: 'active', description: 'Complete drawing kit from first year — compass, scales, set squares. Some wear but everything still works.', tint: TINTS[1] },
  { id: 'p11', name: 'Mini Fridge (45L)', price: 3800, category: 'hostel-essentials', icon: 'Refrigerator', condition: 'Good', department: 'ECE', location: 'Hostel B Block', sellerId: 'u-arjun-iyer', sellerName: 'Arjun Iyer', sellerDept: 'ECE', sellerYear: '4th Year', postedAt: daysAgo(7), status: 'active', description: 'Compact fridge, perfect for a hostel room. Cools well, no odour, cleaned before listing.', tint: TINTS[2] },
  { id: 'p12', name: 'Cricket Kit Bag (Bat + Pads + Gloves)', price: 1600, category: 'sports-fitness', icon: 'Dumbbell', condition: 'Good', department: 'Civil', location: 'Canteen', sellerId: 'u-meera-pillai', sellerName: 'Meera Pillai', sellerDept: 'Civil', sellerYear: '3rd Year', postedAt: daysAgo(10), status: 'active', description: 'Full kit in one bag — English willow bat, batting pads, and gloves. All in solid playable condition.', tint: TINTS[3] },
  { id: 'p13', name: 'Casio FX-991ES Scientific Calculator', price: 700, category: 'electronics', icon: 'Calculator', condition: 'Like New', department: 'EEE', location: 'Department Block', sellerId: 'u-divya-rao', sellerName: 'Divya Rao', sellerDept: 'EEE', sellerYear: '2nd Year', postedAt: daysAgo(1), status: 'active', description: 'Used for one semester, works perfectly. Comes with the original box and manual.', tint: TINTS[4] },
  { id: 'p14', name: 'Formal Shirts (Set of 3, Size L)', price: 900, category: 'fashion', icon: 'Shirt', condition: 'Good', department: 'MBA', location: 'Hostel A Block', sellerId: 'u-karan-malhotra', sellerName: 'Karan Malhotra', sellerDept: 'MBA', sellerYear: '1st Year', postedAt: daysAgo(4), status: 'active', description: 'Three formal shirts, good for internship interviews and presentations. Freshly laundered.', tint: TINTS[5] },
  { id: 'p15', name: 'Steel Bookshelf (3-tier)', price: 1300, category: 'furniture', icon: 'Armchair', condition: 'Fair', department: 'Biotech', location: 'Hostel C Block', sellerId: 'u-kabir-singh', sellerName: 'Kabir Singh', sellerDept: 'IT', sellerYear: '1st Year', postedAt: daysAgo(8), status: 'active', description: 'Compact steel shelf, some surface rust on one leg but structurally solid. Easy to disassemble for moving.', tint: TINTS[6] },
  { id: 'p16', name: 'Digital Keyboard (Casio SA-76, 44-key)', price: 2600, category: 'instruments', icon: 'Guitar', condition: 'Good', department: 'CSE', location: 'Department Block', sellerId: 'u-aditya-verma', sellerName: 'Aditya Verma', sellerDept: 'CSE', sellerYear: '4th Year', postedAt: daysAgo(11), status: 'active', description: 'Small practice keyboard, great for beginners. Runs on batteries or the included adapter.', tint: TINTS[7] },
  { id: 'p17', name: 'Old Semester Notes Bundle (3rd Sem CSE)', price: 200, category: 'books-notes', icon: 'BookOpen', condition: 'Good', department: 'CSE', location: 'Library', sellerId: 'u-priya-nair', sellerName: 'Priya Nair', sellerDept: 'CSE', sellerYear: '3rd Year', postedAt: daysAgo(14), status: 'sold', description: 'Complete notes for all 3rd semester CSE subjects, photocopied and organised by subject.', tint: TINTS[0] },
  { id: 'p18', name: 'Table Fan', price: 550, category: 'hostel-essentials', icon: 'Lamp', condition: 'Good', department: 'Civil', location: 'Hostel D Block', sellerId: 'u-neha-joshi', sellerName: 'Neha Joshi', sellerDept: 'IT', sellerYear: '2nd Year', postedAt: daysAgo(12), status: 'sold', description: 'Reliable table fan, three speed settings, no noise issues.', tint: TINTS[1] },
  { id: 'p19', name: 'JBL Bluetooth Speaker (Go 2)', price: 1200, category: 'electronics', icon: 'Speaker', condition: 'Like New', department: 'CSE', location: 'Hostel A Block', sellerId: 'u1', sellerName: 'Ankan Sharma', sellerDept: 'CSE', sellerYear: '3rd Year', postedAt: daysAgo(2), status: 'active', description: 'Compact speaker, great battery life, barely used. Comes with the charging cable.', tint: TINTS[2] },
  { id: 'p20', name: 'Signals & Systems Textbook + Notes', price: 400, category: 'books-notes', icon: 'BookOpen', condition: 'Good', department: 'CSE', location: 'Department Block', sellerId: 'u1', sellerName: 'Ankan Sharma', sellerDept: 'CSE', sellerYear: '3rd Year', postedAt: daysAgo(6), status: 'active', description: 'Textbook plus my own solved-example notes for the tricky Fourier transform sections.', tint: TINTS[3] },
  { id: 'p21', name: 'Desk Organizer Set', price: 250, category: 'hostel-essentials', icon: 'Lamp', condition: 'Good', department: 'CSE', location: 'Hostel A Block', sellerId: 'u1', sellerName: 'Ankan Sharma', sellerDept: 'CSE', sellerYear: '3rd Year', postedAt: daysAgo(20), status: 'sold', description: 'Small wooden organizer for pens, chargers, and odds and ends.', tint: TINTS[4] },
]

export const CURRENT_USER = {
  id: 'u1',
  name: 'Ankan Sharma',
  email: 'ankan.sharma@campusmail.edu',
  department: 'CSE',
  year: '3rd Year',
  avatarInitials: 'AS',
}

export const CONVERSATIONS = [
  {
    id: 'c1',
    withName: 'Rohan Mehta',
    productName: 'TI-84 Plus Graphing Calculator',
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey, is the calculator still available?', time: '10:12 AM' },
      { id: 'm2', sender: 'me', text: 'Yes it is! Still has the case and spare batteries.', time: '10:15 AM' },
      { id: 'm3', sender: 'them', text: 'Great, can we meet near the library around 5?', time: '10:16 AM' },
    ],
  },
  {
    id: 'c2',
    withName: 'Priya Nair',
    productName: 'Data Structures & Algorithms (Cormen) + handwritten notes',
    messages: [
      { id: 'm4', sender: 'them', text: 'Are the notes handwritten or typed?', time: 'Yesterday' },
      { id: 'm5', sender: 'me', text: 'Handwritten, but pretty neat! I can send a photo of a page if you want.', time: 'Yesterday' },
    ],
  },
  {
    id: 'c3',
    withName: 'Sanya Kapoor',
    productName: 'Hero Sprint Single Speed Cycle',
    messages: [
      { id: 'm6', sender: 'me', text: 'Hi, is the lock original or a separate purchase?', time: 'Monday' },
      { id: 'm7', sender: 'them', text: 'Separate, but it comes free with the cycle.', time: 'Monday' },
      { id: 'm8', sender: 'me', text: 'Sounds good, I\u2019ll take it.', time: 'Monday' },
    ],
  },
]

export const PURCHASES = [
  { id: 'pu1', productName: 'Old Semester Notes Bundle (3rd Sem CSE)', sellerId: 'u-priya-nair', sellerName: 'Priya Nair', status: 'Completed', date: daysAgo(14) },
  { id: 'pu2', productName: 'Table Fan', sellerId: 'u-neha-joshi', sellerName: 'Neha Joshi', status: 'Completed', date: daysAgo(12) },
  { id: 'pu3', productName: 'USB-C Charging Cable (2m)', sellerId: 'u-kabir-singh', sellerName: 'Kabir Singh', status: 'Pending Pickup', date: daysAgo(0) },
]
