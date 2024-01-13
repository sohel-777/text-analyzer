# Text Analyzer

Text Analyzer is a simple free online tool for SEO web content analysis. It helps you analyze text input, providing insights such as the most frequent phrases and words, the number of characters, words, sentences, paragraphs, and estimated read and speak time of your content.

## Technologies Used

- React
- Axios
- localStorage

## How to Run

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Create a `.env` file in the root directory and add your Rapid API key:

   ```env
   REACT_APP_RAPID_API_KEY=your_rapid_api_key
   ```

5. Run `npm start` to start the development server.
6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to use the Text Analyzer.

## Project Structure

The project follows a modular structure, with components divided into separate files for better organization:

- **App.js:** The entry point of the application that renders the main `TextAnalyzer` component.
- **TextAnalyzer.js:** The main component that manages the tabs for Word Input and Paragraph, allowing users to switch between them.
- **WordTab.js:** A component responsible for word input, API requests, and displaying word details.
- **ParagraphTab.js:** A component handling paragraph input and providing details on the input text.
- **Table.js:** A reusable component for displaying tabular data, used in both WordTab and ParagraphTab.

## API Request Limit

Please note that the Word API used (Rapid API) is a freemium API with a limit of 2500 requests per day. To avoid exceeding this limit, the project includes an additional API request limit of 2000/day.

## Responsive Design

The project is designed to be responsive across different screen sizes, ensuring a seamless user experience on various devices.

Feel free to explore the world of words with Text Analyzer!
