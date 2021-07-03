import {createSlice} from '@reduxjs/toolkit';
import randomIntFromInterval from '../functions/randomIntFromInterval';

export const warmupReducer = createSlice({
    name: 'warmup',
    initialState: [],
    reducers: {
        copy_filter_select_warmupExercises(state, action) {
            let {filteredExercises}=action.payload;
            const {material, muscle} = action.payload;
            const warmupExercises = [];
            const max = 4;
            const min = 2;
            const numberExercises = randomIntFromInterval(min,max);
            let pendingExercises = numberExercises;
            filteredExercises=filteredExercises.filter(ex=>ex.block.includes('warmup'))
            // logic for deterministic+random selection:
            // boilerplate for selection in every block, necessary to restrict options for each block:
            // warmup => do not use advanced equipment
            // cooldown => do not use advanced equipment, exception: tube
            // main/technique => use all types of material: beginner's materials and advanced equipment
            if(material.length>0){
                // select one or two
                let n_material = randomIntFromInterval(1,2);
                // check if any exercise of our list contains any material that the swimmer is using
                let exs_material = filteredExercises.filter(ex=>ex.material.some((tool)=>material.includes(tool)));
                for(let i=0; i<n_material; i++){
                    // push random exercise with material
                    let selected = exs_material[Math.floor(Math.random()*exs_material.length)]
                    let index = exs_material.indexOf(selected);
                    exs_material.splice(index,1);
                    warmupExercises.push(selected);
                    pendingExercises--;
                }
            }
            if(muscle.length>0){
                // filter those exercises that have that/those specific muscles
                let n_muscle = randomIntFromInterval(1,2);
                let exs_muscle = filteredExercises.filter(ex=>ex.muscle.length>0);
                for(let i=0; i<n_muscle; i++){
                    if(pendingExercises>0){
                        // push random exercise with material
                        let selected = exs_muscle[Math.floor(Math.random()*exs_muscle.length)]
                        let index = exs_muscle.indexOf(selected);
                        exs_muscle.splice(index,1);
                        warmupExercises.push(selected);
                        pendingExercises--;
                    }
                }
            }
            // following loop won't run if pendingExercises=0
            for(let i=0; i<pendingExercises; i++){
                // randomly push an exercise without material/muscle from the list
                let exs_left = filteredExercises.filter(ex=>(ex.material.length==0));
                // that isn't already in our selection
                exs_left = exs_left.filter(ex=>!warmupExercises.includes(ex))
                let select = exs_left[Math.floor(Math.random()*exs_left.length)]
                warmupExercises.push(select);
            }

            return warmupExercises
        },
    }
})


export const {copy_filter_select_warmupExercises} = warmupReducer.actions;
export default warmupReducer.reducer