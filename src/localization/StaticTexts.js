
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { colors } from '../theme/Colors'
import { units } from '../theme/Units'
import Fonts from '../theme/Fonts'
import BrainIcon from '../../src/assets/svgs/brain.svg'
import Settings from '../../src/assets/svgs/settings.svg'
import QuestionMarkIcon from '../../src/assets/svgs/questionMark.svg'
import SendIcon from '../../src/assets/svgs/send.svg'
import RightArrowIcon from '../../src/assets/svgs/right-arrow.svg'


export const HowDoesItWorkText = [
    {
        title: "Q&A",
        description: "Answer questions based on existing knowledge.",
        question: "Where is the Valley of Kings?",
        answer: "The Valley of Kings is located in Luxor, Egypt."
    },
    {
        title: "Grammar correction",
        description: "Corrects sentences into standard English.",
        question: "Correct this to standard English:\n\nShe no went to the market.",
        answer: "She did not go to the market."
    },
    {
        title: "Summarize for a 2nd grader",
        description: "Translates difficult text into simpler concepts",
        question: "Summarize this for a second-grade student:\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.",
        answer: "Jupiter is the fifth planet from the Sun and is very big and bright. It can be seen with our eyes in the night sky and it has been known since ancient times. Its name comes from the Roman god Jupiter. It is usually the third brightest object in the night sky after the Moon and Venus."
    },
    {
        title: "Text to command",
        description: "Translate text into programmatic commands.",
        question: "Convert this text to a programmatic command:\n\nExample: Ask Constance if we need some bread\nOutput: send-msg `find constance` Do we need some bread?\n\nReach out to the ski store and figure out if I can get my skis fixed before I leave on Thursday",
        answer: "send-msg `find ski store` Can I get my skis fixed before I leave on Thursday?"
    },
    {
        title: "English to other languages",
        description: "Translates English text into French, Spanish and Japanese.",
        question: "Translate this into 1. French, 2. Spanish and 3. Japanese:\n\nWhat rooms do you have available?\n\n1.",
        answer: "Quels sont les chambres que vous avez disponibles?\n2. ¿Qué habitaciones tienes disponibles?\n3. どの部屋が利用可能ですか？"
    },
    {
        title: "Parse unstructured data",
        description: "Create tables from long form text by specifying a structure and supplying some examples.",
        question: "A table summarizing the fruits from Goocrux:\nThere are many fruits that were found on the recently discovered planet Goocrux. There are neoskizzles that grow there, which are purple and taste like candy. There are also loheckles, which are a grayish blue fruit and are very tart, a little bit like a lemon. Pounits are a bright green color and are more savory than sweet. There are also plenty of loopnovas which are a neon pink flavor and taste like cotton candy. Finally, there are fruits called glowls, which have a very sour and bitter taste which is acidic and caustic, and a pale orange tinge to them.\n\n| Fruit | Color | Flavor |",
        answer: "| Neoskizzles | Purple | Candy |\n| Loheckles | Grayish Blue | Tart, like a lemon |\n| Pounits | Bright Green | Savory |\n| Loopnovas | Neon Pink | Cotton Candy |\n| Glowls | Pale Orange | Sour and Bitter, Acidic and Caustic |"
    },
    {
        title: "Classification",
        description: "Classify items into categories via example.",
        question: "The following is a list of companies and the categories they fall into:\n\nApple, Facebook, Fedex\n\nApple\nCategory:",
        answer: "Technology\n\nFacebook\nCategory: Social Media\n\nFedex\nCategory: Delivery"
    },
    {
        title: "Movie to Emoji",
        description: "Convert movie titles into emoji.",
        question: "Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \nStar Wars:",
        answer: "⭐️⚔"
    },
    {
        title: "Advanced tweet classifier",
        description: "This is an advanced prompt for detecting sentiment. It allows you to provide it with a list of status updates and then provide a sentiment for each one.",
        question: `Classify the sentiment in these tweets:\n\n1. "I can't stand homework"\n2. "This sucks. I'm bored 😠"\n3. "I can't wait for Halloween!!!"\n4. "My cat is adorable ❤️❤️"\n5. "I hate chocolate"\n\nTweet sentiment ratings:`,
        answer: "1. Negative\n2. Negative\n3. Positive\n4. Positive\n5. Negative"
    },
    {
        title: "Factual answering",
        description: "Guide the model towards factual answering by showing it how to respond to questions that fall outside its knowledge base. Using a '?' to indicate a response to words and phrases that it doesn't know provides a natural response that seems to work better than more abstract replies.",
        question: "What's a language model?",
        answer: "A language model is a type of artificial intelligence that uses statistical techniques to predict the probability of a sequence of words."
    },
    {
        title: "Ad from product description",
        description: "Turn a product description into ad copy.",
        question: "Write a creative ad for the following product to run on Facebook aimed at parents:\n\nProduct: Learning Room is a virtual environment to help students from kindergarten to high school excel in school.",
        answer: "Are you looking for a way to give your child a head start in school? Look no further than Learning Room! Our virtual environment is designed to help students from kindergarten to high school excel in their studies. Our unique platform offers personalized learning plans, interactive activities, and real-time feedback to ensure your child is getting the most out of their education. Give your child the best chance to succeed in school with Learning Room!"
    },
    {
        title: "Product name generator",
        description: "Create product names from examples words. Influenced by a community prompt.",
        question: "Product description: A pair of shoes that can fit any foot size.\nSeed words: adaptable, fit, omni-fit.",
        answer: "Product names: AdaptFit, OmniSecure, Fit-All, AdaptShoes."
    },
    {
        title: "TL;DR summarization",
        description: "Summarize text by adding a 'tl;dr:' to the end of a text passage. It shows that the API understands how to perform a number of tasks with no instructions.",
        question: "A neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich.[1] Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars.[2] Neutron stars have a radius on the order of 10 kilometres (6.2 mi) and a mass of about 1.4 solar masses.[3] They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.\n\nTl;dr",
        answer: "Neutron stars are the collapsed cores of massive supergiant stars, with a radius of around 10 kilometres and a mass of 1.4 solar masses. They are formed from the supernova explosion of a massive star combined with gravitational collapse, compressing the core beyond white dwarf star density."
    },
    {
        title: "Spreadsheet creator",
        description: "Create spreadsheets of various kinds of data. It's a long prompt but very versatile. Output can be copy+pasted into a text file and saved as a .csv with pipe separators.",
        question: "A two-column spreadsheet of top science fiction movies and the year of release:\n\nTitle |  Year of release",
        answer: "Alien | 1979 \nBlade Runner | 1982 \nThe Terminator | 1984 \nThe Matrix | 1999 \n Avatar | 2009 \nInterstellar | 2014 \nEx Machina | 2015 \n Arrival | 2016 \nReady Player One | 2018"
    },
    {
        title: "JavaScript helper chatbot",
        description: "This is a message-style chatbot that can answer questions about using JavaScript. It uses a few examples to get the conversation started.",
        question: "You: How do you make an alert appear after 10 seconds?\nJavaScript chatbot",
        answer: ": You can use the setTimeout() method."
    },
    {
        title: "Science fiction book list maker",
        description: "This makes a list of science fiction books and stops when it reaches #10.",
        question: "List 10 science fiction books:",
        answer: "1. 1984 by George Orwell\n2. The War of the Worlds by H.G. Wells\n3. Dune by Frank Herbert\n4. Frankenstein by Mary Shelley\n5. Ender's Game by Orson Scott Card\n6. The Hitchhiker's Guide to the Galaxy by Douglas Adams\n7. The Martian Chronicles by Ray Bradbury\n8. Brave New World by Aldous Huxley \n 9. Do Androids Dream of Electric Sheep? By Philip K Dick \n10. I, Robot by Isaac Asimov"
    },
    {
        title: "Tweet classifier",
        description: "This is a basic prompt for detecting sentiment.",
        question: `Decide whether a Tweet's sentiment is positive, neutral, or negative.\n\nTweet: "I loved the new Batman movie!"\nSentiment:`,
        answer: "Positive"
    },
    {
        title: "Airport code extractor",
        description: "A simple prompt for extracting airport codes from text.",
        question: `Text: "I want to fly from Orlando to Boston"\nAirport codes:`,
        answer: "MCO, BOS"
    },
    {
        title: "SQL request",
        description: "Create simple SQL queries.",
        question: "Create a SQL request to find all users who live in California and have over 1000 credits:",
        answer: "SELECT *\nFROM users\nWHERE state = 'California' AND credits > 1000;"
    },
    {
        title: "Extract contact information",
        description: "Extract contact information from a block of text.",
        question: "Extract the name and mailing address from this email:\n\n Dear Kelly,\nIt was great to talk to you at the seminar. I thought Jane's talk was quite good.\n\nThank you for the book. Here's my address 2111 Ash Lane, Crestview CA 92002\n\n Best,\n\nMaya\n\n Name:",
        answer: "Maya\nMailing Address: 2111 Ash Lane, Crestview CA 92002"
    },
    {
        title: "Friend chat",
        description: "Emulate a text message conversation.",
        question: "You: What have you been up to?\nFriend: Watching old movies.\nYou: Did you watch anything interesting?\nFriend:",
        answer: "Yeah, I watched an old classic called Casablanca. It was really good!"
    },
    {
        title: "Mood to color",
        description: "Turn a text description into a color.",
        question: "The CSS code for a color like a blue sky at dusk:\n\nbackground-color: #",
        answer: "3A5F9F"
    },
    {
        title: "JavaScript one line function",
        description: "Turn a JavaScript function into a one liner.",
        question: "Use list comprehension to convert this into one line of JavaScript:\n\ndogs.forEach((dog) => {\n   car.push(dog);\n});\n\nJavaScript one line version:",
        answer: "dogs.forEach(dog => car.push(dog))"
    },
    {
        title: "Micro horror story creator",
        description: "Creates two to three sentence short horror stories from a topic input.",
        question: "Topic: Wind\nTwo-Sentence Horror Story:",
        answer: "The wind howled through the night, shaking the windows of the house with a sinister force. As I stepped outside, I could feel it calling out to me, beckoning me to follow its chilling path."
    },
    {
        title: "Third-person converter",
        description: "Converts first-person POV to the third-person. This is modified from a community prompt to use fewer examples.",
        question: "Convert this from first-person to third person (gender female):\n\nI decided to make a movie about Ada Lovelace.",
        answer: "She decided to make a movie about Ada Lovelace."
    },
    {
        title: "Notes to summary",
        description: "Turn meeting notes into a summary.",
        question: "Convert my short hand into a first-hand account of the meeting:\n\nTom: Profits up 50%\nJane: New servers are online\nKjel: Need more time to fix software\nJane: Happy to help\nParkman: Beta testing almost done",
        answer: "At the meeting, Tom reported that profits had increased by 50%. Jane then mentioned that the new servers were online. Kjel mentioned that they needed more time to fix the software, and Jane offered to help. Finally, Parkman reported that the beta testing was almost done."
    },
    {
        title: "VR fitness idea generator",
        description: "Create ideas for fitness and virtual reality games.",
        question: "Brainstorm some ideas combining VR and fitness:",
        answer: "1. Virtual reality-based fitness classes \n2. Home workout programs using virtual reality technology \n3. Interactive video game-style workouts with a virtual trainer \n4. Virtual running races against other players in VR worlds \n5. Immersive yoga and Pilates sessions set in exotic locations \n6. Sports simulations involving simulated physical activity within the VR world \n7. Group fitness challenges that involve competing against opponents in a virtual environment  \n8. Adaptive exercise programs tailored to individual’s goals or health conditions"
    },
    {
        title: "ESRB rating",
        description: "Categorize text based upon ESRB ratings.",
        question: `Provide an ESRB rating for the following text:\n\n"i'm going to blow your brains out with my ray gun then stomp on your guts."\n\nESRB rating:`,
        answer: "M (Mature)"
    },
    {
        title: "Essay outline",
        description: "Generate an outline for a research topic.",
        question: "Create an outline for an essay about Nikola Tesla and his contributions to technology:",
        answer: "I. Introduction\nA. Who was Nikola Tesla?\nB. Overview of his contributions to technology\n\nII. Early Life and Education\nA. Where and when Tesla was born\nB. His education and early career\n\nIII. Tesla's Contributions to Technology\nA. Alternating Current\nB. Radio and Remote Control\nC. Robotics\nD. X-Rays\n\nIV. Tesla's Later Years\nA. His later inventions\nB. His death and legacy\n\nV. Conclusion\nA. Summary of Tesla's life and accomplishments\nB. Impact of Tesla's work on modern technology"
    },
    {
        title: "Recipe creator (eat at your own risk)",
        description: "Create a recipe from a list of ingredients.",
        question: "Write a recipe based on these ingredients and instructions:\n\nFrito Pie\n\nIngredients:\nFritos\nChili\nShredded cheddar cheese\nSweet white or red onions, diced small\nSour cream\n\nInstructions:",
        answer: "1. Preheat oven to 350 degrees F.\n\n2. Spread a layer of Fritos in the bottom of a 9x13 inch baking dish.\n\n3. Top the Fritos with a layer of chili.\n\n4. Sprinkle the chili with shredded cheddar cheese.\n\n5. Sprinkle the cheese with diced onions.\n\n6. Bake in preheated oven for 25 minutes.\n\n7. Remove from oven and top with a dollop of sour cream.\n\n8. Serve warm. Enjoy!"
    },
    {
        title: "Turn by turn directions",
        description: "Convert natural language to turn-by-turn directions.",
        question: "Create a numbered list of turn-by-turn directions from this text: \n\nGo south on 95 until you hit Sunrise boulevard then take it east to us 1 and head south. Tom Jenkins bbq will be on the left after several miles.",
        answer: "1. Go south on 95 \n2. Take Sunrise Boulevard east \n3. Head south on US 1 \n4. Tom Jenkins BBQ will be on the left after several miles"
    },
    {
        title: "Restaurant review creator",
        description: "Turn a few words into a restaurant review.",
        question: "Write a restaurant review based on these notes:\n\n Name: The Blue Wharf\nLobster great, noisy, service polite, prices good.\n\nReview:",
        answer: "I recently visited The Blue Wharf and had a wonderful experience. The lobster was excellent and the prices were very good. The only downside was the noise level, but the polite service more than made up for it. Highly recommend!"
    },
    {
        title: "Create study notes",
        description: "Provide a topic and get study notes.",
        question: "What are 5 key points I should know when studying Ancient Rome?",
        answer: "1. Understand the Roman Republic and its political and social structures.\n2. Learn about the major events and people of the Roman Empire, including the Pax Romana.\n3. Familiarize yourself with Roman culture and society, including language, art, architecture, literature, law, and religion.\n4. Study the Roman military, its tactics and organization, and its effects on the empire.\n5. Examine the decline of the Roman Empire, its eventual fall, and its legacy."
    },
    {
        title: "Interview questions",
        description: "Create interview questions.",
        question: "Create a list of 8 questions for my interview with a science fiction author:",
        answer: "1. What inspired you to write science fiction?\n2. What themes do you typically explore in your work?\n3. How has the genre of science fiction evolved over time?\n4. What do you think sets your work apart from other science fiction authors?\n5. What advice would you give to aspiring science fiction authors?\n6. What are some of the most challenging aspects of writing science fiction?\n7. How has your writing process changed over the years?\n8. What do you think is the most important thing for readers to take away from your work?"
    },
]

export const DefaultConversationText = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome to ChatGPT 3 App!
            </Text>
            {/* model değiştirme iconu */}
            <View style={styles.lineWrapper}>
                <BrainIcon height={units.height / 25} width={units.height / 25} />
                <RightArrow height={units.height / 35} width={units.height / 35} style={styles.arrowIcon} />
                <Text style={styles.description}>
                    Change the AI model you want to respond to you here.
                </Text>
            </View>
            {/* nasıl çalışır iconu */}
            <View style={styles.lineWrapper}>
                <QuestionMarkIcon height={units.height / 25} width={units.height / 25} />
                <RightArrowIcon height={units.height / 35} width={units.height / 35} style={styles.arrowIcon} />
                <Text style={styles.description}>
                    Explore what's possible with some examples here.
                </Text>
            </View>
            {/* gönder iconuna uzun basma */}
            <View style={styles.lineWrapper}>
                <SendIcon height={units.height / 25} width={units.height / 25} />
                <RightArrowIcon height={units.height / 35} width={units.height / 35} style={styles.arrowIcon} />
                <Text style={styles.description}>
                    Click here to send your message and long click to clear chat history.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: units.width / 36,
        paddingTop: units.height / 40
    },
    title: {
        color: colors.WHITE,
        fontSize: Fonts.size(22),
        marginBottom: units.height / 50,
    },
    lineWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: units.height / 72

    },
    description: {
        color: colors.WHITE,
        fontSize: Fonts.size(17),
        flex: 1
    },
    arrowIcon: {
        marginHorizontal: units.width / 60
    }
})

