"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateValidExperimentsExcel = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//@ts-ignore
var XLSX = require("xlsx");
const filenameXLSX = "emotionData.xlsx";
const filenameCSV = "emotionData.csv";
const GenerateValidExperimentsExcel = (data, radioSurveyData, textSurveyData, experiments) => {
    const yesNoAnswer = {
        0: "Yes",
        1: "No"
    };
    const simplenessAnswer = {
        0: "Very easy",
        1: "Easy",
        2: "Medium",
        3: "Hard",
        4: "Very hard"
    };
    const satisfactionAnswer = {
        0: "Very satisfied",
        1: "Satisfied",
        2: "Neutral",
        3: "Dissatisfied",
        4: "Very dissatisfied"
    };
    const combinedParticipantAndSurveyData = [];
    const generateDataToWrite = () => {
        let userID = '';
        let experimentNumber = 0;
        let surprise = 0;
        let happy = 0;
        let fear = 0;
        let neutral = 0;
        let disgust = 0;
        let sad = 0;
        let angry = 0;
        let sliceStart = '';
        let sliceEnd = '';
        let adaptationTime = 'NULL';
        let adaptationName = 'NULL';
        let q1 = '';
        let q2 = '';
        let q3 = '';
        let q4 = '';
        let finalQ1 = '';
        let finalQ2 = '';
        let finalQ3 = '';
        let finalQ4 = '';
        for (let i = 0; i < data.length; i++) {
            const participant = data[i];
            userID = participant._id;
            for (let j = 0; j < participant.experimentReports.length; j++) {
                const experiment = participant.experimentReports[j];
                if (experiments !== null) {
                    if (experiments !== experiment.experimentNumber)
                        continue;
                }
                experimentNumber = experiment.experimentNumber;
                for (let k = 0; k < experiment.emotionSnapshots.length; k++) {
                    const emotionSnapshot = experiment.emotionSnapshots[k];
                    sliceStart = emotionSnapshot.timesliceStart;
                    sliceEnd = emotionSnapshot.timesliceEnd;
                    adaptationTime = "NULL";
                    adaptationName = "NULL";
                    let sliceStartMillisec = +new Date(sliceStart);
                    let sliceEndMillisec = +new Date(sliceEnd);
                    for (let l = 0; l < experiment.adaptions.length; l++) {
                        const adaptation = experiment.adaptions[l];
                        let adaptationTimeStampMillisec = +new Date(adaptation.timestamp);
                        if (sliceStartMillisec <= adaptationTimeStampMillisec && adaptationTimeStampMillisec <= sliceEndMillisec) {
                            adaptationTime = adaptation.timestamp;
                            adaptationName = adaptation.adaptionName;
                        }
                    }
                    for (let m = 0; m < emotionSnapshot.emotions.length; m++) {
                        const emotion = emotionSnapshot.emotions[m];
                        switch (emotion.emotionName) {
                            case 'happy':
                                happy = emotion.intensity;
                                break;
                            case 'surprised':
                                surprise = emotion.intensity;
                                break;
                            case 'neutral':
                                neutral = emotion.intensity;
                                break;
                            case 'sad':
                                sad = emotion.intensity;
                                break;
                            case 'fearful':
                                fear = emotion.intensity;
                                break;
                            case 'angry':
                                angry = emotion.intensity;
                                break;
                            case 'disgusted':
                                disgust = emotion.intensity;
                                break;
                            default:
                                break;
                        }
                    }
                    for (let n = 0; n < radioSurveyData.length; n++) {
                        const radioSurvey = radioSurveyData[n];
                        if (radioSurvey.userId === userID && radioSurvey.experimentNumber) {
                            for (let o = 0; o < radioSurvey.answers.length; o++) {
                                const answer = radioSurvey.answers[o];
                                switch (o) {
                                    case 0:
                                        //@ts-ignore
                                        q1 = yesNoAnswer[answer];
                                        break;
                                    case 1:
                                        //@ts-ignore
                                        q2 = simplenessAnswer[answer];
                                        break;
                                    case 2:
                                        //@ts-ignore
                                        q3 = simplenessAnswer[answer];
                                        break;
                                    case 3:
                                        //@ts-ignore
                                        q4 = satisfactionAnswer[answer];
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                    for (let p = 0; p < textSurveyData.length; p++) {
                        const textSurvey = textSurveyData[p];
                        if (textSurvey.userId === userID) {
                            for (let q = 0; q < textSurvey.answers.length; q++) {
                                const answer = textSurvey.answers[q];
                                if (q === 0) {
                                    finalQ1 = answer;
                                }
                                if (q === 1) {
                                    finalQ2 = answer;
                                }
                                if (q === 2) {
                                    finalQ3 = answer;
                                }
                                if (q === 3) {
                                    finalQ4 = answer;
                                }
                            }
                        }
                    } // END textSurvey
                    combinedParticipantAndSurveyData.push({
                        userID, experimentNumber, surprise, happy, fear, neutral, disgust, sad, angry, sliceStart, sliceEnd, adaptationTime, adaptationName, q1, q2, q3, q4, finalQ1, finalQ2, finalQ3, finalQ4
                    });
                } // END EmotionSnapshot
            } // END Experiment
        } // END Participant
    }; // END GenerateDateToWrite
    const writeResultsToCSV = (filename) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                fs_1.default.writeFileSync(filename, "UserID,ExperimentNumber,Surprise,Happy,Fear,Neutral,Disgust,Sad,Angry,SliceStart,SliceEnd,AdaptationTime,AdaptationName,Q1,Q2,Q3,Q4,FinalQ1,FinalQ2,FinalQ3,FinalQ4");
                for (let i = 0; i < combinedParticipantAndSurveyData.length; i++) {
                    let e = combinedParticipantAndSurveyData[i];
                    let stringToAppend = `\r\n${e.userID},${e.experimentNumber},${e.surprise},${e.happy}, ${e.fear},${e.neutral}, ${e.disgust},${e.sad},${e.angry},${e.sliceStart},${e.sliceEnd},${e.adaptationTime},${e.adaptationName},${e.q1},${e.q2},${e.q3},${e.q4},${e.finalQ1},${e.finalQ2},${e.finalQ3},${e.finalQ4}`;
                    fs_1.default.appendFileSync(filename, stringToAppend);
                }
                resolve(true);
            }
            catch (error) {
                reject();
            }
        });
    });
    const parseToXLSX = () => {
        let source = path_1.default.resolve(path_1.default.join(process.cwd(), filenameCSV));
        let destination = path_1.default.resolve(path_1.default.join(process.cwd(), filenameXLSX));
        try {
            let workbook = XLSX.readFile(source);
            XLSX.writeFile(workbook, destination);
        }
        catch (e) {
            console.error(e.toString());
        }
    };
    generateDataToWrite();
    writeResultsToCSV(filenameCSV).then(res => {
        parseToXLSX();
    });
};
exports.GenerateValidExperimentsExcel = GenerateValidExperimentsExcel;
//# sourceMappingURL=FileGenerator.js.map