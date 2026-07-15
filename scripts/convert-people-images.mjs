import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'src/assets/image/sectionPeople';
const jobs = [
  { file: 'image 8.svg', out: 'workspace.webp', maxW: 1600 },
  { file: 'redd-5U_28ojjgms-unsplash 1.svg', out: 'team-meeting.webp', maxW: 1600 },
  { file: 'surface-4FEub7tWUzM-unsplash 1.svg', out: 'team-member.webp', maxW: 1200 },
];

for (const job of jobs) {
  const svg = fs.readFileSync(path.join(dir, job.file), 'utf8');
  const m = svg.match(/xlink:href="(data:image\/[a-zA-Z+]+;base64,[^"]+)"/);
  if (!m) {
    console.error('no image in', job.file);
    continue;
  }
  const b64 = m[1].split(',')[1];
  const buf = Buffer.from(b64, 'base64');
  const outPath = path.join(dir, job.out);
  await sharp(buf)
    .rotate()
    .resize({ width: job.maxW, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(outPath);
  const mb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
  console.log(job.out, mb + 'MB');
}
