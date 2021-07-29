import { createSlice } from "@reduxjs/toolkit";
import generateTotal from "../functions/generateTotal";
import generateEach from "../functions/generateEach";
import generateTrainingSet from "../functions/generateTrainingSet";


export const setsReducer = createSlice({
    name: 'sets',
    initialState: {warmup: {total: 0, each: []}, technique: {total: 0, each: [], sets: []}, main: {total: 0, each: [], sets: []}, cooldown: {total: 0, each: []}},
    reducers: {
        generateMeterBlocks(state, action) {
            const {meters} = action.payload;
            let newState = generateTotal(meters);
            return newState
        },
        generateMeterExercises(state, action) {
            const {warmupExs, techniqueExs, mainExs, cooldownExs} = action.payload;
            state.warmup.each=generateEach(state.warmup.total, warmupExs);
            state.technique.each=generateEach(state.technique.total, techniqueExs);
            state.main.each=generateEach(state.main.total, mainExs);
            state.cooldown.each=generateEach(state.cooldown.total, cooldownExs);
            return state
        },
        generateMainSets(state,action) {
            const {eachList} = action.payload;
            if(Math.random() < 0.5 && state.main.total>1000) {
                // do logic to do blocks of 2 layer sets
                if(eachList.length>3){
                    if(Math.random() < 0.5) {
                        // do 2 blocks of 2 layer sets
                        // do cut of array
                        let indexes = [];
                        for(let i=2; i<eachList.length-1; i++){
                            indexes.push(i)
                        }
                        let cutIndex =  indexes[Math.floor(Math.random()*indexes.length)]
                        let eachList1 = eachList.slice(cutIndex);
                        //  // take 50 m from largest each
                        // let index1 = eachList1.indexOf(Math.max(...eachList1));
                        // eachList1[index1]-=50;
                        let eachList2 = eachList.slice (0, cutIndex);
                        console.log(eachList1, eachList2, indexes)
                        //  // take 50 m from largest each
                        //  let index2 = eachList2.indexOf(Math.max(...eachList2));
                        //  eachList2[index2]-=50;
                        // do sets
                        let setList = [{sets:2, eachSet: eachList1.map(el=>generateTrainingSet(el/2))}, {sets:2, eachSet: eachList2.map(el=>generateTrainingSet(el/2))}];
                        state.main.sets=setList;
                    } else {
                        // // take 100 m from largest each
                        // let index = eachList.indexOf(Math.max(...eachList));
                        // eachList[index]-=100;
                        // do 1block of 2 layer sets
                        let setList = [{sets:2, eachSet: eachList.map(el=>generateTrainingSet(el/2))}];
                        state.main.sets=setList;
                    }
                } else {
                    // do 1 block of 2 layer sets
                    let setList = [{sets:2, eachSet: eachList.map(el=>generateTrainingSet(el/2))}];
                    state.main.sets=setList;
                }
            } else {
                // do one layer sets
                let setList = eachList.map(el=>generateTrainingSet(el))
                state.main.sets=setList;
            }
            console.log(state.main.sets, 'final main sets without rests');
            return state
        },
        generateTechniqueSets(state, action) {
            const {eachList} = action.payload;
            // console.log(eachList, 'before')
            let setList = eachList.map(el=>generateTrainingSet(el))
            // console.log(eachList, 'after')
            state.technique.sets=setList;
            console.log(state.technique.sets, 'final technique sets');
            return state
        }
    }
})

export const { generateMeterBlocks, generateMeterExercises, generateMainSets, generateTechniqueSets } = setsReducer.actions;
export default setsReducer.reducer;