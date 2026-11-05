const photos = [
  ['SCHOOL1.jpeg', 'Campus'],
  ['GROUND.jpeg', 'Events'],
  ['STAGE.jpeg', 'Events'],
  ['school.jpg', 'Campus'],
  ['WhatsApp Image 2026-03-20 at 8.45.45 PM.jpeg', 'Students'],
  ['WhatsApp Image 2026-03-20 at 8.45.46 PM.jpeg', 'Campus'],
  ['WhatsApp Image 2026-03-20 at 8.45.47 PM.jpeg', 'Events'],
  ['WhatsApp Image 2026-03-20 at 8.45.48 PM.jpeg', 'Students'],
  ['WhatsApp Image 2026-03-20 at 8.45.49 PM.jpeg', 'Campus'],
  ['WhatsApp Image 2026-03-20 at 8.45.50 PM.jpeg', 'Events'],
  ['student2.jpg', 'Students'],
  ...['53', '54', '56', '58', '59'].map((n) => [
    `WhatsApp Image 2026-03-20 at 8.45.${n} PM.jpeg`,
    'Students',
  ]),
  ...['00', '01', '02', '03'].map((n) => [
    `WhatsApp Image 2026-03-20 at 8.46.${n} PM.jpeg`,
    'Students',
  ]),
].map(([file, category]) => ({
  src: `/img/${file}`,
  category,
  alt:
    category === 'Campus'
      ? 'Our school campus'
      : category === 'Events'
        ? 'School event'
        : 'Student life at Shanti Niketan',
}));

export default photos;
