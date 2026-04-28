import { BarChart3, Clock, Globe, Scan, ShieldCheck, Zap } from "lucide-react";
import React from "react";
import type { FeatureItem, NavItem, StatItem, TestimonialItem } from "./types";

export const NAV_LINKS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Enterprise", href: "#enterprise" },
];

export const FEATURES: FeatureItem[] = [
  {
    title: "Computer Vision Scanning",
    description:
      "Advanced OCR and image processing algorithms digitize handwritten essays and bubble sheets with 99.8% accuracy.",
    icon: <Scan className="w-6 h-6 text-primary-700" />,
  },
  {
    title: "Real-Time Evaluation",
    description:
      "Instantaneous processing means grades are ready seconds after submission, providing immediate feedback loops for students.",
    icon: <Zap className="w-6 h-6 text-primary-700" />,
  },
  {
    title: "Deep Analytics",
    description:
      "Move beyond simple scores. Identify knowledge gaps, track class trends, and visualize performance growth over time.",
    icon: <BarChart3 className="w-6 h-6 text-primary-700" />,
  },
  {
    title: "Standardized Criteria",
    description:
      "Ensure fairness with AI that applies consistent grading rubrics across every single paper, eliminating bias.",
    icon: <ShieldCheck className="w-6 h-6 text-primary-700" />,
  },
  {
    title: "Global Scalability",
    description:
      "Built for scale. Whether for a single classroom or a multinational corporation, our infrastructure adapts to your needs.",
    icon: <Globe className="w-6 h-6 text-primary-700" />,
  },
  {
    title: "Workload Reduction",
    description:
      "Reclaim hundreds of hours per semester. Let AI handle the grading while you focus on mentorship and instruction.",
    icon: <Clock className="w-6 h-6 text-primary-700" />,
  },
];

export const STATS: StatItem[] = [
  { value: "98%", label: "Reduction in Grading Time" },
  { value: "500k+", label: "Papers Processed Daily" },
  { value: "99.9%", label: "Accuracy Rate" },
  { value: "24/7", label: "System Availability" },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Evalua AI transformed how we handle midterms. What used to take our TAs a week is now done in an afternoon.",
    author: "Dr. Sarah Chen",
    role: "Department Head",
    organization: "Westville University",
  },
  {
    quote:
      "The consistency is unmatched. We no longer worry about grading fatigue affecting student outcomes.",
    author: "Marcus Thorne",
    role: "Director of Training",
    organization: "Apex Corporate Solutions",
  },
];
