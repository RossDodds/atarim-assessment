# Frontend Take-Home Assessment: Interactive Task Dashboard

**Time Allocation: 60 minutes**
**Tech Stack:** React 18+ • TypeScript • Vite • Tailwind CSS • Framer Motion

## Overview

Build an interactive task management component that demonstrates your frontend skills, design sensibility, and animation expertise. This assessment focuses on modern React patterns, TypeScript proficiency, and creating delightful user experiences through thoughtful animations and micro-interactions.

## Setup

We've provided a Vite + React + TypeScript starter with all dependencies configured:

```bash
git clone [repository-url]
cd frontend-assessment
npm install
npm run dev
```

## DEMO (https://atarim-assessment.vercel.app)

**Design descisions:**

## For the task manager I opted to go with a simplisitic minimal design, this was to reduce time needed when implementing boilerplate and reduce visual complexity. Where possible I attempted to match spacing and borders to the rest of the example app for consistency. I also included some simple form validation for required fields and ensured the components were accessibile on mobile. I also opted to show priority through border colours rather than animations to keep that seperate.

**Animation Choices rationale:**

## For animations I included those that provide visual feedback to the user, including button hovers and component transitions, this is to aid in user understanding when performing actions to clarify updates to the state. I opted to keep animaions related to changes in business logic, adding other various animations to improve visuals such as pulses on items for priority might be confusing. 

**Time breakdown:**

## The time spent matched closely with the suggested example with a few small differences based on personal preferences.

1. **Planning Phase (15 minutes)**
   ## Spent some time quickly planning out business logic for CRUD operations and component hierarchy, spent slightly longer than suggested as I wasn't sure how to best keep the list items tidy. eventually decided on making them collapseable
3. **Core Implementation (30 minutes)**
   ## Implemented the feature in stages, first I created the types and hooks to use it, then I created the base compoent to hold the TaskManager. Then I worked on the creation form and hooked it up to the earlier created hook.
4. **Enhancement Phase (10 minutes)**
   ## Finally I implemented the list and listItem components, while working on these I tested the logic for the useTasks hooks and ensured it persisted, I also then made final checks to make sure styling was correct on multiple screen sizes
5. **Review Phase (5 minutes)**
   ## Created the final PR and did one last check to make sure none of the styling had broken, then went through file changes and did a final scan of submitted code to remove any testing data.
  
**Known limitations or trade-offs:**

## I had itinitally planned to include a dialog box prompting the user to confirm their choice to delete items but when getting the code ready to submit I accidently removed this logic. To be fair to the time constraints I won't go back to add this in. If I had more time I would like to have included more functionality such as having a context/provider for the task tracking state. This could then be used throughout the app to view and manipulate the data without having to worry about passing it around so much. It could then be fetched and inistalised once when the app started rather than every time the screen is accessed. I decided to reduce the animations to those related to business logic / state changes. 

## Also based off the commits I went slightly over time however this also included me looking into submission details and reading through the prompt
