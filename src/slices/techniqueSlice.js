import {createSlice} from '@reduxjs/toolkit';
import randomIntFromInterval from '../functions/randomIntFromInterval';
import shuffle from '../functions/shuffle'
// import * as _ from 'ramda'


export const techniqueReducer = createSlice({
    name: 'technique',
    initialState: [],
    reducers: {
        copy_filter_select_techniqueExercises(state, action) {
            let {filteredExercises}=action.payload;
            const {material, muscle} = action.payload;
            const techniqueExercises = [];
            const max = 4;
            const min = 2;
            const numberExercises = randomIntFromInterval(min,max);
            let pendingExercises = numberExercises;
            filteredExercises=filteredExercises.filter(ex=>ex.block.includes('technique'))
            // // remove exercises that are already in warmup --> use _.difference function
            // filteredExercises=_.difference(filteredExercises, warmup);
            // console.log(filteredExercises);
            // logic for deterministic+random selection:
            // main/technique => use all types of material: beginner's materials and advanced equipment
            if(material.length>0){

                // filter in exercises of our list that contain any material that the swimmer is using
                let exs_material = filteredExercises.filter(ex=>ex.material.some((tool)=>material.includes(tool)));
                // alter order of material array to start picking random materials as we generate the block
                shuffle(material);
                // for every material in the list (either ['kickboard', 'pullbuoy', 'paddles', 'fins'...], ['kickboard'], etc)
                material.forEach((techniqueTool)=>{
                    // we set a counter in order to select less material exercises
                    let counter = 0;
                    // select random exercise with that techniquematerial
                    let arrayToSelectFrom = exs_material.filter(ex=>ex.material.includes(techniqueTool));
                    if(arrayToSelectFrom.length>0 && counter<3){
                    let selected = arrayToSelectFrom[Math.floor(Math.random()*arrayToSelectFrom.length)]
                    let index = exs_material.indexOf(selected);
                    // make sure it is not repeated in the block by removing the exercise from filteredExercises, and from the exs_material list
                    let index2 = filteredExercises.findIndex(el=>el.name==selected.name);
                    exs_material.splice(index,1);
                    filteredExercises.splice(index2,1);
                    // push to technique
                    if(selected){
                        techniqueExercises.push(selected);
                    }
                    
                    pendingExercises--;
                    counter++;
                    }
                })
            }
            // if specified muscles in the form
            if(muscle.length>0){
                // filter those exercises that have that/those specific muscles
                let n_muscle = randomIntFromInterval(1,2);
                let exs_muscle = filteredExercises.filter(ex=>ex.muscle.some((part)=>muscle.includes(part)));
                for(let i=0; i<n_muscle; i++){
                    if(pendingExercises>0){
                        // push random exercise with that muscle
                        let selected = exs_muscle[Math.floor(Math.random()*exs_muscle.length)]
                        let index = exs_muscle.indexOf(selected);
                        let index2 = filteredExercises.findIndex(el=>el.name==selected.name);
                        exs_muscle.splice(index,1);
                        filteredExercises.splice(index2,1);
                        if(selected){
                            techniqueExercises.push(selected);
                        }
                        
                        pendingExercises--;
                    }
                }
            }
             // filter out exercises with material
             let exs_left = filteredExercises.filter(ex=>(ex.material.length==0));
             // filter out exercises selected -- already done!
            // following loop won't run if pendingExercises=0
            for(let i=0; i<pendingExercises; i++){
               
                // select random exercise
                let selected = exs_left[Math.floor(Math.random()*exs_left.length)]
                let index = exs_left.indexOf(selected);
                exs_left.splice(index,1);
                if(selected){
                    techniqueExercises.push(selected);   
                }
                
            }

            return shuffle(techniqueExercises)
        },
    }
})


export const {copy_filter_select_techniqueExercises} = techniqueReducer.actions;
export default techniqueReducer.reducer