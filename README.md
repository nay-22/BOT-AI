# BOT-AI
AI Chat Application | ChatGPT-like frontend interface | React

### Link: **https://bot-1eqmgnsh7-nayans-projects-ca58165e.vercel.app**

**Note**: This frontend-only app is built using React and has no backend components. It uses a JSON file as sample data for the frontend use case. The questions entered are matched to the questions in the JSON file based on the similarity index to filter out the most relevant answer when matched with a similarity of greater than 0.5.

## Techstack
- React + Javascript

## Libraries/Packages
- Material UI (MUI)
- React Router
- String Similarity (string-similarity)
- Notistack

## Features
- ChatGPT-like conversation window
- Rating and Feedback functionality for each response
- Save chat functionality (past conversations window)
- Filtering past conversations based on rating/feedback and timestamp
- Responsive design
- Dark mode

## Limitations
- No backend => no auth
- Saved conversation cannot be re-saved due to the functionality being based on the last index of previously saved conversations. While the rating of the previously saved conversations is possible, the data will only persist in the local state but not in the local storage when attempted to save once again.

## Nitpicks/Improvements
- Enforcement of better component modularity
- Enforcement of a richer filter set
- Enforcement of better-organized theme
- Enforcement of better state management (Rating buttons visibility, etc..)

## Local Installation
- ```bash
  git clone https://github.com/nay-22/BOT-AI.git
- ```bash
  cd BOT-AI
- ```bash
  npm install
- ```bash
  npm run dev
- ```bash
  http://localhost:5173/
  
## Implementation
- **Landing Page**
  ![image](https://github.com/user-attachments/assets/88480fcc-4493-412a-aa7f-6da3ab79f5ad)
- **Conversation Window**
  ![image](https://github.com/user-attachments/assets/63d7add4-7e96-445e-8b11-0ce2a34d670e)
- **Positive Rating Of Response**
  ![image](https://github.com/user-attachments/assets/507c543c-9f68-45eb-9343-2102e1bd318d)
- **Negative Feedback Of Response**
  ![image](https://github.com/user-attachments/assets/89eed80b-2ed3-48fa-9daa-570ce2579e1c)
- **Save Chat**
  ![image](https://github.com/user-attachments/assets/13db5947-348f-4816-af4b-f2fcf20da9df)
- **Past Conversations Window**
  ![image](https://github.com/user-attachments/assets/98fc385a-cd78-4fc3-8ef0-3473945d5412)
- **Filter Past Conversations  (Dark Mode)**
  ![image](https://github.com/user-attachments/assets/fdc8577e-cdfc-416c-96b7-14271e8fe010)
  - Filtered by 4 stars
    ![image](https://github.com/user-attachments/assets/e7060de5-6c60-4d3a-8bc6-1c65db4a8e25)
  - Filtered by Negative Feedback
    ![image](https://github.com/user-attachments/assets/dfea5346-b73a-4451-85f2-d8e26f583a7a)
- **Responsive Design**
  <video width="630" height="300" src="https://github.com/user-attachments/assets/df041691-3957-4d87-b77b-2a18b4b0b7f3"></video>





