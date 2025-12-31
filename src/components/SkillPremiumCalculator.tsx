import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, IndianRupee, TrendingUp, Briefcase, Sparkles, Star, ExternalLink, BookOpen, Video, GraduationCap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface LearningResource {
  title: string;
  provider: string;
  type: "course" | "video" | "certification";
  url: string;
  isFree?: boolean;
}

interface Skill {
  name: string;
  premium: number;
  demand: "high" | "medium" | "low";
  category: string;
  resources: LearningResource[];
}

interface CareerSkillData {
  id: string;
  title: string;
  color: string;
  baseSalary: number;
  skills: Skill[];
}

const careerSkillsData: CareerSkillData[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    color: "hsl(var(--primary))",
    baseSalary: 15,
    skills: [
      { name: "Cloud (AWS/GCP/Azure)", premium: 25, demand: "high", category: "Infrastructure", resources: [
        { title: "AWS Certified Solutions Architect", provider: "AWS", type: "certification", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", isFree: false },
        { title: "Google Cloud Fundamentals", provider: "Coursera", type: "course", url: "https://www.coursera.org/learn/gcp-fundamentals", isFree: false },
        { title: "Azure Fundamentals", provider: "Microsoft Learn", type: "course", url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/", isFree: true },
      ]},
      { name: "System Design", premium: 30, demand: "high", category: "Architecture", resources: [
        { title: "System Design Interview", provider: "YouTube - Gaurav Sen", type: "video", url: "https://www.youtube.com/c/GauravSensei", isFree: true },
        { title: "Grokking System Design", provider: "Educative", type: "course", url: "https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers", isFree: false },
        { title: "System Design Primer", provider: "GitHub", type: "course", url: "https://github.com/donnemartin/system-design-primer", isFree: true },
      ]},
      { name: "Kubernetes/Docker", premium: 20, demand: "high", category: "DevOps", resources: [
        { title: "Docker for Beginners", provider: "freeCodeCamp", type: "video", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo", isFree: true },
        { title: "Kubernetes CKA", provider: "Linux Foundation", type: "certification", url: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/", isFree: false },
        { title: "Learn Kubernetes", provider: "KodeKloud", type: "course", url: "https://kodekloud.com/courses/kubernetes-for-beginners/", isFree: false },
      ]},
      { name: "React/Next.js", premium: 15, demand: "high", category: "Frontend", resources: [
        { title: "React Official Tutorial", provider: "React.dev", type: "course", url: "https://react.dev/learn", isFree: true },
        { title: "Next.js 14 Complete Course", provider: "Vercel", type: "course", url: "https://nextjs.org/learn", isFree: true },
        { title: "Full Stack React", provider: "Udemy", type: "course", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", isFree: false },
      ]},
      { name: "Machine Learning", premium: 35, demand: "high", category: "AI/ML", resources: [
        { title: "Machine Learning Specialization", provider: "Coursera - Andrew Ng", type: "course", url: "https://www.coursera.org/specializations/machine-learning-introduction", isFree: false },
        { title: "Fast.ai Practical Deep Learning", provider: "Fast.ai", type: "course", url: "https://course.fast.ai/", isFree: true },
        { title: "ML Crash Course", provider: "Google", type: "course", url: "https://developers.google.com/machine-learning/crash-course", isFree: true },
      ]},
      { name: "Golang/Rust", premium: 25, demand: "medium", category: "Backend", resources: [
        { title: "Go by Example", provider: "Go.dev", type: "course", url: "https://gobyexample.com/", isFree: true },
        { title: "The Rust Book", provider: "Rust Foundation", type: "course", url: "https://doc.rust-lang.org/book/", isFree: true },
        { title: "Ultimate Go", provider: "Ardan Labs", type: "course", url: "https://www.ardanlabs.com/training/ultimate-go/", isFree: false },
      ]},
      { name: "GraphQL", premium: 10, demand: "medium", category: "API", resources: [
        { title: "GraphQL Tutorial", provider: "GraphQL.org", type: "course", url: "https://graphql.org/learn/", isFree: true },
        { title: "How to GraphQL", provider: "Prisma", type: "course", url: "https://www.howtographql.com/", isFree: true },
        { title: "Apollo GraphQL", provider: "Apollo", type: "course", url: "https://www.apollographql.com/tutorials/", isFree: true },
      ]},
      { name: "TypeScript", premium: 12, demand: "high", category: "Language", resources: [
        { title: "TypeScript Handbook", provider: "Microsoft", type: "course", url: "https://www.typescriptlang.org/docs/handbook/", isFree: true },
        { title: "Total TypeScript", provider: "Matt Pocock", type: "course", url: "https://www.totaltypescript.com/", isFree: false },
        { title: "TypeScript Deep Dive", provider: "GitHub", type: "course", url: "https://basarat.gitbook.io/typescript/", isFree: true },
      ]},
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    color: "hsl(280, 87%, 65%)",
    baseSalary: 20,
    skills: [
      { name: "Deep Learning (PyTorch/TF)", premium: 30, demand: "high", category: "AI/ML", resources: [
        { title: "Deep Learning Specialization", provider: "Coursera - DeepLearning.AI", type: "course", url: "https://www.coursera.org/specializations/deep-learning", isFree: false },
        { title: "PyTorch Official Tutorials", provider: "PyTorch", type: "course", url: "https://pytorch.org/tutorials/", isFree: true },
        { title: "TensorFlow Developer Certificate", provider: "Google", type: "certification", url: "https://www.tensorflow.org/certificate", isFree: false },
      ]},
      { name: "NLP/LLMs", premium: 40, demand: "high", category: "AI/ML", resources: [
        { title: "NLP Specialization", provider: "Coursera - DeepLearning.AI", type: "course", url: "https://www.coursera.org/specializations/natural-language-processing", isFree: false },
        { title: "Hugging Face Course", provider: "Hugging Face", type: "course", url: "https://huggingface.co/course", isFree: true },
        { title: "LLM University", provider: "Cohere", type: "course", url: "https://docs.cohere.com/docs/llmu", isFree: true },
      ]},
      { name: "MLOps", premium: 25, demand: "high", category: "Infrastructure", resources: [
        { title: "MLOps Specialization", provider: "Coursera - DeepLearning.AI", type: "course", url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops", isFree: false },
        { title: "Made With ML", provider: "Made With ML", type: "course", url: "https://madewithml.com/", isFree: true },
        { title: "MLflow Tutorial", provider: "MLflow", type: "course", url: "https://mlflow.org/docs/latest/tutorials-and-examples/index.html", isFree: true },
      ]},
      { name: "Computer Vision", premium: 28, demand: "medium", category: "AI/ML", resources: [
        { title: "CS231n Stanford", provider: "Stanford", type: "video", url: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv", isFree: true },
        { title: "OpenCV Python Tutorial", provider: "OpenCV", type: "course", url: "https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html", isFree: true },
        { title: "Deep Learning for CV", provider: "Coursera", type: "course", url: "https://www.coursera.org/learn/deep-learning-in-computer-vision", isFree: false },
      ]},
      { name: "Big Data (Spark)", premium: 20, demand: "medium", category: "Data", resources: [
        { title: "Apache Spark with Scala", provider: "Udemy", type: "course", url: "https://www.udemy.com/course/apache-spark-with-scala-hands-on-with-big-data/", isFree: false },
        { title: "Spark Documentation", provider: "Apache", type: "course", url: "https://spark.apache.org/docs/latest/", isFree: true },
        { title: "PySpark Tutorial", provider: "DataCamp", type: "course", url: "https://www.datacamp.com/tutorial/pyspark-tutorial-getting-started-with-pyspark", isFree: true },
      ]},
      { name: "Statistics/A-B Testing", premium: 15, demand: "high", category: "Analytics", resources: [
        { title: "Statistics with Python", provider: "Coursera", type: "course", url: "https://www.coursera.org/specializations/statistics-with-python", isFree: false },
        { title: "A/B Testing Guide", provider: "Evan Miller", type: "course", url: "https://www.evanmiller.org/ab-testing/", isFree: true },
        { title: "StatQuest", provider: "YouTube", type: "video", url: "https://www.youtube.com/c/joshstarmer", isFree: true },
      ]},
      { name: "SQL Advanced", premium: 10, demand: "high", category: "Data", resources: [
        { title: "Mode SQL Tutorial", provider: "Mode Analytics", type: "course", url: "https://mode.com/sql-tutorial/", isFree: true },
        { title: "SQL for Data Science", provider: "DataCamp", type: "course", url: "https://www.datacamp.com/tracks/sql-fundamentals", isFree: false },
        { title: "LeetCode SQL", provider: "LeetCode", type: "course", url: "https://leetcode.com/problemset/database/", isFree: true },
      ]},
      { name: "Cloud ML Services", premium: 18, demand: "medium", category: "Infrastructure", resources: [
        { title: "AWS Machine Learning", provider: "AWS", type: "certification", url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/", isFree: false },
        { title: "Google Cloud AI Platform", provider: "Google Cloud", type: "course", url: "https://cloud.google.com/ai-platform/docs", isFree: true },
        { title: "Azure ML Studio", provider: "Microsoft Learn", type: "course", url: "https://learn.microsoft.com/en-us/training/paths/create-machine-learn-models/", isFree: true },
      ]},
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    color: "hsl(142, 76%, 36%)",
    baseSalary: 18,
    skills: [
      { name: "Data Analytics", premium: 20, demand: "high", category: "Analytics", resources: [
        { title: "Google Data Analytics", provider: "Coursera", type: "certification", url: "https://www.coursera.org/professional-certificates/google-data-analytics", isFree: false },
        { title: "Product Analytics Fundamentals", provider: "Mixpanel", type: "course", url: "https://mixpanel.com/blog/product-analytics-guide/", isFree: true },
        { title: "Amplitude Analytics", provider: "Amplitude", type: "course", url: "https://academy.amplitude.com/", isFree: true },
      ]},
      { name: "Technical Background", premium: 25, demand: "high", category: "Technical", resources: [
        { title: "CS50 Introduction", provider: "Harvard/edX", type: "course", url: "https://cs50.harvard.edu/x/", isFree: true },
        { title: "Technical Product Management", provider: "Product School", type: "course", url: "https://productschool.com/product-management-certification/", isFree: false },
        { title: "APIs for PMs", provider: "Postman", type: "course", url: "https://www.postman.com/api-platform/api-design/", isFree: true },
      ]},
      { name: "AI/ML Knowledge", premium: 30, demand: "high", category: "Technical", resources: [
        { title: "AI for Everyone", provider: "Coursera - Andrew Ng", type: "course", url: "https://www.coursera.org/learn/ai-for-everyone", isFree: false },
        { title: "AI Product Management", provider: "Udacity", type: "course", url: "https://www.udacity.com/course/ai-product-manager-nanodegree--nd088", isFree: false },
        { title: "Elements of AI", provider: "University of Helsinki", type: "course", url: "https://www.elementsofai.com/", isFree: true },
      ]},
      { name: "Agile/Scrum Master", premium: 15, demand: "medium", category: "Process", resources: [
        { title: "Professional Scrum Master", provider: "Scrum.org", type: "certification", url: "https://www.scrum.org/professional-scrum-master-i-certification", isFree: false },
        { title: "Agile with Atlassian Jira", provider: "Coursera", type: "course", url: "https://www.coursera.org/learn/agile-atlassian-jira", isFree: false },
        { title: "Scrum Guide", provider: "Scrum.org", type: "course", url: "https://scrumguides.org/scrum-guide.html", isFree: true },
      ]},
      { name: "SQL/Python Basics", premium: 18, demand: "medium", category: "Technical", resources: [
        { title: "Python for Everybody", provider: "Coursera", type: "course", url: "https://www.coursera.org/specializations/python", isFree: false },
        { title: "SQLBolt", provider: "SQLBolt", type: "course", url: "https://sqlbolt.com/", isFree: true },
        { title: "Automate the Boring Stuff", provider: "Al Sweigart", type: "course", url: "https://automatetheboringstuff.com/", isFree: true },
      ]},
      { name: "UX Design", premium: 12, demand: "medium", category: "Design", resources: [
        { title: "Google UX Design", provider: "Coursera", type: "certification", url: "https://www.coursera.org/professional-certificates/google-ux-design", isFree: false },
        { title: "UX Design Fundamentals", provider: "Figma", type: "course", url: "https://www.figma.com/resources/learn-design/", isFree: true },
        { title: "Interaction Design Foundation", provider: "IDF", type: "course", url: "https://www.interaction-design.org/", isFree: false },
      ]},
      { name: "B2B SaaS Experience", premium: 22, demand: "high", category: "Domain", resources: [
        { title: "SaaS Metrics Masterclass", provider: "ChartMogul", type: "course", url: "https://chartmogul.com/resources/saas-metrics/", isFree: true },
        { title: "Product-Led Growth", provider: "ProductLed", type: "course", url: "https://productled.com/blog/product-led-growth-definition", isFree: true },
        { title: "B2B SaaS Product Management", provider: "Reforge", type: "course", url: "https://www.reforge.com/product-management-foundations", isFree: false },
      ]},
      { name: "Growth/PLG", premium: 20, demand: "high", category: "Strategy", resources: [
        { title: "Growth Series", provider: "Reforge", type: "course", url: "https://www.reforge.com/growth-series", isFree: false },
        { title: "Product-Led Growth Guide", provider: "OpenView", type: "course", url: "https://openviewpartners.com/product-led-growth/", isFree: true },
        { title: "Growth Engineering", provider: "Lenny's Newsletter", type: "course", url: "https://www.lennysnewsletter.com/", isFree: true },
      ]},
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Engineer",
    color: "hsl(0, 72%, 51%)",
    baseSalary: 18,
    skills: [
      { name: "Penetration Testing", premium: 30, demand: "high", category: "Offensive", resources: [
        { title: "OSCP Certification", provider: "Offensive Security", type: "certification", url: "https://www.offensive-security.com/pwk-oscp/", isFree: false },
        { title: "TryHackMe", provider: "TryHackMe", type: "course", url: "https://tryhackme.com/", isFree: true },
        { title: "Hack The Box", provider: "HTB", type: "course", url: "https://www.hackthebox.com/", isFree: true },
      ]},
      { name: "Cloud Security", premium: 35, demand: "high", category: "Infrastructure", resources: [
        { title: "AWS Security Specialty", provider: "AWS", type: "certification", url: "https://aws.amazon.com/certification/certified-security-specialty/", isFree: false },
        { title: "Cloud Security Alliance", provider: "CSA", type: "certification", url: "https://cloudsecurityalliance.org/education/ccsk/", isFree: false },
        { title: "Azure Security Engineer", provider: "Microsoft", type: "certification", url: "https://learn.microsoft.com/en-us/certifications/azure-security-engineer/", isFree: false },
      ]},
      { name: "SIEM/SOC", premium: 20, demand: "high", category: "Defensive", resources: [
        { title: "Splunk Fundamentals", provider: "Splunk", type: "course", url: "https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html", isFree: true },
        { title: "SOC Analyst Learning Path", provider: "TryHackMe", type: "course", url: "https://tryhackme.com/path/outline/soclevel1", isFree: true },
        { title: "Blue Team Training", provider: "LetsDefend", type: "course", url: "https://letsdefend.io/", isFree: true },
      ]},
      { name: "Threat Intelligence", premium: 25, demand: "medium", category: "Analysis", resources: [
        { title: "SANS Threat Intelligence", provider: "SANS", type: "course", url: "https://www.sans.org/cyber-security-courses/cyber-threat-intelligence/", isFree: false },
        { title: "MITRE ATT&CK", provider: "MITRE", type: "course", url: "https://attack.mitre.org/resources/training/", isFree: true },
        { title: "CTI Fundamentals", provider: "Recorded Future", type: "course", url: "https://www.recordedfuture.com/resources/cyber-threat-intelligence-training", isFree: true },
      ]},
      { name: "Compliance (ISO/SOC2)", premium: 18, demand: "medium", category: "Governance", resources: [
        { title: "ISO 27001 Lead Auditor", provider: "PECB", type: "certification", url: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001", isFree: false },
        { title: "SOC 2 Compliance Guide", provider: "Vanta", type: "course", url: "https://www.vanta.com/resources/soc-2-guide", isFree: true },
        { title: "CISA Certification", provider: "ISACA", type: "certification", url: "https://www.isaca.org/credentialing/cisa", isFree: false },
      ]},
      { name: "DevSecOps", premium: 28, demand: "high", category: "DevOps", resources: [
        { title: "DevSecOps Fundamentals", provider: "DevSecOps Academy", type: "course", url: "https://www.devsecops.org/", isFree: true },
        { title: "Snyk Learn", provider: "Snyk", type: "course", url: "https://learn.snyk.io/", isFree: true },
        { title: "OWASP DevSecOps", provider: "OWASP", type: "course", url: "https://owasp.org/www-project-devsecops-guideline/", isFree: true },
      ]},
      { name: "Malware Analysis", premium: 22, demand: "low", category: "Analysis", resources: [
        { title: "Malware Unicorn Workshops", provider: "Malware Unicorn", type: "course", url: "https://malwareunicorn.org/#/workshops", isFree: true },
        { title: "GREM Certification", provider: "SANS", type: "certification", url: "https://www.giac.org/certifications/reverse-engineering-malware-grem/", isFree: false },
        { title: "Practical Malware Analysis", provider: "Any.Run", type: "course", url: "https://any.run/", isFree: true },
      ]},
      { name: "Zero Trust Architecture", premium: 25, demand: "high", category: "Architecture", resources: [
        { title: "Zero Trust Security", provider: "NIST", type: "course", url: "https://www.nist.gov/publications/zero-trust-architecture", isFree: true },
        { title: "Google BeyondCorp", provider: "Google", type: "course", url: "https://cloud.google.com/beyondcorp", isFree: true },
        { title: "Zero Trust Fundamentals", provider: "Microsoft", type: "course", url: "https://learn.microsoft.com/en-us/security/zero-trust/", isFree: true },
      ]},
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    color: "hsl(221, 83%, 53%)",
    baseSalary: 16,
    skills: [
      { name: "Kubernetes Expert", premium: 30, demand: "high", category: "Orchestration", resources: [
        { title: "CKA Certification", provider: "Linux Foundation", type: "certification", url: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/", isFree: false },
        { title: "Kubernetes The Hard Way", provider: "Kelsey Hightower", type: "course", url: "https://github.com/kelseyhightower/kubernetes-the-hard-way", isFree: true },
        { title: "KodeKloud Kubernetes", provider: "KodeKloud", type: "course", url: "https://kodekloud.com/courses/kubernetes-for-beginners/", isFree: false },
      ]},
      { name: "Terraform/IaC", premium: 25, demand: "high", category: "Infrastructure", resources: [
        { title: "HashiCorp Terraform Associate", provider: "HashiCorp", type: "certification", url: "https://www.hashicorp.com/certification/terraform-associate", isFree: false },
        { title: "Terraform Tutorial", provider: "HashiCorp Learn", type: "course", url: "https://learn.hashicorp.com/terraform", isFree: true },
        { title: "Pulumi Fundamentals", provider: "Pulumi", type: "course", url: "https://www.pulumi.com/learn/", isFree: true },
      ]},
      { name: "CI/CD Pipelines", premium: 20, demand: "high", category: "Automation", resources: [
        { title: "GitHub Actions", provider: "GitHub", type: "course", url: "https://docs.github.com/en/actions/learn-github-actions", isFree: true },
        { title: "Jenkins Pipeline", provider: "Jenkins", type: "course", url: "https://www.jenkins.io/doc/book/pipeline/", isFree: true },
        { title: "GitLab CI/CD", provider: "GitLab", type: "course", url: "https://docs.gitlab.com/ee/ci/", isFree: true },
      ]},
      { name: "Multi-Cloud", premium: 28, demand: "high", category: "Infrastructure", resources: [
        { title: "Multi-Cloud Architecture", provider: "Google Cloud", type: "course", url: "https://cloud.google.com/learn/what-is-multicloud", isFree: true },
        { title: "Cloud Agnostic Design", provider: "A Cloud Guru", type: "course", url: "https://acloudguru.com/", isFree: false },
        { title: "HashiCorp Consul", provider: "HashiCorp", type: "course", url: "https://learn.hashicorp.com/consul", isFree: true },
      ]},
      { name: "GitOps (ArgoCD)", premium: 18, demand: "medium", category: "Deployment", resources: [
        { title: "ArgoCD Tutorial", provider: "Argo Project", type: "course", url: "https://argo-cd.readthedocs.io/en/stable/getting_started/", isFree: true },
        { title: "GitOps Fundamentals", provider: "Codefresh", type: "course", url: "https://codefresh.io/learn/gitops/", isFree: true },
        { title: "Flux CD", provider: "Flux", type: "course", url: "https://fluxcd.io/flux/get-started/", isFree: true },
      ]},
      { name: "Observability Stack", premium: 22, demand: "high", category: "Monitoring", resources: [
        { title: "Prometheus & Grafana", provider: "Prometheus", type: "course", url: "https://prometheus.io/docs/tutorials/", isFree: true },
        { title: "Datadog Fundamentals", provider: "Datadog", type: "course", url: "https://learn.datadoghq.com/", isFree: true },
        { title: "OpenTelemetry", provider: "CNCF", type: "course", url: "https://opentelemetry.io/docs/", isFree: true },
      ]},
      { name: "Security Automation", premium: 25, demand: "medium", category: "Security", resources: [
        { title: "DevSecOps Pipeline", provider: "OWASP", type: "course", url: "https://owasp.org/www-project-devsecops-guideline/", isFree: true },
        { title: "Vault Fundamentals", provider: "HashiCorp", type: "course", url: "https://learn.hashicorp.com/vault", isFree: true },
        { title: "Container Security", provider: "Aqua Security", type: "course", url: "https://www.aquasec.com/cloud-native-academy/", isFree: true },
      ]},
      { name: "Platform Engineering", premium: 32, demand: "high", category: "Architecture", resources: [
        { title: "Platform Engineering", provider: "Humanitec", type: "course", url: "https://platformengineering.org/", isFree: true },
        { title: "Backstage Tutorial", provider: "Spotify", type: "course", url: "https://backstage.io/docs/getting-started/", isFree: true },
        { title: "Internal Developer Platform", provider: "CNCF", type: "course", url: "https://internaldeveloperplatform.org/", isFree: true },
      ]},
    ],
  },
];

const demandColors = {
  high: "bg-green-500/20 text-green-700 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  low: "bg-red-500/20 text-red-700 border-red-500/30",
};

const SkillPremiumCalculator = () => {
  const [selectedCareer, setSelectedCareer] = useState<string>("software-engineer");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const career = careerSkillsData.find((c) => c.id === selectedCareer)!;

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const calculation = useMemo(() => {
    const selectedSkillData = career.skills.filter((s) => selectedSkills.includes(s.name));
    
    // Calculate total premium with diminishing returns for stacking
    let totalPremium = 0;
    selectedSkillData
      .sort((a, b) => b.premium - a.premium)
      .forEach((skill, index) => {
        // Each subsequent skill adds less (diminishing returns)
        const factor = Math.pow(0.85, index);
        totalPremium += skill.premium * factor;
      });

    const boostedSalary = career.baseSalary * (1 + totalPremium / 100);
    const absoluteBoost = boostedSalary - career.baseSalary;

    return {
      baseSalary: career.baseSalary,
      totalPremium: Math.round(totalPremium),
      boostedSalary: Math.round(boostedSalary * 10) / 10,
      absoluteBoost: Math.round(absoluteBoost * 10) / 10,
      skillCount: selectedSkillData.length,
    };
  }, [career, selectedSkills]);

  // Group skills by category
  const skillsByCategory = useMemo(() => {
    const grouped: Record<string, Skill[]> = {};
    career.skills.forEach((skill) => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    return grouped;
  }, [career]);

  // Reset selected skills when career changes
  const handleCareerChange = (careerId: string) => {
    setSelectedCareer(careerId);
    setSelectedSkills([]);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Zap className="w-4 h-4 mr-2" />
            Skill Premium
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Skill Premium Calculator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how in-demand skills can boost your salary above the baseline. Select skills you have or plan to learn.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skills Selection Panel */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader className="bg-muted/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Select Your Skills
                  </CardTitle>
                  <Select value={selectedCareer} onValueChange={handleCareerChange}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {careerSkillsData.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: c.color }}
                            />
                            {c.title}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {Object.entries(skillsByCategory).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {category}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {skills.map((skill) => (
                          <div
                            key={skill.name}
                            className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedSkills.includes(skill.name)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => toggleSkill(skill.name)}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={selectedSkills.includes(skill.name)}
                                onCheckedChange={() => toggleSkill(skill.name)}
                              />
                              <div>
                                <p className="text-sm font-medium">{skill.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant="outline"
                                    className={`text-[10px] ${demandColors[skill.demand]}`}
                                  >
                                    {skill.demand} demand
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="font-bold"
                              style={{ color: career.color }}
                            >
                              +{skill.premium}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Salary Boost Card */}
            <Card
              className="border-2 overflow-hidden"
              style={{ borderColor: `${career.color}40` }}
            >
              <CardHeader
                className="py-4"
                style={{ backgroundColor: `${career.color}15` }}
              >
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IndianRupee className="w-5 h-5" style={{ color: career.color }} />
                  Your Boosted Salary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Base Salary */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Base Salary</span>
                  <span className="font-medium">₹{calculation.baseSalary} LPA</span>
                </div>

                {/* Skill Premium */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Skill Premium ({calculation.skillCount} skills)
                  </span>
                  <span className="font-bold text-green-600">
                    +{calculation.totalPremium}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Progress
                    value={Math.min(calculation.totalPremium, 100)}
                    className="h-3"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Premium Meter (max ~100%)
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t pt-4">
                  {/* Boosted Salary */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Estimated Salary
                    </p>
                    <p
                      className="text-4xl font-bold"
                      style={{ color: career.color }}
                    >
                      ₹{calculation.boostedSalary} LPA
                    </p>
                    {calculation.absoluteBoost > 0 && (
                      <Badge variant="secondary" className="mt-2">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +₹{calculation.absoluteBoost}L boost
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Skills Suggestion */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Top Skills to Learn
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-2">
                  {career.skills
                    .filter((s) => !selectedSkills.includes(s.name))
                    .sort((a, b) => b.premium - a.premium)
                    .slice(0, 3)
                    .map((skill, index) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => toggleSkill(skill.name)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                          <span className="text-sm">{skill.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          +{skill.premium}%
                        </Badge>
                      </div>
                    ))}
                </div>
                {selectedSkills.length === career.skills.length && (
                  <p className="text-sm text-center text-muted-foreground mt-4">
                    🎉 You have all the skills!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Premiums have diminishing returns when stacking multiple skills. 
                  Actual salaries vary by company, location, and experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Learning Resources Section */}
        {selectedSkills.length > 0 && (
          <div className="mt-8">
            <Card className="border-2">
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Learning Resources for Your Selected Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {career.skills
                    .filter((skill) => selectedSkills.includes(skill.name))
                    .map((skill) => (
                      <div key={skill.name} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" style={{ backgroundColor: `${career.color}20`, color: career.color }}>
                            {skill.name}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            +{skill.premium}% premium
                          </Badge>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {skill.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-start gap-3 p-3 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                {resource.type === "video" && <Video className="w-4 h-4 text-red-500" />}
                                {resource.type === "course" && <BookOpen className="w-4 h-4 text-blue-500" />}
                                {resource.type === "certification" && <GraduationCap className="w-4 h-4 text-purple-500" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                  {resource.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground">{resource.provider}</span>
                                  {resource.isFree && (
                                    <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 border-green-500/30">
                                      Free
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
                
                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>Courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-500" />
                    <span>Videos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-500" />
                    <span>Certifications</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillPremiumCalculator;
