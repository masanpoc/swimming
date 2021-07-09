import {createSlice} from '@reduxjs/toolkit';
import randomIntFromInterval from '../functions/randomIntFromInterval';
import shuffle from '../functions/shuffle'

export const mainReducer = createSlice({
    name: 'main',
    initialState: [],
    reducers: {
        copy_filter_select_mainExercises(state, action) {
            let {filteredExercises}=action.payload;
            const {material, muscle} = action.payload;
            const mainExercises = [];
            const max = 6;
            const min = 4;
            const numberExercises = randomIntFromInterval(min,max);
            let pendingExercises = numberExercises;
            filteredExercises=filteredExercises.filter(ex=>ex.block.includes('main'))
            // logic for deterministic+random selection:
            // main/main => use all types of material: beginner's materials and advanced equipment
            if(material.length>0){

                // filter in exercises of our list that contain any material that the swimmer is using
                let exs_material = filteredExercises.filter(ex=>ex.material.some((tool)=>material.includes(tool)));
                // alter order of material array to start picking random materials as we generate the block
                shuffle(material);
                // for every material in the list (either ['kickboard', 'pullbuoy', 'paddles', 'fins'...], ['kickboard'], etc)
                material.forEach((mainTool)=>{
                    // we set a counter in order to select less material exercises
                    let counter = 0;
                    // select random exercise with that mainmaterial
                    let arrayToSelectFrom = exs_material.filter(ex=>ex.material.includes(mainTool));
                    if(arrayToSelectFrom.length>0 && counter<2){
                        let selected = arrayToSelectFrom[Math.floor(Math.random()*arrayToSelectFrom.length)]
                        let index = exs_material.indexOf(selected);
                        // make sure it is not repeated in the block by removing the exercise from filteredExercises, and from the exs_material list
                        let index2 = filteredExercises.findIndex(el=>el.name==selected.name);
                        exs_material.splice(index,1);
                        filteredExercises.splice(index2,1);
                        // push to main
                        if(selected){
                            mainExercises.push(selected);
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
                            mainExercises.push(selected);
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
                    mainExercises.push(selected);
                }
                
            }

            return shuffle(mainExercises)
        },
    }
})


export const {copy_filter_select_mainExercises} = mainReducer.actions;
export default mainReducer.reducer