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
        name: 'freestyle kick',
        level: 1,
        stroke: 'freestyle',
        block: ['main', 'technique', 'warmup', 'cooldown'],
        muscle: ['legs'],
        material: ['kickboard'],
    },
    {
        id: uuidv4(),
        name: 'medley',
        level: 4,
        stroke: 'all',
        block: ['main', 'warmup'],
        muscle: ['legs', 'abs', 'arms', 'pecs', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'breaststroke with two kicks',
        level: 2,
        stroke: 'breaststroke',
        block: ['warmup', 'technique'],
        muscle: ['legs', 'pecs'],
        material: [],
    },
    {
        id: uuidv4(),
        name: 'breaststroke arms with butterfly kicks',
        level: 3,
        stroke: 'breaststroke',
        block: ['warmup', 'technique'],
        muscle: ['legs', 'abs', 'pecs'],
        material: [],
    },
    {
        id: uuidv4(),
        name: 'butterfly kick underwater with fins',
        level: 5,
        stroke: 'butterfly',
        block: ['technique', 'main'],
        muscle: ['legs', 'abs'],
        material: ['fins']
    },
]

export default exercisesList