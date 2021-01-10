
/*

                            CODING CHALLENGE 3

There are two gymnastics teams, Dolphins and Koalas. They compete against each
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)
3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
team only wins if it has a higher score than the other team, and the same time a
score of at least 100 points. Hint: Use a logical operator to test for minimum
score, as well as multiple else-if blocks �
4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
both teams have the same score and both have a score greater or equal 100
points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
§ Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

*/

/* 
const dolphinGameScore1 = 96;
const dolphinGameScore2 = 108;
const dolphinGameScore3 = 89;

const koalaGameScore1 = 88;
const koalaGameScore2 = 91;
const koalaGameScore3 = 110;

const dolphinAvgScore = (dolphinGameScore1 + dolphinGameScore2 + dolphinGameScore3) / 3;
const koalaAvgScore = (koalaGameScore1 + koalaGameScore2 + koalaGameScore3) / 3;

if(koalaAvgScore === dolphinAvgScore){
    console.log('There is a draw.');
} else if(koalaAvgScore > dolphinAvgScore){
    console.log('Koala wins the competition');
} else {
    console.log('dolphin wins the competition');
} */

const dolphinGameScore1 = 97;
const dolphinGameScore2 = 112;
const dolphinGameScore3 = 101;

const koalaGameScore1 = 109;
const koalaGameScore2 = 95;
const koalaGameScore3 = 106;

const dolphinAvgScore = (dolphinGameScore1 + dolphinGameScore2 + dolphinGameScore3) / 3;
const koalaAvgScore = (koalaGameScore1 + koalaGameScore2 + koalaGameScore3) / 3;


// BONUS 1 AND 2    
if(koalaAvgScore >= 100 && dolphinAvgScore >= 100 && koalaAvgScore === dolphinAvgScore){
    console.log('There is a draw.');
}else if(koalaAvgScore >= 100 && koalaAvgScore > dolphinAvgScore){
    console.log('Koala wins the competition');
} else if(dolphinAvgScore >= 100 && dolphinAvgScore > koalaAvgScore){
    console.log('dolphin wins the competition');
} else {
    console.log('No team won the competition because both averages are less than one hundred.');
}
