import * as _ from 'ramda'

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
    let subtractTechnique = arr[Math.floor(Math.random()*arr.length)];
    let subtractCooldown = arr[Math.floor(Math.random()*arr.length)];
    let addMain = subtractWarmup+subtractTechnique+subtractCooldown;
    let totalWarmup = (ref-subtractWarmup)*50;
    let totalTechnique = (ref-subtractTechnique)*50;
    let totalCooldown = (ref-subtractCooldown)*50;
    let totalMain = (ref+addMain)*50;
    let arrCorrected = [];
    if(ref<=5){
        arrCorrected=[[totalWarmup, '1'], [totalTechnique, '2'], [totalMain, '3'], [totalCooldown, '4']];
    }
    else {
        let arrMeters = [[totalWarmup, '1'], [totalTechnique, '2'], [totalMain, '3'], [totalCooldown, '4']];
        let arrCorrect = arrMeters.filter(el=>el[0]%100==0);
        let arrToCorrect = arrMeters.filter(el=>el[0]%100!=0);
        
        let randomIndexToAddMeters = Math.floor(Math.random()*arrToCorrect.length);
        let toAdd = 0;
        const mapIndexed = _.addIndex(_.map);

        arrToCorrect = mapIndexed((el,i)=>{
            if(i!=randomIndexToAddMeters){
                toAdd += el[0]%100;
                return [(el[0]-el[0]%100), el[1]]
            }
            return el
        },arrToCorrect)

        arrToCorrect[randomIndexToAddMeters][0]+=toAdd;
        arrCorrected = [...arrToCorrect, ...arrCorrect]
        arrCorrected.sort(function(a, b) {
            return a[1] - b[1];
        });
    }
    
    
    
    return {warmup: {total: arrCorrected[0][0]}, technique: {total: arrCorrected[1][0]}, main: {total: arrCorrected[2][0]}, cooldown: {total: arrCorrected[3][0]}}
}