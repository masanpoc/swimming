import * as _ from 'ramda'

function randomValue(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

export default function generateTotal(meters) {
    const intervals = {
        2.5: [0.5,1,1.5],
        3: [1,1.5,2],
        3.5: [2,2.5,3],
        4: [2,2.5,3,3.5],
        4.5: [2,2.5,3,3.5],
        5: [2,2.5,3,3.5,4],
        5.5: [2,2.5,3,3.5,4],
        6: [2.5,3,3.5,4,4.5],
        6.5: [2.5,3,3.5,4,4.5],
        7: [3,3.5,4,4.5,5],
        7.5: [3,3.5,4,4.5,5],
        8: [3.5,4,4.5,5,5.5],
        8.5: [3.5,4,4.5,5,5.5],
        9: [4,4.5,5,5.5,6],
        9.5: [4,4.5,5,5.5,6],
        10: [4.5,5,5.5,6,6.5],
        10.5: [4.5,5,5.5,6,6.5],
        11: [5,5.5,6,6.5,7],
        11.5: [5,5.5,6,6.5,7],
        12: [5.5,6,6.5,7,7.5],
        12.5: [5.5,6,6.5,7,7.5],
        13: [6,6.5,7,7.5,8],
        13.5: [6,6.5,7,7.5,8],
        14: [6.5,7,7.5,8,8.5],
        14.5: [6.5,7,7.5,8,8.5],
        15: [7,7.5,8,8.5,9],
        15.5: [7,7.5,8,8.5,9],
        16: [7.5,8,8.5,9,9.5],
        16.5: [7.5,8,8.5,9,9.5],
        17: [8,8.5,9,9.5,10],
        17.5: [8,8.5,9,9.5,10],
        18: [8.5,9,9.5,10,10.5],
        18.5: [8.5,9,9.5,10,10.5],
        19: [9,9.5,10,10.5,11],
        19.5: [9,9.5,10,10.5,11],
        20: [9.5,10,10.5,11,11.5]
    }
    const ref = (meters/50)/4;
    let arr = intervals[ref];
    let subtractWarmup = 0;
    let subtractTechnique = randomValue(arr);
    let subtractCooldown = randomValue(arr);
    let addMain = subtractWarmup+subtractTechnique+subtractCooldown;
    let totalWarmup = (ref-subtractWarmup)*50;
    let totalTechnique = (ref-subtractTechnique)*50;
    let totalCooldown = (ref-subtractCooldown)*50;
    let totalMain = (ref+addMain)*50;
    let totalsForConditionalSet = [totalWarmup, totalTechnique, totalMain, totalCooldown];
    let arrCorrected = [];
    // we have defined Each sets as multiples of 25 until 575 (see possibleEachList), so we will not make any modification to totalWarmup, etc if ref<=5 or totalmeters<=1200 && everyBlock has less than 600 meters
    if(ref<=5 && totalsForConditionalSet.every(el=>el<600)){
        arrCorrected=[[totalWarmup, '1'], [totalTechnique, '2'], [totalMain, '3'], [totalCooldown, '4']];
    }
    else {
        // if we have total warmup 675, and cooldown 475, we can correct it to generate sets better (instead of producing 27x25 just because we have 650+25) and defining/leaving warmup as 650 and cooldown as 500 (for instance)
        let arrMeters = [[totalWarmup, '1'], [totalTechnique, '2'], [totalMain, '3'], [totalCooldown, '4']];
        // filter meters defining two arrays like correct=[200] and toCorrect=[125, 175]
        let arrCorrect = arrMeters.filter(el=>el[0]%100==0);
        let arrToCorrect = arrMeters.filter(el=>el[0]%100!=0);
        
        let randomIndexToAddMeters = Math.floor(Math.random()*arrToCorrect.length);
        let toAdd = 0;
        // we map like arr.map((el,i)=>...) but using ramda
        const mapIndexed = _.addIndex(_.map);
        // imagine arrToCorrect [225, 875], we select 225 as random el
        arrToCorrect = mapIndexed((el,i)=>{
            if(i!=randomIndexToAddMeters){
                // we round every el to multiples of 100 by substracting el%100--> 225-(25)=200 
                toAdd += el[0]%100;
                return [(el[0]-el[0]%100), el[1]]
            }
            return el
        },arrToCorrect)
        // we add the substracted amount to our random el --> 875+25=900
        arrToCorrect[randomIndexToAddMeters][0]+=toAdd;
        // we now have our blocks with meters as multiples of 100 (easier to generate sets)
        arrCorrected = [...arrToCorrect, ...arrCorrect]
        // we sort our array back as [[warmupFirst, value], [technique,...]...]
        arrCorrected.sort(function(a, b) {
            return a[1] - b[1];
        });
    }
    
    
    
    return {warmup: {total: arrCorrected[0][0]}, technique: {total: arrCorrected[1][0]}, main: {total: arrCorrected[2][0]}, cooldown: {total: arrCorrected[3][0]}}
}