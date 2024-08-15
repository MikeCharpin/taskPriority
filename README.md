# 🌷 Tulip Tasks 🌷

Welcome to Tulip Tasks! Below is a detailed guide to help you get started with our app.

## Introduction

Tulip Tasks is designed to assist you in managing your tasks, projects, and goals effectively. If you often find yourself overwhelmed with a lot on your plate and struggle to decide what to prioritize, Tulip Tasks is here to help. The app allows you to organize your tasks, projects, and long-term goals efficiently, providing suggestions on what you should focus on based on the data you input.

https://task-priority.vercel.app/

---

## Key Features

- **Task Organization**: Easily categorize your tasks into goals, projects, and tasks, each with its own timeframe and priority level.

- **Priority Scoring**: Assign priority levels to your goals and projects based on their importance to you. The app uses a scoring system that considers factors such as excitement level, complexity, and target dates to generate a prioritized list of tasks for you.

- **Dynamic Scoring System**: Automatically calculates and ranks projects based on complexity, excitement, and importance, ensuring that high-priority tasks are always front and center.

- **Persistent Data**: Your data is securely stored, allowing you to log in anytime and access your tasks and projects. The app ensures that you always have a clear view of your priorities, even if you haven't used it for a while.

- **Offline Mode**: Stores goals, projects, and tasks in local storage, allowing users to work offline and sync with the backend once online.

- **Responsive Design**: Adapts seamlessly to different screen sizes, with custom views for desktop and mobile devices.

- **Magic Link Authentication**: Uses Supabase to send a secure login link via email, streamlining the user authentication process.

- **Feedback Mechanism**: We value your feedback! Use the "Send Feedback" button to share your suggestions, report bugs, or request new features. Your input helps us improve Tulip Tasks and make it more useful for everyone.

---

---

# Tulip Tasks User Instructions

**Welcome to Tulip Tasks!** This guide will help you understand how to use the app to prioritize and manage your tasks effectively.

## 1. Overview of Tulip Tasks

Tulip Tasks is designed to help you manage a large workload by organizing your tasks, projects, and goals, and suggesting priorities based on the information you provide.

## 2. Understanding the Structure

- **Goals:** These are your long-term objectives, typically things you want to achieve within one to six months or longer.
- **Projects:** These are medium-term tasks that may take days to weeks to complete. Projects fall under your goals.
- **Tasks:** The smallest units, these are individual actions that take less than a day to accomplish and are part of your projects.

## 3. Adding and Editing Goals

- To add or edit a goal, use the Goal Form.
- Each goal is rated based on:
  - **Complexity:** How difficult the goal is (e.g., piece of cake, requires some tools, rocket science).
  - **Excitement Level:** How you feel about the goal (e.g., pumped, neutral, anxious).
- The larger the goal and the more excited you are, the higher the score.

## 4. Managing Projects

- Projects can be added or edited similarly to goals.
- You can assign a target date to each project to help track deadlines.
- Projects also use the same complexity and excitement metrics as goals to help prioritize them.

## 5. Tasks

- Tasks are the specific actions required to complete a project.
- Although tasks don’t affect the scoring, they help you keep track of your daily to-dos and set up future features.

## 6. Prioritizing with the How About List

- The How About List is your dynamically generated priority list.
- Priorities are determined based on the input data, with higher scores pushing items to the top of the list.
- This list reflects the importance and urgency of your goals and projects.

## 7. Adjusting Priorities

- You can modify your priorities by updating the importance levels of your goals and projects.
- As you adjust, the How About List recalculates and reorganizes to reflect your current priorities.

## 8. Getting Started

- When you first log in, you’ll see the app in offline mode.
- Click the **Login** button, enter your email address, and you’ll receive an email to create an account.
- Once logged in, your data will be saved, allowing you to access and update it anytime.

## 9. Providing Feedback

- Use the **Send Feedback** button to submit suggestions, report bugs, or share your thoughts via a Google Form.

## 10. Final Notes

- Tulip Tasks is designed to be a practical tool to help you manage and prioritize your workload.
- Feel free to explore the app, and let us know how it can be improved to better meet your needs.

Thank you for using Tulip Tasks!

---

---

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Supabase
- **State Management**: React useState, useEffect
- **Responsive Design**: Media queries with @react-hook/media-query
- **UI Components**: Custom-built UI components with TailwindCSS
- **Authentication**: Supabase Auth with Magic Link

---

## Conclusion

Thank you for choosing Tulip Tasks to streamline your task management process. We're committed to providing you with a valuable and intuitive tool for staying organized and focused on your goals. If you have any questions or need assistance, don't hesitate to reach out. Enjoy using Tulip Tasks!
