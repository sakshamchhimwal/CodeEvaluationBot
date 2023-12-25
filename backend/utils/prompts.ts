import {
    AIMessagePromptTemplate,
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { DocumentationObject } from "./runners";

export const makeBugParser = (functionName: string) => {
    const bugsParser = StructuredOutputParser.fromNamesAndDescriptions({
        bugs: `all the bugs identified in the function: ${functionName}. **Strictly list 3-5 Bugs only. Keep it very descriptive. Seprate each bug with **\n****`,
        solution: `the possible solutions to the bugs in the function: ${functionName}.Seprate each solution with newline`,
        score: `based on the bugs in the function ${functionName} socre given to the devloper out of 10. **Output Format** x/10`,
    });
    // console.log("L-15 Prompt.ts");
    return bugsParser;
};

export const codeReadblityParser = (functionName: string) => {
    const readblityParser = StructuredOutputParser.fromNamesAndDescriptions({
        issues: `all the areas of improvements in code readblity for the function: ${functionName}. Keep it very descriptive. Seprate each bug with **\n**`,
        solution: `code with readblity improved for the function: ${functionName}`,
        score: `based on the readblity isues in the function ${functionName}. Score given to the devloper out of 10. **Output Format** x/10`,
    });
    return readblityParser;
};

export const documentationParser = (documentation: DocumentationObject) => {
    const docsParser = StructuredOutputParser.fromNamesAndDescriptions({
        OverallScore: `use all the above scores to provide the devloper a overall score for the function ${documentation.functionName}. **Strictly if no function of the name is available give score 0**`,
        BugsScore: `the score given to the devloper based on the bugs of the function ${documentation.functionName}.. **Strictly if no function of the name is available give score 0**`,
        Bugs: `all the bugs present in the function based on which the score was given ${documentation.functionName}.  Keep it very descriptive. Seprate each bug with **\n**. . **Strictly if no function of the name is available give score 0**`,
        ReadblityScore: `the score given to the devloper based on the readblity issues of the function ${documentation.functionName}. . **Strictly if no function of the name is available give score 0**`,
        ReadblityIssues: `all the readblity issues on which the score was given for the function ${documentation.functionName}. Keep it very descriptive.  Seprate each issue with **\n**. . **Strictly if no function of the name is available give score 0**`,
    });
    return docsParser;
};

export const alignmentParser = () => {
    const alignmentParser = StructuredOutputParser.fromNamesAndDescriptions({
        OverallAlignment:
            "return the overall alignment percentage of the devloped features with the client project. **Strictly a percentage** **Fromat**: x%",
        EstimatedCompletion:
            "return a estimate of how much the project has been completed till now. make sure to take into account both the client requirements and user documentation.**Strictly a percentage** **Fromat**: x%",
        ETA_toCompletion:
            "return the estimated time for the project completion. **Strictly a time in hours** **Fromat**: x hours",
    });
    return alignmentParser;
};

// FOR FUNCTION EXTRACTION
const functionExtractorTemplate = ChatPromptTemplate.fromMessages([
    AIMessagePromptTemplate.fromTemplate(
        "You are given a piece of code. Understand the function code {functionName}. Only provide the code for the function {functionName}. Based on it answers the questions that follow. \n\n {context} \n\n"
    ),
    new MessagesPlaceholder("chat_history"),
]);

// FOR BUGS
const bugFinder = ChatPromptTemplate.fromMessages([
    functionExtractorTemplate,
    AIMessagePromptTemplate.fromTemplate(
        "You are a code tester and bugs checker at a company .This is the provided code. \
        Look for all possible bugs in the code. **Make sure to list all the bugs**.\
        For each bug provide the explanation and possible solution along with the modified code.\
        **ALWAYS Provide the modifeid code too.**"
    ),
    new MessagesPlaceholder("chat_history"),
]);

export const bugScore = ChatPromptTemplate.fromMessages([
    bugFinder,
    AIMessagePromptTemplate.fromTemplate(
        "Based on all the listed bugs and based on the provided snippets provide a score out of 10 to the devloper based on your understanding. Rate the devloper out of 10. \
        {format_instructions}"
    ),
]);

// FOR CODE READBLITY
const readablityChecker = ChatPromptTemplate.fromMessages([
    functionExtractorTemplate,
    AIMessagePromptTemplate.fromTemplate(
        "You are a code quality and readblity tester at a company. Your work is to make sure that the code written by the devlopers meet the industry standards. It should have proper variable names that tell their purpose clearly. Also the function names should be very clear. The code should have well written comments too.\n\n This is the provided code. Check it and provide an improved version of the giveRating function with code readability improvements."
    ),
    new MessagesPlaceholder("chat_history"),
]);

export const readablityScore = ChatPromptTemplate.fromMessages([
    readablityChecker,
    AIMessagePromptTemplate.fromTemplate(
        "Based on all the listed code readblity issues provide a score out of 10 based on your understanding. Rate the devloper out of 10. \n\n\
        {format_instructions}"
    ),
]);

// For Documentation
const documentationReader = ChatPromptTemplate.fromMessages([
    functionExtractorTemplate,
    AIMessagePromptTemplate.fromTemplate(
        "**Function Name**:{functionName}\n**Description**:{description}\n**TimeTaken**:{timeTaken}\n**Known Bugs**:{bugs}\n\n\
        This is the provided documentation by the devloper for the function {functionName}"
    ),
]);

export const analyser = ChatPromptTemplate.fromMessages([
    documentationReader,
    bugScore,
    readablityScore,
    AIMessagePromptTemplate.fromTemplate(
        "Based on the above scores provide a generalized overall score for the user out of 10. Use the above scores meticulously to provide a generalized score.\n\n {format_instructions}"
    ),
]);

// Project Progress Tracker
const jobSpecifier = ChatPromptTemplate.fromMessages([
    AIMessagePromptTemplate.fromTemplate(
        "You are a progress checker. Your work is to make sure that the project is executing at correct pace. The client will provide you with details of the requirements. You will also be provided with the report of the work that has been done by the devloper. \n You have to estimate the project progress based on the two documents provided to you. \n Make sure to compare the work done by the devloper with the provided code too. You have to make sure that the devloper is not fooling the client by not writing proper code. \n Make sure to provide a percentage completion of the work."
    ),
]);

const clientDocsReader = ChatPromptTemplate.fromMessages([
    jobSpecifier,
    AIMessagePromptTemplate.fromTemplate(
        "**Client Requirements** \n {clientRequirements} \n\n These are the requirements of the client. Analyse them carefully."
    ),
]);

export const docReader = ChatPromptTemplate.fromMessages([
    clientDocsReader,
    AIMessagePromptTemplate.fromTemplate(
        "**User Documentation** \n {documentation} \n\n This is the documentation provided by the devlopers for the clientProject. \n\n How much does it align with the client requirement. \n\n {format_instructions}"
    ),
]);
