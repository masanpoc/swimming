import {createSlice} from '@reduxjs/toolkit';
import randomIntFromInterval from '../functions/randomIntFromInterval';
import shuffle from '../functions/shuffle'

export const cooldownReducer = createSlice({
    name: 'cooldown',
    initialState: [],
    reducers: {
        copy_filter_select_cooldownExercises(state, action) {
            let {filteredExercises}=action.payload;
            const {material, muscle} = action.payload;
            const cooldownExercises = [];
            const max = 3;
            const min = 1;
            const numberExercises = randomIntFromInterval(min,max);
            let pendingExercises = numberExercises;
            filteredExercises=filteredExercises.filter(ex=>ex.block.includes('cooldown'))
            // logic for deterministic+random selection:
            // cooldown => do not use advanced equipment
            if(material.length>0 && (material.includes('kickboard') || material.includes('pullbuoy'))){         
                // filter out exs with fins, paddles or snorkel
                let exs_material = filteredExercises
                .filter(ex=>!ex.material.includes('paddles'))
                .filter(ex=>!ex.material.includes('fins'))
                .filter(ex=>!ex.material.includes('snorkel'))

                // filter in exercises of our list that contain any material that the swimmer is using
                exs_material = exs_material.filter(ex=>ex.material.some((tool)=>material.includes(tool)));

                // modify material payload to include only cooldown materials
                material.filter(tool=>tool!='fins')
                material.filter(tool=>tool!='paddles')
                // alter order of material array to start picking random materials as we generate the block
                shuffle(material)
                // for every material in the list (either ['snorkel','kickboard', 'pullbuoy'], ['kickboard'], or ['pullbuoy'])
                material.forEach((cooldownTool)=>{
                    // we set a counter in order to select less material exercises
                    let counter = 0;
                    if(pendingExercises>0 && counter<1) {
                        // select random exercise with that cooldownmaterial
                        let arrayToSelectFrom = exs_material.filter(ex=>ex.material.includes(cooldownTool));
                        if(arrayToSelectFrom.length>0){
                        let selected = arrayToSelectFrom[Math.floor(Math.random()*arrayToSelectFrom.length)]
                        let index = exs_material.indexOf(selected);
                        // make sure it is not repeated in the block by removing the exercise from filteredExercises, and from the exs_material list (not really happening as we dont have any exercise with both pullbuoy and kickboard)
                        let index2 = filteredExercises.findIndex(el=>el.name==selected.name);
                        exs_material.splice(index,1);
                        filteredExercises.splice(index2,1);
                        // push to cooldown
                        if(selected){
                            cooldownExercises.push(selected);
                        }
                        
                        pendingExercises--;
                        counter++;
                        }
                    }
                })
            }
            // // if specified muscles in the form
            // if(muscle.length>0){
            //     // filter those exercises that have that/those specific muscles
            //     let n_muscle = randomIntFromInterval(1,2);
            //     let exs_muscle = filteredExercises.filter(ex=>ex.muscle.some((part)=>muscle.includes(part)));
            //     for(let i=0; i<n_muscle; i++){
            //         if(pendingExercises>0){
            //             // push random exercise with that muscle
            //             let selected = exs_muscle[Math.floor(Math.random()*exs_muscle.length)]
            //             let index = exs_muscle.indexOf(selected);
            //             let index2 = filteredExercises.findIndex(el=>el.name==selected.name);
            //             exs_muscle.splice(index,1);
            //             filteredExercises.splice(index2,1);
            //             cooldownExercises.push(selected);
            //             pendingExercises--;
            //         }
            //     }
            // }
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
                    cooldownExercises.push(selected);
                }
                
            }

            return shuffle(cooldownExercises)
        },
    }
})


export const {copy_filter_select_cooldownExercises} = cooldownReducer.actions;
export default cooldownReducer.reducer