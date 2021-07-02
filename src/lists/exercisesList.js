// make a constructor later with unique id
import { v4 as uuidv4 } from 'uuid';
const exercisesList = [
    {
        id: uuidv4(),
        name: '1 arm front - lateral kick fins',
        level: 3,
        stroke: 'freestyle',
        block: ['main', 'technique'],
        muscle: ['legs', 'abs'],
        material: ['fins'],
    },
    {
        id: uuidv4(),
        name: 'medley',
        level: 3,
        stroke: 'medley',
        block: ['main', 'warmup'],
        muscle: ['legs', 'abs', 'arms', 'pecs', 'back'],
        material: []
    }
]

export default exercisesList