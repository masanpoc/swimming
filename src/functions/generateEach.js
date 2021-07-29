export default function generateEach(meters, exs) {
    // console.log(meters, exs, 'meters and exercises passed to the function')
    let list = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    // if exs==1 => return [meters]
    // else :
    list=list.filter(el=>el<meters)
    let rate = meters/exs;
    if(rate>=100){
        list=list.filter(el=>el>50);
        if(meters>400 && exs>1) {
            list.pop();
        }
        if(meters>400 && exs>2) {
            list.pop();
        }
        if(meters>600 && exs>2) {
            list.pop();
        }
        if(meters>1000) {
            list.shift();
            list.shift();
            list.pop();
            list.pop();
        }
    } 
    if(rate<100) {
        list=list.filter(el=>el<100)
    }
    let eachArr = [];
    let left = meters;
    for(let i=0; i<exs; i++) {
        if(i<(exs-1)){
            let randomIndexToAddEach =Math.floor(Math.random()*list.length)
            eachArr.push(list[randomIndexToAddEach]);
            if(meters>1000 && list[randomIndexToAddEach]>=400){
                
            list.splice(randomIndexToAddEach, 1);
            }
            left -= list[randomIndexToAddEach]
            // console.log(eachArr, )
        } else {
            console.log(left, 'left')
            
            eachArr.push(left);
            // console.log(eachArr, 'array of the block')
            // do  {
            //     var randomMetersToAddEach=list[Math.floor(Math.random()*list.length)];
            //     left -= randomMetersToAddEach;
            // } while((left-randomMetersToAddEach)!=0)
        }
    }
    return eachArr
}