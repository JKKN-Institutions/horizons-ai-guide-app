export const jkknColleges = [
  {
    name: "JKKN College of Engineering & Technology",
    short_name: "JKKN CET",
    courses: ["B.Tech", "M.Tech", "MCA", "MBA"],
    branches: ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "AI & ML", "Data Science"]
  },
  {
    name: "JKKN College of Arts & Science",
    short_name: "JKKN CAS",
    courses: ["B.Sc", "M.Sc", "BCA", "B.Com", "BBA"],
    branches: ["Computer Science", "Mathematics", "Physics", "Chemistry", "Commerce"]
  },
  {
    name: "JKKN College of Pharmacy",
    short_name: "JKKN CP",
    courses: ["B.Pharm", "M.Pharm", "Pharm.D"],
    branches: ["Pharmacy"]
  },
  {
    name: "JKKN Dental College",
    short_name: "JKKN DC",
    courses: ["BDS", "MDS"],
    branches: ["Dental"]
  },
  {
    name: "JKKN College of Nursing",
    short_name: "JKKN CN",
    courses: ["B.Sc Nursing", "M.Sc Nursing"],
    branches: ["Nursing"]
  },
  {
    name: "JKKN Polytechnic College",
    short_name: "JKKN Poly",
    courses: ["Diploma"],
    branches: ["Mechanical", "Civil", "ECE", "EEE", "Computer"]
  },
  {
    name: "JKKN School of Allied Health Sciences",
    short_name: "JKKN SAHS",
    courses: ["B.Sc", "M.Sc"],
    branches: ["Medical Lab Technology", "Radiology", "Physiotherapy"]
  }
];

export type JKKNCollege = typeof jkknColleges[number];
