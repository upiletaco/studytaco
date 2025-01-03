import { Clock } from "./illustrations/Clock";
import GradCap from "./illustrations/GradCap";
import Review from "./illustrations/Review";
import { StopSign } from "./illustrations/StopSign";
import StudyGroup from "./illustrations/StudyGroup";
import { GeometricTaco } from "./illustrations/Taco";

export const SurveyQuestions = [
  {
    id: 1,
    question: "What’s your main goal for using Study Taco?",
    options: [
      "Improve test scores",
      "Build consistent study habits",
      "Understand material more deeply",
    ],
    illustration: GeometricTaco,
  },
  {
    id: 1,
    question: "What are your biggest blockers from studying?",
    options: [
      "Unmotivated",
      "Difficulty Understanding",
      "Unorganized Schedule",
      "Easily Distracted",
    ],
    illustration: StopSign,
  },
  {
    id: 1,
    question: "When is your next exam?",
    options: ["Tomorrow", "This Week", "Next Week", "This Month", "Later"],
    illustration: Clock,
  },
  {
    id: 1,
    question: "How often do you review previous material?",
    options: ["Daily", "Weekly", "Monthly", "Rarely"],
    illustration: Review,
  },
  {
    id: 1,
    question: "What kind of student are you?",
    options: ["High School", "College", "Adult", "Other"],
    illustration: GradCap,
  },
  {
    id: 1,
    question: "Who do you study with?",
    options: ["Alone", "With a friend", "In a group"],
    illustration: StudyGroup,
  },
];
