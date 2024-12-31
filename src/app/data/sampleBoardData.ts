// data/sampleJeopardyData.ts

export interface Question {
    points: number;
    clue: string;
    answer: string;
  }
  
  export interface Category {
    category: string;
    questions: Question[];
  }
  
  export interface JeopardyData {
    categories: Category[];
  }

  export interface InputQuestion {
    points: number;
    clue: string;
    answer: string;
  }
  
  export interface InputCategory {
    category: string;
    questions: InputQuestion[];
  }

  export interface ValidationErrors {
    [key: string]: string[];
}


export interface BoardPreview {
  id: string,
  alias: string | null,
  high_score: number | null,
  created_at: string
}

export interface AIJeopardyProps {
  onJeopardyDataGenerated: (data: JeopardyData, title: string) => void;
}

export interface EditableGameBoardProps {
  categories: Category[];
  onEditSave: (data: JeopardyData, title: string) => void;
  title: string
}
  
  export const sampleJeopardyData: JeopardyData = {
    categories: [
      {
        category: "Web Development",
        questions: [
          {
            points: 100,
            clue: "This markup language is the backbone of every web page",
            answer: "What is HTML?"
          },
          {
            points: 200,
            clue: "This JavaScript library, created by Facebook, is used for building user interfaces",
            answer: "What is React?"
          },
          {
            points: 300,
            clue: "This CSS framework created by Tailwind Labs uses utility classes for styling",
            answer: "What is Tailwind CSS?"
          },
          {
            points: 400,
            clue: "This package manager, created by Facebook, is an alternative to npm",
            answer: "What is Yarn?"
          },
          {
            points: 500,
            clue: "This Next.js feature allows you to pre-render pages at build time",
            answer: "What is Static Site Generation (SSG)?"
          }
        ]
      },
      {
        category: "Programming Basics",
        questions: [
          {
            points: 100,
            clue: "This data type can only have values of 'true' or 'false'",
            answer: "What is a boolean?"
          },
          {
            points: 200,
            clue: "This loop type starts with 'for' and is used to iterate over arrays",
            answer: "What is a for...of loop?"
          },
          {
            points: 300,
            clue: "This keyword is used to declare variables that can be reassigned",
            answer: "What is 'let'?"
          },
          {
            points: 400,
            clue: "This array method creates a new array with the results of calling a function for every array element",
            answer: "What is map()?"
          },
          {
            points: 500,
            clue: "This design pattern involves wrapping one function inside another to create a closure",
            answer: "What is a Higher-Order Function?"
          }
        ]
      },
      {
        category: "Computer Science",
        questions: [
          {
            points: 100,
            clue: "This data structure uses LIFO (Last In, First Out) principle",
            answer: "What is a Stack?"
          },
          {
            points: 200,
            clue: "This sorting algorithm has an average time complexity of O(n log n)",
            answer: "What is Quick Sort?"
          },
          {
            points: 300,
            clue: "This search algorithm repeatedly divides the search interval in half",
            answer: "What is Binary Search?"
          },
          {
            points: 400,
            clue: "This type of data structure uses nodes with references to next and previous elements",
            answer: "What is a Doubly Linked List?"
          },
          {
            points: 500,
            clue: "This problem-solving technique breaks down problems into smaller subproblems",
            answer: "What is Dynamic Programming?"
          }
        ]
      },
      {
        category: "Database Concepts",
        questions: [
          {
            points: 100,
            clue: "This SQL command is used to retrieve data from a database",
            answer: "What is SELECT?"
          },
          {
            points: 200,
            clue: "This type of database doesn't use traditional table relations",
            answer: "What is NoSQL?"
          },
          {
            points: 300,
            clue: "This operation combines rows from two or more tables based on a related column",
            answer: "What is JOIN?"
          },
          {
            points: 400,
            clue: "This property ensures database transactions are processed reliably",
            answer: "What is ACID?"
          },
          {
            points: 500,
            clue: "This technique improves database performance by storing frequently accessed data in memory",
            answer: "What is Caching?"
          }
        ]
      },
      {
        category: "Software Development",
        questions: [
          {
            points: 100,
            clue: "This version control system was created by Linus Torvalds",
            answer: "What is Git?"
          },
          {
            points: 200,
            clue: "This software development approach emphasizes iterative development",
            answer: "What is Agile?"
          },
          {
            points: 300,
            clue: "This practice involves automatically testing code when changes are made",
            answer: "What is Continuous Integration (CI)?"
          },
          {
            points: 400,
            clue: "This principle states that a class should have only one reason to change",
            answer: "What is Single Responsibility Principle?"
          },
          {
            points: 500,
            clue: "This architectural pattern separates an application into three interconnected components",
            answer: "What is Model-View-Controller (MVC)?"
          }
        ]
      }
    ]
  };