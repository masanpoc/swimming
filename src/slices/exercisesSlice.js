import {createSlice} from '@reduxjs/toolkit';
import exercisesList from '../lists/exercisesList'; 

export const exercisesReducer = createSlice({
    name: 'exercises',
    initialState: exercisesList,
    reducers: {
        filterByLevel(state, action) {
            const {level}=action.payload;
            return state.filter(ex=>ex.level<=level)
        },
        filterByStroke(state, action) {
            const {strokesTargeted} = action.payload;
            if(strokesTargeted.length==1 && strokesTargeted[0]=='all') {
                return state
            } else {
                let newState = state.slice();
                newState=newState.filter(ex=>!ex.stroke.includes('all'));
                let strokesToRemove = ['freestyle', 'backstroke', 'breaststroke', 'butterfly'];
                
                // remove exercises from state which dont have the strokes targeted
                strokesTargeted.forEach((strokeTargeted)=>{
                    if(strokesToRemove.includes(strokeTargeted)) {
                        const index=strokesToRemove.indexOf(strokeTargeted);
                        strokesToRemove.splice(index, 1);
                    }
                })
                strokesToRemove.forEach((strokeToRemove)=>{
                    newState=newState.filter(ex=>!ex.stroke.includes(strokeToRemove))
                })
                
                return newState
            }
            
        },
        filterByMaterial(state, action){
            const {material} = action.payload;
            if(material.length==0){
                return state
            } else {
                let newState = state.slice();
                let materialsNotUsed = ['kickboard', 'fins', 'paddles', 'tube', 'pullboy'];
                material.forEach((materialUsed)=> {
                    const index = materialsNotUsed.indexOf(materialUsed);
                    materialsNotUsed.splice(index,1);
                });
                materialsNotUsed.forEach((materialNotUsed)=>{
                    newState=newState.filter((ex)=>!ex.material.includes(materialNotUsed));
                })
                return newState;
            }
        }
    }
})


export const {filterByLevel, filterByStroke, filterByMaterial} = exercisesReducer.actions;
export default exercisesReducer.reducer